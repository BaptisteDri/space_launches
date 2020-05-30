import { Rocket } from './rocket'
import { Location } from './location'

export interface OrderedLaunches {
    month: string,
    launches: Launch[]
}

export interface Launch {
    name: string
    net: string // date
    netstamp: number // date in timestamp
    windowstart: string // date début fenêtre de tir
    windowend: string // date fin fenêtre de tir
    probability: number
    rocket: Rocket
    location: Location
}