import React from 'react';
import { Image } from 'react-native';

const NotFound = () => {
    return (
        <Image className="w-full h-40" source={ require("../../assets/images/notfound.png") } />
    );
};

export default NotFound;