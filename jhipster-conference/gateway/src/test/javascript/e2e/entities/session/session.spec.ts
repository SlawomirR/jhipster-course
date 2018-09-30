import { browser, ExpectedConditions as ec, protractor } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SessionComponentsPage, SessionDeleteDialog, SessionUpdatePage } from './session.page-object';

describe('Session e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let sessionUpdatePage: SessionUpdatePage;
    let sessionComponentsPage: SessionComponentsPage;
    let sessionDeleteDialog: SessionDeleteDialog;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Sessions', async () => {
        await navBarPage.goToEntity('session');
        sessionComponentsPage = new SessionComponentsPage();
        expect(await sessionComponentsPage.getTitle()).toMatch(/gatewayApp.session.home.title/);
    });

    it('should load create Session page', async () => {
        await sessionComponentsPage.clickOnCreateButton();
        sessionUpdatePage = new SessionUpdatePage();
        expect(await sessionUpdatePage.getPageTitle()).toMatch(/gatewayApp.session.home.createOrEditLabel/);
        await sessionUpdatePage.cancel();
    });

    it('should create and save Sessions', async () => {
        await sessionComponentsPage.clickOnCreateButton();
        await sessionUpdatePage.setTitleInput('title');
        expect(await sessionUpdatePage.getTitleInput()).toMatch('title');
        await sessionUpdatePage.setDescriptionInput('description');
        expect(await sessionUpdatePage.getDescriptionInput()).toMatch('description');
        await sessionUpdatePage.setStartDateTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await sessionUpdatePage.getStartDateTimeInput()).toContain('2001-01-01T02:30');
        await sessionUpdatePage.setEndDateTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await sessionUpdatePage.getEndDateTimeInput()).toContain('2001-01-01T02:30');
        await sessionUpdatePage.save();
        expect(await sessionUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    it('should delete last Session', async () => {
        const nbButtonsBeforeDelete = await sessionComponentsPage.countDeleteButtons();
        await sessionComponentsPage.clickOnLastDeleteButton();

        sessionDeleteDialog = new SessionDeleteDialog();
        expect(await sessionDeleteDialog.getDialogTitle()).toMatch(/gatewayApp.session.delete.question/);
        await sessionDeleteDialog.clickOnConfirmButton();

        expect(await sessionComponentsPage.countDeleteButtons()).toBe(nbButtonsBeforeDelete - 1);
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
