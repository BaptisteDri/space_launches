const countries = require ('../iso3ToCountryNames.json')

export function groupAgenciesByCountries(agencies) {
    let tempOrderedAgencies = agencies.reduce((prevValue, currentValue) => {
        
        let countryName = ''
        if (typeof countries[currentValue.countryCode] === 'string') {
            countryName = countries[currentValue.countryCode]
        } else {
            countryName = currentValue.countryCode.split(', ').reduce((a, b) => countries[a] + ', ' + countries[b])
        }
        
        prevValue[countryName] = [...prevValue[countryName] || [], currentValue]
        return prevValue
    }, {})

    let orderedAgencies = []
    for(let [countryName, value] of Object.entries(tempOrderedAgencies)) {
        orderedAgencies.push(
            {
                "country": countryName,
                "agencies": value
            }
        )
    }

    orderedAgencies = orderedAgencies.sort((a, b) => {
        if(a.country < b.country) return -1
        if(a.country > b.country) return 1
        return 0
    })

    return orderedAgencies
}
