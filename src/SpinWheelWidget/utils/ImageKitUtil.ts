// generate the imagekit url based on the DC
const imageKitUrlMAp: Record<string, string> = {
    DC1: 'https://image.moengage.com',
    DC2: 'https://image-eu.moengage.com',
    DC3: 'https://image-ap1.moengage.com',
    DC4: 'https://image-04.moengage.com',
    DC6: 'https://image-06.moengage.com',
    DC100: 'https://image.moengage.com/all-campaign-images-moe-dc-100',
};

const getImageKitUrl = () => {
    // Try to get data center from window object if available
    const dataCenter = (window as any).MoeOsm?.dataCenter || (window as any).dataCenter;
    if (dataCenter && dataCenter in imageKitUrlMAp) {
        return imageKitUrlMAp[dataCenter];
    }
    if (window.location.hostname.includes('az100')) {
        return 'https://image.moengage.com/all-campaign-images-moe-az-stg';
    }
    // Default fallback
    return 'https://image-staging-ap1.moengage.com';
};

export { getImageKitUrl };
