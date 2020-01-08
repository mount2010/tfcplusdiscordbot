import sequelize from "./db";
import Sequelize from "sequelize";

const User = sequelize.define("user", {
    userId: {
        type: Sequelize.STRING,
        allowNull: false
    },
    suggestions: {
        type: Sequelize.STRING,
        defaultValue: JSON.stringify([])
    },
    admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});

(async function () {
    try {
        await User.sync({force: true});
        console.log("Initialized User Model")
    }
    catch (err) {
        console.error(err);
    }
})();

export default User;