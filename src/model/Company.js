  module.exports = function (sequelize, DataTypes) {
  const Company = sequelize.define(
    "company",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      Admin_id: {
        type: DataTypes.INTEGER,
        foreignKey : true
      },
      
      business_type: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      business_logo: {
        type: DataTypes.STRING
      },
      business_name: {
        type: DataTypes.STRING(100),
      },
      contact_person_full_name: {
        type: DataTypes.STRING(100),
      },
      phone: {
        type: DataTypes.STRING(50),
        allowNull: false,
        
      },
      whatsapp_contact: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 0
      },

      password: {
        type: DataTypes.STRING,
      },
      subscription_type: {
        type: DataTypes.INTEGER(5),
        defaultValue: 0,
      },
      gateway_enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      gateway_type: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      gateway_merchant_id: {
        type: DataTypes.STRING,
      },
      gateway_api_key: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING(100),
      },
      citys: {
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
      subscription_type: {
        type: DataTypes.TINYINT(1),
        defaultValue: 0,
      },
      start_at: {
        type: DataTypes.DATE,
      },
      expiry_at: {
        type: DataTypes.DATE,
      },
      renewed_at: {
        type: DataTypes.DATE,
      },
      country_id: {
        type: DataTypes.INTEGER,
      },
      currency_code: {
        type: DataTypes.STRING(5),
      },
      currency_symbol: {
        type: DataTypes.STRING(5),
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
  return Company;
};
