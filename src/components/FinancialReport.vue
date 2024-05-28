<template>
  <div class="mt-3 container" v-if="!isEdit">
    <div class="row justify-content-center">
      <div class="col-md-4 col-sm-10">
        <div class="input-group has-validation">
          <input
            v-model="stock"
            @keypress="isLetterOrDot($event)"
            maxlength="5"
            class="form-control"
            placeholder="請輸入股票代碼，只能輸入英文字母和."
            :class="{ 'is-invalid': isStockEmpty || !stockExsits }"
            :disabled="isDisabled"
            @keyup.enter="searchStock()"
            ref="stockField"
          />
          <div v-if="isStockEmpty || !stockExsits" class="invalid-feedback">
            {{ errorMessage }}
          </div>
        </div>
        <div class="input-group-append button-group">
          <button
            class="btn btn-primary"
            @click="searchStock()"
            :disabled="isDisabled"
          >
            <span
              v-if="isLoading"
              class="spinner-border spinner-border-sm"
              style="margin-right: 10px"
            />
            <font-awesome-icon icon="fa-magnifying-glass" v-if="!isLoading" />
            查詢
          </button>
          <button
            class="btn btn-secondary"
            @click="clear"
            :disabled="isDisabled"
          >
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
          <input
            id="nameLabel"
            class="form-control"
            :value="stockName"
            disabled
          />
        </div>
        <div class="form-group">
          <label for="priceLabel">現在股價</label>
          <div class="input-group">
            <input
              id="priceLabel"
              type="number"
              class="form-control"
              :class="{ 'is-invalid': isCallLimitReached }"
              :value="stockPrice"
              :disabled="!isCallLimitReached"
            />
            <div v-if="isCallLimitReached" class="invalid-feedback">
              {{ stockPriceErrorMessage }}
            </div>
            <div
              v-else
              class="input-groutruep-append"
              style="padding: 0 0.5rem"
            >
              <button
                class="btn"
                :class="{
                  'btn-outline-secondary': !isCopied,
                  'btn-outline-success': isCopied,
                }"
                type="button"
                @click="touchCopy()"
              >
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
            編輯
          </button>
          <button type="button" class="btn btn-success" @click="exportToCSV()">
            <font-awesome-icon icon="fa-file-csv" />
            匯出csv
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="mt-3 mb-3" style="float: right">
      <button
        class="btn btn-outline-success btn-sm"
        @click="openUrls"
        :disabled="isDisabled"
      >
        <span
          v-if="isLoading"
          class="spinner-border spinner-border-sm"
          style="margin-right: 10px"
        />
        <font-awesome-icon icon="fa-window-restore" />
        一鍵開啟財報網址
      </button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%; margin-top: 20px"
      :span-method="objectSpanMethod"
      border
    >
      <el-table-column prop="indicator" label="評分指標" />
      <el-table-column prop="standard" label="評分標準" />
      <el-table-column prop="scoreStandard" label="給分標準" width="90px" />
      <el-table-column prop="score" label="給分">
        <template #default="scope">
          <el-checkbox
            v-model="scope.row.giveScore"
            @click="giveScore(scope.$index, scope.row)"
            >給分</el-checkbox
          >
          <el-checkbox
            v-model="scope.row.noScore"
            @click="noScore(scope.$index, scope.row)"
            >不給分</el-checkbox
          >
        </template>
      </el-table-column>
      <el-table-column prop="url" label="評分網址">
        <template #default="scope">
          <el-link
            v-if="isLoading"
            disabled
            :underline="false"
            v-model="scope.row.noScore"
            >{{ scope.row.url }}</el-link
          >
          <el-link
            v-else
            @click="generateLink(scope.row.url)"
            :underline="false"
            v-model="scope.row.noScore"
            target="_blank"
            >{{ scope.row.url }}</el-link
          >
        </template>
      </el-table-column>
    </el-table>
    <div style="margin: 20px">
      <el-row>
        <el-col :span="24" style="background-color: #ffd966; padding: 10px">
          <div
            style="
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
            "
          >
            <span style="padding-right: 30%">總分 </span>
            <span>{{ totalScore }}</span>
          </div>
        </el-col>
        <el-col
          :span="24"
          style="
            margin-top: 10px;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
          "
        >
          <el-button
            v-if="!isTotalCopied"
            :icon="CopyDocument"
            type="Default"
            @click="touchCopyTotal()"
            >複製</el-button
          >
          <el-button :icon="CloseBold" type="info" @click="reset()"
            >清除</el-button
          >
          <el-button :icon="Download" type="success" @click="exportToCSV()"
            >匯出 csv</el-button
          >
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElCheckbox, TableColumnCtx } from "element-plus";
import { cloneVNode, ref, watch } from "vue";
import { nextTick } from "vue";
import {
  Search,
  CopyDocument,
  CloseBold,
  Download,
  WarnTriangleFilled,
} from "@element-plus/icons-vue";
import useClipboard from "vue-clipboard3";
import Papa from "papaparse";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { Eleme } from "@element-plus/icons-vue";
import axios from "axios";

// =======================================================================
// url
// const stockRowIndex = "https://stockrow.com/";
// const gurufocusIndex = "https://www.gurufocus.com/";
const morningStarIndex = "https://www.morningstar.com/";
const stockAnalysisInedx = "https://stockanalysis.com/";
// const stockrowUrl = ref(stockRowIndex);
// const incomeUrl = ref(stockRowIndex);
// const balanceSheetUrl = ref(stockRowIndex);
// const mertricsUrl = ref(stockRowIndex);
// const gurufocusUrl = ref(gurufocusIndex);
const morningStarUrl = ref(morningStarIndex);
const stockAnalysisUrl = ref(stockAnalysisInedx);
const morningStarFinancialsUrl = ref(morningStarIndex);
const morningStarValuationUrl = ref(morningStarIndex);
const morningStarDividendUrl = ref(morningStarIndex);
// -------------------------------------------
// stock api
const AlphaVantageNameAPI = (stockCode: string) => {
  return `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockCode}&apikey=8FYMDC697PL6LEEL`;
};
const AlphaVantageGlobalAPI = (stockCode: string) => {
  return `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockCode}&apikey=LP46XK632CAP8PVK`;
};
const IEXCloudAPI = (stockCode: string) => {
  return `https://api.iex.cloud/v1/data/core/quote/${stockCode}?token=pk_a1bf9b4aef2045e2bcff3f6eb3bff015`;
};
const PolygonAPI = (stockCode: string) => {
  return `https://api.polygon.io/v1/last_quote/stocks/${stockCode}?apiKey=FwKVpAWvGdWPLQSgeDMnQC3aaxzvGtDg`;
};
const finnhubNameAPI = (stockCode: string) => {
  return `https://finnhub.io/api/v1/stock/profile2?symbol=${stockCode}&token=cp7v0m1r01qi8q89cl60cp7v0m1r01qi8q89cl6g`;
};
const finnhubAPI = (stockCode: string) => {
  return `https://finnhub.io/api/v1/quote?symbol=${stockCode}&token=cp7v0m1r01qi8q89cl60cp7v0m1r01qi8q89cl6g`;
};
// =======================================================================

interface Reports {
  indicator: "";
  standard: "";
  scoreStandard: "";
  score: "";
  url: "";
}

interface SpanMethodProps {
  row: Reports;
  column: TableColumnCtx<Reports>;
  rowIndex: number;
  columnIndex: number;
}

// 股票代碼
const stock = ref("");
// 股票名稱
const stockName = ref("");
// 股票價格
const stockPrice = ref("");
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

// 查詢股價
async function searchStock() {
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

  try {
    isLoading.value = true;
    isDisabled.value = true;

    // 呼叫查詢股票api
    // ======================================
    // IEXCloudAPI
    // ======================================
    // #region
    // const IEXResponse = await fetch(IEXCloudAPI(stockCode));
    // const IEXData = await IEXResponse.json();
    // const data = IEXData[0];

    // if (!data) {
    //   // 處理data為空的情况
    //   stockExsits.value = false;
    //   errorMessage.value = "查無股票代碼";
    // } else {
    //   stockExsits.value = true;
    //   stockName.value = data.companyName;
    //   stockPrice.value = data.latestPrice;
    //   currency.value = `${data.currency}`;
    // }
    // #endregion
    // ======================================
    // AlphaVantage API
    // ======================================
    // #region
    // const AlphaVantageNameResponse = await fetch(
    //   AlphaVantageNameAPI(stockCode)
    // );
    // const nameData = await AlphaVantageNameResponse.json();
    // if (nameData.bestMatches && nameData.bestMatches.length > 0) {
    //   stockExsits.value = true;
    //   const matches = nameData.bestMatches;
    //   const name = matches[0]["2. name"];
    //   stockName.value = name;
    // } else {
    //   // 處理data為空的情况
    //   stockExsits.value = false;
    //   errorMessage.value = "查無股票代碼";
    // }
    // #endregion
    // ======================================
    // Finnhub API
    // ======================================
    // #region
    const profileResponse = await axios.get(finnhubNameAPI(stockCode));
    const companyName = profileResponse.data.name;
    if (companyName) {
      stockExsits.value = true;
      stockName.value = companyName;
    } else {
      // 處理data為空的情况
      stockExsits.value = false;
      errorMessage.value = "查無股票代碼";
    }
    // #endregion

    if (stockExsits.value) {
      // 查詢股價
      const priceResponse = await fetch(finnhubAPI(stockCode));
      const priceData = await priceResponse.json();
      // 如果有Note代表一分鐘查詢超過五次了
      // if (GlobalData["Note"]) {
      //   isCallLimitReached.value = true;
      //   stockPrice.value = "";
      //   stockPriceErrorMessage.value = "每分鐘最多查詢5次，請稍後再試";
      // }

      // 取出股票的價格
      if (priceData.c == 0) {
        // 處理data為空的情况
        stockExsits.value = false;
        errorMessage.value = "查無股票代碼";
      } else {
        stockExsits.value = true;
        stockName.value = stockCode;
        stockPrice.value = priceData.c;
      }

      let stockSymbol = stock.value;
      // 修改url
      stockAnalysisUrl.value =
        stockAnalysisInedx + "stocks/" + stockSymbol + "/financials/";
      // stockrowUrl.value = stockRowIndex + stock.value;
      // incomeUrl.value = stockrowUrl.value + "/financials/income/annual";
      // balanceSheetUrl.value = stockrowUrl.value + "/financials/balance/annual";
      // mertricsUrl.value = stockrowUrl.value + "/financials/metrics/annual";
      // gurufocusUrl.value = `https://www.gurufocus.com/stock/${stock.value}/dividend`;

      const xnasValuationUrl = `/xnas/${stockSymbol}/valuation`;
      const xnysValuationUrl = `/xnys/${stockSymbol}/valuation`;
      const batsValuationUrl = `/bats/${stockSymbol}/valuation`;
      const pinxValuationUrl = `/pinx/${stockSymbol}/valuation`;

      try {
        const isXnasValid = await checkURL(xnasValuationUrl);
        if (isXnasValid) {
          morningStarUrl.value = `${morningStarIndex}stocks${xnasValuationUrl}`;
          morningStarFinancialsUrl.value = `${morningStarIndex}stocks/xnas/${stockSymbol}/financials`;
          morningStarDividendUrl.value = `${morningStarIndex}stocks/xnas/${stockSymbol}/dividends`;
          morningStarValuationUrl.value = `${morningStarIndex}stocks/xnas/${stockSymbol}/valuation`;
        } else {
          const isXnysValid = await checkURL(xnysValuationUrl);
          if (isXnysValid) {
            morningStarUrl.value = `${morningStarIndex}stocks${xnysValuationUrl}`;
            morningStarFinancialsUrl.value = `${morningStarIndex}stocks/xnys/${stockSymbol}/financials`;
            morningStarDividendUrl.value = `${morningStarIndex}stocks/xnys/${stockSymbol}/dividends`;
            morningStarValuationUrl.value = `${morningStarIndex}stocks/xnys/${stockSymbol}/valuation`;
          } else {
            const isBatsValid = await checkURL(batsValuationUrl);
            if (isBatsValid) {
              morningStarUrl.value = `${morningStarIndex}stocks${batsValuationUrl}`;
              morningStarFinancialsUrl.value = `${morningStarIndex}stocks/bats/${stockSymbol}/financials`;
              morningStarDividendUrl.value = `${morningStarIndex}stocks/bats/${stockSymbol}/dividends`;
              morningStarValuationUrl.value = `${morningStarIndex}stocks/bats/${stockSymbol}/valuation`;
            } else {
              morningStarUrl.value = `${morningStarIndex}search?query=${stockSymbol}`;
              morningStarDividendUrl.value = morningStarUrl.value;
              morningStarFinancialsUrl.value = morningStarUrl.value;
              morningStarValuationUrl.value = morningStarUrl.value;
            }
            const isPinxValid = await checkURL(pinxValuationUrl);
            if (isPinxValid) {
              morningStarUrl.value = `${morningStarIndex}stocks${pinxValuationUrl}`;
              morningStarFinancialsUrl.value = `${morningStarIndex}stocks/pinx/${stockSymbol}/financials`;
              morningStarDividendUrl.value = `${morningStarIndex}stocks/pinx/${stockSymbol}/dividends`;
              morningStarValuationUrl.value = `${morningStarIndex}stocks/pinx/${stockSymbol}/valuation`;
            } else {
              morningStarUrl.value = `${morningStarIndex}search?query=${stockSymbol}`;
              morningStarDividendUrl.value = morningStarUrl.value;
              morningStarFinancialsUrl.value = morningStarUrl.value;
              morningStarValuationUrl.value = morningStarUrl.value;
            }
          }
        }
      } catch (error) {
        morningStarUrl.value = `${morningStarIndex}search?query=${stockSymbol}`;
        morningStarFinancialsUrl.value = morningStarUrl.value;
        morningStarDividendUrl.value = morningStarUrl.value;
        morningStarValuationUrl.value = morningStarUrl.value;
        console.error(error);
      }

      isEdit.value = true;
      stock.value = stock.value.toUpperCase();
      isStockEmpty.value = false;
      errorMessage.value = "";
    }
  } catch (error) {
    morningStarUrl.value = `${morningStarIndex}search?query=${stock.value}`;
    morningStarFinancialsUrl.value = morningStarUrl.value;
    morningStarDividendUrl.value = morningStarUrl.value;
    morningStarValuationUrl.value = morningStarUrl.value;
    console.log(error);
  } finally {
    isLoading.value = false;
    isDisabled.value = false;
  }
}

// 檢查input框
function isLetterOrDot(e: any) {
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

// 清除
function clear() {
  stock.value = "";
  stockName.value = "";
  stockPrice.value = "";
  isStockEmpty.value = false;
  stockExsits.value = true;
  isCopied.value = false;
}

// 編輯
const stockField = ref();
function edit() {
  isEdit.value = false;
  isCopied.value = false;
  stockName.value = "";
  stockPrice.value = "";
  isCallLimitReached.value = false;
  reset();
  nextTick(() => {
    (stockField.value as HTMLInputElement).focus();
    (stockField.value as HTMLInputElement).setSelectionRange(
      0,
      stock.value.length
    );
  });
}

const dialogTableVisible = ref(false);
const errorVisible = ref(false);
// 查詢morningStar網址，xnas/xnys/bats/pinx
async function checkURL(url: string) {
  try {
    const response = await fetch("/api" + url, { method: "HEAD" });
    if (response.ok) {
      return true;
    } else {
      if (response.status == 404) {
        console.log(`查無此網站:${url}`);
      } else if (response.status == 403) {
        morningStarUrl.value = `${morningStarIndex}search?query=${stock.value}`;
        morningStarFinancialsUrl.value = morningStarUrl.value;
        morningStarDividendUrl.value = morningStarUrl.value;
        morningStarValuationUrl.value = morningStarUrl.value;
        errorVisible.value = true;
      } else {
        throw new Error(`Fetch failed with status ${response.status}`);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

function generateLink(url: string) {
  console.log(url);

  if (url.includes("Stock")) {
    window.open(stockAnalysisUrl.value, "_blank");
  }
  if (url.includes("Financials")) {
    window.open(morningStarFinancialsUrl.value, "_blank");
  }
  if (url.includes("Valuation")) {
    window.open(morningStarValuationUrl.value, "_blank");
  }
  if (url.includes("Dividends")) {
    window.open(morningStarDividendUrl.value, "_blank");
  }
}

function openUrls() {
  window.open(stockAnalysisUrl.value, "_blank");
  window.open(morningStarFinancialsUrl.value, "_blank");
  window.open(morningStarValuationUrl.value, "_blank");
  window.open(morningStarDividendUrl.value, "_blank");
}

const totalScore = ref(0);
let eps1Points = ref(0);
let eps2Points = ref(0);
let net1Points = ref(0);
let net2Points = ref(0);
let roe1Points = ref(0);
let roe2Points = ref(0);
let ic1Points = ref(0);
let ic2Points = ref(0);
let dePoints = ref(0);
let bvpsPoints = ref(0);
let fcfPoints = ref(0);
let divdend1Points = ref(0);
let divdend2Points = ref(0);
let sharesPoints = ref(0);

function giveScore(index: any, row: any) {
  switch (index) {
    // EPS
    case 0:
      eps1Points.value = parseFloat(row.scoreStandard);
      eps2Points.value = 0;
      row.noScore = false;
      tableData.value[1].noScore = true;
      tableData.value[1].giveScore = false;
      if (tableData.value[0].giveScore == true) {
        eps1Points.value = 0;
      }
      break;
    case 1:
      eps2Points.value = parseFloat(row.scoreStandard);
      eps1Points.value = 0;
      row.noScore = false;
      tableData.value[0].giveScore = false;
      tableData.value[0].noScore = true;
      if (tableData.value[1].giveScore == true) {
        eps2Points.value = 0;
      }
      break;
    // Net Margin
    case 2:
      net1Points.value = parseFloat(row.scoreStandard);
      net2Points.value = 0;
      row.noScore = false;
      tableData.value[3].giveScore = false;
      tableData.value[3].noScore = true;
      if (tableData.value[2].giveScore == true) {
        net1Points.value = 0;
      }
      break;
    case 3:
      net2Points.value = parseFloat(row.scoreStandard);
      net1Points.value = 0;
      row.noScore = false;
      tableData.value[2].giveScore = false;
      tableData.value[2].noScore = true;
      if (tableData.value[3].giveScore == true) {
        net2Points.value = 0;
      }
      break;
    // ROE
    case 4:
      roe1Points.value = parseFloat(row.scoreStandard);
      roe2Points.value = 0;
      row.noScore = false;
      tableData.value[5].noScore = true;
      tableData.value[5].giveScore = false;
      if (tableData.value[4].giveScore == true) {
        roe1Points.value = 0;
      }
      break;
    case 5:
      roe2Points.value = parseFloat(row.scoreStandard);
      roe1Points.value = 0;
      row.noScore = false;
      tableData.value[4].giveScore = false;
      tableData.value[4].noScore = true;
      if (tableData.value[5].giveScore == true) {
        roe2Points.value = 0;
      }
      break;
    // IC
    case 6:
      ic1Points.value = parseFloat(row.scoreStandard);
      ic2Points.value = 0;
      row.noScore = false;
      tableData.value[7].noScore = true;
      tableData.value[7].giveScore = false;
      if (tableData.value[6].giveScore == true) {
        ic1Points.value = 0;
      }
      break;
    case 7:
      ic2Points.value = parseFloat(row.scoreStandard);
      ic1Points.value = 0;
      row.noScore = false;
      tableData.value[6].giveScore = false;
      tableData.value[6].noScore = true;
      if (tableData.value[7].giveScore == true) {
        ic2Points.value = 0;
      }
      break;
    // D/E
    case 8:
      dePoints.value = parseFloat(row.scoreStandard);
      row.noScore = false;
      if (tableData.value[8].giveScore == true) {
        dePoints.value = 0;
      }
      break;
    // BVPS
    case 9:
      bvpsPoints.value = parseFloat(row.scoreStandard);
      row.noScore = false;
      if (tableData.value[9].giveScore == true) {
        bvpsPoints.value = 0;
      }
      break;
    // FCF
    case 10:
      fcfPoints.value = parseFloat(row.scoreStandard);
      row.noScore = false;
      if (tableData.value[10].giveScore == true) {
        fcfPoints.value = 0;
      }
      break;
    // Dividend
    case 11:
      divdend1Points.value = parseFloat(row.scoreStandard);
      divdend2Points.value = 0;
      row.noScore = false;
      tableData.value[12].noScore = true;
      tableData.value[12].giveScore = false;
      if (tableData.value[11].giveScore == true) {
        divdend1Points.value = 0;
      }
      break;
    case 12:
      divdend2Points.value = parseFloat(row.scoreStandard);
      divdend1Points.value = 0;
      row.noScore = false;
      tableData.value[11].giveScore = false;
      tableData.value[11].noScore = true;
      if (tableData.value[12].giveScore == true) {
        divdend2Points.value = 0;
      }
      break;
    case 13:
      sharesPoints.value = parseFloat(row.scoreStandard);
      row.noScore = false;
      if (tableData.value[13].giveScore == true) {
        sharesPoints.value = 0;
      }
      break;
  }
}
function noScore(index: any, row: any) {
  switch (index) {
    // EPS
    case 0:
      row.giveScore = false;
      eps1Points.value = 0;
      break;
    case 1:
      row.giveScore = false;
      eps2Points.value = 0;
      break;
    // Net Margin
    case 2:
      net1Points.value = 0;
      row.giveScore = false;
      break;
    case 3:
      row.giveScore = false;
      net2Points.value = 0;
      break;
    // ROE
    case 4:
      row.giveScore = false;
      roe1Points.value = 0;
      break;
    case 5:
      row.giveScore = false;
      roe2Points.value = 0;
      break;
    // IC
    case 6:
      ic1Points.value = 0;
      row.giveScore = false;
      break;
    case 7:
      ic2Points.value = 0;
      row.giveScore = false;
      break;
    // D/E
    case 8:
      dePoints.value = 0;
      row.giveScore = false;
      break;
    // BVPS
    case 9:
      bvpsPoints.value = 0;
      row.giveScore = false;
      break;
    // FCF
    case 10:
      fcfPoints.value = 0;
      row.giveScore = false;
      break;
    // Dividend
    case 11:
      divdend1Points.value = 0;
      row.giveScore = false;
      break;
    case 12:
      divdend2Points.value = 0;
      row.giveScore = false;
      break;
    case 13:
      sharesPoints.value = 0;
      row.giveScore = false;
      break;
  }
}
const tableData = ref([
  // EPS (Diluted) 每股盈餘
  {
    indicator: "EPS (Diluted) 每股盈餘",
    standard: "10年穩定成長",
    scoreStandard: "1",
    score: "",
    url: "Morningstar Financials （5年）",
    giveScore: false,
    noScore: false,
  },
  {
    indicator: "",
    standard: "最少5年內有 > 0",
    scoreStandard: "0.5",
    score: "",
    url: "Stock Analysis Financials（10年）",
    giveScore: false,
    noScore: false,
  },
  // Net Margin(%)淨利率
  {
    indicator: "Net Margin(%)淨利率",
    standard: "10年 Net Margin > 10%",
    scoreStandard: "1",
    score: "",
    url: "Morningstar Valuation - Operating and Efficiency",
    giveScore: false,
    noScore: false,
  },
  {
    indicator: "",
    standard: "10年穩定不衰退",
    scoreStandard: "0.5",
    score: "",
    url: "",
    giveScore: false,
    noScore: false,
  },
  // ROE(％) 股東權益率
  {
    indicator: "ROE(％) 股東權益率",
    standard: "10年: 15% < ROE < 40%",
    scoreStandard: "1",
    score: "",
    url: "Morningstar Valuation - Operating and Efficiency",
    giveScore: false,
    noScore: false,
  },
  {
    indicator: "",
    standard: "10年 ROE < 15% 且穩定上升",
    scoreStandard: "0.5",
    score: "",
    url: "",
    giveScore: false,
    noScore: false,
  },
  // IC 利息保障倍數
  {
    indicator: "IC 利息保障倍數",
    standard: "IC > 10 或 “-”",
    scoreStandard: "1",
    score: "",
    url: "Morningstar Valuation - Operating and Efficiency",
    giveScore: false,
    noScore: false,
  },
  {
    indicator: "",
    standard: "IC > 5",
    scoreStandard: "0.5",
    score: "",
    url: "",
    giveScore: false,
    noScore: false,
  },
  // Debt / Equity 負債權益比
  {
    indicator: "Debt / Equity 負債權益比",
    standard: "D/E < 0.5",
    scoreStandard: "1",
    score: "",
    url: "Morningstar Valuation - Financial Health",
    giveScore: false,
    noScore: false,
  },
  // Book Value Per Share 每股淨值
  {
    indicator: "Book Value Per Share 每股淨值",
    standard: "10年穩定成長",
    scoreStandard: "1",
    score: "",
    url: "Morningstar Valuation - Financial Health",
    giveScore: false,
    noScore: false,
  },
  // Free Cash Flow 自由現金流
  {
    indicator: "Free Cash Flow 自由現金流",
    standard: "10年皆為正數",
    scoreStandard: "1",
    score: "",
    url: "Morningstar Valuation - Cash Flow",
    giveScore: false,
    noScore: false,
  },
  // Dividend 股息
  {
    indicator: "Dividend 股息",
    standard: "10年每年持續穩定發股息",
    scoreStandard: "0.5",
    score: "",
    url: "Morningstar Dividends",
    giveScore: false,
    noScore: false,
  },
  {
    indicator: "",
    standard: "10年股息每年越發越多",
    scoreStandard: "1",
    score: "",
    url: "",
    giveScore: false,
    noScore: false,
  },
  // Shares (Common) 流通股數
  {
    indicator: "Shares (Common) 流通股數",
    standard: "流通股數10年穩定減少",
    scoreStandard: "1",
    score: "",
    url: "Stock Analysis - Financials - income",
    giveScore: false,
    noScore: false,
  },
]);

const indicators = [
  { name: "EPS (Diluted) 每股盈餘", rowspan: 2 },
  { name: "Net Margin(%)淨利率", rowspan: 2 },
  { name: "ROE(％) 股東權益率", rowspan: 2 },
  { name: "IC 利息保障倍數", rowspan: 2 },
  { name: "Debt / Equity 負債權益比", rowspan: 1 },
  { name: "Book Value Per Share 每股淨值", rowspan: 1 },
  { name: "Free Cash Flow 自由現金流", rowspan: 1 },
  { name: "Dividend 股息", rowspan: 2 },
  { name: "Shares (Common) 流通股數", rowspan: 1 },
];

// colspan 方法
const objectSpanMethod = ({
  row,
  column,
  rowIndex,
  columnIndex,
}: SpanMethodProps) => {
  switch (columnIndex) {
    case 0:
      for (const indicator of indicators) {
        if (row.indicator === indicator.name) {
          return {
            rowspan: indicator.rowspan,
            colspan: 1,
          };
        }
      }
      return {
        rowspan: 0,
        colspan: 0,
      };
    case 4:
      const indicatorName = row.indicator.toString();
      switch (indicatorName) {
        case "Net Margin(%)淨利率":
        case "ROE(％) 股東權益率":
        case "IC 利息保障倍數":
          return {
            rowspan: 2,
            colspan: 1,
          };
        case "Dividend 股息":
          return {
            rowspan: 2,
            colspan: 1,
          };
        default:
          return {
            rowspan: 1,
            colspan: 1,
          };
      }
    default:
      return {
        rowspan: 1,
        colspan: 1,
      };
  }
};

// =============================================================
// watch
// =============================================================
watch(
  tableData,
  () => {
    calculateTotalScore();
  },
  { deep: true }
);

function calculateTotalScore() {
  totalScore.value =
    divdend1Points.value +
    divdend2Points.value +
    eps1Points.value +
    eps2Points.value +
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
  console.log("totalScore: " + totalScore.value);
  console.log("eps1Points: " + eps1Points.value);
}
// =================================================================
// 複製
// =================================================================
// 初始化剪貼板功能
const { toClipboard } = useClipboard();

const isCopied = ref(false);
async function touchCopy() {
  try {
    await toClipboard(stockPrice.value);
    isCopied.value = true;
    setTimeout(() => {
      isCopied.value = false;
    }, 2000);
  } catch (error) {
    console.log(error);
  }
}

let isTotalCopied = ref(false);
async function touchCopyTotal() {
  try {
    await toClipboard(JSON.stringify(totalScore.value));
    isTotalCopied.value = true;
    setTimeout(() => {
      isTotalCopied.value = false;
    }, 2000);
  } catch (error) {
    console.log(error);
  }
}

// reset
function reset() {
  tableData.value.forEach((row) => {
    row.giveScore = false;
    row.noScore = false;
  });

  divdend1Points.value = 0;
  divdend2Points.value = 0;
  eps1Points.value = 0;
  eps2Points.value = 0;
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

  // isNoDivdend.value = false;
}

// 匯出csv
function exportToCSV() {
  const csvData = tableData.value.map((row) => {
    return {
      評分數據: row.indicator,
      評分標準: row.standard,
      給分標準: row.scoreStandard,
      給分: row.giveScore ? "✓" : row.noScore ? "✗" : "",
    };
  });
  csvData.push({
    評分數據: "",
    評分標準: "總分",
    給分標準: totalScore.value.toString(),
    給分: "",
  });
  const hasNullScore = csvData.some((row) => {
    return row.給分 === null;
  });

  if (!stock.value) {
    alert("請輸入股票代碼");
    return;
  }
  if (hasNullScore) {
    alert("請在匯出CSV之前勾選所有評分");
    return;
  }
  const csv = Papa.unparse(csvData, {
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
  const filename = `${year}${month}${day}_${stock.value}_財報分析.csv`;
  link.download = filename;
  link.click();
  window.URL.revokeObjectURL(url);
}
// const Row = ({ rowData, rowIndex, cells, columns }) => {
//   const indicatorName = rowData.indicator;
//   const indicator = indicators.find((item) => {
//     return item.name === indicatorName;
//   });

//   if (indicator) {
//     const { rowspan } = indicator;
//     const cell = cells[0];
//     const style = {
//       ...cell.props.style,
//       height: `${rowspan * 50 - 1}px`,
//       alignSelf: "flex-start",
//       zIndex: 1,
//     };

//     cells[0] = cloneVNode(cell, { style });
//   }

//   return cells;
// };

// const Row = ({ rowData, rowIndex, cells, columns }) => {
//   const indicatorName = rowData.indicator;
//   const indicator = indicators.find((item) => {
//     return item.name === indicatorName;
//   });

//   if (indicator) {
//     const { rowspan } = indicator;
//     const cell = cells[0];
//     const style = {
//       ...cell.props.style,
//       height: `${rowspan * 50 - 1}px`,
//       alignSelf: "flex-start",
//       zIndex: 1,
//     };

//     cells[0] = cloneVNode(cell, { style });
//   }

//   // 根據特定欄位來設置樣式
//   cells.forEach((cell, index) => {
//     const dataKey = columns[index].dataKey;
//     if (dataKey !== "indicator") {
//       let style = {
//         ...cell.props.style,
//         backgroundColor: dataKey === "score" ? "white" : "#E8EEFB",
//       };
//       cells[index] = cloneVNode(cell, { style });
//     }
//   });

//   return cells;
// };
</script>
<style scoped>
.el-button .custom-loading .circular {
  margin-right: 6px;
  width: 18px;
  height: 18px;
  animation: loading-rotate 2s linear infinite;
}
.el-button .custom-loading .circular .path {
  animation: loading-dash 1.5s ease-in-out infinite;
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  stroke-width: 2;
  stroke: var(--el-button-text-color);
  stroke-linecap: round;
}
.el-input.is-error {
  border-color: red;
}
:deep(.el-scrollbar__bar.is-horizontal) {
  height: 0 !important;
}
</style>
