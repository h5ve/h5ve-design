<template>
  <div id="app">
    <design :project="project" :publish="publish"/>
  </div>
</template>

<script>
import design from "@/packages/design"

export default {
  name: 'App',
  components: {
    design
  },
  data() {
    return {
      publish: false,
      project: null
    }
  }
}
</script>
