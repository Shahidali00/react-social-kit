# React Social Kit

[![npm version](https://img.shields.io/npm/v/react-social-kit.svg)](https://www.npmjs.com/package/react-social-kit)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)](https://www.typescriptlang.org/)

A comprehensive and customizable social sharing library for React applications. Works seamlessly with both JavaScript (JSX) and TypeScript (TSX) projects, and supports both web and React Native platforms.

![Social Icons](https://github.com/Shahidali00/react-social-kit/blob/main/src/assets/social-Icons.png)

### Platform Support:
- Facebook
- X (Twitter)
- Telegram
- WhatsApp
- LinkedIn
- Pinterest
- Reddit
- Tumblr
- Email
- Slack


## Table of Contents

- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [Key Features](#-key-features)
- [Components](#-components)
  - [Share Component](#share-component)
  - [Share Sheet](#share-sheet)
  - [Supported Platforms](#supported-platforms)
- [Customization](#-customization)
  - [Button Variants](#button-variants)
  - [Button Sizes](#button-sizes)
  - [Button Shapes](#button-shapes)
  - [Custom Theme](#custom-theme)
- [React Native Support](#-react-native-support)
- [Analytics Integration](#-analytics-integration)
- [Web Share API](#-web-share-api)
- [Next.js App Router Support](#nextjs-app-router-support)
- [Advanced Usage](#-advanced-usage)
  - [Programmatic Sharing](#programmatic-sharing)
- [License](#-license)

## 🚀 Installation

```bash
# npm
npm install react-social-kit

# yarn
yarn add react-social-kit

# pnpm
pnpm add react-social-kit
```

## ⚡ Quick Start


```jsx
import React from 'react';
import { 
  ShareProvider, 
  Share 
} from 'react-social-kit';

function App() {
  return (
    <ShareProvider>
      <div style={{ display: 'flex', gap: '10px' }}>
        {/* Individual share buttons */}
        <Share platform="whatsapp" iconSize={36} title="Check this out!" url="https://example.com" showCount={true}/>
        <Share platform="x" iconSize={36} title="Check this out!" url="https://example.com" showCount={true}/>
        <Share platform="linkedin"  iconSize={36} title="Check this out!" url="https://example.com" showCount={true}/>
      </div>
    </ShareProvider>
  );
}

export default App;
```

## ✨ Key Features

- **Easy to Use**: Simple API with sensible defaults
- **TypeScript Support**: Full TypeScript definitions included
- **Cross-Platform**: Works with both React and React Native
- **Customizable**: Multiple themes, variants, and sizes
- **Web Share API**: Uses native sharing when available
- **Analytics Ready**: Track sharing events easily
- **Accessible**: WCAG compliant components
- **Lightweight**: Small bundle size with tree-shaking
- **Next.js Compatible**: Works with both Pages Router and App Router

## 📱 Components

### Share Component

The main component for all sharing functionality:

```jsx
// Basic usage - icon only (default)
<Share platform="facebook" url="https://example.com" />

// With custom icon size
<Share platform="facebook" url="https://example.com" iconSize={36} />

// With Just Icons
<Share 
  platform="x" 
  url="https://example.com" 
  title="Check this out!" 
  hashtags={['react', 'javascript']} 
  iconSize={32}
/>

// With text displayed
<Share 
  platform="x" 
  url="https://example.com" 
  title="Check this out!" 
  hashtags={['react', 'javascript']} 
  showText={true}
/>
```

The `title` prop is used to provide the main share message.


<!-- You can set a default description for all share components using the `ShareProvider`:

```jsx
<ShareProvider defaultDescription="Check out this amazing content!">
  {/* All Share components will use this description unless overridden */}
  <Share platform="x" url="https://example.com" />
</ShareProvider>
``` -->

### Share Sheet

Display multiple share options in a grid:

```jsx
// Icon-only (default)
<SocialShareSheet 
  url="https://example.com"
  title="Check out this site"
  platforms={['facebook', 'x', 'linkedin', 'whatsapp', 'slack']}
  iconSize={36}
/>

// With text
<SocialShareSheet 
  url="https://example.com"
  title="Check out this site"
  platforms={['facebook', 'x', 'linkedin', 'whatsapp', 'slack']}
  showText={true}
/>
```

The `title` prop in `SocialShareSheet` is passed to all individual share buttons, ensuring consistent messaging across all platforms.


## 🎨 Customization

### Button Variants

```jsx
// Available variants: 'solid', 'outline', 'text'
<Share platform="facebook" variant="solid" />
<Share platform="x" variant="outline" />
<Share platform="linkedin" variant="text" />
```

### Button Sizes

```jsx
// Available sizes: 'small', 'medium', 'large'
<Share platform="facebook" size="small" />
<Share platform="x" size="medium" />
<Share platform="linkedin" size="large" />
```

### Button Shapes

```jsx
// Available shapes: 'square', 'rounded', 'pill'
<Share platform="facebook" shape="square" />
<Share platform="x" shape="rounded" />
<Share platform="linkedin" shape="pill" />
```

### Custom Theme

```jsx
import { ShareProvider, createTheme, SocialShareSheet } from 'react-social-kit';

const customTheme = createTheme({
  platforms: {
    facebook: {
      name: 'Facebook',
      color: '#4267B2' // Custom color
    },
    x: {
      name: 'X',
      color: '#000000'
    }
  },
  button: {
    borderRadius: '8px',
    fontFamily: 'Poppins, sans-serif',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s ease-in-out'
  }
});

function App() {
  return (
    <ShareProvider theme={customTheme}>
      {/* Your components here */}
    </ShareProvider>
  );
}
```

## 📱 React Native Support

React Social Kit provides native components for React Native applications:

```jsx
import { 
  ShareProvider, 
  FacebookShareNative, 
  TwitterShareNative,
  SocialShareSheetNative 
} from 'react-social-kit';

function App() {
  return (
    <ShareProvider>
      <FacebookShareNative url="https://example.com" />
      <TwitterShareNative url="https://example.com" title="Check this out!" />
      
      {/* Or use the share sheet */}
      <SocialShareSheetNative 
        url="https://example.com"
        title="Amazing content"
        platforms={['facebook', 'x', 'whatsapp']}
      />
    </ShareProvider>
  );
}
```

## 📊 Analytics Integration

Track when users share content with built-in analytics support:

```jsx
import { ShareProvider } from 'react-social-kit';

function App() {
  // Track when users share content
  const handleShareComplete = (result) => {
    console.log(`Share ${result.success ? 'succeeded' : 'failed'} on ${result.platform}`);
    // Your custom tracking logic
    analytics.track('Content Shared', {
      platform: result.platform,
      success: result.success,
      url: 'https://example.com'
    });
  };

  return (
    <ShareProvider 
      onShareComplete={handleShareComplete}
      // Optional: configure analytics provider
      analytics={{
        provider: 'ga', // 'ga', 'gtm', 'segment', 'custom'
        trackingId: 'UA-XXXXXXXX-X', // Your tracking ID
        // Optional custom tracker function
        customTracker: (eventName, data) => {
          console.log('Custom tracking:', eventName, data);
        }
      }}
    >
      {/* Your components here */}
    </ShareProvider>
  );
}
```

## 🌐 Web Share API

React Social Kit automatically uses the Web Share API when available:

```jsx
import { Share, canUseWebShare } from 'react-social-kit';

function ShareComponent() {
  return (
    <div>
      {canUseWebShare() ? (
        <Share 
          platform="native"
          url="https://example.com"
          title="Check this out"
          text="Amazing content for developers"
        />
      ) : (
        <SocialShareSheet 
          url="https://example.com"
          title="Check this out"
        />
      )}
    </div>
  );
}
```

## Next.js App Router Support

This library provides two ways to use it with Next.js App Router:

### Option 1: Import from nextjs subpath (recommended)

```jsx
// This import already includes the 'use client' directive
import { ShareProvider, Share } from 'react-social-kit/nextjs';

export default function Page() {
  return (
    <ShareProvider>
      <Share platform="x" url="https://example.com" />
    </ShareProvider>
  );
}
```

### Option 2: Add 'use client' directive manually

```jsx
'use client';

import { ShareProvider, Share } from 'react-social-kit';

export default function Page() {
  return (
    <ShareProvider>
      <Share platform="x" url="https://example.com" />
    </ShareProvider>
  );
}
```

Both options work the same way, but Option 1 is more convenient as it automatically includes the 'use client' directive.

## 🧩 Advanced Usage

### Programmatic Sharing

Share content programmatically without rendering buttons:

```jsx
import { share } from 'react-social-kit';

// Share programmatically
const handleShare = async () => {
  const result = await share('x', {
    url: 'https://example.com',
    title: 'Check this out!',
    hashtags: ['react', 'javascript']
  });
  
  if (result) {
    console.log('Shared successfully');
  }
};

// Use in event handlers
<button onClick={handleShare}>Share via X</button>
```

### Complete Configuration Example

Here's a complete example showing all available options:

```jsx
import React from 'react';
import { 
  ShareProvider, 
  Share, 
  SocialShareSheet,
  createTheme
} from 'react-social-kit';

// Create a custom theme
const customTheme = createTheme({
  platforms: {
    facebook: { name: 'Facebook', color: '#4267B2' },
    x: { name: 'X', color: '#000000' },
    linkedin: { name: 'LinkedIn', color: '#0077b5' }
  },
  button: {
    borderRadius: '8px',
    fontFamily: 'Poppins, sans-serif',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s ease-in-out'
  }
});

function App() {
  const handleShareComplete = (result) => {
    console.log(`Share ${result.success ? 'succeeded' : 'failed'} on ${result.platform}`);
  };

  return (
    <ShareProvider 
    >
      <div>
        <h1>Share This Page</h1>
        
        {/* Individual share buttons */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <Share 
            platform="facebook" 
            url="https://example.com/custom-page"
            title="Custom Facebook Title"
            size="medium"
            variant="solid"
            shape="rounded"
            iconSize={24}
            showText={true}
          />
          
          <Share 
            platform="x" 
            title="Check out this awesome page!" 
            hashtags={['react', 'sharing']}
            size="large"
            variant="outline"
            shape="pill"
          />
        </div>
        
        {/* Complete social share sheet */}
        <SocialShareSheet 
          title="Check out this awesome page!"
          platforms={['facebook', 'x', 'linkedin', 'whatsapp', 'telegram', 'email', 'slack', 'tumblr']}
          size="medium"
          variant="solid"
          shape="rounded"
          showText={true}
        />
      </div>
    </ShareProvider>
  );
}
```

## 📄 License

MIT 
