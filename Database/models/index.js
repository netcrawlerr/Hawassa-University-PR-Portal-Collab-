  import { Sequelize } from "sequelize"
  import { config } from "dotenv"
  config()
  const db = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD,{
      host: process.env.HOST,
      dialect: 'mysql'
  })


  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  export default db;