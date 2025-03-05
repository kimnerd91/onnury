<template>
  <div v-if="isVisible" class="popup-overlay" @click.self="close">
    <div class="popup-content">
      <button class="close-button" @click="close">X</button>
      <slot></slot>
        <button type="button" @click="doNotShowToday" class="doNotShow">오늘 하루 보지않기</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Popup',
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    popupId: {
      type: String,
      required: true,
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
doNotShowToday() {
      // Set localStorage item to hide the popup until the end of the day
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(23, 59, 59, 999); // Set to the end of the day
      if (this.popupId === 'popup1') {
        localStorage.setItem('popupHiddenUntil_1', midnight.getTime().toString());
      } else if (this.popupId === 'popup2') {
        localStorage.setItem('popupHiddenUntil_2', midnight.getTime().toString());
      }
      this.close();
    },
  },
 mounted() {
    // Check if session storage has necessary login keys
    const authorization = sessionStorage.getItem('authorization');
    const loginId = sessionStorage.getItem('loginId');
    const refreshToken = sessionStorage.getItem('refreshToken');

    if (authorization && loginId && refreshToken) {
      this.$emit('show-popup');
    }
  },
};
</script>

<style>
.popup-content {
  background-color: white;

  border-radius: 8px;
  position: relative;
  width: 400px;
  max-width: 90%;
    z-index: 9999;
}

.popup-content img {
    width: 100%;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: #000;
}

.doNotShow {
        background: transparent;
    border: none;
    position: absolute;
    bottom: 5px;
    right: 5px;
    font-size: 10px;
    color: #fff;
    text-decoration: underline;
}
</style>
