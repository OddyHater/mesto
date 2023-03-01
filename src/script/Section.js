export class Section {
  constructor({items, renderer}, containerSelector) {
    this._data = items;
    this.renderer = renderer;
    this._containerNode = document.querySelector(containerSelector);
  };

  addItem(element) {        
    this._containerNode.append(element);    
  }

  addItemReverse(element) {        
    this._containerNode.prepend(element);
  }

  renderItems() {
    this._data.forEach(element => {
      this.renderer(element);
    });
  }
}