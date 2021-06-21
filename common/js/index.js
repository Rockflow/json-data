$(function () {

    // $.getJSON("common/url.json", function (data) {
    $.getJSON("https://cdn.jsdelivr.net/gh/Rockflow/json-data/url.json", function (data) {
        var gettpl = $("#demo").html();
        laytpl(gettpl).render(data, function (html) { $('#view').html(html); })
    })
        .fail(function () {
            $.getJSON("common/url.json", function (data) {
                var gettpl = $('#demo').html();
                laytpl(gettpl).render(data, function (html) { $('#view').html(html); })
            })
            .done(function () {
                alert("数据源 : 本地");
            })
            .fail(function () {
                alert("json加载失败!")
            });
        })
});
