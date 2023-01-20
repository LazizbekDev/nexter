import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import "../pages/login/login.scss"

const ForgetPassword = () => {
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
        <div className={'login-body'}>

            <form onSubmit={onSubmit} className={'screen-1'}>
                <div style={{display: "flex", justifyContent: "space-between", padding: "1rem 3rem", alignItems: "center"}}>
                    <div className={'input-group'}>
                        <input
                            type={'email'}
                            // className={'btn--input'}
                            placeholder={'Email'}
                            name={'email'}
                        />
                    </div>
                </div>

                <button type={'submit'}
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            padding: "1rem 3rem",
                            border: "none",
                            outline: "none",
                            transition: ".2s"
                        }}
                        className={'bg-primary hover-primary'}>
                    <span className={'heading-3'}>Send reset link</span>
                </button>

                <Link to={'/login'} className={'btn btn--link formInputSmall'}>Go to LogIn</Link>

            </form>
        </div>
    );
};

export default ForgetPassword;