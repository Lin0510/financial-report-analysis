<template>
  <div class="container">
    <div class="row">
      <section class="col-md-6">
        <header>
          <h2>網站說明</h2>
        </header>
        <p class="text-left">
          本網站提供了一個簡單易用的表格，方便計算 7 分好公司。另外輸入股票代碼，可獲得該股票的名稱和股票價格。
        </p>
        <p class="text-left">
          此外，每一格評分數據提供了一個方便的連結，可以直接跳轉到對應股票的評分數據網站。
        </p>
      </section>
      <section class="col-md-6">
        <h2>注意事項</h2>
        <p>
          使用<a class="custom-link" href="https://www.alphavantage.co/" target="_blank">
            Alpha Vantage
          </a>提供的免費 API 查詢名稱與股價
        </p>
        <p>限制：每分鐘最多 5 次查詢，每天最多 500 次查詢</p>

      </section>
      <section class="col-md-7">
        <h2>使用方法</h2>
        <ol class="custom-list text-left">
          <li>
            在輸入框中輸入要查詢的股票代碼，英文大小寫都可以，最多五個字元，只能輸入<b>英文字母和「.」</b>，其他字元無法輸入，例如：BRK.B 
          </li>
          <li>
            點擊「確認」按鈕，此時會檢查欄位是否為空、股票代碼是否正確
          </li>
          <li>
            系統會自動查詢股票的名稱和價格(每分鐘更新一次，每分鐘最多五次)，並將其顯示在畫面上。
          </li>
          <li>
            同時，會更新網站的 URL 鏈接，點擊可以直接跳到該評分數據所在的網址。
          </li>
          <li>
            如果想查詢其他股票，點選欄位下方「編輯」，就會切換到輸入框，之後只需重複上述步驟即可。
          </li>
        </ol>
      </section>
      <section class="col-md-4">
        <h2>問題回報</h2>
        <p>有任何問題，或是改進建議，可以聯絡信箱：a930387@gmail.com</p>
      </section>
    </div>
  </div>
</template>
  
  <style>
.custom-list {
  list-style-type: decimal;
  padding-left: 20px;
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

.custom-link {
  color: #007bff;
  text-decoration: none;
}


.text-left {
  text-align: left;
}
</style>
  