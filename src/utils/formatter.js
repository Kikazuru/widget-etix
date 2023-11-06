import moment from "moment-timezone";

function utcToLocale(date, format) {
    if (date)
        return moment.utc(date).local().format(format);
    else null
}

function localeToUTC(date) {
    return moment(date).toISOString()
}

export { utcToLocale, localeToUTC }