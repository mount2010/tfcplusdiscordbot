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
 * Utility function for getEmbed that uses another embed as a base.
 */
function inheritEmbed (parent, child) {
    delete child.inherits; // Never knew I'd come to use delete, but here we are
    return config.util.extendDeep(parent, child);
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
    // Have to assign to new object because Node-Config returns an object that is not extensible. 
    // This prevents inherit from working.
    let embed = Object.assign({}, config.get(configKey));
    if (embed.inherits) {
        const parent = Object.assign({}, config.get(embed.inherits));
        embed = inheritEmbed(parent, embed);
    }
    return multiTemplate(embed, view);
}

function requireArgs (args, number) {
    console.log(args.length);
    return args.length <= number;
}

function runSubCommands (subCommands, text) {
    if (!text || text.length <= 0) {
        subCommands.default();
    }
    else if (text.toLowerCase() in subCommands) {
        subCommands[text]();
    }
}

export default {
    multiTemplate,
    getEmbed,
    runSubCommands,
    requireArgs
};