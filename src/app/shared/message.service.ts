import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialougeComponent } from './message-dialouge/message-dialouge.component';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(public dialog: MatDialog) {}

  showMessage(data: object) {
    this.dialog.open(MessageDialougeComponent,data);
  }
}
