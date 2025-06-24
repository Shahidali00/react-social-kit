# React Social Kit

[![npm version](https://img.shields.io/npm/v/react-social-kit.svg)](https://www.npmjs.com/package/react-social-kit)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)](https://www.typescriptlang.org/)

A comprehensive and customizable social sharing library for React applications. Works seamlessly with both JavaScript (JSX) and TypeScript (TSX) projects.

<p>
  <img src="https://raw.githubusercontent.com/Shahidali00/react-social-kit/assets/social-Icons.png" alt="Social Share Icons" width="600" />
</p>


<p>
  <img src="https://raw.githubusercontent.com/Shahidali00/react-social-kit/assets/social-Icons.png" alt="Social Share Icons" width="600" />
</p>

<p >
  <img src="https://raw.githubusercontent.com/Shahidali00/react-social-kit/assets/social-Icons.png" alt="Social Share Icons" width="600" />
</p>
<p >
  <img src="https://github.com/Shahidali00/react-social-kit/blob/main/src/assets/social-Icons.png" alt="Social Share Icons" width="600" />
</p>

![Social Icons](https://github.com/Shahidali00/react-social-kit/blob/main/src/assets/social-Icons.png)


![Social Icons](https://github.com/Shahidali00/react-social-kit/blob/main/src/assets/images/social-Icons.png)

https://github.com/Shahidali00/react-social-kit/blob/main/src/assets/social-Icons.png



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
        <Share platform="facebook" url="https://example.com" />
        <Share platform="x" url="https://example.com" title="Check this out!" />
        <Share platform="linkedin" url="https://example.com" />
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

// With title and description
<Share 
  platform="x" 
  url="https://example.com" 
  title="Check this out!" 
  description="This is an amazing website you should visit"
  hashtags={['react', 'javascript']} 
  iconSize={32}
/>

// With text displayed
<Share 
  platform="x" 
  url="https://example.com" 
  title="Check this out!" 
  description="This is an amazing website you should visit"
  hashtags={['react', 'javascript']} 
  showText
/>
```

The `description` prop is used to provide additional context in the share message. Each platform uses it differently:

- **X (Twitter)**: Used as the tweet text if no `text` prop is provided
- **Facebook**: Included as the post description
- **LinkedIn**: Used as the summary if no `summary` prop is provided
- **WhatsApp**: Combined with the URL in the message
- **Telegram**: Included in the message text
- **Email**: Used in the email body
- **Pinterest**: Used as the pin description
- **Reddit**: Not used (Reddit only supports title and URL)

You can set a default description for all share components using the `ShareProvider`:

```jsx
<ShareProvider defaultDescription="Check out this amazing content!">
  {/* All Share components will use this description unless overridden */}
  <Share platform="x" url="https://example.com" />
</ShareProvider>
```

### Share Sheet

Display multiple share options in a grid:

```jsx
// Icon-only (default)
<SocialShareSheet 
  url="https://example.com"
  title="Check out this site"
  description="This is an amazing website you should visit"
  platforms={['facebook', 'x', 'linkedin', 'whatsapp', 'slack']}
  iconSize={36}
/>

// With text
<SocialShareSheet 
  url="https://example.com"
  title="Check out this site"
  description="This is an amazing website you should visit"
  platforms={['facebook', 'x', 'linkedin', 'whatsapp', 'slack']}
  showText
/>
```

The `description` prop in `SocialShareSheet` is passed to all individual share buttons, ensuring consistent messaging across all platforms.

### Supported Platforms

React Social Kit supports the following platforms out of the box:

| Platform | Key | Description |
|----------|-----|-------------|
| Facebook | `facebook` | Share to Facebook timeline |
| X (Twitter) | `x` or `twitter` | Share via X with optional hashtags |
| LinkedIn | `linkedin` | Share to LinkedIn with title and summary |
| Pinterest | `pinterest` | Pin with image URL and description |
| Reddit | `reddit` | Share to Reddit with title |
| WhatsApp | `whatsapp` | Share via WhatsApp with message |
| Telegram | `telegram` | Share via Telegram with message |
| Email | `email` | Share via email with subject and body |
| Slack | `slack` | Share to Slack workspace |
| Tumblr | `tumblr` | Share to Tumblr blog |
| Native | `native` | Use Web Share API when available |

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
        description="This is an amazing website you should visit"
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
          description="Amazing content for developers"
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
    description: 'This is an amazing website you should visit', // Used in the share message
    hashtags: ['react', 'javascript']
  });
  
  if (result) {
    console.log('Shared successfully');
  }
};

// Use in event handlers
<button onClick={handleShare}>Share via X</button>
```

### Platform-Specific Sharing

Different platforms handle the `title` and `description` props differently:

```jsx
// X (Twitter) - Uses title and description in the tweet
<Share 
  platform="x" 
  url="https://example.com" 
  title="Check this out!" 
  description="This is an amazing website you should visit"
  hashtags={['react', 'javascript']} 
/>

// WhatsApp - Combines description with URL
<Share 
  platform="whatsapp" 
  url="https://example.com" 
  description="You have to see this amazing website:"
/>

// Email - Uses title as subject and description in body
<Share 
  platform="email" 
  url="https://example.com" 
  title="Amazing website" 
  description="I found this website and thought you might like it"
/>

// LinkedIn - Uses title and description as summary
<Share 
  platform="linkedin" 
  url="https://example.com" 
  title="Great resource" 
  description="A comprehensive guide to React development"
/>
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
      theme={customTheme}
      defaultUrl="https://example.com"
      defaultTitle="Default share title"
      defaultDescription="Default share description"
      defaultMedia="https://example.com/image.jpg"
      defaultHashtags={['react', 'sharing']}
      preferNative={true}
      fallbackToWindow={true}
      onShareComplete={handleShareComplete}
      analytics={{
        provider: 'ga',
        trackingId: 'UA-XXXXXXXX-X'
      }}
    >
      <div>
        <h1>Share This Page</h1>
        
        {/* Individual share buttons */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <Share 
            platform="facebook" 
            url="https://example.com/custom-page"
            title="Custom Facebook Title"
            description="Custom Facebook Description"
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
            via="yourTwitterHandle"
            size="large"
            variant="outline"
            shape="pill"
          />
        </div>
        
        {/* Complete social share sheet */}
        <SocialShareSheet 
          title="Check out this awesome page!"
          description="This is a great resource for React developers"
          platforms={['facebook', 'x', 'linkedin', 'whatsapp', 'telegram', 'email', 'slack', 'tumblr']}
          buttonSize="medium"
          buttonVariant="solid"
          buttonShape="rounded"
          showText={true}
        />
      </div>
    </ShareProvider>
  );
}
```

## 📄 License

MIT 







