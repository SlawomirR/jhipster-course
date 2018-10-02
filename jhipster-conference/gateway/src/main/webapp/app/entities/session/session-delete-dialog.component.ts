import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {NgbActiveModal, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {ISession} from 'app/shared/model/session.model';
import {SessionService} from './session.service';

@Component({
    selector: 'jhi-session-delete-dialog',
    templateUrl: './session-delete-dialog.component.html'
})
export class SessionDeleteDialogComponent {
    session: ISession;

    constructor(private sessionService: SessionService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.sessionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'sessionListModification',
                content: 'Deleted an session'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-session-delete-popup',
    template: ''
})
export class SessionDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ session }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SessionDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.session = session;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
