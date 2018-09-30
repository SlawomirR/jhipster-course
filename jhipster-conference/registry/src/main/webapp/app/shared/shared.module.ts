import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {DatePipe} from '@angular/common';
import {CookieService} from 'ngx-cookie';

import {
    AccountService,
    AuthServerProvider,
    AuthSessionServerProvider,
    CSRFService,
    HasAnyAuthorityDirective,
    JhiLoginModalComponent,
    JHipsterRegistrySharedCommonModule,
    JHipsterRegistrySharedLibsModule,
    JhiRefreshService,
    JhiRoutesService,
    LoginModalService,
    LoginOAuth2Service,
    LoginService,
    Principal,
    StateStorageService,
    UserService
} from './';

@NgModule({
    imports: [JHipsterRegistrySharedLibsModule, JHipsterRegistrySharedCommonModule],
    declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
    providers: [
        JhiRoutesService,
        JhiRefreshService,
        AuthServerProvider,
        AuthSessionServerProvider,
        CookieService,
        LoginService,
        LoginModalService,
        LoginOAuth2Service,
        AccountService,
        StateStorageService,
        Principal,
        CSRFService,
        AuthServerProvider,
        UserService,
        DatePipe
    ],
    entryComponents: [JhiLoginModalComponent],
    exports: [JHipsterRegistrySharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective, DatePipe],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JHipsterRegistrySharedModule {}
