const form = document.querySelector("form")
const numbersInput = document.getElementById("numbers")
const minInput = document.getElementById("min")
const maxInput = document.getElementById("max")
const noRepeatInput = document.getElementById("no-repeat")

const resultContainer = document.getElementById("result-container")
const resultValues = document.getElementById("result-values")
const restartBtn = document.getElementById("restart-btn")
const resultRound = document.querySelector(
  "#result-container > div:first-child span"
)

function validarInput(value) {
  return value.replace(/\D+/g, "")
}

numbersInput.oninput = () => {
  numbersInput.value = validarInput(numbersInput.value)
}

minInput.oninput = () => {
  minInput.value = validarInput(minInput.value)
}

maxInput.oninput = () => {
  maxInput.value = validarInput(maxInput.value)
}

form.addEventListener("submit", (event) => {
  event.preventDefault()

  try {
    const numbers = parseInt(numbersInput.value)
    const minValue = parseInt(minInput.value)
    const maxValue = parseInt(maxInput.value)

    const noRepeat = noRepeatInput.checked

    if (isNaN(numbers) || isNaN(minValue) || isNaN(maxValue)) {
      throw new Error(
        "Preencha todos os campos corretamente para realizar o sorteio."
      )
    }

    if (numbers === 0) {
      throw new Error("Não é possível sortear 0 números.")
    }

    if (maxValue <= minValue) {
      throw new Error("O valor máximo deve ser maior que o mínimo.")
    }

    if (noRepeat) {
      const range = maxValue - minValue + 1
      if (numbers > range) {
        throw new Error(
          `Não é possível gerar ${numbers} números únicos nesse intervalo.`
        )
      }
    }

    const resultados = sortearNumeros(numbers, minValue, maxValue, noRepeat)
    mostrarResultados(resultados)
  } catch (error) {
    alert(error.message)
    console.log(error)
  }
})

function sortearNumeros(qnt, min, max, noRepeat) {
  const resultados = []

  if (noRepeat) {
    const sorteados = new Set()
    while (sorteados.size < qnt) {
      const num = Math.floor(Math.random() * (max - min + 1)) + min
      sorteados.add(num)
    }

    resultados.push(...sorteados)
  } else {
    for (let i = 0; i < qnt; i++) {
      resultados.push(Math.floor(Math.random() * (max - min + 1)) + min)
    }
  }

  console.log("Números sorteados: ", resultados)
  return resultados
}

function mostrarResultados(results) {
  try {
    const resultados = results

    form.classList.add("hidden")

    resultValues.innerHTML = ""
    for (let index = 0; index < resultados.length; index++) {
      const span = document.createElement("span")
      span.textContent = resultados[index]

      const delayValue = `${index * 0.5}s`
      span.style.setProperty("--delay", delayValue)

      resultValues.append(span)
      setTimeout(() => {
        resultRound.textContent = `${index + 1}° Resultado`
      }, index * 500)
    }

    resultContainer.classList.remove("hidden")
  } catch (error) {
    alert(error.message)
    console.log(error)
  }
}

restartBtn.onclick = () => {
  resultContainer.classList.add("hidden")
  form.classList.remove("hidden")

  clearForm()
}

function clearForm() {
  numbersInput.value = ""
  minInput.value = ""
  maxInput.value = ""
  noRepeatInput.checked = false

  numbersInput.focus()
}
