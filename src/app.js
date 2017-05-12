import Vue from 'vue'
import Vuetify from 'vuetify'

// Styles
import './stylus/app.styl'


// Components
import AppNavigation from './components/Navigation/Navigation';
import AppMenu from './components/Menu/Menu';

// Vue plugins
Vue.use(Vuetify)

// Vue main instance
new Vue({
	components: {
		AppNavigation,
		AppMenu
	},
	data() {
		return {
			stateMenu: false,
			isLoading: 'Aplicación cargada ...'
		};
	},
	methods: {
		eventShowmenu: function (value) {
			this.stateMenu = value;
		}
	}
}).$mount('#app');