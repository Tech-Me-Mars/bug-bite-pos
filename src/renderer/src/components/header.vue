<template>
  <div>
    <!-- Header -->
    <div class="header">
      <headerlogo />

      <a id="mobile_btn" class="mobile_btn" href="javascript:void(0);">
        <span class="bar-icon">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </a>


      <headermenu />

      <mobilemenu />
    </div>
    <!-- Header -->
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const $wrapper = ref(null);

const resizeHandler = () => {
  if (document.querySelector(".page-wrapper")) {
    const height = window.innerHeight;
    document.querySelector(".page-wrapper").style.minHeight = `${height}px`;
  }
};

const toggleMobile = () => {
  $wrapper.value.classList.toggle("slide-nav");
  document.querySelector(".sidebar-overlay").classList.toggle("opened");
  document.querySelector("html").classList.add("menu-opened");
  document.querySelector("#task_window").classList.remove("opened");
};

const toggleSidebar = () => {
  if (document.body.classList.contains("mini-sidebar")) {
    document.body.classList.remove("mini-sidebar");
    document.querySelector("#toggle_btn").classList.add("active");
    document.querySelectorAll(".subdrop + ul");
    localStorage.setItem("screenModeNightTokenState", "night");
    setTimeout(() => {
      document.body.classList.remove("mini-sidebar");
      document.querySelector(".header-left").classList.add("active");
    }, 100);
  } else {
    document.body.classList.add("mini-sidebar");
    document.querySelector("#toggle_btn").classList.remove("active");
    document.querySelectorAll(".subdrop + ul");
    localStorage.removeItem("screenModeNightTokenState", "night");
    setTimeout(() => {
      document.body.classList.add("mini-sidebar");
      document.querySelector(".header-left").classList.remove("active");
    }, 100);
  }
};

const mouseOverHandler = (e) => {
  e.stopPropagation();
  if (
    document.body.classList.contains("mini-sidebar") &&
    document.querySelector("#toggle_btn").offsetParent !== null
  ) {
    const targ = e.target.closest(".sidebar, .header-left");
    if (targ) {
      document.body.classList.add("expand-menu");
      document.querySelectorAll(".subdrop + ul").forEach((el) => {
        el.style.display = "block";
      });
    } else {
      document.body.classList.remove("expand-menu");
      document.querySelectorAll(".subdrop + ul").forEach((el) => {
        el.style.display = "none";
      });
    }
  }
};

onMounted(() => {
  $wrapper.value = document.querySelector(".main-wrapper");
  window.addEventListener("resize", resizeHandler);
  document.body.insertAdjacentHTML(
    "beforeend",
    '<div class="sidebar-overlay"></div>'
  );
  document.querySelector("#mobile_btn").addEventListener("click", toggleMobile);
  document.querySelector("#toggle_btn").addEventListener("click", toggleSidebar);
  document.addEventListener("mouseover", mouseOverHandler);

  if (localStorage.getItem("screenModeNightTokenState") === "night") {
    setTimeout(() => {
      document.body.classList.remove("mini-sidebar");
      document.querySelector(".header-left").classList.add("active");
    }, 100);
  }

  document.querySelectorAll(".submenus").forEach((el) => {
    el.addEventListener("click", () => {
      document.body.classList.add("sidebarrightmenu");
    });
  });
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeHandler);
  document.querySelector("#mobile_btn").removeEventListener("click", toggleMobile);
  document.querySelector("#toggle_btn").removeEventListener("click", toggleSidebar);
  document.removeEventListener("mouseover", mouseOverHandler);
});
</script>