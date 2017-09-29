import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JsonHeaderInterceptor, RequestProfilerInterceptor } from './interceptors';

import { UserService } from './service/user.service';

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
