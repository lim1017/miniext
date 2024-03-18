import { AuthContextType } from '@/components/useAuth';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAuth, updateEmail } from 'firebase/auth';
import { handleError } from './helpers';

export const verifyEmail = createAsyncThunk(
    'verifyEmail',
    async (
        args: {
            email: string;
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
                console.log(user, args.email);
                await updateEmail(user, args.email);

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
