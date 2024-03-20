import { Dispatch, SetStateAction } from 'react';
import Input from '../Input';
import { isMobilePhone } from 'validator';
import LoadingButton from '../LoadingButton';

interface PhoneAuthInputsProps {
    onSubmit: () => void;
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
                    placeholder="Phone"
                    name="phone"
                    type="text"
                />
                <LoadingButton
                    loading={loading}
                    className="mt-4"
                    onClick={onSubmit}
                    disabled={isMobilePhone(phone) ? false : true}
                >
                    {btnText}
                </LoadingButton>
            </div>
        </div>
    );
};
