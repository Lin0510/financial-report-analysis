<template>
  <div class="container" v-if="!isEdit">
    <div class="row justify-content-center">
      <div class="col-md-4 col-sm-10">
        <div class="input-group has-validation">
          <input v-model="stock" @keypress="isLetterOrDot($event)" maxlength="5" class="form-control"
            placeholder="請輸入股票代碼，只能輸入英文字母和." @blur="stockUpperCase()" :class="{ 'is-invalid': isStockEmpty }" />
          <div v-if="isStockEmpty" class="invalid-feedback">
            請輸入股票代碼
          </div>
        </div>
        <div class="input-group-append button-group">
          <button type="button" class="btn btn-success" @click="exportToCSV()">
            <font-awesome-icon icon="fa-file-csv" />
            匯出csv
          </button>
        </div>
      </div>
    </div>
  </div>
  <table class="table">
    <thead class="table-dark">
      <tr>
        <th>風險扣分</th>
      </tr>
    </thead>
    <tbody class="r_body">
      <tr class="title">
        <th>風險項目</th>
        <th>風險可能性</th>
        <th>需扣的分數</th>
        <th>扣分</th>
      </tr>
      <tr>
        <th>科技風險</th>
        <td>科技業、時尚潮流</td>
        <td>-1</td>
        <td>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.technologyRisk_1" @click="technologyRiskDeductPoint()"
              type="checkbox" id="technologyRisk_1" />
            <label class="form-check-label" for="technologyRisk_1">扣分</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.technologyRisk_2" type="checkbox" id="technologyRisk_2"
              @click="technologyRiskNoDeductPoint()" />
            <label class="form-check-label" for="technologyRisk_2">不扣分</label>
          </div>
        </td>
      </tr>
      <tr>
        <th>政府風險</th>
        <td>易受政策影響</td>
        <td>-1</td>
        <td>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.governmentRisk_1" @click="governmentRiskDeductPoint()"
              type="checkbox" id="governmentRisk_1" />
            <label class="form-check-label" for="governmentRisk_1">扣分</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.governmentRisk_2" type="checkbox" id="governmentRisk_2"
              @click="governmentRiskNoDeductPoint()" />
            <label class="form-check-label" for="governmentRisk_2">不扣分</label>
          </div>
        </td>
      </tr>
      <tr>
        <th>中國風險</th>
        <td>中國公司在美國掛牌</td>
        <td>-1</td>
        <td>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.chinaRisk_1" @click="chinaRiskDeductPoint()" type="checkbox"
              id="chinaRisk_1" />
            <label class="form-check-label" for="chinaRisk_1">扣分</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.chinaRisk_2" type="checkbox" id="chinaRisk_2"
              @click="chinaRiskNoDeductPoint()" />
            <label class="form-check-label" for="chinaRisk_2">不扣分</label>
          </div>
        </td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td style="background-color: #f6b3bb">總分</td>
        <td style="background-color: #f6b3bb">{{ total }}</td>
        <td></td>
      </tr>
    </tbody>
  </table>
  <button style="text-align: center" type="button" class="btn btn-primary" @click="reset()">
    <font-awesome-icon icon="fa-rotate-left" />
    Reset
  </button>
</template>
<script setup>
import { reactive, ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
import Papa from "papaparse";

// 股票代碼
const stock = ref("");
// 股票代碼是否未填
const isStockEmpty = ref(false);

let form = reactive({
  technologyRisk_1: "",
  technologyRisk_2: "",
  governmentRisk_1: "",
  governmentRisk_2: "",
  chinaRisk_1: "",
  chinaRisk_2: "",
});

let technologyRiskPoint = ref(0);
let governmentRiskPoint = ref(0);
let chinaRiskPoint = ref(0);
let total = ref(0);

function technologyRiskDeductPoint() {
  form.technologyRisk_2 = false;
  technologyRiskPoint.value = -1;
  if (form.technologyRisk_1 == true) {
    technologyRiskPoint.value = 0;
  }
}

function technologyRiskNoDeductPoint() {
  form.technologyRisk_1 = false;
  technologyRiskPoint.value = 0;
}

function governmentRiskDeductPoint() {
  form.governmentRisk_2 = false;
  governmentRiskPoint.value = -1;
  if (form.governmentRisk_1 == true) {
    governmentRiskPoint.value = 0;
  }
}

function governmentRiskNoDeductPoint() {
  form.governmentRisk_1 = false;
  governmentRiskPoint.value = 0;
}

function chinaRiskDeductPoint() {
  form.chinaRisk_2 = false;
  chinaRiskPoint.value = -1;
  if (form.chinaRisk_1 == true) {
    chinaRiskPoint.value = 0;
  }
}

function chinaRiskNoDeductPoint() {
  form.chinaRisk_1 = false;
  chinaRiskPoint.value = 0;
}

watch(form, () => {
  count();
});

function count() {
  total.value =
    technologyRiskPoint.value +
    governmentRiskPoint.value +
    chinaRiskPoint.value;
}

function reset() {
  stock.value = "";
  form.technologyRisk_1 = "";
  form.technologyRisk_2 = "";
  form.governmentRisk_1 = "";
  form.governmentRisk_2 = "";
  form.chinaRisk_1 = "";
  form.chinaRisk_2 = "";
  technologyRiskPoint.value = 0;
  governmentRiskPoint.value = 0;
  chinaRiskPoint.value = 0;
}

function isLetterOrDot(e) {
  // 獲取字元
  let char = String.fromCharCode(e.keyCode);
  // 正則表達式，只允許英文字母和點號
  const regex = /^[a-zA-Z.]*$/;
  if (regex.test(char)) {
    return true;
  } else {
    // 如果不匹配，不添加到input框
    e.preventDefault();
  }
}

watch(stock, (value) => {
  if (value.length > 0) {
    isStockEmpty.value = false;
  } else {
    isStockEmpty.value = true;
  }
});

function stockUpperCase() {
  stock.value = stock.value.toUpperCase();
}

// 匯出csv
function exportToCSV() {
  if (!stock.value) {
    isStockEmpty.value = true;
    return;
  }

  const data = [
    {
      風險項目: "科技風險",
      風險可能性: "科技業、時尚潮流",
      需扣的分數: -1,
      扣分:
        form.technologyRisk_1 == "" && form.technologyRisk_2 == ""
          ? null
          : `${form.technologyRisk_1 ? "✓" : "✗"}`,
    },
    {
      風險項目: "政府風險",
      風險可能性: "易受政策影響",
      需扣的分數: -1,
      扣分:
        form.governmentRisk_1 == "" && form.governmentRisk_2 == ""
          ? null
          : `${form.governmentRisk_1 ? "✓" : "✗"}`,
    },
    {
      風險項目: "中國風險",
      風險可能性: "中國公司在美國掛牌",
      需扣的分數: -1,
      扣分:
        form.chinaRisk_1 == "" && form.chinaRisk_2 == ""
          ? null
          : `${form.chinaRisk_1 ? "✓" : "✗"}`,
    },
    { 風險項目: "", 風險可能性: "", 需扣的分數: "總分", 扣分: total.value },
  ];
  const hasNullScore = data.some((row) => {
    return row.扣分 === null;
  });

  if (hasNullScore) {
    alert("請在匯出CSV之前勾選所有評分");
    return;
  }
  const csv = Papa.unparse(data, {
    encoding: "utf-8",
    quotes: true,
    quoteChar: '"',
    escapeChar: '"',
    delimiter: ",",
    header: true,
    newline: "\r\n",
    skipEmptyLines: true,
  });
  const blob = new Blob([new Uint8Array([0xef, 0xbb, 0xbf]), csv], {
    type: "text/csv;charset=utf-8;",
  });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  // Get the current date
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  // Construct the filename with the current date
  const filename = `${year}${month}${day}_${stock.value}_風險扣分.csv`;
  link.download = filename;
  link.click();
  window.URL.revokeObjectURL(url);
}
</script>
<style>
.table .r_body tr:nth-child(2) th,
.table .r_body tr:nth-child(3) th,
.table .r_body tr:nth-child(4) th {
  background-color: #aebad2;
}

.table .r_body tr:nth-child(2),
.table .r_body tr:nth-child(3),
.table .r_body tr:nth-child(4) {
  background-color: rgb(232, 238, 251);
}

.table .r_body tr:nth-child(2) td:nth-child(4),
.table .r_body tr:nth-child(3) td:nth-child(4),
.table .r_body tr:nth-child(4) td:nth-child(4) {
  background-color: #fff;
}
</style>
