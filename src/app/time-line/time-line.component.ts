import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { initializeApp } from "firebase/app";
import { getDatabase, ref as databaseRef, onValue, get, child, set, push } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes } from "firebase/storage";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { format } from 'date-fns';

@Component({
  selector: 'app-time-line',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.css']
})
export class TimeLineComponent implements OnInit {

  timeLineForm: FormGroup = this.fb.group({
    Background: [null, [Validators.required]],
    Content: [null, [Validators.required]],
    Title: [null, [Validators.required]],
    TimeLineIcon: 'android',
    TimeLineDate: [null, [Validators.required]],
    TimeLineContent: [null, [Validators.required]],
  });
  constructor(private renderer: Renderer2, private el: ElementRef, private fb: FormBuilder) { }

  @ViewChild('uploadFileInput') uploadFileInput!: ElementRef;



  visibleSections: any[] = [];
  sections: any[] = [];
  currentSectionIndex = 0;
  layoutType = 'vertical';

  isLoading: boolean = true;
  uploadLoading: boolean = false;
  drawerVisible: boolean = false;
  numToShow = 5;
  selectedFile: File | null = null;

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    this.selectedFile = selectedFile;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      console.log(e)
      this.timeLineForm.get('Background')?.setValue(e.target.result);
      this.uploadLoading = false;
    };
    reader.readAsDataURL(selectedFile);
  }

  upToFireBase() {

    if (this.selectedFile) {
      let splitName = this.selectedFile?.name.split('.');
      const fileExtension = splitName[splitName.length - 1];
      const fileName = this.generateRandomNumber(20) + '.' + fileExtension;
      const storage = getStorage();
      const storageref = storageRef(storage, "timeLineImages/" + fileName);

      uploadBytes(storageref, this.selectedFile)
        .then((snapshot) => {
          this.timeLineForm.get('Background')?.setValue("https://firebasestorage.googleapis.com/v0/b/ethensideproject.appspot.com/o/timeLineImages%2F" + fileName + "?alt=media");
          this.insertDataBase();
        })
        .catch((error) => {
          this.isLoading = false;
          console.error("圖片上傳失敗", error);
        });
    }
  }


  clickFile() {
    this.renderer.setAttribute(this.uploadFileInput.nativeElement, 'type', 'file');
    this.uploadFileInput.nativeElement.click();
    this.uploadLoading = true;
  }
  insertDataBase() {

    const app = initializeApp(this.firebaseConfig);
    const db = getDatabase(app);
    const lineDate = this.timeLineForm.get('TimeLineDate')?.value
    this.timeLineForm.get('TimeLineDate')?.setValue(format(lineDate, 'yyyy-MM-dd'));
    push(databaseRef(db), this.timeLineForm.value);
    this.isLoading = false;
  }

  addTimeLine() {

    for (const i in this.timeLineForm.controls) {
      this.timeLineForm.controls[i].markAsDirty();
      this.timeLineForm.controls[i].updateValueAndValidity();
    }

    if (this.timeLineForm.valid) {
      this.isLoading = true;
      this.upToFireBase();
    }

  }

  /** 開關抽屜 */
  toggleCollapsed(): void {
    this.drawerVisible = !this.drawerVisible;
  }


  sections__ = [
    {
      content: '區塊 1',
      icon: 'android',
      timeLineTitle: '第一個區塊的標題',
      timeLineContent: 'Create a services site 1Create a services site 1Create a services site 1',
      background: 'url("https://img.ixintu.com/download/jpg/202010/e390b22120b1a6c01732c3bf5a4c8dd7_800_500.jpg!con")'
    },
    {
      content: '區塊 2',
      icon: 'android',
      timeLineTitle: '2個區塊的標題',
      timeLineContent: 'Create a services site 2',
      background: 'url("https://img.ixintu.com/download/jpg/202110/ebdf9d9127383b8c414571bacffa89f8_800_509.jpg!con")'
    },
    {
      content: '區塊 3',
      icon: 'android',
      timeLineTitle: '3個區塊的標題',
      timeLineContent: 'Create a services site 3',
      background: 'url("https://img.ixintu.com/download/jpg/202003/f9e1561a55bec2e7972822702172126f_800_399.jpg!con")'
    }
    ,
    {
      content: '區塊 4',
      icon: 'android',
      timeLineTitle: '4個區塊的標題',
      timeLineContent: 'Create a services site 4',
      background: 'url("https://img.ixintu.com/download/jpg/202003/f9e1561a55bec2e7972822702172126f_800_399.jpg!con")'
    },
    {
      content: '區塊 5',
      icon: 'android',
      timeLineTitle: '5個區塊的標題',
      timeLineContent: 'Create a services site 5',
      background: 'url("https://img.ixintu.com/download/jpg/202003/f9e1561a55bec2e7972822702172126f_800_399.jpg!con")'
    },
    {
      content: '區塊 6',
      icon: 'android',
      timeLineTitle: '6個區塊的標題',
      timeLineContent: 'Create a services site 6',
      background: 'url("https://img.ixintu.com/download/jpg/202003/f9e1561a55bec2e7972822702172126f_800_399.jpg!con")'
    },
    {
      content: '區塊 3',
      icon: 'android',
      timeLineTitle: '7個區塊的標題',
      timeLineContent: 'Create a services site 7',
      background: 'url("https://img.ixintu.com/download/jpg/202003/f9e1561a55bec2e7972822702172126f_800_399.jpg!con")'
    },
    {
      content: '區塊 3',
      icon: 'android',
      timeLineTitle: '8個區塊的標題',
      timeLineContent: 'Create a services site 8',
      background: 'url("https://img.ixintu.com/download/jpg/202003/f9e1561a55bec2e7972822702172126f_800_399.jpg!con")'
    },
    {
      content: '區塊 3',
      icon: 'android',
      timeLineTitle: '9個區塊的標題',
      timeLineContent: 'Create a services site 9',
      background: 'url("https://img.ixintu.com/download/jpg/202003/f9e1561a55bec2e7972822702172126f_800_399.jpg!con")'
    },
    {
      content: '區塊 3',
      icon: 'android',
      timeLineTitle: '10個區塊的標題',
      timeLineContent: 'Create a services site 10',
      background: 'url("https://img.ixintu.com/download/jpg/202003/f9e1561a55bec2e7972822702172126f_800_399.jpg!con")'
    },
    {
      content: '區塊 3',
      icon: 'android',
      timeLineTitle: '11個區塊的標題',
      timeLineContent: 'Create a services site 11',
      background: 'url("https://img.ixintu.com/download/jpg/202003/f9e1561a55bec2e7972822702172126f_800_399.jpg!con")'
    },
    {
      content: '區塊 3',
      icon: 'android',
      timeLineTitle: '12個區塊的標題',
      timeLineContent: 'Create a services site 12',
      background: 'url("https://img.ixintu.com/download/jpg/202003/f9e1561a55bec2e7972822702172126f_800_399.jpg!con")'
    },
    {
      content: '區塊 3',
      icon: 'android',
      timeLineTitle: '13個區塊的標題',
      timeLineContent: 'Create a services site 13',
      background: 'url("https://img.ixintu.com/download/jpg/202003/f9e1561a55bec2e7972822702172126f_800_399.jpg!con")'
    },
    {
      content: '區塊 3',
      icon: 'qq',
      timeLineTitle: '14個區塊的標題',
      timeLineContent: 'Create a services site 14',
      background: 'url("https://img.ixintu.com/download/jpg/202003/f9e1561a55bec2e7972822702172126f_800_399.jpg!con")'
    },

    // 新增更多區塊
  ];

  ngOnInit(): void {

    this.timeLineForm = this.fb.group({
      Background: [null, [Validators.required]],
      Content: [null, [Validators.required]],
      Title: [null, [Validators.required]],
      TimeLineIcon: 'android',
      TimeLineDate: [null, [Validators.required]],
      TimeLineContent: [null, [Validators.required]],
    });


    fromEvent(window, 'scroll')
      .pipe(debounceTime(100))
      .subscribe(() => {
        this.updateCurrentSectionIndex();
        this.updateVisibleSections()
      });
    //this.visibleSections = this.sections.slice(0, this.numToShow);

    const app = initializeApp(this.firebaseConfig);
    const analytics = getDatabase(app);
    const starCountRef = databaseRef(analytics);

    onValue(starCountRef, (snapshot) => {
      this.isLoading = false;
      if (snapshot.val()) {
        this.sections = this.formatData(snapshot.val());
        console.log("🚀 ~ this.sections:", this.sections)
        this.visibleSections = this.sections.slice(0, this.numToShow);
      }
    });


    // get(starCountRef).then((snapshot) => {
    //   if (snapshot.exists()) {
    //     this.sections = snapshot.val();
    //     this.visibleSections = this.sections.slice(0, this.numToShow);
    //     this.isLoading = false;
    //     console.log(snapshot.val());
    //   } else {
    //     console.log("No data available");
    //   }
    // }).catch((error) => {
    //   console.error(error);
    // });
  }

  formatData(data: any) {

    let tempData: any[] = [];
    let valueData = Object.values(data).filter((item: any, index, self) =>
      index === self.findIndex((t: any) => t.Background === item.Background)
    );;

    // 對 valueData 進行日期排序
    valueData.sort((a: any, b: any) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA.getDate() - dateB.getDate();
    });

    valueData.forEach((x: any, index) => {
      x.ID = index;
      tempData.push(x);
    });
    return tempData;
  }

  firebaseConfig = {
    apiKey: "AIzaSyD-RyoqPsFCc6xVi0AGAJRv17qmq-t0r2I",
    authDomain: "ethensideproject.firebaseapp.com",
    databaseURL: "https://ethensideproject-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "ethensideproject",
    storageBucket: "ethensideproject.appspot.com",
    messagingSenderId: "164342161327",
    appId: "1:164342161327:web:d6fd5c266a90a7d376995a",
    measurementId: "G-MPFTWMDN0W"
  };

  updateVisibleSections() {
    const groupIndex = Math.floor(this.currentSectionIndex / this.numToShow);
    const startIdx = groupIndex * this.numToShow;
    const endIdx = startIdx + this.numToShow;
    this.visibleSections = this.sections.slice(startIdx, endIdx);
  }

  findIndex(ID: any) {

    return this.sections.findIndex(x => x.ID === ID) === this.currentSectionIndex
  }

  updateCurrentSectionIndex() {
    const windowHeight = window.innerHeight;
    const scrollTop = window.scrollY;
    const halfWindowHeight = windowHeight / 2;

    for (let i = 0; i < this.sections.length; i++) {
      const sectionTop = i * windowHeight;
      const sectionBottom = (i + 1) * windowHeight;

      if (sectionTop - scrollTop <= halfWindowHeight && sectionBottom - scrollTop > halfWindowHeight) {
        this.currentSectionIndex = i;
        break;
      }
    }
  }

  generateRandomNumber(length: number): string {
    const characters = '0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  }

}
