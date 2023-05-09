

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute,NavigationExtras  } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
// export class WelcomeComponent implements OnInit{

//   movieResult = {};

//   constructor(private http: HttpClient) {}

//   ngOnInit(): void {

//   }

//   getMovieName(data: any) {
//     console.log(data);
//     this.movieResult = this.http.get('http://localhost:3000/api/tvshows/search', data).subscribe(res => console.log(res));
//     console.log(this.movieResult);
//   }

// }

export class WelcomeComponent implements OnInit{

  searchTerm: string | undefined;
  typeofShow: any | undefined;
  searchType: any;
  movies: any[] | undefined;
  // isLoading: boolean = true;
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  
  ngOnInit(): void {
    const fromNavigation = this.route.snapshot.queryParamMap.get('from') === 'navigation';
    console.log('Route was called from navigation:', fromNavigation);
    let headers;
    if(fromNavigation){
      headers = new HttpHeaders().set("Authorization", `bearer ${localStorage.getItem('token')}`)
    }
    if(headers){
      // console.log(headers);
      this.http.get<any[]>('http://localhost:3000/api/tvshows', {headers}).subscribe((result:any) => {
        console.log(result);
        this.movies = result;
    })
    }
    else{
      this.router.navigate(['login']);
    }
    // headers = new HttpHeaders().set("Authorization", `bearer ${localStorage.getItem('token')}`)
    
  }
//   ngOnInit(): void {
//   const fromNavigation = this.route.snapshot.queryParamMap.get('from') === 'navigation';
//   console.log('Route was called from navigation:', fromNavigation);

//   // Check if headers have already been set
//   const headersSet = localStorage.getItem('headersSet') === 'true';

//   if (fromNavigation || headersSet) {
//     const headers = new HttpHeaders().set("Authorization", `bearer ${localStorage.getItem('token')}`);
//     this.http.get<any[]>('http://localhost:3000/api/tvshows', { headers }).subscribe((result: any) => {
//       console.log(result);
//       this.movies = result;

//       // Set headersSet flag in local storage
//       localStorage.setItem('headersSet', 'true');
//     }, error => {
//       console.error(error);
//       this.router.navigate(['login']);
//     });
//   } else {
//     this.router.navigate(['login']);
//   }
// }

 


  
  

 
  searchMovies(searchTerm: string,typeofShow:string): void {
    console.log(searchTerm);
    let headers = new HttpHeaders().set("Authorization", `bearer ${localStorage.getItem('token')}`);
    // const url = `/api/tvshows/${searchTerm}`;
    console.log(headers)

    const navigationExtras: NavigationExtras = {
      state: {
        headers: headers
      }
    };

    const url = `/api/tvshows/${searchTerm}?tvshow=${typeofShow}`;
    this.router.navigate([url]);
  }
  navigateToDetails(showId: string) {

    let headers = new HttpHeaders().set("Authorization", `bearer ${localStorage.getItem('token')}`);

    const navigationExtras: NavigationExtras = {
      state: {
        headers: headers
      }
    };

    this.router.navigate(['api/tvshows', showId]);
  }

  // tvshowfunc() {
  //   console.log(this.typeofShow);
  // }
  
}

/*
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})

export class WelcomeComponent implements OnInit{
  searchTerm: string | undefined;
  movies: any[] | undefined;
  token: string | null | undefined;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  // this.token = this.route.snapshot.queryParamMap.get('token');
  //   if (this.token) {
  //     const headers = new HttpHeaders({
  //       'Authorization': 'Bearer ' + this.token
  //     });
  //     this.http.get<any[]>('http://localhost:3000/api/tvshows', { headers }).subscribe((result) => {
  //       this.movies = result;
  //     });
  //   }


  ngOnInit(): void {
      let headers = new HttpHeaders().set("Authorization", `bearer ${localStorage.getItem('token')}`)
      this.http.get<any[]>('http://localhost:3000/api/tvshows', {headers}).subscribe((result:any) => {
        console.log(result);
      })
  }

  searchMovies(searchTerm: string): void {
    this.http.get<any[]>(`http://localhost:3000/api/tvshows?q=${searchTerm}`, { headers: this.getHeaders() }).subscribe((result) => {
      this.movies = result;
    });
  }

  navigateToDetails(showId: string) {
    this.http.get<any[]>(`http://localhost:3000/api/tvshows/${showId}`, { headers: this.getHeaders() }).subscribe((result) => {
      // handle the result
    });
  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    if (this.token) {
      headers = headers.set('Authorization', 'Bearer ' + this.token);
    }
    return headers;
  }
}

*/