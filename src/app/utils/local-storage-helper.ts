export class LocalStorageHelper {

    public static setObject(name: string, object: any) {
        localStorage.setItem(name, JSON.stringify(object))
    }

    public static getObject(name: string) {
        try { 
            let data = localStorage.getItem(name) as string
            data = JSON.parse(data) 
            return data
        } 
        catch (error) { return {} }
    }

    public static getArrayObject(name: string) {
        let dataArray = this.getObject(name)
        return Array.isArray(dataArray) ? dataArray : []
    }
}