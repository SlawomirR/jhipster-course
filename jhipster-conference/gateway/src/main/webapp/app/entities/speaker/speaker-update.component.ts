import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JhiAlertService} from 'ng-jhipster';

import {ISpeaker} from 'app/shared/model/speaker.model';
import {SpeakerService} from './speaker.service';
import {ISession} from 'app/shared/model/session.model';
import {SessionService} from 'app/entities/session';

@Component({
    selector: 'jhi-speaker-update',
    templateUrl: './speaker-update.component.html'
})
export class SpeakerUpdateComponent implements OnInit {
    private _speaker: ISpeaker;
    isSaving: boolean;

    sessions: ISession[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private speakerService: SpeakerService,
        private sessionService: SessionService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ speaker }) => {
            this.speaker = speaker;
        });
        this.sessionService.query().subscribe(
            (res: HttpResponse<ISession[]>) => {
                this.sessions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.speaker.id !== undefined) {
            this.subscribeToSaveResponse(this.speakerService.update(this.speaker));
        } else {
            this.subscribeToSaveResponse(this.speakerService.create(this.speaker));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISpeaker>>) {
        result.subscribe((res: HttpResponse<ISpeaker>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackSessionById(index: number, item: ISession) {
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
    get speaker() {
        return this._speaker;
    }

    set speaker(speaker: ISpeaker) {
        this._speaker = speaker;
    }
}
