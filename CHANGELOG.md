# Change Log

## v0.11.1 / 2025-05-24
### Fixed
- Fix NodeJS check for electron renderer #49

## v0.11.0 / 2024-01-24
### Fixed
- Generates incorrect hash in some cases #43
- dependencies and security issues. #41

## v0.10.1 / 2023-08-31
### Added
- Disable webpack polyfill.

## v0.10.0 / 2023-08-30
### Fixed
- Chrome bug by workaround. #40
- deprecated `new Buffer`, replace with `Buffer.from`. #34
- dependencies and security issues. #32, #36

### Changed
- TypeScript interface, secretKey can be bytes like message. #23, #25
- remove `eval` and use `require` directly. #18, #26

## v0.9.0 / 2017-12-18
### Fixed
- incorrect result when first bit is 1 of bytes.

### Changed
- throw error by Error oject. #13

### Added
- TypeScript interfaces. #12

## v0.8.0 / 2017-11-19
### Added
- support for web worker.
- typescript types. #10

### Changed
- prevent webpack to require dependencies.

## v0.7.1 / 2017-10-31
### Improved
- performance of hBytes increment.

## v0.7.0 / 2017-10-31
### Fixed
- incorrect result when file size >= 512M.

## v0.6.0 / 2017-07-11
### Added
- HMAC feature.

### Changed
- throw error if input type is incorrect.

## v0.5.0 / 2017-01-24
### Added
- Streaming support #6

## v0.4.0 / 2017-01-23
### Added
- AMD support.

### Fixed
- ArrayBuffer dosen't work in Webpack.

## v0.3.2 / 2016-09-12
### Added
- CommonJS detection.

## v0.3.1 / 2016-09-08
### Added
- some files to npm package.

### Fixed
- coding style.

## v0.3.0 / 2015-05-23
### Added
- support for ArrayBuffer input.

## v0.2.3 / 2015-02-11
### Added
- support for byte array input.

## v0.2.2 / 2015-02-10
### Improved
- performance.

## v0.2.1 / 2015-02-05
### Fixed
- special length bug.

### Added
- test cases.

## v0.2.0 / 2015-02-03
### Removed
- ascii parameter.

### Improved
- performance.

### Added
- test cases.

## v0.1.4 / 2015-01-24
### Improved
- performance.

## v0.1.3 / 2015-01-09
### Improved
- performance.

## v0.1.2 / 2015-01-06
### Added
- bower package.
- travis.
- coveralls.

### Fixed
- JSHint warnings.

## v0.1.1 / 2014-07-27
### Fixed
- accents bug.

## v0.1.0 / 2014-01-05
### Added
- initial release.
