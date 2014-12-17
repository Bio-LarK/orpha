    'use strict';

/**
 * @ngdoc service
 * @name orphaApp.cmTreeNode
 * @description
 * # cmTreeNode
 * Factory in the orphaApp.
 */
angular.module('orphaApp')
    .factory('CmTreeNode', function($q) {

        var CmTreeNode = function(resource) {
            this.children = null;
            this._isOpen = false;
            this.resource = resource;
            this.isEdited = false;
            this.isRemoved = false;
            this.hasLoadedChildren = false;
        };
        CmTreeNode.prototype.open = openNode;
        CmTreeNode.prototype.isOpen = isOpen;
        CmTreeNode.prototype.close = closeNode;
        CmTreeNode.prototype.toggle = toggle;
        CmTreeNode.prototype.setChildren = setChildren;
        CmTreeNode.prototype.getChildren = getChildren;
        CmTreeNode.prototype.removeChild = removeChild;
        CmTreeNode.prototype.removeAtIndex = removeAtIndex;
        CmTreeNode.prototype.updateChild = updateChild;
        CmTreeNode.prototype.insertChild = insertChild;
        CmTreeNode.prototype.isValidParent = isValidParent;
        return CmTreeNode;

        ///////

        function isOpen() {
            /* jshint validthis: true */
            return this._isOpen;
        }

        function closeNode() {
            /* jshint validthis: true */
            this._isOpen = false;
            _.each(this.getChildren(), function(child) {
                child.close();
            });
        }

        function toggle() {
            /* jshint validthis: true */
            if (this._isOpen) {
                this.close();
                return $q.when(this.isOpen);
            }
            return this.open().then(function() {
                return this.isOpen();
            }.bind(this));
        }

        function openNode() {
            /* jshint validthis: true */
            this._isOpen = true;

            if (!this.children) {
                return this.resource.loadChildren().then(function(children) {
                    this.hasLoadedChildren = true;
                    this.setChildren(children);
                    return this.children;
                }.bind(this));
            }
            return $q.when(this.children);
        }

        function isValidParent(newParent) {
            return newParent !== false;
        }

        function insertChild(child, index) {
            /* jshint validthis: true */
            return this.open().then(function() {
                if (!(child instanceof CmTreeNode)) {
                    child = new CmTreeNode(child);
                }
                this.children.splice(index, 0, child);
                return child;
            }.bind(this));
        }

        function updateChild(newChild) {
            /* jshint validthis: true */
            return this.open().then(function() {
                var existingChild = _.find(this.getChildren(), function(existingChild) {
                    return existingChild.resource.nid === newChild.resource.nid;
                });
                var index = this.getChildren().indexOf(existingChild);
                this.removeChild(existingChild);
                this.insertChild(newChild, index);
            }.bind(this));
        }
        function removeChild(child) {
            /* jshint validthis: true */
            var index = this.children.indexOf(child);
            this.children.splice(index, 1);
        }

        function removeAtIndex(index) {
            /* jshint validthis: true */
            this.children.splice(index, 1);
        }

        function getChildren() {
            /* jshint validthis: true */
            return this.children;
        }

        function setChildren(children) {
            /* jshint validthis: true */
            children = _.map(children, function(child) {
                if (!(child instanceof CmTreeNode)) {
                    return new CmTreeNode(child);
                }
                return child;
            });
            // this.children.push({'hello': 'world'});
            this.children = children;
        }




    });
