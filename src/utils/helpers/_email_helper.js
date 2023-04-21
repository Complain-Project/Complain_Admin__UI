import {
    VALIDATE_EMAIL_REGEX,
}
from '../constants/_constant'
export const isValidEmail = (email) => {
    let result =  false
    if (email && typeof email === 'string') {
        const regex = RegExp(VALIDATE_EMAIL_REGEX);
        result = regex.test(email.trim())
    }
    return result
}