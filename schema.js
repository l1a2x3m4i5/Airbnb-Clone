const Joi = require("joi");

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    price: Joi.number().min(0).required(),
    image: Joi.alternatives()
      .try(
        Joi.string().allow("", null),
        Joi.object({ url: Joi.string().allow("", null) }).unknown(true)
      )
      .optional(),
  }).required(),
});
