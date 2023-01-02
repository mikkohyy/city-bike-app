import { QueryInterface } from 'sequelize'

const resetDatabase = async (queryInterface: QueryInterface) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  await queryInterface.dropAllTables()
}

export { resetDatabase }
