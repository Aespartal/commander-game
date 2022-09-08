import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  hello: string = '';

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.homeService.getHello().subscribe((res) => {
      if(res?.body) {
        this.hello = res?.body;
      }
    })
  }

}
