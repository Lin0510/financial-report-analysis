<template>
  <table class="table">
    <thead class="table-dark">
      <tr>
        <th>財報分析</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th style="background-color: #AEBAD2;">評分數據</th>
        <th style="background-color: #AEBAD2;">評分標準</th>
        <th style="background-color: #AEBAD2;">給分標準</th>
        <th style="background-color: #AEBAD2;">給分</th>
        <th style="background-color: #AEBAD2;">備註</th>
      </tr>
      <tr>
        <th rowspan="3" style="vertical-align: middle; background-color: #AEBAD2;">Divdend 股息</th>
        <td style="background-color: #E8EEFB;">10年每年持續穩定發股息</td>
        <td style="background-color: #E8EEFB;">0.5</td>
        <td>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.divdend1_1" @click="divdend1GetPoint()" type="checkbox"
              id="divdend1_1">
            <label class="form-check-label" for="divdend1_1">給分</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.divdend1_2" type="checkbox" id="divdend1_2"
              @click="divdend1NotGetPoint()">
            <label class="form-check-label" for="divdend1_2">不給分</label>
          </div>
        </td>
        <td style="background-color: #E8EEFB;"><a href="https://stockrow.com/" target="_blank">stockrow</a></td>
      </tr>
      <tr>
        <td style="background-color: #E8EEFB;">10年股息每年越發越多</td>
        <td style="background-color: #E8EEFB;">1</td>
        <td>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.divdend2_1" @click="divdend2GetPoint()" type="checkbox"
              id="divdend2_1">
            <label class="form-check-label" for="divdend2_1">給分</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.divdend2_2" type="checkbox" id="divdend2_2"
              @click="divdend2NotGetPoint()">
            <label class="form-check-label" for="divdend2_2">不給分</label>
          </div>
        </td>
        <td style="background-color: #E8EEFB;"><a href="https://stockrow.com/" target="_blank">stockrow</a></td>
      </tr>
      <tr>
        <td style="background-color: #E8EEFB;">5年股息成長率 > 10年股息成長率</td>
        <td style="background-color: #E8EEFB;">0.5</td>
        <td>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.divdend3_1" @click="divdend3GetPoint()" type="checkbox"
              id="divdend3_1">
            <label class="form-check-label" for="divdend3_1">給分</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.divdend3_2" type="checkbox" id="divdend3_2"
              @click="divdend3NotGetPoint()">
            <label class="form-check-label" for="divdend3_2">不給分</label>
          </div>
        </td>
        <td style="background-color: #E8EEFB;"><a href="https://www.gurufocus.com/new_index/"
            target="_blank">gurufocus</a></td>
      </tr>
      <tr>
        <th scope="row" style="background-color: #AEBAD2;">EPS (Diluted) 每股盈餘</th>
        <td style="background-color: #E8EEFB;">10年穩定成長</td>
        <td style="background-color: #E8EEFB;">1</td>
        <td>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.eps_1" @click="epsGetPoint()" type="checkbox" id="eps_1">
            <label class="form-check-label" for="eps_1">給分</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.eps_2" type="checkbox" id="eps_2" @click="epsNotGetPoint()">
            <label class="form-check-label" for="eps_2">不給分</label>
          </div>
        </td>
        <td style="background-color: #E8EEFB;"><a href="https://stockrow.com/" target="_blank">stockrow
            Income</a></td>
      </tr>
      <tr>
        <th scope="row" style="background-color: #AEBAD2;">Shares (Common) 流通股數</th>
        <td style="background-color: #E8EEFB;">流通股數10年穩定減少</td>
        <td style="background-color: #E8EEFB;">1</td>
        <td>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.shares_1" @click="sharesGetPoint()" type="checkbox"
              id="shares_1">
            <label class="form-check-label" for="shares_1">給分</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.shares_2" type="checkbox" id="shares_2"
              @click="sharesNotGetPoint()">
            <label class="form-check-label" for="shares_2">不給分</label>
          </div>
        </td>
        <td style="background-color: #E8EEFB;">
          <a href="https://stockrow.com/" target="_blank">stockrow Balance Sheet</a>
        </td>
      </tr>
      <tr>
        <th scope="row" style="background-color: #AEBAD2;">Debt / Equity 負債權益比</th>
        <td style="background-color: #E8EEFB;">D/E &lt; 0.5</td>
        <td style="background-color: #E8EEFB;">1</td>
        <td>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.de_1" @click="deGetPoint()" type="checkbox" id="de_1">
            <label class="form-check-label" for="de_1">給分</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.de_2" type="checkbox" id="de_2" @click="deNotGetPoint()">
            <label class="form-check-label" for="de_2">不給分</label>
          </div>
        </td>
        <td style="background-color: #E8EEFB;">
          <a href="https://stockrow.com/" target="_blank">stockrow Metrics</a>
        </td>
      </tr>
      <tr>
        <th rowspan="2" style="vertical-align: middle; background-color: #AEBAD2;">ROE(％) 股東權益率</th>
        <td style="background-color: #E8EEFB;">10年: 15% &lt; ROE &lt; 40%</td>
        <td style="background-color: #E8EEFB;">1</td>
        <td>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.roe1_1" @click="roe1GetPoint()" type="checkbox" id="roe1_1">
            <label class="form-check-label" for="roe1_1">給分</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.roe1_2" type="checkbox" id="roe1_2"
              @click="roe1NotGetPoint()">
            <label class="form-check-label" for="roe1_2">不給分</label>
          </div>
        </td>
        <td style="background-color: #E8EEFB;">
          <a href="https://stockrow.com/" target="_blank">stockrow Metrics</a>
        </td>
      </tr>
      <tr>
        <td style="background-color: #E8EEFB;">10年 ROE &lt; 15% 且穩定上升</td>
        <td style="background-color: #E8EEFB;">0.5</td>
        <td>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.roe2_1" @click="roe2GetPoint()" type="checkbox" id="roe2_1">
            <label class="form-check-label" for="roe2_1">給分</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.roe2_2" type="checkbox" id="roe2_2"
              @click="roe2NotGetPoint()">
            <label class="form-check-label" for="roe2_2">不給分</label>
          </div>
        </td>
        <td style="background-color: #E8EEFB;">
          <a href="https://stockrow.com/" target="_blank">stockrow Metrics</a>
        </td>
      </tr>
      <tr>
        <th scope="row" style="background-color: #AEBAD2;">Book Value Per Share 每股淨值</th>
        <td style="background-color: #E8EEFB;">10年穩定成長</td>
        <td style="background-color: #E8EEFB;">1</td>
        <td>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.bvps_1" @click="bvpsGetPoint()" type="checkbox" id="bvps_1">
            <label class="form-check-label" for="bvps_1">給分</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.bvps_2" type="checkbox" id="bvps_2"
              @click="bvpsNotGetPoint()">
            <label class="form-check-label" for="bvps_2">不給分</label>
          </div>
        </td>
        <td style="background-color: #E8EEFB;">
          <a href="https://stockrow.com/" target="_blank">stockrow Metrics</a>
        </td>
      </tr>
      <tr>
        <th scope="row" style="background-color: #AEBAD2;">Free Cash Flow 自由現金流</th>
        <td style="background-color: #E8EEFB;">10年皆為正數</td>
        <td style="background-color: #E8EEFB;">1</td>
        <td>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.fcf_1" @click="fcfGetPoint()" type="checkbox" id="fcf_1">
            <label class="form-check-label" for="fcf_1">給分</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.fcf_2" type="checkbox" id="fcf_2" @click="fcfNotGetPoint()">
            <label class="form-check-label" for="fcf_2">不給分</label>
          </div>
        </td>
        <td style="background-color: #E8EEFB;">
          <a href="https://stockrow.com/" target="_blank">stockrow Metrics</a>
        </td>
      </tr>
      <tr>
        <th rowspan="2" style="vertical-align: middle; background-color: #AEBAD2;">Net Margin(%)淨利率</th>
        <td style="background-color: #E8EEFB;">10年 Net Margin > 10%</td>
        <td style="background-color: #E8EEFB;">1</td>
        <td>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.net1_1" @click="net1GetPoint()" type="checkbox" id="net1_1">
            <label class="form-check-label" for="net1_1">給分</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.net1_2" type="checkbox" id="net1_2"
              @click="net1NotGetPoint()">
            <label class="form-check-label" for="net1_2">不給分</label>
          </div>
        </td>
        <td style="background-color: #E8EEFB;">
          <a href="https://stockrow.com/" target="_blank">stockrow Metrics</a>
        </td>
      </tr>
      <tr>
        <td style="background-color: #E8EEFB;">10年穩定不衰退</td>
        <td style="background-color: #E8EEFB;">0.5</td>
        <td>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.net2_1" @click="net2GetPoint()" type="checkbox" id="net2_1">
            <label class="form-check-label" for="net2_1">給分</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.net2_2" type="checkbox" id="net2_2"
              @click="net2NotGetPoint()">
            <label class="form-check-label" for="net2_2">不給分</label>
          </div>
        </td>
        <td style="background-color: #E8EEFB;">
          <a href="https://stockrow.com/" target="_blank">stockrow Metrics</a>
        </td>
      </tr>
      <tr>
        <th rowspan="2" style="vertical-align: middle; background-color: #AEBAD2;">IC 利息保障倍數</th>
        <td style="background-color: #E8EEFB;">IC > 10 或 “-”</td>
        <td style="background-color: #E8EEFB;">1</td>
        <td>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.ic1_1" @click="ic1GetPoint()" type="checkbox" id="ic1_1">
            <label class="form-check-label" for="ic1_1">給分</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.ic1_2" type="checkbox" id="ic1_2" @click="ic1NotGetPoint()">
            <label class="form-check-label" for="ic1_2">不給分</label>
          </div>
        </td>
        <td style="background-color: #E8EEFB;">
          <a href="https://www.morningstar.com/" target="_blank">Morningstar Key Ratio Data</a>
        </td>
      </tr>
      <tr>
        <td style="background-color: #E8EEFB;">IC > 5</td>
        <td style="background-color: #E8EEFB;">0.5</td>
        <td>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.ic2_1" @click="ic2GetPoint()" type="checkbox" id="ic2_1">
            <label class="form-check-label" for="ic2_1">給分</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.ic2_2" type="checkbox" id="ic2_2" @click="ic2NotGetPoint()">
            <label class="form-check-label" for="ic2_2">不給分</label>
          </div>
        </td>
        <td style="background-color: #E8EEFB;">
          <a href="https://www.morningstar.com/" target="_blank">Morningstar Key Ratio Data</a>
        </td>
      </tr>
      <tr>
        <td></td>
        <td style="background-color: #F6B3BB;">總分</td>
        <td style="background-color: #F6B3BB;">{{ total }}</td>
        <td>
          <button style="text-align: center;" type="button" class="btn btn-primary" @click="reset()">
            <font-awesome-icon icon="fa-rotate-left" />
            Reset
          </button>
        </td>
        <td>
        </td>
      </tr>
    </tbody>
  </table>

</template>
<script setup>
import { reactive, ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";

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
  roe1_1: "",
  roe1_2: "",
  roe2_1: "",
  roe2_2: "",
  bvps_1: "",
  bvps_2: "",
  fcf_1: "",
  fcf_2: "",
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
let roe1Points = ref(0);
let roe2Points = ref(0);
let bvpsPoints = ref(0);
let fcfPoints = ref(0);
let net1Points = ref(0);
let net2Points = ref(0);
let ic1Points = ref(0);
let ic2Points = ref(0);
let total = ref(0);

// Divdend
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
function roe1GetPoint() {
  form.roe1_2 = false;
  roe1Points.value = 1;
  if (form.roe1_1 == true) {
    roe1Points.value = 0;
  }
}

function roe1NotGetPoint() {
  form.roe1_1 = false;
  roe1Points.value = 0;
}

function roe2GetPoint() {
  form.roe2_2 = false;
  roe2Points.value = 0.5;
  if (form.roe2_1 == true) {
    roe2Points.value = 0;
  }
}

function roe2NotGetPoint() {
  form.roe2_1 = false;
  roe2Points.value = 0;
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
    roe1Points.value +
    roe2Points.value +
    bvpsPoints.value +
    fcfPoints.value +
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
  form.roe1_1 = "";
  form.roe1_2 = "";
  form.roe2_1 = "";
  form.roe2_2 = "";
  form.bvps_1 = "";
  form.bvps_2 = "";
  form.fcf_1 = "";
  form.fcf_2 = "";
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
  roe1Points.value = 0;
  roe2Points.value = 0;
  bvpsPoints.value = 0;
  fcfPoints.value = 0;
  net1Points.value = 0;
  net2Points.value = 0;
  ic1Points.value = 0;
  ic2Points.value = 0;
}
</script>
<style>
td a {
  text-decoration: none;
  color: rgba(46, 44, 44, 0.89);
}
</style>