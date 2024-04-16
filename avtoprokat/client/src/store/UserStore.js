import { makeAutoObservable } from "mobx";
export default class UserStore {
  constructor() {
    this._isAuth = false;
    this._isUser = false;
    this._user = {};
    makeAutoObservable(this);
  }

  setIsUser(bool) {
    this._isUser = bool;
  }
  setIsAuth(bool) {
    this._isAuth = bool;
  }
  setUser(user) {
    this._user = user;
  }

  get isUser() {
    return this._isUser;
  }
  get isAuth() {
    return this._isAuth;
  }
  get user() {
    return this._user;
  }
}
