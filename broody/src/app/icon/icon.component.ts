import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core'
import {NgIf, NgOptimizedImage} from '@angular/common'

@Component({
  standalone: true,
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  imports: [
    NgOptimizedImage,
    NgIf
  ]
})
export class IconComponent implements AfterViewInit {
  @Input() icon: string | null = null
  @ViewChild('icon', {static: false}) img: ElementRef<HTMLImageElement> | null = null

  showIcon = true

  ngAfterViewInit() {
    if (!this.img) return

    this.img.nativeElement.onerror = () => {
      this.showIcon = false
    }
  }

  getIconSrc() {
    if (!this.icon) return

    return `assets/icon/${this.icon}.svg`
  }
}
