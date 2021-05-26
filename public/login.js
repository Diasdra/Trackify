// Login
const loginBtn = document.querySelector(".login-btn")
const loginUser = document.querySelector(".login-user")
const loginPassword = document.querySelector(".login-password")
loginBtn.addEventListener("click", (e) => {
  if (loginUser.value === '' || loginPassword.value === '') {
    window.alert("Incorrect login or password")
  } else {
    console.log(`Redirecting to ${`${window.location.href}`.slice(0, -5)}`)
    window.location.href = `${window.location.href}`.slice(0, -5)
  }
})