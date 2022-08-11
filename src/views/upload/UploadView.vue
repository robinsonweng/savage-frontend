<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="option-wrapper">
    <div class="option-button">
      <RouterLink :to="{ name: 'series-exist' }">
        upload video to exist series
      </RouterLink>
    </div>
    <div class="option-button">
      <RouterLink :to="{ name: 'series-new' }">
        create a new series
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.option-wrapper {
  height: 50%;
}
</style>