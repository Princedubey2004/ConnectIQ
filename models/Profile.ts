import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProfile extends Document {
  userId: mongoose.Types.ObjectId;
  fullName: string;
  college?: string;
  degree?: string;
  graduationYear?: string;
  skills: string[];
  targetRoles: string[];
  targetCompanies: string[];
  resumeUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  githubUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProfileSchema: Schema<IProfile> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      default: '',
    },
    college: { type: String, default: '' },
    degree: { type: String, default: '' },
    graduationYear: { type: String, default: '' },
    skills: { type: [String], default: [] },
    targetRoles: { type: [String], default: [] },
    targetCompanies: { type: [String], default: [] },
    resumeUrl: { type: String, default: '' },
    linkedinUrl: { type: String, default: '' },
    portfolioUrl: { type: String, default: '' },
    githubUrl: { type: String, default: '' },
  },
  { timestamps: true }
);

export const Profile: Model<IProfile> = mongoose.models.Profile || mongoose.model<IProfile>('Profile', ProfileSchema);
