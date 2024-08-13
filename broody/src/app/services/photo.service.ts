import {inject, Injectable} from '@angular/core';
import {Camera, CameraResultType, CameraSource, Photo} from '@capacitor/camera'
import {Directory, Filesystem} from '@capacitor/filesystem'
import {Preferences} from '@capacitor/preferences'
import {Platform} from '@ionic/angular'
import {Capacitor} from '@capacitor/core'

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private PHOTO_STORAGE: string = 'photos'
  private platform = inject(Platform)

  public photos: UserPhoto[] = []

  public async addNewToGallery() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    })

    const savedImageFile = await this.savePicture(capturedPhoto)

    this.photos.unshift(savedImageFile)

    await Preferences.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photos)
    })
  }

  public async savePicture(photo: Photo) {
    const base64Data = await this.readAsBase64(photo)

    const fileName = Date.now() + '.jpeg'
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    })

    if (this.platform.is('hybrid')) {
      return {
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri)
      }
    }

    return {
      filepath: fileName,
      webviewPath: photo.webPath
    }
  }

  public async loadSaved() {
    const {value} = await Preferences.get({key: this.PHOTO_STORAGE})
    this.photos = (value ? JSON.parse(value) : []) as UserPhoto[]
    if (!this.platform.is('hybrid')) {
      for (let photo of this.photos) {
        const readFile = await Filesystem.readFile({
          path: photo.filepath,
          directory: Directory.Data
        })

        photo.webviewPath = `data:image/jpeg,base64,${readFile.data}`
      }
    }
  }

  public async deletePicture(photo: UserPhoto, position: number) {
    this.photos.splice(position, 1)

    Preferences.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photos)
    })

    const fileName = photo.filepath.substring(photo.filepath.lastIndexOf('/') + 1)

    await Filesystem.deleteFile({
      path: fileName,
      directory: Directory.Data
    })
  }

  private async readAsBase64(photo: Photo) {
    if (this.platform.is('hybrid')) {
      const file = await Filesystem.readFile({
        path: photo.path!
      })

      return file.data
    }
    const response = await fetch(photo.webPath!)
    const blob = await response.blob()

    return await this.convertBlobToBase64(blob) as string
  }

  private convertBlobToBase64(blob: Blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onerror = reject
      reader.onload = () => {
        resolve(reader.result)
      }
      reader.readAsDataURL(blob)
    })
  }
}

export interface UserPhoto {
  filepath: string
  webviewPath?: string
}
