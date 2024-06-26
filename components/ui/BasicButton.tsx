import { ButtonHTMLAttributes } from 'react';

type BasicButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Basic button component
 *
 * @param props All props accepted by a button element
 * @returns A button component
 */
const BasicButton = (props: BasicButtonProps) => {
    const classNames = `px-4 py-2 transition-colors text-white font-medium rounded-md bg-blue-300 hover:bg-blue-600 disabled:bg-gray-300 ${
        props.className || ''
    }`;
    return (
        <button {...props} className={classNames}>
            {props.children}
        </button>
    );
};

export default BasicButton;
