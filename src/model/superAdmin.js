  module.exports = function (sequelize, DataTypes) {
  const SuperAdmin = sequelize.define(
    "superAdmin",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_name: {
        type: DataTypes.STRING(100),
      },
      phone: {
        type: DataTypes.BIGINT(12),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING(100),
      },
      city: {
        type: DataTypes.STRING,
      },
      state: {
        type: DataTypes.STRING,
      },
      pincode: {
        type: DataTypes.STRING(10),
      },
      address: {
        type: DataTypes.STRING,
      },
      country_id: {
        type: DataTypes.INTEGER,
      },
      currency_code: {
        type: DataTypes.STRING(5),
      },
      
      slug: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.TINYINT,
        defaultValue: 0,
      },
      description: {
        type: DataTypes.STRING,
      },
      remarks: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
      underscored: true,
      defaultScope: {
        attributes: { exclude: ["password"] },
      },
    }
  );
  return SuperAdmin;
};
