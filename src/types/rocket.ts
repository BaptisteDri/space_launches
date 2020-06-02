import { Agency } from './agency'

export interface Rocket {
    imageURL: string
    family: Family
    name: string
    wikiURL: string
    infoURL: string
    infoURLs: any // string || string[]
    agencies: Agency[]
}

export interface Family {
    name: string
    agencies: string // list des id séparés par des ,
}