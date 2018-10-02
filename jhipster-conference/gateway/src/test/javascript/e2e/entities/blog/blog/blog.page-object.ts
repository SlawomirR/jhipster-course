import {by, element, ElementFinder} from 'protractor';

export class BlogComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-blog div table .btn-danger'));
    title = element.all(by.css('jhi-blog div h2#page-heading span')).first();

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
        return this.title.getText();
    }
}

export class BlogUpdatePage {
    pageTitle = element(by.id('jhi-blog-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    titleInput = element(by.id('field_title'));
    authorInput = element(by.id('field_author'));
    postInput = element(by.id('field_post'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setTitleInput(title) {
        await this.titleInput.sendKeys(title);
    }

    async getTitleInput() {
        return this.titleInput.getAttribute('value');
    }

    async setAuthorInput(author) {
        await this.authorInput.sendKeys(author);
    }

    async getAuthorInput() {
        return this.authorInput.getAttribute('value');
    }

    async setPostInput(post) {
        await this.postInput.sendKeys(post);
    }

    async getPostInput() {
        return this.postInput.getAttribute('value');
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

export class BlogDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-blog-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-blog'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
