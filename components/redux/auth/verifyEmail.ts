import { AuthContextType } from '@/components/useAuth';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAuth, updateEmail, sendEmailVerification } from 'firebase/auth';
import { handleError } from './helpers';
import { useAppSelector } from '../store';

export const verifyEmail = createAsyncThunk(
    'verifyEmail',
    async (
        args: {
            email: string;
            password: string;
            auth: AuthContextType;
            callback: (
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
            const auth = getAuth();
            const user = auth.currentUser;

            if (user) {
                console.log('update email');
                const updatedUser = await updateEmail(user, args.email);
                console.log(user, updatedUser, 'before send email verification');
                await sendEmailVerification(user);

                if (args.callback)
                    args.callback({
                        type: 'success',
                    });
            } else {
                if (args.callback)
                    args.callback({
                        type: 'error',
                        message: 'User not found',
                    });
            }
        } catch (error) {
            console.log(error);
            handleError(error, dispatch, args.callback);
        }
    }
);

export const useVerifyEmailLoading = () => {
    const loading = useAppSelector((state) => state.loading.verifyEmail);
    return loading;
};
