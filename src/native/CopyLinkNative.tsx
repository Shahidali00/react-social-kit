import React, { useState, useEffect } from 'react';
import { getReactNativeComponents } from '../utils/platform';

const { TouchableOpacity, Text, StyleSheet, Clipboard } = getReactNativeComponents();

export interface CopyLinkNativeProps {
  url: string;
  children?: React.ReactNode;
  onShareComplete?: (result: { success: boolean; platform: string }) => void;
  style?: any;
  textStyle?: any;
  copiedText?: string;
  copiedDuration?: number;
}

export const CopyLinkNative: React.FC<CopyLinkNativeProps> = ({
  url,
  children,
  onShareComplete,
  style,
  textStyle,
  copiedText = 'Copied!',
  copiedDuration = 2000
}) => {
  const [copied, setCopied] = useState(false);
  
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, copiedDuration);
      
      return () => clearTimeout(timer);
    }
  }, [copied, copiedDuration]);
  
  const handleCopy = async () => {
    try {
      // For React Native, we need to use the Clipboard API
      if (Clipboard && typeof Clipboard.setString === 'function') {
        await Clipboard.setString(url);
        setCopied(true);
        
        if (onShareComplete) {
          onShareComplete({ success: true, platform: 'copy' });
        }
      } else {
        // Fallback for browser environment
        if (typeof navigator !== 'undefined' && navigator.clipboard) {
          await navigator.clipboard.writeText(url);
          setCopied(true);
          
          if (onShareComplete) {
            onShareComplete({ success: true, platform: 'copy' });
          }
        } else {
          throw new Error('Clipboard API not available');
        }
      }
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      
      if (onShareComplete) {
        onShareComplete({ success: false, platform: 'copy' });
      }
    }
  };
  
  const styles = StyleSheet.create({
    button: {
      backgroundColor: '#6c757d',
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
      onPress={handleCopy}
      style={[styles.button, style]}
      accessibilityRole="button"
      accessibilityLabel="Copy link to clipboard"
    >
      {children || (
        <Text style={[styles.text, textStyle]}>
          {copied ? copiedText : 'Copy Link'}
        </Text>
      )}
    </TouchableOpacity>
  );
};

