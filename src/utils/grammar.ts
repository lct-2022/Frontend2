// TODO
export function validateNumberPeople(num: number): string {
    const stringifiedNum = num.toString();

    if ((stringifiedNum.endsWith('2') && !stringifiedNum.endsWith('12'))
        || (stringifiedNum.endsWith('3') && !stringifiedNum.endsWith('13'))
        || (stringifiedNum.endsWith('4') && !stringifiedNum.endsWith('14'))
    ) {
        return `${num} человека`;
    }

    return `${num} человек`;
}

const MONTHS: {[x in string]: string} = {
    '01': 'января',
    '02': 'февраля',
    '03': 'марта',
    '04': 'апреля',
    '05': 'мая',
    '06': 'июня',
    '07': 'июля',
    '08': 'августа',
    '09': 'сентября',
    '10': 'октября',
    '11': 'ноября',
    '12': 'декабря',
}

export function prepareDate(dateRaw: string | null | undefined, options?: {project: boolean}): string {
    if (!dateRaw) return '';

    const splitted = dateRaw.split(options?.project ? '-' : '.');
    const year = splitted[0];
    const month = MONTHS[splitted[1]];
    let day = splitted[2].slice(0, 2);

    if (day.startsWith('0')) {
        day = day.slice(1);
    }
    
    return `${day} ${month} ${year} года`;
}

export function getBrief(str: string): string {
    if (str.length <= 27) return str;

    return str.slice(0, 27) + '...';
}

export function prepareFio(lastName: string, firstName: string, fatherName: string): string {
    return `${lastName} ${firstName} ${fatherName}`
}