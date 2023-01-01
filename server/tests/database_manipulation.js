const resetDatabase = async (queryInterface) => {
  await queryInterface.dropAllTables()
}

module.exports = {
  resetDatabase,
}
