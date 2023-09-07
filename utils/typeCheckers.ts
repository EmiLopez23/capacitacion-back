export function validateRegisterData(user: any): asserts user is { username: string, password: string, email: string } {
    if(!user.username || !user.password || !user.email) {
        throw new Error("Missing fields");
    }
    
    if (typeof user.username !== "string" || typeof user.password !== "string" || typeof user.email !== "string") {
        throw new Error("Invalid data type");
    }
}


export function validateLoginData(user: any): asserts user is { email: string, password: string } {
    if(!user.email || !user.password) {
        throw new Error("Missing fields");
    }
    
    if (typeof user.email !== "string" || typeof user.password !== "string") {
        throw new Error("Invalid data type");
    }
}