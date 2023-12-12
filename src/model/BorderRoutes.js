module.exports = function (sequelize, DataTypes) {
  const BorderRoute = sequelize.define(
    'borderRoutes',
    {
        route_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
      // Fields for Add
      originCountry: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'countries', 
          key: 'country_id',
        }},
      originState: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'states', 
          key: 'state_id',
        }} ,
      originCity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'citys', 
          key: 'city_id',
        }
      },
      destinationCountry: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'countries', 
          key: 'country_id',
        }} ,

      destinationState: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'states', 
          key: 'state_id',
        }} ,
      destinationCity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'citys', 
          key: 'city_id',
        }
      }  ,
      totalFare: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      border_id :  {
        type : DataTypes.INTEGER
      }
      // Fields for Add Borders
      // border: {
      //   type: DataTypes.JSON, // Assuming you want to store an array of objects for borders
      //   // defaultValue: [],
      //   allowNull : true
      // },
    },
    {
      timestamps: true,
      underscored: true,
    }
  ); return BorderRoute  
};