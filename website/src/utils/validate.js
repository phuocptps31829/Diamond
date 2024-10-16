function isEmpty(value) {
    return value === null || value === undefined || value === '';
}

export function checkRequiredBookingFields(data) {
    const requiredFields = [
        'fullName',
        'phoneNumber',
        'email',
        'dateOfBirth',
        'address.province',
        'address.district',
        'address.ward',
        'address.street',
        'gender',
        'citizenIdentificationNumber',
        'otherInfo.occupation',
        'otherInfo.insuranceCode',
        'otherInfo.ethnic'
    ];

    for (let field of requiredFields) {
        const fieldValue = field.split('.').reduce((obj, key) => obj && obj[key], data);
        if (isEmpty(fieldValue)) {
            return false;
        }
    }
    return true;
}