import { debugErrorMap } from 'firebase/auth';
import { showToast } from '../toast/toastSlice';
import { isEmail } from 'validator';

export const isValidPhoneNumber = (phoneNumber: string) => {
    const regex = /^\+\d{1,3}\d{10}$/;
    return regex.test(phoneNumber);
};

export const validateEmailPassWord = (email: string, password: string) => {
    if (!isEmail(email)) {
        return 'Enter a valid email';
    }
    if (password.length < 6) {
        return 'Password should be atleast 6 characters';
    }

    return '';
};

export const getFriendlyMessageFromFirebaseErrorCode = (errorCode: string | null) => {
    const messageFromFirebase: string | null =
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        errorCode ? debugErrorMap()[errorCode.replace('auth/', '')] : null;
    return (
        messageFromFirebase ??
        'Something happened while we were processing your request, please try again.'
    );
};

export const handleError = (error: any, dispatch: any, callback: (error: any) => void) => {
    dispatch(
        showToast({
            message: getFriendlyMessageFromFirebaseErrorCode(error.code),
            type: 'error',
        })
    );
    if (callback)
        callback({
            type: 'error',
            message: getFriendlyMessageFromFirebaseErrorCode(error.code),
        });
};
