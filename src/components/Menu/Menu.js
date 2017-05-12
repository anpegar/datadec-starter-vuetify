import Vue from 'vue';
import template from './Menu.html';
import HTTP from '@/config/axios-config';

export default Vue.extend({
	template,
	data() {
		return {
			showmenu: false,
			items: [{
				title: 'Axios'
			}, {
				title: 'Option 1'
			}, {
				title: 'Option 2'
			}]
		};
	},
	created: function () {
		this.$bus.$on('event-showmenu', (value) => {
			this.showmenu = value;
		});
	},
	methods: {
		loadOption(event) {
			var targetId = event.currentTarget.id;
			if (targetId === '0') {
				HTTP.get('https://randomuser.me/api/?results=5')
					.then(function (response) {
						$('.content div').text(JSON.stringify(response));
					})
					.catch(function (error) {
						console.log(error);
					});
			}
		}
	}
});