import { defineStore } from 'pinia';
import * as dataApi from "./api/data.js";
export const useMenuAccessStore = defineStore('myStore', {
    state: () => ({
      data: null, // ตัวแปรสำหรับเก็บข้อมูลที่ได้จาก API
    }),
    actions: {
      async fetchData() {
        try {
          const res = await dataApi.getUserAccessMenu()
          this.data = res.data.data.menu_access[0].pos; // เก็บผลลัพธ์ในตัวแปร state
        } catch (error) {
          console.log('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
        }
      },
    },
  });
