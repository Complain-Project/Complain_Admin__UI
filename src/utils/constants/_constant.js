export const VALIDATE_EMAIL_REGEX = /^[a-zA-Z0-9][a-zA-Z0-9_.-]{1,}@[a-z0-9]{1,}(\.[a-z0-9]{1,}){1,2}$/
export const VALIDATE_PHONE_REGEX_RULE = /((^0|^84|^\+84|^\(\+84\))+([0-9]{2}))+([0-9]{7}|[0-9]{1}\.[0-9]{3}\.[0-9]{3}|[0-9]{1}-[0-9]{3}-[0-9]{3}|[0-9]{1}\s[0-9]{3}\s[0-9]{3}$)/

export const COMPLAIN_STATUS = []
COMPLAIN_STATUS['NO_PROCESS'] = 0
COMPLAIN_STATUS['PROCESSED'] = 1

export const  COMPLAIN_STATUS_DATA = [
    {
        label: "Chưa phản hồi",
        value: COMPLAIN_STATUS['NO_PROCESS']
    },
    {
        label: "Đã phản hồi",
        value: COMPLAIN_STATUS['PROCESSED']
    }
]

export const POST_STATUS = []
POST_STATUS['PENDING'] = 0
POST_STATUS['ACCEPT'] = 1