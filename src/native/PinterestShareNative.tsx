import React from 'react';
import { getReactNativeComponents } from '../utils/platform';

const { Linking, TouchableOpacity, Text, StyleSheet } = getReactNativeComponents();

export interface PinterestShareNativeProps {
  url: string;
  media: string;
  description?: string;
  children?: React.ReactNode;
  onShareComplete?: (result: { success: boolean; platform: string }) => void;
  style?: any;
  textStyle?: any;
}

export const PinterestShareNative: React.FC<PinterestShareNativeProps> = ({
  url,
  media,
  description = '',
  children,
  onShareComplete,
  style,
  textStyle
}) => {
  const handleShare = async () => {
    try {
      // Pinterest doesn't have a reliable deep link for sharing
      // Use web URL directly
      const pinterestUrl = new URL('https://pinterest.com/pin/create/button/');
      pinterestUrl.searchParams.append('url', url);
      pinterestUrl.searchParams.append('media', media);
      if (description) pinterestUrl.searchParams.append('description', description);
      
      await Linking.openURL(pinterestUrl.toString());
      
      if (onShareComplete) {
        onShareComplete({ success: true, platform: 'pinterest' });
      }
    } catch (error) {
      console.error('Error sharing to Pinterest:', error);
      
      if (onShareComplete) {
        onShareComplete({ success: false, platform: 'pinterest' });
      }
    }
  };
  
  const styles = StyleSheet.create({
    button: {
      backgroundColor: '#E60023',
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
      accessibilityLabel="Share on Pinterest"
    >
      {children || <Text style={[styles.text, textStyle]}>Share on Pinterest</Text>}
    </TouchableOpacity>
  );
};