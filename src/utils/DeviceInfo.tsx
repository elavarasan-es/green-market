
interface DeviceInfoType {
  isTablet: boolean;
  isDesktop: boolean;
  deviceType: string;
}

const getDeviceInfo = (): DeviceInfoType => {
  const width = window.innerWidth;

  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  const deviceType = isTablet
    ? 'Tablet'
    : isDesktop
    ? 'Desktop'
    : 'Mobile Phone';

  return {
    isTablet,
    isDesktop,
    deviceType,
  };
};

export default getDeviceInfo;
