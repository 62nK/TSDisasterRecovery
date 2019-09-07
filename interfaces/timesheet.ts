import {ITCEntry} from '../interfaces/entry'
export interface ITimesheet{
    code: string,
    contractorName: string,
    date: Date,
    entries: [ITCEntry],
    approved: boolean,
    hours: number,
    total: number
}