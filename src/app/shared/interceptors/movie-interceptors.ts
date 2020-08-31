import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import {API_KEY, API_LANGUAGES} from '../../data/constants';
import {ObjectsContainerService} from '../services/objects-container.service';

@Injectable()
export class MovieInterceptor implements HttpInterceptor {
    constructor(private objectsContainerService: ObjectsContainerService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const lang = this.objectsContainerService.getActiveLanguage();
        const url = req.clone({
            url: `${req.url}?language=${API_LANGUAGES[lang]}&api_key=${API_KEY}`
        });
        return next.handle(url);
    }
}
