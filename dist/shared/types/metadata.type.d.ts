export interface Metadata {
    location: LocationInfo;
    device: DeviceInfo;
    ip: string;
}
export interface LocationInfo {
    country: string;
    city: string;
    latidute: number;
    longitude: number;
}
export interface DeviceInfo {
    browser: string;
    os: string;
    type: string;
}
