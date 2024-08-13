import {Component, inject, OnInit} from '@angular/core';
import {PhotoService, UserPhoto} from '../services/photo.service'
import {ActionSheetController, IonicModule} from '@ionic/angular'
import {CommonModule} from '@angular/common'

@Component({
  standalone: true,
  imports: [
    IonicModule,
    CommonModule
  ],
  selector: 'app-new-plan',
  templateUrl: 'new-plan.component.html',
  styleUrls: ['new-plan.component.scss']
})
export class NewPlanComponent implements OnInit {
  private actionSheetController = inject(ActionSheetController)
  protected photoService = inject(PhotoService)

  addPhotoToGallery() {
    this.photoService.addNewToGallery()
  }

  async ngOnInit() {
    await this.photoService.loadSaved()
  }

  async showActionSheet(photo: UserPhoto, position: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.photoService.deletePicture(photo, position)
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {}
        }
      ]
    })
    await actionSheet.present()
  }
}
