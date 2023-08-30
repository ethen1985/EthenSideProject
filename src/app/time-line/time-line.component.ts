import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, get, child } from "firebase/database";

@Component({
  selector: 'app-time-line',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.css']
})
export class TimeLineComponent implements OnInit {

  // 在組件類別中新增一個成員變數
  visibleSections: any[] = [];
  numToShow = 5; // 顯示的區塊數量
  constructor() { }
  sections = [
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
  currentSectionIndex = 0;
  ngOnInit(): void {
    fromEvent(window, 'scroll')
      .pipe(debounceTime(100))
      .subscribe(() => {
        this.updateCurrentSectionIndex();
        this.updateVisibleSections()
      });
    this.visibleSections = this.sections.slice(0, this.numToShow);

    const app = initializeApp(this.firebaseConfig);
    const analytics = getDatabase(app);
    const starCountRef = ref(analytics);
    console.log("🚀 ~ starCountRef:", starCountRef)
    get(starCountRef).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
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

  findIndex(timeLineTitle: any) {

    return this.sections.findIndex(x => x.timeLineTitle === timeLineTitle) === this.currentSectionIndex


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

}
