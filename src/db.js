import Sequelize from "sequelize";
import config from "config";

const sequelize = new Sequelize(
    config.get("db.database"), config.get("db.username"), config.get("db.password"), 
    {
        host: config.get("db.host"),
        dialect: "postgres",
        pool: config.get("db.pool")
    }
);

export default sequelize;