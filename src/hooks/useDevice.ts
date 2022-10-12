import { useState, useEffect } from 'react';

interface iSize {
  width: number | undefined;
  height: number | undefined;
}

export enum Devices {
  Mobile = 'MOBILE',
  Tablet = 'TABLET',
  Desktop = 'DESKTOP'
}

enum Widths {
  Mobile = 320,
  Tablet = 428,
  Desktop = 1280
}

interface iDeviceResult {
  device: Devices;
  windowSize: {
    width?: number;
    height?: number;
  };
}

export const useDevice = (): iDeviceResult => {
  const [windowSize, setWindowSize] = useState<iSize>({
    width: undefined,
    height: undefined
  });

  const [device, setDevice] = useState<Devices>(Devices.Desktop);

  useEffect(() => {
    // Calculating sizes to select a type of device
    const toSetDevice = windowSize.width
      ? windowSize.width >= Widths.Desktop
        ? Devices.Desktop
        : windowSize.width >= Widths.Tablet
        ? Devices.Tablet
        : Devices.Mobile
      : Devices.Desktop;
    setDevice(toSetDevice);
  }, [windowSize.width]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    device,
    windowSize
  };
};
