const levenshtein = require("fast-levenshtein");
const { Collection } = require("discord.js");

const Addon = require("../classes/addon");
const utils = require("../util");

const config = require("../../config/config.json");
const addons = require("../../data/addons.json").map(el => {
	return new Addon(el);
});
const recommends = require("../../data/recommends.json").map(el => {
	return new Addon(el);
});

const porters = utils.allRelatedRows(addons, "porter");
let collection = new Collection(addons.map(el => [el.name, el]));

porters.push({ similar: "Recommended", vals: recommends })
const addonsList = porters.map(el => {
		return {
			title: el.similar,
			desc: el.vals.map(i => i.field()).join("\n"),
			inline: true
		};
	});

function details(client, msg, args) {
	recommends.forEach(el => {
		collection.set(el.name, el);
	});

	const query = args
		.join(" ")
		.toLowerCase()
		.trim();
	let match;

	if (collection.find(el => el.name === query) === undefined)
		match = collection.get(query);
	// Only use values that match the first word of the msg. Uses levenshtein to account for typos
	collection = collection.filter(el => {
		const distance = levenshtein.get(el.name.toLowerCase(), query);
		return distance <= config.addons.maxTypos;
	});

	console.log(collection);
	if (!collection.size) {
		msg.channel.send(
			utils
				.embed("error")
				.setTitle("No addon found")
				.setDescription(
					`Couldn't find an addon with that name. Use ${client.prefix}addons to see a list of all addons.`
				)
		);
		return;
	} else if (collection.size > 1) {
		msg.channel.send(
			utils
				.embed("error")
				.setTitle("Error")
				.setDescription(
					`Found ${collection.size} possibilities, please specify something more exact...`
				)
		);
		return;
	} else match = collection.values().next().value;

	msg.channel.send(match.details());
}

function list(client, msg, args) {
	const embed = utils.embed("success").setTitle("TFC+ Addons");
	embed.setDescription(
		"**For details, supply an addon name as an argument.**\n" +
			`Legend: ${config.icons.resourcePack} Resource Pack | ${config.icons.addon} Addon 
		| ${config.icons.deprecated} Deprecated | ${config.icons.dependencies} Has Dependencies (use ${config.prefix}addons <name>)`
	);

	addonsList.forEach(el => embed.addField(el.title, el.desc, el.inline));
	msg.channel.send(embed);
}

module.exports.run = function(client, msg, args) {
	if (args.length >= 1) {
		details(client, msg, args);
	} else {
		list(client, msg, args);
	}
};

module.exports.meta = {
	name: "addons",
	description: "Lists a list of addons for TFC+"
};
