const assert = require("assert");
const discord = require("discord.js");
const config = require("../config/config.json");

class SortByRow {
	/**
	 * Sort by row utility for an array of objects
	 * @param {Array[Object]} objs
	 */
	constructor(objs) {
		assert(Array.isArray(objs), "Objs must be an array");
		this.objs = objs;
	}
	/**
	 * Return all objs where key == key and val == val
	 * @param {string} key
	 * @param {string} val
	 * @param {boolean} caseSensitive
	 */
	getRelatedRows(key, val, caseSensitive) {
		return this.objs.filter(el => {
			return caseSensitive
				? el[key].toLowerCase() === val.toLowerCase()
				: el[key] === val;
		});
	}
	/**
	 * Return all objects where the key is the same.
	 * @param {string} key
	 */
	allRelatedRowsFor(key) {
		const done = []; // Value pairs that already have a row
		const ret = [];
		this.objs.forEach(el => {
			const first = el[key];
			if (done.includes(first)) return;
			const row = {};
			row.vals = this.getRelatedRows(key, first);
			row.similar = first; // The value that is similar throughout these objects

			ret.push(row);
			done.push(first);
		});
		return ret;
	}
}

function embed(status) {
	return new discord.RichEmbed().setColor(config.colors[status]);
}

module.exports = {
	SortByRow,
	embed,
};
