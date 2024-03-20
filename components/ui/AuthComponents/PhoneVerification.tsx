import { ConfirmationResult, RecaptchaVerifier } from 'firebase/auth';
import { firebaseAuth } from '@/components/firebase/firebaseAuth';
import { useEffect, useState } from 'react';
import Modal from '@/components/ui/Modal';
import { useRouter } from 'next/navigation';
import ToastBox from '@/components/ui/ToastBox';
import { useAppDispatch } from '@/components/redux/store';
import { showToast } from '@/components/redux/toast/toastSlice';
import Input from '@/components/ui/Input';
import LoadingButton from '@/components/ui/LoadingButton';
import Logout from '../Logout';
import { useAuth } from '../../useAuth';
import { LoadingStateTypes } from '../../redux/types';
import {
    sendVerificationCode,
    useSendVerificationCodeLoading,
    useVerifyPhoneNumberLoading,
    verifyPhoneNumber,
} from '../../redux/auth/verifyPhoneNumber';
import { LogoHeader } from '../LogoHeader';
import { PhoneAuthInputs } from './PhoneAuthInputs';
interface PhoneVerificationProps {
    signUpPhone?: string;
}
/**
 * PhoneVerification component is used to verify a phone number during the sign-up or login process.
 * When signing up with a phone number signUpPhone prop is provided.
 */

const PhoneVerification = ({ signUpPhone }: PhoneVerificationProps) => {
    const dispatch = useAppDispatch();
    const auth = useAuth();
    const [phoneNumber, setPhoneNumber] = useState(signUpPhone || '');
    const [OTPCode, setOTPCode] = useState('');
    const [show, setShow] = useState(false);

    const sendVerificationLoading = useSendVerificationCodeLoading();
    const verifyPhoneNumberLoading = useVerifyPhoneNumberLoading();

    const [recaptcha, setRecaptcha] = useState<RecaptchaVerifier | null>(null);
    const [recaptchaResolved, setRecaptchaResolved] = useState(false);
    const [verificationId, setVerificationId] = useState('');
    const router = useRouter();

    const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

    // Sending OTP and storing id to verify it later
    const handleSendVerification = async () => {
        // Skip the check if signUpPhone is defined as the user will not have been authenticated
        if (!signUpPhone && auth.type !== LoadingStateTypes.LOADED) return;

        dispatch(
            sendVerificationCode({
                phoneNumber,
                auth,
                recaptcha,
                recaptchaResolved,
                isPhoneSignUp: signUpPhone ? true : false,
                callback: (result) => {
                    if (result.type === 'error') {
                        setRecaptchaResolved(false);
                        return;
                    }

                    if (result.confirmationResult) {
                        setConfirmationResult(result.confirmationResult);
                    }
                    setVerificationId(result.verificationId);
                    setShow(true);
                },
            })
        );
    };

    const ValidateOtp = async () => {
        if ((!signUpPhone && auth.type !== LoadingStateTypes.LOADED) || !recaptcha) return;
        dispatch(
            verifyPhoneNumber({
                auth,
                OTPCode,
                verificationId,
                confirmationResult,
                isPhoneSignUp: signUpPhone ? true : false,
                callback: (result) => {
                    if (result.type === 'error') {
                        return;
                    }
                    // needed to reload auth user
                    router.refresh();
                },
            })
        );
    };

    // generating the recaptcha on page render
    useEffect(() => {
        const captcha = new RecaptchaVerifier(firebaseAuth, 'recaptcha-container', {
            size: 'normal',
            callback: () => {
                setRecaptchaResolved(true);
            },

            'expired-callback': () => {
                setRecaptchaResolved(false);
                dispatch(
                    showToast({
                        message: 'Recaptcha Expired, please verify it again',
                        type: 'info',
                    })
                );
            },
        });

        captcha.render();

        setRecaptcha(captcha);
    }, []);

    return (
        <div className="flex items-center justify-center min-h-full px-4 py-6 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-4">
                <div>
                    <LogoHeader header="Phone Verification" />
                </div>

                <div className="max-w-xl w-full rounded overflow-hidden shadow-lg py-2 px-4">
                    <div className="px-4 flex p-4 pb-10 gap-4 flex-col">
                        <PhoneAuthInputs
                            phone={phoneNumber}
                            setPhone={setPhoneNumber}
                            loading={sendVerificationLoading}
                            btnText="Send OTP"
                            onSubmit={handleSendVerification}
                        />
                    </div>
                    <div id="recaptcha-container" />
                    <div className="flex w-full flex-col">
                        <Logout />
                    </div>

                    <Modal show={show} setShow={setShow}>
                        <div className="max-w-xl w-full bg-white py-6 rounded-lg">
                            <h2 className="text-lg font-semibold text-center mb-10">
                                Enter Code to Verify
                            </h2>
                            <div className="px-4 flex justify-center items-center gap-4 pb-10">
                                <Input
                                    value={OTPCode}
                                    type="text"
                                    placeholder="Enter your OTP"
                                    onChange={(e) => setOTPCode(e.target.value)}
                                />

                                <LoadingButton
                                    onClick={ValidateOtp}
                                    loading={verifyPhoneNumberLoading}
                                    loadingText="Verifying..."
                                >
                                    Verify
                                </LoadingButton>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
            <ToastBox />
        </div>
    );
};

export default PhoneVerification;
