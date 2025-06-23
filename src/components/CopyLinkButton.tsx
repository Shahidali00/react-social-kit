// import React, { useState } from 'react';
// import { useShareContext } from '../context/ShareContext';
// import { useShareTracking } from '../hooks/useShareTracking';

// export interface CopyLinkButtonProps {
//   url: string;
//   className?: string;
//   style?: React.CSSProperties;
//   size?: 'small' | 'medium' | 'large';
//   iconSize?: number; // New prop for custom icon size
//   variant?: 'solid' | 'outline' | 'text';
//   shape?: 'square' | 'rounded' | 'pill';
//   showText?: boolean; // Changed from iconOnly to showText
//   onShareComplete?: (result: { success: boolean; platform: string }) => void;
// }

// export const CopyLinkButton: React.FC<CopyLinkButtonProps> = ({
//   url,
//   className = '',
//   style,
//   size = 'medium',
//   iconSize, // New prop for custom icon size
//   variant = 'solid',
//   shape = 'rounded',
//   showText = false, // Default to false (icon-only)
//   onShareComplete
// }) => {
//   const [copied, setCopied] = useState(false);
//   const context = useShareContext();
//   const { trackShare } = useShareTracking();
  
//   const finalUrl = url || context.defaultUrl || (typeof window !== 'undefined' ? window.location.href : '');
  
//   const handleCopy = async () => {
//     try {
//       await navigator.clipboard.writeText(finalUrl);
//       setCopied(true);
      
//       if (onShareComplete) {
//         onShareComplete({ success: true, platform: 'copy' });
//       } else if (context.onShareComplete) {
//         context.onShareComplete({ success: true, platform: 'copy' });
//       }
      
//       trackShare({
//         platform: 'copy',
//         url: finalUrl,
//         success: true,
//         title: context.defaultTitle || ''
//       });
      
//       setTimeout(() => {
//         setCopied(false);
//       }, 2000);
//     } catch (error) {
//       console.error('Failed to copy:', error);
      
//       if (onShareComplete) {
//         onShareComplete({ success: false, platform: 'copy' });
//       } else if (context.onShareComplete) {
//         context.onShareComplete({ success: false, platform: 'copy' });
//       }
      
//       trackShare({
//         platform: 'copy',
//         url: finalUrl,
//         success: false,
//         title: context.defaultTitle || ''
//       });
//     }
//   };
  
//   // Determine button styles based on variant, size, and shape
//   const buttonSizes = {
//     small: { padding: showText ? '6px 12px' : '8px', fontSize: '12px' },
//     medium: { padding: showText ? '8px 16px' : '10px', fontSize: '14px' },
//     large: { padding: showText ? '10px 20px' : '12px', fontSize: '16px' }
//   };
  
//   const buttonVariants = {
//     solid: { 
//       backgroundColor: showText ? '#6c757d' : 'transparent', 
//       color: showText ? '#fff' : '#6c757d', 
//       border: 'none' 
//     },
//     outline: { 
//       backgroundColor: 'transparent', 
//       color: '#6c757d', 
//       border: showText ? '1px solid #6c757d' : 'none' 
//     },
//     text: { 
//       backgroundColor: 'transparent', 
//       color: '#6c757d', 
//       border: 'none' 
//     }
//   };
  
//   const buttonShapes = {
//     square: { borderRadius: '0' },
//     rounded: { borderRadius: context.theme.button.borderRadius },
//     pill: { borderRadius: '9999px' }
//   };
  
//   const buttonStyles = {
//     ...buttonSizes[size],
//     ...buttonVariants[variant],
//     ...buttonShapes[shape],
//     fontFamily: context.theme.button.fontFamily,
//     fontWeight: context.theme.button.fontWeight,
//     transition: context.theme.button.transition,
//     cursor: 'pointer',
//     display: 'inline-flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     ...style
//   };
  
//   // Use iconSize prop if provided, otherwise use size-based dimensions
//   const iconDimension = iconSize || (size === 'small' ? 16 : size === 'medium' ? 20 : 24);
  
//   const iconProps = { 
//     size: iconDimension,
//     color: showText && variant === 'solid' ? '#fff' : '#6c757d'
//   };
  
//   return (
//     <button
//       className={`copy-link-button ${className} ${!showText ? 'copy-link-button-icon-only' : ''}`}
//       style={{ 
//         ...buttonStyles, 
//         ...(!showText ? {
//           minWidth: 'auto',
//           boxShadow: 'none'
//         } : {}),
//         ...style 
//       }}
//       onClick={handleCopy}
//       aria-label={copied ? 'Link copied!' : 'Copy link'}
//     >
//       {copied ? <CheckIcon {...iconProps} /> : <CopyIcon {...iconProps} />}
//       {showText && <span style={{ marginLeft: '8px' }}>{copied ? 'Link copied!' : 'Copy link'}</span>}
//     </button>
//   );
// };











