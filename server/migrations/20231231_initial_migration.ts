const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }: any) => {
    queryInterface.createTable('stations', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      station_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name_in_finnish: {
        type: DataTypes.STRING,
      },
      name_in_swedish: {
        type: DataTypes.STRING,
      },
      name_in_english: {
        type: DataTypes.STRING,
      },
      address_in_finnish: {
        type: DataTypes.STRING,
      },
      address_in_swedish: {
        type: DataTypes.STRING,
      },
      city_in_finnish: {
        type: DataTypes.STRING,
      },
      city_in_swedish: {
        type: DataTypes.STRING,
      },
      capacity: {
        type: DataTypes.INTEGER,
      },
      x_coordinate: {
        type: DataTypes.FLOAT,
      },
      y_coordinate: {
        type: DataTypes.FLOAT,
      },
    })
  },
  down: async ({ context: queryInterface }: any) => {
    await queryInterface.dropTable('stations')
  },
}
