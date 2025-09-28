import React,{useState} from "react";
import { useAuth } from "../contexts/AuthContext";
import LoginForm from "./LoginForm";
import SignupForm from "./SignUpForm";

const AuthWrapper:React.FC<{children:React.ReactNode}> = ({children}) =>{
    const {isAuthenticated,loading}= useAuth();
    const [showSignup,setShowSignup] = useState(false);

    if(loading){
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4">

                    </div>
                </div>
                <p className="text-gray-600">Loading</p>
            </div>
        );
    }

    if(!isAuthenticated){
        return showSignup ?(
            <SignupForm onSwitchToLogin={()=>setShowSignup(false)}/>
        ):(
            <LoginForm onSwitchToSignup={()=>setShowSignup(true)}/>
        );
    }
    return <>{children}</>;
};
export default AuthWrapper;