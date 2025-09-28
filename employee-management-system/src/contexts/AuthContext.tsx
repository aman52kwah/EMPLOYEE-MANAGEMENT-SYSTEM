import React,{createContext,useContext,useState,useEffect} from "react";
import {User,AuthState} from '../types';

interface AuthContextType extends AuthState{
    login:(email: string, password: string)=>Promise<boolean>;
    signup:(email: string, password:string,firstName:string,lastName:string)=>Promise<boolean>;
    logout:()=>void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth= ()=>{
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

//MOCK USERS FOR demo purposes
const mockUsers:(User &{password:string})[]= [
    {
        id:'1',
        email:'admin@company.com',
        password:'admin123',
        firstName:'Admin',
        lastName:'user',
        role:'admin',
    },

    {
        id:'2',
        email:'manager@company.com',
        password:'manager123',
        firstName:'Manager',
        lastName:'User',
        role:'admin',
    },
]


export const AuthProvider: React.FC<{children: React.ReactNode}>=({children})=>{
    const [authState,setAuthState]=useState<AuthState>({
        isAuthenticated:false,
        user:null,
        loading:false,
    });

    useEffect(()=>{
        //check for stored authentication on app load
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                setAuthState({
                    isAuthenticated:true,
                    user,
                    loading:false,
                });
            } catch (error) {
                localStorage.removeItem('user');
                    setAuthState({
                        isAuthenticated:false,
                        user:null,
                        loading:false,
                    });
            }
        }else {
            setAuthState((prev:any )=> ({...prev, loading:false}));
        }

    },[]);
    const login = async (email:string, password:string):Promise<boolean>=>{
        setAuthState(prev => ({...prev,loading:true}));
    
    
    //simulate API calls delay
    await new Promise(resolve => setTimeout(resolve,1000));

        const user = mockUsers.find(u => u.email === email && u.password === password);

        if(user){
            const {password:_,...userWithoutPassword} = user;

            setAuthState({
                isAuthenticated:true,
                user:userWithoutPassword,
                loading:false,
            });

            localStorage.setItem('user',JSON.stringify(userWithoutPassword));
            return true;
        }else {
            setAuthState((prev:any )=>({...prev, loading:false}));
            return false;
        }

    };

    const signup = async (
        email:string,
        password:string,
        firstName:string,
        lastName:string,
    ):Promise<boolean> => {
        setAuthState((prev: any)=>({...prev,loading:true}));

        //simulate API call delay

        await new Promise (resolve => setTimeout(resolve,1000));

        //check if user already exists
        const existingUser = mockUsers.find(u => u.email === email);
        if(existingUser){
            setAuthState((prev:any )=> ({...prev, loading:false}));
            return false;
        }
         // create new User
         const newUser : User ={
            id:Date.now().toString(),
            email,
            firstName,
            lastName,
            role:'employee',
         };

         //Addd to mock users (in real app, this would be an API call)
         mockUsers.push({...newUser,password});

         setAuthState({
            isAuthenticated:true,
            user:newUser,
            loading:false,
         });
         localStorage.setItem('user',JSON.stringify(newUser));
         return true;
    };

    const logout = () => {
        setAuthState({
            isAuthenticated: false,
            user:null,
            loading:false,
        });
        localStorage.removeItem('user');
    };

    const value:  AuthContextType ={
        ...authState,
        login,
        signup,
        logout,
    };
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );

};