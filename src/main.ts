import Vue from 'vue'
import App from './App.vue'

const WikirateWidget = {
    renderWidget: function (el: string, numberOfTopAnswersToShow: number, yearsToShow: number[]) {
        Vue.config.productionTip = false
        return new Vue({
            el: el,
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


WikirateWidget.renderWidget("#app", 10, [2018, 2017]);

// import vueCustomElement from 'vue-custom-element'

// Vue.use(vueCustomElement)

// Vue.customElement('wikirate-widget', App)

// new Vue({
    
// }).$mount()

export default WikirateWidget; 
