import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { LoaderService } from '../shared/services/loader/loader.service';

@Injectable()

export class LoaderInterceptor implements HttpInterceptor {
  constructor(private loadersService: LoaderService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadersService.setLoaderStatus(true);
    return next.handle(req).pipe(
      finalize(() => {
        this.loadersService.setLoaderStatus(false);
      })
    );
  }
}
