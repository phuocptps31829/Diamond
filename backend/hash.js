const bcrypt = require('bcrypt');

const hashValue = async (value) => {
    const salt = await bcrypt.genSalt(15);
    const hashedValue = await bcrypt.hash(value, salt);
    return hashedValue;
};

const generateHashForSuperadmin = async () => {
    try {
        const hashedValue = await hashValue('diaasfsdjahfhsdhfjkasdkjfkjsadhfhsdkjfh');
        console.log('Hashed value for superadmin:', hashedValue);
    } catch (error) {
        console.error('Error hashing value:', error);
    }
};

generateHashForSuperadmin();
