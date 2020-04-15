import Vue from 'vue'
import App from './App.vue'

interface WidgetOptions {
    element: string;
    numberOfTopAnswersToShow: number;
    answerEndpoints: string[];
}
const WikirateWidget = {
    
    renderWidget: function ({element, numberOfTopAnswersToShow, answerEndpoints}: WidgetOptions) {
        Vue.config.productionTip = false
        return new Vue({
            el: element,
            render: h => h(App, { props: { numberOfTopAnswersToShow, answerEndpoints } })
        });
    }
};

declare global {
    interface Window {
        wikirate: any;
    }
}

(function(window: any) {
    if (typeof (window.WikirateWidget) === 'undefined') {
        window.WikirateWidget = WikirateWidget;
    }
})(window);

export default WikirateWidget; 
