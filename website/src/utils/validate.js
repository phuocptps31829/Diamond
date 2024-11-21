function isEmpty(value) {
    return value === null || value === undefined || value === '';
}

export function checkRequiredBookingFields(data) {
    const requiredFields = [
        'fullName',
        'phoneNumber',
        'dateOfBirth',
        'address',
        'gender',
        'citizenIdentificationNumber',
    ];

    for (let field of requiredFields) {
        const fieldValue = field.split('.').reduce((obj, key) => obj && obj[key], data);
        if (isEmpty(fieldValue)) {
            return false;
        }
    }
    return true;
}