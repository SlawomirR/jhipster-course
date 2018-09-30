/* tslint:disable max-line-length */
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { SpeakerUpdateComponent } from 'app/entities/speaker/speaker-update.component';
import { SpeakerService } from 'app/entities/speaker/speaker.service';
import { Speaker } from 'app/shared/model/speaker.model';

describe('Component Tests', () => {
    describe('Speaker Management Update Component', () => {
        let comp: SpeakerUpdateComponent;
        let fixture: ComponentFixture<SpeakerUpdateComponent>;
        let service: SpeakerService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [SpeakerUpdateComponent]
            })
                .overrideTemplate(SpeakerUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SpeakerUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SpeakerService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Speaker(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.speaker = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Speaker();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.speaker = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
