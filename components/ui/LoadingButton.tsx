import { ButtonHTMLAttributes, MouseEventHandler } from 'react';
import Spinner from '../Spinner';

interface LoadingButtonProps<T> {
    loading?: boolean;
    loadingText?: string;
    onClick?: (event: T) => void;
}

/**
 * @param props All props accepted by a button element
 * @param props.loading Optional boolean to show loading state
 * @param props.loadingText Optional string to replace the loading spinner with text
 * @returns
 */
const LoadingButton = <T extends ButtonHTMLAttributes<HTMLButtonElement>>({
    loading,
    loadingText,
    children,
    onClick,
    ...buttonProps
}: LoadingButtonProps<T> & ButtonHTMLAttributes<HTMLButtonElement>) => {
    // Type the event handler appropriately
    const handleClick = (event: T) => {
        if (onClick) {
            onClick(event);
        }
    };

    return (
        <button
            className="transition-colors bg-violet-600 text-white font-medium px-4 py-2 rounded-md hover:bg-violet-700 disabled:bg-gray-300"
            disabled={loading || buttonProps.disabled}
            // TODO fix type issue
            onClick={handleClick as unknown as (e: MouseEventHandler<HTMLButtonElement>) => void}
            {...buttonProps}
        >
            {loading ? (
                loadingText ? (
                    loadingText
                ) : (
                    <div className="w-full flex items-center justify-center">
                        <Spinner theme="dark" />
                    </div>
                )
            ) : (
                children
            )}
        </button>
    );
};

export default LoadingButton;
