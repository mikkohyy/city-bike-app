const { DATABASE_URI } = require('./config')
const { Umzug, SequelizeStorage } = require('umzug')
const Sequelize = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(DATABASE_URI, {
  dialect: 'postgres',
})

const migrationConfig = {
  migrations: {
    glob: 'migrations/*.ts',
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  logger: console,
}

const runMigrations = async () => {
  const migrator = new Umzug(migrationConfig)
  const migrations = await migrator.up()

  console.log('Migrations up to date', {
    files: migrations.map((mig: any) => mig.name),
  })
}

const rollbackMigration = async () => {
  const migrator = new Umzug(migrationConfig)
  await sequelize.authenticate()
  await migrator.down()
}

const connectToDatabase = async () => {
  try {
    if (process.env.NODE_ENV !== 'test') {
      await runMigrations()
    }
    await sequelize.authenticate()
    console.log('Connected to database')
  } catch (error) {
    console.log(`Connection to database failed\n${error}`)
    process.exit(1)
  }
}

module.exports = {
  sequelize,
  connectToDatabase,
  rollbackMigration,
}

export {}
