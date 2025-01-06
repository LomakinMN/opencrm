<script setup lang="ts">
import { onMounted } from "vue";
import { useLogStore } from "./store.ts";
import TableRow from "./components/TableRow.vue";

const store = useLogStore();

onMounted(() => {
  store.loadData();
});

function addLog() {
  store.addLog();
}
</script>

<template>
  <div class="main-container mt-3 container">
    <div class="page-title mv-y">
      <h1>Учетные записи</h1>
      <div class="add-btn">
        <button
          @click="addLog"
          type="button"
          class="mx-3 btn btn-outline-primary"
        >
          <img class="btn-icon" src="/src/assets/svg/plus.svg" alt="" />
        </button>
      </div>
    </div>
    <div class="page-footnote my-3">
      <img
        src="/src/assets/svg/question.svg"
        alt=""
        class="m-1 footnote-icon"
      /><span class="footnote-text"
        >Для указания нескольких меток для одной пары логин/пароль используйте
        разделитель ;
      </span>
    </div>
    <table class="table my-2">
      <thead>
        <tr>
          <th style="width: 25%" scope="col">Метки</th>
          <th style="width: 20%" scope="col">Тип записи</th>
          <th style="width: 25%" scope="col">Логин</th>
          <th style="width: 25%" scope="col">Пароль</th>
          <th style="width: 5%" scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <TableRow
          v-for="log in store.logs"
          :key="log.id"
          :data="log"
          :id="log.id"
        ></TableRow>
      </tbody>
    </table>
  </div>
</template>

<style lang="sass" scoped>
.main-container
  max-width: 50%
.btn-icon
  width: 25px
  height: 25px
.page-title
  display: flex
  align-items: center
.page-footnote
  background-color: #eff4fa
</style>
