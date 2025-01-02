import { useState, useEffect } from 'react';

import QrCodeReaderComponent from './QrCodeReaderComponent'; 
import BarcodeScannerComponent from './BarcodeScannerComponent';

interface QRCode {
  data: string;
}

function App() {
  const [val, setVal] = useState<string>('');
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<string>(''); 
  const [isScanning, setIsScanning] = useState<boolean>(false);  // Para gerenciar o estado da tela verde

  // Detectar câmeras disponíveis
  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const videoDevices = devices.filter((device) => device.kind === 'videoinput');
      setCameras(videoDevices);
      
      // Seleciona a câmera traseira, caso esteja disponível, caso contrário, usa a primeira câmera
      const rearCamera = videoDevices.find((device) => device.label.toLowerCase().includes('back'));
      if (rearCamera) {
        setSelectedCamera(rearCamera.deviceId);  // Câmera traseira
      } else if (videoDevices.length > 0) {
        setSelectedCamera(videoDevices[0].deviceId); // Seleciona a primeira câmera se não houver traseira
      }
    }).catch((err) => {
      console.error("Erro ao acessar dispositivos de mídia: ", err);
    });
  }, []);

  // Função para lidar com a leitura do QR Code
  const handleQrRead = (code: QRCode) => {
    if (code) {
      setVal(code.data);
      setIsScanning(false); // Desativa a tela verde após a leitura do QR Code
    }
  };

  // Função para lidar com a leitura do Código de Barras
  const handleBarcodeRead = (data: string) => {
    setVal(data);
    setIsScanning(false); // Desativa a tela verde após a leitura do Código de Barras
  };

  // Função para gerenciar erros do scanner de código de barras
  const handleBarcodeError = (error: Error) => {
    console.error('Erro ao ler código de barras: ', error);
  };

  // Define as configurações da câmera
  const videoConstraints = {
    facingMode: selectedCamera ? 'environment' : 'user',
    deviceId: selectedCamera ? { exact: selectedCamera } : undefined
  };

  return (
    <div>
      <h1>Leitor de QR Code e Código de Barras</h1>
      
      {/* Exibe a lista de câmeras disponíveis */}
      {cameras.length > 0 && (
        <div>
          <h2>Escolha a câmera:</h2>
          <select
            value={selectedCamera}
            onChange={(e) => setSelectedCamera(e.target.value)}
          >
            {cameras.map((camera) => (
              <option key={camera.deviceId} value={camera.deviceId}>
                {camera.label || `Câmera ${camera.deviceId}`}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Exibe a tela verde durante a leitura */}
      {isScanning && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 255, 0, 0.5)',
          zIndex: 1000,
        }}></div>
      )}

      {/* Componente para ler QR Code */}
      <QrCodeReaderComponent
        videoConstraints={videoConstraints}
        onRead={handleQrRead}
      />

      {/* Componente para ler Código de Barras */}
      <BarcodeScannerComponent
        onScan={handleBarcodeRead}
        onError={handleBarcodeError}
      />
      
      <p>Valor lido: {val}</p>
    </div>
  );
}

export default App;