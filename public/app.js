const filter = document.querySelector("#filter")
const tableBody = document.querySelector(".table-body")

filter.addEventListener("keyup", e => {
  table = tableBody.querySelectorAll("tr")
  for (let product of table) {
      if (!(product.item(0).innerHTML.includes(filter.value.toLowerCase()))) {
          product.style.display = "none"
      } else {
          product.style.display = ""
      }
  }
})