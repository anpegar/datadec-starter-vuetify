import Vue from 'vue';
import template from './Menu.html';

export default Vue.extend({
	template,
	props: ['showmenu'],
	data() {
		return {
			items: [{
				title: 'Opción 1'
			}, {
				title: 'Opción 2'
			}, {
				title: 'Opción 3'
			}]
		};
	}
});