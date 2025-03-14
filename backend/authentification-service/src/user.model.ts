export default interface User {
    id : string;
    username: string;
    // Encrypted password
    password: string;
    // User role
    role: string;
    created_at: Date;
}
