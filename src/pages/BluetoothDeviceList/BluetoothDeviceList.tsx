// BluetoothPermissionPage.tsx
import React, { useEffect, useState } from 'react';
import { IonPage, IonContent, IonAlert } from '@ionic/react';
import { BleDevice, BluetoothLe, InitializeOptions, RequestBleDeviceOptions, ScanResult } from '@capacitor-community/bluetooth-le';
import { useHistory } from 'react-router-dom';

interface Device {
  id: string;
  name: string | null;
}

const BluetoothPermissionPage: React.FC = () => {
  const history = useHistory();
  const [showBluetoothPermissionAlert, setShowBluetoothPermissionAlert] = useState(true);
  const [devices, setDevices] = useState<BleDevice[]>([]);

  useEffect(() => {
    const initializeBluetooth = async () => {
      try {
        // Initialize Bluetooth
        await BluetoothLe.initialize();
      } catch (error) {
        console.error('Error initializing Bluetooth:', error);
      }
    };

    initializeBluetooth();
  }, []);

  const handleAllowBluetooth = async () => {
    try {
      // Check if Bluetooth is enabled
      const isBluetoothEnabled = await BluetoothLe.isEnabled();

      if (!isBluetoothEnabled) {
        // Request to enable Bluetooth
        await BluetoothLe.requestEnable();
      }

      // Request Bluetooth permission logic here

      // Start scanning for devices
      await BluetoothLe.requestLEScan({})//.subscribe(console.log('k'));
    } catch (error) {
      console.error('Error handling Bluetooth permission:', error);
    }
  };

  const handleDeviceDiscovery = (result: ScanResult) => {
    if (result.device) {
      // Use the 'result.device' directly, as it is now a BleDevice
      setDevices((prevDevices) => [...prevDevices, result.device]);
    } else {
      console.error('Invalid result format:', result);
    }
  };

  const handleConnectToDevice = async (device: Device) => {
    try {
      // Connect to the selected device
      await BluetoothLe.connect({ deviceId: device.id });

      // Navigate to the next page (replace '/Home' with your actual route)
      history.push('/Home');
    } catch (error) {
      console.error('Error connecting to device:', error);
    }
  };

  return (
    <IonPage>
      <IonContent>
        <IonAlert
          isOpen={showBluetoothPermissionAlert}
          onDidDismiss={() => setShowBluetoothPermissionAlert(false)}
          header="Bluetooth Permission"
          message="Allow Bluetooth to find and connect to devices?"
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                // Handle cancel button click
              },
            },
            {
              text: 'Allow',
              handler: handleAllowBluetooth,
            },
          ]}
        />

        {/* Your device list UI here */}
        {devices.length > 0 && (
          <div>
            <h2>Available Devices</h2>
            <ul>
              {devices.map((device) => (
                <li key={device.id} onClick={() => handleConnectToDevice(device)}>
                  {device.name || device.id}
                </li>
              ))}
            </ul>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default BluetoothPermissionPage;






// import React, { useState, useEffect } from 'react';
// import { IonList, IonItem, IonButton } from '@ionic/react';
// import { BluetoothLe } from '@capacitor-community/bluetooth-le';

// const BluetoothDeviceList: React.FC = () => {
//   const [devices, setDevices] = useState<any[]>([]);
//   const [connectedDevice, setConnectedDevice] = useState(null);

//   useEffect(() => {
//     const fetchDevices = async () => {
//       try {
//         // Assuming that requestLEScan returns a list of devices
//         const scannedDevices = await BluetoothLe.requestLEScan();
        
//         // Now you can set the devices state
//         // setDevices(scannedDevices);
  
//         // Log the devices
//         console.log(scannedDevices);
//       } catch (error) {
//         console.error('Error fetching devices:', error);
//       }
//     };
  
//     // Call the asynchronous function
//     fetchDevices();
//   }, []);
  
//   function handleConnect(device: any): void {
//     throw new Error('Function not implemented.');
//   }

//   // useEffect(() => {

//   //   const fetchDevices = async () => {
//   //     try {
//   //       // Assuming that requestLEScan returns a list of devices
//   //       const scannedDevices = await BluetoothLe.requestLEScan();
        
//   //       // Now you can set the devices state
//   //       //setDevices(scannedDevices);
  
//   //       // Log the devices
//   //       console.log(scannedDevices);
//   //     } catch (error) {
//   //       console.error('Error fetching devices:', error);
//   //     }


//   //   BluetoothLe.requestLEScan().then((devices) => {
//   //      setDevices(devices);
//   //     console.log(devices);
//   //   });
//   // }, []);

//   // const handleConnect = (device) => {
//   //   BluetoothLe.connect(device.address).then(() => {
//   //     setConnectedDevice(device);
//   //     alert('Device connected successfully!');
// //     });
// //   };

//   return (
//     <IonList>
//       {devices.map((device) => (
//         <IonItem key={device.address}>
//           <IonButton onClick={() => handleConnect(device)}>Connect</IonButton>
//           {device.name}
//         </IonItem>
//       ))}
//     </IonList>
//   );
// };













// // // DeviceListPage.tsx
// // import React, { useEffect, useState } from 'react';
// // import { IonPage, IonContent, IonList, IonItem, IonLabel, IonButton, IonAlert } from '@ionic/react';
// // import { BluetoothLe } from '@capacitor-community/bluetooth-le';

// // const BluetoothDeviceList: React.FC = () => {
// //   const [devices, setDevices] = useState([]);
// //   const [connectedDevice, setConnectedDevice] = useState('');
// //   const [showSuccessAlert, setShowSuccessAlert] = useState(false);

// //   useEffect(() => {
// //     // Function to start scanning for devices
// //     const startScan = async () => {
// //       try {
// //         const scanResult = await BluetoothLe.requestLEScan({});
// //         setDevices(scanResult.devices);
// //       } catch (error) {
// //         console.error('Error scanning for devices:', error);
// //       }
// //     };

// //     // Start scanning when the component mounts
// //     startScan();

// //     // Stop scanning when the component unmounts
// //     return () => {
// //       BluetoothLe.stopLEScan();
// //     };
// //   }, []);

// //   const handleConnectToDevice = async (device: any) => {
// //     try {
// //       // Connect to the selected device
// //       await BluetoothLe.connect({ deviceId: device.id });
// //       setConnectedDevice(device.name || device.id);

// //       // Show a success alert
// //       setShowSuccessAlert(true);
// //     } catch (error) {
// //       console.error('Error connecting to device:', error);
// //     }
// //   };

// //   return (
// //     <IonPage>
// //       <IonContent>
// //         <IonList>
// //           {devices.map((device) => (
// //             <IonItem key={device.id} button onClick={() => handleConnectToDevice(device)}>
// //               <IonLabel>{device.name || device.id}</IonLabel>
// //             </IonItem>
// //           ))}
// //         </IonList>

// //         {/* Alert for successful connection */}
// //         <IonAlert
// //           isOpen={showSuccessAlert}
// //           onDidDismiss={() => setShowSuccessAlert(false)}
// //           header="Connected Successfully"
// //           message={`Connected to ${connectedDevice}`}
// //           buttons={['OK']}
// //         />
// //       </IonContent>
// //     </IonPage>
// //   );
// // };

// export default BluetoothDeviceList;


