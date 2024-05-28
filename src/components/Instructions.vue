<template>
  <div class="container text-left">
    <el-card class="box-card mb-2" shadow="hover">
      <div class="clearfix">
        <h1 class="mb-4">網站說明</h1>
      </div>
      <div>
        <p>
          本網站將【慢遊美股VIP】財報分析的 Excel
          表格使用網頁呈現，能更加方便學員分析公司。
        </p>
        <p>
          使用
          <a class="custom-link" href="https://finnhub.io/" target="_blank">
            Finnhub</a
          >
          提供的免費 API 查詢名稱與股價，限制：每分鐘最多 60 次查詢。
        </p>
      </div>
    </el-card>

    <el-card class="box-card mb-2" shadow="hover">
      <div class="clearfix">
        <h1 class="mb-4">功能介紹</h1>
      </div>
      <div>
        <p>
          在此網站的表格中，有加入課程中提到擇一加分的邏輯，如：10年每年持續穩定發股息／10年股息每年越發越多，擇一加分，此時勾選其中一個給分，另一格則自動勾選不給分。
        </p>
        <p>
          此外，每一格評分數據提供了相對應的網址，輸入股票代碼後會自動更新網址，此時，點擊網址可直接跳轉到對應股票的評分數據網站
        </p>
        <p>
          另外還提供了「一鍵開啟財報網站」按鈕，點擊可打開所有數據對應的網站。
        </p>
        <p>
          切換到其他表格<b>數據不保留</b>，請記錄完所需數據後再切換到其他表格。
        </p>
        <p>
          點擊「編輯」按鈕時，下面表格<b>分數會歸零並清空 checkbox 所有勾選項</b
          >，請記錄完分數後再進行編輯。
        </p>
        <p>
          表格最下面的「Reset」按鈕，只針對表格內的 checkbox 和分數進行重置。
        </p>
      </div>
    </el-card>

    <el-card class="box-card mb-2" shadow="hover">
      <div class="clearfix">
        <h2 class="mb-4">銀行股評分標準</h2>
      </div>
      <div>
        <p>
          在
          <router-link to="/bank" class="custom-link"
            >銀行股評分標準</router-link
          >
          表格中的利息收入比 (Interest Income Ratio)，提供兩個 input 框計算
          ratio，輸入完點擊「計算」按鈕或按下「Enter 鍵」即可計算出
          ratio，並判斷是否低於 50%，自動勾選給分/不給分。
        </p>
      </div>
    </el-card>

    <el-card class="box-card mb-2" shadow="hover">
      <div class="clearfix">
        <h2 class="mb-4">股票代碼查詢</h2>
      </div>
      <div>
        <p>
          在輸入框中輸入要查詢的股票代碼，只能輸入<b>英文字母和「.」</b>，最多五個字元，英文小寫一律會被轉為大寫，例如：brk.b
          → BRK.B。
        </p>
        <p>
          點擊「確認」按鈕 或 按下「Enter
          鍵」，此時會檢查欄位是否為空、股票代碼是否正確。若欄位不為空並且股票代碼正確，系統會自動查詢股票的名稱和價格，並將其顯示在畫面上。同時，會更新網站的
          URL 鏈接，點擊可以直接跳到該評分數據所在的網址。
        </p>
        <p>
          如果想查詢其他股票，點選欄位下方「編輯」，就會切換到輸入框，此時會清空下面的勾選以及分數，之後只需重複上述步驟即可。
        </p>
      </div>
    </el-card>

    <el-card class="box-card mb-2" shadow="hover">
      <div class="clearfix">
        <h1 class="mb-4">問題回報</h1>
      </div>
      <div>
        <p>
          有遇到任何問題或是改進建議，可以聯絡信箱：a930387@gmail.com，主旨：【美股評分網站】xxxx
        </p>
        <el-button
          :type="isEmailCopied ? 'success' : 'outline-success'"
          @click="copyEmail"
          class="mr-2"
        >
          <font-awesome-icon
            v-if="isEmailCopied"
            icon="fa-paste"
            class="me-2"
          />
          <font-awesome-icon v-else icon="fa-envelope" class="me-2" />
          {{ isEmailCopied ? "已複製" : "複製信箱" }}
        </el-button>
        <el-button
          :type="isSubjectCopied ? 'primary' : 'outline-primary'"
          @click="copySubject"
        >
          <font-awesome-icon
            v-if="isSubjectCopied"
            icon="fa-paste"
            class="me-2"
          />
          <font-awesome-icon v-else icon="fa-clipboard" class="me-2" />
          {{ isSubjectCopied ? "已複製" : "複製主旨" }}
        </el-button>
      </div>
    </el-card>
  </div>
</template>
<script setup>
import { reactive, ref } from "@vue/reactivity";
import useClipboard from "vue-clipboard3";

// 初始化剪貼板功能
const { toClipboard } = useClipboard();

// 複製email
const isEmailCopied = ref(false);
async function copyEmail() {
  try {
    await toClipboard("a930387@gmail.com");
    isEmailCopied.value = true;
    setTimeout(() => {
      isEmailCopied.value = false;
    }, 2000);
  } catch (error) {
    console.log(error);
  }
}
// 複製主旨
const isSubjectCopied = ref(false);
async function copySubject() {
  try {
    await toClipboard("【美股評分網站】");
    isSubjectCopied.value = true;
    setTimeout(() => {
      isSubjectCopied.value = false;
    }, 2000);
  } catch (error) {
    console.log(error);
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}
.container {
  margin-top: 50px;
}

h2 {
  margin-top: 20px;
  margin-bottom: 10px;
}

p {
  margin-bottom: 10px;
}

.text-left {
  text-align: left;
}
.custom-link {
  color: #007bff;
  text-decoration: none;
}
.custom-link:hover {
  text-decoration: underline;
}
.custom-list {
  list-style-type: decimal;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>
