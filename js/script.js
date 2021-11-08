$(document).ready(function(){

    /* fronpage sidebar animacija */

    var sidebarLeftTimeout;
    var sidebarRightTimeout;

    // sidebar display
    var $sidebarLeft = $('.sidebar-left');
    var $sidebarRight = $('.sidebar-right');

    function sidebarLeftShow() {
        $sidebarLeft.stop().animate( { left:'0' } );
        $('.nav li', $sidebarLeft).stop().animate({ marginLeft: '0'});
        $('li span', $sidebarLeft).stop(true,true).animate({'opacity': '1'});
    }
    function sidebarLeftHide() {
        $($sidebarLeft).stop().animate( { left:'-76px' } );
        $('.nav li', $sidebarLeft).stop().animate({ marginLeft: '0'});
        $('li span', $sidebarLeft).stop().animate({'opacity': '0'});
    }
    function sidebarRightShow() {
        $($sidebarRight).stop().animate( { right:'0' } );
        $('.nav li.item, .nav li.languages', $sidebarRight).stop().animate({ marginLeft: '37px'});
        $('li span', $sidebarRight).stop(true,true).animate({'opacity': '1'});
        $('li.person', $sidebarRight).stop(true,true).slideDown();
        $('li.item', $sidebarRight).stop().animate({marginBottom: '14px'});
        $('li.phone', $sidebarRight).stop().animate({marginTop: '16px',marginBottom: '14px'});
    }
    function sidebarRightHide() {
        $($sidebarRight).stop().animate( { right:'-86px' } );
        // $('.nav li.item, .nav li.languages', $sidebarRight).stop().animate({ marginLeft: '28px'});
        $('li span', $sidebarRight).stop().animate({'opacity': '0'});
        $('li.person', $sidebarRight).stop().slideUp();
        $('li.item', $sidebarRight).stop().animate({marginBottom: '44px'});
        $('li.phone', $sidebarRight).stop().animate({marginTop: '34px',marginBottom: '44px'});
    }

    function setupSidebarAnimation(sidebar, sidebarShow, sidebarHide, sidebarTimeout) {
        sidebar.hover(function () {
                clearTimeout(sidebarTimeout);
                sidebarShow();
            }, sidebarHide
        );
        sidebarTimeout = setTimeout(function () {
            sidebarShow();
            sidebarTimeout = setTimeout(function() {
                sidebarHide();
            }, 2000) // hide timeout
        }, 5000); // display timeout
    }
    setupSidebarAnimation($sidebarLeft, sidebarLeftShow, sidebarLeftHide, sidebarLeftTimeout);
    setupSidebarAnimation($sidebarRight, sidebarRightShow, sidebarRightHide, sidebarRightTimeout);

/*
    // attach sidebar sliding animation to hover event
    $sidebarLeft.hover(function () {
            clearTimeout(sidebarLeftTimeout);
            sidebarLeftShow();
        }, sidebarLeftHide
    );
    $sidebarRight.hover(function () {
            clearTimeout(sidebarRightTimeout);
            sidebarRightShow();
        }, sidebarRightHide
    );

    // animate sidebars after 5s after startup
    sidebarLeftTimeout = setTimeout(function () {
        sidebarLeftShow();
        sidebarLeftTimeout = setTimeout(function() {
            sidebarLeftHide();
        }, sidebarHideTimeout)
    }, sidebarDisplayTimeout);
    sidebarRightTimeout = setTimeout(function () {
        sidebarRightShow();
        sidebarRightTimeout = setTimeout(function() {
            sidebarRightHide();
        }, sidebarHideTimeout)
    }, sidebarDisplayTimeout);
*/

    /* frontpage arrow animation */
    $(".visual").hover(function() {
        $(".benefits-hint").animate({left: "-=10"}, 200, function() {
            $(this).animate({left:"+=10"}, 100)
        })
    }, function() {});


    if ($('.bxslider li').length > 1) {
        $('.bxslider').bxSlider({
            //adaptiveHeight: true
            auto: true,
            pause: 3000
        });
    }

    /* frontpage hover-slider */
    // TODO: fix queueing animations
    $('.new-innovation a').hover(
        function() {
            if ($(document).width() < 571) return false;
            $('.inside', this).stop(true).animate({top: '-206px'});
        },
        function() {
            if ($(document).width() < 571) return false;
            $('.inside',this).stop(true).animate({top: '0'});
        }
    );
    $('.new-project a').hover(
        function() {
            if ($(document).width() < 571) return false;
            $('p', this).stop(true).animate({height: '206px'});
        },
        function() {
            if ($(document).width() < 571) return false;
            $('p',this).stop(true).animate({height: '0'});
        }
    )
  

    // login popup show/hide
    $('#display-login').click( function(event) {
        $('.login-popup').animate({top: '0'});
        $('#username').focus();
        event.preventDefault();
    })
    $('.login-popup .btn-close').click( function() {
        $('.login-popup').animate({top:'-335px'});
    });

    // Perform AJAX login on form submit
    $('form#login').on('submit', function(e){
        e.preventDefault();
        $('#username, #password').removeClass('error');
        if ($('#username').val() == '') { $('#username').addClass('error'); return; }
        if ($('#password').val() == '') { $('#password').addClass('error'); return; }
        $('#login-submit').attr('disabled','disabled');
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: ajax_login_object.ajaxurl,
            data: {
                'action': 'ajaxlogin', //calls wp_ajax_nopriv_ajaxlogin
                'username': $('form#login #username').val(),
                'password': $('form#login #password').val(),
                'security': $('form#login #security').val() },
            success: function(data){
                $('#login-submit').removeAttr('disabled');
                if (data.loggedin == true){
                    document.location.href = data.url;
                } else {
                    // highlight error field
                    switch (data.message) {
                        case 'invalid_username':
                            $('form#login #username').addClass('error');
                            break;
                        case 'incorrect_password':
                            $('form#login #password').addClass('error');
                            break;
                        default:
                            alert('Bandant prisijungti įvyko klaida, susisiekite su svetainės administratoriumi.');
                    }
                }
            },
            error: function() {
                $('#login-submit').removeAttr('disabled');
                alert('Nepavyko susisiekti su serveriu.');
            }
        });
    });


    // benefits tool scripts
    function benefitEnable(item) {
        $('.visual .service-'+item+'.inactive').fadeOut();
        $('.visual .service-'+item+'.active').fadeIn();
        $('.visual .step-'+item).addClass('active');
    }
    function benefitDisable(item) {
        $('.visual .service-'+item+'.inactive').fadeIn();
        $('.visual .service-'+item+'.active').fadeOut();
        $('.visual .step-'+item).removeClass('active');

    }
    if ($('#benefits-slider').length > 0) {
        var handle_left;
        var handle_right;
        var benefits = $('.benefit');

        $( '#benefits-slider' ).slider({
            range: true,
            min: 0,
            max: 100,
            values: [ 0, 0 ],
            animate: true,
            slide: function( event, ui ) {
                $('.benefits-contact').fadeIn(); // display contact-us arrow
            },
            change: function( event, ui ) {

                var slider_left = $("#benefits-slider").offset().left;
                var slider_right = slider_left + $("#benefits-slider").width() + 20;
                var slider_length = slider_right - slider_left;

                var handle_left_x = slider_left + (ui.values[0]*slider_length/100);
                var handle_right_x = slider_left + (ui.values[1]*slider_length/100);

                benefits.each( function() {

                    //if (($(this).offset().left >= handle_left_x-10) && ($(this).offset().left+$(this).outerWidth() <= handle_right_x+10)) {
                    if (($(this).offset().left >= handle_left_x-10) && ($(this).offset().left <= handle_right_x-100)) {
                        $(this).addClass('active');
                    } else {
                        $(this).removeClass('active');
                    }
                });
                var headlines = [];
                if (( ui.values[0] == 0) && ( ui.values[1] > 33)) {
                    benefitEnable('1');
                    headlines.push('1');
                } else {
                    benefitDisable('1');
                }
                if (( ui.values[0] < 35) && ( ui.values[1] > 67)) {
                    benefitEnable('2');
                    headlines.push('2');
                } else {
                    benefitDisable('2');
                }
                if (( ui.values[0] < 69) && ( ui.values[1] == 100)) {
                    benefitEnable('3');
                    headlines.push('3');
                } else {
                    benefitDisable('3');
                }

                $('.front-page .main-h2').fadeTo(400, 0.01, function(){
                    $('.front-page .main-h2').text($('h2.headline-'+headlines.join('-')).text()).fadeTo(400, 1);
                });
                
            }
        });
        //$('#benefits-slider').slider('values',1,34);
    };
    $('.benefit').hover( function() {
        // fill text block with values
        $('.benefit-detail .title').html( $(this).data('title') );
        $('.benefit-detail .description').html( $(this).data('description') );
        // show
        $('.benefit-detail').stop(true, true).fadeIn();
    }, function() {
        // hide
        $('.benefit-detail').stop(true, true).fadeOut();
    });

    // setup benefit slider animation timeout
    if ($('#benefits-slider').length > 0) {
      var sliderTimeout = setTimeout(function () {
          $('#benefits-slider').slider('values',1,100);
          sliderTimeout = setTimeout(function() {
              $('#benefits-slider').slider('values',1,34);
          }, 1500) // hide timeout
      }, 1000); // display timeout

      $(window).on('scroll', function(e){
        if ($('.benefits-contact').offset().top - $('.sidebar-right').offset().top < 50)
            $('.benefits-contact').fadeOut();
      });
    }
    
    $('.menu-trigger').on('click', function(e){
        $('.mob-menu').slideToggle();
        e.preventDefault();
    });
    
    $('.expand tr:first-child').on('click', function(){
        $(this).toggleClass('expanded');
    });
    
    $('#email-lightbox .close').on('click', function(e){
        $('#email-lightbox').fadeOut();
        e.preventDefault();
    });
    
    $('.email a').on('click', function(e){
        var light = $('#email-lightbox');
        var text = $(this).attr('href');
        light.find('.email-text').attr('href', text).html(text.replace('mailto:', ''));
        light.fadeIn();
        e.preventDefault();
    });
});