import React from 'react';
import { getReactNativeComponents } from '../utils/platform';

const { Linking, TouchableOpacity, Text, StyleSheet } = getReactNativeComponents();

export interface EmailShareNativeProps {
  url: string;
  subject?: string;
  body?: string;
  children?: React.ReactNode;
  onShareComplete?: (result: { success: boolean; platform: string }) => void;
  style?: any;
  textStyle?: any;
}

export const EmailShareNative: React.FC<EmailShareNativeProps> = ({
  url,
  subject = 'Check out this link',
  body = '',
  children,
  onShareComplete,
  style,
  textStyle
}) => {
  const handleShare = async () => {
    try {
      const emailBody = body ? `${body}\n\n${url}` : url;
      const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
      
      await Linking.openURL(mailtoUrl);
      
      if (onShareComplete) {
        onShareComplete({ success: true, platform: 'email' });
      }
    } catch (error) {
      console.error('Error sharing via Email:', error);
      
      if (onShareComplete) {
        onShareComplete({ success: false, platform: 'email' });
      }
    }
  };
  
  const styles = StyleSheet.create({
    button: {
      backgroundColor: '#D44638',
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
      accessibilityLabel="Share via Email"
    >
      {children || <Text style={[styles.text, textStyle]}>Share via Email</Text>}
    </TouchableOpacity>
  );
};