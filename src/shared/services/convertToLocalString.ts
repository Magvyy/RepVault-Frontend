import { Temporal } from "@js-temporal/polyfill";


export const convertToLocalString = (time: string): string => {
    const t = Temporal.Instant.from(time).toZonedDateTimeISO(Temporal.Now.timeZoneId()).toPlainDateTime().toLocaleString("en-GB", { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric"})
    return t
}

export const convertTimeDifferenceToLocalString = (start: string, end: string): string => {
    const t1 = Temporal.Instant.from(start).toZonedDateTimeISO(Temporal.Now.timeZoneId())
    const t2 = Temporal.Instant.from(end).toZonedDateTimeISO(Temporal.Now.timeZoneId())
    const diff = t1.until(t2)
    return diff.hours.toString().padStart(2, "0") + ":" + diff.minutes.toString().padStart(2, "0") + ":" + diff.seconds.toString().padStart(2, "0")
}