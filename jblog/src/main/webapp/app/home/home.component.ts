import { Component, OnInit } from '@angular/core';
import { Post } from 'app/shared/model/post.model';
import { PostService } from 'app/entities/post';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Account, LoginModalService, Principal } from 'app/core';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.css']
})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    posts: Post[] = [];

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private postService: PostService,
        private jhiAlertService: JhiAlertService
    ) {}

    ngOnInit() {
        this.principal.identity().then(account => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
        this.loadAll();
    }

    loadAll() {
        this.postService.query().subscribe(
            (res: HttpResponse<Post[]>) => {
                console.log(res);
                this.posts = res.body;
            },
            (posts: HttpErrorResponse) => this.onError(posts.message)
        );
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.principal.identity().then(account => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
