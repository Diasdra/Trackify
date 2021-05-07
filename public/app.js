const filter = document.querySelector("#filter")
console.log(filter)
const tableBody = document.querySelector(".table-body")

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