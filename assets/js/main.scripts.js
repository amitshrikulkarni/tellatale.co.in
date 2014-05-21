
;(function( $, window, document ) {

	/* ==========================================================================
		Dev Animate
	============================================================================= */
	(function() {
		var validAnimationNames = [
			'flipInX', 
			'flipInY',
			'fadeInUp', 
			'fadeInDown', 
			'fadeInLeft', 
			'fadeInRight', 
			'fadeInUpBig', 
			'fadeInDownBig', 
			'fadeInLeftBig', 
			'fadeInRightBig', 
			'slideInDown', 
			'slideInLeft', 
			'slideInRight', 
			'bounceIn', 
			'bounceInUp', 
			'bounceInDown', 
			'bounceInLeft', 
			'bounceInRight', 
			'rotateIn', 
			'rotateInUpLeft', 
			'rotateInDownLeft', 
			'rotateInUpRight', 
			'rotateInDownRight'
		];

		var DevAnimate = function( element, options ) {
			this.element = $( element );
			return this.init( options );
		};

		DevAnimate.prototype = {
			defaults: {
				waypointOffset: '75%', 
				animationName: 'fadeIn', 
				animationDuration: 800, 
				animationChainDuration: 800, // only used when animationChainDelay is 'distribute'
				animationChainDelay: 'distribute' // 'distribute' or a fixed number
			}, 

			init: function( options ) {
				this.options = $.extend( true, {}, this.defaults, options );
				this.targets = this.element.find( '[data-animation-name]' );

				if( this.targets && this.targets.length ) {
					this.targets
						.css( 'visibility', 'hidden' )
						.on( 'webkitAnimationEnd oanimationend msAnimationEnd animationend', this._onAnimationEnd );

					if( $.fn.waypoint ) {
						this.element.waypoint( $.proxy( this._waypointCallback, this ), { offset: this.options.waypointOffset, triggerOnce: true } );
					}
				}
			}, 

			_onAnimationEnd: function() {
				$( this ).css({ 'visibility': '', 'animation': '' });
			}, 

			_waypointCallback: function() {
				var t = this, 
					delay = 'distribute' == t.options.animationChainDelay ? 
						Math.ceil( t.options.animationChainDuration / t.targets.length ) : 
						t.options.animationChainDelay;
				
				t.targets.each(function( index ) {
					var elOpts = $( this ).data(), 
						animDelay = elOpts.animationDelay || ( index * delay ), 
						animDuration = elOpts.animationDuration || t.options.animationDuration, 
						animName = ( validAnimationNames.indexOf( elOpts.animationName ) < 0 ? t.options : elOpts ).animationName;

					$( this )
						.css({
							'visibility': '', 
							'animation-name': animName, 
							'animation-delay': animDelay + 'ms', 
							'animation-duration': animDuration + 'ms', 
							'animation-fill-mode': 'both'
						});
				});
			}
		};

		$.fn.devAnimate = function( options ) {
			return this.each(function() {
				new DevAnimate( this, $.extend( true, options, $( this ).data() ) );
			});
		};
	})();

}) ( jQuery, window, document );