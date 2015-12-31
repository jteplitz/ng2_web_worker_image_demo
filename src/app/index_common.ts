import {NgZone, Component, View} from 'angular2/core';
import {NgFor, NgIf, FORM_DIRECTIVES} from 'angular2/common';
import {BitmapService} from './services/bitmap';
import {FileReader, Uint8ArrayWrapper} from './file_api';

@Component({selector: 'image-demo', viewProviders: [BitmapService]})
@View({templateUrl: 'app/image_demo.html', directives: [NgFor, NgIf, FORM_DIRECTIVES]})
export class ImageDemo {
  images = [];
  fileInput: String;

  constructor(private _bitmapService: BitmapService) {}

  uploadFiles(files) {
    for (var i = 0; i < files.length; i++) {
      var reader = new FileReader();
      reader.addEventListener("load", this.handleReaderLoad(reader));
      reader.readAsArrayBuffer(files[i]);
    }
  }

  handleReaderLoad(reader: FileReader): (e) => void{
    return (e) => {
      var buffer = reader.result;
      this.images.push({
        src: this._bitmapService.arrayBufferToDataUri(Uint8ArrayWrapper.create(reader.result)),
        buffer: buffer,
        filtering: false
      });
    };
  }

  applyFilters() {
    for (var i = 0; i < this.images.length; i++) {
      this.images[i].filtering = true;

      setTimeout(this._filter(i), 0);
    }
  }

  private _filter(i: number): (...args: any[]) => void {
    return () => {
      var imageData = this._bitmapService.convertToImageData(this.images[i].buffer);
      imageData = this._bitmapService.applySepia(imageData);
      this.images[i].src = this._bitmapService.toDataUri(imageData);
      this.images[i].filtering = false;
    };
  }
}
