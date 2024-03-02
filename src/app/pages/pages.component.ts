import { Component, OnInit } from '@angular/core';
import { SettingService } from '../services/setting.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  public linkTheme = document.querySelector('#theme');

  constructor(private settingService: SettingService) { }

  ngOnInit(): void {
    // const url = localStorage.getItem('theme') || './assets/css/colors/purple-dark.css';
    // this.linkTheme.setAttribute('href', url);
    // localStorage.setItem('theme', url);

  }






}
