[![Build Status](https://travis-ci.org/ruff-drivers/soil-moisture-sensor.svg)](https://travis-ci.org/ruff-drivers/soil-moisture-sensor)

# Soil Moisture Sensor Driver

Capacitive Soil Moisture Sensor Driver for SEN0193.

## Supported Engines

* Ruff: >=1.2.0 <2.0.0

## Supported Models

- [sen0193](https://rap.ruff.io/devices/sen0193)

## Installing

Execute following command and enter a **supported model** to install.

```sh
# Please replace `<device-id>` with a proper ID.
# And this will be what you are going to query while `$('#<device-id>')`.
rap device add <device-id>

# Then enter a supported model, for example:
# ? model: sen0193
# ? value (number) for argument "waterVoltage": (1.2)
# ? value (number) for argument "airVoltage": (2.6)
# ? value (number) for argument "interval": (1000)
```

## Usage

Here is the basic usage of this driver.

```js
$('#<device-id>').interval = 500;
$('#<device-id>').on('dry', function () {
    console.log('soil is dry');
});
$('#<device-id>').on('wet', function () {
    console.log('soil is wet');
});
$('#<device-id>').on('veryWet', function () {
    console.log('soil is very wet');
});
```

## FAQ

Before using this driver, please get the reference voltage when sensor is in the air and the water respectively, and set them to the `airVoltage` and `waterVoltage` properties.

## API References

### Properties

#### `interval`

Minimum interval between two events.

#### `airVoltage`

The reference voltage when sensor is in the air.

#### `waterVoltage`

The reference voltage when sensor is in the water.

### Events

#### `dry`

Emitted when the soil is dry.

#### `wet`

Emitted when the soil is wet.

#### `veryWet`

Emitted when the soil is very wet.

## Contributing

Contributions to this project are warmly welcome. But before you open a pull request, please make sure your changes are passing code linting and tests.

You will need the latest [Ruff SDK](https://ruff.io/) to install rap dependencies and then to run tests.

### Installing Dependencies

```sh
npm install
rap install
```

### Running Tests

```sh
npm test
```

## License

The MIT License (MIT)

Copyright (c) 2016 Nanchao Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
