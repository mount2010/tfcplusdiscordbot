const discord = require("discord.js");
const config = require("../config/config.json");

/**
 * Return all objects where the key is the same.
 * @param {string} key
 */
function allRelatedRows(objs, key) {
	function getRelatedRows(objs, key, val) {
		return this.objs.filter(el => {
			return el[key].toLowerCase() === val.toLowerCase();
		});
	}
	const done = []; // Value pairs that already have a row
	const ret = [];
	objs.forEach(el => {
		const first = el[key];
		if (done.includes(first)) return;
		const row = {};
		row.vals = getRelatedRows(key, first);
		row.similar = first; // The value that is similar throughout these objects

		ret.push(row);
		done.push(first);
	});
	return ret;
}

function embed(status) {
	return new discord.RichEmbed().setColor(config.colors[status]);
}

module.exports = {
	allRelatedRows,
	embed
};
