import React from 'react';
import { getReactNativeComponents } from '../utils/platform';

const { Linking, TouchableOpacity, Text, StyleSheet } = getReactNativeComponents();

export interface LinkedInShareNativeProps {
  url: string;
  title?: string;
  summary?: string;
  source?: string;
  children?: React.ReactNode;
  onShareComplete?: (result: { success: boolean; platform: string }) => void;
  style?: any;
  textStyle?: any;
}

export const LinkedInShareNative: React.FC<LinkedInShareNativeProps> = ({
  url,
  title = '',
  summary = '',
  source = '',
  children,
  onShareComplete,
  style,
  textStyle
}) => {
  const handleShare = async () => {
    try {
      // LinkedIn doesn't have a reliable deep link for sharing
      // Use web URL directly
      const linkedInUrl = new URL('https://www.linkedin.com/sharing/share-offsite/');
      linkedInUrl.searchParams.append('url', url);
      if (title) linkedInUrl.searchParams.append('title', title);
      if (summary) linkedInUrl.searchParams.append('summary', summary);
      if (source) linkedInUrl.searchParams.append('source', source);
      
      await Linking.openURL(linkedInUrl.toString());
      
      if (onShareComplete) {
        onShareComplete({ success: true, platform: 'linkedin' });
      }
    } catch (error) {
      console.error('Error sharing to LinkedIn:', error);
      
      if (onShareComplete) {
        onShareComplete({ success: false, platform: 'linkedin' });
      }
    }
  };
  
  const styles = StyleSheet.create({
    button: {
      backgroundColor: '#0077B5',
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
      accessibilityLabel="Share on LinkedIn"
    >
      {children || <Text style={[styles.text, textStyle]}>Share on LinkedIn</Text>}
    </TouchableOpacity>
  );
};