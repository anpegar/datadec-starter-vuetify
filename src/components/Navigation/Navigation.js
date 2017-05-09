import Vue from 'vue';
import template from './Navigation.html';

// import './Navigation.css';

export default Vue.extend({
	template,
	data() {
		return {
			titulo: 'Datadec, S.A.',
			menuLeft: false
		};
	},
	methods: {
		showMenu: function() {
			this.menuLeft = !this.menuLeft;
			this.$emit('event_showmenu', this.menuLeft);
		}
	}

});