import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';



import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { AppComponent } from './app.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { AuthModule } from './auth/auth.module';
import { ChartsModule } from 'ng2-charts';
// import { ImagenPipe } from './pipes/imagen.pipe'; clase222







@NgModule({
  declarations: [
    AppComponent,
    NoPageFoundComponent,
    // ImagenPipe, clase 222



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule,
    ChartsModule



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
