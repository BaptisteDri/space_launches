import { Rocket } from './rocket'
import { Location } from './location'
import { Mission } from './mission'

export interface OrderedLaunches {
    month: string
    launches: Launch[]
}

export interface Launch {
    id: number
    name: string
    net: string // date
    netstamp: number // date in timestamp
    windowstart: string // date début fenêtre de tir
    windowend: string // date fin fenêtre de tir
    probability: number
    rocket: Rocket
    location: Location
    missions: Mission[]
}