<template>
  <div>
    <Toast />
  </div>
   
 
</template>
  
<script setup>
import { useToast } from "primevue/usetoast";
import { onUpdated,ref,onMounted } from "vue";
const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: () => ({
      severity: "",
      summary: "",
      detail: "",
    }),
  },
  // error: {
  //   type: Boolean,
  //   default: false,
  // },
});

// หากต้องการใช้ตัวแปรจากตัวอย่างก็เพิ่มได้ตรงนี้

// เรียกใช้ hook useToast และเก็บ instance ของ Toast
const toast = useToast();

// เมื่อ component ถูก mount เรียกใช้งาน show()

onUpdated(() => show());

// ฟังก์ชัน show() ที่จะเพิ่ม Toast
const show = () => {
  // if (props.error == true) {
  //   toast.add({
  //     severity: "error",
  //     summary: "เกิดข้อผิดพลาด",
  //     detail: props.data.detail,
  //     life: 3000,
  //   });
  // } 
  // else {
    toast.add({
      severity: props.data.severity,
      summary: props.data.summary,
      detail: props.data.detail,
      life: 3000,
    });
  // }
};
</script>
  