<template>
  <div class="h5ve-footer-container">
    <span style="color:#4092ff; font-size: 13px;">{{ $t('tips.canvas') }}</span>
  </div>
</template>

<script>
export default {
  name: "h5veFooter"
}
</script>

<style scoped lang="scss">
.h5ve-footer-container {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 25px;
  border-top: 1px solid #f0f0f0;
  text-align: center;
}
</style>
