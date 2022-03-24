'use strict';

console.log("hi");

var url = "data.xlsx"

/* set up async GET request */
var req = new XMLHttpRequest()
req.open("GET", url, true)
req.responseType = "arraybuffer"

req.onload = function(e) {
  var workbook = XLSX.read(req.response)
  console.log("data loaded")
  /* DO SOMETHING WITH workbook HERE */
}

req.send()
