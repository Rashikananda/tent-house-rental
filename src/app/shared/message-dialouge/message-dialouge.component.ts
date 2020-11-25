import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-message-dialouge',
  templateUrl: './message-dialouge.component.html',
  styleUrls: ['./message-dialouge.component.scss']
})
export class MessageDialougeComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
  }

}
