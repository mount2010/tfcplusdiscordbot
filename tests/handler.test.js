const handler = require("../out/handler");
const config = require("config");

test("checks content for prefix correctly", () => {
    expect(handler.check(config.get("bot.prefix") + "ping")).toBe(true);
    expect(handler.check("ABCDEFG")).toBe(false);
});

test("seperates the command and arguments correctly", () => {
    expect(handler.parse(config.get("bot.prefix") + "ping now")).toMatchObject(["ping", ["now"]]);
});