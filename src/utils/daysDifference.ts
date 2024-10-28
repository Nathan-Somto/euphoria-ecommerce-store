export function daysDifference(date1: Date, date2: Date){
    const miliDiff = date2.getTime() - date1.getTime();
    return Math.round(miliDiff/ (1000 * 60 * 60 * 24))
}