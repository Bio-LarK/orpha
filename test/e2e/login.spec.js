/**
 Feature: Abstracts
 I want to be able to read a description of the disorder
 As a medical professional
 So that I can understand more about the disorder

 Scenario:
 Given I am on a disorder page
 Then I should be able to read the abstract
 */

describe("Login", function () {

    var loginButton;

    beforeEach(function() {
        browser.get('#/');
        loginButton = element(by.cssContainingText('a', 'Login'));
    });

    it('should have a login', function() {
        expect(loginButton.isPresent()).toBe(true);
    });

    it('should be able to sign in', function() {
        loginButton.click();
        var username = element(by.css('input#username'));
        var password = element(by.css('input#password'));

        expect(username.isPresent()).toBe(true);
        expect(password.isPresent()).toBe(true);
        username.sendKeys('new_orpha');
        password.sendKeys('new_orpha');

        var login = element(by.cssContainingText('button', 'Login'));
        login.click();

        // expect logged in
        var userProfileLink = element(by.cssContainingText('a', 'new_orpha'));
        expect(userProfileLink.isPresent()).toBe(true);
    });

});

