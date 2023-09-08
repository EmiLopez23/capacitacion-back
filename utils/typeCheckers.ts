export function validateRegisterDataTypes(user: any): asserts user is { username: string, password: string, email: string } {
    if(!user.username || !user.password || !user.email) {
        throw new Error("Missing fields");
    }
    
    if (typeof user.username !== "string" || typeof user.password !== "string" || typeof user.email !== "string") {
        throw new Error("Invalid data type");
    }
}


export function validateLoginDataTypes(user: any): asserts user is { email: string, password: string } {
    if(!user.email || !user.password) {
        throw new Error("Missing fields");
    }
    
    if (typeof user.email !== "string" || typeof user.password !== "string") {
        throw new Error("Invalid data type");
    }
}


export function validateSendEmailDataTypes(email: any): asserts email is { to: string, subject: string, content: string } {
    if(!email.to || !email.subject || !email.content) {
        throw new Error("Missing fields");
    }
    
    if (typeof email.to !== "string" || typeof email.subject !== "string" || typeof email.content !== "string") {
        throw new Error("Invalid data type");
    }
}