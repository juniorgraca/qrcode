declare module './BarcodeScannerComponent' {
  import { ComponentType } from 'react';

  interface BarcodeScannerComponentProps {
    onScan: (data: string) => void;
    onError: (error: Error) => void;
  }

  const BarcodeScannerComponent: ComponentType<BarcodeScannerComponentProps>;
  export default BarcodeScannerComponent;
}