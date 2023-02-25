<template>
  <div class="h5ve-main-container">
    <h5ve-sheet/>
    <h5ve-canvas/>
    <h5ve-control/>
  </div>
</template>

<script>
import h5veSheet from "./h5ve-sheet"
import h5veCanvas from "./h5ve-canvas"
import h5veControl from "./h5ve-control"
export default {
  name: "h5veMain",
  components: {
    h5veSheet,
    h5veCanvas,
    h5veControl
  }
}
</script>

<style scoped lang="scss">
.h5ve-main-container {
  position: absolute;
  left: 240px;
  top: 44px;
  right: 290px;
  bottom: 25px;
}
</style>
