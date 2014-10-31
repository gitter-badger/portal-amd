/**
 * could use the relative path or the absolute based on the karma.conf base value
 * todo: figure out which is best
 */
// ../../controllers/DashboardController
define([
    'src/client/apps/dashboard/controllers/DashboardController'
], function (DashboardController) {
    "use strict";

    describe('Array', function () {
        describe('indexOf()', function () {
            it('should return -1 when the value is not present', function () {
                expect([1, 2, 3].indexOf(5)).toBe(-1);
                expect([1, 2, 3].indexOf(0)).toBe(-1);
            });

            it('should return index of 0 for the value 1', function () {
                expect([1, 2, 3].indexOf(1)).toBe(0);
            });

            it('should highlight this test as pending');
        });
    });

    describe('Dashboard Controller', function () {
        it('should have a `new property` available', function () {
            var dashboardController = new DashboardController();
            expect(dashboardController.newProperty).toBe('some value here to test later');
        });

        it('should say hello world!');

        it('some other pending tests here');
    });
});