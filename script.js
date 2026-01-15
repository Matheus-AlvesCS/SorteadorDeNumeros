const form = document.querySelector("form")
const numbersInput = document.getElementById("numbers")
const minInput = document.getElementById("min")
const maxInput = document.getElementById("max")

function validateInput(value) {
  return value.replace(/\D+/g, "")
}

numbersInput.oninput = () => {
  numbersInput.value = validateInput(numbersInput.value)
}

minInput.oninput = () => {
  minInput.value = validateInput(minInput.value)
}

maxInput.oninput = () => {
  maxInput.value = validateInput(maxInput.value)
}

form.addEventListener("submit", (event) => {
  event.preventDefault()

  try {
    const numbers = parseInt(numbersInput.value)
    const minValue = parseInt(minInput.value)
    const maxValue = parseInt(maxInput.value)

    if (maxValue <= minValue) {
      throw new Error("O valor máximo deve ser maior que o mínimo.")
    }

    console.log("Enviado.")
  } catch (error) {
    alert(error.message)
    console.log(error)
  }
})
