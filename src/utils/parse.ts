const minPattern = new RegExp('_/+|>|>=/', 'gi');

export const parseStringForDiapazon = (str: string): {min: number, max: number} => {
    const splitted = str.split('-');
    console.log(splitted);
    
    if (splitted.length === 1 || splitted.includes('')) {
        if (str.includes('+')) {
            return {
                min: Number(str.split('+').filter(elem => elem)),
                max: Infinity,
            } 
        } else {
            return {
                min: -Infinity,
                max: Number(str.split('-').filter(elem => elem)),
            } 
        }
    }

    return {
        min: Number(str.split('-')[0]),
        max: Number(str.split('-')[1]),
    }
}