// src/services/BleService.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { BLE } from '@ionic-native/ble/ngx';
import { Observable } from 'rxjs';

interface Device {
  id: string;
  name: string | null;
}

interface BleServiceContextProps {
  scannedDevices: Device[];
}

interface BleServiceProviderProps {
  children: ReactNode;
}

const BleServiceContext = createContext<BleServiceContextProps | undefined>(undefined);

export const BleServiceProvider: React.FC<BleServiceProviderProps> = ({ children }) => {
  const [scannedDevices, setScannedDevices] = useState<Device[]>([]);
  const ble = new BLE();

  useEffect(() => {
    const scan = async () => {
      try {
        const devices = await new Promise<Device[]>((resolve, reject) => {
          const subscription = ble.scan([], 5).subscribe(
            (result: Device[]) => {
              subscription.unsubscribe();
              resolve(result);
            },
            (error) => {
              subscription.unsubscribe();
              reject(error);
            }
          );
        });

        setScannedDevices(devices);
        console.log('Scanned devices:', devices);
      } catch (error) {
        console.error('Error scanning for devices:', error);
      }
    };

    scan();
  }, []);

  return (
    <BleServiceContext.Provider value={{ scannedDevices }}>
      {children}
    </BleServiceContext.Provider>
  );
};

export const useBleService = () => {
  const context = useContext(BleServiceContext);
  if (!context) {
    throw new Error('useBleService must be used within a BleServiceContextProvider');
  }
  return context;
};














// // src/services/BleService.tsx
// import { useEffect } from 'react';
// import { BLE } from '@ionic-native/ble/ngx';

// const BleService: React.FC = () => {
//   useEffect(() => {
//     // Initialize the BLE plugin
//     const ble = new BLE();

//     // Function to start scanning for devices
//     const scan = async () => {
//       try {
//         const devices = await ble.scan([], 5); // Scan for 5 seconds, adjust as needed
//         console.log('Scanned devices:', devices);
//       } catch (error) {
//         console.error('Error scanning for devices:', error);
//       }
//     };

//     // Call the scan function
//     scan();
//   }, []); // Empty dependency array means this effect runs once when the component mounts

//   return null; // Adjust this as needed based on your component structure
// };

// export default BleService;
