const filter = document.querySelector("#filter")
console.log(filter)
const tableBody = document.querySelector(".table-body")
let editBtn = document.querySelectorAll(".edit-btn")

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
      // Iterate through cells in the row
      for (let cell = 0; cell < 8; cell++) {
        if (cell === 2) {
          console.log("hi")
        } else if (cell === 7) {
          row.cells[cell].querySelector('.edit-btn').innerHTML = 'Edit'
        } else {
          let cellValue = row.cells[cell].querySelector('input').value
          console.log(cellValue)
          row.cells[cell].innerHTML = cellValue
        }
      }
    }
  })
}

// <td><input type="text" name="<%=item.id%>_product" value="<%=item.product %>"></td>
// <td><input type="text" name="<%=item.id%>_product_category" value="<%=item.product_category %>"></td>
// <td><%=item.id %> </td>
// <td><input type="text" name="<%=item.id%>_qty" value="<%=item.qty %>"></td>
// <td><input type="text" name="<%=item.id%>_price" value="<%=item.price %>"></td>
// <td><input type="text" name="<%=item.id%>_vendor" value="<%-item.vendor %>"> </td>
// <td><input type="text" name="<%=item.id%>_location" value="<%=item.location %>"> </td>
// <td><button class="edit-btn">Edit</button></td>