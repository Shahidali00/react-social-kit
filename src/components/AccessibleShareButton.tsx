import React, { useRef } from 'react';
import { ShareButton, ShareButtonProps } from './ShareButton';

export interface AccessibleShareButtonProps extends ShareButtonProps {
  ariaLabel?: string;
  ariaDescribedBy?: string;
  focusable?: boolean;
  keyboardShortcut?: string;
}

export const AccessibleShareButton: React.FC<AccessibleShareButtonProps> = ({
  platform,
  ariaLabel,
  ariaDescribedBy,
  focusable = true,
  keyboardShortcut,
  ...rest
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (keyboardShortcut) {
      const keys = keyboardShortcut.toLowerCase().split('+');
      const isCtrl = keys.includes('ctrl') && e.ctrlKey;
      const isAlt = keys.includes('alt') && e.altKey;
      const isShift = keys.includes('shift') && e.shiftKey;
      const keyPressed = keys.includes(e.key.toLowerCase());
      
      if (isCtrl && isAlt && isShift && keyPressed) {
        e.preventDefault();
        buttonRef.current?.click();
      }
    }
  };
  
  return (
    <div onKeyDown={handleKeyDown}>
      <ShareButton
        ref={buttonRef}
        platform={platform}
        aria-label={ariaLabel || `Share on ${platform}`}
        aria-describedby={ariaDescribedBy}
        tabIndex={focusable ? 0 : -1}
        {...rest}
      />
    </div>
  );
};
