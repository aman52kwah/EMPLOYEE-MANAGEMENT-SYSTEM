import React,{useState} from "react";
import{Eye, EyeOff,Mail,Lock,User,Building2,AlertCircle,CheckCircle} from 'lucide-react';
import { useAuth } from "../contexts/AuthContext";

interface SignupFormProps{
    onSwitchToLogin:()=>void;
}

const SignupForm: React.FC<SignupFormProps> =({onSwitchToLogin}) =>{
    const {signup, loading} = useAuth();
    const [formData, setFormData] = useState({
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        confirmPassword:'',
    });
    const [showPassword,setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword]= useState(false);
    const [error, setError] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);

    //use regular expression
    const validatePassword =(password: string) => {
        const minLength = password.length >= 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);

        return {
            minLength,
            hasUpperCase,
            hasLowerCase,
            hasNumbers,
            isValid: minLength && hasUpperCase && hasLowerCase && hasNumbers,
        };
    };

    const passwordValidation = validatePassword(formData.password);

    const handleSubmit = async (e: React.FormEvent)=>{
        e.preventDefault();
        setError('');

        //validation
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
            setError('Please fill in all fields');
            return;
        }

        if (!passwordValidation.isValid) {
            setError('password does not meet the requirement');
            return ;
        }

        if(formData.password !== formData.confirmPassword){
            setError('Password do not match');
            return;
        }
        if(!acceptTerms){
            setError('Please accept the terms and conditions');
            return;
        }

        const success = await signup(formData.email,formData.password,formData.firstName,formData.lastName);
        if(!success){
            setError('An account with this email already exists');
        }
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
        const {name, value} = e.target;
        setFormData(prev => ({...prev,[name]:value}));
        if(error) setError('');
    };

    const PasswordRequirement = ({met,text}:{met:boolean; text:string})=>(
        <div className={`flex items-center text-sm ${met ? 'text-green-600':'text-gray-500'}`}>
            <CheckCircle className={`h-4 w-4 mr-2 ${met ? 'text-green-600':'text-gray-300'}`}/>
            {text}
        </div>
    );
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center
        justify-center p-4">
            <div className="max-w-md w-full">
                {/*Header*/}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-blue-600 rounded-full">
                            <Building2 className="h-8 w-8 text-white"/>
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
                    <p className="text-gray-600">Join Our Employee Management system</p>
                </div>

                {/*sign up form */}

                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error &&(
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
                                <AlertCircle className="h-5 w-5 text-red-600 mr-3 flex-shrink-0"/>
                                <p className="text-red-700 text-sm">{error}</p>
                            </div>
                        )}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    First Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"/>
                                    <input
                                    type='text'
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500
                                    focus:border-blue-500 transition-colors"
                                    placeholder=" enter your first Name"
                                  disabled={loading}
                                />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Last Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"/>
                                    <input
                                    type='text'
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500
                                    focus:border-blue-500 transition-colors"
                                    placeholder="enter your Last Name"
                                  disabled={loading}
                                />
                                </div>
                            </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"/>
                                    <input
                                    type='email'
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500
                                    focus:border-blue-500 transition-colors"
                                    placeholder="enter your email"
                                  disabled={loading}
                                />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"/>
                                    <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500
                                    focus:border-blue-500 transition-colors"
                                    placeholder="Create a password"
                                  disabled={loading}
                                />
                                <button 
                                type="button"
                                onClick={()=>setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 
                                text-gray-400 hover:text-gray-600 transition-colors"
                                disabled={loading}>
                                    {showPassword ? <EyeOff className="h-5 w-5"/> : <Eye className="h-5 w-5"/>}
                                </button>
                                </div>
                                {formData.password && (
                                    <div className="mt-3 space-y-2 p-3 bg-gray-50 rounded-lg">
                                        <p className="text-sm font-medium text-gray-700">Password Requirements:</p>
                                        <PasswordRequirement met={passwordValidation.minLength} text="At least 8 characters"/>
                                         <PasswordRequirement met={passwordValidation.hasUpperCase} text="At least One Uppercase letter"/>
                                          <PasswordRequirement met={passwordValidation.hasLowerCase} text="At least One Lowercase letter"/>
                                           <PasswordRequirement met={passwordValidation.hasNumbers} text="At least One number"/>
                                    </div>
                                )}
                                 </div>
                        <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Confirm password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"/>
                                   <input type={showConfirmPassword ? 'text' : 'password'}
                                    name="confirmPassword" 
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 
                                    focus:border-blue-500 transition-colors" 
                                    placeholder="Confirm you password"
                                    disabled={loading}/>
                                <button 
                                type="button"
                                onClick={()=>setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 
                                text-gray-400 hover:text-gray-600 transition-colors"
                                disabled={loading}>
                                    {showConfirmPassword ? <EyeOff className="h-5 w-5"/> : <Eye className="h-5 w-5"/>}
                                </button>
                                </div>
                                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                                    <p className="mt-2 text-sm text-red-600">Password do not match</p>
                                )}
                                </div>
                                <div className="flex items-start">
                                    <input type="checkbox"
                                    id="acceptTerms" 
                                    checked={acceptTerms}
                                    onChange={(e) => setAcceptTerms(e.target.checked)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"/>
                                    <label htmlFor="acceptTerms" className="ml-3 text-sm text-gray-600">
                                        I agree to the {' '}
                                        <button type="button"
                                        className="text-blue-600 hover:text-blue-800 transition-colors">
                                            Terms of Service
                                        </button> {' '}
                                        and {' '}
                                        <button type="button" className="text-blue-600 hover:text-blue-800 transition colors">
                                            Privacy Policy
                                        </button>
                                    </label>
                                </div>
                                <button type="submit"
                                disabled={loading || !passwordValidation.isValid || formData.password !== formData.confirmPassword
                                    || !acceptTerms
                                }
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed
                            text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center">
                                {loading ? (
                                    <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    Creating account....
                                    </>
                                ):(
                                    'Create Account'
                                )}
                    </button>
                    
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Already have an Account?{' '}
                            <button
                            onClick={onSwitchToLogin}
                            className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                                Sign In
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;