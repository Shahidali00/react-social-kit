import React from 'react';

export interface ThemeColors {
  primary: string;
  secondary: string;
  success: string;
  danger: string;
  warning: string;
  info: string;
  light: string;
  dark: string;
}

export interface PlatformTheme {
  name: string;
  color: string;
  icon?: React.ReactNode;
  hoverColor?: string;
  activeColor?: string;
}

export interface Theme {
  platforms: Record<string, PlatformTheme>;
  button: {
    borderRadius: string;
    fontFamily: string;
    fontSize: string;
    fontWeight: string;
    transition: string;
  };
  sizes: {
    small: {
      padding: string;
      fontSize: string;
    };
    medium: {
      padding: string;
      fontSize: string;
    };
    large: {
      padding: string;
      fontSize: string;
    };
  };
}

export const defaultTheme: Theme = {
  platforms: {
    facebook: {
      name: 'Facebook',
      color: '#1877f2',
      hoverColor: '#166fe5',
      activeColor: '#125fca'
    },
    twitter: {
      name: 'Twitter',
      color: '#1DA1F2',
      hoverColor: '#0d95e8',
      activeColor: '#0c85d0'
    },
    linkedin: {
      name: 'LinkedIn',
      color: '#0A66C2',
      hoverColor: '#0958a8',
      activeColor: '#074b8a'
    },
    pinterest: {
      name: 'Pinterest',
      color: '#E60023',
      hoverColor: '#d0001f',
      activeColor: '#b7001b'
    },
    reddit: {
      name: 'Reddit',
      color: '#FF4500',
      hoverColor: '#e63e00',
      activeColor: '#cc3700'
    },
    whatsapp: {
      name: 'WhatsApp',
      color: '#25D366',
      hoverColor: '#21bd5a',
      activeColor: '#1da74f'
    },
    telegram: {
      name: 'Telegram',
      color: '#0088cc',
      hoverColor: '#0077b3',
      activeColor: '#006699'
    },
    email: {
      name: 'Email',
      color: '#D44638',
      hoverColor: '#c13e31',
      activeColor: '#ad372c'
    },
    slack: {
      name: 'Slack',
      color: '#4A154B',
      hoverColor: '#3e1240',
      activeColor: '#320f34'
    },
    tumblr: {
      name: 'Tumblr',
      color: '#36465D',
      hoverColor: '#2e3c4f',
      activeColor: '#263242'
    },
    copy: {
      name: 'Copy Link',
      color: '#6c757d',
      hoverColor: '#5a6268',
      activeColor: '#4e555b'
    }
  },
  button: {
    borderRadius: '4px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s ease-in-out'
  },
  sizes: {
    small: {
      padding: '6px 12px',
      fontSize: '12px'
    },
    medium: {
      padding: '8px 16px',
      fontSize: '14px'
    },
    large: {
      padding: '12px 24px',
      fontSize: '16px'
    }
  }
};

export const createTheme = (customTheme: Partial<Theme>): Theme => {
  return {
    ...defaultTheme,
    ...customTheme,
    platforms: {
      ...defaultTheme.platforms,
      ...(customTheme.platforms || {})
    },
    button: {
      ...defaultTheme.button,
      ...(customTheme.button || {})
    },
    sizes: {
      ...defaultTheme.sizes,
      ...(customTheme.sizes || {})
    }
  };
};


