import { QueryInterface } from 'sequelize'

const resetDatabase = async (queryInterface: QueryInterface) => {
  await queryInterface.dropAllTables()
}

export { resetDatabase }
