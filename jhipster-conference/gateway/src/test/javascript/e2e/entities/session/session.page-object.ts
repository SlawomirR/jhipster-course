import { by, element, ElementFinder } from 'protractor';

export class SessionComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-session div table .btn-danger'));
    title = element.all(by.css('jhi-session div h2#page-heading span')).first();

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

export class SessionUpdatePage {
    pageTitle = element(by.id('jhi-session-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    titleInput = element(by.id('field_title'));
    descriptionInput = element(by.id('field_description'));
    startDateTimeInput = element(by.id('field_startDateTime'));
    endDateTimeInput = element(by.id('field_endDateTime'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setTitleInput(title) {
        await this.titleInput.sendKeys(title);
    }

    async getTitleInput() {
        return this.titleInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async setStartDateTimeInput(startDateTime) {
        await this.startDateTimeInput.sendKeys(startDateTime);
    }

    async getStartDateTimeInput() {
        return this.startDateTimeInput.getAttribute('value');
    }

    async setEndDateTimeInput(endDateTime) {
        await this.endDateTimeInput.sendKeys(endDateTime);
    }

    async getEndDateTimeInput() {
        return this.endDateTimeInput.getAttribute('value');
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

export class SessionDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-session-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-session'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
