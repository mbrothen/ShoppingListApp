export class Item {
    itemId: string;
    itemName: string = "";
    itemDescription: string = "";
    itemCategory: string = "";
    shoppingListQty: number;
    pantryListQty: number;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
