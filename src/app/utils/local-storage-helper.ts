export class LocalStorageHelper {

    public static setObject(name: string, object: any) {
        localStorage.setItem(name, JSON.stringify(object))
    }

    public static getObject(name: string) {
        let item = localStorage.getItem(name) as string
        try { return JSON.parse(item) } 
        catch (error) { return {} }
    }

    public static isLoggedIn() {
        return localStorage.getItem("user")
    }
}