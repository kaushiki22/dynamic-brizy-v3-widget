export interface Data {
  id: string;
  title: string;
  couponCode: string;
  loseOption: string;
  score: number;
  sectorColor?: string;
  fontColor?: string;
  fontSize?: number;
  image?: string;
}

export interface Types {
  scratchItems?: { id: string }[];
  'scratch-card-box-is-form'?: string;
  'default-bg-color'?: string;
  'default-scratch-btn-color'?: string;
  'default-scratch-btn-text'?: string;
  'scratch-card-image'?: string;
  'winning-img-imageImageSrc'?: string;
  'winning-text1-title'?: string;
  'winning-text1-fontcolor'?: string;
  'winning-text1-fontsize'?: string;
  'winning-text1-bg-color'?: string;
  'winning-text2-title'?: string;
  'winning-text2-fontcolor'?: string;
  'winning-text2-fontsize'?: string;
  'winning-text2-bg-color'?: string;
  'winning-couponbox-size'?: string;
  'winning-couponbox-type'?: string;
  'winning-coupon-box-color'?: string;
  'winning-coupon-box-fontcolor'?: string;
  'winning-coupon-box-fontsize'?: string;
  'winning-coupon-box-bg-color'?: string;
  'winning-coupon-box-give-icon'?: string;
  'winning-coupon-box-give-icon-color'?: string;
  'losing-img-imageImageSrc'?: string;
  'losing-text1-title'?: string;
  'losing-text1-fontcolor'?: string;
  'losing-text1-fontsize'?: string;
  'losing-text1-bg-color'?: string;
  [key: string]: any;
}
