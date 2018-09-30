import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {JHipsterRegistrySharedModule} from 'app/shared';

import {
    adminState,
    JhiConfigurationComponent,
    JhiConfigurationService,
    JhiDocsComponent,
    JhiHealthCheckComponent,
    JhiHealthModalComponent,
    JhiHealthService,
    JhiLogfileComponent,
    JhiLogfileService,
    JhiMetricsMonitoringComponent,
    JhiMetricsMonitoringModalComponent,
    JhiMetricsService,
    LogsComponent,
    LogsService
} from './';

@NgModule({
    imports: [JHipsterRegistrySharedModule, RouterModule.forChild(adminState)],
    declarations: [
        LogsComponent,
        JhiConfigurationComponent,
        JhiDocsComponent,
        JhiHealthCheckComponent,
        JhiHealthModalComponent,
        JhiMetricsMonitoringComponent,
        JhiMetricsMonitoringModalComponent,
        JhiLogfileComponent
    ],
    entryComponents: [JhiHealthModalComponent, JhiMetricsMonitoringModalComponent],
    providers: [JhiConfigurationService, JhiHealthService, JhiMetricsService, LogsService, JhiLogfileService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JHipsterRegistryAdminModule {}
