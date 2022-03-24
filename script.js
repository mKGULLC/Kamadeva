'use strict';

console.log("hi");

const url = "data.xlsx"

/* set up async GET request */
let req = new XMLHttpRequest()
req.open("GET", url, true)
req.responseType = "arraybuffer"

req.onload = function(e) {
  let workbook = XLSX.read(req.response)
  console.log("data loaded")
  /* DO SOMETHING WITH workbook HERE */
  let jsa = XLSX.utils.sheet_to_json(worksheet, opts)
  console.log(jsa)
}

req.send()
