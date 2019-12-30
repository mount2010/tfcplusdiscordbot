import Mustache from "mustache";
import config from "config";
import defaultView from "./view";

/**
 * Passes all Strings in an object through the Mustache renderer, using the second argument as the view. Returns a new object with the parsed templates.
 * @param {Object} obj 
 * @param {Object} view
 */
function multiTemplate(obj, view) {
    if (!typeof obj === "object" || Array.isArray(obj)) {
        throw new TypeError("Multitemplate can only parse objects.");
    }
    const newObj = {};
    for (let [key, value] of Object.entries(obj)) {
        newObj[key] = Mustache.render(value, view);
    }
    return newObj;
}

/**
 * Fetches an embed from the configuration, parses it all with Mustache. 
 * @param {String} configKey 
 * @param {Object} [view=defaultView]  
 * @param {Boolean} concat Whether to concat the default view into the passed view
 */
function getEmbed (configKey, view, concat=true) {
    if (view && concat) {
        view = Object.assign(defaultView, view);
    }
    if (!view) {
        view = defaultView;
    }
    return multiTemplate(config.get(configKey), view);
}

export default {
    multiTemplate,
    getEmbed
};