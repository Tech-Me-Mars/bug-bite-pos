<template>
  <div class="row m-0">
    <div class="col-md-4"></div>
    <div class="col-md-4">
      <div class="form-group my-3">
        <label for="">เลขบัตรประจำตัวประชาชน</label>
        <input
          type="text"
          class="form-control"
          v-model="cid"
          ref="cids"
          placeholder="กรุณากรอกเลขบัตรประจำตัวประชาชน"
        />
      </div>
      <div class="form-group my-3">
        <button class="btn btn-primary" @click="call_search_by_cid">
          ยืนยัน
        </button>
      </div>
      <div class="form-group my-3">
        <label for="" class="text-danger">{{ errorMessage }}</label>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { ref,onMounted } from "vue";

const Swal = require("sweetalert2");

const dotenv = require("dotenv");
const { exec } = require("child_process");
export default {
  name: "KeyInCid",
  components: {},
  setup() {
    const cid = ref("");
    const cids = ref("");
    const fullname = ref("empty");
    const age = ref("15");
    const errorMessage = ref("");
    const call_search_by_cid = async () => {
      const result = dotenv.config();
      try {
        const response = await axios.get(`${result.parsed.MyUrl}api/v1/service/search_by_cid/${cid.value}/${age.value}`);
        if (response.data.status == true) {
          call_create_by_cid();
          
          // exec(result.parsed.MyPathPrint, (err, stdout, stderr) => {});
        } else {
          Swal.fire({
            title: "ผิดพลาด!",
            text: "กรุณาติดต่อผู้ดูแลระบบ"+response.data.message,
            icon: "error",
            confirmButtonText: "ยืนยัน",
          });
          // alert("ไม่พบข้อมูลกรุณาติดต่อผู้ดูแลระบบ");
          // exec(result.parsed.MyPathPrint, (err, stdout, stderr) => {});
        }
      } catch (error) {
        // console.log(error);
        Swal.fire({
            title: "ผิดพลาด!",
            text: "กรุณาติดต่อผู้ดูแลระบบ"+error.message,
            icon: "error",
            confirmButtonText: "ยืนยัน",
        });
        errorMessage.value = error.message;
      } 
      // console.log("cid",cid.value);
    };
    const call_create_by_cid = async () => {
      const result = dotenv.config();
      try {

        const response = await axios.get(`${result.parsed.MyUrl}api/v1/service/create_by_id/${cid.value}/${result.parsed.owner}/${age.value}/1/${fullname.value}`);
        if (response.data.status == true) {
          const result = dotenv.config();

            console.log("insert");
       

            // exec('D:\\Realase\\slient_print.exe '+'sales-2023-1111111', (err, stdout, stderr) => {
            //   slient_print->call-api->sales-2023-1111111
            //   reponse->print_crystalreport(form [ order ] ) 
            exec(result.parsed.MyPathPrint+" "+ cid.value, (err, stdout, stderr) => {
              cid.value = "";
              Swal.fire({
                title: "สำเร็จ!",
                text: "กรุณารอซักครู่",
                icon: "success",
                timer: 1500,closeOnConfirm: false,
                closeOnCancel: false
              });
            });
        } else {
          
          // alert("ไม่พบข้อมูลกรุณาติดต่อผู้ดูแลระบบ");
          // exec(result.parsed.MyPathPrint, (err, stdout, stderr) => {});
        }
      } catch (error) {
        // console.log(error);
        Swal.fire({
            title: "ผิดพลาด!",
            text: "กรุณาติดต่อผู้ดูแลระบบ"+error.message,
            icon: "error",
            confirmButtonText: "ยืนยัน",
        });
        errorMessage.value = error.message;
      } 

    };


    onMounted(() => {
      fullname.value = "empty";
      cids.value.focus();
    });


    return { cid, call_search_by_cid,cids, errorMessage };
  },
};
</script>
