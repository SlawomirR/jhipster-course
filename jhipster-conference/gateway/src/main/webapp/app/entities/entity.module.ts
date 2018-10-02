import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {GatewaySpeakerModule} from './speaker/speaker.module';
import {GatewaySessionModule} from './session/session.module';
import {GatewayBlogModule as BlogBlogModule} from './blog/blog/blog.module';

/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        GatewaySpeakerModule,
        GatewaySessionModule,
        BlogBlogModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayEntityModule {}
