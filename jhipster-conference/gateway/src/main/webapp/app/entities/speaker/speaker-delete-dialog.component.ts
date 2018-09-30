import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISpeaker } from 'app/shared/model/speaker.model';
import { SpeakerService } from './speaker.service';

@Component({
    selector: 'jhi-speaker-delete-dialog',
    templateUrl: './speaker-delete-dialog.component.html'
})
export class SpeakerDeleteDialogComponent {
    speaker: ISpeaker;

    constructor(private speakerService: SpeakerService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.speakerService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'speakerListModification',
                content: 'Deleted an speaker'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-speaker-delete-popup',
    template: ''
})
export class SpeakerDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ speaker }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SpeakerDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.speaker = speaker;
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
