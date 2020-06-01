export function monthIndexToMonthName(timestamp: number, year: boolean) {
    return year ? new Date(timestamp * 1000).toLocaleDateString('fr-FR', {month: 'long'}) + ' ' + new Date(timestamp * 1000).getFullYear() : new Date(timestamp * 1000).toLocaleDateString('fr-FR', {month: 'long'})
}