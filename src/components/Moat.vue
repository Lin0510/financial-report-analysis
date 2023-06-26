<template>
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
            <input
              class="form-check-input"
              v-model="form.brand_1"
              @click="brandGivePoint()"
              type="checkbox"
              id="brand_1"
            />
            <label class="form-check-label" for="brand_1">給分</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              v-model="form.brand_2"
              type="checkbox"
              id="brand_2"
              @click="brandNoGivePoint()"
            />
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
            <input
              class="form-check-input"
              v-model="form.patent_1"
              @click="patentGivePoint()"
              type="checkbox"
              id="patent_1"
            />
            <label class="form-check-label" for="patent_1">給分</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              v-model="form.patent_2"
              type="checkbox"
              id="patent_2"
              @click="patentNoGivePoint()"
            />
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
            <input
              class="form-check-input"
              v-model="form.costAdvantage_1"
              @click="costAdvantageGivePoint()"
              type="checkbox"
              id="costAdvantage_1"
            />
            <label class="form-check-label" for="costAdvantage_1">給分</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              v-model="form.costAdvantage_2"
              type="checkbox"
              id="costAdvantage_2"
              @click="costAdvantageNoGivePoint()"
            />
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
            <input
              class="form-check-input"
              v-model="form.conversionCost_1"
              @click="conversionCostGivePoint()"
              type="checkbox"
              id="conversionCost_1"
            />
            <label class="form-check-label" for="conversionCost_1">給分</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              v-model="form.conversionCost_2"
              type="checkbox"
              id="conversionCost_2"
              @click="conversionCostNoGivePoint()"
            />
            <label class="form-check-label" for="conversionCost_2"
              >不給分</label
            >
          </div>
        </td>
      </tr>
      <tr>
        <th scope="row">網絡效應</th>
        <td>產品價值隨著使用的人數上升而提升</td>
        <td>1</td>
        <td>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              v-model="form.networkEffect_1"
              @click="networkEffectGivePoint()"
              type="checkbox"
              id="networkEffect_1"
            />
            <label class="form-check-label" for="networkEffect_1">給分</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              v-model="form.networkEffect_2"
              type="checkbox"
              id="networkEffect_2"
              @click="networkEffectNoGivePoint()"
            />
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
            <input
              class="form-check-input"
              v-model="form.nicheMarket_1"
              @click="nicheMarketGivePoint()"
              type="checkbox"
              id="nicheMarket_1"
            />
            <label class="form-check-label" for="nicheMarket_1">給分</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              v-model="form.nicheMarket_2"
              type="checkbox"
              id="nicheMarket_2"
              @click="nicheMarketNoGivePoint()"
            />
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
            <input
              class="form-check-input"
              v-model="form.confidence_1"
              @click="confidenceGivePoint()"
              type="checkbox"
              id="confidence_1"
            />
            <label class="form-check-label" for="confidence_1">給分</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              v-model="form.confidence_2"
              type="checkbox"
              id="confidence_2"
              @click="confidenceNoGivePoint()"
            />
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
    </tbody>
  </table>
</template>
<script setup>
import { reactive, ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";

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
