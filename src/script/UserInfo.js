export class UserInfo {
  constructor({userNameSelector, userDescriptionSelector, userAvatarSelector}) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userDescriptionElement = document.querySelector(userDescriptionSelector);
    this._userAvatarElement = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {   
    return {
      userName: this._userNameElement.textContent,
      userDescription: this._userDescriptionElement.textContent
    };
  }

  setUserInfo(item) {  
    this._userNameElement.textContent = item.name;
    this._userDescriptionElement.textContent = item.about;
    this._userAvatarElement.src = item.avatar
  }
}