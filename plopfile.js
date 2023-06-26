const componentGenerator = require('./plop-templates/prompt.js')
const uppercamelcase = require('uppercamelcase');
const camelcase = require('camelcase-input').camelcase
module.exports = function(plop) {
    plop.setHelper('UpperCamelCase', function (text) {
        return uppercamelcase(text);
    });
    plop.setHelper('LowerCamelCase', function (text) {
        return camelcase(text);
    });
    plop.setHelper('Lower', function (text) {
        return text.toLowerCase();
    });

    plop.setHelper('libChange', function (text) {
        return text.toLowerCase();
    });

    plop.setGenerator('component', componentGenerator)
}