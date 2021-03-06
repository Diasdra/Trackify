const filter = document.querySelector("#filter")
const tableBody = document.querySelector(".table-body")
let editBtn = document.querySelectorAll(".edit-btn")
let deleteBtn = document.querySelectorAll(".delete-btn")

// Searching functionality
filter.addEventListener("keyup", e => {
  let filterValue = filter.value.toLowerCase()
  console.log(filterValue)
  let table = tableBody.querySelectorAll("tr")

  for (let product of table) {
      let currentItemID = product.cells.item(2).innerHTML.toLowerCase()
      let currentItem = product.cells.item(0).innerHTML.toLowerCase()
      if (!(currentItem.includes(filterValue) || currentItemID.includes(filterValue) )) {
        product.style.display = "none"
      } else {
          product.style.display = ""
      }
  }
})

const sendRequest = (method, url, data) => {
  const XHR = new XMLHttpRequest()

    // Success
    XHR.addEventListener('load', (e) => {
      console.log("Data submitted successfully")
    })

    // Error
    XHR.addEventListener('error', (e) => {
      console.log("Error submitting data")
    })

    // This is our request
    console.log(`Posting to ${url}`)
    XHR.open(method, url)

    XHR.setRequestHeader('Content-Type', 'application/json');

    // Sending our JSON object
    console.log(data)
    XHR.send(JSON.stringify(data))
}

// Edit/Save button
let editing = false
let currentEditing = 0
for (let btn of editBtn) {
  btn.addEventListener("click", (e) => {
    let row = e.target.parentNode.parentNode
    console.log(editing)
    // Checks if user is already editing an item
    if (!(editing)) {
      editing = true
      // Iterate through the cells in the row
      for (let cell = 0; cell < 8; cell++) {
        // If cell is the productID, ignore
        if (cell === 2) {
          currentEditing = row.cells[cell].innerHTML
        // If cell is button
        } else if (cell === 7) {
          row.cells[cell].querySelector('.edit-btn').innerHTML = 'Save'
          // Else edit the cell
        } else {
          let cellValue = row.cells[cell].innerHTML
          row.cells[cell].innerHTML = `<input type="text" value="${cellValue}">`
        }
      }
    } else {
      editing = false
      const currentURL = `${window.location.href}inventory`

      let data = {
        id: row.cells[2].innerHTML,
        product: row.cells[0].querySelector('input').value,
        product_category: row.cells[1].querySelector('input').value,
        qty: row.cells[3].querySelector('input').value,
        price: row.cells[4].querySelector('input').value,
        vendor: row.cells[5].querySelector('input').value,
        location: row.cells[6].querySelector('input').value
      }

      sendRequest('POST', currentURL, data)

      // Iterate through cells in the row
      for (let cell = 0; cell < 8; cell++) {
        // Changing back to normal
        if (cell === 2) {

        } else if (cell === 7) {
          row.cells[cell].querySelector('.edit-btn').innerHTML = 'Edit'
        } else {
          let cellValue = row.cells[cell].querySelector('input').value
          row.cells[cell].innerHTML = cellValue
        }
      }
    }
  })
}

// Delete button and alert
for (let btn of deleteBtn) {
  btn.addEventListener("click", (e) => {
    let warning = confirm("This operation will delete the item from the database. This action cannot be undone. Do you wish to continue?")
    if (warning) {
      let row = e.target.parentNode.parentNode
      const itemID = row.cells[2].innerHTML,
            currentURL = `${window.location.href}inventory`
      console.log('Item deleted.')
      row.style.display = 'none'
      sendRequest('DELETE', currentURL, { id: itemID })
    }
  })
}