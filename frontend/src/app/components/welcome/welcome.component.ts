import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  movies: any[] | undefined;
  // isLoading: boolean = true;
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    console.log("on ongint");
    this.http.get<any[]>('http://localhost:3000/api/tvshows').subscribe((result) => {
      this.movies = result;
      // this.isLoading = false;
    });
  }

  // searchMovies(title: string): void {
  //   // if (!this.searchTerm) return;
  //   // const url = `http://localhost:3000/api/tvshows/search?searchTerm=${this.searchTerm}`;
  //   // this.http.get<any[]>(url).subscribe((res: any[]) => {
  //   //   this.movies = res;
  //   //   console.log(res);
  //   // });
  //   console.log(title);
  //   this.router.navigate(['api/tvshows', title]);
  // }

  searchMovies(searchTerm: string): void {
    console.log(searchTerm);
    this.router.navigate(['api/tvshows', searchTerm]);
  }

  navigateToDetails(showId: string) {
    this.router.navigate(['api/tvshows', showId]);
  }
}
