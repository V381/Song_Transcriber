(function() {
    var form = document.getElementsByTagName('form')[0];
    var audio = document.querySelector('audio');


    var audioTempoMap = {
        '100%' : 1.0,
        '75%' : 0.7,
        '50%' : 0.5
    };

    $('ul li > button').each(function(val) {
        $(this).on('touchstart click', function () {
            for(var i in audioTempoMap){
                if(audioTempoMap.hasOwnProperty(i)){
                    if(i === $(this).html()){
                        $('.songTempo').html(i);
                        audio.playbackRate = audioTempoMap[i];
                    }
                }
            }
        });
    });

    $.get('/getFile', function(data){
        $('.songName').html('' + data.substr(7));
        audio.src = data;
    });

})();
