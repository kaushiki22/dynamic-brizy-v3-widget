export interface Props {
    data?: {
        couponCode?: string;
        title?: string;
    };
    extraProps?:
    {
        [key: string]: unknown;
        'winning-img-imageImageSrc'?: string;
        'winning-text1-title'?: string
        'winning-text1-fontcolor'?: string;
        'winning-text1-fontsize'?: number;
        'winning-text1-bg-color'?: string;
        'winning-text2-title'?: string;
        'winning-text2-fontcolor'?: string;
        'winning-text2-fontsize'?: number;
        'winning-text2-bg-color'?: string;
        'winning-couponbox-size'?: string;
        'winning-couponbox-type'?: string
        'winning-coupon-box-color'?: string;
        'winning-coupon-box-fontsize'?: number;
        'winning-coupon-box-fontcolor'?: string;
        'winning-coupon-box-bg-color'?: string;
        'winning-coupon-box-give-icon'?: string;
    }

}