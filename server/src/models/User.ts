import {Schema, model, Document} from 'mongoose';
import bcrypt from 'bcrypt';

// Define an interface for the User document
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
interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    cart: ICartItem[];
    isCorrectPassword(password: string): Promise<boolean>;
}

// Define the schema for the User document
const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must match an email address!'],
        },
        password: {
            type: String,
            required: true,
            minlength: 5,
        },
        cart: [
            {
                type: cartItemSchema,
                ref: 'CartItem',
            },
        ],
    },
    {
        timestamps: true,
        toJSON: {getters: true},
        toObject: {getters: true},
    }
);
// Middleware: Runs before saving a new user or modifying the password
userSchema.pre<IUser>('save', async function (next) {
    // Check if the password is new or modified before hashing
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;  // Defines the number of salt rounds for bcrypt hashing
        this.password = await bcrypt.hash(this.password, saltRounds); // Hash the password
    }

    next();
})
// Method to check if the entered password matches the stored hashed password
    userSchema.methods.isCorrectPassword = async function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};

const User = model<IUser>('User', userSchema);

export default User;