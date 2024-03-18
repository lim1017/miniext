import { debugErrorMap } from 'firebase/auth';
import { showToast } from '../toast/toastSlice';

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
