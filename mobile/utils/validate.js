export class Validate {
    static isEmail(email) {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
    static isPhoneNumber(phoneNumber) {
        const re = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        return re.test(phoneNumber);
    }
    static isCitizenIdentificationNumber(citizenIdentificationNumber) {
        const re = /^[0-9]{12}$/;
        return re.test(citizenIdentificationNumber);
    }
}