import { Pad } from './pad'

export interface Location {
    countryCode: string
    name: string
    pads: Pad[]
    latitude: number
    longitude: number
}