import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Route, RouterStateSnapshot} from '@angular/router';
import {JhiPaginationUtil, JhiResolvePagingParams} from 'ng-jhipster';

import {AuditsComponent} from './audits.component';

export const auditsRoute: Route = {
    path: 'audits',
    component: AuditsComponent,
    resolve: {
        pagingParams: JhiResolvePagingParams
    },
    data: {
        pageTitle: 'Audits',
        defaulSort: 'auditEventDate,desc'
    }
};
