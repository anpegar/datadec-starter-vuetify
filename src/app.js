import Vue from 'vue';
import Vuetify from 'vuetify';

// Styles
import './stylus/app.styl';

// Eventbus
import '@/config/event-bus.js'

// Components
import AppNavigation from './components/Navigation/Navigation';
import AppMenu from './components/Menu/Menu';

// Vue plugins
Vue.use(Vuetify);

// Vue main instance
new Vue({
	components: {
		AppNavigation,
		AppMenu
	},
	data() {
		return {
			isLoading: 'Aplicación cargada ...'
		};
	}
}).$mount('#app');