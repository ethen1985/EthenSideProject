import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzModalModule } from 'ng-zorro-antd/modal';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NzIconModule,
    NzInputNumberModule,
    NzImageModule,
    NzStatisticModule,
    NzSelectModule,
    NzUploadModule,
    NzButtonModule,
    NzGridModule,
    NzLayoutModule,
    NzCardModule,
    NzDatePickerModule,
    NzSpinModule,
    NzAffixModule,
    NzModalModule,
    NzDrawerModule,
    NzTimelineModule,
    NzFormModule,
    NzInputModule,
  ],
  exports: [
    NzInputNumberModule,
    NzImageModule,
    NzStatisticModule,
    NzSelectModule,
    NzUploadModule,
    NzButtonModule,
    NzGridModule,
    NzModalModule,
    NzIconModule,
    NzLayoutModule,
    NzAffixModule,
    NzCardModule,
    NzSpinModule,
    NzDrawerModule,
    NzTimelineModule,
    NzDatePickerModule,
    NzFormModule,
    NzInputModule,
  ]
})
export class NgzorroModule { }
