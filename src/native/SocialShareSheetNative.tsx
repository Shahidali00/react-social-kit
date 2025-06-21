import React from 'react';
import { getReactNativeComponents } from '../utils/platform';
import { ShareSheetNative } from './ShareSheetNative';
import { WhatsAppShareNative } from './WhatsAppShareNative';
import { TelegramShareNative } from './TelegramShareNative';
import { FacebookShareNative } from './FacebookShareNative';
import { TwitterShareNative } from './TwitterShareNative';
import { LinkedInShareNative } from './LinkedInShareNative';
import { PinterestShareNative } from './PinterestShareNative';
import { RedditShareNative } from './RedditShareNative';
import { EmailShareNative } from './EmailShareNative';
import { SlackShareNative } from './SlackShareNative';
import { TumblrShareNative } from './TumblrShareNative';
import { CopyLinkNative } from './CopyLinkNative';

const { View, StyleSheet } = getReactNativeComponents();

export interface SocialShareSheetNativeProps {
  url: string;
  title?: string;
  message?: string;
  media?: string;
  hashtags?: string[];
  via?: string;
  summary?: string;
  source?: string;
  platforms?: string[];
  onShareComplete?: (result: { success: boolean; platform?: string }) => void;
  style?: any;
  buttonStyle?: any;
  textStyle?: any;
}

export const SocialShareSheetNative: React.FC<SocialShareSheetNativeProps> = ({
  url,
  title = '',
  message = '',
  media = '',
  hashtags = [],
  via = '',
  summary = '',
  source = '',
  platforms = ['native', 'facebook', 'twitter', 'linkedin', 'whatsapp', 'telegram', 'reddit', 'pinterest', 'email', 'slack', 'tumblr', 'copy'],
  onShareComplete,
  style,
  buttonStyle,
  textStyle
}) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 10,
      padding: 10
    },
    button: {
      marginHorizontal: 5,
      marginVertical: 5
    }
  });

  return (
    <View style={[styles.container, style]}>
      {platforms.includes('native') && (
        <ShareSheetNative
          url={url}
          title={title}
          message={message}
          onShareComplete={onShareComplete}
          style={[styles.button, buttonStyle]}
          textStyle={textStyle}
        />
      )}
      
      {platforms.includes('facebook') && (
        <FacebookShareNative
          url={url}
          onShareComplete={onShareComplete}
          style={[styles.button, buttonStyle]}
          textStyle={textStyle}
        />
      )}
      
      {platforms.includes('twitter') && (
        <TwitterShareNative
          url={url}
          message={title}
          hashtags={hashtags}
          via={via}
          onShareComplete={onShareComplete}
          style={[styles.button, buttonStyle]}
          textStyle={textStyle}
        />
      )}
      
      {platforms.includes('linkedin') && (
        <LinkedInShareNative
          url={url}
          title={title}
          summary={summary}
          source={source}
          onShareComplete={onShareComplete}
          style={[styles.button, buttonStyle]}
          textStyle={textStyle}
        />
      )}
      
      {platforms.includes('whatsapp') && (
        <WhatsAppShareNative
          url={url}
          message={message || title}
          onShareComplete={onShareComplete}
          style={[styles.button, buttonStyle]}
          textStyle={textStyle}
        />
      )}
      
      {platforms.includes('telegram') && (
        <TelegramShareNative
          url={url}
          message={message || title}
          onShareComplete={onShareComplete}
          style={[styles.button, buttonStyle]}
          textStyle={textStyle}
        />
      )}
      
      {platforms.includes('reddit') && (
        <RedditShareNative
          url={url}
          title={title}
          onShareComplete={onShareComplete}
          style={[styles.button, buttonStyle]}
          textStyle={textStyle}
        />
      )}
      
      {platforms.includes('pinterest') && media && (
        <PinterestShareNative
          url={url}
          media={media}
          description={message || title}
          onShareComplete={onShareComplete}
          style={[styles.button, buttonStyle]}
          textStyle={textStyle}
        />
      )}
      
      {platforms.includes('email') && (
        <EmailShareNative
          url={url}
          subject={title}
          body={message}
          onShareComplete={onShareComplete}
          style={[styles.button, buttonStyle]}
          textStyle={textStyle}
        />
      )}
      
      {platforms.includes('slack') && (
        <SlackShareNative
          url={url}
          title={title}
          onShareComplete={onShareComplete}
          style={[styles.button, buttonStyle]}
          textStyle={textStyle}
        />
      )}
      
      {platforms.includes('tumblr') && (
        <TumblrShareNative
          url={url}
          title={title}
          caption={message}
          tags={hashtags}
          onShareComplete={onShareComplete}
          style={[styles.button, buttonStyle]}
          textStyle={textStyle}
        />
      )}
      
      {platforms.includes('copy') && (
        <CopyLinkNative
          url={url}
          onShareComplete={onShareComplete}
          style={[styles.button, buttonStyle]}
          textStyle={textStyle}
        />
      )}
    </View>
  );
};





