import  {
    VALIDATE_PHONE_REGEX_RULE
} from "@/utils/constants/_constant";

export const isValidPhone = (phone) => {
    let result = false

    if (phone && typeof phone === 'string') {
        let trimPhone = phone.trim()

        if (trimPhone) {
            const regexRule = RegExp(VALIDATE_PHONE_REGEX_RULE);

            let ruleMatchs = trimPhone.match(regexRule);

            if (ruleMatchs && ruleMatchs.length > 0) {
                result = (ruleMatchs[0] === trimPhone)
            }
        }
    }

    return result
}
