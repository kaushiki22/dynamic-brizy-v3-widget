export interface Props {
   message: string,
   extraProps?:
   {
      [key: string]: unknown;
      'losing-img-imageImageSrc'?: string;
      'losing-text1-title'?: string
      'losing-text1-fontcolor'?: string;
      'losing-text1-fontsize'?: number;
      'losing-text1-bg-color'?: string;
   }
}
