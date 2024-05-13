$(document).ready(function(){
    cardTitle = $('.card h2');
    cardTitleMarginLeft = cardTitle.css('margin-left');
    cardTitle.css('margin-left', '250px')
    cardTitle.css('opacity', '0')
    cardTitle.each(function(i){
        $(this).delay(i*200).animate({
            marginLeft: cardTitleMarginLeft,
            opacity: '1'
        }, 1000);
    });
	
    liAndP = $('li, p');
    liAndP.css('opacity', '0');
    liAndP.each(function(i){
        $(this).delay(i*200 + 500).animate({
            opacity: '1'
        }, 1000);
    });

    // Rotate in z axis
    profileImg = $('#profile img');
    profileImg.css('margin-top', '0px');
    profileImg.css('opacity', '0');
    profileImg.animate({
       marginTop: '25px',
       opacity: '1'
    }, 1000);

    profileName = $('#profile h1');
    profileName.css('margin-top', '75px');
    profileName.css('opacity', '0');
    profileName.animate({
       marginTop: '25px',
       opacity: '1'
    }, 1000);
});