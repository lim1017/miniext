import { useAuth } from '../useAuth';
import { useRouter } from 'next/navigation';
import { AuthenticationAction, LoadingStateTypes } from '../redux/types';
import { useAppDispatch } from '@/components/redux/store';
import { EmailPasswordInputs } from './EmailPasswordInputs';
import { loginWithEmail, useIsLoginWithEmailLoading } from '../redux/auth/loginWithEmail';

const EmailVerification = () => {
    const auth = useAuth();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const emailVerifyLoading = useIsLoginWithEmailLoading();
    const handleSubmitEmail = (email: string, password: string) => {
        if (auth.type !== LoadingStateTypes.LOADED) return;
        dispatch(
            loginWithEmail({
                type: AuthenticationAction.Link,
                email,
                password,
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
                        <EmailPasswordInputs
                            isLoading={emailVerifyLoading}
                            onSubmit={handleSubmitEmail}
                            btnText="Submit"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailVerification;
