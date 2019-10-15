// Todo: refactor and split this file into functions
const addons = require("../../data/addons.json");
const recommends = require("../../data/recommends.json");
const utils = require("../util");
const levenshtein = require("fast-levenshtein");
const { Collection } = require("discord.js");

// Acceptable distance for typos
const maxDistance = 3;
// Icons
const resourcePackIcon = ":frame_photo:";
const deprecatedIcon = ":boom:";
const dependenciesIcon = ":gear:";
const addonIcon = ":heavy_plus_sign:";

function details(client, msg, args) {
	const sortByRow = new utils.SortByRow(addons);
	let collection = new Collection(addons.map(el => [el.name, el]));
	recommends.forEach(el => {
		collection.set(el.name, el);
	});

	const query = args
		.join(" ")
		.toLowerCase()
		.trim();
	let match;

	if (collection.map(el => el.name).indexOf(query) != -1)
		match = collection.get(query);
	// Only use values that match the first word of the msg. Uses levenshtein to account for typos
	collection = collection.filter(el => {
		const distance = levenshtein.get(el.name.toLowerCase(), query);
		return distance <= maxDistance;
	});
	if (collection.size < 1) {
		// No addon found, try porter:
		const porter = sortByRow.getRelatedRows("porter", args[0], true);
		if (porter.length < 1) {
			msg.channel.send(
				utils
					.embed("error")
					.setTitle("No addon found")
					.setDescription(
						`Couldn't find an addon with that name. Use ${client.prefix}addons to see a list of all addons.`
					)
			);
			return;
		} else {
			const embed = utils
				.embed("success")
				.setTitle("Porter listing")
				.setDescription(`Ports/addons by ${query}`);
			porter.forEach(el => {
				embed.addField(el.name, `[Link](${el.url}) - ${el.desc}`);
			});
			msg.channel.send(embed);
			return;
		}
	}
	if (collection.size > 1) {
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

	const embed = utils.embed("success");
	embed.setTitle(match.name);
	embed.setDescription(match.desc);
	embed.addField("Original Author", match.author);
	embed.setURL(match.url);
	if (match.porter && match.author !== match.porter) {
		embed.addField("Porter", match.porter);
	}
	if (match.dependencies) {
		embed.addField("Dependencies", match.dependencies);
	}
	if (match.deprecated) {
		embed.addField("Deprecated", match.deprecated);
	}
	embed.addField("Type", match.type ? match.type : "Addon");
	msg.channel.send(embed);
}

function list(client, msg, args) {
	// Cache this to reduce runtime. For now, not needed
	const sortByRow = new utils.SortByRow(addons);
	const porters = sortByRow.allRelatedRowsFor("porter");
	const embed = utils.embed("success").setTitle("TFC+ Addons");
	embed.setDescription(
		"For details, supply an author or addon name as an argument." +
			"\n" +
			`Legend: ${resourcePackIcon} Resource Pack | ${addonIcon} Addon | ${deprecatedIcon} Deprecated | ${dependenciesIcon} Has Dependencies`
	);

	function addonIcons(obj) {
		const type =
			obj.type === "Resource Pack" ? resourcePackIcon : addonIcon;
		const deprecated = obj.deprecated ? deprecatedIcon : "";
		const dependencies = obj.dependencies ? dependenciesIcon : "";
		return { type, deprecated, dependencies };
	}

	const fields = porters.map(el => {
		return [
			`${el.similar}:`,
			el.vals
				.map(i => {
					const icons = addonIcons(i);

					return `[${i.name}](${i.url}) ${icons.type} ${icons.deprecated} ${icons.dependencies}`;
				})
				.join("\n"),
			true
		];
	});
	const recommendsField = [
		"Recommended:",
		recommends.map(i => {
			const icons = addonIcons(i);

			return `[${i.name}](${i.url}) ${icons.type} ${icons.deprecated} ${icons.dependencies}`;
		}),
		true
	];

	fields.forEach(el => embed.addField(...el));
	embed.addField(...recommendsField);
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
