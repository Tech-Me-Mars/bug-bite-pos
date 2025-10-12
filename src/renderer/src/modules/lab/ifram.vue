<template>
  <div>
    <h1>File</h1>
    <div class="min-h-screen w-full flex flex-1 bg-red-300">
      <iframe class="h-screen  w-full" src="https://www.better-account.com/Backup/contract/doc060426153127.pdf"></iframe>
    </div>
    <vue-pdf-embed ref="pdfViewer" :source="source1" :show-print="true" />
    <button @click="printPDF">Print PDF</button>
 
  </div>
</template>

<script setup>
import {ref} from 'vue';
import VuePdfEmbed from 'vue-pdf-embed';

// [ IFREAM ต้องเป็นลิ้งแบบอ่านบนPDF Embed ต้องเป็นแบบกดแล้วdowload]
const source1 = "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf";
const pdfViewer = ref(null);
function printPDF() {
  // เรียกใช้เมธอด print จาก VuePdfEmbed
  pdfViewer.value.print();
}
</script>

