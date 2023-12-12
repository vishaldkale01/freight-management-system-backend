const Joi = require("joi");

const CompanySchema = Joi.object({
  // let check ! 1st
  Admin_id: Joi.number().required(),
  business_type: Joi.number().required(),
  // business_logo : Joi.string().uri()
  contact_person_full_name: Joi.string().min(3).max(150).required(),
  phone: Joi.number().required().messages({
    'number.base': `"numericField" must be a number`,
    'any.required': `"phone numericField" is required`,
  }),
  email: Joi.string()
  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net' , 'in'] } }), 
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  repeat_password: Joi.ref("password"),
}).unknown(true).with('password', 'repeat_password');

const AuthSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required(),
 // panel: Joi.string().required(),
});
const AuthRegisterSchema = Joi.object()
  .keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .required(),
    password: Joi.string().required(),
  })
  .unknown(true);

module.exports = { CompanySchema , AuthSchema, AuthRegisterSchema }; 