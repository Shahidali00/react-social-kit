export const canUseWebShare = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  return !!navigator.share;
};

export const canUseWebShareFiles = (): boolean => {
  return typeof navigator !== 'undefined' &&
         'canShare' in navigator &&
         typeof navigator.canShare === 'function';
};

export const shareViaWebAPI = async (data: {
  url?: string;
  title?: string;
  text?: string;
  files?: File[];
}): Promise<boolean> => {
  if (!canUseWebShare()) return false;
  
  try {
    if (typeof navigator !== 'undefined' && navigator.share) {
      await navigator.share(data);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error sharing via Web API:', error);
    return false;
  }
};





