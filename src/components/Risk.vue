<template>
  <table class="table">
    <thead class="table-dark">
      <tr>
        <th>風險扣分</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th style="background-color: #AEBAD2;">風險項目</th>
        <th style="background-color: #AEBAD2;">風險可能性</th>
        <th style="background-color: #AEBAD2;">需扣的分數</th>
        <th style="background-color: #AEBAD2;">扣分</th>
      </tr>
      <tr>
        <th style="background-color: #AEBAD2;">科技風險</th>
        <td style="background-color: #E8EEFB;">科技業、時尚潮流</td>
        <td style="background-color: #E8EEFB;">-1</td>
        <td>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.technologyRisk_1" @click="technologyRiskDeductPoint()"
              type="checkbox" id="technologyRisk_1">
            <label class="form-check-label" for="technologyRisk_1">扣分</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.technologyRisk_2" type="checkbox" id="technologyRisk_2"
              @click="technologyRiskNoDeductPoint()">
            <label class="form-check-label" for="technologyRisk_2">不扣分</label>
          </div>
        </td>
      </tr>
      <tr>
        <th style="background-color: #AEBAD2;">政府風險</th>
        <td style="background-color: #E8EEFB;">易受政策影響</td>
        <td style="background-color: #E8EEFB;">-1</td>
        <td>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.governmentRisk_1" @click="governmentRiskDeductPoint()"
              type="checkbox" id="governmentRisk_1">
            <label class="form-check-label" for="governmentRisk_1">扣分</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.governmentRisk_2" type="checkbox" id="governmentRisk_2"
              @click="governmentRiskNoDeductPoint()">
            <label class="form-check-label" for="governmentRisk_2">不扣分</label>
          </div>
        </td>
      </tr>
      <tr>
        <th style="background-color: #AEBAD2;">中國風險</th>
        <td style="background-color: #E8EEFB;">中國公司在美國掛牌</td>
        <td style="background-color: #E8EEFB;">-1</td>
        <td>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.chinaRisk_1" @click="chinaRiskDeductPoint()" type="checkbox"
              id="chinaRisk_1">
            <label class="form-check-label" for="chinaRisk_1">扣分</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="form.chinaRisk_2" type="checkbox" id="chinaRisk_2"
              @click="chinaRiskNoDeductPoint()">
            <label class="form-check-label" for="chinaRisk_2">不扣分</label>
          </div>
        </td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td style="background-color: #F6B3BB;">總分</td>
        <td style="background-color: #F6B3BB;">{{ total }}</td>
        <td></td>
      </tr>
    </tbody>
  </table>
  <button style="text-align: center;" type="button" class="btn btn-primary" @click="reset()">
    <font-awesome-icon icon="fa-rotate-left"/>
    Reset
  </button>
</template>
  <script setup>
import { reactive, ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";

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
</script>