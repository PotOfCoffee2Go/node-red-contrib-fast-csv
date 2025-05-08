# node-red-contrib-fast-csv
>**Fork Notice**
>
>This is a **fork** of [node-red-contrib-fast-csv](https://github.com/PotOfCoffee2Go/node-red-contrib-fast-csv).
>It has been updated to support `@fast-csv/parse` and `@fast-csv/format` v5+.
>
>Please report issues or bugs **on this fork**, not the original project.

Node-Red node using fast-csv parser/formatter

This is a drop-in replacement for the node-red default `csv` node. The node
uses the [C2FO fast-csv](https://github.com/C2FO/fast-csv) library to perform
the parsing of CSV data to a JS Object and formating of JS Object to CSV.

The node configuration is straight forward and covers most commonly used CSV
variations. See [fast-csv usage](https://github.com/C2FO/fast-csv#usage) for
more info on configuration parameters.

The node displays status messages under the node indicat parsed and formatted
record counts.

enjoy!
