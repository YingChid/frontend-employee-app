import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  private actionUrl = 'api/users/';
  // tslint:disable-next-line:ban-types
  public currentUserSubject: BehaviorSubject<Object>;
  // tslint:disable-next-line:ban-types
  public currentUser: Observable<Object>;

  constructor(private http: HttpClient) {
      // tslint:disable-next-line:ban-types
      this.currentUserSubject = new BehaviorSubject<Object>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public login<T>(data: object): Observable<T> {
    return this.http.post<T>(this.actionUrl + 'authenticate', data);
  }
}
