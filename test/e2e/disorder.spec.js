/**
 Feature: Disorder
 I want to be able to find out information about disorders
 As a medical professional
 So that I can understand more about the disorder

 Scenario:
 Given I am on a disorder page
 And this disorder is a leaf
 Then I should see the disorder title
 And the disorders classification
 And the disorders parents
 And the disorders phenotype
 And the disorders genotype
 And no children
 */

describe("Disorder", function () {

    it('should see the title', function() {
        browser.get('#/disorders/39614');
        expect(browser.getTitle()).toBe('Carney complex - Orphanet');
    });

    it('should have classifications', function() {
        var classifications = element.all(by.repeater('row in disorder.disorder_class'));
        expect(classifications.count()).toBeGreaterThan(0);
    });

    it('should have parents', function() {
        var parents = element.all(by.repeater('row in disorder.disorder_parent'));
        expect(parents.count()).toBeGreaterThan(0);
    });

    it('should have no children', function() {
        var children = element.all(by.repeater('row in disorder.disorder_child'));
        expect(children.count()).toBe(0);
    });

    it('should have genes', function() {
        var genes = element.all(by.repeater('row in disorder.disorder_disgene'));
        expect(genes.count()).toBeGreaterThan(0);
    });

    it('should have genes', function() {
        var phenotype = element.all(by.repeater('row in disorder.disorder_phenotype'));
        expect(phenotype.count()).toBeGreaterThan(0);
    });


    it('should have genes', function() {
        var phenotype = element.all(by.repeater('row in disorder.disorder_phenotype'));
        expect(phenotype.count()).toBeGreaterThan(0);
    });




    //describe("from homepage page", function () {
    //
    //    var classificationRows;
    //    beforeEach (function(){
    //        console.log('going to home page');
    //        browser.get('/#');
    //        classificationRows = element.all(by.repeater('row in vm.classification'));
    //    });
    //
    //    it("should show classifications", function () {
    //        expect(classificationRows.count()).toBeGreaterThan(0);
    //    });
    //
    //    describe("classification", function() {
    //        it('should go to a classification', function() {
    //            console.log('clicking home page tilte');
    //            var title = classificationRows.first().all(by.css('a')).first();
    //            expect(title.getText()).toBe('Rare Cardiac Disease');
    //            title.click();
    //            expect(browser.getTitle()).toEqual('Rare cardiac disease - Orphanet');
    //        });
    //    });
    //});
    //
    //
    //describe("from classifications page", function () {
    //
    //    var classificationRows2;
    //    beforeEach (function(){
    //        console.log('going to disorders page');
    //        browser.get('/#/disorders');
    //        classificationRows2 = element.all(by.repeater('row in vm.classifications'));
    //    });
    //
    //    it("should show classifications", function () {
    //        expect(classificationRows2.count()).toBeGreaterThan(0);
    //    });
    //
    //    describe("classification", function() {
    //        it('should go to a classification', function() {
    //            console.log('clicking disorder page tilte');
    //            var title2 = classificationRows2.first().all(by.css('a')).first();
    //            title2.click();
    //            expect(browser.getTitle()).toEqual('Rare cardiac disease - Orphanet');
    //        });
    //    });
    //});

});

