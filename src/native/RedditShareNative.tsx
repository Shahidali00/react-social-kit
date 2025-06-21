import React from 'react';
import { getReactNativeComponents } from '../utils/platform';

const { Linking, TouchableOpacity, Text, StyleSheet } = getReactNativeComponents();

export interface RedditShareNativeProps {
  url: string;
  title?: string;
  children?: React.ReactNode;
  onShareComplete?: (result: { success: boolean; platform: string }) => void;
  style?: any;
  textStyle?: any;
}

export const RedditShareNative: React.FC<RedditShareNativeProps> = ({
  url,
  title = '',
  children,
  onShareComplete,
  style,
  textStyle
}) => {
  const handleShare = async () => {
    try {
      // Try deep linking first
      const redditAppUrl = `reddit://submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
      
      const canOpenReddit = await Linking.canOpenURL(redditAppUrl);
      
      if (canOpenReddit) {
        await Linking.openURL(redditAppUrl);
        if (onShareComplete) {
          onShareComplete({ success: true, platform: 'reddit' });
        }
        return;
      }
      
      // Fallback to web version
      const webRedditUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
      await Linking.openURL(webRedditUrl);
      
      if (onShareComplete) {
        onShareComplete({ success: true, platform: 'reddit-web' });
      }
    } catch (error) {
      console.error('Error sharing to Reddit:', error);
      
      if (onShareComplete) {
        onShareComplete({ success: false, platform: 'reddit' });
      }
    }
  };
  
  const styles = StyleSheet.create({
    button: {
      backgroundColor: '#FF4500',
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
      accessibilityLabel="Share on Reddit"
    >
      {children || <Text style={[styles.text, textStyle]}>Share on Reddit</Text>}
    </TouchableOpacity>
  );
};