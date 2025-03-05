<template>
  <div v-if="visible" class="spinner d-flex justify-content-center align-items-center" style="background-color: rgba(0,0,0,0.5); width: 100vw; height: 100vh; z-index: 99999">
    <!-- 스피너 마크업 -->
    <div class="spinner-inner"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    show() {
      this.visible = true;
    },
    hide() {
      this.visible = false;
    },
  },
};
</script>

<style scoped>
.spinner {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.spinner-inner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(0, 122, 255, 1);
  border-left-color: #000;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
