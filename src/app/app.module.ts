import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/Router';

import { AppComponent } from './app.component';
import { HeaderBannerComponent } from './header-banner/header-banner.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainContentComponent } from './dashboard/main-content/main-content.component';
import { SidebarListComponent } from './dashboard/sidebar-list/sidebar-list.component';

import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from './auth/auth.service';
import { MapDataShareService } from './dashboard/shared/map-data-share.service';
import { AngularFireModule } from 'angularfire2';
import { AuthGuardService } from './auth/auth-guard.service';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', canActivate: [AuthGuardService], component: DashboardComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderBannerComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    MainContentComponent,
    SidebarListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyAXmZj2C6kSKgrNDLbI7Pjgv3nhl79ADxg',
      authDomain: 'harbinger-system.firebaseapp.com',
      databaseURL: 'https://harbinger-system.firebaseio.com',
      projectId: 'harbinger-system'
    }),
    RouterModule.forRoot(appRoutes)
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyBnjAUdZ0I_9ziyLEWyY17pnEeTu00cvz8'
    // }),
    // AgmDirectionModule
  ],
  providers: [AuthService, MapDataShareService, AngularFireDatabase, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
