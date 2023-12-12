const { borderRoutes, citys, states, countries } = require("../../model");
// ! border
borderRoutes.belongsTo(citys, { foreignKey: 'source_city_id', as: 'sourceCity' });
borderRoutes.belongsTo(citys, { foreignKey: 'destination_city_id', as: 'destinationCity' });
 
// citys

citys.belongsTo(states, { foreignKey: 'state_id' });
citys.belongsTo(states, { foreignKey: 'state_id' });

citys.belongsTo(states, { foreignKey: 'state_id' });

countries.hasMany(states, { foreignKey: 'country_id', as: 'states' });
