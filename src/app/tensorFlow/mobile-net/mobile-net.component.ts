import { Component, OnInit } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
interface picObj {
  url: string;
  fileName: string;
  predictions: any;
}
@Component({
  selector: 'app-mobile-net',
  templateUrl: './mobile-net.component.html',
  styleUrls: ['./mobile-net.component.css']
})


export class MobileNetComponent implements OnInit {

  constructor() { }
  picList: any = [];
  tempPic: picObj = {
    url: '',
    fileName: '',
    predictions: []
  };

  loading: boolean = false;
  isHovered: string = '';
  beforeUpload = (file: NzUploadFile): boolean => {
    console.log("🚀 ~ file:", file)
    this.loading = true;
    this.handleImageUpload(file)
    return false; // 取消上傳操作
  };


  ngOnInit(): void {
  }

  async handleImageUpload(file: any) {
    const model = await mobilenet.load();
    const img = await this.readImage(file);
    const tfImg = tf.browser.fromPixels(img);
    const predictions = await model.classify(tfImg);
    this.tempPic.predictions = predictions;
    this.picList.push({
      url: img.src,
      fileName: file.name,
      predictions: predictions
    });
    this.loading = false;
  }

  readImage(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = (error) => reject(error);
        img.src = event.target.result;

      };
      reader.readAsDataURL(file);
    });
  }

  deleteImage(item: any): void {
    const index = this.picList.indexOf(item);
    if (index !== -1) {

      this.picList.splice(index, 1);
    }
  }
  cardMouse(fileName: string): void {
    this.isHovered = fileName;
  }

}
