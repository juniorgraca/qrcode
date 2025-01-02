
import { error } from './../node_modules/ajv-formats/node_modules/ajv/lib/vocabularies/applicator/dependencies';

declare module './QrCodeReaderComponent' {
  import { ComponentType } from 'react';

  interface QrCodeReaderComponentProps {
    videoConstraints: MediaTrackConstraints;
    onRead: (code: { data: string }) => void;
    onError: (error: error) => void;
  }

  const QrCodeReaderComponent: ComponentType<QrCodeReaderComponentProps>;
  export default QrCodeReaderComponent;
}