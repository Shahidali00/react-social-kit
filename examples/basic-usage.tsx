import React from 'react';
import { 
  ShareProvider, 
  Share, 
  SocialShareSheet,
  createTheme
} from '../src'; // Use relative path instead of package name

// Create a custom theme (optional)
const customTheme = createTheme({
  platforms: {
    facebook: {
      name: 'Facebook', // Add the required name property
      color: '#4267B2' // Custom Facebook color
    }
  },
  button: {
    borderRadius: '8px', // Rounded corners
    fontFamily: 'Poppins, sans-serif',
    fontSize: '14px', // Add required properties
    fontWeight: '500',
    transition: 'all 0.2s ease-in-out'
  }
});

const App = () => {
  const handleShareComplete = (result: { success: boolean; platform: string }) => {
    console.log(`Share ${result.success ? 'succeeded' : 'failed'} on ${result.platform}`);
  };

  return (
    <ShareProvider 
      theme={customTheme}
      defaultUrl="https://example.com/my-page"
      onShareComplete={handleShareComplete}
    >
      <div>
        <h1>Share This Page</h1>
        
        {/* Individual share buttons */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <Share platform="facebook" />
          <Share platform="twitter" title="Check out this awesome page!" hashtags={['react', 'sharing']} />
          <Share platform="linkedin" />
          <Share 
            platform="whatsapp" 
            text="You have to see this!" 
            variant="outline"
            size="large"
          />
        </div>
        
        {/* Complete social share sheet */}
        <SocialShareSheet 
          title="Check out this awesome page!"
          description="This is a great resource for React developers"
          platforms={['facebook', 'twitter', 'linkedin', 'whatsapp', 'telegram', 'email', 'copy']}
        />
      </div>
    </ShareProvider>
  );
};

export default App;

