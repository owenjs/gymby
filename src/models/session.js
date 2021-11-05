import mongoose from "mongoose";
import Joi from "joi";

export const Session = mongoose.model(
  "Session",
  new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    startDate: {
      type: Date,
      required: true,
      default: Date.now
    },
    endDate: {
      type: Date
    },
    duration: {
      type: Number,
      min: 0
    }
  })
);

export const validateSession = session => {
  const schema = Joi.object({
    startDate: Joi.date(),
    endDate: Joi.date()
  });

  return schema.validate(session);
};
