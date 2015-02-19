/**
 Feature: Age of Onsent
 I want to be able to read the age of onset
 As a medical professional
 So that I can understand more about the disorder

 Scenario:
 Given I am on a disorder page
 Then I should be able to see the age of onset
 */

describe("Disorder", function() {
    describe("Age of Onset", function () {

        beforeEach(function() {
            browser.get('#/disorders/39614', 30000);
            var title = element(by.css('h1')).getText();
            expect(title).toBe('Carney Complex');
        });

        it('should have an age of onset', function() {
            // Should be an array
            var ageOfOnsets = element.all(by.repeater('onset in disorder.disorder_onset'));
            expect(ageOfOnsets.count()).toEqual(2);
            expect(ageOfOnsets.get(0).getText()).toEqual('Infancy');
            expect(ageOfOnsets.get(1).getText()).toEqual('Neonatal');

            console.log("HERE????");
        });

        iit('can be edited', function() {
            var loginButton = element(by.cssContainingText('a', 'Login'));
            loginButton.click();
            var username = element(by.css('input#username'));
            var password = element(by.css('input#password'));
            username.sendKeys('new_orpha');
            password.sendKeys('new_orpha');

            var login = element(by.cssContainingText('button', 'Login'));
            login.click();

            browser.sleep(5000);

            element(by.cssContainingText('a', 'Edit')).click();

            var ageOfOnsets = element(by.cssContainingText('dt div', 'Age of Onset'));

            ageOfOnsets.click();

            browser.sleep(5000);

            expect(element(by.css('.modal-dialog')).isPresent()).toBe(true);
        });
    });
});
