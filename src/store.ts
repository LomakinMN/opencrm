import { defineStore } from "pinia";
import { LogInterface } from "./types.ts";
import { ref, computed } from "vue";
import example_data from "./example_data.json";

export const useLogStore = defineStore("logs", () => {
  const logs = ref<LogInterface[]>([]);
  const maxId = computed(() => {
    // Присваивание id новой строке
    let result = 0;
    logs.value.forEach((log: LogInterface) => {
      if (log.id > result) {
        result = log.id;
      }
    });
    return result + 1;
  });

  function addLog() {
    // Добавление новой строки
    const log: LogInterface = {
      id: maxId.value + 1,
      logType: "local",
      login: "",
      password: "",
    };
    logs.value.push(log);
  }

  function removeLog(id: number) {
    logs.value = logs.value.filter((log: LogInterface) => {
      return log.id !== id;
    });
    saveData();
  }

  function loadData() {
    const data: string | null = localStorage.getItem("logs");
    logs.value =
      data !== null ? <LogInterface[]>JSON.parse(data) : example_data;
  }

  function saveData() {
    localStorage.setItem("logs", JSON.stringify(logs.value));
  }

  function setData(id: number, logData: LogInterface) {
    logs.value = logs.value.map((log) => (log.id === id ? logData : log));
    saveData();
  }

  return {
    logs,
    maxId,
    addLog,
    removeLog,
    loadData,
    saveData,
    setData,
  };
});
