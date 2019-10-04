$(function(){
    var searchfield=$('#query');
    var icon=$('#search-btn');

    $(searchfield).on('focus',function(){
        $(this).animate({
            width:'100%'
        },400);
        $(icon).aniamte({
            right:'10px'
        },400);
    });
    $(searchfield).on('blur', function () {
        if(searchfield.val()==''){
            $(searchfield).animate({
                width:'45%'

            },400,function(){});
            $(icon).aniamte({
                right: '360px'
            },400,function(){});           
        }
    }) 
    $('#search-form').submit(function(e){
        e.preventDefault();
    })   
})
function search(){
    $('#results').html('');
    $('#buttons').html('');

    var q=$('#query').val();


    $.get(
        "https://www.googleapis.com/youtube/v3/search",{
        part:'snippet,id',
        q:q,
        type:'video',
        key:'AIzaSyDiHavvLsIUDkk5YoaIqbXHNihbwFTtk9c'},
        function(data){
            var nextPAge=data.nextPageToken;
            var prevToken=data.prevPageToken;

            console.log(data);
            $.each(data.items,function(i,item){
                var output=getoutput(item);
                
                $('#results').append(output);
            })
            var buttons=getbutton(nextPAge,prevToken);

            $('#buttons').append(buttons);
        }
    )
}

function getoutput(item){
    var videoid=item.id.videoId;
    var title=item.snippet.title;
    var description=item.snippet.description;
    var thumb=item.snippet.thumbnails.high.url;
    var channeltitle=item.snippet.channelTitle;
    var videodate=item.snippet.publishedAt;

    var output='<li>'+
    '<div class="list-left">'+
    '<img src="'+thumb+'">'+
    '</div>'+
    '<div class="list-right">'+
    '<h3>'+title+'</h3>'+
    '<small> by  <span class="ctitle">'+channeltitle+'</span> on '+videodate+'</small>'+
    '<p>'+description+'</p>'+
    '</div>'+
    '</li>'+
    '<div class="clearfix"></div>'+
    '';

    return output;
}

function getbutton(nextPAge, prevToken){
    
}