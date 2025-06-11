let count = 1

function participantTemplate(count) {
  return `<section class="participant${count}">
            <p>Participant ${count}</p>
            <div class="item">
              <label for="fname${count}"> First Name<span>*</span></label>
              <input id="fname${count}" type="text" name="fname" value="" required />
            </div>
            <div class="item activities">
              <label for="activity${count}">Activity #<span>*</span></label>
              <input id="activity${count}" type="text" name="activity" />
            </div>
            <div class="item">
              <label for="fee${count}">Fee ($)<span>*</span></label>
              <input id="fee${count}" type="number" name="fee" />
            </div>
            <div class="item">
              <label for="date${count}">Desired Date <span>*</span></label>
              <input id="date${count}" type="date" name="date" />
            </div>
            <div class="item">
              <p>Grade</p>
              <select>
                <option value="" selected disabled></option>
                <option value="1">1st</option>
                <option value="2">2nd</option>
                <option value="3">3rd</option>
                <option value="4">4th</option>
                <option value="5">5th</option>
                <option value="6">6th</option>
                <option value="7">7th</option>
                <option value="8">8th</option>
                <option value="9">9th</option>
                <option value="10">10th</option>
                <option value="11">11th</option>
                <option value="12">12th</option>
              </select>
            </div>
          </section>`
}

const addButton = document.querySelector('#add')

function addParticipant() {
  const newPartitipant = participantTemplate(++count)
  addButton.insertAdjacentHTML('beforebegin', newPartitipant)
}

addButton.addEventListener('click', addParticipant)

function totalFees() {
  let feeElements = document.querySelectorAll('[id^=fee]')
  feeElements = [...feeElements]

  let total = 0
  feeElements.forEach((ele) => {
    total += parseInt(ele.value)
  })
  return total
}

const form = document.querySelector('#regForm')
form.addEventListener('submit', submitForm)

function submitForm(event) {
  event.preventDefault()
  const total = totalFees()
  const name = document.querySelector('#adult_name').value
  const info = {
    name: name,
    participants: count,
    total: total
  }
  form.classList.add('hide')
  const summary = document.querySelector('#summary')
  summary.textContent = successTemplate(info)
}

function successTemplate(info) {
  return `Thank you ${info.name} for registering. You have registered ${info.participants} participants and owe $${info.total} in Fees.`
}
