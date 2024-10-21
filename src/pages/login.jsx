import LoginForm from "../components/login";
import { Link } from "react-router-dom";
import { auth, signInWithEmailAndPassword } from "../config/firebase";

function LoginPage() {
    const loginUser = (values) => {
        signInWithEmailAndPassword(auth, `${values.username}@example.com`, values.password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    }
    return (
        <div style={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            flexDirection:"column"
        }}>
            <h1 style={{ textAlign: "center" }}>Login Page</h1>
            <LoginForm loginUser={loginUser} />
            <p style={{ textAlign: "center" }}>
                Don't Have an Account? <Link to={"/signup"} >Signup Now</Link></p>
        </div>
    );
}

export default LoginPage;