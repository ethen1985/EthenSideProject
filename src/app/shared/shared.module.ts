import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgzorroModule } from '../ngzorro/ngzorro.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgzorroModule,
  ],
  exports: [
    NgzorroModule
  ]
})
export class SharedModule { }
