import { makeAutoObservable } from "mobx";
export default class UserStore {
  constructor() {
    this._isAdmin = false;
    this._isUser = false;
    this._user = {};
    makeAutoObservable(this);
  }

  setIsUser(bool) {
    this._isUser = bool;
  }
  setisAdmin(bool) {
    this._isAdmin = bool;
  }
  setUser(user) {
    this._user = user;
  }

  get isUser() {
    return this._isUser;
  }
  get isAdmin() {
    return this._isAdmin;
  }
  get user() {
    return this._user;
  }
}
