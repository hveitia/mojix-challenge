import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_KEY } from '../../data/constants';

@Injectable()
export class MovieInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const url = req.clone({
            url: `${req.url}?api_key=${API_KEY}`
        });
        return next.handle(url);
    }
}
