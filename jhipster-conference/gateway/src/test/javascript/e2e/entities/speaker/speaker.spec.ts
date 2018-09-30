import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SpeakerComponentsPage, SpeakerDeleteDialog, SpeakerUpdatePage } from './speaker.page-object';

describe('Speaker e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let speakerUpdatePage: SpeakerUpdatePage;
    let speakerComponentsPage: SpeakerComponentsPage;
    let speakerDeleteDialog: SpeakerDeleteDialog;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Speakers', async () => {
        await navBarPage.goToEntity('speaker');
        speakerComponentsPage = new SpeakerComponentsPage();
        expect(await speakerComponentsPage.getTitle()).toMatch(/gatewayApp.speaker.home.title/);
    });

    it('should load create Speaker page', async () => {
        await speakerComponentsPage.clickOnCreateButton();
        speakerUpdatePage = new SpeakerUpdatePage();
        expect(await speakerUpdatePage.getPageTitle()).toMatch(/gatewayApp.speaker.home.createOrEditLabel/);
        await speakerUpdatePage.cancel();
    });

    it('should create and save Speakers', async () => {
        await speakerComponentsPage.clickOnCreateButton();
        await speakerUpdatePage.setFirstNameInput('firstName');
        expect(await speakerUpdatePage.getFirstNameInput()).toMatch('firstName');
        await speakerUpdatePage.setLastNameInput('lastName');
        expect(await speakerUpdatePage.getLastNameInput()).toMatch('lastName');
        await speakerUpdatePage.setEmailInput('email');
        expect(await speakerUpdatePage.getEmailInput()).toMatch('email');
        await speakerUpdatePage.setTwitterInput('twitter');
        expect(await speakerUpdatePage.getTwitterInput()).toMatch('twitter');
        await speakerUpdatePage.setBioInput('bio');
        expect(await speakerUpdatePage.getBioInput()).toMatch('bio');
        // speakerUpdatePage.sessionsSelectLastOption();
        await speakerUpdatePage.save();
        expect(await speakerUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    it('should delete last Speaker', async () => {
        const nbButtonsBeforeDelete = await speakerComponentsPage.countDeleteButtons();
        await speakerComponentsPage.clickOnLastDeleteButton();

        speakerDeleteDialog = new SpeakerDeleteDialog();
        expect(await speakerDeleteDialog.getDialogTitle()).toMatch(/gatewayApp.speaker.delete.question/);
        await speakerDeleteDialog.clickOnConfirmButton();

        expect(await speakerComponentsPage.countDeleteButtons()).toBe(nbButtonsBeforeDelete - 1);
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
