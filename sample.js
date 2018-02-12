/*
Sample script to load a sample JSON file for use in
developing stats 

To get started
1. npm install require
3. npm install d3
4. node sample.js
*/

var fs = require('fs');
var dataRaw = fs.readFileSync('./data.json');
var data = JSON.parse(dataRaw);
var d3 = require('d3');

console.log("---------this is our incoming data source ------------")
console.log(data);

console.log("---------this is our output data -----")

console.log(JSON.stringify(valueTotal(data,'institutionCode','key','ascending','collectionCode')));

// Group on a name and return the number of counts for each name in the dataset
// parameters are:
// 1. JSON object containing data 
// 2. a name containing an attribute in the JSON Object
// 3. sortTopic "key" or "value"
// 4. sortDirection "ascending" or "descending"
// 5. nestedName, another name to nest
function valueTotal(data, name, sortTopic, sortDirection, nestedName) {
	var groupData;
	if (nestedName != null) {
		groupData = d3.nest()
		.key(function(d) { return eval('d.'+name); })
		.key(function(d) { return eval('d.'+nestedName); })
		.rollup(function(v) {return v.length; })
		.entries(data)
	} else {
		groupData = d3.nest()
		.key(function(d) { return eval('d.'+name); })
		.rollup(function(v) {return v.length; })
		.entries(data)
	}
	// sort by key,value and ascending,descending
	return groupData.sort(function(x,y) {
		return eval('d3.'+sortDirection+'(x.'+sortTopic+',y.'+sortTopic+')');
	});
}

