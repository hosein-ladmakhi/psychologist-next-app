import { CoreDate } from "./index.abstract";
import { TDateArg, TLocale } from "./index.type";
import moment from "moment-jalaali"


const FORMAT = {
    en: {
        date: 'YYYY-MM-DD',
        datetime: 'YYYY-MM-DD HH:mm'
    },
    fa: {
        date: 'jYYYY-jMM-jDD',
        datetime: 'jYYYY-jMM-jDD HH:mm'
    },
    time: 'HH:mm'
}


class DateFns extends CoreDate {
    public getCurrentDate(locale: TLocale = 'fa'): string {
        return moment(new Date()).format(FORMAT[locale].date)
    }

    public getCurrentTime(): string {
        return moment(new Date()).format(FORMAT.time)
    }

    public getCurrentDateTime(locale: TLocale = 'fa'): string {
        return moment(new Date()).format(FORMAT[locale].datetime)
    }

    public formatDate(date: TDateArg, locale: TLocale = 'fa'): string {
        return moment(date).format(FORMAT[locale].date)
    }

    public formatTime(date: TDateArg): string {
        return moment(date).format(FORMAT.time)
    }

    public getWeekDay(date: TDateArg): number {
        return moment(new Date(date)).isoWeekday()
    }

    public isValidDate(date: TDateArg): boolean {
        return moment(date).isValid()
    }

    public formatDateTime(date: TDateArg, locale: TLocale = 'fa'): string {
        return moment(new Date(date)).format(FORMAT[locale].datetime)
    }
}


export const dateTool = new DateFns();