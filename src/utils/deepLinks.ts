export interface DeepLinkOptions {
  url: string;
  title?: string;
  message?: string;
  media?: string;
  hashtags?: string[];
  via?: string;
  appId?: string;
}

// Define a type for the deep link generators
export type DeepLinkGenerator = (options: DeepLinkOptions) => string;

// Use Record to properly type the object with string keys
export const deepLinks: Record<string, DeepLinkGenerator> = {
  facebook: (options: DeepLinkOptions): string => {
    // Mobile app deep link
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      return `fb://share?link=${encodeURIComponent(options.url)}`;
    }
    // Web fallback
    return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(options.url)}`;
  },
  
  twitter: (options: DeepLinkOptions): string => {
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      return `twitter://post?message=${encodeURIComponent(options.title || '')} ${encodeURIComponent(options.url)}`;
    }
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(options.title || '')}&url=${encodeURIComponent(options.url)}`;
  },
  
  // Add other platforms...
};

export const openDeepLink = (platform: string, options: DeepLinkOptions): void => {
  const linkGenerator = deepLinks[platform.toLowerCase()];
  if (!linkGenerator) return;
  
  const deepLink = linkGenerator(options);
  
  // Try to open the app
  const now = Date.now();
  const timeoutDuration = 1000;
  
  // Create an iframe to try opening the app
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  iframe.src = deepLink;
  document.body.appendChild(iframe);
  
  // If we're still here after a timeout, the app didn't open
  setTimeout(() => {
    if (Date.now() - now > timeoutDuration + 100) {
      // App opened successfully
      return;
    }
    
    // App failed to open, use web fallback
    window.location.href = `https://www.${platform}.com`;
    
    // Clean up
    document.body.removeChild(iframe);
  }, timeoutDuration);
};

