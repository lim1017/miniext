import { useState } from 'react';
import Input from '../Input';
import LoadingButton from '../LoadingButton';
import { validateEmailPassWord } from '@/components/redux/auth/helpers';

interface EmailPasswordInputProps {
    onSubmit: (email: string, password: string) => void;
    isLoading: boolean;
    btnText: string;
}

export const EmailPasswordInputs = ({ onSubmit, isLoading, btnText }: EmailPasswordInputProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
            <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                name="email"
                type="text"
            />
            <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                name="password"
                type="password"
            />
            <LoadingButton
                onClick={() => onSubmit(email, password)}
                disabled={validateEmailPassWord(email, password) !== ''}
                loading={isLoading}
            >
                {btnText}
            </LoadingButton>
        </>
    );
};
