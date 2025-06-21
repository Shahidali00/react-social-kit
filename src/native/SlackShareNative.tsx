import React from 'react';
import { getReactNativeComponents } from '../utils/platform';

const { Linking, TouchableOpacity, Text, StyleSheet } = getReactNativeComponents();

export interface SlackShareNativeProps {
  url: string;
  title?: string;
  children?: React.ReactNode;
  onShareComplete?: (result: { success: boolean; platform: string }) => void;
  style?: any;
  textStyle?: any;
}

export const SlackShareNative: React.FC<SlackShareNativeProps> = ({
  url,
  title = '',
  children,
  onShareComplete,
  style,
  textStyle
}) => {
  const handleShare = async () => {
    try {
      // Slack doesn't have a reliable deep link for sharing
      // Use web URL directly
      const slackUrl = `https://slack.com/app_redirect?app=A0F7YS25R&url=${encodeURIComponent(url)}`;
      
      await Linking.openURL(slackUrl);
      
      if (onShareComplete) {
        onShareComplete({ success: true, platform: 'slack' });
      }
    } catch (error) {
      console.error('Error sharing to Slack:', error);
      
      if (onShareComplete) {
        onShareComplete({ success: false, platform: 'slack' });
      }
    }
  };
  
  const styles = StyleSheet.create({
    button: {
      backgroundColor: '#4A154B',
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
      accessibilityLabel="Share on Slack"
    >
      {children || <Text style={[styles.text, textStyle]}>Share on Slack</Text>}
    </TouchableOpacity>
  );
};