
;(function( $, window, document ) {

	"use strict";

	var 

	_doc = $( document ), 
	
	_win = $( window ), 

	Freeman = {

		isHandheld: (function(a){return /(android|bb\d+|meego).+mobile|android|ipad|playbook|silk|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4));})(navigator.userAgent||navigator.vendor||window.opera), 

		cssTransitions: (function(a,b){a=(new Image).style;b='ransition';return't'+b in a||'webkitT'+b in a||'MozT'+b in a})(), 

		cssAnimations: (function(a,b){a=(new Image).style;b='nimationName';return'a'+b in a||'webkitA'+b in a||'MozA'+b in a})(), 

		resizeCallbacks: [], 


		Gallery:{
			init: function(){
				$('.gallery').each(function(){
					if( $.fn.imagesLoaded && $.fn.isotope && $.fn.infinitescroll ) {

						$('.gallery-items', this).imagesLoaded(function(){
							$( this ).isotope({
								itemSelector: '.project', 
								transitionDuration: '0.5s'
							}).closest( '.gallery' ).addClass( 'loaded' );

							var $container = $(this);
							// Infinite Scroll
							$container.infinitescroll({
							    navSelector  : 'ul.pagination li', 
							    nextSelector : 'ul.pagination li a:first', 
							    itemSelector : 'li.project',
							    bufferPx     : 200,
							    loading: {
							        finishedMsg: 'We\'re done here.',
							    },
							    debug: false,
							},
									 
							// Infinite Scroll Callback
							function( newElements ) {
							    var $newElems = jQuery( newElements ).hide(); 
								    $newElems.imagesLoaded(function(){
								    $newElems.fadeIn();
									$container.isotope( 'appended', $newElems );
							    });
							});

						});
					}
				});

				_doc.on( 'click', '.gallery .filter a[data-filter]', function( e ) {

					$( this )
						.closest( 'li' )
							.siblings()
							.removeClass( 'active' )
							.end()
						.addClass( 'active' )
						.closest( '.gallery' )
							.find( '.gallery-items' )
							.isotope({ filter: $( this ).data( 'filter' ) })
							.end().end()
						.closest( '.filter' )
							.find( '.active-label' )
							.html( this.innerHTML );
					e.preventDefault();

				});
			}
		},


		init: function() {
			
			/* ==========================================================================
				Add Mobile Device class
			============================================================================= */
			( ! Freeman.isHandheld ) && $( 'html' ).addClass( 'desktop' );

			/* ==========================================================================
				Setup Listeners
			============================================================================= */
			Freeman.setupListeners();

			/* ==========================================================================
				Wait for Document.Ready
			============================================================================= */
			$( Freeman.ready );

		}, 

		syncPosition: function( el ){
			var current = this.currentItem;
			// Team
			$("#team-profile")
			      .find(".owl-item")
			      .removeClass("synced")
			      .eq(current)
			      .addClass("synced");

			if($("#team-profile").data("owlCarousel") !== undefined){
			      Freeman.center(current, 'team-profile');
			}
		},

		clientActivePos: function(el){
			var current = this.currentItem;
			//Clients
			$("#clients-logo")
			      .find(".owl-item .client-img a")
			      .removeClass("active")
			      .eq(current)
			      .addClass("active");

			if($("#clients-logo").data("owlCarousel") !== undefined){
			      Freeman.center(current, 'clients-logo');
			}
		},

		center: function(number, object){
			 var sync2visible = $("#" + object).data("owlCarousel").owl.visibleItems;
			    var num = number;
			    var found = false;
			    for(var i in sync2visible){
			      if(num === sync2visible[i]){
			        var found = true;
			      }
			    }
			 
			    if(found===false){
			      if(num>sync2visible[sync2visible.length-1]){
			        $("#" + object).trigger("owl.goTo", num - sync2visible.length+2)
			      }else{
			        if(num - 1 === -1){
			          num = 0;
			        }
			        $("#" + object).trigger("owl.goTo", num);
			      }
			    } else if(num === sync2visible[sync2visible.length-1]){
			      $("#" + object).trigger("owl.goTo", sync2visible[1])
			    } else if(num === sync2visible[0]){
			      $("#" + object).trigger("owl.goTo", num-1)
			    }
		},

		ready: function() {

			/* ==========================================================================
			  Revolution Slider Full Screen
			============================================================================= */

			if($.fn.revolution){
				$('.tp-banner').revolution({
						delay:6000,
						startwidth:1170,
						startheight:500,
						fullWidth:"off",
						fullScreen:"on",
						fullScreenOffsetContainer: "",
						hideThumbs:1,
						onHoverStop:"off",
         				hideTimerBar:"on",
         				navigationType:"none"
				});
			}

			/* ==========================================================================
				Collapse Menu
			============================================================================= */

			_doc.on('click', 'a.menu-collaps, a.menu-collaps-dark', function(event){
				event.preventDefault();
				var navigation = $('#nav-menu'),
					$this	   = $(this);

				$('body').toggleClass('cbp-spmenu-push');
				navigation.toggleClass('cbp-spmenu-open');
				$this.hide();
			});

			_doc.on('click', 'a.close-menu', function(event){
				event.preventDefault();
				var $this 		= $(this),
					$mcollaps 	= $('a.menu-collaps, a.menu-collaps-dark');

				$this.closest('#nav-menu').toggleClass('cbp-spmenu-open');
				$mcollaps.show();
				$('body').toggleClass('cbp-spmenu-push');


			});	

			/* ==========================================================================
			  Tooltip
			============================================================================= */

			if($.fn.popover){

				_doc.on('click', '.circle-box a', function(event){
					event.preventDefault();
				});

				$('.circle-box a').popover({
						html: true,
						trigger: 'hover',
						delay: { show: 300, hide: 100 },
						placement: 'top',
				});
			}
			/* ==========================================================================
				Add transition class
			============================================================================= */
			if( Freeman.cssTransitions ) {
				$( 'html' ).addClass( 'csstransitions' );
			}

			/* ==========================================================================
				ScrollSpy
			============================================================================= */
			if( $.fn.scrollspy ) {
				$( document.body ).scrollspy({
					target: 'nav.nvbar'
				});
			}

			/* ==========================================================================
				Splash Text Slider
			============================================================================= */
			if( $.fn.cycle ) {
				$( '.splash-slider' ).on( 'cycle-initialized', function() {
					$( this ).addClass( 'active' );
				}).cycle({
					fx: ( Freeman.isHandheld || ! Freeman.cssTransitions ) ? 'fade' : 'none', 
					log: false, 
					slides: '>.splash-content', 
					pauseOnHover: '.splash-text'
				});
			}

			/* ==========================================================================
				Smooth Scrolling
			============================================================================= */
			_doc.on( 'click', '.site-footer a[href^="#"].goup, ul.menu a[href^="#"]', function(e) {
				var href = $( this ).attr( 'href' ), 
					target = ( '#' == href ) ? 0 : document.getElementById( href.split(/#/).pop() );

				if( null !== target ) {

					//target = ( 0 == target ) ? 0 : $( target ).offset().top - $( '.site-splash' ).outerHeight() + 1;
					target = ( 0 == target ) ? 0 : $( target ).offset().top;

					$( 'html, body' ).stop().animate({ scrollTop: target }, Freeman.isHandheld ? 0 : 750 );
					e.preventDefault();
				}
			});

			/* ==========================================================================
				Media Elements
			============================================================================= */
			if( $.fn.mediaelementplayer ) {

				if( ! Freeman.isHandheld && !! _doc[0].createElement( 'video' ).canPlayType ) {

					(function() {
						var mejsSetPlayerSize = mejs.MediaElementPlayer.prototype.setPlayerSize;
						mejs.MediaElementPlayer.prototype.setPlayerSize = function( width, height ) {
							var t = this, 
								videoWrap = t.container.closest( '.aligned-video-wrapper' ), 
								wrapContainer = videoWrap.parent();

							if( t.isVideo && videoWrap.length && wrapContainer.length ) {

								var nativeWidth = (t.media.videoWidth && t.media.videoWidth > 0) ? t.media.videoWidth : t.options.defaultVideoWidth, 
									nativeHeight = (t.media.videoHeight && t.media.videoHeight > 0) ? t.media.videoHeight : t.options.defaultVideoHeight, 
									nativeRatio = nativeWidth / nativeHeight, 
									videoWrapWidth = wrapContainer.outerWidth(), 
									videoWrapHeight = wrapContainer.outerHeight(), 
									css = { 'width': '100%', 'height': '100%', 'marginTop': 'auto', 'marginLeft': 'auto' };

								if( nativeRatio > videoWrapWidth / videoWrapHeight ) {
									css.width = Math.round( nativeRatio * videoWrapHeight );
									css.marginLeft = ( videoWrapWidth - css.width ) / 2;
								} else {
									css.height = Math.round( videoWrapWidth / nativeRatio );
									css.marginTop = ( videoWrapHeight - css.height ) / 2;
								}

								videoWrap.css( css );
							}

							mejsSetPlayerSize.apply( t, arguments );
						}

						$( 'video', '.splash-media-video,.section-media-video' )
						.wrap( '<div class="aligned-video-wrapper"></div>' )
							.mediaelementplayer({
								defaultVideoWidth: 1920, 
								defaultVideoHeight: 1080, 
								enableKeyboard: false,
								loop: true,
								features: [], 
								pauseOtherPlayers: false, 
								canBePausedByOtherPlayers: false, 
								success: function( media ) {
									media.addEventListener( 'playing', function() {
										media.setMuted( true );
									}, false);
								}
							});
					})();

				} else {
					$( 'video', '.splash-media-video,.section-media-video' ).remove();
				}

				$( 'audio,video', '.media' ).mediaelementplayer({
					audioWidth: '100%', 
					defaultVideoWidth: 1920, 
					defaultVideoHeight: 1080, 
					enableKeyboard: false
				});

			}

			/* ==========================================================================
				Parallax Sections
			============================================================================= */
			if( $.fn.parallax ) {
				$( '[data-background]' ).each(function() {
					$( this ).parallax( $.extend( true, {
						lazyLoad: true, 
						mode: Freeman.isHandheld ? 'none' : 'parallax', 
						activeClass: 'has-bg', 
						fixedBgClass: 'bg-fixed', 
						parallaxClass: 'bg-fixed', 
						speedFactor: 0.3
					}, $( this ).data() ) );
				});
			}

			/* ==========================================================================
				Counter Animation
			============================================================================= */
			if( 'function' == typeof countUp ) {
				$( '.counter' ).each(function() {
					var el = $( this ).find( '.number' ), 
						counter, countTo = parseInt( el.text(), 10 );

					if( el.length && $.isNumeric( countTo ) ) {
						el.html( 0 );
						counter = new countUp( el[0], 0, countTo, 0, 2 );
						el.waypoint(function() { counter.start(function() { counter = null; }); }, { offset: '75%', triggerOnce: true });
					}
				});
			}

			/* ==========================================================================
				Magnific Popup
			============================================================================= */
			if( $.fn.magnificPopup ) {

				// Each Image
				$.each({
					'.gallery-items': 'a.mfp-zoom',
					'.recent-posts': 'a.mfp-zoom',
					'.blog-post': 'a.media'
				}, function( selector, delegate ) {
					$( selector ).each(function() {
						var type = $(this).find(delegate).data('type');
						type == 'video' ? type = 'iframe' : type = 'image';

						$( this ).magnificPopup({
							delegate: delegate, 
							type: type, 
							gallery: delegate ? { enabled: true } : false
						});
					});
				});
			}


			/* ==========================================================================
				Progressbar
			============================================================================= */
			if( $.fn.waypoint ) {
				$( '.progress' ).waypoint(function( direction ) {
					var value = $( this ).data( 'value' ) || 100;
					$( this ).find( '.progress-bar' ).css({ 'width': value + '%' });
				}, {
					triggerOnce: true, 
					offset: function() {
						return $.waypoints( 'viewportHeight' ) - 1;
					}
				});
			}

			/* ==========================================================================
				Placeholder
			============================================================================= */
			$.fn.placeholder && $( '[placeholder]' ).placeholder();

			/* ==========================================================================
				Contact Form
			============================================================================= */
			if( $.validator && $.fn.ajaxSubmit ) {
				(function() {
					var formSelector = '.form-group,[class*="col-xs-"],[class*="col-sm-"],[class*="col-md-"],[class*="col-lg-"]';

					// override jquery validate plugin defaults
					$.validator.setDefaults({
						highlight: function( el ) {
							$( el ).closest( formSelector ).addClass( 'has-error' );
						},
						unhighlight: function( el ) {
							$( el ).closest( formSelector ).removeClass( 'has-error' );
						},
						errorElement: 'span',
						errorClass: 'help-block',
						errorPlacement: function( error, el ) {
							error.insertAfter( el );
						}
					});

					$( '.contact-form' ).each(function() {
						$( this ).validate({
							submitHandler: function( form ) {
								$( form ).ajaxSubmit(function( response ) {
									response = $.parseJSON( response );
									$( _doc[0].createElement( 'div' ) )
										.addClass( 'alert' )
										.toggleClass( 'alert-danger', ! response.success )
										.toggleClass( 'alert-success', response.success )
										.html( response.message )
										.prepend( '<button type="button" class="close" data-dismiss="alert">&times;</button>' )
										.hide().prependTo( form ).slideDown();

									if( response.success ) {
										$( form ).resetForm();
									}
								});
							}
						});
					});
				})();

			}

			/* ==========================================================================
				Waypoints Entry Animation
			============================================================================= */
			if( ! Freeman.isHandheld && Freeman.cssAnimations && $.fn.devAnimate ) {
				$( '.section-row .row' ).filter(function() {
					// Prevent nested row animations
					return $( this ).parents( '.row' ).length == 0;
				}).devAnimate();
			}

			/* ==========================================================================
				Initialize Projects
			============================================================================= */
			Freeman.Gallery.init();

			/* ==========================================================================
				Contextual Setups
			============================================================================= */
			Freeman.setup();

			/* ==========================================================================
				Fire initial window resize callbacks
			============================================================================= */
			_win.triggerHandler( 'resize' );

		}, 

		setupListeners: function() {

			/* ==========================================================================
				Monitor Document Height Changes
			============================================================================= */
			(function( callback ) {
				var db = document.body, 
					dd = document.documentElement, 
					docHeight = Math.max(
						db.scrollHeight, dd.scrollHeight,
						db.offsetHeight, dd.offsetHeight,
						db.clientHeight, dd.clientHeight
					);

				function domChangeListener() {
					var currDocHeight = Math.max(
						db.scrollHeight, dd.scrollHeight,
						db.offsetHeight, dd.offsetHeight,
						db.clientHeight, dd.clientHeight
					);

					if( currDocHeight != docHeight ) {
						docHeight = currDocHeight;
						callback();
					}
					setTimeout( domChangeListener, 1000 );
				}

				domChangeListener();
			})( Freeman.onDocHeightChange );

			/* ==========================================================================
				Window.Resize
			============================================================================= */
			var resizeTimer, n;
			_win.on( 'resize orientationchange', function() {
				if( resizeTimer ) clearTimeout( resizeTimer );
				resizeTimer = setTimeout(function() {
					for( n = 0; n < Freeman.resizeCallbacks.length; n++ ) {
						var cb = Freeman.resizeCallbacks[n];
						'function' == typeof cb.callback && cb.callback.apply( cb.context || window );
					}
				}, 50);
			});
		}, 

		setup: function( context ) {
			context = $( context );

			if( ! context.length )
				context = $( document.body );

			/* ==========================================================================
				Tooltips
			============================================================================= */
			if( $.fn.tooltip ) {
				context.find( '[rel="tooltip"]' ).tooltip();
			}

			/* ==========================================================================
				Carousels
			============================================================================= */
			if( $.fn.owlCarousel ) {

			 // TEAM
			 var sync1 = $("#team-content");
			 var sync2 = $("#team-profile");
			 
			  sync1.owlCarousel({
			    singleItem : true,
			    slideSpeed : 1000,
			    navigation: false,
			    pagination:false,
			    afterAction : Freeman.syncPosition,
			    responsiveRefreshRate : 200,
			  });
			 
			  sync2.owlCarousel({
			    items : 4,
			    itemsTablet       : [768,2],
			    itemsMobile       : [479,2],
			    pagination:false,
			    responsiveRefreshRate : 100,
			    afterInit : function(el){
			      el.find(".owl-item").eq(0).addClass("synced");
			    }
			  });
			 
			  $("#team-profile").on("click", ".owl-item", function(e){
			    e.preventDefault();
			    var number = $(this).data("owlItem");
			    var content = $("#team-content .owl-item").eq(number);


			    content.find('.progress').each(function(){
			    	var progress 		= $(this);
			    	var progress_value 	= progress.data('value');

			    		progress.find('.progress-bar').css({'width': 0}).delay(500).queue(function(){
					        $(this).css({'width': progress_value + "%"});
					        $(this).dequeue();
					    });
			    });

			    sync1.trigger("owl.goTo",number);
			  });

			  // CLIENTS

			  var sync_c1 = $("#clients-content");
			  var sync_c2 = $("#clients-logo");
			 
			  sync_c1.owlCarousel({
			    singleItem : true,
			    slideSpeed : 1000,
			    navigation: false,
			    pagination:false,
			    autoPlay: 5000,
			    afterAction : Freeman.clientActivePos,
			    responsiveRefreshRate : 200,
			  });
			 
			  sync_c2.owlCarousel({
			    items : 6,
			    itemsTablet       : [768,3],
			    itemsMobile       : [479,1],
			    pagination:false,
			    navigation: false,
			    responsiveRefreshRate : 100,
			    afterInit : function(el){
			      el.find(".owl-item").eq(0).find('.client-img a').addClass("active");
			    }
			  });
			 
			  $("#clients-logo").on("click", ".owl-item", function(e){
			    e.preventDefault();
			    var number = $(this).data("owlItem");
			    sync_c1.trigger("owl.goTo",number);
			  });


			  // Portfolio
			  $("#owl-portfolio").owlCarousel({
			      navigation : true, // Show next and prev buttons
				  navigationText: [
				      '<i class="fa fa-arrow-left"></i>',
				      '<i class="fa fa-arrow-right"></i>'
				      ],
			      slideSpeed : 300,
			      paginationSpeed : 400,
			      singleItem:true
			  });

			}


			/* ==========================================================================
				FitVids
			============================================================================= */
			if( $.fn.fitVids ) {
				context.find( '.media' ).fitVids();
			}


			/* ==========================================================================
				Royal Slider
			============================================================================= */
			if( $.fn.royalSlider ) {
				var options = {
					'.standard-slider .royalSlider': {
						options: {
							controlNavigation: 'none', 
							imageScaleMode: 'fill'
						}
					}
				}, 
				royalSliders = context.find( '.royalSlider' );

				$.each( options, function( filter, opt ) {
					royalSliders = royalSliders
						.filter( filter )
							.each(function() {
								if( 'function' == typeof opt.beforeInit ) {
									opt.beforeInit.apply( this );
								}
								$( this ).royalSlider( $.extend( true, opt.options, $( this ).data(), {
									addActiveClass: true, 
									imageScalePadding: 0, 
									slidesSpacing: 0, 
									fadeinLoadedSlide: false
								}));
								if( 'function' == typeof opt.afterInit ) {
									opt.afterInit.apply( this );
								}
							})
							.end()
						.not( filter );
				});

				royalSliders.each(function() {
					$( this ).royalSlider( $( this ).data() );
				});
			}

		}, 


		windowLoad: function() {
			/* ==========================================================================
				Remove Site Loader
			============================================================================= */
			$( '.site-loader' ).remove();

			/* ==========================================================================
				Google Maps
			============================================================================= */
			if( $.fn.DevGoogleMaps ) {
				$( '.google-maps' ).DevGoogleMaps();
			}

		}, 

		onDocHeightChange: function() {
			if( $.fn.scrollspy ) {
				$( document.body ).scrollspy( 'refresh' );
			}

			if( $.waypoints ) {
				$.waypoints( 'refresh' );
			}

			if( $.fn.parallax ) {
				$( '[data-background]' ).parallax( 'refresh' );
			}
		}
	};

	Freeman.init();

	/* ==========================================================================
		Window.Load
	============================================================================= */
	_win.load( Freeman.windowLoad );

	/* EOF */

}) ( jQuery, window, document );