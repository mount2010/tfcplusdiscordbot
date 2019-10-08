const addons = require("../../data/addons.json");
const utils = require("../util.js");

class Addon {
	constructor () {

	}
}

class Addons {
	constructor () {
		
	}
}

module.exports.run = function(client, msg, args) {
	// Cache this to reduce runtime. For now, not needed
	const sortByRow = new utils.SortByRow(addons);
	const porters = sortByRow.allRelatedRowsFor("porter");
	const embed = utils.embed().setTitle("TFC+ Addons");

	const fields = porters.map(el => {
		const str = el.similar;
		return [
			`By ${str}`,
			el.vals.map(i => `[${i.name}](${i.url})`).join("\n")
		];
	});

	fields.forEach(el => embed.addField(...el));
	msg.channel.send(embed);
};

module.exports.detail = function (client, msg, args) {
	
}

module.exports.meta = {
	name: "addons",
	description: "Lists a list of addons for TFC+"
};
