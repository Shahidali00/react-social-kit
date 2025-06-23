// Remove the duplicate declaration at the top of this file
// and use the one from global.d.ts

/**
 * Safely checks if a property exists on the global/window object
 */
export const hasGlobalProperty = (propertyName: string): boolean => {
  try {
    if (typeof window !== 'undefined') {
      return propertyName in window;
    }
    
    // For Node.js or React Native environments
    if (typeof globalThis !== 'undefined') {
      return propertyName in globalThis;
    }
    
    return false;
  } catch (e) {
    return false;
  }
};

/**
 * Checks if the code is running in a browser environment
 */
export const isBrowser = (): boolean => {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
};

/**
 * Checks if the code is running in a Node.js environment
 */
export const isNode = (): boolean => {
  try {
    // @ts-ignore - Ignoring process error as this is a runtime check
    return typeof process !== 'undefined' && 
           process.versions != null && 
           process.versions.node != null;
  } catch (e) {
    return false;
  }
};

/**
 * Checks if the code is running in a React Native environment
 */
export const isReactNative = (): boolean => {
  try {
    // Check for React Native specific globals
    if (hasGlobalProperty('ReactNative')) {
      return true;
    }
    
    // Check for navigator.product
    if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
      return true;
    }
    
    // Check for Hermes (React Native JavaScript engine)
    if (hasGlobalProperty('HermesInternal')) {
      return true;
    }
    
    return false;
  } catch (e) {
    return false;
  }
};

/**
 * Gets the current platform (web, ios, android, node)
 */
export const getPlatform = (): string => {
  if (isReactNative()) {
    try {
      // Try to get the platform from React Native
      // Use dynamic import pattern instead of require
      const platformModule = isReactNative() ? 
        // @ts-ignore - Ignoring require error as this is a runtime check
        (typeof require !== 'undefined' ? require('react-native').Platform : null) : 
        null;
      return platformModule?.OS || 'unknown-native';
    } catch (e) {
      return 'unknown-native';
    }
  }
  
  if (isBrowser()) {
    return 'web';
  }
  
  if (isNode()) {
    return 'node';
  }
  
  return 'unknown';
};



