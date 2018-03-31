import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/Router';

import { AppComponent } from './app.component';
import { HeaderBannerComponent } from './header-banner/header-banner.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthService } from './auth/auth.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainContentComponent } from './dashboard/main-content/main-content.component';
import { SidebarListComponent } from './dashboard/sidebar-list/sidebar-list.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent }
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
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
