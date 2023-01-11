import { Schema, Document, model, Model } from 'mongoose';

export interface LoginAttrs {
	email: string;
	password: string;
}

export interface LoginModel extends Model<LoginDocument> {
	addOne(doc: LoginAttrs): LoginDocument;
}

export interface LoginDocument extends Document {
	email: string;
	password: string;
	createdAt: string;
	// updatedAt: string;
}

export const LoginSchema: Schema = new Schema(
	{
		email: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true
	}
);

LoginSchema.statics.addOne = (doc: LoginAttrs) => {
	return new Login(doc);
};

export const Login = model<LoginDocument, LoginModel>('Login', LoginSchema);