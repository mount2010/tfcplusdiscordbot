import sequelize from './db';
import Sequelize from 'sequelize';

const Suggestion = sequelize.define("suggestion", {
    userId: {
        type: Sequelize.STRING,
        allowNull: false
    },
    modified: {
        type: Sequelize.STRING, // Could use Sequelize.DATE, but keep it simple, stupid, so let's use discord.js' format
        allowNull: false
    },
    text: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    upvotes: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    downvotes: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    approved: { // Approved by Dunk
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    denied: { // Denied by Dunk
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    removed: { // Removed by moderator - stays in db
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});

(async function () {
    try {
        await Suggestion.sync({force: true});
        console.log("Initialized Suggestion Model")
    }
    catch (err) {
        console.error(err);
    }
})();

export default Suggestion;