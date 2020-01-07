import config from "config";

const view = {
    red: parseInt(config.get("view.colors.red"), 16),
    green: parseInt(config.get("view.colors.green"), 16),
    yellow: parseInt(config.get("view.colors.yellow"), 16),
    primary: parseInt(config.get("view.colors.primary"), 16)
}

export default view;