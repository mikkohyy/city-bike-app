import { DataTypes } from 'sequelize'

module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  up: ({ context: queryInterface }: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    queryInterface.createTable('stations', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      station_id: {
        type: DataTypes.STRING,
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
      operator: {
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  down: async ({ context: queryInterface }: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await queryInterface.dropTable('stations')
  },
}
