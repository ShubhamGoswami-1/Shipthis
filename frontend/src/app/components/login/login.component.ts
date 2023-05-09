import { Component , OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from '../../service/cookie-service';
// import { CookieOptions, CookieService as NgxCookieService } from 'ngx-cookie';

interface LoginResponse {
  userData: any;
  accessToken: string;
  age: number;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  email: string | undefined;
  password: string | undefined;
  age: number | undefined;

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(formData: any){
    let bodyData =
    {
      "email" : formData.email,
      "age" : formData.age,
      "password" : formData.password,
    };
    

    
    this.http.post<LoginResponse>('http://localhost:3000/login', bodyData).subscribe(result => {
      // if (result && result.accessToken) {
      //   console.log(result);
      //   localStorage.setItem("token", result.accessToken);
      //   localStorage.setItem("userData", result.userData.age)
      //   // this.router.navigate(['welcome']);
      //   this.router.navigate(['welcome'], { queryParams: { from: 'navigation' } });
      // } else {
      //   this.router.navigate(['login']);
      // }
      if (result && result.accessToken) {
        console.log(result);
        localStorage.setItem("token", result.accessToken);
        localStorage.setItem("userData", JSON.stringify(result.userData)); // Store userData in local storage
        this.router.navigate(['welcome'], { queryParams: { from: 'navigation' } });
      } else {
        this.router.navigate(['login']);
      }
    });

  }


  
  ngOnInit() : void {

  }

}
