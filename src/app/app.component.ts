import { Component, OnInit } from '@angular/core';
import { HttpUtilService, AuthenticationService } from './components/common/services/all';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private httpUtilService: HttpUtilService, 
              private authorisationService: AuthenticationService) {

  }

  ngOnInit() {
    this.authorisationService._make_signed_request().subscribe(response => {
      console.log('Response is : ' + response);
    });
  }
}
