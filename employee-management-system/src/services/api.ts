import { fetchWrapper } from "../utils/fetchWrapper";

const API_URL = process.env.API_BASE_URL

export type RegisterParams ={
    firstName:string;
    lastName:string;
    email:string;
    password:string;
}

export type AuthResponse ={
    user:{
        id: string;
        email:string;

    };
    message:string;
};

//types for login
export type LoginParams = {
    email:string;
    password:string;
};

//login with email and password
export async function login(params:LoginParams):Promise<AuthResponse | undefined> {
    try {
        const data = await fetchWrapper<AuthResponse>(`${API_URL}/login`, {
            method: 'POST',
            credentials: 'include',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(params)
        });
        return data;
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
    
}

export async function register(params:LoginParams):Promise<AuthResponse | undefined>{
    try {
        const data = await fetchWrapper<AuthResponse>(`${API_URL}/register`,{
            method:"POST",
            credentials:'include',
            headers:{"Content-Type":"application"},
            body:JSON.stringify(params),
            //don't redirect on unauthorized or registration
            //redirectOnUnauthorized:false,
        });
         return data;

    } catch (error) {
        console.error("Registration failed:",error);
        throw error;
    }
}

// === logout the current user ====

export async function logout(
    localStorage:Storage,
    window:Window & typeof globalThis,
    p0:{localStorage:Storage; "": string; window:Window & typeof globalThis}
):Promise<void>{
    try {
        await fetchWrapper<AuthResponse>(`${API_URL}/logout`,{
            method:"POST",
            credentials:'include',
        });
        localStorage.removeItem("session"); // clear token from local storage
        window.location.href ="/login";
    } catch (error) {
        console.error("Failed to logout:", error);
        //still redirect to login even if logout request fails
        localStorage.removeItem("sesion");
        window.location.href ="/login";
    }
}


//check if the user is authenticated
//this would make a request to verify the sesion
export async function checkAuth():Promise<boolean> {
    try {
        const response = await fetch (
            `${API_URL}/check`,
            {
                method:"GET",
                credentials:'include',
            }
        );const data :{isAuthenticated:boolean} = await response.json();
        return data.isAuthenticated
    } catch (error) {
        return false;
    }
}