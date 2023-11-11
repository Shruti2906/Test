// src/pages/newcomp.tsx
import React, { useEffect } from 'react';
import { IonContent, IonButton, IonList, IonItem, IonLabel } from '@ionic/react';
import { useBleService } from '../../services/BleService';

const NewComp: React.FC = () => {
  const { scannedDevices } = useBleService();

  useEffect(() => {
    // Do something with the scanned devices if needed
    console.log('Scanned devices in Home:', scannedDevices);
  }, [scannedDevices]);

  return (
    <IonContent>
      <IonButton onClick={() => console.log('Button Clicked')}>Start Scan</IonButton>
      
      <IonList>
        {scannedDevices.map((device) => (
          <IonItem key={device.id}>
            <IonLabel>{device.name || 'Unnamed'}</IonLabel>
          </IonItem>
        ))}
      </IonList>
    </IonContent>
  );
};

export default NewComp;










// // src/pages/Home.tsx
// import React, { useEffect } from 'react';
// import { IonContent, IonButton, IonList, IonItem, IonLabel } from '@ionic/react';
// // import { useBleService } from '../services/BleService';
// import { BleService } from '@capacitor-community/bluetooth-le';
// import { useBleService } from '../../services/BleService';

// const newcomp: React.FC = () => {
//   const { scannedDevices } = useBleService();

//   useEffect(() => {
//     // Do something with the scanned devices if needed
//     console.log('Scanned devices in Home:', scannedDevices);
//   }, [scannedDevices]);

//   return (
//     <IonContent>
//       <IonButton onClick={() => console.log('Button Clicked')}>Start Scan</IonButton>
      
//       <IonList>
//         {scannedDevices.map((device) => (
//           <IonItem key={device.id}>
//             <IonLabel>{device.name || 'Unnamed'}</IonLabel>
//           </IonItem>
//         ))}
//       </IonList>
//     </IonContent>
//   );
// };

// export default newcomp;
