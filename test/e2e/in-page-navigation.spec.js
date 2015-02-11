

describe("Disorder", function() {
    describe("In Page Navigation", function () {

        beforeEach(function() {
            browser.get('#/disorders/39614');
        });

        var links = ['Classification', 'Parents', 'Genotype', 'Phenotype'];

        it('should have classification link', function() {
            // Should be an array
            var classificationLink = element(by.linkText('Classification'));
            expect(classificationLink.isPresent()).toBe(true);

            classificationLink.click();

            browser.sleep(1000);
            //expect(browser.getCurrentUrl()).toBe('http://localhost:9000/#/disorders/39614#classification');

            var selected = element(by.cssContainingText('li.active a', 'Classification'));
            expect(selected.isPresent()).toBe(true);
        });
    });
});
