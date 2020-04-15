import Vue from 'vue'
import App from './App.vue'

interface WidgetOptions {
    element: string;
    numberOfTopAnswersToShow: number;
    yearsToShow: number[];
}
const WikirateWidget = {
    
    renderWidget: function ({element, numberOfTopAnswersToShow, yearsToShow}: WidgetOptions) {
        Vue.config.productionTip = false
        return new Vue({
            el: element,
            props: ['numberOfTopAnswersToShow', 'years'],
            render: h => h(App, { props: { numberOfTopAnswersToShow, yearsToShow } })
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
    yearsToShow: [2018, 2017]
});

// import vueCustomElement from 'vue-custom-element'

// Vue.use(vueCustomElement)

// Vue.customElement('wikirate-widget', App)

// new Vue({
    
// }).$mount()

export default WikirateWidget; 
