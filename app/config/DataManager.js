import { users } from "./users";
import { images } from "./images";
import { categories } from "./categories";
export default class DataManager {
    static myInstance = null;
    session = null;
    imgList = [...images];
    userList = [...users];
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
        this.userList.push(user);
        console.log("after register")
        console.log(this.userList);
    }

    getLoggedInUser() {
        if(this.session) {
            return this.session;
        }
        return null;
    }

    getUserId() {
        if(this.session) {
            return this.session.id
        } else {
            return "";
        }
    }

    getAllUsers() {
        return this.userList;
    }

    getImages() {
        let signedInUserId = this.getUserId();
        if(this.imgList == null)
            return [];
        let currImgs = this.imgList.filter(img => img.userid === signedInUserId);
        return currImgs;
    }

    getCategories() {
        return categories;
    }

    addMemory(memory) {
        if(memory == null) {
            return;
        }
        this.imgList.push(memory);
        console.log(this.imgList);
    }

    deleteMemory(memory) {
        if(memory == null) {
            return;
        }
        //only signed in user can delete their own memory
        let signedInUserId = this.getUserId(); 
        this.imgList = this.imgList.filter(img => (img.id !== memory.id) && 
                                       (img.userid === signedInUserId));
        console.log(this.imgList);
    }

    updateMemory(memory) {
        if(memory == null) {
            return;
        }
        let signedInUserId = this.getUserId();
        this.imgList = this.imgList.map(img => {
            if(img.id === memory.id && img.userid === signedInUserId) {
                return memory;
            } else {
                return img;
            }
        });
        console.log(this.imgList);
    }
}