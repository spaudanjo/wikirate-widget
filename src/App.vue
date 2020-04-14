<style scoped>
.widget-container {
  height: 600px;
  /* min-width: 400px; */
}
</style>

<template>
  <div class="widget-container">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <WikirateWidget v-bind:number-of-top-answers-to-show="numberOfTopAnswersToShow" v-bind:years-to-show="yearsToShow" />
  </div>
</template>

<script>
import WikirateWidget from './components/WikirateWidget.vue';

export default {
  name: 'App',
  props: [
    'years-to-show', 
    'number-of-top-answers-to-show'
  ],
  components: {
    WikirateWidget
  }
}
</script> 

