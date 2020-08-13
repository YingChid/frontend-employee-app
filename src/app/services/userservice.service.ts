import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  private actionUrl = 'https://dummy-api.cm.edu/';
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
    return this.http.post<T>(this.actionUrl , data);
  }

  public getEmployee<T>(): Observable<T> {
    return this.http.get<T>(this.actionUrl + "employees")
  }

  public getEmployeeById<T>(id: String): Observable<T> {
    return this.http.get<T>(this.actionUrl + "employees/" + id)
  }

  public postEmployee<T>(data: object): Observable<T> {
    return this.http.post<T>(this.actionUrl + "employees" , data);
  }

  public putEmployee<T>(id: String, data: Object): Observable<T> {
    return this.http.put<T>(this.actionUrl + "employees/" + id, data);
  }

  public daleteEmployee<T>(id: String): Observable<T> {
    return this.http.delete<T>(this.actionUrl + "employees/" + id);
  }
}
