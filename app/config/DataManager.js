import { users } from "./users";
import { images } from "./images";

export default class DataManager {
    static myInstance = null;
    session = null;
    static getInstance() {
        if(DataManager.myInstance == null) {
            DataManager.myInstance = new DataManager();
        }
        return this.myInstance;
    }
    /**
     * 
     * @param {*} user - user object trying to login
     */
    login(user) {
        this.session = user;
        console.log("session")
        console.log(this.session)
    }

    logout() {
        this.session = null;
    }

    register(user) {
        users.push(user);
        console.log("after register")
        console.log(users);
    }

    getUserID() {
        if(this.session) {
            return this.session.id;
        }
        return null;
    }
}