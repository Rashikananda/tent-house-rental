import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { MessageDialougeComponent } from './message-dialouge/message-dialouge.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './metarial.module';
import { AddTranscComponent } from './add-transc/add-transc.component';



@NgModule({
  declarations: [SnackbarComponent, MessageDialougeComponent, AddTranscComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ]
})
export class SharedModule { }
