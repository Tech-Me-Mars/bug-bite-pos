import { useMenuAccessStore } from '@/store/useMenuAccess.js'; // ประกาศ import store

export default function getMenuAccess(to, from, next) {
    console.log("menuAccess middleware are running");
    const myStore = useMenuAccessStore(); // สร้าง instance ของ store
  
    myStore.fetchData().then(() => {
      console.log('ข้อมูลถูกเรียกใช้และเก็บลง data จากstor Menu Access:',myStore.data)
      next(); // เรียก next() เพื่อดำเนินการต่อไป
    }).catch((error) => {
      console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
      next(); // หรือคุณสามารถเรียก next(false) เพื่อยกเลิกการนำทาง
    });
  }
