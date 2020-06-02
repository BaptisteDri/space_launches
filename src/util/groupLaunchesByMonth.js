import { monthIndexToMonthName } from './monthIndexToMonthName'

export function groupLaunchesByMonth(launches) {
    let tempOrderedLaunches = launches.reduce((prevValue, currentValue) => {
        if (currentValue.netstamp < Math.floor(Date.now() / 1000) && currentValue.net) {
            currentValue.netstamp = Math.floor(new Date(currentValue.net) / 1000)
        }
        prevValue[monthIndexToMonthName(currentValue.netstamp, true)] = [...prevValue[monthIndexToMonthName(currentValue.netstamp, true)] || [], currentValue]
        return prevValue
    }, {})

    const orderedLaunches = []

    for(let [month, value] of Object.entries(tempOrderedLaunches)) {
        orderedLaunches.push(
            {
                "month": month,
                "launches": value
            }
        )
    }

    return orderedLaunches
}