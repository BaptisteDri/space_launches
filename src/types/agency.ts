export interface OrderedAgencies {
    country: string
    agencies: Agency[]
}

export interface Agency {
    abbrev: string // Abbreviation de l'agence
    countryCode: string
    infoURL: string
    infoURLs: string[]
    name: string
    wikiURL: string
}