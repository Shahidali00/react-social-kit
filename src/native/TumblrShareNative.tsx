import React from 'react';
import { getReactNativeComponents } from '../utils/platform';

const { Linking, TouchableOpacity, Text, StyleSheet } = getReactNativeComponents();

export interface TumblrShareNativeProps {
  url: string;
  title?: string;
  caption?: string;
  tags?: string[];
  children?: React.ReactNode;
  onShareComplete?: (result: { success: boolean; platform: string }) => void;
  style?: any;
  textStyle?: any;
}

export const TumblrShareNative: React.FC<TumblrShareNativeProps> = ({
  url,
  title = '',
  caption = '',
  tags = [],
  children,
  onShareComplete,
  style,
  textStyle
}) => {
  const handleShare = async () => {
    try {
      // Try deep linking first
      const tumblrAppUrl = `tumblr://x-callback-url/link?url=${encodeURIComponent(url)}`;
      
      const canOpenTumblr = await Linking.canOpenURL(tumblrAppUrl);
      
      if (canOpenTumblr) {
        await Linking.openURL(tumblrAppUrl);
        if (onShareComplete) {
          onShareComplete({ success: true, platform: 'tumblr' });
        }
        return;
      }
      
      // Fallback to web version
      const webTumblrUrl = new URL('https://www.tumblr.com/widgets/share/tool');
      webTumblrUrl.searchParams.append('canonicalUrl', url);
      if (title) webTumblrUrl.searchParams.append('title', title);
      if (caption) webTumblrUrl.searchParams.append('caption', caption);
      if (tags.length > 0) webTumblrUrl.searchParams.append('tags', tags.join(','));
      
      await Linking.openURL(webTumblrUrl.toString());
      
      if (onShareComplete) {
        onShareComplete({ success: true, platform: 'tumblr-web' });
      }
    } catch (error) {
      console.error('Error sharing to Tumblr:', error);
      
      if (onShareComplete) {
        onShareComplete({ success: false, platform: 'tumblr' });
      }
    }
  };
  
  const styles = StyleSheet.create({
    button: {
      backgroundColor: '#36465D',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center'
    },
    text: {
      color: '#FFFFFF',
      fontWeight: 'bold'
    }
  });
  
  return (
    <TouchableOpacity 
      onPress={handleShare}
      style={[styles.button, style]}
      accessibilityRole="button"
      accessibilityLabel="Share on Tumblr"
    >
      {children || <Text style={[styles.text, textStyle]}>Share on Tumblr</Text>}
    </TouchableOpacity>
  );
};