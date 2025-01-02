
import { useEffect } from 'react';
import { BarcodeScanner } from 'react-barcode-scanner';

const BarcodeScannerComponent = ({ onScan, onError }) => {
  return (
    <div>
      <h2>Leitor de Código de Barras</h2>
      <BarcodeScanner
        onScan={onScan}
        onError={onError}
      />
    </div>
  );
};

export default BarcodeScannerComponent;
