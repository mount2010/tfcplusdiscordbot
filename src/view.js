import config from "config";

// Due to Discord's colors being 0 indexed, we need to deduct 1 from these parseInts.
const view = {
    red: parseInt(config.get("view.colors.red"), 16),
    green: parseInt(config.get("view.colors.green"), 16),
    yellow: parseInt(config.get("view.colors.yellow"), 16),
    primary: parseInt(config.get("view.colors.primary"), 16)
}

export default view;