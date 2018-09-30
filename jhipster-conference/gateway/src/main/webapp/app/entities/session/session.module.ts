import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared';
import {
    SessionComponent,
    SessionDeleteDialogComponent,
    SessionDeletePopupComponent,
    SessionDetailComponent,
    sessionPopupRoute,
    sessionRoute,
    SessionUpdateComponent
} from './';

const ENTITY_STATES = [...sessionRoute, ...sessionPopupRoute];

@NgModule({
    imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SessionComponent,
        SessionDetailComponent,
        SessionUpdateComponent,
        SessionDeleteDialogComponent,
        SessionDeletePopupComponent
    ],
    entryComponents: [SessionComponent, SessionUpdateComponent, SessionDeleteDialogComponent, SessionDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewaySessionModule {}
