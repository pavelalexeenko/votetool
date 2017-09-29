import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    HttpClientModule,
    HTTP_INTERCEPTORS,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpEvent,
    HttpHeaders,
    HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/do';

import { UserService } from './service/user.service';

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

export class JsonHeaderInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req.clone({ headers: req.headers.set('Content-Type', 'application/json') }));
    }
}

const MODULES = [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
];

const PIPES = [];

const COMPONENTS = [];

const PROVIDERS = [
    { provide: HTTP_INTERCEPTORS, useClass: JsonHeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RequestProfilerInterceptor, multi: true },
    UserService
];

@NgModule({
    imports: [
        ...MODULES
    ],
    declarations: [
        ...PIPES,
        ...COMPONENTS
    ],
    exports: [
        ...MODULES,
        ...PIPES,
        ...COMPONENTS
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                ...PROVIDERS
            ]
        };
    }
}
