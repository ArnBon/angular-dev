import { Component, OnInit } from '@angular/core';
import { SettingService } from 'src/app/services/setting.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: []
})
export class AccountSettingsComponent implements OnInit {

  public linkTheme = document.querySelector('#theme');
  public links: NodeListOf<Element>;

  constructor(private settingService: SettingService) { }

  ngOnInit(): void {
    this.settingService.checkCurrentTheme();
    // this.links = document.querySelectorAll('.selector');
    // this.checkCurrentTheme();
  }

   changeTheme( theme: string ) {

    // console.log( theme );
    // const url = `./assets/css/colors/${theme}.css`;
    // console.log(url);
    // console.log( this.linkTheme );
    this.settingService.changeTheme(theme)
    // this.linkTheme.setAttribute('href', url);
    // localStorage.setItem('theme', url);

    // this.checkCurrentTheme();
    // this.settingService.checkCurrentTheme();
  }

  // checkCurrentTheme() {
  //   this.links.forEach( elem => {

  //     elem.classList.remove('working');
  //     const btnTheme = elem.getAttribute('data-theme');
  //     const btnThemeUrl = `./assets/css/colors/${ btnTheme }.css`;
  //     const currentTheme = this.linkTheme.getAttribute('href');

  //     if ( btnThemeUrl === currentTheme ) {
  //       elem.classList.add('working');
  //     }

  //   });

  // }

}
