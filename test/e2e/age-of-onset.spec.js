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
            browser.get('#/disorders/26332', 30000);
            var title = element(by.css('h1')).getText();
            expect(title).toBe('Multiple Epiphyseal Dysplasia, Al-Gazali Type');
        });

        it('should have an age of onset', function() {
            // Should be an array
            console.error('PENDING: Age of Onset');
        });
    });
});
