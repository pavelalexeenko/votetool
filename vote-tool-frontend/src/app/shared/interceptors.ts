import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/do';

export class JsonHeaderInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req.clone({ headers: req.headers.set('Content-Type', 'application/json') }));
    }
}

export class RequestProfilerInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const started = Date.now();
        return next.handle(req).do(
            event => {
                if (event instanceof HttpResponse) {
                    console.log(`Request for ${req.method} ${req.urlWithParams} took ${Date.now() - started} ms.`);
                }
            }
        );
    }
}

