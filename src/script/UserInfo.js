export class UserInfo {
  constructor({userNameSelector, userDescriptionSelector}) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userDescriptionElement = document.querySelector(userDescriptionSelector);
  }

  getUserInfo() {   
    return {
      userName: this._userNameElement.textContent,
      userDescription: this._userDescriptionElement.textContent
    };
  }

  

  setUserInfo({name, link}) {  
    this._userNameElement.textContent = name;
    this._userDescriptionElement.textContent = link;
  }
}