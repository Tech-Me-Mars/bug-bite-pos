<template>
    <div class="error-page">
      <!-- Main Wrapper -->
      <div class="main-wrapper">
        <div class="error-box">
          <h1>403
          </h1>
          <h3 class="h2 mb-3">
            <i class="fas fa-exclamation-circle"></i> Unauthorized Access
          </h3>
          <p class="h4 font-weight-normal">Sorry, but you do not have permission to access this page. Please
        contact the administrator for assistance.</p>
          <div class="mb-2">
            <router-link to="/main/dashboard" class="btn btn-primary">Back to Home</router-link>
          </div>
          <div>
            <router-link to="/auth/login" class="btn btn-primary">Login</router-link>
          </div>
        </div>
      </div>
      <!-- /Main Wrapper -->
    </div>
  </template>
  <script>
  export default {
    name: "error-403",
  };
  </script>
  