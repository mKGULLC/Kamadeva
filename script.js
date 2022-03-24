'use strict';

const url = "data.xlsx"

/* set up async GET request */
let req = new XMLHttpRequest()
req.open("GET", url, true)
req.responseType = "arraybuffer"

req.onload = function(e) {
  let workbook = XLSX.read(req.response)
  let jsa = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])
  console.log(jsa)

}

req.send()
