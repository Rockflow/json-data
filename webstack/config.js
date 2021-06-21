onload = function () {

    AsyncRender();
}
// 全局变量
var title = "万向导航";
var NewJson = [{ "categories": [], "sites": [] }];
var side_bar_ejs = "webstack/template/side_bar.ejs"; // 侧边栏模板
var sites_ejs = "webstack/template/site_item.ejs"; // 网址模板
// var sites_json = "search/data.json"; // 数据json
var sites_json = "https://cdn.jsdelivr.net/gh/Rockflow/json-data/data.json"; // 数据json
// 同步执行
function SyncRender() {
    // 设置同步
    $.ajaxSettings.async = false;

    // 免费 ico
    // https://icomoon.io/#preview-free

    $.getJSON(sites_json, function (dataJson) {

        // 修改标题
        document.title = ejs.render(document.title, {siteName: title});
        var side_bar_template = getTemplate(side_bar_ejs); //侧边栏
        var site_template = getTemplate(sites_ejs); //网址
        // console.log(side_bar_template);
        // console.log(site_template);

        // dataJson.sort(sortCate);     // 按分类排序 去重后不需要排序
        NewJson[0].categories = printCategory(dataJson);  // 从data.json 提取所有分类
        NewJson[0].sites = dataJson;    // 将data.json 添加到新的 json
        // console.log(NewJson);

        document.getElementById("main-menu").innerHTML = ejs.render(side_bar_template, {dataJson: NewJson[0].categories});
        document.getElementById("site").innerHTML = ejs.render(site_template, {dataJson: NewJson});
    })
}

// 默认异步执行
function AsyncRender() {
    $.when(
        $.get(side_bar_ejs),
        $.get(sites_ejs),
        $.getJSON(sites_json)
    )
        // .always(function () {
        //     console.log("hello");
        // })
        .done(function (side_bar, sites,json) { //返回的都是数组类型
            var side_bar_template = side_bar[0];
            var site_template = sites[0];
            var dataJson = json[0];

            // 修改标题
            document.title = ejs.render(document.title, { siteName: title });

            NewJson[0].categories = printCategory(dataJson);  // 从data.json 提取所有分类
            NewJson[0].sites = dataJson;    // 将data.json 添加到新的 NewJson

            document.getElementById("main-menu").innerHTML = ejs.render(side_bar_template, { dataJson: NewJson[0].categories });
            document.getElementById("site").innerHTML = ejs.render(site_template, { dataJson: NewJson });
        })
        .fail(function (e) {
            throw new Error("获取模板或json数据失败");
        })

}

function getTemplate(filename) {
    var template = null;
    $.get(filename, function (data) {
        template = data;
    }, "text");
    return template;
}
// 按分类排序
function sortCate(a,b) {
    if(a.category != undefined && b.category != undefined){
        if(a.category!=b.category){
            return a.category.localeCompare(b.category);
        }
    }
}
// 打印所有分类，便于填写 NewJson
function printCategory(data) {
    var cg = [];
    data.forEach(site => {
        if(site.category != undefined){
            cg.push(site.category);
        }
    });
    // 利用set去重复
    return Array.from(new Set(cg));
}