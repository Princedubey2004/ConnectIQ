import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IMessage extends Document {
  userId: mongoose.Types.ObjectId;
  recruiterId: mongoose.Types.ObjectId;
  content: string;
  goal: string;
  tone: string;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema: Schema<IMessage> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    recruiterId: {
      type: Schema.Types.ObjectId,
      ref: 'Recruiter',
      required: true,
    },
    content: {
      type: String,
      required: [true, 'Message content is required'],
    },
    goal: {
      type: String,
      enum: ['Internship', 'Full Time', 'Coffee Chat', 'Referral Request'],
      required: true,
    },
    tone: {
      type: String,
      enum: ['Professional', 'Friendly', 'Direct'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Message: Model<IMessage> = mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema);
