<template>
 <!-- Mobile Menu -->
 <div class="dropdown mobile-user-menu">
    <a href="javascript:void(0);" class="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-ellipsis-v"></i></a>
    <div class="dropdown-menu dropdown-menu-right">
        <router-link class="dropdown-item  bg-transparent hover:bg-gray-100 hover:text-orange-300" to="/profile"
            >My Profile</router-link>
        <router-link class="dropdown-item" to="/auth/logout">Logout</router-link>
    </div>
</div>
<!-- /Mobile Menu -->
</template>

<script setup>
console.log('Yeahhhh..')
</script>