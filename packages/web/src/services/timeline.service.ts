export type Datelike = Date | number
export type DateRange = [Datelike, Datelike]

export class TimelineService {
  convertDateToScreen(date: Date, range: DateRange, screenWidth: number): number {
    const t = date.valueOf()
    const t1 = range[0].valueOf()
    const t2 = range[1].valueOf()
    const x = ((t - t1) / (t2 - t1)) * screenWidth
    return x
  }
}
