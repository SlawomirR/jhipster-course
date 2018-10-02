/* tslint:disable max-line-length */
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Observable, of} from 'rxjs';
import {HttpHeaders, HttpResponse} from '@angular/common/http';

import {GatewayTestModule} from '../../../test.module';
import {SpeakerComponent} from 'app/entities/speaker/speaker.component';
import {SpeakerService} from 'app/entities/speaker/speaker.service';
import {Speaker} from 'app/shared/model/speaker.model';

describe('Component Tests', () => {
    describe('Speaker Management Component', () => {
        let comp: SpeakerComponent;
        let fixture: ComponentFixture<SpeakerComponent>;
        let service: SpeakerService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [SpeakerComponent],
                providers: []
            })
                .overrideTemplate(SpeakerComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SpeakerComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SpeakerService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Speaker(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.speakers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
