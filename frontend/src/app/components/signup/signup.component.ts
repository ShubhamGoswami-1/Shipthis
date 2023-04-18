import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  email: string | undefined;
  password: string | undefined;
  age: number | undefined;
  
  constructor(private http: HttpClient, private router: Router) { }

  onSubmit(formData: any) {
    let bodyData =
    {
      "email" : formData.email,
      "age" : formData.age,
      "password" : formData.password,
    };
    console.log(bodyData);
    this.http.post('http://localhost:3000/signup', bodyData).subscribe(
      (response) => {
        if(response){
          this.router.navigate(['login', {formData}]);
        }
      },
      (error) => {
        console.log(error);
        this.router.navigate(['not-authenticated']);
      }
    );
  }

  goToLogin(){
    this.router.navigate(['login']);
  }
//   onSubmit(formData.value) {
//     console.log(formData.value);
//     let url = 'http://localhost:3080/signup';
//     this.http.post(url, {registerForm(registerForm)}).subscribe(res => 
//        console.log(res.json()));
//  }
}