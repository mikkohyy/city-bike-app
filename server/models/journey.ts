import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../utils/db'

class Journey extends Model {}

Journey.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    departureTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    returnTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    departureStationId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: { model: 'stations', key: 'stationId' },
    },
    returnStationId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: { model: 'stations', key: 'stationId' },
    },
    coveredDistanceInMeters: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    durationInSeconds: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'journey',
  }
)

export default Journey
