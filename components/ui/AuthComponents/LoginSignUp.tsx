import { loginWithEmail, useIsLoginWithEmailLoading } from '@/components/redux/auth/loginWithEmail';
import { AuthenticationAction, SignUpMethod } from '@/components/redux/types';
import { useCallback, useState } from 'react';
import BasicButton from '../BasicButton';
import { EmailPasswordInputs } from './EmailPasswordInputs';
import LoginWithGoogleButton from './LoginWithGoogleButton';
import { PhoneAuthInputs } from './PhoneAuthInputs';
import PhoneVerification from './PhoneVerification';
import { useAppDispatch } from '@/components/redux/store';

interface LoginRegisterProps {
    authAction: AuthenticationAction;
}

export const LoginSignUp = ({ authAction }: LoginRegisterProps) => {
    const dispatch = useAppDispatch();

    const [phone, setPhone] = useState('');
    const [showPhoneVerification, setShowPhoneVerification] = useState(false);

    const [method, setMethod] = useState<SignUpMethod>(SignUpMethod.Email);

    const isEmailLoading = useIsLoginWithEmailLoading();
    const isLogin = authAction === AuthenticationAction.Login;
    const isMethodEmail = method === SignUpMethod.Email;

    const signUp = useCallback(
        async (email: string, password: string) => {
            dispatch(
                loginWithEmail({
                    type: isLogin ? AuthenticationAction.Login : AuthenticationAction.SignUp,
                    email,
                    password,
                })
            );
        },
        [dispatch, isLogin]
    );

    const handleSubmit = (email: string, password: string) => {
        if (method === SignUpMethod.Email) {
            signUp(email, password);
        } else {
            setShowPhoneVerification(true);
        }
    };

    return (
        <div>
            {showPhoneVerification ? (
                <PhoneVerification signUpPhone={phone} />
            ) : (
                <div className="px-4 flex p-4 pb-10 gap-4 flex-col">
                    <div className="flex justify-center mb-4">
                        <BasicButton
                            onClick={() => setMethod(SignUpMethod.Email)}
                            className={`mr-2 ${isMethodEmail ? 'bg-blue-800' : 'bg-gray-400'}`}
                        >
                            Email
                        </BasicButton>
                        <BasicButton
                            onClick={() => setMethod(SignUpMethod.Phone)}
                            className={`ml-2 ${isMethodEmail ? 'bg-gray-400' : 'bg-blue-800'}`}
                        >
                            Phone
                        </BasicButton>
                    </div>

                    {method === SignUpMethod.Email ? (
                        <EmailPasswordInputs
                            onSubmit={handleSubmit}
                            isLoading={isEmailLoading}
                            btnText={isLogin ? 'Login' : 'Sign Up'}
                        />
                    ) : (
                        <PhoneAuthInputs
                            btnText={isLogin ? 'Login' : 'Sign Up'}
                            onSubmit={() => setShowPhoneVerification(true)}
                            phone={phone}
                            setPhone={setPhone}
                        />
                    )}

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">
                                Or {isLogin ? 'Login in with' : 'Sign up with'}
                            </span>
                        </div>
                    </div>
                    <div className="mt-2 grid grid-cols-1 gap-3">
                        <LoginWithGoogleButton />
                    </div>
                </div>
            )}
        </div>
    );
};
