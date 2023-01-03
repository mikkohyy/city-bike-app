import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../utils/db'

class Station extends Model {}

Station.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    stationId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    nameInFinnish: {
      type: DataTypes.STRING,
    },
    nameInSwedish: {
      type: DataTypes.STRING,
    },
    nameInEnglish: {
      type: DataTypes.STRING,
    },
    addressInFinnish: {
      type: DataTypes.STRING,
    },
    addressInSwedish: {
      type: DataTypes.STRING,
    },
    cityInFinnish: {
      type: DataTypes.STRING,
    },
    cityInSwedish: {
      type: DataTypes.STRING,
    },
    operator: {
      type: DataTypes.STRING,
    },
    capacity: {
      type: DataTypes.INTEGER,
    },
    xCoordinate: {
      type: DataTypes.FLOAT,
    },
    yCoordinate: {
      type: DataTypes.FLOAT,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'station',
  }
)

export default Station
