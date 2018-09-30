import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ISpeaker, Speaker } from 'app/shared/model/speaker.model';
import { SpeakerService } from './speaker.service';
import { SpeakerComponent } from './speaker.component';
import { SpeakerDetailComponent } from './speaker-detail.component';
import { SpeakerUpdateComponent } from './speaker-update.component';
import { SpeakerDeletePopupComponent } from './speaker-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class SpeakerResolve implements Resolve<ISpeaker> {
    constructor(private service: SpeakerService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((speaker: HttpResponse<Speaker>) => speaker.body));
        }
        return of(new Speaker());
    }
}

export const speakerRoute: Routes = [
    {
        path: 'speaker',
        component: SpeakerComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.speaker.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'speaker/:id/view',
        component: SpeakerDetailComponent,
        resolve: {
            speaker: SpeakerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.speaker.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'speaker/new',
        component: SpeakerUpdateComponent,
        resolve: {
            speaker: SpeakerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.speaker.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'speaker/:id/edit',
        component: SpeakerUpdateComponent,
        resolve: {
            speaker: SpeakerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.speaker.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const speakerPopupRoute: Routes = [
    {
        path: 'speaker/:id/delete',
        component: SpeakerDeletePopupComponent,
        resolve: {
            speaker: SpeakerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.speaker.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
