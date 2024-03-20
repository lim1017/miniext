import { useState } from 'react';
import Input from '../Input';
import LoadingButton from '../LoadingButton';
import { isEmail } from 'validator';

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
                disabled={isEmail(email) && password.length >= 6 ? false : true}
                loading={isLoading}
            >
                {btnText}
            </LoadingButton>
        </>
    );
};
