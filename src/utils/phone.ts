export const preparePhone = (rawPhone: string | null): string => {
    if (!rawPhone) {
        return '';
    }

    const arrPhone = rawPhone.replace(/\D/g, '').split('');

    arrPhone.splice(0, 1, '+7');
    arrPhone.splice(1, 0, ' (');
    arrPhone.splice(5, 0, ') ');
    arrPhone.splice(9, 0, '-');
    arrPhone.splice(12, 0, '-');

    return arrPhone.join('')
}

export const hidePhone = (rawPhone: string): string => {
    if (!rawPhone) {
        return '';
    }

    return rawPhone.split('').map((el, i) => i > 8 ? '*' : el).join('');
}

