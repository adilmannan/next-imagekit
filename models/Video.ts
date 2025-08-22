import mongoose, { Schema, models, model } from "mongoose";

export const VIDEO_DIMENSIONS = {
  width: 1080,
  hieght: 1920,
} as const;

export interface IVideo {
  _id?: mongoose.Types.ObjectId;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  controls?: boolean;
  transformation?: {
    hieght: number;
    widht: number;
    quality: number;
  };
}

const videSchema = new Schema<IVideo>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    controls: { type: Boolean, default: true },
    transformation: {
      hieght: { type: Number, default: VIDEO_DIMENSIONS.hieght },
      widht: { type: Number, default: VIDEO_DIMENSIONS.width },
      quality: { type: Number, min: 1 , max: 100}
    },
  },
  {
    timestamps: true,
  }
);

const Video = models?.Video || model<IVideo>("Video", videSchema)

export default Video