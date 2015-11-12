// Create a widget manager instance.
var WidgetManager = require("./manager").WidgetManager;

document.addEventListener("DOMContentLoaded", function(event) {

    var top_level_ids = [
        "6fc69e2dca814ef0a07c84d84585e27b", 
        "43621447f4434bfeb95e36e7a15986ff"
    ];

    var manager = new WidgetManager(document.body);

    var state = require("./spx_correlation.json");

    manager.set_state(state).then(function() {
        for (var i=0; i<top_level_ids.length; ++i) {
            var view = manager.create_view(manager.get_model(top_level_ids[i]));
        }     
    });
});
