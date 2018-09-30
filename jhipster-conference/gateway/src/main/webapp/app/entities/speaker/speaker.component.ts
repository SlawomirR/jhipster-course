import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';

import { ISpeaker } from 'app/shared/model/speaker.model';
import { Principal } from 'app/core';
import { SpeakerService } from './speaker.service';

@Component({
    selector: 'jhi-speaker',
    templateUrl: './speaker.component.html'
})
export class SpeakerComponent implements OnInit, OnDestroy {
    speakers: ISpeaker[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private speakerService: SpeakerService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.speakerService.query().subscribe(
            (res: HttpResponse<ISpeaker[]>) => {
                this.speakers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSpeakers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISpeaker) {
        return item.id;
    }

    registerChangeInSpeakers() {
        this.eventSubscriber = this.eventManager.subscribe('speakerListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
