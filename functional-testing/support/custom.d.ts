declare global {
    namespace NodeJS {
        interface Global {
            accessToken: string;
            intElementsTimeout: number;
            // Add variables that would be used globally per instance
        }
    }
}
export default global;