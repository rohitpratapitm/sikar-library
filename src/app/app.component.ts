import { Component } from '@angular/core';
import { GlobalUtilService, HttpUtilService, OAuth2Service } from './components/common/services/all';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private authService: OAuth2Service) {
  }
}
