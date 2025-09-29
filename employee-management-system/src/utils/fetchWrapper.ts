

type FetchOptions = RequestInit & {
    redirectOnUnauthorized?: boolean;
};

/**
 * @param url The URL to fetch
 * @param options the fetch options
 * @returns the fetch response
 */

export async function fetchWrapper<T>(
    url:string,
    options:FetchOptions ={}
):Promise<T> {
    //set default options to redirect on 401
    const {redirectOnUnauthorized = false, ...fetchOptions} = options;

    //Always include credentials to send cookie with requests
    const requestOptions:RequestInit ={
        ...fetchOptions,
        credentials:'include',
    };
    try {
        const response = await fetch(url,requestOptions);

        //Handle 401 unauthorized errors
        if(response.status ==401){
            if (redirectOnUnauthorized) {
                //store the current location to redirect back after login
                const currentPath = window.location.pathname;

                //only store path if it's not already the login page
                if (currentPath !== "/login") {
                    sessionStorage.setItem('redirectAfterLogin',currentPath);
                }

                //redirect to login page
                window.location.href="/login";
                throw new Error("Athentication required. Redirecting to login page.");
            } else{
                //if redirectOnUnauthorized is false, just throw an error
                throw new Error ("Authentication required. Please log in.(401 unauthorized)");
            }
        }

        //Handle other error status code
        if (!response.ok) {
            let errorMessage = `API Error: ${response.status} ${response.statusText}`;

            try {
                // try to get error details from response body
                const errorData = await response.json();
                console.error("Error response data:", errorData);


                // if the server returns a specific error message, use it
                if (errorData.message) {
                    errorMessage = errorData.message;
                } else if (errorData.error) {
                    errorMessage = errorData.error;
                } else if (typeof errorData === 'string') {
                    errorMessage = errorData;
                }
            } catch (jsonError) {
                // if response isn't josn , try to get it as text
                try {
                    const errorText = await response.text();
                    console.error("Error response text:",errorText);
                    if (errorText) {
                        errorMessage = errorText;
                        
                    }
                } catch (textError) {
                    console.error("could not parse error response:",textError)
                }
            }

            throw new Error(errorMessage);
        }

        // pasre JSON response for successfu; request
        const data: T = await response.json();
        return data;
    } catch (error) {
        console.error("Fetch Error", error);
        throw error;
        
    }
    
}
