import {ITCEntry} from '../interfaces/entry'
export interface ITimesheet{
    code: number,
    contractorName: string,
    date: Date,
    entries: [ITCEntry],
    approved: boolean
}