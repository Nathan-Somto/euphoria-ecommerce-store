export function daysDifference(date1: Date | string, date2: Date | string): number {
    let localDate1 = date1;
    let localDate2 = date2;
    if (typeof date1 === 'string') {
        localDate1 = new Date(date1);
    }
    if (typeof date2 === 'string') {
        localDate2 = new Date(date2);
    }
    if (localDate1 instanceof Date && localDate2 instanceof Date) {
        const miliDiff = localDate1.getTime() - localDate2.getTime();
        return Math.round(miliDiff / (1000 * 60 * 60 * 24))
    }
    return 0;
}