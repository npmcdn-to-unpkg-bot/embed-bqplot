var CodeMirror = require("codemirror");
require("codemirror/lib/codemirror.css");
require("jupyter-js-widgets/css/widgets.min.css");
require("codemirror/mode/python/python");

var WidgetManager = require("./manager").WidgetManager;

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


window.w = function renderWidgetState (state) {
    console.info('Inserting widget(s)...');
    var widgetarea = document.createElement('div');
    widgetarea.className = 'widgetarea'
    var manager = new WidgetManager(widgetarea);
    manager.set_state(state);
    var context = Array.prototype.slice.call(document.querySelectorAll('script'), -1)[0];
    context.parentElement.insertBefore(widgetarea, context);
};
