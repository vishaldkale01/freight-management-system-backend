module.exports = function (sequelize, DataTypes) {
    const Vehicle = sequelize.define('vehicles', {
        vehicle_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        registrationNumber: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        vehicleType: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        capacityTons: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        currentLocation: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        available: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        driver_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'drivers', 
            key: 'driver_id',
          },
        },
      },{
        timestamps: true,
        underscored: true,
      })
      return Vehicle 
}
