require('./node_modules/jupyter-js-widgets/static/components/bootstrap/css/bootstrap.css')
require('./node_modules/jquery-ui/themes/smoothness/jquery-ui.min.css')

var jpywidgets = require('jupyter-js-widgets');
var bqplot = require('bqplot');
console.info('jupyter-js-widgets loaded successfully');

var WidgetManager = exports.WidgetManager = function(el) {
    //  Call the base class.
    jpywidgets.ManagerBase.call(this);
    this.el = el;
};
WidgetManager.prototype = Object.create(jpywidgets.ManagerBase.prototype);

WidgetManager.prototype.display_view = function(msg, view, options) {
    var that = this;
    return Promise.resolve(view).then(function(view) {
        that.el.appendChild(view.el);
        view.on("remove", function() {
            console.log("View removed", view);
        });
        return view;
    });
};

WidgetManager.prototype._create_comm = function(comm_target_name, model_id, metadata) {
    return Promise.reject("No backend.");
};

WidgetManager.prototype._get_comm_info = function() {
    return Promise.resolve({});
};

WidgetManager.prototype.loadClass = function(class_name, module_name, registry) {
    return new Promise(function(resolve, reject) {
        if (registry && registry[class_name]) {
            resolve(registry[class_name]);
        } else if (module_name) {
            resolve(bqplot[class_name]);

            //require([module_name], function(module) {
            //    if (module[class_name] === undefined) {
            //        reject(new Error('Class ' + class_name + ' not found in module ' + module_name));
            //    } else {
            //        resolve(module[class_name]);
            //    }
            //}, reject);
        } else {
            reject(new Error('Class '+ class_name + ' not found in registry '));
        }
    });
};
