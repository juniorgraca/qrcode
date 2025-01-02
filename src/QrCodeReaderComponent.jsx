// QrCodeReaderComponent.jsx
import { useState, useEffect } from 'react';
import QrCodeReader from 'react-qrcode-reader';

const QrCodeReaderComponent = ({ videoConstraints, onRead }) => {
  const handleQrRead = (data) => {
    if (data) {
      onRead(data); // Passa o valor lido para o método onRead recebido via props
    }
  };

  return (
    <div>
      <h2>Leitor de QR Code</h2>
      <QrCodeReader
        delay={100}
        width={500}
        height={500}
        onError={(err) => console.error('Erro ao ler QR Code: ', err)}  // Lida com erros
        onScan={handleQrRead}  // Passa a função para o evento onScan
        videoConstraints={videoConstraints}
      />
    </div>
  );
};

export default QrCodeReaderComponent;
