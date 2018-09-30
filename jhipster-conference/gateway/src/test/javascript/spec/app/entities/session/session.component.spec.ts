/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { SessionComponent } from 'app/entities/session/session.component';
import { SessionService } from 'app/entities/session/session.service';
import { Session } from 'app/shared/model/session.model';

describe('Component Tests', () => {
    describe('Session Management Component', () => {
        let comp: SessionComponent;
        let fixture: ComponentFixture<SessionComponent>;
        let service: SessionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [SessionComponent],
                providers: []
            })
                .overrideTemplate(SessionComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SessionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SessionService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Session(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.sessions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
