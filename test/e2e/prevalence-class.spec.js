
describe("Disorder", function () {

    beforeEach(function() {
        browser.get('/#/disorders/39614');
        //browser.ignoreSynchronization = true;
    });

    iit('should have a prevalence section', function() {
        var prevalenceClassHeading = element(by.cssContainingText('h4', 'Prevalence'));
        expect(prevalenceClassHeading.isPresent()).toBe(true);
    });

    iit('should have a have a repeater', function() {
        var prevalenceClassHeading = element(by.repeater('prevalence in prevalences'));
        expect(prevalenceClassHeading.isPresent()).toBe(true);
    });
});