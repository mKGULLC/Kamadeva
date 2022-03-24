'use strict';
import { DataDisplay } from '/js/DataDisplay.js'
const DATA_DISPLAY = new DataDisplay("display_table_body", "profile_modal")

const url = "data.xlsx"

/* set up async GET request and parse with SheetJS*/
let req = new XMLHttpRequest()
req.open("GET", url, true)
req.responseType = "arraybuffer"

req.onload = function(e) {
  let workbook = XLSX.read(req.response)
  let jsa = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {raw:false})
  DATA_DISPLAY.load(jsa)
  DATA_DISPLAY.log()
  DATA_DISPLAY.show()
}

req.send()
