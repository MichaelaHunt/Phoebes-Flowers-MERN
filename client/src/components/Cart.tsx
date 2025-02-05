import React, {useEffect, useCallback} from 'react';
import './components.css';

interface Props {
    open: boolean; // Controls modal visibility
    cancelFn?: () => void;// Function to close the modal
    primaryFn?: () => void;// Primary action (e.g., "Continue")
    secondaryFn?: () => void; // Secondary action (e.g., "Cancel")
    closeIcon?: string; // Custom close button icon
    content?: React.ReactNode; // Main content inside the modal
    titleContent?: React.ReactNode; // Title/header content
    className?: string; // Additional class for styling

}

export const Cart: React.FC<Props> = (props) => {
    const {open, cancelFn, primaryFn, secondaryFn, closeIcon, content, titleContent} = props;

    //use effect captures esc key to close modal
   
        const handleKeyDown = useCallback((e: KeyboardEvent) => {
            if(e.key === 'Escape' && open && cancelFn) {
                cancelFn();
            }
        }, [open, cancelFn]);

        
        useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [open, cancelFn]);

    // Close modal when clicking outside (optional feature)
    const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget && cancelFn) {
            cancelFn();
        }
    };

    if(!open) {
        return null;
    }
        
    return (
        <div className="modalBackground" onClick={handleBackgroundClick}>
            <div className="modalContainer">
                {titleContent && (<div className="title">
                        {titleContent}
                        <div className="titleCloseBtn">
                            <button onClick={cancelFn}>{closeIcon ?? 'X'}</button>
                        </div>
                    </div>
                )}

                <div className="body">
                    {content}
                </div>

                <div className="footer">
                    {secondaryFn && (
                        <button onClick={secondaryFn} id="cancelBtn">
                            Cancel
                        </button>
                    )}
                    {primaryFn && (
                        <button onClick={primaryFn}>Continue</button>
                    )}
                </div>
            </div>
        </div>

    );
}

export default Cart;