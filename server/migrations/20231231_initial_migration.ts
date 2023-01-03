import { DataTypes } from 'sequelize'

module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  up: async ({ context: queryInterface }: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await queryInterface.createTable('stations', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      station_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await queryInterface.createTable('journeys', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      depature_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      return_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      depature_station_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: { model: 'stations', key: 'station_id' },
      },
      return_station_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: { model: 'stations', key: 'station_id' },
      },
      covered_distance_in_meters: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      duration_in_seconds: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    })
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  down: async ({ context: queryInterface }: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await queryInterface.dropTable('journeys')
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await queryInterface.dropTable('stations')
  },
}
