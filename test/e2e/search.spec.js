/**
 * So I used well understood terms
 * As a medical person
 * I want to be able to select the phenotype from a taxonomy
 */

/**
 * Scenario:
 * Given I am on a form page
 * And I've filled in the clinical phenotype with 'dwarfism'
 * Then I should see 'dwarfism'
 */
describe("Search", function () {

    var searchInput;

    browser.get('#/');

    beforeEach(function () {
        searchInput = element(by.model('siteSearchService.query'));
    });

    it('should have a clinical phenotype input', function () {
        expect(searchInput.isPresent()).toBe(true);
    });

    it('should autocomplete terms', function () {
        searchInput.sendKeys('Carney');
        var carneyComplexOption = element(by.cssContainingText('.navbar-search li a', 'Carney triad'));
        expect(carneyComplexOption.isPresent()).toBe(true);
    });

    iit('should open disorder pages', function () {
        searchInput.sendKeys('Carne');
        searchInput.sendKeys('y');

        var carneyComplexOption = element(by.cssContainingText('.navbar-search li a', 'Carney triad'));
        carneyComplexOption.click();

        expect(browser.getTitle()).toBe('Carney triad - Orphanet');

        // If this fails, check that search is enabled, it has been indexed, and the permissions enabled for everyone
    });
});



