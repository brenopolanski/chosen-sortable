// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ($, window, document, undefined) {

		// undefined is used here as the undefined global variable in ECMAScript 3 is
		// mutable (ie. it can be changed by someone else). undefined isn't really being
		// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
		// can no longer be modified.

		// window and document are passed through as local variable rather than global
		// as this (slightly) quickens the resolution process and can be more efficiently
		// minified (especially when both are regularly referenced in your plugin).

		// Defaults values
		var chosenSortable = 'chosenSortable',
			defaults = {
				containment: 'parent'
			};

		// Constructor
		function ChosenSortable(element, options) {
			this.element = element;
			this.settings = $.extend({}, defaults, options);
			this._defaults = defaults;
			this._name = chosenSortable;
			this.init();
		}

		// Avoid ChosenSortable.prototype conflicts
		$.extend(ChosenSortable.prototype, {
			init: function() {
				this.sortable(this.element, this.settings);
			},
			sortable: function(element, settings) {
				$(element).sortable(settings);
			}
		});

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[chosenSortable] = function(options) {
			this.each(function() {
				if (!$.data(this, 'plugin_' + chosenSortable)) {
					$.data(this, 'plugin_' + chosenSortable, new ChosenSortable(this, options));
				}
			});

			// chain jQuery functions
			return this;
		};

})(jQuery, window, document);
