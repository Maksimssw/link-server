import { lookup } from 'geoip-lite'
import * as countries from 'i18n-iso-countries'

import type { Metadata } from '../types/metadata.type'

import DeviceDetector = require('device-detector-js')

countries.registerLocale(require('i18n-iso-countries/langs/en.json'))

export const getMetadata = (ip: string, userAgent: string): Metadata => {
	const location = lookup(ip)
	const device = new DeviceDetector().parse(userAgent)

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
	}
}
