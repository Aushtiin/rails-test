const { environment } = require("@rails/webpacker");
const jquery = require("./plugins/jquery");
const typescript = require("./loaders/typescript");
const customConfig = require("./custom");

environment.loaders.prepend("typescript", typescript);
environment.plugins.prepend("jquery", jquery);

// Merge custom config
environment.config.merge(customConfig);

module.exports = environment;
