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
        <th>護城河優勢</th>
      </tr>
    </thead>
    <tbody class="m_body">
      <tr class="title">
        <th>護城河項目</th>
        <th>競爭優勢</th>
        <th>可獲得分數</th>
        <th>給分</th>
      </tr>
      <tr>
        <th rowspan="3">品牌</th>
        <td>你會因為這個品牌而購買嗎？</td>
        <td rowspan="3">1</td>
        <td rowspan="3">
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.brand_1" @click="brandGivePoint()" type="checkbox"
              id="brand_1" />
            <label class="form-check-label" for="brand_1">給分</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.brand_2" type="checkbox" id="brand_2"
              @click="brandNoGivePoint()" />
            <label class="form-check-label" for="brand_2">不給分</label>
          </div>
        </td>
      </tr>
      <tr>
        <td>品牌會影響你的消費決策嗎？</td>
      </tr>
      <tr>
        <td>你願意因為這個品牌多付一些錢嗎？</td>
      </tr>
      <tr>
        <th rowspan="2">專利、特許執照</th>
        <td>專利：企業取得法律的保護，競爭者無法製造任何相似的產品</td>
        <td rowspan="2">1</td>
        <td rowspan="2">
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.patent_1" @click="patentGivePoint()" type="checkbox"
              id="patent_1" />
            <label class="form-check-label" for="patent_1">給分</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.patent_2" type="checkbox" id="patent_2"
              @click="patentNoGivePoint()" />
            <label class="form-check-label" for="patent_2">不給分</label>
          </div>
        </td>
      </tr>
      <tr>
        <td>特許：擁有不易申請通過的政府許可經營執照</td>
      </tr>
      <tr>
        <th rowspan="4">成本優勢</th>
        <td>生產成本：擁有別人沒有的低生產成本或掌握通路</td>
        <td rowspan="4">1</td>
        <td rowspan="4">
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.costAdvantage_1" @click="costAdvantageGivePoint()"
              type="checkbox" id="costAdvantage_1" />
            <label class="form-check-label" for="costAdvantage_1">給分</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.costAdvantage_2" type="checkbox" id="costAdvantage_2"
              @click="costAdvantageNoGivePoint()" />
            <label class="form-check-label" for="costAdvantage_2">不給分</label>
          </div>
        </td>
      </tr>
      <tr>
        <td>運輸成本：有好的地理位置，降低運輸成本</td>
      </tr>
      <tr>
        <td>特有資產：擁有世界級的天然資源</td>
      </tr>
      <tr>
        <td>經濟規模：規模是同業的5倍以上</td>
      </tr>
      <tr>
        <th scope="row">高轉換成本</th>
        <td>轉換過程會產生大量風險或機會成本</td>
        <td>1</td>
        <td>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.conversionCost_1" @click="conversionCostGivePoint()"
              type="checkbox" id="conversionCost_1" />
            <label class="form-check-label" for="conversionCost_1">給分</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.conversionCost_2" type="checkbox" id="conversionCost_2"
              @click="conversionCostNoGivePoint()" />
            <label class="form-check-label" for="conversionCost_2">不給分</label>
          </div>
        </td>
      </tr>
      <tr>
        <th scope="row">網絡效應</th>
        <td>產品價值隨著使用的人數上升而提升</td>
        <td>1</td>
        <td>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.networkEffect_1" @click="networkEffectGivePoint()"
              type="checkbox" id="networkEffect_1" />
            <label class="form-check-label" for="networkEffect_1">給分</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.networkEffect_2" type="checkbox" id="networkEffect_2"
              @click="networkEffectNoGivePoint()" />
            <label class="form-check-label" for="networkEffect_2">不給分</label>
          </div>
        </td>
      </tr>

      <tr>
        <th rowspan="2">利基市場</th>
        <td>在小市場有顯著規模</td>
        <td rowspan="2">1</td>
        <td rowspan="2">
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.nicheMarket_1" @click="nicheMarketGivePoint()" type="checkbox"
              id="nicheMarket_1" />
            <label class="form-check-label" for="nicheMarket_1">給分</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.nicheMarket_2" type="checkbox" id="nicheMarket_2"
              @click="nicheMarketNoGivePoint()" />
            <label class="form-check-label" for="nicheMarket_2">不給分</label>
          </div>
        </td>
      </tr>
      <tr>
        <td>地理壟斷</td>
      </tr>
      <tr>
        <th scope="row">信心</th>
        <td>認為還可以存在超過10年</td>
        <td>1</td>
        <td>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.confidence_1" @click="confidenceGivePoint()" type="checkbox"
              id="confidence_1" />
            <label class="form-check-label" for="confidence_1">給分</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.confidence_2" type="checkbox" id="confidence_2"
              @click="confidenceNoGivePoint()" />
            <label class="form-check-label" for="confidence_2">不給分</label>
          </div>
        </td>
      </tr>
      <tr>
        <td></td>
        <td>
          <button type="button" class="btn btn-primary" @click="reset()">
            <font-awesome-icon icon="fa-rotate-left" />
            Reset
          </button>
        </td>
        <td style="background-color: #f6b3bb">總分</td>
        <td style="background-color: #f6b3bb">{{ total }}</td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td/>
        <td />
        <td>
          <button type="button" class="btn btn-success" @click="exportToCSV()">
            <font-awesome-icon icon="fa-file-csv" />
            匯出csv
          </button>
        </td>
        <td></td>
      </tr>
    </tbody>
  </table>
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
  // 品牌
  brand_1: "",
  brand_2: "",
  // 專利
  patent_1: "",
  patent_2: "",
  // 成本優勢
  costAdvantage_1: "",
  costAdvantage_2: "",
  // 轉換成本
  conversionCost_1: "",
  conversionCost_2: "",
  // 網路效應
  networkEffect_1: "",
  networkEffect_2: "",
  // 利基市場
  nicheMarket_1: "",
  nicheMarket_2: "",
  // 信心
  confidence_1: "",
  confidence_2: "",
});

let brandPoints = ref(0);
let patentPoints = ref(0);
let costAdvantagePoints = ref(0);
let conversionCostPonits = ref(0);
let networkEffectPoints = ref(0);
let nicheMarketPoints = ref(0);
let confidencePoints = ref(0);
let total = ref(0);

// 品牌
function brandGivePoint() {
  form.brand_2 = false;
  brandPoints.value = 1;
  if (form.brand_1 == true) {
    brandPoints.value = 0;
  }
}

function brandNoGivePoint() {
  form.brand_1 = false;
  brandPoints.value = 0;
}

// 專利
function patentGivePoint() {
  form.patent_2 = false;
  patentPoints.value = 1;
  if (form.patent_1 == true) {
    patentPoints.value = 0;
  }
}

function patentNoGivePoint() {
  form.patent_1 = false;
  patentPoints.value = 0;
}

// 成本優勢
function costAdvantageGivePoint() {
  form.costAdvantage_2 = false;
  costAdvantagePoints.value = 1;
  if (form.costAdvantage_1 == true) {
    costAdvantagePoints.value = 0;
  }
}

function costAdvantageNoGivePoint() {
  form.costAdvantage_1 = false;
  costAdvantagePoints.value = 0;
}

// 轉換成本
function conversionCostGivePoint() {
  form.conversionCost_2 = false;
  conversionCostPonits.value = 1;
  if (form.conversionCost_1 == true) {
    conversionCostPonits.value = 0;
  }
}

function conversionCostNoGivePoint() {
  form.conversionCost_1 = false;
  conversionCostPonits.value = 0;
}

// 網路效應
function networkEffectGivePoint() {
  form.networkEffect_2 = false;
  networkEffectPoints.value = 1;
  if (form.networkEffect_1 == true) {
    networkEffectPoints.value = 0;
  }
}

function networkEffectNoGivePoint() {
  form.networkEffect_1 = false;
  networkEffectPoints.value = 0;
}

// 利基市場
function nicheMarketGivePoint() {
  form.nicheMarket_2 = false;
  nicheMarketPoints.value = 1;
  if (form.nicheMarket_1 == true) {
    nicheMarketPoints.value = 0;
  }
}

function nicheMarketNoGivePoint() {
  form.nicheMarket_1 = false;
  nicheMarketPoints.value = 0;
}

// 信心
function confidenceGivePoint() {
  form.confidence_2 = false;
  confidencePoints.value = 1;
  if (form.confidence_1 == true) {
    confidencePoints.value = 0;
  }
}

function confidenceNoGivePoint() {
  form.confidence_1 = false;
  confidencePoints.value = 0;
}

watch(form, () => {
  count();
});

function count() {
  total.value =
    brandPoints.value +
    patentPoints.value +
    costAdvantagePoints.value +
    conversionCostPonits.value +
    networkEffectPoints.value +
    nicheMarketPoints.value +
    confidencePoints.value;
}

function reset() {
  stock.value = "";
  form.brand_1 = "";
  form.brand_2 = "";
  form.patent_1 = "";
  form.patent_2 = "";
  form.costAdvantage_1 = "";
  form.costAdvantage_2 = "";
  form.conversionCost_1 = "";
  form.conversionCost_2 = "";
  form.networkEffect_1 = "";
  form.networkEffect_2 = "";
  form.nicheMarket_1 = "";
  form.nicheMarket_2 = "";
  form.confidence_1 = "";
  form.confidence_2 = "";
  brandPoints.value = 0;
  patentPoints.value = 0;
  costAdvantagePoints.value = 0;
  conversionCostPonits.value = 0;
  networkEffectPoints.value = 0;
  nicheMarketPoints.value = 0;
  confidencePoints.value = 0;
}

//
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
      護城河項目: "品牌",
      競爭優勢: "你會因為這個品牌而購買嗎？",
      可獲的分數: 1,
      給分:
        form.brand_1 == "" && form.brand_2 == ""
          ? null
          : `${form.brand_1 ? "✓" : "✗"}`,
    },
    {
      護城河項目: "",
      競爭優勢: "品牌會影響你的消費決策嗎？",
      可獲的分數: "",
      給分: "",
    },
    {
      護城河項目: "",
      競爭優勢: "你願意因為這個品牌多付一些錢嗎？",
      可獲的分數: "",
      給分: "",
    },
    {
      護城河項目: "",
      競爭優勢: "",
      可獲的分數: "",
      給分: "",
    },
    {
      護城河項目: "專利、特許執照",
      競爭優勢: "專利：企業取得法律的保護，競爭者無法製造任何相似的產品",
      可獲的分數: 1,
      給分:
        form.patent_1 == "" && form.patent_2 == ""
          ? null
          : `${form.patent_1 ? "✓" : "✗"}`,
    },
    {
      護城河項目: "",
      競爭優勢: "特許：擁有不易申請通過的政府許可經營執照",
      可獲的分數: "",
      給分: "",
    },
    {
      護城河項目: "",
      競爭優勢: "",
      可獲的分數: "",
      給分: "",
    },
    {
      護城河項目: "成本優勢",
      競爭優勢: "生產成本：擁有別人沒有的低生產成本或掌握通路",
      可獲的分數: 1,
      給分:
        form.costAdvantage_1 == "" && form.costAdvantage_2 == ""
          ? null
          : `${form.costAdvantage_1 ? "✓" : "✗"}`,
    },
    {
      護城河項目: "",
      競爭優勢: "運輸成本：有好的地理位置，降低運輸成本",
      可獲的分數: "",
      給分: "",
    },
    {
      護城河項目: "",
      競爭優勢: "特有資產：擁有世界級的天然資源",
      可獲的分數: "",
      給分: "",
    },

    {
      護城河項目: "",
      競爭優勢: "經濟規模：規模是同業的5倍以上",
      可獲的分數: "",
      給分: "",
    },
    {
      護城河項目: "",
      競爭優勢: "",
      可獲的分數: "",
      給分: "",
    },
    {
      護城河項目: "高轉換成本",
      競爭優勢: "轉換過程會產生大量風險或機會成本",
      可獲的分數: 1,
      給分:
        form.conversionCost_1 == "" && form.conversionCost_2 == ""
          ? null
          : `${form.conversionCost_1 ? "✓" : "✗"}`,
    },
    {
      護城河項目: "網絡效應",
      競爭優勢: "產品價值隨著使用的人數上升而提升",
      可獲的分數: 1,
      給分:
        form.networkEffect_1 == "" && form.networkEffect_2 == ""
          ? null
          : `${form.networkEffect_1 ? "✓" : "✗"}`,
    },
    {
      護城河項目: "",
      競爭優勢: "",
      可獲的分數: "",
      給分: "",
    },
    {
      護城河項目: "利基市場",
      競爭優勢: "在小市場有顯著規模",
      可獲的分數: 1,
      給分:
        form.nicheMarket_1 == "" && form.nicheMarket_2 == ""
          ? null
          : `${form.nicheMarket_1 ? "✓" : "✗"}`,
    },
    {
      護城河項目: "",
      競爭優勢: "地理壟斷",
      可獲的分數: "",
      給分: "",
    },
    {
      護城河項目: "",
      競爭優勢: "",
      可獲的分數: "",
      給分: "",
    },
    {
      護城河項目: "信心",
      競爭優勢: "認為還可以存在超過10年",
      可獲的分數: 1,
      給分:
        form.confidence_1 == "" && form.confidence_2 == ""
          ? null
          : `${form.confidence_1 ? "✓" : "✗"}`,
    },
    { 護城河項目: "", 競爭優勢: "", 可獲的分數: "總分", 給分: total.value },
  ];
  const hasNullScore = data.some((row) => {
    return row.給分 === null;
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
  link.download = `${new Date().toLocaleDateString()}_${stock.value}護城河優勢`;
  link.click();
  window.URL.revokeObjectURL(url);
}
</script>
<style>
.table .m_body tr:nth-child(2) th,
.table .m_body tr:nth-child(5) th,
.table .m_body tr:nth-child(7) th,
.table .m_body tr:nth-child(11) th,
.table .m_body tr:nth-child(12) th,
.table .m_body tr:nth-child(13) th,
.table .m_body tr:nth-child(15) th {
  background-color: #aebad2;
}

.table .m_body tr:nth-child(2),
.table .m_body tr:nth-child(3),
.table .m_body tr:nth-child(4),
.table .m_body tr:nth-child(5),
.table .m_body tr:nth-child(6),
.table .m_body tr:nth-child(7),
.table .m_body tr:nth-child(8),
.table .m_body tr:nth-child(9),
.table .m_body tr:nth-child(10),
.table .m_body tr:nth-child(11),
.table .m_body tr:nth-child(12),
.table .m_body tr:nth-child(13),
.table .m_body tr:nth-child(14),
.table .m_body tr:nth-child(15) {
  background-color: rgb(232, 238, 251);
}

.table .m_body tr:nth-child(2) td:nth-child(4),
.table .m_body tr:nth-child(5) td:nth-child(4),
.table .m_body tr:nth-child(7) td:nth-child(4),
.table .m_body tr:nth-child(11) td:nth-child(4),
.table .m_body tr:nth-child(12) td:nth-child(4),
.table .m_body tr:nth-child(13) td:nth-child(4),
.table .m_body tr:nth-child(15) td:nth-child(4) {
  background-color: #fff;
}
</style>
