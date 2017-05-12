/**
 * EventBus: Bus para gestionar todos los eventos de la aplicación.
 * @author Enrique Mollá <emolla@datadec.es>
 * @version 1.0.0
 * @license Copyright 2017 Datadec, S.A.
 */

import Vue from 'vue';

const EventBus = new Vue();

Object.defineProperties(Vue.prototype, {
	$bus: {
		get: function () {
			return EventBus
		}
	}
});