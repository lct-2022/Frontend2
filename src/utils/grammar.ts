// TODO
export function validateNumberPeople(num: number): string {
    const stringifiedNum = num.toString();

    if ((stringifiedNum.endsWith('2') && !stringifiedNum.endsWith('12'))
        || (stringifiedNum.endsWith('3') && !stringifiedNum.endsWith('13'))
        || (stringifiedNum.endsWith('4') && !stringifiedNum.endsWith('14'))
    ) {
        return  `${num} человека`;
    }

    return `${num} человек`;
}