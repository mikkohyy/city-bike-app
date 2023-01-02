import { DATABASE_URI } from './config'
import { Umzug, SequelizeStorage } from 'umzug'
import { Sequelize } from 'sequelize'
import * as dotenv from 'dotenv'
dotenv.config()

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return
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

export { connectToDatabase, sequelize, rollbackMigration }
