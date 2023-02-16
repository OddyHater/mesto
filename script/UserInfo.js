export default class UserInfo {
  constructor({userNameSelector, userDescriptionSelector}) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userDescriptionElement = document.querySelector(userDescriptionSelector);
  }

  getUserInfo() {
    return {
      userName: this._userNameElement.value,
      userDescription: this._userDescriptionElement.value
    }
  }

  setUserInfo({newUserName, newUserDescription}) {
    this._userNameElement.value = newUserName;
    this._userDescriptionElement = newUserDescription;
  }
}