import { NextPage } from 'next';
import { GoogleAuthProvider } from 'firebase/auth';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ToastBox from '@/components/ui/ToastBox';
import { useAuth } from '@/components/useAuth';
import Spinner from '@/components/Spinner';
import SignUpModal from '@/components/ui/AuthComponents/SignUpModal';
import { AuthenticationAction, LoadingStateTypes } from '@/components/redux/types';
import { LogoHeader } from '@/components/ui/LogoHeader';
import { LoginSignUp } from '@/components/ui/AuthComponents/LoginSignUp';

export const googleLoginProvider = new GoogleAuthProvider();

const LoginPage: NextPage = () => {
    const auth = useAuth();
    const router = useRouter();

    const [showRegistration, setshowRegistration] = useState(false);

    if (auth.type === LoadingStateTypes.LOADING) {
        return <Spinner />;
    } else if (auth.type === LoadingStateTypes.LOADED) {
        router.push('/');
        return <Spinner />;
    }

    return (
        <div className="flex items-center justify-center min-h-full px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <LogoHeader header="Log In To Your Account" />
                </div>

                <div className="max-w-xl w-full rounded overflow-hidden shadow-lg py-2 px-4">
                    <div className="flex gap-4 mb-5 flex-col">
                        <LoginSignUp authAction={AuthenticationAction.Login} />

                        <div className="mt-6">
                            <div className="flex justify-center">
                                <div className="relative flex justify-center text-sm">
                                    <div className="font-small text-black-400">
                                        Don&apos;t have an account?
                                    </div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <div
                                        onClick={() => setshowRegistration(true)}
                                        className="ml-2 cursor-pointer font-medium text-violet-600 hover:text-violet-400"
                                    >
                                        Sign Up
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <SignUpModal open={showRegistration} setOpen={setshowRegistration} />
            </div>
            <ToastBox />
        </div>
    );
};

export default LoginPage;
