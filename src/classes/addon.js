const config = require("../../config/config.json");
const utils = require("../util");

class Addon {
	constructor(data) {
		this.name = data.name;
		this.desc = data.desc;
		this.url = data.url;
		this.author = data.author;
		this.porter = data.porter;
		this.dependencies = data.dependencies;
		this.deprecated = data.deprecated;
		this.type = data.type ? data.type : "Addon";
	}
	details() {
		const embed = utils.embed("success");
		embed.setTitle(this.name);
		embed.setDescription(this.desc);
		embed.addField("Original Author", this.author);
		embed.setURL(this.url);
		if (this.porter && this.author !== this.porter) {
			embed.addField("Porter", this.porter);
		}
		if (this.dependencies) {
			embed.addField("Dependencies", this.dependencies);
		}
		if (this.deprecated) {
			embed.addField("Deprecated", this.deprecated);
		}
		embed.addField("Type", this.type ? this.type : "Addon");
		return embed;
	}
	icons() {
		const icons = config.icons;
		const type =
			this.type === "Resource Pack" ? icons.resourcePack : icons.addon;
		const deprecated = this.deprecated ? icons.deprecated : "";
		const dependencies = this.dependencies ? icons.dependencies : "";
		return { type, deprecated, dependencies };
	}
	field() {
		const icons = this.icons();
		return `[${this.name}](${this.url}) ${icons.type} ${icons.deprecated} ${icons.dependencies}`;
	}
}

module.exports = Addon;
