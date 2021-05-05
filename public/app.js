const filter = document.querySelector("#filter")
const tableBody = document.querySelector(".table-body")

filter.addEventListener("keyup", e => {
  let filterValue = filter.value.toLowerCase()
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