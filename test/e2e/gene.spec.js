/**
 Feature: Genes
 I want to be able to see information about a gene
 As a medical professional
 So that I can understand more aobut the gene
 */


describe("Gene", function () {


    beforeEach(function() {
        browser.get('#/gene/1370/disorders');
    });

    it('should have a page', function() {
        expect(browser.getTitle()).toBe('kinesin family member 7 - Orphanet')
        expect(element(by.css('h1')).getText()).toBe('Kinesin Family Member 7 (KIF7)')
    });
});

