export interface ISignUpBody{
    email: string;
    password: string;
    returnSecureToken: boolean;
}

export interface IAuthResponce{    
        kind?: string;
        idToken: string;
        email: string;
        refreshToken: string;
        expiresIn: string;
        localId: string ; 
        registered?:boolean;  
}

