import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { AuthGuard, useAuth } from '@/components/useAuth';
import Logout from '@/components/ui/Logout';
import { useEffect } from 'react';
import { LoadingStateTypes } from '@/components/redux/types';
import PhoneVerification from '@/components/ui/AuthComponents/PhoneVerification';
import { useHomePage } from '@/components/redux/homePage/homePageSelectors';
import { fetchHomePageData } from '@/components/redux/homePage/fetchHomePageData';
import { useAppDispatch } from '@/components/redux/store';
import EmailVerification from '@/components/ui/AuthComponents/EmailVerification';

export function Home() {
    const dispatch = useAppDispatch();
    const auth = useAuth();
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    const homePageData = useHomePage();

    useEffect(() => {
        dispatch(fetchHomePageData());
    }, []);

    const getVerificationComponent = () => {
        // Check if the user is loaded and available
        if (auth.type !== LoadingStateTypes.LOADED || auth.user == null) {
            return null; // or some loading indicator
        }

        // User is loaded and has no phone number, show PhoneVerification
        if (auth.user.phoneNumber == null) {
            return <PhoneVerification />;
        }

        // User is loaded and has no email, show EmailVerification
        if (auth.user.email == null) {
            return <EmailVerification />;
        }

        return false;
    };
    const VerificationComponent = getVerificationComponent();
    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {VerificationComponent ? (
                VerificationComponent
            ) : (
                <main className={styles.main}>
                    <h1 className={styles.title}>
                        Welcome to <a href="https://nextjs.org">Next.js!</a>
                    </h1>
                    <h2 className="text-2xl mt-4 mb-4 font-bold text-green-900">
                        HELLO 👋👋 {auth.user?.email} -- {auth.user?.phoneNumber}
                    </h2>

                    <p className={styles.description}>
                        Get started by editing{` `}
                        <code className={styles.code}>pages/index.js</code>
                    </p>

                    <p className={styles.description}>This is not an official starter!</p>

                    <div className={styles.grid}>
                        <a href="https://nextjs.org/docs" className={styles.card}>
                            <h3>Documentation &rarr;</h3>
                            <p>Find in-depth information about Next.js features and API.</p>
                        </a>

                        <a href="https://nextjs.org/learn" className={styles.card}>
                            <h3>Learn &rarr;</h3>
                            <p>Learn about Next.js in an interactive course with quizzes!</p>
                        </a>

                        <a
                            href="https://github.com/vercel/next.js/tree/master/examples"
                            className={styles.card}
                        >
                            <h3>Examples &rarr;</h3>
                            <p>Discover and deploy boilerplate example Next.js projects.</p>
                        </a>

                        <a
                            href="https://vercel.com/new?utm_source=typescript-nextjs-starter"
                            className={styles.card}
                        >
                            <h3>Deploy &rarr;</h3>
                            <p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
                        </a>
                        <a
                            href="https://vercel.com/docs/concepts/functions/serverless-functions"
                            className={styles.card}
                        >
                            <h3>Serverless Function &rarr;</h3>
                            <p>
                                Running code on-demand without needing to manage your own
                                infrastructure.
                            </p>
                        </a>
                        <a
                            href="https://vercel.com/docs/concepts/functions/edge-functions"
                            className={styles.card}
                        >
                            <h3>Edge Function &rarr;</h3>
                            <p>
                                Deliver dynamic, personalized content with the lightweight Edge
                                Runtime.
                            </p>
                        </a>
                        <Logout />
                    </div>
                </main>
            )}
        </div>
    );
}

const HomeWithAuthGuard = () => (
    <AuthGuard>
        <Home />
    </AuthGuard>
);

export default HomeWithAuthGuard;
