import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISpeaker } from 'app/shared/model/speaker.model';

@Component({
    selector: 'jhi-speaker-detail',
    templateUrl: './speaker-detail.component.html'
})
export class SpeakerDetailComponent implements OnInit {
    speaker: ISpeaker;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ speaker }) => {
            this.speaker = speaker;
        });
    }

    previousState() {
        window.history.back();
    }
}
