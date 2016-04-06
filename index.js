var CodeMirror = require("codemirror");
require("codemirror/lib/codemirror.css");
require("codemirror/mode/python/python");

document.addEventListener("DOMContentLoaded", function(event) {

    var code = require("./widget_code.json").join("\n");
    var inputarea = document.getElementsByClassName("inputarea")[0];
    var editor = CodeMirror(inputarea, {
        value: code,
        mode: "python",
        tabSize: 4,
        showCursorWhenSelecting: true,
        viewportMargin: Infinity,
        readOnly: true
    });
});

require('jupyter-js-widgets/src/embed-webpack');

var bqplot = require('bqplot');

window.define('bqplot', function(){
    return bqplot;
});
