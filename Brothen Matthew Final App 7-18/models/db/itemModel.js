const mongoose = require('mongoose');

// Search for item
const itemSchema = mongoose.Schema({
    userId: Schema.types.ObjectId,
    itemId: Schema.Types.ObjectId,
    itemName: String,
    itemDescription: String,
    itemCategory: String,
    purchaseDates: [Date],
    usedDates: [Date],
    shoppingListQty: Number,
    pantryListQty: Number,
    
});
module.exports = mongoose.model('Item', itemSchema);