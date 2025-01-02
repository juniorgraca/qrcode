import React, { useState, useEffect } from 'react';
import QrCodeReader, { QRCode } from 'react-qrcode-reader';

function App() {
  const [val, setVal] = useState<string>('');
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<string>('');

  // Detectar câmeras disponíveis
  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const videoDevices = devices.filter((device) => device.kind === 'videoinput');
      setCameras(videoDevices);
      if (videoDevices.length > 0) {
        setSelectedCamera(videoDevices[0].deviceId); // Seleciona a primeira câmera por padrão
      }
    }).catch((err) => {
      console.error("Erro ao acessar dispositivos de mídia: ", err);
    });
  }, []);

  // Função para lidar com a leitura do QR Code
  const handleRead = (code: QRCode) => {
    if (code) {
      setVal(code.data);
    }
  };

  return (
    <div>
      <h1>Leitor de QR Code</h1>
      
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

      {/* Exibe o leitor de QR Code */}
      <QrCodeReader
        delay={100}
        width={500}
        height={500}
        onRead={handleRead}
        videoId={selectedCamera}  // Passa o deviceId correto para o videoId
      />
      
      <p>Valor lido: {val}</p>
    </div>
  );
}

export default App;
