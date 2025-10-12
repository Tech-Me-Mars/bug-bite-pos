<template>
<div class="content">
    <pageheader :title="title" :title1="title1" />

    <!-- /add -->
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-lg-3 col-sm-6 col-12">
            <div class="form-group">
              <label>User Name</label>
              <input type="text" />
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="text" />
            </div>
            <div class="form-group">
              <label>Password</label>
              <div class="pass-group">
                <input
                  v-if="showPassword"
                  type="text"
                  class="pass-input"
                  v-model="password"
                />
                <input v-else type="password" class="pass-input" v-model="password" />
                <span
                  class="fas toggle-password"
                  @click="toggleShow"
                  :class="{
                    'fa-eye': showPassword,
                    'fa-eye-slash': !showPassword,
                  }"
                ></span>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-sm-6 col-12">
            <div class="form-group">
              <label>Mobile</label>
              <input type="text" />
            </div>
            <div class="form-group">
              <label>Role</label>
              <vue-select :options="Select" placeholder="Select" />
            </div>
            <div class="form-group">
              <label>Confirm Password</label>
              <div class="pass-group">
                <input
                  v-if="showPassword1"
                  type="text"
                  class="pass-input"
                  v-model="password1"
                />
                <input
                  v-else
                  type="password"
                  class="pass-input"
                  v-model="password1"
                />
                <span
                  class="fas toggle-password"
                  @click="toggleShow1"
                  :class="{
                    'fa-eye': showPassword1,
                    'fa-eye-slash': !showPassword1,
                  }"
                ></span>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-sm-6 col-12">
            <div class="form-group">
              <label> Profile Picture</label>
              <div class="image-upload image-upload-new">
                <input type="file" />
                <div class="image-uploads">
                  <img src="../../../assets/img/icons/upload.svg" alt="img" />
                  <h4>Drag and drop a file to upload</h4>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-12">
            <a href="javascript:void(0);" class="btn btn-submit me-2">Submit</a>
            <a href="javascript:void(0);" class="btn btn-cancel">Cancel</a>
          </div>
        </div>
      </div>
    </div>
    <!-- /add -->
  </div>
  </template>

<script>
export default {
  data() {
    return {
      title: "User Management",
      title1: "Add/Update User",
      showPassword: false,
      showPassword1: false,
      password: null,
      password1: null,
      Select: ["Select", "Role", "Role1"],
    };
  },
  computed: {
    buttonLabel() {
      return this.showPassword ? "Hide" : "Show";
    },
  },
  methods: {
    toggleShow() {
      this.showPassword = !this.showPassword;
    },
    toggleShow1() {
      this.showPassword1 = !this.showPassword1;
    },
  },
  name: "newuser",
};
</script>
