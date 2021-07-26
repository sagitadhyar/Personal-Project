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
        const user = users.find(e => e.email === email)

        // Return false jika email tidak ditemukan
        if(!user) return false

        // Return true jika password sesuai dan simpan session di localstorage
        // Return false jika password tidak sesuai
        if(user.password === this.hashPassword(pass)) {
            LocalStorageHelper.setObject("user", user)
            return true
        }
        return false
    }
    
    public static logout(){
        localStorage.removeItem("user")
    }

    public static signup(user: User){
        user.password = this.hashPassword(user.password) as string

        const users: Array<User> = this.getUsers()
        users.push(user)

        // Simpan session
        LocalStorageHelper.setObject("user", user)
        // Update data users
        LocalStorageHelper.setObject("users", users)
    }

    public static changePassword(email: string, newPassword: string){
        const users: Array<User> = this.getUsers()
        const found = users.find(e => e.email === email)
        if(!found) return
        
        // Update password
        found.password === this.hashPassword(newPassword)
        
        LocalStorageHelper.setObject("users", users)
    }

    private static hashPassword(pass: string) {
        var hash = 0;
        if (pass.length == 0) {
            return "0";
        }
        for (var i = 0; i < pass.length; i++) {
            var char = pass.charCodeAt(i);
            hash = ((hash<<5)-hash)+char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash.toString();
    }

    public static getUsers(){
        return LocalStorageHelper.getArrayObject("users")
    }


    public static isLoggedIn() : User {
        return LocalStorageHelper.getObject("user") as User
    }
    

}