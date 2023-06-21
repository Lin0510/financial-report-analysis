<template>
  <div class="container" v-if="!isEdit">
    <div class="row justify-content-center">
      <div class="col-md-4 col-sm-10">
        <div class="input-group has-validation">
          <input v-model="stock" @input="restrictInput($event)" maxlength="5" class="form-control"
            placeholder="請輸入股票代碼，只能輸入英文字母和." :class="{ 'is-invalid': isStockEmpty || !stockExsits }"
            :disabled="isDisabled" @keyup.enter="confirm()" />
          <div v-if="isStockEmpty || !stockExsits" class="invalid-feedback">
            {{ errorMessage }}
          </div>
        </div>
        <div class="input-group-append button-group">
          <button class="btn btn-primary" @click="confirm" :disabled="isDisabled">
            <span v-if="isLoading" class="spinner-border spinner-border-sm" style="margin-right:10px" />
            <font-awesome-icon icon="fa-magnifying-glass" />
            查詢
          </button>
          <button class="btn btn-secondary" @click="clear" :disabled="isDisabled">
            <font-awesome-icon icon="fa-eraser" />
            清除
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="container" v-else>
    <div class="row justify-content-center">
      <div class="col-md-4 col-sm-8">
        <div class="form-group">
          <label for="stockLabel">分析股票代碼</label>
          <input id="stockLabel" class="form-control" :value="stock" disabled />
        </div>
        <div class="form-group">
          <label for="nameLabel">股票名稱</label>
          <input id="nameLabel" class="form-control" :value="stockName" disabled />
        </div>
        <div class="form-group">
          <label for="priceLabel">現在股價</label>
          <div class="input-group">
            <input id="priceLabel" class="form-control" :class="{ 'is-invalid': isCallLimitReached }"
              :value="stockPrice" disabled />
            <span class="input-group-text">{{currency}}</span>
            <div v-if="isCallLimitReached" class="invalid-feedback">
              {{ stockPriceErrorMessage }}
            </div>
            <div v-else class="input-groutruep-append" style="padding: 0 0.5rem">
              <button class="btn" :class="{
                  'btn-outline-secondary': !isCopied,
                  'btn-outline-success': isCopied,
                }" type="button" @click="touchCopy()">
                <font-awesome-icon v-if="isCopied" icon="fa-paste" />
                <font-awesome-icon v-else icon="fa-clipboard" />
                {{ isCopied ? "已複製" : "複製股價" }}
              </button>
            </div>
          </div>
        </div>
        <div class="text-center button-group">
          <button class="btn btn-primary" @click="edit">
            <font-awesome-icon icon="fa-edit" />
            編輯</button>
        </div>
      </div>
    </div>
  </div>

  <table class="table">
    <thead>
      <tr>
        <th class="table-dark">【REITs】評分標準</th>
        <th />
        <th />
        <th />
        <th>
          <button class="btn btn-outline-success btn-sm" @click="openUrls()" :disabled="isDisabled">
            <span v-if="isLoading" class="spinner-border spinner-border-sm" style="margin-right:10px" />
            <font-awesome-icon icon="fa-window-restore" />
            一鍵開啟財報網址
          </button>
        </th>
      </tr>
    </thead>
    <tbody class="reits_body">
      <tr class="title">
        <th>評分數據</th>
        <th>評分標準</th>
        <th>給分標準</th>
        <th>給分</th>
        <th>網址</th>
      </tr>
      <tr>
        <th rowspan="3">Divdend 股息</th>
        <td>10年每年持續穩定發股息</td>
        <td>0.5</td>
        <td>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.divdend1_1" @click="divdend1GetPoint()" type="checkbox"
              id="divdend1_1" />
            <label class="form-check-label" for="divdend1_1">給分</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.divdend1_2" type="checkbox" id="divdend1_2"
              @click="divdend1NotGetPoint()" />
            <label class="form-check-label" for="divdend1_2">不給分</label>
          </div>
        </td>
        <td rowspan="2" class="SMN_effect-15">
          <a :href="stockrowUrl" target="_blank">stockrow</a>
        </td>
      </tr>
      <tr>
        <td>10年股息每年越發越多</td>
        <td>1</td>
        <td>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.divdend2_1" @click="divdend2GetPoint()" type="checkbox"
              id="divdend2_1" />
            <label class="form-check-label" for="divdend2_1">給分</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.divdend2_2" type="checkbox" id="divdend2_2"
              @click="divdend2NotGetPoint()" />
            <label class="form-check-label" for="divdend2_2">不給分</label>
          </div>
        </td>
      </tr>
      <tr>
        <td>5年股息成長率 > 10年股息成長率</td>
        <td>0.5</td>
        <td>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.divdend3_1" @click="divdend3GetPoint()" type="checkbox"
              id="divdend3_1" />
            <label class="form-check-label" for="divdend3_1">給分</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.divdend3_2" type="checkbox" id="divdend3_2"
              @click="divdend3NotGetPoint()" />
            <label class="form-check-label" for="divdend3_2">不給分</label>
          </div>
        </td>
        <td class="SMN_effect-15">
          <a :href="gurufocusUrl" target="_blank">gurufocus</a>
        </td>
      </tr>
      <tr>
        <th scope="row" style="color: red">EPS (Diluted) 每股盈餘</th>
        <td style="color: red">10年穩定</td>
        <td>1</td>
        <td>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.eps_1" @click="epsGetPoint()" type="checkbox" id="eps_1" />
            <label class="form-check-label" for="eps_1">給分</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.eps_2" type="checkbox" id="eps_2" @click="epsNotGetPoint()" />
            <label class="form-check-label" for="eps_2">不給分</label>
          </div>
        </td>
        <td class="SMN_effect-15">
          <a :href="incomeUrl" target="_blank">stockrow Income</a>
        </td>
      </tr>
      <tr>
        <th scope="row">Shares (Common) 流通股數</th>
        <td>流通股數10年穩定減少</td>
        <td>1</td>
        <td>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.shares_1" @click="sharesGetPoint()" type="checkbox"
              id="shares_1" />
            <label class="form-check-label" for="shares_1">給分</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.shares_2" type="checkbox" id="shares_2"
              @click="sharesNotGetPoint()" />
            <label class="form-check-label" for="shares_2">不給分</label>
          </div>
        </td>
        <td class="SMN_effect-15">
          <a :href="balanceSheetUrl" target="_blank">stockrow Balance Sheet</a>
        </td>
      </tr>
      <tr>
        <th scope="row">Debt / Equity 負債權益比</th>
        <td>D/E &lt; 0.5</td>
        <td>1</td>
        <td>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.de_1" @click="deGetPoint()" type="checkbox" id="de_1" />
            <label class="form-check-label" for="de_1">給分</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.de_2" type="checkbox" id="de_2" @click="deNotGetPoint()" />
            <label class="form-check-label" for="de_2">不給分</label>
          </div>
        </td>
        <td rowspan="6" class="SMN_effect-15">
          <a :href="mertricsUrl" target="_blank">stockrow Metrics</a>
        </td>
      </tr>
      <tr>
        <th style="color: red">ROE(％) 股東權益率</th>
        <td style="color: red">10年 ROE 穩定</td>
        <td>1</td>
        <td>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.roe_1" @click="roeGetPoint()" type="checkbox" id="roe_1" />
            <label class="form-check-label" for="roe_1">給分</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.roe_2" type="checkbox" id="roe_2" @click="roeNotGetPoint()" />
            <label class="form-check-label" for="roe_2">不給分</label>
          </div>
        </td>
      </tr>
      <tr>
        <th scope="row">Book Value Per Share 每股淨值</th>
        <td>10年穩定成長</td>
        <td>1</td>
        <td>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.bvps_1" @click="bvpsGetPoint()" type="checkbox" id="bvps_1" />
            <label class="form-check-label" for="bvps_1">給分</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.bvps_2" type="checkbox" id="bvps_2"
              @click="bvpsNotGetPoint()" />
            <label class="form-check-label" for="bvps_2">不給分</label>
          </div>
        </td>
      </tr>
      <tr>
        <th style="color: red" scope="row">Free Cash Flow 自由現金流</th>
        <td style="color: red">10年皆為正數且越來越多</td>
        <td>1</td>
        <td>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.fcf_1" @click="fcfGetPoint()" type="checkbox" id="fcf_1" />
            <label class="form-check-label" for="fcf_1">給分</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.fcf_2" type="checkbox" id="fcf_2" @click="fcfNotGetPoint()" />
            <label class="form-check-label" for="fcf_2">不給分</label>
          </div>
        </td>
      </tr>
      <tr>
        <th rowspan="2">Net Margin(%)淨利率</th>
        <td>10年 Net Margin > 10%</td>
        <td>1</td>
        <td>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.net1_1" @click="net1GetPoint()" type="checkbox" id="net1_1" />
            <label class="form-check-label" for="net1_1">給分</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.net1_2" type="checkbox" id="net1_2"
              @click="net1NotGetPoint()" />
            <label class="form-check-label" for="net1_2">不給分</label>
          </div>
        </td>
      </tr>
      <tr>
        <td>10年穩定不衰退</td>
        <td>0.5</td>
        <td>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.net2_1" @click="net2GetPoint()" type="checkbox" id="net2_1" />
            <label class="form-check-label" for="net2_1">給分</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.net2_2" type="checkbox" id="net2_2"
              @click="net2NotGetPoint()" />
            <label class="form-check-label" for="net2_2">不給分</label>
          </div>
        </td>
      </tr>
      <tr>
        <th style="color: red" scope="row">Funds From Operations (OCF)營運現金流</th>
        <td style="color: red">10年皆為正數且越來越多</td>
        <td>1</td>
        <td>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.ffo_1" @click="ffoGetPoint()" type="checkbox" id="ffo_1" />
            <label class="form-check-label" for="ffo_1">給分</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.ffo_2" type="checkbox" id="ffo_2" @click="ffoNotGetPoint()" />
            <label class="form-check-label" for="ffo_2">不給分</label>
          </div>
        </td>
        <td class="SMN_effect-15">
          <a :href="marketWatchUrl" target="_blank">MarketWatch</a>
        </td>
      </tr>
      <tr>
        <th rowspan="2">IC 利息保障倍數</th>
        <td>IC > 10 或 “-”</td>
        <td>1</td>
        <td>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.ic1_1" @click="ic1GetPoint()" type="checkbox" id="ic1_1" />
            <label class="form-check-label" for="ic1_1">給分</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.ic1_2" type="checkbox" id="ic1_2" @click="ic1NotGetPoint()" />
            <label class="form-check-label" for="ic1_2">不給分</label>
          </div>
        </td>
        <td rowspan="2" class="SMN_effect-15">
          <a :href="morningStarUrl" target="_blank">Morningstar Key Ratio Data</a>
        </td>
      </tr>
      <tr>
        <td>IC > 5</td>
        <td>0.5</td>
        <td>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.ic2_1" @click="ic2GetPoint()" type="checkbox" id="ic2_1" />
            <label class="form-check-label" for="ic2_1">給分</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.ic2_2" type="checkbox" id="ic2_2" @click="ic2NotGetPoint()" />
            <label class="form-check-label" for="ic2_2">不給分</label>
          </div>
        </td>
      </tr>
      <tr>
        <td></td>
        <td style="background-color: #f6b3bb">總分</td>
        <td style="background-color: #f6b3bb">{{ total }}</td>
        <td>
          <button class="btn btn-sm" :class="{ 'btn-outline-dark': !isTotalCopied, 'btn-success': isTotalCopied }"
            type="button" @click="touchCopyTotal()" style="margin-right:7px">
            <font-awesome-icon v-if="isTotalCopied" icon="fa-paste" />
            <font-awesome-icon v-else icon="fa-clipboard" />
            {{ isTotalCopied ? "已複製" : "複製總分" }}
          </button>
          <button type="button" class="btn btn-primary" @click="reset()">
            <font-awesome-icon icon="fa-rotate-left" />
            Reset
          </button>
        </td>
        <td></td>
      </tr>
      <tr>
        <td />
        <td />
        <td />
        <td />
        <td />
      </tr>
    </tbody>
  </table>
</template>
<script setup>
import { reactive, ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import useClipboard from "vue-clipboard3";

let form = reactive({
  divdend1_1: "",
  divdend1_2: "",
  divdend2_1: "",
  divdend2_2: "",
  divdend3_1: "",
  divdend3_2: "",
  eps_1: "",
  eps_2: "",
  shares_1: "",
  shares_2: "",
  de_1: "",
  de_2: "",
  roe_1: "",
  roe_2: "",
  bvps_1: "",
  bvps_2: "",
  fcf_1: "",
  fcf_2: "",
  ffo_1: "",
  ffo_2: "",
  net1_1: "",
  net1_2: "",
  net2_1: "",
  net2_2: "",
  ic1_1: "",
  ic1_2: "",
  ic2_1: "",
  ic2_2: "",
  total: 0,
});

let divdend1Points = ref(0);
let divdend2Points = ref(0);
let divdend3Points = ref(0);
let epsPoints = ref(0);
let sharesPoints = ref(0);
let dePoints = ref(0);
let roePoints = ref(0);
let bvpsPoints = ref(0);
let fcfPoints = ref(0);
let ffoPoints = ref(0);
let net1Points = ref(0);
let net2Points = ref(0);
let ic1Points = ref(0);
let ic2Points = ref(0);
let total = ref(0);

// Divdend
watch(
  () => form.divdend1_1,
  (newValue) => {
    if (newValue) {
      form.divdend2_2 = true;
      form.divdend2_1 = false;
      divdend2Points.value = 0;
    }
  }
);

watch(
  () => form.divdend2_1,
  (newValue) => {
    if (newValue) {
      form.divdend1_2 = true;
      form.divdend1_1 = false;
      divdend1Points.value = 0;
    }
  }
);

// IC
watch(
  () => form.ic1_1,
  (newValue) => {
    if (newValue) {
      form.ic2_2 = true;
      form.ic2_1 = false;
      ic2Points.value = 0;
    }
  }
);
watch(
  () => form.ic2_1,
  (newValue) => {
    if (newValue) {
      form.ic1_2 = true;
      form.ic1_1 = false;
      ic1Points.value = 0;
    }
  }
);
// Divdend
// 10年每年持續穩定發股息
function divdend1GetPoint() {
  form.divdend1_2 = false;
  divdend1Points.value = 0.5;
  if (form.divdend1_1 == true) {
    divdend1Points.value = 0;
  }
}

function divdend1NotGetPoint() {
  form.divdend1_1 = false;
  divdend1Points.value = 0;
}
// 10年股息每年越發越多
function divdend2GetPoint() {
  form.divdend2_2 = false;
  divdend2Points.value = 1;
  if (form.divdend2_1 == true) {
    divdend2Points.value = 0;
  }
}

function divdend2NotGetPoint() {
  form.divdend2_1 = false;
  divdend2Points.value = 0;
}

function divdend3GetPoint() {
  form.divdend3_2 = false;
  divdend3Points.value = 0.5;
  if (form.divdend3_1 == true) {
    divdend3Points.value = 0;
  }
}

function divdend3NotGetPoint() {
  form.divdend3_1 = false;
  divdend3Points.value = 0;
}

// EPS
function epsGetPoint() {
  form.eps_2 = false;
  epsPoints.value = 1;
  if (form.eps_1 == true) {
    epsPoints.value = 0;
  }
}

function epsNotGetPoint() {
  form.eps_1 = false;
  epsPoints.value = 0;
}

// Shares
function sharesGetPoint() {
  form.shares_2 = false;
  sharesPoints.value = 1;
  if (form.shares_1 == true) {
    sharesPoints.value = 0;
  }
}

function sharesNotGetPoint() {
  form.shares_1 = false;
  sharesPoints.value = 0;
}

// D/E
function deGetPoint() {
  form.de_2 = false;
  dePoints.value = 1;
  if (form.de_1 == true) {
    dePoints.value = 0;
  }
}

function deNotGetPoint() {
  form.de_1 = false;
  dePoints.value = 0;
}

// ROE
function roeGetPoint() {
  form.roe_2 = false;
  roePoints.value = 1;
  if (form.roe_1 == true) {
    roePoints.value = 0;
  }
}

function roeNotGetPoint() {
  form.roe_1 = false;
  roePoints.value = 0;
}

// BVPS
function bvpsGetPoint() {
  form.bvps_2 = false;
  bvpsPoints.value = 1;
  if (form.bvps_1 == true) {
    bvpsPoints.value = 0;
  }
}

function bvpsNotGetPoint() {
  form.bvps_1 = false;
  bvpsPoints.value = 0;
}

// FCF
function fcfGetPoint() {
  form.fcf_2 = false;
  fcfPoints.value = 1;
  if (form.fcf_1 == true) {
    fcfPoints.value = 0;
  }
}

function fcfNotGetPoint() {
  form.fcf_1 = false;
  fcfPoints.value = 0;
}

// FFO
function ffoGetPoint() {
  form.ffo_2 = false;
  ffoPoints.value = 1;
  if (form.ffo_1 == true) {
    ffoPoints.value = 0;
  }
}

function ffoNotGetPoint() {
  form.ffo_1 = false;
  ffoPoints.value = 0;
}

// Net Margin
function net1GetPoint() {
  form.net1_2 = false;
  net1Points.value = 1;
  if (form.net1_1 == true) {
    net1Points.value = 0;
  }
}

function net1NotGetPoint() {
  form.net1_1 = false;
  net1Points.value = 0;
}

function net2GetPoint() {
  form.net2_2 = false;
  net2Points.value = 0.5;
  if (form.net2_1 == true) {
    net2Points.value = 0;
  }
}

function net2NotGetPoint() {
  form.net2_1 = false;
  net2Points.value = 0;
}

// IC利息保障倍數
function ic1GetPoint() {
  form.ic1_2 = false;
  ic1Points.value = 1;
  if (form.ic1_1 == true) {
    ic1Points.value = 0;
  }
}

function ic1NotGetPoint() {
  form.ic1_1 = false;
  ic1Points.value = 0;
}

function ic2GetPoint() {
  form.ic2_2 = false;
  ic2Points.value = 0.5;
  if (form.ic2_1 == true) {
    ic2Points.value = 0;
  }
}

function ic2NotGetPoint() {
  form.ic2_1 = false;
  ic2Points.value = 0;
}

watch(form, () => {
  count();
});

function count() {
  total.value =
    divdend1Points.value +
    divdend2Points.value +
    divdend3Points.value +
    epsPoints.value +
    sharesPoints.value +
    dePoints.value +
    roePoints.value +
    bvpsPoints.value +
    fcfPoints.value +
    ffoPoints.value +
    net1Points.value +
    net2Points.value +
    ic1Points.value +
    ic2Points.value;
}

function reset() {
  form.divdend1_1 = "";
  form.divdend1_2 = "";
  form.divdend2_1 = "";
  form.divdend2_2 = "";
  form.divdend3_1 = "";
  form.divdend3_2 = "";
  form.eps_1 = "";
  form.eps_2 = "";
  form.shares_1 = "";
  form.shares_2 = "";
  form.de_1 = "";
  form.de_2 = "";
  form.roe_1 = "";
  form.roe_2 = "";
  form.bvps_1 = "";
  form.bvps_2 = "";
  form.fcf_1 = "";
  form.fcf_2 = "";
  form.ffo_1 = "";
  form.ffo_2 = "";
  form.net1_1 = "";
  form.net1_2 = "";
  form.net2_1 = "";
  form.net2_2 = "";
  form.ic1_1 = "";
  form.ic1_2 = "";
  form.ic2_1 = "";
  form.ic2_2 = "";
  divdend1Points.value = 0;
  divdend2Points.value = 0;
  divdend3Points.value = 0;
  epsPoints.value = 0;
  sharesPoints.value = 0;
  dePoints.value = 0;
  roePoints.value = 0;
  bvpsPoints.value = 0;
  fcfPoints.value = 0;
  ffoPoints.value = 0;
  net1Points.value = 0;
  net2Points.value = 0;
  ic1Points.value = 0;
  ic2Points.value = 0;
}

// =======================================================================
// url
const stockRowIndex = "https://stockrow.com/";
const gurufocusIndex = "https://www.gurufocus.com/";
const morningStarIndex = "https://www.morningstar.com/";
const marketWatchIndex = "https://www.marketwatch.com/";
const stockrowUrl = ref(stockRowIndex);
const incomeUrl = ref(stockRowIndex);
const balanceSheetUrl = ref(stockRowIndex);
const mertricsUrl = ref(stockRowIndex);
const gurufocusUrl = ref(gurufocusIndex);
const morningStarUrl = ref(morningStarIndex);
const marketWatchUrl = ref(marketWatchIndex);
// -------------------------------------------
// stock api
const IEXCloudAPI = (stockCode) => {
  return `https://api.iex.cloud/v1/data/core/quote/${stockCode}?token=pk_a1bf9b4aef2045e2bcff3f6eb3bff015`;
};
// =======================================================================
// 股票代碼
const stock = ref("");
// 股票名稱
const stockName = ref("");
// 股票價格
const stockPrice = ref("");
// 股票貨幣
const currency = ref("");

// 是否切換編輯
const isEdit = ref(false);
// 股票代碼是否未填
const isStockEmpty = ref(false);
// 股票代碼是否存在
const stockExsits = ref(true);
// 查詢次數是否達上限
const isCallLimitReached = ref(false);
// 是否loading
const isLoading = ref(false);
const isDisabled = ref(false);
// 錯誤訊息
const errorMessage = ref("");
const stockPriceErrorMessage = ref("");
// 輸入框規則
const rule = {
  stock: { required },
};
const v$ = useVuelidate(rule, { stock });

async function confirm() {
  if (stock.value === "") {
    isStockEmpty.value = true;
    errorMessage.value = "請輸入股票代碼";
    return;
  }

  if (v$.value.$invalid) {
    isStockEmpty.value = false;
    errorMessage.value = "";
    return;
  }

  let stockCode = stock.value;
  if (stock.value.includes(".")) {
    stockCode = stock.value.replace(".", "-");
  }

  try {
    isLoading.value = true;
    isDisabled.value = true;

    // 呼叫查詢股票api
    const IEXResponse = await fetch(IEXCloudAPI(stockCode));
    const IEXData = await IEXResponse.json();
    const data = IEXData[0];

    if (!data) {
      // 處理data為空的情况
      stockExsits.value = false;
      errorMessage.value = "查無股票代碼";
    } else {
      stockExsits.value = true;
      stockName.value = data.companyName;
      stockPrice.value = data.latestPrice;
      currency.value = `${data.currency}`;
    }

    if (stockExsits.value) {
      // 修改url
      stockrowUrl.value = stockRowIndex + stock.value;
      incomeUrl.value = stockrowUrl.value + "/financials/income/annual";
      balanceSheetUrl.value = stockrowUrl.value + "/financials/balance/annual";
      mertricsUrl.value = stockrowUrl.value + "/financials/metrics/annual";
      gurufocusUrl.value = `https://www.gurufocus.com/stock/${stock.value}/dividend`;
      marketWatchUrl.value = `${marketWatchIndex}investing/stock/${stock.value}/financials/cash-flow`;

      // 查詢morningStar網址，xnas/xnys/bats
      async function checkURL(url) {
        try {
          // 開發環境使用
          // const response = await fetch("/api" + url, { method: "HEAD" });
          const response = await fetch("https://cors-anywhere.herokuapp.com/https://www.morningstar.com/stocks" + url, { method: "HEAD" });
          return response.ok;
        } catch (error) {
          morningStarUrl.value = `https://www.morningstar.com/search?query=${stock.value}`;
          console.error(error);
        }
      }

      const stockSymbol = stock.value;
      const xnasValuationUrl = `/xnas/${stockSymbol}/valuation`;
      const xnysValuationUrl = `/xnys/${stockSymbol}/valuation`;
      const batsValuationUrl = `/bats/${stockSymbol}/valuation`;

      try {
        const isXnasValid = await checkURL(xnasValuationUrl);
        if (isXnasValid) {
          morningStarUrl.value = `https://www.morningstar.com/stocks${xnasValuationUrl}`;
        } else {
          const isXnysValid = await checkURL(xnysValuationUrl);
          if (isXnysValid) {
            morningStarUrl.value = `https://www.morningstar.com/stocks${xnysValuationUrl}`;
          } else {
            morningStarUrl.value = `https://www.morningstar.com/stocks${batsValuationUrl}`;
          }
        }
      } catch (error) {
        morningStarUrl.value = `https://www.morningstar.com/search?query=${stockSymbol}`;
        console.error(error);
      }

      isEdit.value = true;
      stock.value = stock.value.toUpperCase();
      isStockEmpty.value = false;
      errorMessage.value = "";
    }
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
    isDisabled.value = false;
  }
}

function clear() {
  stock.value = "";
  stockName.value = "";
  stockPrice.value = "";
  isStockEmpty.value = false;
  stockExsits.value = true;
  isCopied.value = false;
}
function edit() {
  isEdit.value = false;
  isCopied.value = false;
  stockName.value = "";
  stockPrice.value = "";
  isCallLimitReached.value = false;
  reset();
}

function restrictInput(event) {
  const regex = /^[a-zA-Z.]*$/; // 正則表達式，只允許英文字母和點號
  const inputValue = event.target.value;
  if (!regex.test(inputValue)) {
    this.stock = inputValue.replace(/[^a-zA-Z.]/g, "");
  }
}

// 初始化剪貼板功能
const { toClipboard } = useClipboard();

const isCopied = ref(false);
async function touchCopy() {
  try {
    await toClipboard(JSON.stringify(stockPrice.value));
    isCopied.value = true;
    setTimeout(() => {
      isCopied.value = false;
    }, 2000);
  } catch (error) {
    console.log(error);
  }
}

const isTotalCopied = ref(false);
async function touchCopyTotal() {
  try {
    await toClipboard(JSON.stringify(total.value));
    isTotalCopied.value = true;
    setTimeout(() => {
      isTotalCopied.value = false;
    }, 2000);
  } catch (error) {
    console.log(error);
  }
}

// 一鍵開啟網址
function openUrls() {
  window.open(stockrowUrl.value, "_blank");
  window.open(gurufocusUrl.value, "_blank");
  window.open(incomeUrl.value, "_blank");
  window.open(balanceSheetUrl.value, "_blank");
  window.open(mertricsUrl.value, "_blank");
  window.open(marketWatchUrl.value, "_blank");
  window.open(morningStarUrl.value, "_blank");
}
</script>
<style>
td,
th {
  vertical-align: middle;
}
td a {
  /* color: rgba(0, 0, 0, 0.8); */
  color: #4f4f4f;
  font-family: Lato;
  font-size: 10pt;
  font-weight: bold;
  position: relative;
  display: block;
  text-decoration: none;
  text-transform: uppercase;
}

.SMN_effect-15 a:before,
.SMN_effect-15 a:after {
  display: inline-block;
  opacity: 0;
  -webkit-transition: -webkit-transform 0.3s, opacity 0.2s;
  -moz-transition: -moz-transform 0.3s, opacity 0.2s;
  transition: transform 0.3s, opacity 0.2s;
}

.SMN_effect-15 a:before {
  margin-right: 10px;
  content: "[";
  -webkit-transform: translateX(20px);
  -moz-transform: translateX(20px);
  transform: translateX(20px);
}

.SMN_effect-15 a:after {
  margin-left: 10px;
  content: "]";
  -webkit-transform: translateX(-20px);
  -moz-transform: translateX(-20px);
  transform: translateX(-20px);
}

.SMN_effect-15 a:hover:before,
.SMN_effect-15 a:hover:after,
.SMN_effect-15 a:focus:before,
.SMN_effect-15 a:focus:after {
  opacity: 1;
  -webkit-transform: translateX(0px);
  -moz-transform: translateX(0px);
  transform: translateX(0px);
}

.title {
  background-color: #f6b3bb;
}

.table .reits_body tr:first-child th,
.table .reits_body tr:nth-child(2) th,
.table .reits_body tr:nth-child(5) th,
.table .reits_body tr:nth-child(6) th,
.table .reits_body tr:nth-child(7) th,
.table .reits_body tr:nth-child(8) th,
.table .reits_body tr:nth-child(9) th,
.table .reits_body tr:nth-child(10) th,
.table .reits_body tr:nth-child(11) th,
.table .reits_body tr:nth-child(13) th,
.table .reits_body tr:nth-child(14) th {
  background-color: #f6b3bb;
}

.table .reits_body tr:nth-child(2),
.table .reits_body tr:nth-child(3),
.table .reits_body tr:nth-child(4),
.table .reits_body tr:nth-child(5),
.table .reits_body tr:nth-child(6),
.table .reits_body tr:nth-child(7),
.table .reits_body tr:nth-child(8),
.table .reits_body tr:nth-child(9),
.table .reits_body tr:nth-child(10),
.table .reits_body tr:nth-child(11),
.table .reits_body tr:nth-child(12),
.table .reits_body tr:nth-child(13),
.table .reits_body tr:nth-child(14),
.table .reits_body tr:nth-child(15) {
  background-color: #eee7e7;
}

.table .reits_body tr:nth-child(1) td:nth-child(3),
.table .reits_body tr:nth-child(2) td:nth-child(4),
.table .reits_body tr:nth-child(3) td:nth-child(3),
.table .reits_body tr:nth-child(4) td:nth-child(3),
.table .reits_body tr:nth-child(5) td:nth-child(4),
.table .reits_body tr:nth-child(6) td:nth-child(4),
.table .reits_body tr:nth-child(7) td:nth-child(4),
.table .reits_body tr:nth-child(8) td:nth-child(4),
.table .reits_body tr:nth-child(9) td:nth-child(4),
.table .reits_body tr:nth-child(10) td:nth-child(4),
.table .reits_body tr:nth-child(11) td:nth-child(4),
.table .reits_body tr:nth-child(12) td:nth-child(3),
.table .reits_body tr:nth-child(13) td:nth-child(4),
.table .reits_body tr:nth-child(14) td:nth-child(4),
.table .reits_body tr:nth-child(15) td:nth-child(3) {
  background-color: #fff;
}

.error-message {
  white-space: nowrap;
}

.button-group button {
  margin-top: 10px;
  margin-right: 10px;
}
</style>
