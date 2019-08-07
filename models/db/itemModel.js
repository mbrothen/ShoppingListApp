const mongoose = require('mongoose');

// Search for item
const itemSchema = mongoose.Schema({
    userId: String,
    itemId: String,
    itemName: String,
    itemDescription: String,
    itemCategory: String,
    purchaseDates: [Date],
    usedDates: [Date],
    shoppingListQty: {type: Number, default:0},
    pantryListQty: {type: Number, default:0}    
});
module.exports = mongoose.model('Item', itemSchema);