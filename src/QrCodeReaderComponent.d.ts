declare module './QrCodeReaderComponent' {
  import { ComponentType } from 'react';

  interface QrCodeReaderComponentProps {
    videoConstraints: MediaTrackConstraints;
    onRead: (code: { data: string }) => void;
  }

  const QrCodeReaderComponent: ComponentType<QrCodeReaderComponentProps>;
  export default QrCodeReaderComponent;
}