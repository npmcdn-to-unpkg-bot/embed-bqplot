var ipywidgets = require('ipywidgets');
var bqplot = require('bqplot');
console.info('ipywidgets loaded successfully');

var WidgetManager = exports.WidgetManager = function(el) {
    //  Call the base class.
    ipywidgets.ManagerBase.call(this);
    this.el = el;
};
WidgetManager.prototype = Object.create(ipywidgets.ManagerBase.prototype);

WidgetManager.prototype.display_view = function(msg, view, options) {
    var that = this;
    return Promise.resolve(view).then(function(view) {
        that.el.appendChild(view.el);
        view.on('remove', function() {
            console.log('view removed', view);
        });
        return view;
    });
};

WidgetManager.prototype._create_comm = function(comm_target_name, model_id, metadata) {
    function nullFunction() {}
    return Promise.resolve({
        on_close: nullFunction,
        on_msg: nullFunction,
        send: nullFunction
    });
};

WidgetManager.prototype._get_comm_info = function() {
    return Promise.resolve({});
};

WidgetManager.prototype.loadClass = function(class_name, module_name, registry) {
    return new Promise(function(resolve, reject) {
        if (registry && registry[class_name]) {
            resolve(registry[class_name]);
        } else if (module_name) {
            require([module_name], function(module) {
                if (module[class_name] === undefined) {
                    reject(new Error('Class ' + class_name + ' not found in module ' + module_name));
                } else {
                    resolve(module[class_name]);
                }
            }, reject);
        } else {
            reject(new Error('Class '+ class_name + ' not found in registry '));
        }
    });
};
