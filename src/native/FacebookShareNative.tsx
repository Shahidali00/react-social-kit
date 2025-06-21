import React from 'react';
import { getReactNativeComponents } from '../utils/platform';

const { Linking, TouchableOpacity, Text, StyleSheet } = getReactNativeComponents();

export interface FacebookShareNativeProps {
  url: string;
  children?: React.ReactNode;
  onShareComplete?: (result: { success: boolean; platform: string }) => void;
  style?: any;
  textStyle?: any;
}

export const FacebookShareNative: React.FC<FacebookShareNativeProps> = ({
  url,
  children,
  onShareComplete,
  style,
  textStyle
}) => {
  const handleShare = async () => {
    try {
      // Try deep linking first
      const fbUrl = `fb://share?link=${encodeURIComponent(url)}`;
      
      const canOpenFb = await Linking.canOpenURL(fbUrl);
      
      if (canOpenFb) {
        await Linking.openURL(fbUrl);
        if (onShareComplete) {
          onShareComplete({ success: true, platform: 'facebook' });
        }
        return;
      }
      
      // Fallback to web version
      const webFbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
      await Linking.openURL(webFbUrl);
      
      if (onShareComplete) {
        onShareComplete({ success: true, platform: 'facebook-web' });
      }
    } catch (error) {
      console.error('Error sharing to Facebook:', error);
      
      if (onShareComplete) {
        onShareComplete({ success: false, platform: 'facebook' });
      }
    }
  };
  
  const styles = StyleSheet.create({
    button: {
      backgroundColor: '#1877f2',
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
      accessibilityLabel="Share on Facebook"
    >
      {children || <Text style={[styles.text, textStyle]}>Share on Facebook</Text>}
    </TouchableOpacity>
  );
};