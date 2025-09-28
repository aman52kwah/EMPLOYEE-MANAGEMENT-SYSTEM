import React,{useState} from 'react';
import {Eye,EyeOff,Mail,Lock,Building2,AlertCircle} from 'lucide-react';
import {useAuth} from '../contexts/AuthContext';

interface LoginFormProps{
    onSwitchToSignup: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({onSwitchToSignup})=>{
    const {login,loading} = useAuth();
    const[formData, setFormData] = useState({
        email:'',
        password:'',
    });

    const[showPassword,setShowPassword] = useState(false);
    const [error,setError]= useState('');


    const handleSubmit= async (e: React.FormEvent) =>{
        e.preventDefault();
        setError('');


        if (!formData.email || !formData.password) {
            setError('please fill in all fields');
            return;
        }
        const success = await login(formData.email, formData.password);
        if (!success) {
            setError('Invalid email or password')
        }
    };

    const handleChange =(e: React.ChangeEvent<HTMLInputElement>) => {
        const{name, value} = e.target;
        setFormData(prev => ({...prev,[name]:value}));
        if(error) setError('');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 
        flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-blue-600 rounded-full">
                            <Building2 className='h-8 w-8 text-white'/>
                        </div>
                    </div>
                    <h1 className='text-3xl font-bold text-gray-900 mb-2'>Employee Management System</h1>
                    <p className="text-gray-600">Sign in to your Employee Management account</p>
                </div>

                {/* demo credentials */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <h3 className="text-sm font-medium text-blue-800 mb-2">Demo Credentials</h3>
                    <div className="text-sm text-blue-700 space-y-1">
                        <p><strong>Admin: </strong>admin@company.com/admin123</p>
                        <p><strong>Manager: </strong>manager@company.com/admin123</p>
                    </div>
                </div>

                {/* login Form*/}
                <div className="bg-white rounded xl shadow-lg border border-gray-200 p-8">
                    <form onSubmit={handleSubmit} className='space-y-6'>
                        {error && (
                            <div className="bg-red-50 border bordr-red-200 rounded-lg p-4 flex items-center">
                                <AlertCircle className='h-5 w-5 text-red-600 mr-3 flex-shrink-0' />
                                <p className="text-red-700 text-sm">{error}</p>
                            </div>
                        )}

                        <div>
                            <label  className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className='absolute left-3 top-1/2 transform 
                                -translate-y-1/2 text-gray-400 h-5 w-5'/>
                                <input
                                    type="email"
                                    name='email'
                                    value={formData.email}
                                    onChange={handleChange}
                                    className='w-full pl-20 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 
                                    focus:ring-blue-500 focus:border-blue-500 transition-colors'
                                    placeholder='Enter your email'
                                    disabled={loading}
                                
                                />
                            </div>
                        </div>

                        <div>
                            <label  className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className='absolute left-3 top-1/2 transform 
                                -translate-y-1/2 text-gray-400 h-5 w-5'/>
                                <input
                                    type={showPassword ? 'text' :'password'}
                                    name='password'
                                    value={formData.password}
                                    onChange={handleChange}
                                    className='w-full pl-20 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 
                                    focus:ring-blue-500 focus:border-blue-500 transition-colors'
                                    placeholder='Enter your password'
                                    disabled={loading}
                                
                                />

                                <button
                                type='button'
                                onClick={() => setShowPassword(!showPassword)}
                                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-40 hover:text-gray-600 transition-colors'
                                disabled={loading}>
                                       {showPassword ? <EyeOff className='h-5 w-5'/> : <Eye className='h-5 w-5'/>} 
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <label 
                             className="flex items-center">
                                <input type="checkbox"
                                className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded' />
                                <span className="ml-2 text-sm text-gray-600">Remember me</span>
                             </label>
                             <button
                             type='button'
                             className='text-sm text-blue-600 hover:text-blue-800 transition-colors'>
                                Forgot password ?
                             </button>
                        </div>

                        <button
                        type='submit'
                        disabled={loading}
                        className='w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white
                        py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center'>
                            {loading ? (
                                <>
                                <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2'>
                                Signing in ...
                                </div>
                                </>
                            ): (
                                'Sign in'
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Don't have and account ? {''}
                            <button
                            onClick={onSwitchToSignup}
                            className='text-blue-600 hover:text-blue-800 font-medium transition-colors'>
                                Sign up
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default LoginForm;