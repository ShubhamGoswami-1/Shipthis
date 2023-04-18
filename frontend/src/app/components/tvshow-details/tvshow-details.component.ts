import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tvshow-details',
  templateUrl: './tvshow-details.component.html',
  styleUrls: ['./tvshow-details.component.css']
})
export class TvshowDetailsComponent {

  tvshow: any;

  constructor(private router: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    const showId = this.router.snapshot.paramMap.get('id');
    this.http.get<any>(`http://localhost:3000/api/tvshows/${showId}`).subscribe((result) => {
      this.tvshow = result;
      console.log(result);
    });
  }

}
