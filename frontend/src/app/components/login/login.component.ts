import { Component , OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


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
    // console.log(bodyData);
    // this.http.post('http://localhost:3000/login', bodyData).subscribe(
    //   (response) => {
    //     // console.log(response);
    //     formData.email = '';
    //     formData.age = '';
    //     formData.password = '';
    //     formData.resetForm(); 
    //     console.log("lets go to welcome");
    //     // console.log(this.router);
    //     this.router.navigate(['welcome']);
       
    //   },
    //   error => {
    //   console.error(error);
    //   // handle the error
    // });
    this.http.post('http://localhost:3000/login', bodyData).subscribe(result => {
      if(result){
        this.router.navigate(['welcome']);
      }
    });

  }

  ngOnInit() : void {

  }

}
