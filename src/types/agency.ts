export interface OrderedAgencies {
    country: string
    agencies: Agency[]
}

export interface Agency {
    abbrev: string // Abbreviation de l'agence
    countryCode: any // string or string[]
    infoURL: string
    infoURLs: string[]
    name: string
    wikiURL: string
}