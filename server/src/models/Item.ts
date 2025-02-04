import {Schema, model, Document} from 'mongoose';

//Define an interface for a cart item, extending Mongoose's Document
interface ICartItem extends Document {
    item: Schema.Types.ObjectId;
    quantity: number;
}
//Define the schema for a cart item (used within the Item schema, but no standalone model)
const cartItemSchema = new Schema<ICartItem>(
    {
        item: {
            type: Schema.Types.ObjectId,
            ref: 'Item',
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
        },
    },
    {
        _id: false, // Prevents Mongoose from automatically creating an _id field for embedded documents
        toJSON: { getters: true }, // Ensures virtuals and getters are included when converting to JSON
        toObject: { getters: true }, // Ensures virtuals and getters are included when converting to a JavaScript object
        timestamps: true, // Adds createdAt and updatedAt timestamps
    }
);

//Definer an interface for the Item document, extending Mongoose's Document
interface IItem extends Document { 
    name: string;
    description: string;
    imagePath: string;
    price: number;
    tags: string[];
    CartItem: ICartItem[];
}

// Define the schema for the Item document
const itemSchema = new Schema<IItem>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        imagePath: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        tags: {
            type: [String],
            default: [],
        },
        CartItem: [cartItemSchema],
    },
    {
        timestamps: true,
        toJSON: {getters: true},
        toObject: {getters: true},
    }
);

//Create and export the Item model
const Item = model<IItem>('Item', itemSchema);

export default Item;
