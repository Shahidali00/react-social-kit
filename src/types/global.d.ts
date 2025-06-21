interface Window {
  gtag?: (...args: any[]) => void;
  dataLayer?: any[];
  analytics?: {
    track: (event: string, properties?: any) => void;
  };
}

interface Navigator {
  share?: (data: {
    url?: string;
    text?: string;
    title?: string;
    files?: File[];
  }) => Promise<void>;
  canShare?: (data: { files: File[] }) => boolean;
}

// Add global object declaration for React Native environment detection
interface Global {
  ReactNative?: any;
  HermesInternal?: any;
}

declare var global: Global;
