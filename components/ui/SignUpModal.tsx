import { useCallback, useEffect, useState } from 'react';
import Modal from './Modal';
import { useAppDispatch } from '../redux/store';
import LoadingButton from './LoadingButton';
import LoginWithGoogleButton from './LoginWithGoogleButton';
import Input from './Input';
import { isEmail, isMobilePhone } from 'validator'; // Assuming isMobilePhone is available for phone validation
import { loginWithEmail, useIsLoginWithEmailLoading } from '../redux/auth/loginWithEmail';
import BasicButton from './BasicButton';
import PhoneVerification from './PhoneVerification';
import { AuthenticationAction, SignUpMethod } from '../redux/types';

interface SignUpModalProps {
    open: boolean;
    setOpen: (show: boolean) => void;
}

const SignUpModal = ({ open, setOpen }: SignUpModalProps) => {
    const dispatch = useAppDispatch();

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [method, setMethod] = useState<SignUpMethod>(SignUpMethod.Email);
    const [disableSubmit, setDisableSubmit] = useState(true);
    const isLoading = useIsLoginWithEmailLoading();

    const [showPhoneVerification, setShowPhoneVerification] = useState(false);

    useEffect(() => {
        if (
            ((method === 'email' && isEmail(email)) ||
                (method === 'phone' && isMobilePhone(phone))) &&
            password.length >= 6
        ) {
            setDisableSubmit(false);
        } else {
            setDisableSubmit(true);
        }
    }, [email, phone, password, method]);

    const signUp = useCallback(async () => {
        if (method === SignUpMethod.Email) {
            // Perform email sign-up
            dispatch(loginWithEmail({ type: AuthenticationAction.SignUp, email, password }));
        } else {
            setShowPhoneVerification(true);
            // dispatch(loginWithPhone({ type: AuthenticationAction.SignUp, phone, password }));
        }
    }, [email, phone, password, method, dispatch]);

    return (
        <Modal show={open} setShow={setOpen}>
            <div className="max-w-md w-full bg-white py-6 rounded-lg">
                {showPhoneVerification ? (
                    <PhoneVerification signUpPhone={phone} />
                ) : (
                    <div>
                        <h2 className="text-lg font-semibold text-center mb-10">Sign Up</h2>
                        <div className="px-4 flex p-4 pb-10 gap-4 flex-col">
                            <div className="flex justify-center mb-4">
                                <BasicButton
                                    onClick={() => setMethod(SignUpMethod.Email)}
                                    className={`mr-2 ${
                                        method === SignUpMethod.Email
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-200'
                                    }`}
                                >
                                    Emails
                                </BasicButton>
                                <BasicButton
                                    onClick={() => setMethod(SignUpMethod.Phone)}
                                    className={`ml-2 ${
                                        method === 'phone'
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-200'
                                    }`}
                                >
                                    Phone
                                </BasicButton>
                            </div>
                            {method === SignUpMethod.Email ? (
                                <Input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                    name="email"
                                    type="text"
                                />
                            ) : (
                                <Input
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Phone"
                                    name="phone"
                                    type="text"
                                />
                            )}
                            <Input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                name="password"
                                type="password"
                            />
                            <LoadingButton
                                onClick={signUp}
                                disabled={disableSubmit}
                                loading={isLoading}
                            >
                                Sign Up
                            </LoadingButton>
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="bg-white px-2 text-gray-500">
                                        Or sign up with
                                    </span>
                                </div>
                            </div>
                            <div className="mt-2 grid grid-cols-1 gap-3">
                                <LoginWithGoogleButton />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default SignUpModal;
