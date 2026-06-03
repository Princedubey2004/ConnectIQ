import mongoose, { Schema, Document, Model } from 'mongoose';

export type RecruiterStatus = 'To Contact' | 'Contacted' | 'Followed Up' | 'Interview Scheduled' | 'Offer' | 'Rejected';

export interface IRecruiter extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  role: string;
  company: string;
  status: RecruiterStatus;
  linkedinUrl?: string;
  lastContactDate?: Date;
  nextFollowUpDate?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const RecruiterSchema: Schema<IRecruiter> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Please provide a name'],
    },
    role: {
      type: String,
      required: [true, 'Please provide a role'],
    },
    company: {
      type: String,
      required: [true, 'Please provide a company name'],
    },
    status: {
      type: String,
      enum: ['To Contact', 'Contacted', 'Followed Up', 'Interview Scheduled', 'Offer', 'Rejected'],
      default: 'To Contact',
    },
    linkedinUrl: {
      type: String,
    },
    lastContactDate: {
      type: Date,
    },
    nextFollowUpDate: {
      type: Date,
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export const Recruiter: Model<IRecruiter> = mongoose.models.Recruiter || mongoose.model<IRecruiter>('Recruiter', RecruiterSchema);
