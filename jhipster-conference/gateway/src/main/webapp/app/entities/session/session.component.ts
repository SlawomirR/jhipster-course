import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {ISession} from 'app/shared/model/session.model';
import {Principal} from 'app/core';
import {SessionService} from './session.service';

@Component({
    selector: 'jhi-session',
    templateUrl: './session.component.html'
})
export class SessionComponent implements OnInit, OnDestroy {
    sessions: ISession[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private sessionService: SessionService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.sessionService.query().subscribe(
            (res: HttpResponse<ISession[]>) => {
                this.sessions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSessions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISession) {
        return item.id;
    }

    registerChangeInSessions() {
        this.eventSubscriber = this.eventManager.subscribe('sessionListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
