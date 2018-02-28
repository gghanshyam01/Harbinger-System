import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-banner',
  templateUrl: './header-banner.component.html',
  styleUrls: ['./header-banner.component.css']
})
export class HeaderBannerComponent implements OnInit {
  title = 'Harbinger System';
  navLinks = [
    'Home',
    'How-To-Use',
    'About Us'
  ];

  constructor() { }

  ngOnInit() { }
}
