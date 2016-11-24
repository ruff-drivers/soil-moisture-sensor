/*!
 * Copyright (c) 2016 Nanchao Inc.
 * All rights reserved.
 */

'use strict';

var mock = require('ruff-mock');
var assert = require('assert');

var whenever = mock.whenever;

var Device = require('../');

require('t');

describe('Soil moisture Driver', function () {
    var device;
    var adc;

    beforeEach(function () {
        adc = mock({}, true);
        device = new Device({
            adc: adc
        }, {
            args: {
                interval: 100,
                airVoltage: 2.6,
                waterVoltage: 1.2
            }
        });
    });

    it('should set and get property `interval` correctly', function (done) {
        assert.equal(device.interval, 100);
        device.interval = 200;
        assert.equal(device.interval, 200);
        done();
    });

    it('should set and get property `airVoltage` correctly', function (done) {
        assert.equal(device.airVoltage, 2.6);
        device.airVoltage = 3;
        assert.equal(device.airVoltage, 3);
        done();
    });

    it('should set and get property `waterVoltage` correctly', function (done) {
        assert.equal(device.waterVoltage, 1.2);
        device.waterVoltage = 2;
        assert.equal(device.waterVoltage, 2);
        done();
    });

    it('should emit `dry` event', function (done) {
        var dryVoltage = 2.6;
        whenever(adc).getVoltage(Function).then(function (callback) {
            callback(undefined, dryVoltage);
        });
        device.on('dry', function () {
            device.detach();
            done();
        });
    });

    it('should emit `dry` event once', function (done) {
        var dryVoltage = 2.6;
        whenever(adc).getVoltage(Function).then(function (callback) {
            callback(undefined, dryVoltage);
        });
        var num = 0;
        device.on('dry', function () {
            num++;
        });
        setTimeout(function () {
            device.detach();
            assert(num === 1);
            done();
        }, 500);
    });

    it('should emit `wet` event', function (done) {
        var wetVoltage = (1.2 + 2.6) / 2;
        whenever(adc).getVoltage(Function).then(function (callback) {
            callback(undefined, wetVoltage);
        });
        device.on('wet', function () {
            device.detach();
            done();
        });
    });

    it('should emit `wet` event once', function (done) {
        var wetVoltage = (1.2 + 2.6) / 2;
        whenever(adc).getVoltage(Function).then(function (callback) {
            callback(undefined, wetVoltage);
        });
        var num = 0;
        device.on('wet', function () {
            num++;
        });
        setTimeout(function () {
            device.detach();
            assert(num === 1);
            done();
        }, 500);
    });

    it('should emit `veryWet` event', function (done) {
        var veryWetVoltage = 1.2;
        whenever(adc).getVoltage(Function).then(function (callback) {
            callback(undefined, veryWetVoltage);
        });
        device.on('veryWet', function () {
            device.detach();
            done();
        });
    });

    it('should emit `veryWet` event once', function (done) {
        var veryWetVoltage = 1.2;
        whenever(adc).getVoltage(Function).then(function (callback) {
            callback(undefined, veryWetVoltage);
        });
        var num = 0;
        device.on('veryWet', function () {
            num++;
        });
        setTimeout(function () {
            device.detach();
            assert(num === 1);
            done();
        }, 500);
    });

    it('should emit `error` when voltage is outof the expected range', function (done) {
        var errorVoltage = 0.5;
        var expectedErrorMessage = 'Unexpected voltage detected, check your sensor.';
        whenever(adc).getVoltage(Function).then(function (callback) {
            callback(undefined, errorVoltage);
        });
        device.on('error', function (error) {
            device.detach();
            assert.equal(error.message, expectedErrorMessage);
            done();
        });
    });
});
