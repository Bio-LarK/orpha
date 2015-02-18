
describe("Disorder", function() {
    describe("Age of Onset", function () {

        beforeEach(function() {
            browser.get('#/disorders/27034');
            var title = element(by.css('h1')).getText();
            expect(title).toBe('CHARGE Syndrome');
            var editButton = element(by.cssContainingText('a', 'Edit'));
            editButton.click();
        });

        iit('should be clickable', function() {
            // Should be an array

            // login
            //
            var ageOfOnsets = element(by.cssContainingText('div', 'Age of Onset'));
            ageOfOnsets.click();

;            //var ageOfOnsets = element.all(by.repeater('onset in disorder.disorder_onset'));
            //expect(ageOfOnsets.count()).toEqual(2);
            //expect(ageOfOnsets.get(0).getText()).toEqual('Infancy');
            //expect(ageOfOnsets.get(1).getText()).toEqual('Neonatal');
        });
    });
});
