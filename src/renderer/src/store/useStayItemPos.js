import { defineStore } from 'pinia';
import * as dataApi from "./api/data.js";
export const useStayItemPos = defineStore('myStore', {

    actions: {
      async fetchData() {
        try {
            console.log('dd')
        } catch (error) {
          console.log('เกิดข้อผิดพลาดในขณะเก็บข้อมูล:', error);
        }
      },
    },
  });
