/*
    Jasmine BDD example spec
    ========================

    Built in matchers
    -----------------
    expect(x).toEqual(y); compares objects or primitives x and y and passes if they are equivalent
    expect(x).toBe(y); compares objects or primitives x and y and passes if they are the same object
    expect(x).toMatch(pattern); compares x to string or regular expression pattern and passes if they match
    expect(x).toBeDefined(); passes if x is not undefined
    expect(x).toBeUndefined(); passes if x is undefined
    expect(x).toBeNull(); passes if x is null
    expect(x).toBeTruthy(); passes if x evaluates to true
    expect(x).toBeFalsy(); passes if x evaluates to false
    expect(x).toContain(y); passes if array or string x contains y
    expect(x).toBeLessThan(y); passes if x is less than y
    expect(x).toBeGreaterThan(y); passes if x is greater than y
    expect(function(){fn();}).toThrow(e); passes if function fn throws exception e when executed
*/
/*jslint browser: true, vars: true, white: true, forin: true, plusplus: true, indent: 4 */
/*global define,require,describe,afterEach,beforeEach,expect,it,waitsFor,runs */
(function(){
    'use strict';

var SPEC_SETTINGS = {
    name: 'debug',
    module: 'lib/debug'
};
describe(SPEC_SETTINGS.name, function(){

    var mod;

    beforeEach(function(){
        this.addMatchers({
            toBeArray: function(){
                return this.actual.constructor === Array;
            },
            toContain: function(expected) {
                if (typeof this.actual === 'string') {
                    return this.actual.indexOf(expected) > -1;
                }
            }
        });
        waitsFor(function(){
            return mod && typeof mod === 'object';
        }, 'never got a ' + SPEC_SETTINGS.name + ' module', 1000);

        require(window.testRequireOptions, [SPEC_SETTINGS.module], function(module) {
                mod = module;
        });
    });

    it('should have the ' + SPEC_SETTINGS.name + ' module', function() {
        expect(mod).toBeDefined();
    });

    describe(SPEC_SETTINGS.name, function(){
    });
});

}());
