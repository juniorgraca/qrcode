import React from 'react';

import QrCodeReader, { QRCode } from 'react-qrcode-reader';

function App() {
  const [val, setVal] = React.useState<string>('');

  const handleRead = (code: QRCode) => {
    setVal(code.data);
  };

  return (
    <>
      <QrCodeReader delay={100} width={500} height={500} onRead={handleRead} />
      ola 
      <p>{val}</p>
    </>
  );
}

export default App;