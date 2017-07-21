
// Copyright (c) 2017 Kim McKinley
// License: MIT

// Node-RED fastcsv js file

// Special thanks to https://github.com/C2FO/fast-csv

module.exports = function(RED) {
    "use strict";
    // Require any external libraries
    var csv = require("fast-csv");

    // The main node definition
    function FastCsvNode(n) {
        // Create a RED node
        RED.nodes.createNode(this,n);

        // Store local copies of the node configuration
        this.options = {
            headers: n.headers,
            ignoreEmpty: n.ignoreEmpty,
            discardUnmappedColumns: n.discardUnmappedColumns,
            strictColumnHandling: n.strictColumnHandling,
            delimiter: n.delimiter,
            quote: n.quote,
            escape: n.escape,
            comment: n.comment,
            trim: n.trim,
            ltrim: n.ltrim,
            rtrim: n.rtrim,
        };

        // copy "this" object
        var node = this;

        function parseCsv(msg) {
            var parsedObj = [];
            csv
                .fromString(msg.payload, node.options)
                .on("data", function(data){
                    parsedObj.push(data);
                })
                .on("end", function() {
                    msg.payload = parsedObj;
                    node.send(msg);
                }); 
        }
        
        function formatCsv(msg) {
            csv.writeToString(
                msg.payload,
                node.options,
                function(err, data) {
                    if (err) {
                        node.error(err.msg);
                    }
                    else {
                        msg.payload = data;
                    }
                    node.send(msg);
                }
            );
        }
        
        // Respond to inputs...
        this.on('input', function (msg) {
            if (typeof msg.payload === 'string') {
                parseCsv(msg);
            }
            else {
                formatCsv(msg);
            }
        });

        // Called when the node is shutdown - eg on redeploy.
        // Allows ports to be closed, connections dropped etc.
        this.on("close", function() {
        });
    }

    // Register the node
    RED.nodes.registerType("fastcsv",FastCsvNode);

};