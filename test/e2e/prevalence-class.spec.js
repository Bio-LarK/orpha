
describe("Disorder", function () {

    beforeEach(function() {
        browser.get('/#/disorders/39614');
    });

    it('have a prevalence section', function() {
        var prevalences = element(by.repeater('prevalence in prevalences'));
        expect(prevalences.isPresent()).toBe(true);
    });
});