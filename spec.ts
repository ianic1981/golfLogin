import {browser, by, element} from "protractor";

describe('protractor with typescript typings', () => {
    beforeEach(() => {
        browser.ignoreSynchronization = true;
        browser.get('https://www.brsgolf.com/wychwoodpark/member/login');
        return null;
    });

    // it('submit', () => {
    //     element(by.css('input[name="SUBMIT"]')).click();
    //
    //     browser.pause();
    //     return null;
    // });

    it('user', () => {
        var elm =element(by.css('[name="_username"]'))
            elm.getWebElement().then(
                function(safd){
                    safd.getAttribute('name').then(asd =>{ console.log(asd)});
                    safd.sendKeys(23424);
                }
            )
            elm.clear();
        return null;
    });

    it('user', () => {
        //$("[name='_username']").value = 59629
        element(by.css('[name="_username"]')).sendKeys(5);
        element(by.css('[name="_username"]')).sendKeys(9);
        element(by.css('[name="_username"]')).sendKeys(6);
        element(by.css('[name="_username"]')).sendKeys(2);
        element(by.css('[name="_username"]')).sendKeys(9);
        return null;
    });

    it('password', () => {
        element(by.css('input[name="_password"]')).sendKeys('h3lpm3');


        return null;
    });

    it('user', () => {
        //$("[name='_username']").value = 34
        element(by.css('[name="_username"]')).sendKeys(5);
        element(by.css('[name="_username"]')).sendKeys(9);
        element(by.css('[name="_username"]')).sendKeys(6);
        element(by.css('[name="_username"]')).sendKeys(2);
        element(by.css('[name="_username"]')).sendKeys(9);
        return null;
    });


    it('submit', () => {
        element(by.css('[name="_username"]')).sendKeys(5);
        element(by.css('[name="_username"]')).sendKeys(9);
        element(by.css('[name="_username"]')).sendKeys(6);
        element(by.css('[name="_username"]')).sendKeys(2);
        element(by.css('[name="_username"]')).sendKeys(9);
        element(by.css('input[name="_password"]')).sendKeys('h3lpm3');
        element(by.css('input[name="SUBMIT"]')).click();

        return null;
    });

    it('pause', () => {
        browser.pause();
        return null;
    });


    it('book a tee time', () => {


        element(by.css('.book_a_tee_time_button')).click();


        return null;
    });

    it('pause', () => {
        browser.pause();
        return null;
    });

});