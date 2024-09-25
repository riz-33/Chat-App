import { Link } from "react-router-dom";
import SignupForm from "../components/signup";
import { auth, createUserWithEmailAndPassword } from "../config/firebase";

function SignupPage() {
    const registerUser = (values) => {
        console.log (values, "values")
        createUserWithEmailAndPassword(auth, `${values.username}@example.com`, values.password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log (user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log (errorMessage)
            });
    }
    return (
        <div>
            <h1 style={{ textAlign: "center" }}>Signup Page</h1>
            <SignupForm registerUser={registerUser} />
            <p style={{ textAlign: "center" }}>
                Alrady Have an Account? <Link to={"/"} >Login Now</Link></p>
        </div>
    );
}

export default SignupPage;
