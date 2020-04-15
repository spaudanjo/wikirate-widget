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
            props: ['numberOfTopAnswersToShow', 'years'],
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


WikirateWidget.renderWidget({
    element: "#app", 
    numberOfTopAnswersToShow: 10, 
    answerEndpoints: [2018, 2017].map(year => `https://wikirate.org/Commons+Greenhouse_Gas_Emissions_Scope_1_and_2_combined+Answer.json?filter%5Bproject%5D=Question+Widget%3A+GHG+emissions&view=compact&filter[year]=${year}`)
});

export default WikirateWidget; 
