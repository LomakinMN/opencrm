<script setup lang="ts">
import { ref } from "vue";
import { LogInterface, Tag } from "../types";
import { useLogStore } from "../store";
const store = useLogStore();
const props = defineProps<{
  data: LogInterface;
  id: number;
}>();

// 4 рефа отвечают за значения полей, еще три - за элементы темплейта, чтобы окрашивать край в красный при непрохождении валидации и для ресайза поля с тегами
const tagsInput = ref<string>(stringifyTags(props.data.tags));
const logTypeInput = ref<string>(props.data.logType);
const loginInput = ref<string>(props.data.login);
const passwordInput = ref<string | null>(props.data.password);
const tagsInputElement = ref<HTMLInputElement | null>(null);
const loginInputElement = ref<HTMLInputElement | null>(null);
const passwordInputElement = ref<HTMLInputElement | null>(null);

function rmLog() {
  store.removeLog(props.id);
}

function stringifyTags(arr: Tag[] | undefined) {
  // Конвертирование массива тегов в строку
  if (arr) {
    let result = "";
    arr.forEach((tag: Tag) => {
      result += tag.text;
      result += "; ";
    });
    result = result.slice(0, -2);
    return result;
  }
  return "";
}

function parseTags(str: string): Tag[] | null {
  // Конвертирование строки тегов в массив тегов
  const tagsArr = str.split(";").filter((tagText: string) => {
    return tagText.trim().length > 0;
  });
  if (tagsArr.length > 0) {
    return tagsArr.map((tag) => {
      return { text: tag.trim() };
    });
  } else return null;
}

function validate(): boolean {
  // Валидация наличия нулевой и состоящей из пробелов строки
  let result: boolean = true;
  if (!loginInput.value || loginInput.value.trim().length === 0) {
    loginInputElement.value?.classList.add("error");
    result = false;
  } else loginInputElement.value?.classList.remove("error");
  if (logTypeInput.value === "local") {
    if (!passwordInput.value || passwordInput.value.length === 0) {
      passwordInputElement.value?.classList.add("error");
      result = false;
    } else passwordInputElement.value?.classList.remove("error");
  }
  return result;
}

function setData() {
  // Сохранение валидных данных при прохождении валидации
  const tagToSet: LogInterface = {
    id: props.id,
    logType: logTypeInput.value,
    login: loginInput.value,
    password: logTypeInput.value === "local" ? passwordInput.value : null,
  };
  const parsedTags = parseTags(tagsInput.value);
  if (parsedTags !== null) {
    tagToSet.tags = parsedTags;
  } else {
    tagToSet.tags = undefined;
  }
  if (validate()) {
    store.setData(props.id, tagToSet);
  }
}
</script>

<template>
  <tr>
    <td>
      <textarea
        class="form-control"
        rows="1"
        ref="tagsInputElement"
        maxlength="50"
        @blur="setData"
        type="text"
        v-model="tagsInput"
      />
    </td>
    <td>
      <select class="form-control" @change="setData" v-model="logTypeInput">
        <option value="local">Локальная</option>
        <option value="ldap">LDAP</option>
      </select>
    </td>
    <td :colspan="logTypeInput === 'local' ? 1 : 2">
      <input
        class="form-control"
        @blur="setData"
        ref="loginInputElement"
        maxlength="100"
        type="text"
        v-model="loginInput"
      />
    </td>
    <td v-if="logTypeInput === 'local'">
      <input
        class="form-control"
        @blur="setData"
        ref="passwordInputElement"
        maxlength="100"
        type="password"
        v-model="passwordInput"
      />
    </td>
    <td>
      <button @click="rmLog" type="button" class="btn btn-outline-danger">
        <img src="/src/assets/svg/trash.svg" alt="" />
      </button>
    </td>
  </tr>
</template>

<style scoped lang="sass">
input, textarea, select
	width: 100%
textarea
	overflow: hidden
	resize: vertical

.error
	border-color: red
textarea
	resize: auto
</style>
