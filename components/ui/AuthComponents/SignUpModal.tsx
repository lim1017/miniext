import Modal from '../Modal';
import { AuthenticationAction } from '../../redux/types';
import { LoginSignUp } from './LoginSignUp';
import { LogoHeader } from '../LogoHeader';

interface SignUpModalProps {
    open: boolean;
    setOpen: (show: boolean) => void;
}

const SignUpModal = ({ open, setOpen }: SignUpModalProps) => {
    return (
        <Modal show={open} setShow={setOpen}>
            <div className="max-w-md w-full bg-white py-6 rounded-lg">
                <div>
                    <LogoHeader header="Sign Up For An Account" />
                    <LoginSignUp authAction={AuthenticationAction.SignUp} />
                </div>
            </div>
        </Modal>
    );
};

export default SignUpModal;
