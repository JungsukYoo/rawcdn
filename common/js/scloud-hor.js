$(function(){
	// tabs
	var on = $('.tab-bar a.selected').attr('href');
	$('.tab-content:not('+on+')').hide();
	$('.tab-bar a').click(function(){
		$('.tab-bar a').removeClass('selected');
		$(this).addClass('selected');
		$('.tab-content').hide();
		$($(this).attr('href')).fadeIn();
	});

	// submenu
	$('.sub-menu').hide();
	$('.menu-depth1.active').next().next().show();
	$('.menu-depth1 + .fa').click(function(){
		if( $(this).next().is(':hidden')){
			$('.menu-depth1').removeClass('active').next().next().slideUp();
			$(this).prev().toggleClass('active').next().next().slideDown();
	}else{
		$('.menu-depth1').removeClass('active').next().next().slideUp();
	}
		return false;
	});

	$('.sub-menu a').click(function(){
		$('.sub-menu a').removeClass('sub-active');
		$(this).addClass('sub-active');
	});
	
	$('.sub2-menu a').click(function(){
		$('.sub-menu a').removeClass('sub-active');
		$(this).parent().parent().parent().prev().children().addClass('sub-active');
	});

	// aside control
	$('.btn-ico-control').click(function(){
		$('.layout-side').toggleClass('side-fold');
		$('.layout-content').toggleClass('layout-wide');
		$('.btn-ico-control .fa').toggleClass('fa-sideUnfold');
		$('.fa-sideFold').parent().attr('title','close');
		$('.fa-sideFold.fa-sideUnfold').parent().attr('title','open');
	});
});