import { by, element, ElementFinder } from 'protractor';

export class SpeakerComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-speaker div table .btn-danger'));
    title = element.all(by.css('jhi-speaker div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class SpeakerUpdatePage {
    pageTitle = element(by.id('jhi-speaker-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    firstNameInput = element(by.id('field_firstName'));
    lastNameInput = element(by.id('field_lastName'));
    emailInput = element(by.id('field_email'));
    twitterInput = element(by.id('field_twitter'));
    bioInput = element(by.id('field_bio'));
    sessionsSelect = element(by.id('field_sessions'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setFirstNameInput(firstName) {
        await this.firstNameInput.sendKeys(firstName);
    }

    async getFirstNameInput() {
        return this.firstNameInput.getAttribute('value');
    }

    async setLastNameInput(lastName) {
        await this.lastNameInput.sendKeys(lastName);
    }

    async getLastNameInput() {
        return this.lastNameInput.getAttribute('value');
    }

    async setEmailInput(email) {
        await this.emailInput.sendKeys(email);
    }

    async getEmailInput() {
        return this.emailInput.getAttribute('value');
    }

    async setTwitterInput(twitter) {
        await this.twitterInput.sendKeys(twitter);
    }

    async getTwitterInput() {
        return this.twitterInput.getAttribute('value');
    }

    async setBioInput(bio) {
        await this.bioInput.sendKeys(bio);
    }

    async getBioInput() {
        return this.bioInput.getAttribute('value');
    }

    async sessionsSelectLastOption() {
        await this.sessionsSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async sessionsSelectOption(option) {
        await this.sessionsSelect.sendKeys(option);
    }

    getSessionsSelect(): ElementFinder {
        return this.sessionsSelect;
    }

    async getSessionsSelectedOption() {
        return this.sessionsSelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class SpeakerDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-speaker-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-speaker'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
