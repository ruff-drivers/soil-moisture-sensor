/*!
 * Copyright (c) 2016 Nanchao Inc.
 * All rights reserved.
 */

'use strict';

var driver = require('ruff-driver');

var SoilState = {
    veryWet: 0,
    wet: 1,
    dry: 2
};

var prototype = {
    _setupTimer: function () {
        clearInterval(this._timer);
        this._timer = setInterval(this._handler.bind(this), this._interval);
    },
    _handler: function () {
        var that = this;

        this._adc.getVoltage(function (error, voltage) {
            if (error) {
                that.emit('error', error);
                return;
            }

            if (voltage >= that._minVoltage && voltage < (that._minVoltage + that._gapVoltage)) {
                if (that._soilState !== SoilState.veryWet) {
                    that._soilState = SoilState.veryWet;
                    that.emit('veryWet');
                }
            } else if (voltage >= (that._minVoltage + that._gapVoltage) && voltage < (that._maxVoltage - that._gapVoltage)) {
                if (that._soilState !== SoilState.wet) {
                    that._soilState = SoilState.wet;
                    that.emit('wet');
                }
            } else if (voltage >= (that._maxVoltage - that._gapVoltage)) {
                if (that._soilState !== SoilState.dry) {
                    that._soilState = SoilState.dry;
                    that.emit('dry');
                }
            } else {
                that.emit('error', new Error('Unexpected voltage detected, check your sensor.'));
            }
        });
    }
};

Object.defineProperties(prototype, {
    interval: {
        get: function () {
            return this._interval;
        },
        set: function (interval) {
            this._interval = interval;
            this._setupTimer();
        }
    },
    waterVoltage: {
        get: function () {
            return this._minVoltage;
        },
        set: function (voltage) {
            this._minVoltage = voltage;
        }
    },
    airVoltage: {
        get: function () {
            return this._maxVoltage;
        },
        set: function (voltage) {
            this._maxVoltage = voltage;
        }
    }
});

module.exports = driver({
    attach: function (inputs, context) {
        this._adc = inputs['adc'];
        var args = context.args;
        this._interval = args.interval || 1000;
        this._minVoltage = args.waterVoltage;
        this._maxVoltage = args.airVoltage;
        this._gapVoltage = (this._maxVoltage - this._minVoltage) / 3;

        this._soilState = null;
        this._timer = null;
        this._setupTimer();
    },
    detach: function () {
        clearInterval(this._timer);
    },
    exports: prototype
});
