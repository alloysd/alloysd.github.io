Vue.createApp({
    data() {
      return {
        appTitle: "Fipe por Fipe Web App!",
        comparedValue: undefined,
      }
    },
    methods: {
      compareVehicles() {
        let values = [] //clear the array
        document.querySelectorAll(".tfb-price").forEach((p) => {
          values.push(p.textContent)
        })
        //validate if any is empty
        if (values.find((v) => v === "") == "") {
          alert("Selecione os dois veículos (A e B) para fazer a comparação.")
          return
        }
        this.compareValues(values)
      },
      compareValues(values) {
        //compare values
        let valueA = this.getMoney(values[0])
        let valueB = this.getMoney(values[1])
        let diffValue = Math.max(valueA, valueB) - Math.min(valueA, valueB)
        this.comparedValue = diffValue.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        })
        console.log(`Diferença de valores: ${this.comparedValue}`)
        this.generateChart(valueA, valueB)
      },
      getMoney(value) {
        return parseInt(value.replace(/[\D]+/g, "")) / 100
      },
      generateChart(val1, val2) {
        let labelA = document.querySelector('#veiculoA > div > div.tfb-div-sel.tfb-div-modelo > select.tfb-sel').selectedOptions[0].innerText
        let labelB = document.querySelector('#veiculoB > div > div.tfb-div-sel.tfb-div-modelo > select.tfb-sel').selectedOptions[0].innerText
        if (labelA == labelB) {
          labelA += " (A)"
          labelB += " (B)"
        }
        var data = [
          {
            value: val1,
            color: "#F7464A",
            highlight: "#FF5A5E",
            label: labelA
          },
          {
            value: val2,
            color: "#46BFBD",
            highlight: "#5AD3D1",
            label: labelB
          }
        ]
        var ctx = document.getElementById("fipeChart").getContext("2d")
        new Chart(ctx).Pie(data)
      },
    },
  }).mount("#app")