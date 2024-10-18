import mongoose, { Schema, Document } from 'mongoose';

export interface IAnalyticsData extends Document {
  feature: string;
  totalTimeSpent: number;
  date: Date;
}

const AnalyticsDataSchema: Schema = new Schema({
  feature: { type: String, required: true },
  totalTimeSpent: { type: Number, required: true },
  date: { type: Date, required: true }
});

export default mongoose.models.AnalyticsData || mongoose.model<IAnalyticsData>('AnalyticsData', AnalyticsDataSchema);
