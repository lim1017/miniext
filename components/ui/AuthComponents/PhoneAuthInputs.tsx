import { Dispatch, SetStateAction } from 'react';
import Input from '../Input';
import LoadingButton from '../LoadingButton';

interface PhoneAuthInputsProps {
    onSubmit: (...args: any[]) => void;
    phone: string;
    setPhone: Dispatch<SetStateAction<string>>;
    loading?: boolean;
    btnText: string;
}

export const PhoneAuthInputs = ({
    onSubmit,
    phone,
    setPhone,
    btnText,
    loading,
}: PhoneAuthInputsProps) => {
    return (
        <div>
            <div className="flex justify-center flex-col mb-4">
                <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone +1123456789"
                    name="phone"
                    type="text"
                />
                <LoadingButton
                    loading={loading}
                    className="mt-4"
                    onClick={onSubmit}
                    disabled={phone.length < 10}
                >
                    {btnText}
                </LoadingButton>
            </div>
        </div>
    );
};
