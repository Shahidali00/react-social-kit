export interface ThemeColors {
  primary: string;
  secondary: string;
  text: string;
  background: string;
}

export interface PlatformTheme {
  name: string;
  color: string;
}

export interface Theme {
  colors: ThemeColors;
  platforms: Record<string, PlatformTheme>;
  button: {
    borderRadius: string;
    fontFamily: string;
    fontSize: string;
    fontWeight: string;
    transition: string;
  };
}

export const defaultTheme: Theme = {
  colors: {
    primary: '#1877f2',
    secondary: '#f5f5f5',
    text: '#333333',
    background: '#ffffff'
  },
  platforms: {
    facebook: {
      name: 'Facebook',
      color: '#1877f2'
    },
    twitter: {
      name: 'Twitter',
      color: '#000000'
    },
    linkedin: {
      name: 'LinkedIn',
      color: '#0A66C2'
    },
    pinterest: {
      name: 'Pinterest',
      color: '#E60023'
    },
    reddit: {
      name: 'Reddit',
      color: '#FF4500'
    },
    whatsapp: {
      name: 'WhatsApp',
      color: '#25D366'
    },
    telegram: {
      name: 'Telegram',
      color: '#0088cc'
    },
    email: {
      name: 'Email',
      color: '#D44638'
    },
    slack: {
      name: 'Slack',
      color: '#4A154B'
    },
    tumblr: {
      name: 'Tumblr',
      color: '#36465D'
    }
  },
  button: {
    borderRadius: '4px',
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px',
    fontWeight: '400',
    transition: 'all 0.3s ease'
  }
};

export const createTheme = (customTheme: Partial<Theme>): Theme => {
  return {
    colors: {
      ...defaultTheme.colors,
      ...customTheme.colors
    },
    platforms: {
      ...defaultTheme.platforms,
      ...customTheme.platforms
    },
    button: {
      ...defaultTheme.button,
      ...customTheme.button
    }
  };
};



