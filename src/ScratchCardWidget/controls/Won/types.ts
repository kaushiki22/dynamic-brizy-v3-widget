export interface Props {
    data?: {
        couponCode?: string;
        title?: string;
    };
    extraProps?:
    {
        [key: string]: unknown;
        'scratch-card-winning-img-imageImageSrc'?: string;
        'scratch-card-winning-text1-title'?: string
        'scratch-card-winning-text1-fontcolor'?: string;
        'scratch-card-winning-text1-fontsize'?: number;
        'scratch-card-winning-text1-bg-color'?: string;
        'scratch-card-winning-text2-title'?: string;
        'scratch-card-winning-text2-fontcolor'?: string;
        'scratch-card-winning-text2-fontsize'?: number;
        'scratch-card-winning-text2-bg-color'?: string;
        'scratch-card-winning-couponbox-size'?: string;
        'scratch-card-winning-couponbox-type'?: string
        'scratch-card-winning-coupon-box-color'?: string;
        'scratch-card-winning-coupon-box-fontsize'?: number;
        'scratch-card-winning-coupon-box-fontcolor'?: string;
        'winning-coupon-box-bg-color'?: string;
        'scratch-card-winning-coupon-box-give-icon'?: string;
        'scratch-card-winning-coupon-box-give-icon-color'?: string;
    }

}
