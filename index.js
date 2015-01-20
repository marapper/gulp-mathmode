'use strict';

var math = require('mathmode'),
    gutil = require('gulp-util'),
    assign = require('object-assign'),
    through = require('through2'),
    chalk = require('chalk');

var PLUGIN_NAME = 'gulp-mathmode';

module.exports = function(options) {
    options = assign({
        format: 'png',
        dpi: 300,
        packages: ["amsmath"],
        macros: "",
        /* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
        pdflatex_path: "pdflatex",
        imagemagick_path: "convert"
        /* jscs:enable requireCamelCaseOrUpperCaseIdentifiers */
    }, options);

    var out = [];

    return through.obj(function(file, enc, cb) {
        if (file.isNull()) {
            cb(null, file);
            return;
        }

        if (file.isStream()) {
            cb(new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
            return;
        }

        try {
            var expression = String(file.contents);
            file.contents = new Buffer('');

            gutil.log(PLUGIN_NAME, ' file is ' + chalk.blue(file.relative));
            gutil.log(PLUGIN_NAME, ' math is ' + chalk.green(expression));

            var stream = math(expression, options);

            stream.on('data', function(data) {
                file.contents = Buffer.concat([data, file.contents]);
            });
            stream.on('error', function(err) {
                out.push(err.message.replace('null:', file.relative + ':'));
            });
            stream.on('end', function () {
                cb(null, file);
            });

        } catch (err) {
            if (!options.skipErrors) {
                out.push(err.message.replace('null:', file.relative + ':'));
            }
            cb();
        }
    }, function(cb) {
        if (out.length > 0) {
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, chalk.red(out.join('\n\n')), {
                showStack: false
            }));
        }

        cb();
    });
};
