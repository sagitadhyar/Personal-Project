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
        let errMessage = ""
        const foundExistingData = this.getUsers().find(e => {
            if(e.email === user.email) {
                errMessage = "Email sudah terdaftar"
                return true
            } else if(e.nip === user.nip) {
                errMessage = "NIP sudah terdaftar"
                return true
            } else if(e.username === user.username) {
                errMessage = "Username sudah terdaftar"
                return true
            }
            return false
        })
        if(foundExistingData) return errMessage

        user.password = this.hashPassword(user.password) as string

        const users: Array<User> = this.getUsers()
        users.push(user)

        // Simpan session
        LocalStorageHelper.setObject("user", user)
        // Update data users
        LocalStorageHelper.setObject("users", users)

        // Return empty if success
        return
    }

    public static changePassword(email: string, newPassword: string){
        const users: Array<User> = this.getUsers()
        const user = users.find(e => {
            if(e.email === email) {
                console.log("bef", e)
                e.password = this.hashPassword(newPassword) as string
                console.log("aft", e)
                return true
            }
            return false
        })
        if(!user) return false
        console.log("ret", user)
        
        // Simpan session
        LocalStorageHelper.setObject("user", user)
        // Update data users
        LocalStorageHelper.setObject("users", users)

        return true
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