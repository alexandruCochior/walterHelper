'use strict';

function WalterHelper(scope, element, attrs, services) {
    this.scope = scope;
    this.element = element;
    this.attrs = attrs;
    this.services = services;
    
    // attributes initialization
    this.icon = '';
    this.helper = '';
    this.scope.showHelper = false;
    
    // jQuery elements
    this.$field = $(this.element);
    
    // default fields
    this.iconDefault = '<span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>';
    this.iconWrapBefore = '<span ng-click="showHelper=!showHelper" class="walterHelperIcon">';
    this.iconWrapAfter = '</span>';
    
    this.helperDefault = 'Some help message';
    this.helperWrapBefore = '<span ng-show="showHelper" id="helpBlock" class="help-block">';
    this.helperWrapAfter = '</span>';
    
    this.initializeElements = function() {
        if (this.attrs.icon) {
            this.icon = this.iconWrapBefore + this.attrs.icon + this.iconWrapAfter;
        } else {
            this.icon = this.iconWrapBefore + this.iconDefault + this.iconWrapAfter;
        }
        
        if (this.attrs.helper) {
            this.helper = this.helperWrapBefore + this.attrs.helper + this.helperWrapAfter;
        } else {
            this.helper = this.helperWrapBefore + this.helperDefault + this.helperWrapAfter;
        }
        
    }
    
    this.appendElements = function() {
        this.$field.after(this.services.compile(this.icon)(this.scope));
        this.$field.after(this.services.compile(this.helper)(this.scope));
    }
    
    this.apperenceElements = function() {
        this.$field.parent().find('.walterHelperIcon').css(
            'cursor', 'pointer'
        );
    }
    
    this.init = function() {
        this.initializeElements();
        this.appendElements();
        this.apperenceElements();
    }
}

/**
 * @ngdoc directive
 * @name tmClientApplicationApp.directive:walterHelper
 * @description
 * # walterHelper
 */
angular.module('walterHelper')
    .directive('walterHelper', function ($compile) {
        return {
            restrict: 'A',
            scope: {
                helper: '@',
                icon: '@'     
            },
            link: function (scope, element, attrs) {               
                var obj = new WalterHelper(scope, element, attrs, {'compile': $compile});
                obj.init();  
            }
        };
    });
