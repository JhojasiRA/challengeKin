declare global {
    namespace NodeJS {
        interface Global {
            lastStep:string;
            lastError: string;
            accessToken: string;
            accessToken2: string;
            accessToken3: string;   
            Token:string;
            intElementsTimeout: number;
        }
    }
}
export default global;