const assert = require("assert");

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
	 */
	getRelatedRows(key, val) {
		return this.objs.filter(el => {
			return el[key] === val;
		});
	}
	/**
	 * Return all combinations of objects for key with equal vals
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

module.exports = {
	SortByRow
};
