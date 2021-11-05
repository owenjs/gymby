import Joi from "joi";

export default () => {
  Joi.objectId = require("joi-objectid")(Joi);
};
