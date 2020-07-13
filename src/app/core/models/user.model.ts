export interface User {
    _id: string;
    email: string;
    username: string;
    password?: string;
    id: string;
}

export interface UserArray {
    users: User[];
}