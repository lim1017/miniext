import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    EmailAuthProvider,
    linkWithCredential,
} from 'firebase/auth';
import { firebaseAuth } from '@/components/firebase/firebaseAuth';
import { getFriendlyMessageFromFirebaseErrorCode } from './helpers';
import { showToast } from '../toast/toastSlice';
import isEmail from 'validator/lib/isEmail';
import { useAppSelector } from '../store';
import { AuthenticationAction } from '../types';

export const loginWithEmail = createAsyncThunk(
    'login',
    async (
        args: {
            type: AuthenticationAction;
            email: string;
            password: string;
            callback?: (
                args:
                    | {
                          type: 'success';
                      }
                    | {
                          type: 'error';
                          message: string;
                      }
            ) => void;
        },
        { dispatch }
    ) => {
        try {
            if (!isEmail(args.email)) {
                dispatch(
                    showToast({
                        message: 'Enter a valid email',
                        type: 'info',
                    })
                );
                return;
            }
            if (args.password.length < 6) {
                dispatch(
                    showToast({
                        message: 'Password should be atleast 6 characters',
                        type: 'info',
                    })
                );
                return;
            }

            if (args.type === AuthenticationAction.SignUp) {
                await createUserWithEmailAndPassword(firebaseAuth, args.email, args.password);
            }

            if (args.type === AuthenticationAction.Link) {
                const user = firebaseAuth.currentUser;
                // Create an email/password credential
                const credential = EmailAuthProvider.credential(args.email, args.password);

                try {
                    if (user) {
                        await linkWithCredential(user, credential);

                        if (args.callback)
                            args.callback({
                                type: 'success',
                            });
                    }
                } catch (error) {
                    console.error('Error linking email and password to the account', error);
                }
            } else {
                await signInWithEmailAndPassword(firebaseAuth, args.email, args.password);
            }
        } catch (e: any) {
            dispatch(
                showToast({
                    message: getFriendlyMessageFromFirebaseErrorCode(e.code),
                    type: 'error',
                })
            );
        }
    }
);

export const useIsLoginWithEmailLoading = () => {
    const loading = useAppSelector((state) => state.loading.loginWithEmail);
    return loading;
};
