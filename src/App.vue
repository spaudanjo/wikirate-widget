<style scoped>
.widget-container {
  height: 600px;
  /* min-width: 400px; */
}
</style>

<template>
  <div class="widget-container">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <WikirateWidget 
    v-bind:number-of-top-answers-to-show="numberOfTopAnswersToShow" 
    v-bind:answer-endpoints="answerEndpoints" 
    v-bind:title="title"
    v-bind:show-metric-titles-for-subcharts="showMetricTitlesForSubcharts"
    />
  </div>
</template>

<script>
import WikirateWidget from './components/WikirateWidget.vue';

export default {
  name: 'App',
  props: [
    'answer-endpoints', 
    'number-of-top-answers-to-show', 
    'title', 
    'show-metric-titles-for-subcharts'
  ],
  components: {
    WikirateWidget
  }
}
</script> 

