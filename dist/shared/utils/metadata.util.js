"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMetadata = void 0;
const geoip_lite_1 = require("geoip-lite");
const countries = require("i18n-iso-countries");
const DeviceDetector = require("device-detector-js");
countries.registerLocale(require('i18n-iso-countries/langs/en.json'));
const getMetadata = (ip, userAgent) => {
    const location = (0, geoip_lite_1.lookup)(ip);
    const device = new DeviceDetector().parse(userAgent);
    return {
        location: {
            country: countries.getName(location.country, 'en') || 'Unknown',
            city: location.city || 'Unknown',
            latidute: location.ll[0] || 0,
            longitude: location.ll[1] || 0
        },
        device: {
            browser: device.client.name || 'Unknown',
            os: device.os?.name || 'Unknown',
            type: device.client.type || 'Unknown'
        },
        ip
    };
};
exports.getMetadata = getMetadata;
//# sourceMappingURL=metadata.util.js.map