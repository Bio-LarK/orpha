/**
 Feature: Browse Classification
 I want to be able to browse the top level classifications
 As a medical professional
 So that I can look at my area of interest

 Scenario:
 Given I am on orphanet
 When I go to the homepage
 Then I should see the top level classifications

 Given I am on the orphanet homepage
 When I click a classification
 Then I want to be able to browse it

 Given I am on the disorders page
 When I click a classification
 Then I want to be able to browse it
 */

describe("Browse Top Level Classification", function () {

    describe("from homepage page", function () {

        var classificationRows;
        beforeEach (function(){
            browser.get('/#');
            classificationRows = element.all(by.repeater('row in vm.classification'));
        });

        it("should show classifications", function () {
            expect(classificationRows.count()).toBeGreaterThan(0);
        });

        describe("classification", function() {
            it('should go to a classification', function() {
                var title = classificationRows.first().all(by.css('a')).first();
                expect(title.getText()).toBe('Rare Cardiac Disease');
                title.click();
                expect(browser.getTitle()).toEqual('Rare cardiac disease - Orphanet');
            });
        });
    });


    describe("from classifications page", function () {

        var classificationRows2;
        beforeEach (function(){
            browser.get('/#/disorders');
            classificationRows2 = element.all(by.repeater('row in vm.classifications'));
        });

        it("should show classifications", function () {
            expect(classificationRows2.count()).toBeGreaterThan(0);
        });

        describe("classification", function() {
            it('should go to a classification', function() {
                var title2 = classificationRows2.first().all(by.css('a')).first();
                title2.click();
                expect(browser.getTitle()).toEqual('Rare cardiac disease - Orphanet');
            });
        });
    });

});

