import React from 'react';
import { getReactNativeComponents } from '../utils/platform';

const { Linking, TouchableOpacity, Text, StyleSheet } = getReactNativeComponents();

export interface TwitterShareNativeProps {
  url: string;
  message?: string;
  hashtags?: string[];
  via?: string;
  children?: React.ReactNode;
  onShareComplete?: (result: { success: boolean; platform: string }) => void;
  style?: any;
  textStyle?: any;
}

export const TwitterShareNative: React.FC<TwitterShareNativeProps> = ({
  url,
  message = '',
  hashtags = [],
  via = '',
  children,
  onShareComplete,
  style,
  textStyle
}) => {
  const handleShare = async () => {
    try {
      // Build the Twitter share URL
      const twitterUrl = new URL('https://twitter.com/intent/tweet');
      
      // Add the text parameter (message + URL)
      twitterUrl.searchParams.append('text', message);
      
      // Add the URL parameter
      twitterUrl.searchParams.append('url', url);
      
      // Add hashtags if provided
      if (hashtags.length > 0) {
        twitterUrl.searchParams.append('hashtags', hashtags.join(','));
      }
      
      // Add via if provided
      if (via) {
        twitterUrl.searchParams.append('via', via);
      }
      
      // Try deep linking first
      const twitterAppUrl = `twitter://post?message=${encodeURIComponent(`${message} ${url}`)}`;
      
      const canOpenTwitter = await Linking.canOpenURL(twitterAppUrl);
      
      if (canOpenTwitter) {
        await Linking.openURL(twitterAppUrl);
        if (onShareComplete) {
          onShareComplete({ success: true, platform: 'twitter' });
        }
        return;
      }
      
      // Fallback to web version
      await Linking.openURL(twitterUrl.toString());
      
      if (onShareComplete) {
        onShareComplete({ success: true, platform: 'twitter-web' });
      }
    } catch (error) {
      console.error('Error sharing to Twitter:', error);
      
      if (onShareComplete) {
        onShareComplete({ success: false, platform: 'twitter' });
      }
    }
  };
  
  const styles = StyleSheet.create({
    button: {
      backgroundColor: '#1DA1F2',
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
      accessibilityLabel="Share on Twitter"
    >
      {children || <Text style={[styles.text, textStyle]}>Share on Twitter</Text>}
    </TouchableOpacity>
  );
};