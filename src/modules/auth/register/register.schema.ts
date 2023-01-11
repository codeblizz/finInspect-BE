import { Schema, Document, model, Model } from 'mongoose';

export interface RegisterAttrs {
	email: string;
	password: string;
}

export interface RegisterModel extends Model<RegisterDocument> {
	addOne(doc: RegisterAttrs): RegisterDocument;
}

export interface RegisterDocument extends Document {
	email: string;
	password: string;
	createdAt: string;
	// updatedAt: string;
}

export const RegisterSchema: Schema = new Schema(
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

RegisterSchema.statics.addOne = (doc: RegisterAttrs) => {
	return new Register(doc);
};

export const Register = model<RegisterDocument, RegisterModel>('Register', RegisterSchema);