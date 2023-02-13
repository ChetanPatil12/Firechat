import {auth, provider} from "../Firebase-config";
import {signInWithPopup} from "firebase/auth";
import {Cookies} from "react-cookie";
import "../Styles/Auth.css"
const cookies  = new Cookies();

export const Auth = (props) => {
    const {setIsAuth} = props;
    const signInWithGoogle = async () => {
        try{
       const result = await signInWithPopup(auth,provider);
       cookies.set("auth-token",result.user.refreshToken);
       setIsAuth(true);
    } catch(err){
        console.error(err);
    }
    };

    return (
        <div className="authpage">
        <h1>Firechat🔥</h1>
        <div className="auth">
            <p>Sign In With Google To Continue</p>
            <button onClick={signInWithGoogle}>Sign in with Google</button>
        </div>
        </div>
    );
}