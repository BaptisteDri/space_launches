import { monthIndexToMonthName } from './monthIndexToMonthName'

export function groupLaunchesByMonth(launches) {
    let tempOrderedLaunches = launches.reduce((prevValue, currentValue) => {
        prevValue[monthIndexToMonthName(currentValue.netstamp, true)] = [...prevValue[monthIndexToMonthName(currentValue.netstamp, true)] || [], currentValue]
        return prevValue
    }, {})
    console.log(tempOrderedLaunches)

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