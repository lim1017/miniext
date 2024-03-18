import { useState } from 'react';
import Input from './Input';
import LoadingButton from './LoadingButton';
import { verifyEmail } from '../redux/auth/verifyEmail';
import { useAuth } from '../useAuth';
import { useRouter } from 'next/navigation';
import { LoadingStateTypes } from '../redux/types';
import { useAppDispatch } from '@/components/redux/store';

const EmailVerification = () => {
    const [email, setEmail] = useState('');
    const auth = useAuth();
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleSubmitEmail = () => {
        if (auth.type !== LoadingStateTypes.LOADED) return;

        dispatch(
            verifyEmail({
                email,
                auth,
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
    return (
        <div className="flex items-center justify-center min-h-full px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <img
                        className="w-auto h-12 mx-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                        alt="Workflow"
                    />
                    <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
                        Please verify your email
                    </h2>
                </div>
                <div className="max-w-xl w-full rounded overflow-hidden shadow-lg py-2 px-4">
                    <div className="px-4 flex p-4 pb-10 gap-4 flex-col">
                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            name="email"
                            type="text"
                        />
                        <LoadingButton
                            onClick={handleSubmitEmail}
                            loading={false}
                            loadingText="Sending OTP"
                        >
                            Submit
                        </LoadingButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailVerification;
