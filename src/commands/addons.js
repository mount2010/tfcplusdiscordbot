const addons = require("../../data/addons.json");
const utils = require("../util.js");

module.exports.run = function(client, msg, args) {
	// Cache this to reduce runtime. For now, not needed
	const sortByRow = new utils.SortByRow(addons);
	const authors = sortByRow.allRelatedRowsFor("author");
	const porters = sortByRow.allRelatedRowsFor("porter");

	msg.channel.send(
		porters
			.map(el => {
				const str = el.similar;
				return str + ": " + el.vals.map(i => i.name).join(", ");
			})
			.join("\n")
	);
};

module.exports.meta = {
	name: "addons",
	description: "Lists a list of addons for TFC+"
};
