var prefix = "localStorage";

$(document).ready(function() {
    $("#save").click(function() {
        var song = [];
        $('.music:checked').each(function(i) {
            song[i] = $(this).val();
        });
        var name = $("#nameAlbum").val();
        localStorage.setItem(prefix + name, song);  //setItem()
        RewriteFromStorage();
    });
    $("#choose").click(function() {
        var html ="",
                arrSongs = $("#data").val(),
                title = $('#data option:selected').html(),
                song=arrSongs.split(',');
                html+=title+' : <br/><br/>';
                html+='<audio class="iSong" controls autoplay >';
                html+='<source class="iSource" src="song/'+song[0]+'" type="audio/mpeg">';
                html+='Your browser does not support the audio element.</audio>'; 
                html+='<br/> Song: <span id="autoNext">Auto Next</span>| <span id="nextSong">Next Song</span><br/>';
                html+='<ul id="playlist">';
                for (var i = 0; i < song.length; i++){
                       html+='<li data-url="song/'+song[i]+'">'+song[i]+'</li>';
                }
                html+='</ul>';

                $("#playList").html(html);
    });
});
$(document.body).on('click', '#autoNext', function(event) {
    console.log('auto next song');
    var audio =$('.iSong'),
    current = 0,
    len = ($("#playlist li").length) - 1;
    audio[0].play();
    audio[0].addEventListener('ended',function(e){
        current++;
        console.log(current);
        console.log($('#playlist li:eq('+current+')').data('url'));
        if(current == len){
            current = 0;
            link = $('#playlist li:eq(0)').data('url');
            
        }else{
            link = $('#playlist li:eq('+current+')').data('url');
        }
        $(".iSource").attr("src",link);
        audio[0].load();
        audio[0].play();
    });
});

$(document.body).on('click', '#playlist li', function(event) {
    var audio = $("audio");
    audio[0].pause();
        $(".iSource").attr({
            "src": $(this).data("url")
        });
        audio[0].load();
        audio[0].play();
});

function RewriteFromStorage() {
    $("#data").empty();
    for (var i = 0; i < localStorage.length; i++)    //length
    {
        var key = localStorage.key(i);              //key()
        if (key.indexOf(prefix) == 0) {
            var value = localStorage.getItem(key);  //getItem()
            //var value = localStorage[key]; also works
            var shortkey = key.replace(prefix, "");
            $("#data").append('<option value="' + value + '">' + shortkey + '</option>');
        }
    }
}
RewriteFromStorage();