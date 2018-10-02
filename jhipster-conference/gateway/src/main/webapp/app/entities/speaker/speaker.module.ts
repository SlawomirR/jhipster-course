import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {GatewaySharedModule} from 'app/shared';
import {
    SpeakerComponent,
    SpeakerDeleteDialogComponent,
    SpeakerDeletePopupComponent,
    SpeakerDetailComponent,
    speakerPopupRoute,
    speakerRoute,
    SpeakerUpdateComponent
} from './';

const ENTITY_STATES = [...speakerRoute, ...speakerPopupRoute];

@NgModule({
    imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SpeakerComponent,
        SpeakerDetailComponent,
        SpeakerUpdateComponent,
        SpeakerDeleteDialogComponent,
        SpeakerDeletePopupComponent
    ],
    entryComponents: [SpeakerComponent, SpeakerUpdateComponent, SpeakerDeleteDialogComponent, SpeakerDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewaySpeakerModule {}
