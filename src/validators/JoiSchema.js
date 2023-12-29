const Joi = require("joi")
const driverSchema = Joi.object({
    name: Joi.string().required(),
    contactNumber: Joi.string().required(),
    whatsappNumber: Joi.string().required(),
    email: Joi.string().email().required(),
    address1: Joi.string().required(),
    address2: Joi.string().required(),
    country: Joi.string().required(),
    state: Joi.string().required(),
    city: Joi.string().required(),
  }).unknown(true);

  const driverDocumentSchema = Joi.object({
    documentType: Joi.string().required(),
    documentPath: Joi.string().required(),
    driver_id: Joi.number().integer().required(),
  }).unknown(true);

  const countriesJoiSchema = Joi.object({
    country_name: Joi.string().required(),
  });

  const statesJoiSchema = Joi.object({
    state_name: Joi.string().required(),
    country_id: Joi.number().integer().positive().required(),
  });

  const cityJoiSchema = Joi.object({
    city_name: Joi.string().max(255).required(),
    state_id: Joi.number().integer().positive().required(),
  });


const vehicleJoiSchema = Joi.object({
  vehicle_id: Joi.number().integer().positive(),
  registrationNumber: Joi.string().required(),
  vehicleType: Joi.string().required(),
  capacityTons: Joi.number().positive().required(),
  currentLocation: Joi.string().allow(null),
  available: Joi.boolean().required(),
  driver_id: Joi.number().integer().positive().required(),
});

const bookings = Joi.object({
  customer_id: Joi.number().integer().positive().required(),
  customerCreditLimit: Joi.number().positive().required(),
  customerCreditUsed: Joi.number().positive().required(),
  client_id: Joi.number().integer().positive().required(),
  routeName: Joi.string().required(),
  routeFare: Joi.number().positive().required(),
  allBordersFare: Joi.number().positive().required(),
  driver_id: Joi.number().integer().positive().required(),
  remarkOnDriver: Joi.string().required(),
  amountPaidToDriver: Joi.number().positive().required(),
  attitude: Joi.string().valid('Positive', 'Negative', 'Neutral').required(),
}).unknown(true)

  module.exports = {driverSchema , driverDocumentSchema , countriesJoiSchema , statesJoiSchema , cityJoiSchema , vehicleJoiSchema , bookings}