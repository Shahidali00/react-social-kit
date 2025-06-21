import React from 'react';
import { getReactNativeComponents } from '../utils/platform';

const { Linking, TouchableOpacity, Text, StyleSheet } = getReactNativeComponents();

export interface TelegramShareNativeProps {
  url: string;
  message?: string;
  children?: React.ReactNode;
  onShareComplete?: (result: { success: boolean; platform: string }) => void;
  style?: any;
  textStyle?: any;
}

export const TelegramShareNative: React.FC<TelegramShareNativeProps> = ({
  url,
  message = '',
  children,
  onShareComplete,
  style,
  textStyle
}) => {
  const handleShare = async () => {
    try {
      const telegramText = message ? `${message} ${url}` : url;
      
      // Try deep linking first
      const telegramUrl = `tg://msg?text=${encodeURIComponent(telegramText)}`;
      
      const canOpenTelegram = await Linking.canOpenURL(telegramUrl);
      
      if (canOpenTelegram) {
        await Linking.openURL(telegramUrl);
        if (onShareComplete) {
          onShareComplete({ success: true, platform: 'telegram' });
        }
        return;
      }
      
      // Fallback to web version
      const webTelegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(message || '')}`;
      await Linking.openURL(webTelegramUrl);
      
      if (onShareComplete) {
        onShareComplete({ success: true, platform: 'telegram-web' });
      }
    } catch (error) {
      console.error('Error sharing to Telegram:', error);
      
      if (onShareComplete) {
        onShareComplete({ success: false, platform: 'telegram' });
      }
    }
  };
  
  const styles = StyleSheet.create({
    button: {
      backgroundColor: '#0088cc',
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
      accessibilityLabel="Share on Telegram"
    >
      {children || <Text style={[styles.text, textStyle]}>Share on Telegram</Text>}
    </TouchableOpacity>
  );
};
