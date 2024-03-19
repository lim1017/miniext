import { useCallback, useState } from 'react';
import Modal from './Modal';
import { useAppDispatch } from '../redux/store';
import LoginWithGoogleButton from './LoginWithGoogleButton';
import Input from './Input';
import { isMobilePhone } from 'validator'; // Assuming isMobilePhone is available for phone validation
import { loginWithEmail, useIsLoginWithEmailLoading } from '../redux/auth/loginWithEmail';
import BasicButton from './BasicButton';
import PhoneVerification from './PhoneVerification';
import { AuthenticationAction, SignUpMethod } from '../redux/types';
import { EmailPasswordInputs } from './EmailPasswordInputs';

interface SignUpModalProps {
    open: boolean;
    setOpen: (show: boolean) => void;
}

const SignUpModal = ({ open, setOpen }: SignUpModalProps) => {
    const dispatch = useAppDispatch();

    const [phone, setPhone] = useState('');
    const [method, setMethod] = useState<SignUpMethod>(SignUpMethod.Email);
    const isEmailLoading = useIsLoginWithEmailLoading();
    const [showPhoneVerification, setShowPhoneVerification] = useState(false);

    const signUp = useCallback(
        async (email: string, password: string) => {
            dispatch(loginWithEmail({ type: AuthenticationAction.SignUp, email, password }));
        },
        [dispatch]
    );

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
                                            ? 'bg-blue-800'
                                            : 'bg-gray-400'
                                    }`}
                                >
                                    Email
                                </BasicButton>
                                <BasicButton
                                    onClick={() => setMethod(SignUpMethod.Phone)}
                                    className={`ml-2 ${
                                        method === SignUpMethod.Phone
                                            ? 'bg-blue-800'
                                            : 'bg-gray-400'
                                    }`}
                                >
                                    Phone
                                </BasicButton>
                            </div>
                            {method === SignUpMethod.Email ? (
                                <EmailPasswordInputs
                                    onSubmit={signUp}
                                    isLoading={isEmailLoading}
                                    btnText="Sign Up"
                                />
                            ) : (
                                <>
                                    <Input
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="Phone"
                                        name="phone"
                                        type="text"
                                    />
                                    <BasicButton
                                        onClick={() => setShowPhoneVerification(true)}
                                        disabled={isMobilePhone(phone) ? false : true}
                                    >
                                        Sign Up
                                    </BasicButton>
                                </>
                            )}

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
