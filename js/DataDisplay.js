export class DataDisplay {
  constructor(display_target_id, profile_modal_id) {
    this.display_target_id = display_target_id
    this.profile_modal_id = profile_modal_id
    let dd_instance = this
    $(`#${display_target_id}`).on(`click`, `tr`, dd_instance, updateProfileModal)
    $(`#modal_table tr`).append(`<td>test</td>`)
  }
  load(data) {
    this.data = data
    //parse special values
    let today = new Date()
    this.data.forEach(person => {
      let bday = new Date(Date.parse(person["Month and Year of Birth "]))
      person.age = today.getFullYear() - bday.getFullYear()
      if (!person.age) {person.age = NaN}

      person.hobbies = person["What are some of your hobbies ?"]
      if (person.hobbies.length > 185) { person.hobbies = person.hobbies.substring(0,181) + `...` }

      person.looking_for = person["Partner Requests"]
      if (person.looking_for.length > 85) { person.looking_for = person.looking_for.substring(0,81) + `...` }
    })
  }
  log() { console.log(this.data) }
  show(args) {
    let result = this.data
    let rows = ""
    result.forEach(person => {rows+=`
      <tr>
        <td class="name-cell table-secondary">${person.Name}</td>
        <td>${person[`Assigned Number`]}</td>
        <td>${person.Gender}</td>
        <td>${person.age}</td>
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

function updateProfileModal(event) {
  //prepare data
  let row = this
  let dd = event.data
  function td(n) { return $(row).children(`:nth-child(${n})`).html() }
  let td_iter = {
    n: 0,
    next: function() {this.n++; return td(this.n)}
  }
  let keys = [`name`,`number`,`gender`,`age`,`height`,`occupation`,`current residence`,`arrival`,`imm status`,`hometown`,`edu`,`major`,`field`,`hobbies`,`languages`,`relationship`,`looking for`,`religion`]
  let pairs = keys.map(field=>[field, td_iter.next()])
  let map = new Map(pairs)
  //get full text for fields
  function match_number(person) {
    if (person[`Assigned Number`] == map.get(`number`)) {return true}
  }
  let person = dd.data.find(match_number)
  map.set(`hobbies`, person["What are some of your hobbies ?"])
  map.set(`looking for`, person["Partner Requests"])

  function m(key) {return map.get(key)}

  //insert into template
  let label = `${m(`name`)} (#${m(`number`)})`
  $(`#${dd.profile_modal_id} .modal-title`).html(label)

  let gender = ``
  if (m(`gender`).toLowerCase() == `male`) {gender += `<i class="bi bi-gender-male"></i>`}
  else if (m(`gender`).toLowerCase() == `female`) {gender += `<i class="bi bi-gender-female"></i>`}
  $(`#asl`).html(` ${m(`age`)} ${gender}, ${m(`current residence`)}`)

  function fill(arr) {
    let n = 0
    arr.forEach(key => {
      n++
      $(`#modal_table tr:nth-child(${n})`).children().last().remove()
      $(`#modal_table tr:nth-child(${n})`).append(`<td>${m(key)}</td>`)
    })
  }
  fill([`height`,`occupation`,`arrival`,`imm status`,`hometown`,`edu`,`major`,`field`,`hobbies`,`languages`,`relationship`,`looking for`,`religion`])
}
