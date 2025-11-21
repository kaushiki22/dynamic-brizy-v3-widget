// generate the imagekit url based on the DC
import { Utils } from '@moengage/core';

const imageKitUrlMAp = {
    DC1: 'https://image.moengage.com',
    DC2: 'https://image-eu.moengage.com',
    DC3: 'https://image-ap1.moengage.com',
    DC4: 'https://image-04.moengage.com',
    DC6: 'https://image-06.moengage.com',
    DC100: 'https://image.moengage.com/all-campaign-images-moe-dc-100',
};

const getImageKitUrl = () => {
    const dataCenter = Utils.checkDataCenter() as keyof typeof imageKitUrlMAp;
    if (dataCenter in imageKitUrlMAp) {
        return imageKitUrlMAp[dataCenter];
    }
    if (window.location.hostname.includes('az100')) {
        return 'https://image.moengage.com/all-campaign-images-moe-az-stg';
    }
    console.log('dataCenter', dataCenter);
    return 'https://image-staging-ap1.moengage.com';
};

export { getImageKitUrl };
