import { Component, EventEmitter, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { ImageCroppedEvent, ImageCropperComponent, ImageTransform } from 'ngx-image-cropper';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'mlc-crop-and-rotate',
  templateUrl: './crop-and-rotate.component.html',
  styleUrls: ['./crop-and-rotate.component.scss']
})
export class CropAndRotateComponent implements OnInit {
  @Output() sendImage = new EventEmitter();
  @Output() cancelEdit = new EventEmitter();
  @ViewChild('cropper') cropper: ImageCropperComponent | any;
  @ViewChild('fileUpload') input: ElementRef<HTMLInputElement>;
  imageFile: any;
  imageCropperHeight = 100;
  imageCropperWidth = 100;
  croppedImageBase64: any = '';
  transform: ImageTransform | any = {};
  canvasRotation = 0;
  rotation = 0;
  isLoading = false;
  downloadableFile: any;

  constructor(private navigationService: NavigationService) {}

  ngOnInit(): void {}

  base64toBlob2(base64Data: string, contentType: string) {
    contentType = contentType || '';
    const sliceSize = 1024;
    const byteCharacters = atob(base64Data.split(',')[1]);
    const bytesLength = byteCharacters.length;
    const slicesCount = Math.ceil(bytesLength / sliceSize);
    const byteArrays = new Array(slicesCount);

    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      const begin = sliceIndex * sliceSize;
      const end = Math.min(begin + sliceSize, bytesLength);

      const bytes = new Array(end - begin);
      for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
  }

  imageCropped(event: ImageCroppedEvent) {
    if (this.croppedImageBase64 != null || undefined) {
      this.croppedImageBase64 = event.base64;
    }
  }

  cropImage() {
    this.isLoading = true;
    setTimeout(() => {
      const result = this.cropper.crop();
      this.imageFile = this.base64toBlob2(result.base64, 'image/png');
      this.isLoading = false;
    }, 50);
  }

  cropAndClose() {
    this.isLoading = true;
    setTimeout(() => {
      const result = this.cropper.crop();
      this.croppedImageBase64 = result.base64;
      this.sendImage.emit(this.croppedImageBase64);
      this.isLoading = false;
    }, 50);
  }

  rotateLeft() {
    this.isLoading = true;
    setTimeout(() => {
      this.canvasRotation--;
      this.flipAfterRotate();
    }, 50);
  }

  rotateRight() {
    this.isLoading = true;
    setTimeout(() => {
      this.canvasRotation++;
      this.flipAfterRotate();
    }, 50);
  }

  flipAfterRotate() {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
      ...this.transform,
      flipH: flippedV,
      flipV: flippedH
    };
    this.isLoading = false;
  }

  cancelUpdate() {
    this.cancelEdit.emit();
  }

  clickInput() {
    this.input.nativeElement.click();
  }

  getImage(event: any) {
    this.imageFile = event.target.files[0];
  }
}
