import {Schema, model, Document} from 'mongoose';

//Define an interface for a cart item, extending Mongoose's Document


//Definer an interface for the Item document, extending Mongoose's Document
interface IItem extends Document { 
    name: string;
    imagePath: string;
    price: number;
    tags: string[];
}

// Define the schema for the Item document
const itemSchema = new Schema<IItem>(
    {
        _id: {
            type: Number,
        },
        name: {
            type: String,
            required: true,
            unique: true,
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
