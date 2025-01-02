import { error } from './../node_modules/ajv-formats/node_modules/ajv/lib/vocabularies/applicator/dependencies';
declare module './BarcodeScannerComponent' {
  import { ComponentType } from 'react';

  interface BarcodeScannerComponentProps {
    onScan: (data: string) => void;
    onError: (error: error) => void;
  }

  const BarcodeScannerComponent: ComponentType<BarcodeScannerComponentProps>;
  export default BarcodeScannerComponent;
}