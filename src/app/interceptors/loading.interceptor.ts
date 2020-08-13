import { LoadingScreenService } from '../services/loading-screen.service';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { finalize } from 'rxjs/operators';

@Injectable()
export class LoadingScreenInterceptor implements HttpInterceptor {
  activeRequests = 0;

  constructor(private loadingScreenService: LoadingScreenService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.activeRequests === 0) {
      this.loadingScreenService.startLoading();
    }

    this.activeRequests++;

    const token = localStorage.getItem('basic');
    if (token) {
      request = request.clone({
        setHeaders: {
          'Authorization': `Basic dXNlcjQ6bjdwaEJ3M2JKUjVFZlRNak0wa1c=`
        }
      });
    } else {
      request = request.clone({
        setHeaders: {
          'Authorization': `Basic dXNlcjQ6bjdwaEJ3M2JKUjVFZlRNak0wa1c=`,
          'Content-Type': 'application/json'
        }
      });
    }

    return next.handle(request).pipe(
      finalize(() => {
        this.activeRequests--;
        if (this.activeRequests === 0) {
          this.loadingScreenService.stopLoading();
        }
      })
    );
  }
}
