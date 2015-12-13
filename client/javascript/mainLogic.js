(function() {

    var form = document.getElementsByTagName('form')[0];
    var audio = document.querySelector('audio'),
        currentLoopTime = -1,
        endLoopTime = -2;


    var audioTempoMap = {
        '100%' : 1.0,
        '90%' : 0.9,
        '80%' : 0.8,
        '70%' : 0.7,
        '60%' : 0.6,
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

    $('.fa-repeat').on('touchstart click', function() {
        currentLoopTime = audio.currentTime;
        $('.loopStart').html(currentLoopTime + ' / ');
        $('.loopEnd').html('');

    });

    var isAudioPlaying = false;

    $('.fa-rotate-left').on('touchstart click', function() {
        endLoopTime = audio.currentTime;
        audio.currentTime = currentLoopTime;
        $('.loopEnd').html(endLoopTime);
        audio.play();
        isAudioPlaying = true;
    });

    $(audio).bind('timeupdate', function() {
        if(Math.floor(audio.currentTime) === Math.floor(endLoopTime)){
            audio.currentTime = currentLoopTime;
        }
    });

    $('.clearLoop > button').on('touchstart click', function() {
        currentLoopTime = -1;
        endLoopTime = -2;
        $('.loopStart').html('');
        $('.loopEnd').html('');
    });


})();
