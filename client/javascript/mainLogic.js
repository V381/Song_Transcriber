(function() {

    var form = document.getElementsByTagName('form')[0];
    var audio = document.querySelector('audio'),
        currentLoopTime = -1,
        endLoopTime = -2,
        currentSongTime = -1,
        endSongTime = -2;

    function timeConvert(time){
        var minutes = Math.floor(time / 60);
        var seconds = time % 60;
        return minutes + ":" + seconds;
    }

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
        audio.src = data;
        if(data.substr(data.length - 4) != (".mp3" || ".ogg" || ".wav")){
            $('.tempoHeadLine__wrong-format').html('Please provide right format: .mp3, .wav or .ogg file');
        }else{
            $('.songName').html('' + data.substr(7));
            $('.tempoHeadLine__wrong-format').html('')
        }
    });

    $('.fa-repeat').on('touchstart click', function() {
        currentLoopTime = Math.floor(audio.currentTime);
        currentSongTime = audio.currentTime;
        currentLoopTime = timeConvert(currentLoopTime);
        $('.loopStart').html(currentLoopTime + ' / ');
        $('.loopEnd').html('');

    });

    var isAudioPlaying = false;

    $('.fa-rotate-left').on('touchstart click', function() {
        endLoopTime = Math.floor(audio.currentTime);
        endSongTime = audio.currentTime;
        endLoopTime = timeConvert(endLoopTime);
        audio.currentTime = currentSongTime;
        $('.loopEnd').html(endLoopTime);
        audio.play();
        isAudioPlaying = true;
    });

    $(audio).bind('timeupdate', function() {
        if(Math.floor(audio.currentTime) === Math.floor(endSongTime)){
            audio.currentTime = currentSongTime;
        }
    });

    $('.clearLoop > button').on('touchstart click', function() {
        currentLoopTime = -1;
        endLoopTime = -2;
        endSongTime = -2;
        currentSongTime = -1;
        $('.loopStart').html('');
        $('.loopEnd').html('');
    });


    $('.fileUpload').css("width", "100%");
    $('.fileUpload').hover(function() {
        $(this).css('cursor', 'pointer');
    });
    $('.fileSubmit').css("width", "100%");
    

})();
