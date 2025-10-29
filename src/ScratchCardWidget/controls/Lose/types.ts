export interface Props {
   message: string,
   extraProps?:
   {
      [key: string]: unknown;
      'scratch-card-losing-img-imageImageSrc'?: string;
      'scratch-card-losing-text1-title'?: string
      'scratch-card-losing-text1-fontcolor'?: string;
      'scratch-card-losing-text1-fontsize'?: number;
      'scratch-card-losing-text1-bg-color'?: string;
      'scratch-card-losing-bg-color'?:string
   }
}
