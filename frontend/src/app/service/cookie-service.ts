import { Injectable } from '@angular/core';
import { CookieOptions, CookieService as NgxCookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  constructor(private ngxCookieService: NgxCookieService) { }

  public setCookie(name: string, value: any) {
    this.ngxCookieService.put(name, value);
  }

  public getCookie(name: string): any {
    return this.ngxCookieService.get(name);
  }

//   public deleteCookie(name: string, path?: string) {
//     this.ngxCookieService.remove(name, path);
//   }
}
