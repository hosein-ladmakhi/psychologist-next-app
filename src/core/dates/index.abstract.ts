import { TDateArg, TLocale } from "./index.type";

export abstract class CoreDate {
    // GET DATE
    public abstract formatDate(date: TDateArg, locale?: TLocale): string;

    // GET TIME
    public abstract formatTime(date: TDateArg): string;

    // GET DAY OF WEEK
    public abstract getWeekDay(date: TDateArg): number;

    // VALIDATE DATE
    public abstract isValidDate(date: TDateArg): boolean;

    // FORMAT DATE AND TIME
    public abstract formatDateTime(date: TDateArg, locale?: TLocale): string;

    // CURRENT DATE
    public abstract getCurrentDate(locale?: TLocale): string;

    // CURRENT TIME
    public abstract getCurrentTime(): string;

    // CURRENT DATE AND TIME
    public abstract getCurrentDateTime(locale?: TLocale): string;
}


