<template>
  <div>
    <h1>Test MQTT Component</h1>
    <p v-if="connected">Connected to MQTT broker</p>
    <p v-else>Error: {{ errorMessage }}</p>
    <p v-if="receivedMessage">Received Message: {{ receivedMessage }}</p>
    <button @click="subscribeToTopic">Subscribe to MQTT Topic : {{ topic }}</button>
    <button @click="publishMessage">Publish MQTT Message</button>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Client, Message } from "paho-mqtt";

const connected = ref(false);
const errorMessage = ref(null);
const receivedMessage = ref(null); // เพิ่มตัวแปรเพื่อเก็บข้อความที่ได้รับ
const brokerUrl = "ws://27.254.144.161:8083/mqtt"; // Use the correct URL and port
const options = {
  userName: "client_mix_station", // Replace with your MQTT username
  password: "mix-stati0n!$", // Replace with your MQTT password
};
const topic = "mix-station/pos/print/printer_01";
const message = new Message("Hello, MQTT!");
message.destinationName = topic;
const client = new Client(brokerUrl, "clientId");

const connectToMQTT = () => {
  client.connect({
    onSuccess: () => {
      console.log("Connected to MQTT broker");
      connected.value = true;
    },
    onFailure: (err) => {
      console.error("Error:", err);
      errorMessage.value = err.errorMessage || "Socket error";
    },
    // useSSL: true,
    userName: options.userName,
    password: options.password,
  });
};

const subscribeToTopic = () => {
  client.subscribe(topic);
  console.log(`Subscribed to topic: ${topic}`);
};

const publishMessage = () => {
  client.send(message);
  console.log(`Published message to topic ${topic}: ${message.payloadString}`);
};

client.onMessageArrived = (message) => {
  // เมื่อมีข้อความมาถึงใน MQTT topic
  receivedMessage.value = message.payloadString;
};

onMounted(() => {
  connectToMQTT();
});

onBeforeUnmount(() => {
  // client.disconnect();
});
</script>
