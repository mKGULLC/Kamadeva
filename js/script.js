'use strict';

const DATA_DISPLAY = {}
init_DATA_DISPLAY(DATA_DISPLAY)
DATA_DISPLAY.display_target_id = "display_table_body"

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

//DATA_DISPLAY

function init_DATA_DISPLAY(dd) {
  dd.load = function(data) {
    this.data = data
    //parse dates
    this.data.forEach(person => {
      let date = new Date(Date.parse(person["Month and Year of Birth "]))
      person.DOB_Parsed = date.getFullYear()

      person.hobbies = person["What are some of your hobbies ?"]
      if (person.hobbies.length > 185) { person.hobbies = person.hobbies.substring(0,181) + `...` }

      person.looking_for = person["Partner Requests"]
      if (person.looking_for.length > 85) { person.looking_for = person.looking_for.substring(0,81) + `...` }
    })
  }
  dd.log = function() { console.log(dd.data) }
  dd.display_target_id = null
  dd.show = function(args) {
    let result = this.data
    let rows = ""
    result.forEach(person => {rows+=`
      <tr>
        <td class="name-cell table-secondary">${person.Name}</td>
        <td>${person[`Assigned Number`]}</td>
        <td>${person.Gender}</td>
        <td>${person.DOB_Parsed}</td>
        <td>${person["Height (cm)"]}</td>
        <td>${person["Occupation "]}</td>
        <td>${person["Current Residence"]}</td>
        <td>${person["Arrival Year in Canada"]}</td>
        <td>${person["Immigration Status "]}</td>
        <td>${person["Hometown in China"]}</td>
        <td>${person["Educational background"]}</td>
        <td>${person[" Major in University"]}</td>
        <td>${person["Field of work "]}</td>
        <td>${person.hobbies}</td>
        <td>${person["Languages"]}</td>
        <td>${person["Relationship Status "]}</td>
        <td>${person.looking_for}</td>
        <td>${person["Religion"]}</td>
      </tr>
    `})
    $(`#${this.display_target_id}`).html(rows)
  }
}
