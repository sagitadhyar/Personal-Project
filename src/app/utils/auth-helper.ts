import { LocalStorageHelper } from "./local-storage-helper";

export interface User {
    username: string;
    nip: string;
    email: string;
    password: string;
}

export class AuthHelper {

    public static login(email: string, pass: string){
        const users: Array<User> = this.getUsers()
        const found = users.find(e => e.email === email)

        if(!found) return

        return found.password === this.hashPassword(pass)
    }

    public static signup(user: User){
        user.password = this.hashPassword(user.password) as string

        const users: Array<User> = this.getUsers()
        users.push(user)
        LocalStorageHelper.setObject("users", users)
    }

    public static changePassword(email: string, newPassword: string){
        const users: Array<User> = this.getUsers()
        const found = users.find(e => e.email === email)
        if(!found) return
        
        // Update the password
        found.password === this.hashPassword(newPassword)
        
        LocalStorageHelper.setObject("users", users)
    }

    private static hashPassword(pass: string) {
        var hash = 0;
        if (this.length == 0) {
            return hash;
        }
        for (var i = 0; i < this.length; i++) {
            var char = pass.charCodeAt(i);
            hash = ((hash<<5)-hash)+char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash.toString();
    }

    public static getUsers(){
        return LocalStorageHelper.getArrayObject("users")
    }


    public static isLoggedIn() {
        return localStorage.getItem("user")
    }
    

}