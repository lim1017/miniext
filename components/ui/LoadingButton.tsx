import { ButtonHTMLAttributes } from 'react';
import Spinner from '../Spinner';

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    loadingText?: string;
}

/**
 * @param props All props accepted by a button element
 * @param props.loading Optional boolean to show loading state
 * @param props.loadingText Optional string to replace the loading spinner with text
 * @returns
 */
const LoadingButton = ({
    className,
    loading,
    loadingText,
    children,
    ...buttonProps
}: LoadingButtonProps) => {
    const classNames = `transition-colors bg-violet-600 text-white font-medium px-4 py-2 rounded-md hover:bg-violet-700 disabled:bg-gray-300 ${
        className || ''
    }`;

    return (
        <button {...buttonProps} className={classNames} disabled={loading || buttonProps.disabled}>
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
