'use strict';
import { DataDisplay } from './js/DataDisplay.js'
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
  //DATA_DISPLAY.log()
  DATA_DISPLAY.show()
  $("form").submit(function( event ) {
    event.preventDefault()
    let filters = format_filter( $( this ).serializeArray() )
    DATA_DISPLAY.show( filters )
  })
  $(".form-check *").click( () => $("#btn_Apply").click() )
}

req.send()

RegExp.sanitize = function(str) {
  let excluded = /[^\w|\s]/g
  str = str.replace(excluded, ``)
  let spaces = /^\s+|\s+$/g // matches leading/trailing space
  return str.replace(spaces, "")
}

function format_filter(obj) {
  let gender_value = obj.find(e=>e.name === `gender`).value
  let search_value = obj.find(e=>e.name === `searchbox`).value
  search_value = RegExp.sanitize(search_value)
  let search = new RegExp(search_value, `i`)

  return {
    gender: gender_value,
    search: search
  }
}
