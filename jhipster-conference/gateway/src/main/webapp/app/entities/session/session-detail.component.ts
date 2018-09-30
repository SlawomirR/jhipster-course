import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISession } from 'app/shared/model/session.model';

@Component({
    selector: 'jhi-session-detail',
    templateUrl: './session-detail.component.html'
})
export class SessionDetailComponent implements OnInit {
    session: ISession;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ session }) => {
            this.session = session;
        });
    }

    previousState() {
        window.history.back();
    }
}
