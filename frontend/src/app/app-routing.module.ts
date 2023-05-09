// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { LoginComponent } from './components/login/login.component';
// import { WelcomeComponent } from './components/welcome/welcome.component';
// import { SignupComponent } from './components/signup/signup.component';
// import { TvshowDetailsComponent } from './components/tvshow-details/tvshow-details.component';

// const routes: Routes = [
//   {
//     path: '', component: SignupComponent 
//   },
//   {
//     path: 'login', component: LoginComponent
//   },
//   {
//     path: 'welcome/:token', component: WelcomeComponent
//   },
//   { 
//     path: 'api/tvshows/:id', component: TvshowDetailsComponent 
//   }
// ];


// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { SignupComponent } from './components/signup/signup.component';
import { TvshowDetailsComponent } from './components/tvshow-details/tvshow-details.component';
import { AuthGuard } from './auth-gaurd';


const routes: Routes = [
  {
    path: '', component: SignupComponent 
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuard]
  },
  { 
    path: 'api/tvshows/:id', component: TvshowDetailsComponent, canActivate: [AuthGuard]
  },
  {
    path: '**', component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

