import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JHipsterRegistrySharedModule} from '../shared';
import {CommonModule} from '@angular/common';

import {
    JhiApplicationsComponent,
    JhiApplicationsService,
    JhiConfigComponent,
    JhiConfigService,
    JhiEncryptionComponent,
    JhiEncryptionService,
    JhiHistoryComponent,
    JhiHistoryService,
    JhiReplicasComponent,
    JhiReplicasService,
    JhiSSHComponent,
    JhiSSHService,
    registryState
} from './';

@NgModule({
    imports: [JHipsterRegistrySharedModule, CommonModule, RouterModule.forRoot(registryState, { useHash: true })],
    declarations: [
        JhiApplicationsComponent,
        JhiConfigComponent,
        JhiEncryptionComponent,
        JhiHistoryComponent,
        JhiReplicasComponent,
        JhiSSHComponent
    ],
    entryComponents: [],
    providers: [JhiApplicationsService, JhiConfigService, JhiEncryptionService, JhiHistoryService, JhiReplicasService, JhiSSHService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JHipsterRegistryModule {}
