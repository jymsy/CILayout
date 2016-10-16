"use strict";
(function($, App, window) {

    App.CommunicationLayer = function (spec) {
        var self = this;

        //与server + business-level逻辑通讯



        return self;
    };

    App.performBinding = function (app, selector) {
        //Handle all HTML-specific code here

        //DOM wrapper element, all event handlers are bound to this element
        var $wrapper = $(selector || window.document);

        //绑定所有事件
        $wrapper
        //基础绑定
            .on('click', '.-delete', function() {
                //user clicked delete
                //handle UI changes
                //get necessary data
                //call appropriate method on app
                app.delete(data);
            })
            .on('click', '.-search', function () {
                //user clicked search
                //handle UI changes
                //get necessary data
                //call appropriate method on app
                app.search(data);
            })
        // ...
        ;
    };

})(jQuery, window.MyApp || (window.MyApp = {}), window);