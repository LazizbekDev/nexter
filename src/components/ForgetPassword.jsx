import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { AiOutlineRight } from "react-icons/ai"
import Sidebar from "./sidebar/Sidebar";
import {useState} from "react";

const ForgetPassword = () => {
    const [opened, setOpened] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        const auth = getAuth();
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email')
        try {
            await sendPasswordResetEmail(auth, email);
            toast.success('Reset link was sent to your email')
        } catch (err) {
            toast.error('Couldn\'t send reset email')
        }
    }

    return (
        <div className={`container-page ${opened && 'sidebar-open'}`}>
            <Sidebar
                className={`${opened && 'sidebar-btn'}`}
                mb={`${opened ? 'sidebar-open' : 'sidebar-close'}`}
                onClick={() => opened ? setOpened(false) : setOpened(true)}
            />

            <form onSubmit={onSubmit}>
                <div style={{display: "flex", justifyContent: "space-between", padding: "1rem 3rem", alignItems: "center"}}>
                    <input
                        type={'email'}
                        className={'btn--input'}
                        placeholder={'Email'}
                        name={'email'}
                    />

                    <Link to={'/login'} className={'btn btn--link'}>Go to LogIn</Link>
                </div>

                <div style={{display: "flex", justifyContent: "space-between", padding: "1rem 3rem"}} className={'bg-primary'}>
                    <span className={'heading-3'}>Send reset link</span>
                    <button className={'btn btn--go'}>
                        Send <AiOutlineRight />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ForgetPassword;