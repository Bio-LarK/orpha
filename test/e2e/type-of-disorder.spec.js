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
    describe("Type of disorder", function () {

        beforeEach(function() {
            browser.get('#/disorders/26332', 30000);
        });

        iit('should have a type of disorder listed', function() {
            // Should be an array
            var disorderType = element(by.cssContainingText('.detail-info', 'Disease'));
            expect(disorderType.isPresent()).toBe(true);
        });
    });
});
