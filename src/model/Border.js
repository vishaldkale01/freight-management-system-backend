module.exports = function (sequelize, DataTypes) {
const Border = sequelize.define('border', {
    borderName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Country_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'countries', 
        key: 'Country_id',
      },
    },
    charges : {
      type : DataTypes.INTEGER ,
      allowNull : false , 
      defaultValue : 0 
    },
    type : {
      type : DataTypes.ENUM("IN" , "OUT") ,
      allowNull : false , 
      defaultValue : "IN" 
    }
  },{
    timestamps: true,
    underscored: true,
  }); return Border
}