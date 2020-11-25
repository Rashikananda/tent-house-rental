import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tent-house-rental';
  links = [{link: 'transc', header: 'Transaction'},
  {link: 'reports', header: 'Report'},
  {link: 'dashboard', header: 'Dashboard'},
  {link: 'transc', header: 'Transaction'}]
}
