import {LOCALE_ID, NgModule} from '@angular/core';
import {DatePipe, registerLocaleData} from '@angular/common';
import {Title} from '@angular/platform-browser';
import locale from '@angular/common/locales/en';

import {
    AccountService,
    AuthServerProvider,
    CSRFService,
    LoginModalService,
    LoginService,
    Principal,
    StateStorageService,
    UserRouteAccessService,
    UserService
} from './';

@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [
        LoginService,
        LoginModalService,
        Title,
        {
            provide: LOCALE_ID,
            useValue: 'en'
        },
        AccountService,
        StateStorageService,
        Principal,
        CSRFService,
        AuthServerProvider,
        UserService,
        DatePipe,
        UserRouteAccessService
    ]
})
export class JhipsterCoreModule {
    constructor() {
        registerLocaleData(locale);
    }
}
