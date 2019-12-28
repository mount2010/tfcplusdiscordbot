import config from "config";

const view = {
    red: config.get("view.colors.red"),
    green: config.get("view.colors.green"),
    yellow: config.get("view.colors.yellow"),
    primary: config.get("view.colors.primary")
}

export default view;