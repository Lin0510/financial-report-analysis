<template>
  <div class="d-flex justify-content-center">
    <div class="col-md-3">
      <vue-latex :expression="'年化報酬率 = \\sqrt[年數]{\\frac{投資總淨值}{總投入資金}}'" display-mode fontsize="18" />
      <form>
        <div>
          <div class="form-group-1">
            <label for="investment">投資總淨值</label>
            <div class="input-group">
              <input type="number" class="form-control" id="investment" v-model="form.investment"
                :class="{ 'is-invalid': validate.isInvestmentEmpty }" @keyup.enter="calculate()">
              <div class="input-group-append">
                <button class="btn btn-outline-secondary" @click="addZeros('investment', 2)">00</button>
                <button class="btn btn-outline-secondary" @click="addZeros('investment', 3)">000</button>
              </div>
              <div v-if="validate.isInvestmentEmpty" class="invalid-feedback">
                投資總淨值不得為空
              </div>
            </div>
          </div>
          <div class="form-group-1">
            <label for="capital">總投入資金</label>
            <div class="input-group">
              <input type="number" class="form-control" id="capital" v-model="form.capital"
                :class="{ 'is-invalid': validate.isCapitalEmpty }" @keyup.enter="calculate()">
              <div class="input-group-append">
                <button class="btn btn-outline-secondary" @click="addZeros('capital', 2)">00</button>
                <button class="btn btn-outline-secondary" @click="addZeros('capital', 3)">000</button>
              </div>
              <div v-if="validate.isCapitalEmpty" class="invalid-feedback">
                總投入資金不得為空
              </div>
            </div>
          </div>
          <div class="form-group-1">
            <label for="years">年數</label>
            <div class="input-group">
              <input type="number" class="form-control" id="years" v-model="form.years"
                :class="{ 'is-invalid': validate.isYearsEmpty }" @keyup.enter="calculate()">
              <div class="input-group-append">
                <button class="btn btn-outline-secondary" @click="setYears(1)">1年</button>
                <button class="btn btn-outline-secondary" @click="setYears(5)">5年</button>
                <button class="btn btn-outline-secondary" @click="setYears(10)">10年</button>
              </div>
              <div v-if="validate.isYearsEmpty" class="invalid-feedback">
                年數不得為空
              </div>
            </div>
          </div>
        </div>
        <div class="button-group">
          <button class="btn btn-primary" @click="calculate" :disabled="isDisabled">
            <font-awesome-icon icon="fa-divide" />
            計算
          </button>
          <button class="btn btn-secondary" @click="clear" :disabled="isDisabled">
            <font-awesome-icon icon="fa-eraser" />
            清除
          </button>
        </div>
      </form>
      <vue-latex :expression="result" display-mode fontsize="20" />
    </div>
  </div>
</template>

<script setup>
import { VueLatex } from "vatex";
import { reactive, ref, watch } from "vue";

const form = reactive({
  // 投資總淨值
  investment: "",
  // 總投入資金
  capital: "",
  // 年數
  years: "",
});

const validate = reactive({
  isInvestmentEmpty: false,
  isCapitalEmpty: false,
  isYearsEmpty: false,
});
let result = ref("");

watch(
  () => form.investment,
  (newValue) => {
    if (newValue) {
      validate.isInvestmentEmpty = false;
    }
  }
);

watch(
  () => form.capital,
  (newValue) => {
    if (newValue) {
      validate.isCapitalEmpty = false;
    }
  }
);

watch(
  () => form.years,
  (newValue) => {
    if (newValue) {
      validate.isYearsEmpty = false;
    }
  }
);

// 添加0
function addZeros(inputField, zeros) {
  if (form.investment)
    if (inputField === "investment") {
      form.investment += "0".repeat(zeros);
    } else if (inputField === "capital") {
      form.capital += "0".repeat(zeros);
    }
}

// 設置年數
function setYears(years) {
  form.years = years;
}

function calculate() {
  event.preventDefault(); // 阻止表單的預設提交行為
  if (checkEmpty()) {
    // 執行開根號
    const number = Math.pow(form.investment / form.capital, 1 / form.years);
    // 將結果四捨五入取到小數點後兩位
    const roundedResult = (number - 1) * 100;
    // 將結果轉換為百分比形式
    const percentageResult = `${roundedResult.toFixed(2)}`;
    result.value = `\\sqrt[${form.years}]{\\frac{${formatNumber(
      form.investment
    )}}{${formatNumber(form.capital)}}} = ${percentageResult}\\%`;
  }
}

function formatNumber(value) {
  if (!value) return "";
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function checkEmpty() {
  if (!form.investment && !form.capital && !form.years) {
    validate.isInvestmentEmpty = true;
    validate.isCapitalEmpty = true;
    validate.isYearsEmpty = true;
    return false;
  }
  if (!form.investment && !form.capital) {
    validate.isInvestmentEmpty = true;
    validate.isCapitalEmpty = true;
    return false;
  }
  if (!form.capital && !form.years) {
    validate.isCapitalEmpty = true;
    validate.isYearsEmpty = true;
    return false;
  }
  if (!form.investment && !form.years) {
    validate.isInvestmentEmpty = true;
    validate.isYearsEmpty = true;
  }
  if (!form.investment) {
    validate.isInvestmentEmpty = true;
    return false;
  }
  if (!form.capital) {
    validate.isCapitalEmpty = true;
    return false;
  }
  if (!form.years) {
    validate.isYearsEmpty = true;
    return false;
  }
  return true;
}

function clear() {
  form.investment = "";
  form.capital = "";
  form.years = "";
  result.value = "";
}
</script>

<style scoped>
.form-group-1 {
  margin-bottom: 1rem;
}
</style>

