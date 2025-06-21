import React from 'react';
import { getReactNativeComponents } from '../utils/platform';

const { Share, Platform, TouchableOpacity, Text, StyleSheet } = getReactNativeComponents();

export interface ShareSheetNativeProps {
  url: string;
  title?: string;
  message?: string;
  subject?: string;
  children?: React.ReactNode;
  onShareComplete?: (result: { success: boolean; platform?: string }) => void;
  style?: any;
  textStyle?: any;
}

export const ShareSheetNative: React.FC<ShareSheetNativeProps> = ({
  url,
  title,
  message,
  subject,
  children,
  onShareComplete,
  style,
  textStyle
}) => {
  const handleShare = async () => {
    try {
      const result = await Share.share(
        {
          url: Platform.OS === 'ios' ? url : undefined,
          title: title,
          message: Platform.OS === 'ios' ? message : `${message || title || ''} ${url}`,
          subject: subject
        },
        {
          dialogTitle: title,
          subject: subject
        }
      );
      
      if (result.action === Share.sharedAction) {
        if (onShareComplete) {
          onShareComplete({ 
            success: true, 
            platform: result.activityType || 'unknown'
          });
        }
      } else if (result.action === Share.dismissedAction) {
        if (onShareComplete) {
          onShareComplete({ success: false });
        }
      }
    } catch (error) {
      console.error(error);
      if (onShareComplete) {
        onShareComplete({ success: false });
      }
    }
  };
  
  const styles = StyleSheet.create({
    button: {
      backgroundColor: '#007AFF',
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
      accessibilityLabel="Share content"
    >
      {children || <Text style={[styles.text, textStyle]}>Share</Text>}
    </TouchableOpacity>
  );
};



