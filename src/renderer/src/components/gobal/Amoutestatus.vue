
<template>
  <div class="col-lg-3 col-sm-6 col-12  d-flex ">
    <div class="dash-widget" style="flex: 1">
      <div class="dash-widgetimg">
        <span><img src="@/assets/img/icons/dash1.svg" alt="img" /></span>
      </div>
      <div class="dash-widgetcontent">
        <h5>
          ฿<vue3-autocounter
            class="counter"
            ref="counter"
            :startAmount="107144.0"
            :delay="3"
            :endAmount="307144.0"
            :duration="5"
            :autoinit="true"
          />
        </h5>
        <h6>ยอดขายรายวัน</h6>
      </div>
    </div>
  </div>
  <div class="col-lg-3 col-sm-6 col-12 d-flex ">
    <div class="dash-widget dash1" style="flex: 1">
      <div class="dash-widgetimg">
        <span><img src="@/assets/img/icons/dash2.svg" alt="img" /></span>
      </div>
      <div class="dash-widgetcontent">
        <h5>
          ฿<vue3-autocounter
            class="counter"
            ref="counter"
            :startAmount="1385.0"
            :delay="3"
            :endAmount="4385.0"
            :duration="5"
            :autoinit="true"
          />
        </h5>
        <h6>ยอดขายล่าสุด 7 วัน</h6>
      </div>
    </div>
  </div>
  <div class="col-lg-3 col-sm-6 col-12 d-flex ">
    <div class="dash-widget dash2" style="flex: 1">
      <div class="dash-widgetimg">
        <span><img src="@/assets/img/icons/dash3.svg" alt="img" /></span>
      </div>
      <div class="dash-widgetcontent">
        <h5>
          ฿<vue3-autocounter
            class="counter"
            ref="counter"
            :startAmount="185656.5"
            :delay="3"
            :endAmount="385656.5"
            :duration="5"
            :autoinit="true"
          />
        </h5>
        <h6>ยอดขายล่าสุด1เดือน</h6>
      </div>
    </div>
  </div>
  <div class="col-lg-3 col-sm-6 col-12 d-flex ">
    <div class="dash-widget dash3" style="flex: 1">
      <div class="dash-widgetimg">
        <span><img src="@/assets/img/icons/dash4.svg" alt="img" /></span>
      </div>
      <div class="dash-widgetcontent">
        <h5>
          ฿<vue3-autocounter
            class="counter"
            ref="counter"
            :startAmount="10000.0"
            :delay="3"
            :endAmount="40000.0"
            :duration="5"
            :autoinit="true"
          />
        </h5>
        <h6>ยอดขายรวม</h6>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>