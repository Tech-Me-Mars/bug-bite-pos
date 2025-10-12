<template>

        <div class="content">
          <pageheader :title="title" :title1="title1" />
  
          <!-- /add -->
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-lg-3 col-sm-6 col-12">
                  <div class="form-group">
                    <label>Title <span class="manitory">*</span></label>
                    <input type="text" placeholder="Enter Title" />
                  </div>
                </div>
                <div class="col-lg-3 col-sm-6 col-12">
                  <div class="form-group">
                    <label>Time Zone </label>
                    <vue-select :options="Choose" placeholder="Choose Time Zone" />
                  </div>
                </div>
                <div class="col-lg-3 col-sm-6 col-12">
                  <div class="form-group">
                    <label>Currency <span class="manitory">*</span></label>
                    <vue-select :options="Currency" placeholder="Choose Currency" />
                  </div>
                </div>
                <div class="col-lg-3 col-sm-6 col-12">
                  <div class="form-group">
                    <label>Date Format<span class="manitory">*</span></label>
                    <vue-select :options="Format" placeholder="Choose Date Format" />
                  </div>
                </div>
                <div class="col-lg-3 col-sm-6 col-12">
                  <div class="form-group">
                    <label>Email<span class="manitory">*</span></label>
                    <input type="text" placeholder="Enter email" />
                  </div>
                </div>
                <div class="col-lg-3 col-sm-6 col-12">
                  <div class="form-group">
                    <label>Phone<span class="manitory">*</span></label>
                    <input type="text" placeholder="Enter Phone" />
                  </div>
                </div>
                <div class="col-lg-6 col-sm-12">
                  <div class="form-group">
                    <label>Address<span class="manitory">*</span> </label>
                    <input type="text" placeholder="Enter Address" />
                  </div>
                </div>
                <div class="col-lg-12">
                  <div class="form-group">
                    <label> Product Image</label>
                    <div class="image-upload">
                      <input type="file" />
                      <div class="image-uploads">
                        <img src="@/assets/img/icons/upload.svg" alt="img" />
                        <h4>Drag and drop a file to upload</h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-12">
                    <a href="javascript:void(0);" class="btn btn-submit me-2">Submit</a>
                    <a href="javascript:void(0);" class="btn btn-cancel">Cancel</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /add -->
        </div>
  </template>
<script setup>
// import pageheader from "@/components/pageheader/pageheader" ** auto import
const title = "General Setting";
const title1 = "Manage General Setting";
const Choose = ["Choose Time Zone", "USD Time Zone"];
const Currency = ["Choose Currency", "INR", "USA"];
const Format = ["Choose Date Format", "DD/MM/YYYY", "MM/DD/YYYY"];
const name = "generalsettings";
</script>
  