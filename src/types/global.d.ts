// Global type declarations for window objects
interface Window {
  gtag?: (command: string, action: string, params: any) => void;
  dataLayer?: any[];
  analytics?: {
    track: (event: string, properties?: any) => void;
  };
}

// Global type declarations for navigator
interface Navigator {
  share?: (data: {
    url?: string;
    text?: string;
    title?: string;
    files?: File[];
  }) => Promise<void>;
  canShare?: (data: { files: File[] }) => boolean;
}

// Global object for React Native environment detection
interface Global {
  ReactNative?: any;
  HermesInternal?: any;
}

declare var global: Global;



