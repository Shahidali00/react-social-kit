import React from 'react';
import { getReactNativeComponents } from '../utils/platform';

const { Linking, Platform, TouchableOpacity, Text, StyleSheet } = getReactNativeComponents();

export interface WhatsAppShareNativeProps {
  url: string;
  title?: string;  // Main message (matching web component)
  text?: string;   // Additional text (matching web component)
  children?: React.ReactNode;
  onShareComplete?: (result: { success: boolean; platform: string }) => void;
  style?: any;
  textStyle?: any;
}

export const WhatsAppShareNative: React.FC<WhatsAppShareNativeProps> = ({
  url,
  title,
  text,
  children,
  onShareComplete,
  style,
  textStyle
}) => {
  const handleShare = async () => {
    try {
      // Combine title and text for the message
      const message = title || text || '';
      const whatsappMessage = message ? `${message} ${url}` : url;
      const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(whatsappMessage)}`;
      
      const canOpen = await Linking.canOpenURL(whatsappUrl);
      
      if (!canOpen) {
        throw new Error('WhatsApp is not installed');
      }
      
      await Linking.openURL(whatsappUrl);
      
      if (onShareComplete) {
        onShareComplete({ success: true, platform: 'whatsapp' });
      }
    } catch (error) {
      console.error('Error sharing to WhatsApp:', error);
      
      // Fallback to web version on error
      try {
        const webWhatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(title ? `${title} ${url}` : url)}`;
        await Linking.openURL(webWhatsappUrl);
        
        if (onShareComplete) {
          onShareComplete({ success: true, platform: 'whatsapp-web' });
        }
      } catch (webError) {
        console.error('Error opening web WhatsApp:', webError);
        
        if (onShareComplete) {
          onShareComplete({ success: false, platform: 'whatsapp' });
        }
      }
    }
  };
  
  const styles = StyleSheet.create({
    button: {
      backgroundColor: '#25D366',
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
      accessibilityLabel="Share on WhatsApp"
    >
      {children || <Text style={[styles.text, textStyle]}>WhatsApp</Text>}
    </TouchableOpacity>
  );
};

