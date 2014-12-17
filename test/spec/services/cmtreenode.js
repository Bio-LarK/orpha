'use strict';

describe('Service: CmTreeNode', function() {

    // load the service's module
    beforeEach(module('orphaApp'));

    // instantiate service
    var CmTreeNode, myTreeNode, $q, $rootScope;
    beforeEach(inject(function($httpBackend, _CmTreeNode_, Disorder, _$q_,
        _$rootScope_) {
        CmTreeNode = _CmTreeNode_;
        $q = _$q_;
        $rootScope = _$rootScope_;

        var myDisorder = new Disorder({
            nid: 1,
            title: 'my disorder'
        });
        spyOn(myDisorder, 'loadChildren').andReturn(
            $q.when([{
                nid: 2,
                title: 'child disorder'
            }])
        );
        // spyOn(myDisorder, 'loadChildren');/
        myTreeNode = new CmTreeNode(myDisorder);

        $httpBackend.whenGET('scripts/services/disorderbody.json').respond(200, '{}');
        $httpBackend.whenGET(/views.*/).respond(200, '');
    }));

    it('should do something', function() {
        expect(!!myTreeNode).toBe(true);
    });

    it('should provide a isOpen function', function() {
        expect(typeof myTreeNode.isOpen).toBe('function');
        expect(typeof myTreeNode.isOpen()).toBe('boolean');
    });

    it('should provide a open function', function() {
        expect(typeof myTreeNode.open).toBe('function');
    });
    it('open should return expected value', function() {
        expect(myTreeNode.children).toBe(null);

        var promise = myTreeNode.open();
        promise.then(function() {
            expect(myTreeNode.isOpen()).toBe(true);
            expect(myTreeNode.children instanceof Array).toBe(true);
            expect(myTreeNode.children.length).toBe(1);
        });
        $rootScope.$digest();
    });
    it('isOpen should return expected value', function() {
        expect(typeof myTreeNode.isOpen()).toBe('boolean');
        expect(myTreeNode.isOpen()).toBe(false);
        var promise = myTreeNode.open();
        promise.then(function() {
            expect(myTreeNode.isOpen()).toBe(true);
        });
        $rootScope.$digest();
    });
    it('should provide a close function', function() {
        expect(typeof myTreeNode.close).toBe('function');
    });
    it('close should return expected value', function() {
        expect(myTreeNode.isOpen()).toBe(false);
        var promise = myTreeNode.open();
        promise.then(function() {
            expect(myTreeNode.isOpen()).toBe(true);
            myTreeNode.close();
            expect(myTreeNode.isOpen()).toBe(false);
        });
        $rootScope.$digest();
    });
    it('should provide a toggle function', function() {
        expect(typeof myTreeNode.toggle).toBe('function');
    });
    it('close should return expected value', function() {
        expect(myTreeNode.isOpen()).toBe(false);
        var promise = myTreeNode.toggle();
        promise.then(function() {
            expect(myTreeNode.isOpen()).toBe(true);
            return myTreeNode.toggle();
        }).then(function() {
            expect(myTreeNode.isOpen()).toBe(false);
        });
        $rootScope.$digest();
        $rootScope.$digest();
    });
    it('should provide a setChildren function', function() {
        expect(typeof myTreeNode.setChildren).toBe('function');
    });
    it('setChildren should return expected value', function() {
        expect(myTreeNode.children).toBe(null);
        var disorders = [{
            nid: 1,
            title: 'child disorder'
        }];
        myTreeNode.setChildren(disorders);
        expect(myTreeNode.children instanceof Array).toBe(true);
        expect(myTreeNode.children.length).toBe(1);
        expect(myTreeNode.children[0].resource.title)
            .toBe('child disorder');
    });
    it('should provide a getChildren function', function() {
        expect(typeof myTreeNode.getChildren).toBe('function');
    });
    it('getChildren should return expected value', function() {
        expect(myTreeNode.getChildren()).toBe(null);
        var children = [{
            nid: 1,
            title: 'child disorder'
        }];
        myTreeNode.setChildren(children);
        expect(myTreeNode.getChildren() instanceof Array).toBe(true);
        expect(myTreeNode.getChildren().length).toBe(1);
        expect(myTreeNode.getChildren()[0].resource.title);
    });
    it('should provide a removeChild function', function() {
        expect(typeof myTreeNode.removeChild).toBe('function');
    });
    it('removeChild should return expected value', function() {
        expect(myTreeNode.getChildren()).toBe(null);
        var childDisorder = {
            nid: 1,
            title: 'child disorder'
        };
        myTreeNode.setChildren([childDisorder]);
        var children = myTreeNode.getChildren();
        expect(myTreeNode.getChildren().length).toBe(1);
        myTreeNode.removeChild(children[0]);
        expect(myTreeNode.getChildren().length).toBe(0);
    });
    it('should provide a removeAtIndex function', function() {
        expect(typeof myTreeNode.removeAtIndex).toBe('function');
    });
    it('removeChild should return expected value', function() {
        var childDisorder = {
            nid: 1,
            title: 'child disorder'
        };
        myTreeNode.setChildren([childDisorder]);
        expect(myTreeNode.getChildren().length).toBe(1);
        myTreeNode.removeAtIndex(0);
        expect(myTreeNode.getChildren().length).toBe(0);
    });
    it('should provide a updateChild function', function() {
        expect(typeof myTreeNode.updateChild).toBe('function');
    });
    it('updateChild should return expected value', function() {
        var childDisorder = {
            nid: 1,
            title: 'child disorder'
        };
        myTreeNode.setChildren([childDisorder]);
        expect(myTreeNode.getChildren()[0].resource).toBe(childDisorder);

        var newChildDisorder = {
            nid: 1,
            title: 'newer child disorder'
        };
        myTreeNode.updateChild(newChildDisorder).then(function() {
            expect(myTreeNode.getChildren()[0].resource)
                .toBe(newChildDisorder);
        });
        $rootScope.$digest();
    });
    it('should provide a insertChild function', function() {
        expect(typeof myTreeNode.insertChild).toBe('function');
    });
    it('insertChild should return expected value', function() {
        var newChildDisorder = {
            nid: 1,
            title: 'newer child disorder'
        };
        var promise = myTreeNode.insertChild(newChildDisorder, 0);
        promise.then(function() {
            expect(myTreeNode.getChildren()[0]).toBe(newChildDisorder);
        });
        $rootScope.$digest();
    });
    it('should provide a isValidParent function', function() {
        expect(typeof myTreeNode.isValidParent).toBe('function');
    });
});
