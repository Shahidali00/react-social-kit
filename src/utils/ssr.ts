export const isBrowser = typeof window !== 'undefined';

export const getWindowLocation = (): { href: string; origin: string; pathname: string } => {
  if (isBrowser) {
    return {
      href: window.location.href,
      origin: window.location.origin,
      pathname: window.location.pathname
    };
  }
  
  // Default values for SSR
  return {
    href: '',
    origin: '',
    pathname: ''
  };
};

export const getNavigator = (): { userAgent: string; share?: Function } => {
  if (isBrowser) {
    return {
      userAgent: navigator.userAgent,
      share: navigator.share
    };
  }
  
  return {
    userAgent: '',
  };
};