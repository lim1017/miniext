import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    ConfirmationResult,
    PhoneAuthProvider,
    RecaptchaVerifier,
    signInWithPhoneNumber,
    updatePhoneNumber,
    linkWithPhoneNumber,
} from 'firebase/auth';
import { handleError } from './helpers';
import { showToast } from '../toast/toastSlice';
import { LoadingStateTypes } from '../types';
import { AuthContextType } from '@/components/useAuth';
import { firebaseAuth } from '@/components/firebase/firebaseAuth';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const sendVerificationCode = createAsyncThunk(
    'sendVerificationCode',
    async (
        args: {
            phoneNumber: string;
            auth: AuthContextType;
            recaptchaResolved: boolean;
            recaptcha: RecaptchaVerifier | null;
            isPhoneSignUp: boolean;
            callback: (
                args:
                    | {
                          type: 'success';
                          verificationId: string;
                          confirmationResult?: ConfirmationResult;
                      }
                    | {
                          type: 'error';
                          message: string;
                      }
            ) => void;
        },
        { dispatch }
    ) => {
        if (!args.isPhoneSignUp && args.auth.type !== LoadingStateTypes.LOADED) return;
        if (!args.recaptchaResolved || !args.recaptcha) {
            dispatch(showToast({ message: 'First Resolved the Captcha', type: 'info' }));
            return;
        }
        if (args.phoneNumber.slice() === '' || args.phoneNumber.length < 10) {
            dispatch(
                showToast({
                    message: 'Enter the Phone Number and provide the country code',
                    type: 'info',
                })
            );
            return;
        }

        try {
            if (args.isPhoneSignUp) {
                // Use signInWithPhoneNumber for sign-up flow
                const confirmationResult = await signInWithPhoneNumber(
                    firebaseAuth,
                    args.phoneNumber,
                    args.recaptcha
                );
                // Here, you might want to handle the confirmationResult, like storing it for later use
                dispatch(
                    showToast({ message: 'Verification code sent to your phone.', type: 'success' })
                );

                if (args.callback)
                    args.callback({
                        type: 'success',
                        verificationId: confirmationResult.verificationId,
                        confirmationResult,
                    });
            } else {
                const sentConfirmationCode = await linkWithPhoneNumber(
                    args.auth.user,
                    args.phoneNumber,
                    args.recaptcha
                );
                dispatch(
                    showToast({
                        message: 'Verification Code has been sent to your Phone',
                        type: 'success',
                    })
                );

                if (args.callback)
                    args.callback({
                        type: 'success',
                        verificationId: sentConfirmationCode.verificationId,
                    });
            }
        } catch (error: any) {
            handleError(error, dispatch, args.callback);
        }
    }
);

export const useSendVerificationCodeLoading = () => {
    const loading = useSelector((state: RootState) => state.loading.sendVerificationCode);
    return loading;
};

export const verifyPhoneNumber = createAsyncThunk(
    'verifyPhoneNumber',
    async (
        args: {
            OTPCode: string;
            auth: AuthContextType;
            verificationId: string;
            confirmationResult: ConfirmationResult | null;
            isPhoneSignUp: boolean;
            callback: (
                args:
                    | { type: 'success' }
                    | {
                          type: 'error';
                          message: string;
                      }
            ) => void;
        },
        { dispatch }
    ) => {
        if (
            args.OTPCode === null ||
            !args.verificationId ||
            (!args.isPhoneSignUp && args.auth.type !== LoadingStateTypes.LOADED)
        )
            return;

        try {
            const credential = PhoneAuthProvider.credential(args.verificationId, args.OTPCode);

            if (args.isPhoneSignUp && args.confirmationResult) {
                // verify code and creates the user
                await args.confirmationResult.confirm(args.OTPCode);
                firebaseAuth.currentUser?.reload();

                dispatch(
                    showToast({
                        message: 'User created and signed in successfully.',
                        type: 'success',
                    })
                );

                args.callback({ type: 'success' });
            } else {
                await updatePhoneNumber(args.auth.user, credential);
                firebaseAuth.currentUser?.reload();
                dispatch(
                    showToast({
                        message: 'Logged in Successfully',
                        type: 'success',
                    })
                );

                args.callback({ type: 'success' });
            }
        } catch (error: any) {
            console.log(error);
            handleError(error, dispatch, args.callback);
        }
    }
);

export const useVerifyPhoneNumberLoading = () => {
    const loading = useSelector((state: RootState) => state.loading.verifyPhoneNumber);
    return loading;
};
