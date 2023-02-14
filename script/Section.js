export class Section {
    constructor({items, renderer}, containerSelector) {
        this._data = items;
        this.renderer = renderer;
        this._containerNode = document.querySelector(containerSelector);
    };

    addItem() {
        console.log(this._data);    
        this._data.forEach(element => {
            this.renderer(element, this._containerNode);
        });
    }
}