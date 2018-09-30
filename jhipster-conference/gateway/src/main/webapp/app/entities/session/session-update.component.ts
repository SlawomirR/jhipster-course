import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { ISession } from 'app/shared/model/session.model';
import { SessionService } from './session.service';
import { ISpeaker } from 'app/shared/model/speaker.model';
import { SpeakerService } from 'app/entities/speaker';

@Component({
    selector: 'jhi-session-update',
    templateUrl: './session-update.component.html'
})
export class SessionUpdateComponent implements OnInit {
    private _session: ISession;
    isSaving: boolean;

    speakers: ISpeaker[];
    startDateTime: string;
    endDateTime: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private sessionService: SessionService,
        private speakerService: SpeakerService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ session }) => {
            this.session = session;
        });
        this.speakerService.query().subscribe(
            (res: HttpResponse<ISpeaker[]>) => {
                this.speakers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.session.startDateTime = moment(this.startDateTime, DATE_TIME_FORMAT);
        this.session.endDateTime = moment(this.endDateTime, DATE_TIME_FORMAT);
        if (this.session.id !== undefined) {
            this.subscribeToSaveResponse(this.sessionService.update(this.session));
        } else {
            this.subscribeToSaveResponse(this.sessionService.create(this.session));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISession>>) {
        result.subscribe((res: HttpResponse<ISession>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackSpeakerById(index: number, item: ISpeaker) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
    get session() {
        return this._session;
    }

    set session(session: ISession) {
        this._session = session;
        this.startDateTime = moment(session.startDateTime).format(DATE_TIME_FORMAT);
        this.endDateTime = moment(session.endDateTime).format(DATE_TIME_FORMAT);
    }
}
