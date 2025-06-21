export interface WebShareData {
  url?: string;
  title?: string;
  text?: string;
  files?: File[];
}

export const canUseWebShare = (): boolean => {
  return typeof navigator !== 'undefined' &&
         'share' in navigator &&
         typeof navigator.share === 'function';
};

export const canUseWebShareFiles = (): boolean => {
  return typeof navigator !== 'undefined' &&
         'canShare' in navigator &&
         typeof navigator.canShare === 'function';
};

export const shareViaWebAPI = async (data: WebShareData): Promise<boolean> => {
  if (!canUseWebShare()) {
    return false;
  }
  
  try {
    if (data.files && data.files.length > 0) {
      if (canUseWebShareFiles() && navigator.canShare?.({ files: data.files })) {
        const shareDataWithFiles: ShareData = {
          files: data.files,
          title: data.title,
          text: data.text,
          url: data.url
        };
        await navigator.share?.(shareDataWithFiles);
        return true;
      }
      // Fall back to sharing without files
      const { files, ...shareData } = data;
      const shareDataWithoutFiles: ShareData = {
        title: shareData.title,
        text: shareData.text,
        url: shareData.url
      };
      await navigator.share?.(shareDataWithoutFiles);
      return true;
    }

    const shareDataFinal: ShareData = {
      title: data.title,
      text: data.text,
      url: data.url
    };
    await navigator.share?.(shareDataFinal);
    return true;
  } catch (error) {
    if (error instanceof Error && error.name !== 'AbortError') {
      console.error('Error sharing:', error);
    }
    return false;
  }
};




