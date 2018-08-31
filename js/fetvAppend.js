// var SERVERROOTFILE = "http://www.fetv.cn/fe/";
// 新闻头部
function headNews() {
    new Vue({
        el:"#feheadnews",
        data:{
            headNewsBig:[],
            headNewsSmall:[]
        },
        filters: {
            addRoot: function addRoot(newsId) {
                return ROOT + "newsdetail.html?newsId=" + newsId;
            },
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getHeadNewsList();
            })
        },
        methods: {
            getHeadNewsList: function () {
                var _this = this;
                this.$http.get(SERVERROOTDATA+"News.ashx?action=getNewsBanner",
                    {
                        organId:TempOrgId,
                        pageSize:2
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.length < 1) {
                            return false;
                        } else {
                                _this.headNewsBig.push(res.body[0].banner[0]);
                                _this.headNewsSmall=res.body[1].news;
                        }
                    }).then(function () {
                    _this.headNewsBig.forEach(function(item, index) {
                        Vue.set(item, "iconPath", SERVERROOTFILE + item.iconPath);
                    })
                    _this.headNewsSmall.forEach(function(item, index) {
                        Vue.set(item, "iconPath", SERVERROOTFILE + item.iconPath);
                    })
                })
            }
        }
    })
}
// 新闻页-左侧列表
function newslist() {
    new Vue({
        el:"#fenewslist",
        data:{
            newsArr:[],
            newsTypeArr:[],
            current:1,//当前页
            newsTypeId:'79',
            nodata:false,
            load:true
        },
        filters: {
            addRoot: function addRoot(newsId) {
                return ROOT + "newsdetail.html?newsId=" + newsId;
            },
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getNewsListType();
                _this.getNewsList(this.newsTypeId,this.current);
                _this.toggleNewsList();
            })
        },
        methods:{
            getNewsListType:function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA+"NewsType.ashx?action=getNewsType",
                    {
                        organId:TempOrgId,
                        pageSize:6
                    }
                    ,{emulateJSON:true})
                    .then(function (res) {
                        if(res.body.length < 1) {
                            return false;
                        } else {
                                _this.newsTypeArr=res.body;
                        }
                    }).then(function () {
                    newTypeFlag();
                    _this.newsTypeId=$(".fenewslist-left-title a:first-child").data('id');
                })
            },
            getNewsList:function (newsTypeId,pageIndex) {
                var _this=this;
                this.$http.post(SERVERROOTDATA+"News.ashx?action=getNewsByType",
                    {
                        organId:TempOrgId,
                        newsTypeId:newsTypeId,
                        pageIndex:pageIndex,
                        pageSize:5
                    }
                    ,{emulateJSON:true})
                    .then(function (res) {
                        if(res.body.rows.length < 1) {
                            _this.nodata=true;
                        } else {
                                _this.newsArr= _this.newsArr.concat(res.body.rows);
                                _this.nodata=false;
                        }
                        if(pageIndex >=res.body.totalPageCount){
                            _this.load=false;
                        }else{
                            _this.load=true;
                        }
                })
            },
            newsloadMore:function () {
                this.getNewsList(this.newsTypeId,++this.current);
            },
            toggleNewsList: function() { //toggle 新闻列表
                var _this = this;
                $(".fenewslist-left-title").off("click", "a");
                $(".fenewslist-left-title").on("click", "a", function() {
                    //
                    _this.newsTypeId=$(this).data('id');
                    _this.current=1;
                    _this.newsArr=[];//清空数据
                    _this.getNewsList(_this.newsTypeId,_this.current);
                    newTypeFlagChange($(this));
                });
            },
            bindReadCount:function (id) {
                var _this=this;
                this.$http.post(SERVERROOTDATA+"News.ashx?action=updateNewsClickCount",
                    {
                        newsId:id
                    }
                    ,{emulateJSON:true})
            }
        }
    })
}
function newTypeFlag() { //新闻列表初始类型标志 active： 默认第一个
    $(".fenewslist-left-title a:first-child").addClass("active");

}
function newTypeFlagChange(obj) { //新闻列表初始类型标志 active： 默认第一个 :改变
    if(obj.hasClass("active")) {
        return false;
    } else {
        $(".fenewslist-left-title a.active").removeClass("active");
        obj.addClass("active");
    }
}
// 新闻页-右侧新鲜短讯
function freshSms() {
    new Vue({
        el:"#fefreshsms",
        data:{
            msList:[]
        },
        filters: {
            addRoot: function addRoot(newsId) {
                return ROOT + "newsdetail.html?newsId=" + newsId;
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getFreshList();
            })
        },
        methods:{
            getFreshList:function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA+"News.ashx?action=getFreshNews",
                    {
                        organId:TempOrgId,
                        pageIndex:1,
                        pageSize:5
                    }
                    ,{emulateJSON:true})
                    .then(function (res) {
                        if(res.body.length < 1) {
                            return false;
                        } else {
                                _this.msList=res.body.rows;
                        }
                    })
            }
        }
    })
}
// 新闻页-右侧热文推荐
function hotarticle() {
    new Vue({
        el:"#fehotarticle",
        data:{
            msList:[]
        },
        filters: {
            addRoot: function addRoot(newsId) {
                return ROOT + "newsdetail.html?newsId=" + newsId;
            },
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getHotarticleList();
            })
        },
        methods:{
            getHotarticleList:function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA+"News.ashx?action=getHotDocRecommend",
                    {
                        organId:TempOrgId,
                        pageIndex:1,
                        pageSize:4
                    }
                    ,{emulateJSON:true})
                    .then(function (res) {
                        if(res.body.length < 1) {
                            return false;
                        } else {
                            _this.msList=res.body.rows;
                        }
                    })
            }
        }
    })
}
// 影视圈-往期回顾
function pastreview() {
    new Vue({
        el:"#fepastreview",
        data:{
            movieArr:[]
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            addDetailRoot: function addDetailRoot(newsId) {
                return ROOT + "moviedetail.html?videoId=" + newsId;
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getMovieArr();
            })
        },
        methods:{
            getMovieArr:function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA+"Course.ashx?action=getLiveChannelPlayback",{},{emulateJSON:true})
                    .then(function (res) {
                        if(res.body.length < 1) {
                            return false;
                        } else {
                            // if(typeof res.body == "string") {
                            //     _this.movieArr = JSON.parse(res.body)[0].movieswiper;
                            // } else {
                                _this.movieArr=res.body.rows;
                                // console.log(_this.movieArr);
                            // }
                        }

                    }).then(function () {
                    var swiper = new Swiper('.swiper-container', {
                        nextButton: '.swiper-button-next',
                        prevButton: '.swiper-button-prev',
                        slidesPerView: 4,
                        spaceBetween: 4
                    });
                })
            }
        }
    })
}
// 影视圈-左侧新闻列表
function moviecircle() {
    var player = new prismplayer({
        id: 'jnewsPlayer',// 容器id
        source:"http://www.fetv.cn/fe/uploads/video/fjjyw.mp4", // 视频地址src
        autoplay: true, //自动播放：否
        width: "1200px", // 播放器宽度
        height: "600px", // 播放器高度630px
    });
    new Vue({
        el:"#femoviecirclelist",
        data:{
            movieTypeArr:[],//导航栏
            movieListArr:[],//电影列表
            position:[],
            current:1,
            currentType:'',//当前选中类型
            nodata:false,
            load:true
        },
        filters: {
            addRoot: function addRoot(newsId) {
                return ROOT + "moviedetail.html?videoId=" + newsId;
            },
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getMovieListType();
                _this.getMovieList(_this.currentType,_this.current);
                _this.toggleMovieList();
                _this.toggleAllMovieList();
            })
        },
        methods:{
            getMovieListType:function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA+"VideoType.ashx?action=getVideoType",
                    {
                        organId:TempOrgId
                    }
                    ,{emulateJSON:true})
                    .then(function (res) {
                        if(res.body.length < 1) {
                            return false;
                        } else {
                            _this.movieTypeArr=res.body;
                        }
                    })
            },
            getMovieList:function (videoTypeId,pageIndex) {
                var _this = this;
                this.$http.post(SERVERROOTDATA+"MicroVideo.ashx?action=getMicroVideoByType",
                {
                    organId:TempOrgId,
                    videoTypeId:videoTypeId,
                    pageIndex:pageIndex,
                    pageSize:4
                }
                ,{emulateJSON:true})
                    .then(function (res) {
                        if(res.body.rows.length < 1) {
                            _this.nodata=true;
                        } else {
                            _this.movieListArr=_this.movieListArr.concat(res.body.rows);
                            _this.nodata=false;
                        }
                        if(pageIndex >=res.body.totalPageCount){
                            _this.load=false;
                        }else{
                            _this.load=true;
                        }
                    }).then(function () {
                        // for(var i=0;i<this.movieListArr.length;i++){
                        //     var s=parseInt(this.movieListArr[i].score-10);
                        //     this.position.push(s*7)
                        // }
                })
            },
            movieloadMore:function () {
                var _this=this;
                this.getMovieList(_this.currentType,++_this.current);
            },
            toggleMovieList:function () {
                var _this = this;
                $(".femoviecirclelist-left-title").on("click", "a", function() {
                    // 按钮点击事件 暂写
                    _this.currentType=$(this).data('id');
                    _this.current=1;
                    _this.movieListArr=[];
                    _this.getMovieList(_this.currentType,_this.current);
                });
            },
            toggleAllMovieList:function () {
                var _this = this;
                $(".femoviecirclelist-left-title").on("click", "b", function() {
                    // 按钮点击事件 暂写
                    _this.currentType=$(this).data('id');
                    _this.current=1;
                    _this.movieListArr=[];
                    _this.getMovieList(_this.currentType,_this.current);
                });
            }
        }
    })
}
// 影视圈-右侧热门推荐
function moviehotrecommend() {
    new Vue({
        el:"#fefreshsms",
        data:{
            msList:[]
        },
        filters: {
            addRoot: function addRoot(newsId) {
                return ROOT + "moviedetail.html?videoId=" + newsId;
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getFreshList();
            })
        },
        methods:{
            getFreshList:function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA+"MicroVideo.ashx?action=getHottestRecommendVideo",
                    {
                        organId:TempOrgId,
                        pageIndex:1,
                        pageSize:5
                    }
                    ,{emulateJSON:true})
                    .then(function (res) {
                        if(res.body.length < 1) {
                            return false;
                        } else {
                            _this.msList=res.body.rows;
                        }
                    })
            }
        }
    })
}
// 影视圈-右侧热门排行
function moviehotlist() {
    new Vue({
        el:"#fehotarticle",
        data:{
            msList:[]
        },
        filters: {
            addRoot: function addRoot(newsId) {
                return ROOT + "moviedetail.html?videoId=" + newsId;
            },
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getHotarticleList();
            })
        },
        methods:{
            getHotarticleList:function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA+"MicroVideo.ashx?action=getHotRankingVideo",
                    {
                        organId:TempOrgId,
                        pageIndex:1,
                        pageSize:4
                    }
                    ,{emulateJSON:true})
                    .then(function (res) {
                        if(res.body.length < 1) {
                            return false;
                        } else {
                            _this.msList=res.body.rows;
                        }
                    })
            }
        }
    })
}
// 影视详情页
function moviedetail(vId) {
    $.ajax({
        type: "post",
        url: SERVERROOTDATA + "CourseCatalog.ashx?action=getPlayUrlByVideoId",
        dataType: 'text',
        data: {
            videoid: vId
        },
        success: function(msg) {
            var player = new prismplayer({
                id: 'videoPlay',
                width: '100%',
                height:'600px',
                autoplay: true,
                controlBarVisibility:'always',
                vid: vId,
                playauth: msg
                // cover: ROUTEFILE+'start.jpg',
                // waterMark:ROUTEROOT+"ycedu/images/liveWaterIcon.png|BL|0.08|0.8"
            });
        }, //操作成功后的操作！msg是后台传过来的值
        error: function(ex) {
            // $('.dycnovideo').css('display', 'block');
            alert('错误！');
        }
    });
    new Vue({
        el:"#ferelevant",
        data:{
            relevantArr:[]
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            addCourseRoot: function addCourseRoot(newsId) {
                return ROOT + "coursedetail.html?courseId=" + newsId;
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getrelevant();
            })
        },
        methods:{
            getrelevant:function () {
                var _this=this;
                this.$http.post(SERVERROOTDATA+"Course.ashx?action=getOrganRecommendCourse",
                    {
                        organId:TempOrgId,
                        pageIndex:1,
                        pageSize:10
                    }
                    ,{emulateJSON:true})
                    .then(function (res) {
                        // console.log(res);
                        _this.relevantArr=res.body.rows;
                    }).then(function () {
                    var swiper = new Swiper('.swiper-container', {
                        nextButton: '.swiper-button-next',
                        prevButton: '.swiper-button-prev',
                        slidesPerView: 4,
                        spaceBetween: 4
                    });
                })
            }
        }
    })
}
// 影视详情页-留言模块方法
function moviedetail_liuyan() {
    $('#femoviedetail').on('click','a',function () {
        $('.fepersonsay-right .content').removeAttr('id');
        $('.fepersonsay-right a').removeAttr('id');
        $('.fereply a').removeAttr('id');
        $('.fereply>div').removeAttr('id');
        $('.emoji_container').remove();
        $(this).attr('id','pface');
        $(this).parent().prev().attr('id','pcontent');
        $("#pcontent").emoji({
            button: "#pface",
            showTab: false,
//        animation: 'slide',
            icons: [{
                name: "QQ表情",
                path: "images/temp/face/qq/",
                maxNum: 91,
                excludeNums: [41, 45, 54],
                file: ".gif"
            }]
        });
    })
    var timer=null;
    $('.content').focus(function () {
        timer=setInterval(function () {
            var l=$('.content img').length;
            var t =  $(this).text().length;
            if(600-5*l-t>=0){
                $('.fepersonsay-right .febox b').html(600-5*l-t);
            }else{

            }
        }.bind(this),1000)
    })
    $('.content').blur(function () {
        clearInterval(timer);
    })
//    $('.fereply').slideUp();
    $('.fediscuss .fediscuss-right').on('click','.febox b',function () {
//        console.log('哈哈')
        if($(this).parent().parent().next().css('display')!='none'){
            $('.fereply').slideUp(500);
        }else{
            $('.fereply').slideUp(500);
            $(this).parent().parent().next().slideDown(500);
        }
    })
    $('.fediscuss-right .febox').on('click','h3',function () {
        var num=$(this).text().replace(/[^0-9]/ig,"");
        console.log(num);
        var span=$(this).find('span');
        var str=span.text();
//        console.log(a);
        var dom=$(this).parent().parent().parent().next();
        if(num>0){
            if(str.indexOf("查看")>-1){

                if(dom!='undefined'){
                    dom.slideDown(500);
                    span.html('收起回复');
                }
            }else{
                dom.slideUp(500);
                span.html('查看回复');
            }
        }else{

        }
    })
}
// 社区详情页
//    1、热门小组
function hotclass() {
    new Vue({
        el:"#fehotclass",
        data:{
            hotclassArr:[]
        },
        filters: {
            addRoot: function addRoot(newsId) {
                return ROOT + "communitygroup.html?newsId=" + newsId;
            },
            addRootFile: function addRootFile(img) {
                return ROOTFILE + img;
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getHotclass();
            })
        },
        methods:{
            getHotclass:function () {
                var _this=this;
                this.$http.get(ROOTDATA+"hotclass.json",{emulateJSON:true})
                    .then(function (res) {
                        // console.log(res);
                        _this.hotclassArr=res.body;
                    })
            }
        }
    })
}
//    2、最新帖子
function community() {
    new Vue({
        el:"#fecommunity",
        data:{
            communityListArr:[],
            hotPassArr:[]
        },
        filters: {
            addRoot: function addRoot(newsId) {
                return ROOT + "communitydetail.html?newsId=" + newsId;
            },
            addRootFile: function addRootFile(img) {
                return ROOTFILE + img;
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getNewsList();
                _this.getHotPast();
            })
        },
        methods:{
            getNewsList:function () {
                var _this=this;
                this.$http.get(ROOTDATA+"newslist.json",{emulateJSON:true})
                    .then(function (res) {
                        // console.log(res);
                        if(res.body.length < 1) {
                            return false;
                        } else {
                            if(typeof res.body == "string") {
                                _this.communityListArr =_this.communityListArr.concat(JSON.parse(res.body)[0].community);
                            } else {
                                _this.communityListArr=_this.communityListArr.concat(res.body[0].community)
                            }
                        }
                    }).then(function () {
                        _this.communityListArr.forEach(function(item, index) {
                            Vue.set(item, "ptx", ROOTFILE + item.ptx);
                        })
                })
            },
            communityloadMore:function () {
                this.getNewsList();
            },
            getHotPast:function () {
                var _this=this;
                this.$http.get(ROOTDATA+"newslist.json",{emulateJSON:true})
                    .then(function (res) {
                        // console.log(res);
                        if(res.body.length < 1) {
                            return false;
                        } else {
                            if(typeof res.body == "string") {
                                _this.hotPassArr = JSON.parse(res.body)[0].hotpass;
                            } else {
                                _this.hotPassArr=res.body[0].hotpass;
                            }
                        }
                    })
            }
        }
    })
}
// 名师风采在线
function teacherstyle() {
    new Vue({
        el:"#feteacherstyle",
        data:{
            selectNav:[],//查询列表
            teacherListArr:[],//左侧老师列表
            studioArr:[],//右侧工作室
            resourceRankingArr:[],//右侧资源排行数组
            position:[-96,-110,-124,-138,-152,-167,-182,-196,-212,-226],//排行图标偏移量
            crown:[-584,-610,-637], //皇冠图标偏移量
            current:1,
            showItem: 6,
            allpage: 0, //总页码
            nodata:false
        },
        filters: {
            addRoot: function addRoot(newsId) {
                return ROOT + "teacherstudio.html?teachingStudioId=" + newsId;
            },
            addTeacherRoot: function addTeacherRoot(newsId) {
                return ROOT + "teacherindex.html?teacherId=" + newsId;
            },
            addArticleRoot: function addArticleRoot(id) {
                return ROOT + "articledetail.html?articleId=" + id;
            },
            downloadRoot: function downloadRoot(url) {
                return SERVERROOTFILE + url;
            },
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            articletype:function articletype(type) {
                switch (type){
                    case "1":
                        return "发表";
                        break;
                    case "2":
                        return "转发";
                        break;
                    case "3":
                        return "转载";
                        break;
                }
            },
            getTime:function getTime(date) {
                return $.getCurrentTime(date,3);
            }
        },
        computed: {
            pages: function() {
                var pag = [];
                if(this.current < this.showItem) { //如果当前的激活的项 小于要显示的条数
                    //总页数和要显示的条数那个大就显示多少条
                    var i = Math.min(this.showItem, this.allpage);
                    while(i) {
                        pag.unshift(i--);
                    }
                } else { //当前页数大于显示页数了
                    var middle = this.current - Math.floor(this.showItem / 2), //从哪里开始
                        i = this.showItem;
                    if(middle > (this.allpage - this.showItem)) {
                        middle = (this.allpage - this.showItem) + 1
                    }
                    while(i--) {
                        pag.push(middle++);
                    }
                }
                return pag
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getSelectNav();
                _this.getTeacherList('','','',_this.current);
                _this.studioList();
                _this.resource();
            })
        },
        methods:{
            getSelectNav:function () {
                var _this=this;
                this.$http.post(SERVERROOTDATA+"TeachingStudio.ashx?action=getCityPeriodSubject",
                    {
                        provinceId:1
                    }
                    ,{emulateJSON:true})
                    .then(function (res) {
                        _this.selectNav=res.body[0];
                }).then(function () {
                    _this.navBindClick();
                })
            },
            getTeacherList:function (cityId,educationalLevelId,subjectId,pageIndex) {
                var _this=this;
                this.$http.post(SERVERROOTDATA+"TeachingStudio.ashx?action=getTeachingStudio",
                    {
                        cityId:cityId,
                        educationalLevelId:educationalLevelId,
                        subjectId:subjectId,
                        pageIndex:pageIndex,
                        pageSize:12
                    }
                    ,{emulateJSON:true})
                    .then(function (res) {
                        if(res.body.rows.length<1){
                            _this.nodata=true;
                            _this.teacherListArr=res.body.rows;
                            _this.allpage=res.body.totalPageCount;
                        }else{
                            _this.teacherListArr=res.body.rows;
                            _this.allpage=res.body.totalPageCount;
                            _this.nodata=false;
                        }

                    })
            },
            studioList:function () {
                var _this=this;
                this.$http.post(SERVERROOTDATA+"TeachingStudio.ashx?action=getStudioDynamic",
                    {
                        teachingStudioId:'',
                        pageIndex:1,
                        pageSize:5
                    }
                    ,{emulateJSON:true})
                    .then(function (res) {
                        _this.studioArr=res.body.rows;
                        console.log(_this.studioArr);
                    })
            },
            resource:function () {
                var _this=this;
                this.$http.post(SERVERROOTDATA+"TeachingStudio.ashx?action=getStudioResourceRanking",
                    {
                        pageIndex:1,
                        pageSize:10
                    }
                    ,{emulateJSON:true})
                    .then(function (res) {
                        if(res.body.rows==undefined){
                            return false
                        }else{
                            _this.resourceRankingArr=res.body.rows;
                            console.log( _this.resourceRankingArr)
                        }
                    }).then(function () {
                        _this.resourceRankingArr.forEach(function(item, index) {
                            Vue.set(item, "iconPath", SERVERROOTFILE + item.iconPath);
                        })
                })
            },
            navBindClick:function () {
                var _this=this;
                $('.feselectnav').on('click','li',function () {
                    var val=$(this).html();
                    $(this).parent().next().val($(this).data('id'));
                    $(this).parent().prev().html(val);
                    var navArr=$('.feselectnav .febox>input');
                    var attr=navArr[0].value;//获取地区id
                    var period=navArr[1].value;//获取学段id
                    var subjeck=navArr[2].value;//获取学科id
                    _this.current=1;
                    _this.getTeacherList(attr,period,subjeck,_this.current);
                })
                $('.feselectnav').on('click','.febox',function () {
                    var $ul=$(this).find('ul');
                    if($ul.css('display')=='none'){
                        $(this).find('ul').slideDown(500);
                        $(this).parent().siblings().find('ul').slideUp(500);
                    }else{
                        $(this).find('ul').slideUp(500);
                    }
                })
            },
            goto: function(index) { //枫叶处理
                if(index == this.current) return;
                if(index > this.allpage) {
                    this.current = this.current - 2;
                    layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
                    return false;
                }
                this.current = index;
                var navArr=$('.feselectnav .febox>input');
                var attr=navArr[0].value;//获取地区id
                var period=navArr[1].value;//获取学段id
                var subjeck=navArr[2].value;//获取学科id
                this.getTeacherList(attr,period,subjeck,index);
            }
        }
    })
}

/*
 * autor：Jabo
 * brief：add side nav
 * Time：2017/08/11
 */
function addCourseAsideNav(){
	new Vue({
		el: '#jcourseNavApp',
		data: {
			leftNavArr: [],
			leftNavLoadOnce: true,
			isShowFlag: false,
			secondFlag: false,
			secondNavArr: [],
			inSecondBox: false,
			inLeftBox: false,
			parentNavId: '',
			gradeNavId: ''
		},
		filters: {
			addFirNavParent: function addFirNavParent(id) {
				return ROOT + "courselist.html?period=" + id + "&grade=&subject=";
			},
			addFirNav: function addFirNav(pid, id) {
				return ROOT + "courselist.html?period=" + pid + "&grade=&subject=" + id;
			},
			addSecNavGrade: function addSecNavGrade(id, pid) {
				return ROOT + "courselist.html?period=" + pid + "&grade=" + id + "&subject=";
			},
			addSecNav: function addSecNav(id, pid, gid) {
				return ROOT + "courselist.html?period=" + pid + "&grade=" + gid + "&subject=" + id;
			}
		},
		mounted: function mounted() {
			//1.0ready --> 2.0
			this.$nextTick(function () {
				this.getInitData();
			});
		},
		methods: {
			getInitData: function getInitData() {
				var _this = this;
				this.$http.post(SERVERROOTDATA + "Course.ashx?action=getPeriodSubject", {}, {
					emulateJSON: true
				}).then(function (res) {
					if (res.body.length < 1) {
						return false;
					} else {
						if (typeof res.body == "string") {
							_this.leftNavArr = JSON.parse(res.body);
						} else {
							_this.leftNavArr = res.body;
						}
					}
				});
			},
			mousechangeShow: function mousechangeShow(id) {
				//first left nav change show
				var _this = this;
				this.secondFlag = true;
				this.inLeftBox = true;
				this.parentNavId = id;
				this.showSecondNav(id);
			},
			closeShow: function closeShow() {
				//first leave close
				if (!this.inSecondBox) {
					this.secondFlag = false;
				}
			},
			openShow: function openShow() {
				//open second nav
				this.inLeftBox = false;
				this.secondFlag = true;
				this.inSecondBox = true;
			},
			secondCloseShow: function secondCloseShow() {
				//leave second box
				this.inSecondBox = false;
				if (!this.inLeftBox) {
					this.secondFlag = false;
				}
			},
			showSecondNav: function showSecondNav(id) {
				//get second nav data
				var _this = this;
				this.$http.post(SERVERROOTDATA + "Course.ashx?action=getGradeSubject", {
                    educationalLevelId: id
				},{
                    emulateJSON: true
                }).then(function (res) {
					if (res.body.length < 1) {
						return false;
					}
					_this.secondNavArr = res.body;
				});
			},
			getGrade: function getGrade(id) {
				this.gradeNavId = id;
			},
			toggleLeftShow: function toggleLeftShow() {
				if (this.isShowFlag) {
					this.isShowFlag = false;
					$(".fe-left-nav-inner").css("height", "40px");
				} else {
					this.isShowFlag = true;
					$(".fe-left-nav-inner").css("height", "430px");
				}
			}
		}
	});
}

// 课程中心1级
function coursecenter() {
    new Vue({
        el:"#fecoursecenter",
        data:{
            courselist:[],//左侧课程列表
            hotcourse:[],//热门课程
            hotminicourse:[],//微课程
            rankingPosition:[-106,-139,-173,-208,-244,-280]//排行图标偏移量
        },
        filters: {
            addRoot: function addRoot(newsId) {
                return ROOT + "coursedetail.html?courseId=" + newsId;
            },
            addRootMore: function addRootMore(newsId) {
                return ROOT + "courselist.html?newsId=" + newsId;
            },
            addSchoolRoot: function addSchoolRoot(newsId) {
                return ROOT + "schoolindex.html?organId=" + newsId;
            },
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            addMoneySign:function addMoneySign(obj) {
                return obj=="0.00"? "免费":"¥"+obj;
                // return "¥"+obj;
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getCourseList();
                _this.getHotCourse('1');//默认为免费
                _this.getHotMiniCourse();
                _this.toggleRankingList();
            })
        },
        methods: {
            getCourseList: function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Course.ashx?action=getPeriodSubjectCourse",
                    {
                        pageIndex:1,
                        pageSize:6
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.courselist = res.body;
                    }).then(function () {
                    addFirstChildClass();
                    _this.toggleCourse();
                }).then(function () {
                   $('.fecoursemodule .fetitle').on('click','a',function () {
                       var educationalLevelId=$(this).parent().data('id');
                       var subjectId=$(this).parent().next().find('.active').data('type');
                       console.log(educationalLevelId);
                       console.log(subjectId);
                       window.location.href = ROOT + "courselist.html?period=" + educationalLevelId+"&subject="+subjectId;
                   })
                })
            },
            getHotMiniCourse:function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Course.ashx?action=getMicroLecturePurchaseRanking",
                    {
                        organId:TempOrgId,
                        periodType:'week',
                        pageIndex:1,
                        pageSize:6
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.hotminicourse = res.body.rows;
                        // console.log(_this.hotcourse);
                    }).then(function () {
                    // _this.toggleMiniRankingList();
                })
            },
            getHotCourse:function (isfree) {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Course.ashx?action=getCoursePurchaseRanking",
                    {
                        organId:TempOrgId,
                        periodType:'week',
                        pageIndex:1,
                        isFree:isfree,
                        pageSize:6
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.hotcourse = res.body.rows;
                        // console.log(_this.hotcourse);
                    }).then(function () {

                })
            },
            toggleCourse:function () {
                var _this = this;
                $('.fecoursenav').on('click','li a',function () {
                    $(this).parent().siblings().find('a').removeClass('active');
                    $(this).addClass('active');
                    //获取学段
                    var period=$(this).parent().parent().parent().prev().data('id');
                    //获取科目
                    var subject=$(this).data('type');
                    //获取内容节点
                    var dom=$(this).parent().parent().parent().next();
                    _this.$http.post(SERVERROOTDATA + "Course.ashx?action=getCourseByPhaseAndSubject",
                        {
                            educationalLevelId:period,
                            subjectId:subject,
                            pageIndex:1,
                            pageSize:6
                        }
                        ,{emulateJSON: true})
                        .then(function (res) {
                            var obj = res.body.rows;
                            _this.drawDate(obj,dom);
                        })
                })
            },
            // 绘制模板
            drawDate:function (obj,dom) {
                dom.html('');
                for(var i=0;i<obj.length;i++){
                    var $container=$('<div class="span4"></div>');
                    var $panel=$('<div class="fepanel"></div>');
                    var $img=$('<img src="'+ SERVERROOTFILE + obj[i].iconPath +'">');
                    var $feimage=$('<a class="feimage"></a>').attr('href',ROOT + "coursedetail.html?courseId="+obj[i].courseId).append($img);
                    var $febox=$('<div class="febox"></div>');
                    var price='免费';
                    var $div=$('<div></div>');
                    if(obj[i].price !='0.00'){
                        price='¥'+obj[i].price;
                    }
                    if(obj[i].isFree=='收费'){
                        $div.append('<span class="femoney">'+ price +'</span>');
                    }else{
                        $div.append('<span>'+ price +'</span>');
                    }
                    $div.append('<b>'+obj[i].teacherName +'</b>');
                    $div.append('<a href="'+ ROOT +'schoolindex.html?organId='+obj[i].organId+'">'+ obj[i].organName+'</a>');
                    $febox.append('<h2>'+ obj[i].courseName +'</h2>').append($div);
                    $panel.append($feimage).append($febox);
                    $container.append($panel);
                    dom.append($container);
                }
            },
            clickMore:function () {
                console.log(22)
                var educationalLevelId=$(this).parent().data('id');
                var subjectId=$(this).parent().next().find('a.active').data('id');
                console.log(educationalLevelId);
                console.log(subjectId);
            },
            toggleRankingList:function () {
                var _this=this;
                $('.fehotcourse').on('click','.fetabs a',function () {
                    $(this).siblings().removeClass('active');
                    $(this).addClass('active');
                    var isfree=$(this).data('id');
                    _this.getHotCourse(isfree);
                })
            },
            // toggleMiniRankingList:function () {
            //     $('.fehotminicourse').on('click','.fetabs a',function () {
            //         $(this).siblings().removeClass('active');
            //         $(this).addClass('active');
            //         console.log(22);
            //         // console.log(111);
            //     })
            // }
        }
    })
}
function addFirstChildClass() {
    $('.fecoursenav li:first-child a').addClass('active');
}
// 课程2级界面
function coursedetail(obj, recordType) {
    new Vue({
        el:"#fecoursedetail",
        data:{
            current: 1, //当前页
            showItem: 6,//显示条数
            allpage: '', //总页码
            cityArr:[],//市
            districtArr:[],//区
            courselist:[],
            allnav:[],//全部课程选择栏
            periodArr:[],//学段
            gradeArr:[],//年级
            subjectArr:[],//学科
            hotcourseArr:[],//右侧热门教程
            recommendedcourses:[],//推荐课程
            rankingPosition:[-106,-139,-173,-208,-244,-280],//排名图标坐标
            //筛选条件初始化
            educationalLevelId:obj.period,
            gradeId:obj.grade,
            subjectId:obj.subject,
            cityId:'',
            orderName:'colligate',
            ascType:'asc'
        },
        filters: {
            addRoot: function addRoot(newsId) {
                if(recordType== 1 || recordType=="1"){
                	return ROOT + "cloundcoursedetail.html?courseId=" + newsId;
                }else{
                	return ROOT + "coursedetail.html?courseId=" + newsId;
                }
            },
            addRootOld: function addRoot(newsId) {
            	return ROOT + "coursedetail.html?courseId=" + newsId;
            },
            addSchoolRoot:function addSchoolRoot(newsId) {
                return ROOT + "schoolindex.html?organId=" + newsId;
            },
            addRootFile: function addRootFile(img) {
                    return SERVERROOTFILE + img;
            },
            addMoneySign:function addMoneySign(obj) {
                return "¥"+obj;
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.adclick();
                _this.getAreaList();
                _this.getSelectlist();
                _this.bindAreaClick();//绑定区域函数
                _this.getCourseList(obj.period,obj.grade,obj.subject,_this.current,_this.orderName,_this.ascType);
                _this.getHotCourse('1');//默认为免费
                _this.getRecommendedCourses();
                _this.addBindSort();
                _this.getCourseByName();
                _this.toggleRankingList();
            })
        },
        computed: {
            pages: function() {
                var pag = [];
                if(this.current < this.showItem) { //如果当前的激活的项 小于要显示的条数
                    //总页数和要显示的条数那个大就显示多少条
                    var i = Math.min(this.showItem, this.allpage);
                    while(i) {
                        pag.unshift(i--);
                    }
                } else { //当前页数大于显示页数了
                    var middle = this.current - Math.floor(this.showItem / 2), //从哪里开始
                        i = this.showItem;
                    if(middle > (this.allpage - this.showItem)) {
                        middle = (this.allpage - this.showItem) + 1
                    }
                    while(i--) {
                        pag.push(middle++);
                    }
                }
                return pag
            }
        },
        methods: {
            // 广告关闭
            adclick:function () {
                $('.fecourselistad').on('click','span',function () {
                    $('.fecourselistad').slideUp(300);
                })
            },
            getAreaList:function () {
                var _this = this;
                // 获取市
                this.$http.post(SERVERROOTDATA+"City.ashx?action=getCity",
                    {
                        provinceId:1
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.cityArr=res.body;
                    }).then(function () {
                        // 获取区
                    $('#city').on('change',function () {
                        var city=$('#city option:selected').data('id');
                        _this.$http.post(SERVERROOTDATA+"District.ashx?action=getDistrict",
                            {
                                cityId:city
                            }
                            ,{emulateJSON: true})
                            .then(function (res) {
                                _this.districtArr=res.body;
                            })
                    })
                })

            },
            getgrade:function (p) {//绑定年级 点击按钮
                var _this=this;
                _this.gradeId=p;
                _this.subjectId='';
                _this.$http.post(SERVERROOTDATA + "Subject.ashx?action=getSubject",
                    {
                        organId:TempOrgId,
                        educationalLevelId:_this.educationalLevelId,
                        gradeId:p
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        console.log('哈哈');
                        _this.subjectArr = res.body;
                    })
                _this.current=1;
                _this.getCourseList(_this.educationalLevelId,_this.gradeId,_this.subjectId,_this.current,_this.orderName,_this.ascType);
            },
            getsubject:function (p) {//绑定学科 点击按钮
                var _this=this;
                _this.subjectId=p;
                _this.current=1;
                _this.getCourseList(_this.educationalLevelId,_this.gradeId,_this.subjectId,_this.current,_this.orderName,_this.ascType);
            },
            getSelectlist:function () {
                var _this = this;
                // 学段
                this.$http.post(SERVERROOTDATA + "EducationalLevel.ashx?action=getEducationalLevel",
                    {
                        organId:TempOrgId
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.periodArr = res.body;
                    }).then(function () {
                            var doms=$('.feperio li');
                            for(var i=0;i<doms.length;i++){
                                if($(doms[i]).data('id')==obj.period){
                                    $(doms[i]).addClass('active');
                                    $('.fetitle .d1').html($(doms[i]).html());
                                }
                            }
                         }).then(function () {
                            $('.feperio').on('click','li',function () {
                                _this.educationalLevelId=$(this).data('id');
                                _this.gradeId='';
                                _this.subjectId='';
                                $('.femodule li').removeClass('active');
                                $(this).addClass('active');
                                // 已选项显示栏操作
                                $('.fetitle .d1').html($(this).html());
                                $('.fetitle .d2').html('');
                                $('.fetitle .d3').html('');
                                _this.$http.post(SERVERROOTDATA + "Grade.ashx?action=getGrade",
                                    {
                                        organId:TempOrgId,
                                        educationalLevelId:$(this).data('id')
                                    }
                                    ,{emulateJSON: true})
                                    .then(function (res) {
                                        _this.gradeArr = res.body;
                                    })
                                // 调用列表函数
                                _this.current=1;
                                _this.getCourseList(_this.educationalLevelId,_this.gradeId,_this.subjectId,_this.current,_this.orderName,_this.ascType);
                            })
                })
                // 年级
                this.$http.post(SERVERROOTDATA + "Grade.ashx?action=getGrade",
                    {
                        organId:TempOrgId,
                        educationalLevelId:obj.period
                    },
                    {emulateJSON: true})
                    .then(function (res) {
                        _this.gradeArr = res.body;
                    }).then(function () {
                            var doms=$('.fegrade li');
                            for(var i=0;i<doms.length;i++){
                                if($(doms[i]).data('id')==obj.grade){
                                    $(doms[i]).addClass('active');
                                    $('.fetitle .d2').html($(doms[i]).html());
                                }
                            }
                        }).then(function () {
                            $('.fegrade').on('click','li',function () {
                                // _this.gradeId=$(this).data('id');
                                // _this.subjectId='';
                                $('.fesubject li').removeClass('active');
                                $(this).siblings().removeClass('active');
                                $(this).addClass('active');
                                // 已选项显示栏操作
                                $('.fetitle .d2').html($(this).html());
                                $('.fetitle .d3').html('');
                                // _this.$http.post(SERVERROOTDATA + "Subject.ashx?action=getSubject",
                                //     {
                                //         organId:TempOrgId,
                                //         educationalLevelId:_this.educationalLevelId,
                                //         gradeId:$(this).data('id')
                                //     }
                                //     ,{emulateJSON: true})
                                //     .then(function (res) {
                                //         console.log('哈哈');
                                //         _this.subjectArr = res.body;
                                //     })
                                // _this.current=1;
                                // _this.getCourseList(_this.educationalLevelId,_this.gradeId,_this.subjectId,_this.current,_this.orderName,_this.ascType);
                            })
                })
                // 学科
                this.$http.post(SERVERROOTDATA + "Subject.ashx?action=getSubject",
                    {
                        organId:TempOrgId,
                        educationalLevelId:obj.period,
                        gradeId:obj.grade
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.subjectArr = res.body;
                    }).then(function () {
                        var doms=$('.fesubject li');
                        // console.log(obj.grade);
                        for(var i=0;i<doms.length;i++){
                            if($(doms[i]).data('id')==obj.subject){
                                $(doms[i]).addClass('active');
                                $('.fetitle .d3').html($(doms[i]).html());
                            }
                        }
                    }).then(function () {
                    $('.fesubject').on('click','li',function () {
                        // _this.subjectId=$(this).data('id');
                        $(this).siblings().removeClass('active');
                        $(this).addClass('active');
                        $('.fetitle .d3').html($(this).html());
                        // _this.current=1;
                        // _this.getCourseList(_this.educationalLevelId,_this.gradeId,_this.subjectId,_this.current,_this.orderName,_this.ascType);
                    })
                })
            },
            // 获取列表
            getCourseList: function (educationalLevelId,gradeId,subjectId,pageIndex,orderName,ascType) {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Course.ashx?action=getCourseListByQuery",
                    {
                        organId:TempOrgId,
                        educationalLevelId:educationalLevelId,
                        gradeId:gradeId,
                        subjectId:subjectId,
                        pageIndex:pageIndex,
                        orderName:orderName,
                        ascType:ascType,
                        pageSize:12,
                        recordType:recordType
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.courselist = res.body.rows;
                        _this.allpage = res.body.totalPageCount;
                    }).then(function () {

                })
            },
            // 区域按钮
            bindAreaClick:function () {
              $('.femodule').on('click','b',function () {
                  $(this).addClass('active');
                  $('.fetitle .d4').html('');
                  $('.fetitle .d5').html('不限');
                  $('#city option:first-child').prop('selected',true);
                  $('#district option:first-child').prop('selected',true);
              });
                $('#city').on('change',function () {
                    $('.femodule b').removeClass('active');
                    var city=$(this).val();
                    $('.fetitle .d5').html('');
                    $('.fetitle .d4').html(city);
                });
                $('#district').on('change',function () {
                    $('.femodule b').removeClass('active');
                    var district=$(this).val();
                    $('.fetitle .d5').html(district);
                });
            },
            // 分类按钮绑定
            addBindSort:function () {
                var _this=this;
                $('.fecoursedetailnav .fesortall').addClass('active');
                $('.fecoursedetailnav .fesortlist').addClass('active');
                // 列表排序
                $('.fecoursedetailnav').on('click','.fesortlist',function () {
                    $(this).addClass('active');
                    $('.fesortgrid').removeClass('active');
                    var dom=$(this).parent().parent().next();
                    if(dom.hasClass('fecoursedetailcontent-list')){

                    }else{
                        dom.removeClass('fecoursedetailcontent-grid');
                        dom.addClass('fecoursedetailcontent-list')
                    }
                })
                // 网格排序
                $('.fecoursedetailnav').on('click','.fesortgrid',function () {
                    $(this).addClass('active');
                    $('.fesortlist').removeClass('active');
                    var dom=$(this).parent().parent().next();
                    if(dom.hasClass('fecoursedetailcontent-grid')){

                    }else{
                        dom.removeClass('fecoursedetailcontent-list');
                        dom.addClass('fecoursedetailcontent-grid')
                    }
                })
                // 综合排序
                $('.fecoursedetailnav').on('click','.fesortall',function () {
                    $('.fecoursedetailnav .fesortprice').removeClass('active');
                    $('.fecoursedetailnav .fesortrenqi').removeClass('active');
                    $(this).addClass('active');
                    _this.current=1;
                    _this.orderName='colligate';
                    _this.getCourseList(_this.educationalLevelId,_this.gradeId,_this.subjectId,_this.current,_this.orderName,_this.ascType);
                })
                // 价格排序
                $('.fecoursedetailnav').on('click','.fesortprice',function () {
                    $('.fecoursedetailnav .fesortall').removeClass('active');
                    $('.fecoursedetailnav .fesortrenqi').removeClass('active');
                    $(this).addClass('active');
                    var dom=$(this).children('i');
                    if(dom.hasClass('uk-icon-long-arrow-down')){
                        dom.removeClass();
                        dom.addClass('uk-icon-long-arrow-up');
                        //按价格升序
                        _this.current=1;
                        _this.orderName='price';
                        _this.ascType='asc';
                        _this.getCourseList(_this.educationalLevelId,_this.gradeId,_this.subjectId,_this.current,_this.orderName,_this.ascType);
                    }else{
                        dom.removeClass();
                        dom.addClass('uk-icon-long-arrow-down');
                        //按价格降序
                        _this.current=1;
                        _this.orderName='price';
                        _this.ascType='desc';
                        _this.getCourseList(_this.educationalLevelId,_this.gradeId,_this.subjectId,_this.current,_this.orderName,_this.ascType);
                    }
                })
                // 按人气排序
                $('.fecoursedetailnav').on('click','.fesortrenqi',function () {
                    $('.fecoursedetailnav .fesortall').removeClass('active');
                    $('.fecoursedetailnav .fesortprice').removeClass('active');
                    $(this).addClass('active');
                    var dom=$(this).children('i');
                    if(dom.hasClass('uk-icon-long-arrow-down')){
                        dom.removeClass();
                        dom.addClass('uk-icon-long-arrow-up');
                        //按人气升序
                        _this.current=1;
                        _this.orderName='clickCount';
                        _this.ascType='asc';
                        _this.getCourseList(_this.educationalLevelId,_this.gradeId,_this.subjectId,_this.current,_this.orderName,_this.ascType);
                    }else{
                        dom.removeClass();
                        dom.addClass('uk-icon-long-arrow-down');
                        //按人气降序
                        _this.current=1;
                        _this.orderName='clickCount';
                        _this.ascType='desc';
                        _this.getCourseList(_this.educationalLevelId,_this.gradeId,_this.subjectId,_this.current,_this.orderName,_this.ascType);
                    }
                })
            },
            // 清除全部
            clearAll:function () {
                $('.fetitle .d1').html('');
                $('.fetitle .d2').html('');
                $('.fetitle .d3').html('');
                $('.fetitle .d4').html('');
                $('.fetitle .d5').html('');
                $('.femodule li').removeClass('active');
                $('.femodule b').removeClass('active');
                $('#city option:first-child').prop('selected',true);
                $('#district option:first-child').prop('selected',true);
            },
            // 热门教程榜
            getHotCourse:function (isFree) {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Course.ashx?action=getCoursePurchaseRanking",
                    {
                        organId:TempOrgId,
                        periodType:'week',
                        pageIndex:1,
                        pageSize:6,
                        isFree:isFree
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.hotcourseArr = res.body.rows;
                    }).then(function () {
                    $('.fehotcoursemodule ul li:first-child h1').addClass('active');
                    $('.fehotcoursemodule ul li:first-child .fepanel').slideDown();
                    $('.fehotcoursemodule ul li').on('click','h1',function () {
                        if($(this).hasClass('active')){
                            // $(this).parent().siblings().find('.fepanel').slideUp(300);
                        }else{
                            $(this).parent().siblings().find('h1').removeClass('active');
                            $(this).parent().siblings().find('.fepanel').slideUp(300);
                            $(this).next().slideDown(300);
                            $(this).addClass('active');
                        }
                    })
                })
            },
            // 热门教程榜 tabs切换
            toggleRankingList:function () {
                var _this=this;
                $('.fehotcoursemodule').on('click','.fetabs a',function () {
                    $(this).siblings().removeClass('active');
                    $(this).addClass('active');
                    var isfree=$(this).data('id');
                    _this.getHotCourse(isfree);
                })
            },
            // 推荐课程
            getRecommendedCourses:function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Course.ashx?action=getHotRecommendCourse",
                    {
                        organId:TempOrgId,
                        pageIndex:1,
                        pageSize:2,
                        recordType:recordType
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.recommendedcourses = res.body.rows;
                    })
            },
            // 按名字搜索
            getCourseByName:function () {
                var _this=this;
                $('.fecoursedetailnav .fesousuo').on('click','button',function () {
                    var val=$(this).prev().val();
                    _this.$http.post(SERVERROOTDATA + "Course.ashx?action=getCourseByName",
                        {
                            organId:TempOrgId,
                            pageIndex:1,
                            pageSize:10,
                            name:val
                        }
                        ,{emulateJSON: true})
                        .then(function (res) {
                            _this.courselist = res.body.rows;
                            _this.allpage = res.body.totalPageCount;
                        })
                })


            },
            goto: function(index) { //枫叶处理
                var _this=this;
                if(index == this.current) return;
                if(index > this.allpage) {
                    this.current = this.current - 2;
                    layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
                    return false;
                }
                this.current = index;
                _this.getCourseList(_this.educationalLevelId,_this.gradeId,_this.subjectId,_this.current,_this.orderName,_this.ascType);
            }
        }
    })
}
// 名师工作室
function teacherstudio(teachingStudioId) {
    new Vue({
        el:"#feteacherstudio",
        data:{
            studio:[],//工作室
            studioinformation:[],//工作室资讯
            notice:[],//公告
            teacherclassroomnav:[],//名师课堂导航
            teacherclassroom:[],//，名师课堂
            news:[],//最新动态
            studiomember:[],//工作室成员
            courseresourcenav:[],//课件资源导航
            courseresource:[],//课件资源
            message:[],//留言
            courseTypeId:"12",//名师课堂类型
            membercurrent:1,
            courseWareTypeId:"",//课程资源类型
            studioinformationnodata:false,
            noticenodata:false,
            teacherclassroomnodata:false,
            newsnodata:false,
            studiomembernodate:false,
            courseresourcenodata:false
        },
        filters: {
            addRoot: function addRoot(newsId) {
                return ROOT + "teacherindex.html?teacherId=" + newsId;
            },
            addTeacherRoot: function addTeacherRoot(newsId) {
                return ROOT + "teacherindex.html?teacherId=" + newsId;
            },
            addArticleRoot: function addArticleRoot(id) {
                return ROOT + "articledetail.html?articleId=" + id;
            },
            addRootSchool: function addRootSchool(newsId) {
                return ROOT + "schoolindex.html?organId=" + newsId;
            },
            addRootNews: function addRootNews(newsId) {
                return ROOT + "newsdetail.html?newsId=" + newsId;
            },
            addRootCourse: function addRootCourse(newsId) {
                return ROOT + "coursedetail.html?courseId=" + newsId;
            },
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            download: function download(url) {
                return SERVERROOTFILE + url;
            },
            getResourceType:function getResourceType(type) {
                switch (type){
                    case "courseware":
                        return "课件";
                        break;
                    case "ppt":
                        return "PPT";
                        break;
                    case "excel":
                        return "Excel";
                        break;
                    case "pdf":
                        return "PDF";
                        break;
                    case "txt":
                        return "文本";
                        break;
                    case "article":
                        return "文章";
                        break;
                    default:
                        break;
                }
            },
            getResourceTypeClass:function getResourceTypeClass(type) {
                switch (type){
                    case "courseware":
                        return "doc";
                        break;
                    case "article":
                        return "article";
                        break;
                    default:
                        break;
                }
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getStudio();
                _this.getStudioInformation();
                _this.getNotice();
                _this.getTeacherClassroomNav();
                _this.getTeacherClassroom(_this.courseTypeId);
                _this.getNews();
                _this.getStudioMember();
                _this.getCourseResourceNav();
                _this.getCourseResource(_this.courseWareTypeId);
                _this.getMessage();
            })
        },
        methods: {
            // 工作室
            getStudio:function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "TeachingStudio.ashx?action=getTeachingStudioById",
                    {
                        organId:TempOrgId,
                        teachingStudioId:teachingStudioId
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.rows.length<1){
                            return false;
                        }else{
                            _this.studio = res.body.rows[0];
                        }
                    }).then(function () {
                    $('.feteacherdetail .feteacherdetailhead').on('click','button',function () {
                        if($(window).storager({ key: 'feUid' }).readStorage()==undefined){
                            layer.msg('您还未登录,请先登录');
                         }else{
                            var uid= $(window).storager({ key: 'feUid' }).readStorage();
                            console.log(uid);
                            layer.msg('申请已发送，请耐心等候 O(∩_∩)O');
                         }
                    })
                })
            },
            // 工作室资讯
            getStudioInformation: function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "News.ashx?action=getTeachingStudioNews",
                    {
                        organId:TempOrgId,
                        teachingStudioId:teachingStudioId,
                        pageIndex:1,
                        pageSize:8
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.rows.length<1){
                            _this.studioinformationnodata=true;
                            _this.studioinformation = res.body.rows;
                        }else{
                            _this.studioinformation = res.body.rows;
                            _this.studioinformationnodata=false;
                        }
                        $('.festudioinformation>h1>a').attr('href','teacherstudioinfomore.html?teachingStudioId='+teachingStudioId);
                    })
            },
            // 公告
            getNotice: function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Activity.ashx?action=getTeachingStudioNotice",
                    {
                        organId:TempOrgId,
                        teachingStudioId:teachingStudioId,
                        pageIndex:1,
                        pageSize: 8
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.rows.length<1){
                            _this.noticenodata=true;
                            _this.notice = res.body.rows;
                        }else{
                            _this.notice = res.body.rows;
                            _this.noticenodata=false;
                        }
                        $('.fenotice>h1>a').attr('href','teacherstudioinfomore.html?teachingStudioId='+teachingStudioId);
                    }).then(function () {
                        var _this = this;
                        $('.fenotice ul').on('click','li',function () {
                            var id=$(this).find('a').data('id');
                            _this.$http.post(SERVERROOTDATA + "Activity.ashx?action=getActivityDetailById",
                                {
                                    activityId:id
                                }
                                ,{emulateJSON: true})
                                .then(function (res) {
                                    var data=res.body[0];
                                    var html='<div class="fenoticepop"><h1><span>'+ data.publishName +'</span>' +
                                        '<span>'+ data.publishDate +'</span></h1>' +
                                        '<p>'+ data.content +'</p></div>'
                                    layer.open({
                                        type: 1,
                                        title:data.title,
                                        skin: 'layui-layer-rim', //加上边框
                                        area: ['600px', '400px'], //宽高
                                        content: html
                                    });
                                });

                        })
                })
            },
            // 名师课堂导航栏
            getTeacherClassroomNav:function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "CourseType.ashx?action=getStudioCourseType",
                    {
                        organId:TempOrgId,
                        // teachingStudioId:teachingStudioId,
                        pageIndex:1,
                        pageSize:10
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.teacherclassroomnav=res.body.rows;
                    }).then(function () {
                    _this.courseTypeId=$('.feteacherclassroom .fenav li:first-child').data('id');
                    $('.feteacherclassroom .fenav li:first-child').addClass('active');
                    _this.teacherClassroomNavClick('.feteacherclassroom');
                    $('.feteacherclassroom .fenav a').attr('href','teacherstudiocoursemore.html?teachingStudioId='+teachingStudioId);
                })
            },
            // 名师课堂
            getTeacherClassroom: function (courseTypeId) {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Course.ashx?action=getStudioCourseByType",
                    {
                        organId:TempOrgId,
                        teachingStudioId:teachingStudioId,
                        courseTypeId:courseTypeId,
                        pageIndex:1,
                        pageSize:6
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.rows.length<1){
                            _this.teacherclassroomnodata=true;
                        }else {
                            _this.teacherclassroom = res.body.rows;
                            _this.teacherclassroomnodata=false;
                        }
                    })
            },
            // 最新动态
            getNews: function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "TeachingStudio.ashx?action=getSpecifiedStudioDynamic",
                    {
                        teachingStudioId:teachingStudioId,
                        pageIndex:1,
                        pageSize:4
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.rows.length<1){
                            _this.newsnodata=true;
                            _this.news = res.body.rows;
                        }else {
                            _this.newsnodata=false;
                            _this.news = res.body.rows;
                        }

                    })
            },
            // 工作室成员
            getStudioMember: function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "TeachingStudio.ashx?action=getStudioMember",
                    {
                        teachingStudioId:teachingStudioId,
                        pageIndex:_this.membercurrent,
                        pageSize:5
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.rows.length<1){
                            _this.studiomembernodate=true;
                        }else {
                            _this.studiomembernodate=false;
                            _this.studiomember = res.body.rows;
                        }
                    }).then(function () {
                        // 换一批
                    $('.festudiomember .fenav').on('click','span',function () {
                        _this.$http.post(SERVERROOTDATA + "TeachingStudio.ashx?action=getStudioMember",
                            {
                                teachingStudioId:teachingStudioId,
                                pageIndex:++_this.membercurrent,
                                pageSize:5
                            }
                            ,{emulateJSON: true})
                            .then(function (res) {
                                if(res.body.rows.length<1){
                                    layer.msg('没有下一批老师了');
                                    _this.membercurrent--;
                                }else {
                                    _this.studiomembernodate=false;
                                    _this.studiomember = res.body.rows;
                                }
                            })
                    })
                })
            },
            // 课件资源导航栏
            getCourseResourceNav: function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "TeachingStudio.ashx?action=getCourseWareType",
                    {
                        // teachingStudioId:teachingStudioId
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.courseresourcenav = res.body;
                    }).then(function () {
                    _this.courseWareTypeId=$('.fecourseresource .fenav li:first-child').data('id');
                    $('.fecourseresource .fenav li:first-child').addClass('active');
                    _this.courseResourceavClick('.fecourseresource');
                    $('.fecourseresource .fenav a').attr('href','teacherstudioresourcemore.html?teachingStudioId='+teachingStudioId);
                })
            },
            // 课件资源
            getCourseResource: function (courseWareTypeId) {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "TeachingStudio.ashx?action=getCourseWareResources",
                    {
                        teachingStudioId:teachingStudioId,
                        courseWareTypeId:courseWareTypeId,
                        pageIndex:1,
                        pageSize:6
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.rows.length<1){
                            _this.courseresourcenodata=true;
                        }else {
                            _this.courseresource = res.body.rows;
                            _this.courseresourcenodata=false;
                        }
                    })
            },
            // 留言
            getMessage: function () {
                var _this = this;
                this.$http.get(ROOTDATA + "teacherstudio-7.json", {emulateJSON: true})
                    .then(function (res) {
                        _this.message = res.body;
                    })
            },
            // 名师课堂导航栏切换
            teacherClassroomNavClick:function (dom) {
                var _this=this;
                $(dom).on('click','.fenav li',function () {
                    $(this).siblings().removeClass('active');
                    $(this).addClass('active');
                    var courseTypeId=$(this).data('id');
                    _this.teacherclassroom=[];
                    _this.getTeacherClassroom(courseTypeId);
                })
            },
            // 课件资源导航栏切换
            courseResourceavClick:function (dom) {
                var _this=this;
                $(dom).on('click','.fenav li',function () {
                    $(this).siblings().removeClass('active');
                    $(this).addClass('active');
                    var courseWareTypeId=$(this).data('id');
                    _this.courseresource=[];
                    _this.getCourseResource(courseWareTypeId);
                })
            }
        }
    })
}
// 名师工作室资讯、公告更多界面
function teacherstudioinfomore(teachingStudioId) {
    new Vue({
        el: "#feteacherstudioinfomore",
        data: {
            rightCount: [],//右侧数量
            studioinformation:[],//工作室资讯
            notice:[],//公告
            studioinformationnodata:false,
            noticenodata:false,
            noticecurrent:1,
            informationcurrent:1,
            noticeload:true,
            studioinformationload:true
        },
        filters: {
            addRootCourse: function addRootCourse(newsId) {
                return ROOT + "coursedetail.html?courseId=" + newsId;
            },
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            addMoneySign:function addMoneySign(obj) {
                return obj=="0.00"? "免费":"¥"+obj;
                // return "¥"+obj;
            },
            addRootNews: function addRootNews(newsId) {
                return ROOT + "newsdetail.html?newsId=" + newsId;
            }
        },
        mounted: function () {
            var _this = this;
            this.$nextTick(function () {
                _this.getRightCount();
                _this.getNotice(_this.noticecurrent);
                _this.getStudioInformation(_this.informationcurrent);
            })
        },
        methods: {
            getRightCount:function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "TeachingStudio.ashx?action=statStudioNewsActivityCount",
                    {
                        teachingStudioId:teachingStudioId
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.rightCount=res.body[0];
                    })
            },
            // 公告
            getNotice: function (pageIndex) {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Activity.ashx?action=getTeachingStudioNotice",
                    {
                        organId:TempOrgId,
                        teachingStudioId:teachingStudioId,
                        pageIndex:pageIndex,
                        pageSize: 4
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.rows.length < 1) {
                            _this.noticenodata=true;
                        } else {
                            _this.notice=_this.notice.concat(res.body.rows);
                            _this.noticenodata=false;
                        }
                        if(pageIndex >=res.body.totalPageCount){
                            _this.noticeload=false;
                        }else{
                            _this.noticeload=true;
                        }
                    }).then(function () {
                    $('.festudionoticemore  ul').on('click','li',function () {
                        var id=$(this).data('id');
                        _this.$http.post(SERVERROOTDATA + "Activity.ashx?action=getActivityDetailById",
                            {
                                activityId:id
                            }
                            ,{emulateJSON: true})
                            .then(function (res) {
                                var data=res.body[0];
                                var html='<div class="fenoticepop"><h1><span>'+ data.publishName +'</span>' +
                                    '<span>'+ data.publishDate +'</span></h1>' +
                                    '<p>'+ data.content +'</p></div>'
                                layer.open({
                                    type: 1,
                                    title:data.title,
                                    skin: 'layui-layer-rim', //加上边框
                                    area: ['600px', '400px'], //宽高
                                    content: html
                                });
                            });
                    })
                })
            },
            // 工作室资讯
            getStudioInformation: function (pageIndex) {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "News.ashx?action=getTeachingStudioNews",
                    {
                        // organId:TempOrgId,
                        teachingStudioId:teachingStudioId,
                        pageIndex:pageIndex,
                        pageSize:4
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.rows.length < 1) {
                            _this.studioinformationnodata=true;
                        } else {
                            _this.studioinformation=_this.studioinformation.concat(res.body.rows);
                            _this.studioinformationnodata=false;
                        }
                        if(pageIndex >=res.body.totalPageCount){
                            _this.studioinformationload=false;
                        }else{
                            _this.studioinformationload=true;
                        }
                    })
            },
            noticeClickMore:function () {
                var _this=this;
                this.getNotice(++_this.noticecurrent);
            },
            studioInformationClickMore:function () {
                var _this=this;
                this.getStudioInformation(++_this.informationcurrent);
            }
        }
    })
}
// 名师工作室课程更多界面
function teacherstudiocoursemore(teachingStudioId) {
    new Vue({
        el: "#feteacherstudiocoursemore",
        data: {
            teacherclassroomnav: [],//名师课堂导航
            teacherclassroom: [],//，名师课堂
            courseresource: [],//课件资源
            courseTypeId: "22",//名师课堂类型
            current: 1,
            allpage:'',
            showItem:6,
            teacherclassroomnodata: false
        },
        filters: {
            addRootCourse: function addRootCourse(newsId) {
                return ROOT + "coursedetail.html?courseId=" + newsId;
            },
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            addMoneySign:function addMoneySign(obj) {
                return obj=="0.00"? "免费":"¥"+obj;
                // return "¥"+obj;
            }
        },
        computed: {
            pages: function() {
                var pag = [];
                if(this.current < this.showItem) { //如果当前的激活的项 小于要显示的条数
                    //总页数和要显示的条数那个大就显示多少条
                    var i = Math.min(this.showItem, this.allpage);
                    while(i) {
                        pag.unshift(i--);
                    }
                } else { //当前页数大于显示页数了
                    var middle = this.current - Math.floor(this.showItem / 2), //从哪里开始
                        i = this.showItem;
                    if(middle > (this.allpage - this.showItem)) {
                        middle = (this.allpage - this.showItem) + 1
                    }
                    while(i--) {
                        pag.push(middle++);
                    }
                }
                return pag
            }
        },
        mounted: function () {
            var _this = this;
            this.$nextTick(function () {
                _this.getTeacherClassroomNav();
                _this.getTeacherClassroom(_this.courseTypeId,_this.current);
            })
        },
        methods: {
            // 名师课堂导航栏
            getTeacherClassroomNav:function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "CourseType.ashx?action=getStudioCourseType",
                    {
                        organId:TempOrgId,
                        // teachingStudioId:teachingStudioId,
                        pageIndex:1,
                        pageSize:10
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.teacherclassroomnav=res.body.rows;
                    }).then(function () {
                    _this.courseTypeId=$('.festudiocoursemoreselect ul li:first-child').data('id');
                    $('.festudiocoursemoreselect ul li:first-child').addClass('active');
                    _this.teacherClassroomNavClick('.festudiocoursemoreselect');
                })
            },
            // 名师课堂
            getTeacherClassroom: function (courseTypeId,pageIndex) {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Course.ashx?action=getStudioCourseByType",
                    {
                        organId:TempOrgId,
                        teachingStudioId:teachingStudioId,
                        courseTypeId:courseTypeId,
                        pageIndex:pageIndex,
                        pageSize:12
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.rows.length<1){
                            _this.teacherclassroomnodata=true;
                        }else {
                            _this.teacherclassroom = res.body.rows;
                            _this.allpage=res.body.totalPageCount;
                            console.log(_this.teacherclassroom)
                            _this.teacherclassroomnodata=false;
                        }
                    })
            },
            // 名师课堂导航栏切换
            teacherClassroomNavClick:function (dom) {
                var _this=this;
                $(dom).on('click','ul li',function () {
                    $(this).siblings().removeClass('active');
                    $(this).addClass('active');
                    var courseTypeId=$(this).data('id');
                    _this.teacherclassroom=[];
                    _this.courseTypeId=courseTypeId;
                    _this.current=1;
                    _this.getTeacherClassroom(_this.courseTypeId,_this.current);
                })
            },
            goto: function(index) { //枫叶处理
                var _this=this;
                if(index == this.current) return;
                if(index > this.allpage) {
                    this.current = this.current - 2;
                    layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
                    return false;
                }
                this.current = index;
                _this.getTeacherClassroom(_this.courseTypeId,_this.current);
            }
        }
    })
}
// 名师工作室资源更多
function teacherstudioresourcemore(teachingStudioId) {
    new Vue({
        el:"#teacherstudioresourcemore",
        data:{
            leftresource:[],//资源显示
            rightnav:[],//右侧导航栏
            resourceType:"all",//默认文章
            current:1,
            resourcecount:'',//资源数量
            nodata:false,
            load:true
        },
        filters: {
            addRoot: function addRoot(newsId) {
                return ROOT + "articledetail.html?articleId=" + newsId;
            },
            downRoot: function downRoot(url) {
                return SERVERROOTFILE  + url;
            },
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            getName:function getName(name) {
                switch (name){
                    case 'all':
                        return "全部资源";
                        break;
                    case 'article':
                        return "文章";
                        break;
                    case 'courseware':
                        return "课件";
                        break;
                    default:
                        break;
                }
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getLeftResource(_this.resourceType,_this.current);
                _this.getRightNav();
            })
        },
        methods: {
            getLeftResource: function (resourceType,pageIndex) {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "TeachingStudio.ashx?action=getStudioResources",
                    {
                        teachingStudioId:teachingStudioId,
                        resourceType:resourceType,
                        pageIndex:pageIndex,
                        pageSize:4
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.rows.length < 1) {
                            _this.nodata=true;
                        } else {
                            _this.leftresource =_this.leftresource.concat(res.body.rows);
                            _this.resourcecount=res.body.totalCount;
                            _this.nodata=false;
                        }
                        if(pageIndex >=res.body.totalPageCount){
                            _this.load=false;
                        }else{
                            _this.load=true;
                        }
                    })
            },
            getRightNav: function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "TeachingStudio.ashx?action=statStudioResourcesCount",
                    {
                        teachingStudioId:teachingStudioId
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.rightnav = res.body;
                        console.log(_this.rightnav);
                    }).then(function () {
                    $('.festudioresourcemore-right').on('click','li',function () {
                        var id=$(this).data('id');
                        $(this).siblings().removeClass('active');
                        $(this).addClass('active');
                        _this.current=1;
                        _this.resourceType=id;
                        _this.leftresource=[];
                        _this.getLeftResource(_this.resourceType,_this.current);
                    })
                    $('.femasterdetail-allresource li:first-child').addClass('active');
                })
            },
            resourceLoadMore:function () {
                var _this=this;
                this.getLeftResource(_this.resourceType,++_this.current);
            }
        }
    })
}
// 名师3级页面-主页
function teacherindex(teacherId) {
    new Vue({
        el:"#femasterdetail",
        data:{
            teacher:[],//老师
            current: 1, //留言当前页
            showItem: 4,//显示条数
            allpage: '', //总页码
            masterdetailnav:[],//导航栏
            recommendedcourses:[],//推荐课程
            teacherintroduction:[],//老师介绍
            pastnav:[],//过往选项栏
            pastexperience:[],//过往经历
            courseevaluation:[],//课程评价
            rightnav:[],//右侧选择栏
            rightresource:[],//右侧资源
            rightphotovideo:[],//右侧视频/照片
            allcourse:"",//总推荐课程数量
            allevaluation:"",//总留言数量
            coursecurrent:1,//课程当前页
            experiencecurrent:1,//过往经历当前页
            recommendedcoursesnodate:false,//推荐课程没数据
            pastexperiencenodate:false,//过往经历没数据
            recommendedcoursesload:true,//推荐课程加载更多
            pastexperienceload:true,//过往经历加载更多
            noresource:true,//右侧资源没数据显示
            nophoto:true//右侧图片没数据显示
        },
        filters: {
            addRootNav:function addRootNav(newsId) {
                var url;
                switch (newsId){
                    case "1":
                        url="teacherindex.html?teacherId="+teacherId;
                        break;
                    case "2":
                        url="teachercourse.html?teacherId="+teacherId;
                        break;
                    case "3":
                        url="teacherresource.html?teacherId="+teacherId;
                        break;
                    case "4":
                        url="teacherphoto.html?teacherId="+teacherId;
                        break;
                    case "5":
                        url="teacherrecord.html?teacherId="+teacherId;
                        break;
                    default:
                        break;
                }
                return ROOT+url;
            },
            addRoot: function addRoot(newsId) {
                return ROOT + "coursedetail.html?courseId=" + newsId;
            },
            addArticleRoot: function addArticleRoot(newsId) {
                return ROOT + "articledetail.html?articleId=" + newsId;
            },
            downRoot: function downRoot(url) {
                return SERVERROOTFILE + url;
            },
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            addMoneySign:function addMoneySign(obj) {
                return obj=="0.00"? "免费":"¥"+obj;
            },
            getSex:function getSex(obj) {
                return obj=="0"? "男":"女";
            },
            addCourseType:function addCourseType(type) {
                switch (type){
                    case 'video':
                        return "视频课";
                        break;
                    case 'live':
                        return "直播课";
                        break;
                    case 'oneToOne':
                        return "1对1";
                        break;
                    case 'public':
                        return "公开课";
                        break;
                }
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getTeacher(teacherId);
                _this.getMasterDetailNav();
                _this.getRecommendedCourses(_this.coursecurrent);
                _this.getTeacherIntroduction();
                _this.getPastNav();
                _this.getPastExperience(_this.experiencecurrent);
                _this.getCourseEvaluation(_this.current);
                _this.getRightNav();
                _this.getRightResource();
                _this.getRightPhotoVideo();
            })
        },
        computed: {
            pages: function() {
                var pag = [];
                if(this.current < this.showItem) { //如果当前的激活的项 小于要显示的条数
                    //总页数和要显示的条数那个大就显示多少条
                    var i = Math.min(this.showItem, this.allpage);
                    while(i) {
                        pag.unshift(i--);
                    }
                } else { //当前页数大于显示页数了
                    var middle = this.current - Math.floor(this.showItem / 2), //从哪里开始
                        i = this.showItem;
                    if(middle > (this.allpage - this.showItem)) {
                        middle = (this.allpage - this.showItem) + 1
                    }
                    while(i--) {
                        pag.push(middle++);
                    }
                }
                return pag
            }
        },
        methods: {
            getTeacher:function (teacherId) {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Teacher.ashx?action=getTeacherById",
                    {
                        teacherId:teacherId
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.teacher = res.body;
                    })
            },
            getMasterDetailNav: function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Teacher.ashx?action=getTeacherInfoType",
                    {
                        teacherId:teacherId
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.masterdetailnav = res.body;
                    }).then(function () {
                    $('.femasterdetail-nav a:first-child').addClass('active');
                    _this.toggleNavClick();
                })
            },
            getRecommendedCourses: function (pageIndex) {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Teacher.ashx?action=getTeacherRecommendCourse",
                    {
                        teacherId:teacherId,
                        teacherInfoTypeId:2,
                        pageIndex:pageIndex,
                        pageSize:4
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.rows.length < 1) {
                            _this.recommendedcoursesnodate=true;
                        } else {
                            _this.recommendedcourses =_this.recommendedcourses.concat(res.body.rows);
                            _this.recommendedcoursesnodate=false;
                        }
                        if(pageIndex >=res.body.totalPageCount){
                            _this.recommendedcoursesload=false;
                        }else{
                            _this.recommendedcoursesload=true;
                        }
                        _this.allcourse=res.body.totalCount;
                    })
            },
            getTeacherIntroduction: function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Teacher.ashx?action=getTeacherIntroduce",
                    {
                        teacherId:teacherId,
                        teacherInfoTypeId:1
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.teacherintroduction =res.body;
                    })
            },
            getPastNav:function () {
                var _this = this;
                this.$http.get(ROOTDATA + "masterdetail-passnav.json", {emulateJSON: true})
                    .then(function (res) {
                        _this.pastnav =res.body;
                    }).then(function () {
                    $('.fepastexperience>h1 span:first-child').addClass('active');
                    $('.fepastexperience>h1').on('click','span',function () {
                        $(this).siblings().removeClass('active');
                        $(this).addClass('active');
                    })
                })
            },
            getPastExperience: function (experiencecurrent) {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Teacher.ashx?action=getTeacherExperience",
                    {
                        teacherId:teacherId,
                        teacherInfoTypeId:5,
                        pageIndex:experiencecurrent,
                        pageSize:2
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.rows.length < 1) {
                            _this.pastexperiencenodate=true;
                        } else {
                            _this.pastexperience.push(res.body.rows);
                            _this.pastexperiencenodate=false;
                        }
                        if(experiencecurrent >=res.body.totalPageCount){
                            _this.pastexperienceload=false;
                        }else{
                            _this.pastexperienceload=true;
                        }
                        // if(res.body.rows.length<1){
                        //     return false;
                        // }else{
                        //     _this.pastexperience.push(res.body.rows);
                        // }
                })
            },
            getCourseEvaluation: function (current) {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Teacher.ashx?action=getCourseEvaluation",
                    {
                        teacherId:teacherId,
                        teacherInfoTypeId:6,
                        pageIndex:current,
                        pageSize:_this.showItem
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.courseevaluation =res.body.rows;
                        _this.allevaluation=res.body.totalCount;
                        _this.allpage=res.body.totalPageCount;
                    })
            },
            getRightNav: function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Teacher.ashx?action=getTeacherResourceStat",
                    {
                        teacherId:teacherId
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.rightnav =res.body;
                    })
            },
            getRightResource: function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "TeacherResource.ashx?action=getTeacherResource",
                    {
                        teacherId:teacherId,
                        resourceType:'all',
                        pageIndex:1,
                        pageSize:2
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.rightresource =res.body.rows;
                        if( _this.rightresource.length<1){
                            _this.noresource=false;
                        }
                    }).then(function () {
                    $('.femasterdetail-right-resource .feright-more>a').attr('href',ROOT+"teacherresource.html?teacherId="+teacherId)
                })
            },
            getRightPhotoVideo: function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "TeacherResource.ashx?action=getTeacherVideoPhoto",
                    {
                        teacherId:teacherId,
                        teacherVideoPhotoType:'all',
                        pageIndex:1,
                        pageSize:6
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.rightphotovideo =res.body.rows;
                        if( _this.rightphotovideo.length<1){
                            _this.nophoto=false;
                        }
                    }).then(function () {
                        $('.femasterdetail-right-photo .feright-more>a').attr('href',ROOT+"teacherphoto.html?teacherId="+teacherId);
                        $('.femasterdetail-right-photo .fephoto').on('click','img',function () {
                            showPhoto($(this));
                        });
                        $('.femasterdetail-right-photo').on('click','.fevideo',function () {
                            var vid = $(this).data('id');
                            layer.open({
                                type: 2,
                                //title: '播米往前公开课',
                                //closeBtn: 0, //不显示关闭按钮
                                shadeClose: true,
                                shade: [0.5, '#000'],
                                area: ['800px', '500px'],
                                //offset: 'rb', //右下角弹出
                                //time: 2000, //2秒后自动关闭
                                anim: 2,
                                content: 'windowvideo.html?videoId=' + vid
                            });
                        });
                })
            },
            toggleNavClick:function () {
                $('.femasterdetail-nav').on('click','a',function () {
                    $(this).siblings().removeClass('active');
                    $(this).addClass('active');
                })
            },
            recommendedCoursesLoadMore:function () {
                var _this=this;
                this.getRecommendedCourses(++_this.coursecurrent);
            },
            pastExperienceLoadMore:function () {
                var _this=this;
                this.getPastExperience(++_this.experiencecurrent);
            },
            goto: function(index) { //枫叶处理
                var _this=this;
                if(index == this.current) return;
                if(index > this.allpage) {
                    this.current = this.current - 2;
                    layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
                    return false;
                }
                this.current = index;
                _this.getCourseEvaluation(_this.current);
            }
        }
    })
}
// 图片放大 缩小功能
function showPhoto(obj){
    var $pop=$("<div class='dycpop'><b>×</b><i class='uk-icon-minus'></i><s class='uk-icon-plus'></s></div>");
    // var src=$(obj).find('img').attr("src");
    var src=$(obj).attr("src");
    var pheight=$(window).height()-80;
    var pwidth=$(window).width();
    var $img=$('<div style="width:'+ pwidth +'px;height:'+ pheight +'px;overflow: scroll;margin-top: 80px;position: relative"><img src="'+ src +'"/></div>');
    $pop.append($img);
    $('body').append($pop);
    $pop.on('click','b',function () {
        $pop.remove();
    });
    // 放大
    $pop.on('click','s',function () {
        var img=$(this).parent().find('img');
        if(img.width()<=pwidth-100){
            var owidth=img.width()+ 100;
            var oheight=img.height()+ 100/img.width()*img.height();
            img.width(owidth);
            img.height(oheight);
            $('.dycpop img').css({'marginLeft':-owidth/2,'marginTop':-oheight/2});
        }else{
            layer.msg('不能再放大了！');
        }
    });
    // 缩小
    $pop.on('click','i',function () {
        var img=$(this).parent().find('img');
        if(img.width()>=300){
            var owidth=img.width()- 100;
            var oheight=img.height()- 100/img.width()*img.height();
            img.width(owidth);
            img.height(oheight);
            $('.dycpop img').css({'marginLeft':-owidth/2,'marginTop':-oheight/2});
        }else{
            layer.msg('不能再缩小了！');
        }
    });
    var height=$('.dycpop img').height();
    var width=$('.dycpop img').width();
    $('.dycpop img').css({'marginLeft':-width/2,'marginTop':-height/2});
}
// 名师3级页面-课程页
function teacherindex_course(teacherId) {
    new Vue({
        el:"#femasterdetail-course",
        data:{
            teacher:[],//老师
            masterdetailnav:[],//导航栏
            recommendedcourses:[],//推荐课程
            rightnav:[],//右侧导航栏
            current:1,
            allcourse:'',//总课程数
            courseType:'all',//右侧导航栏切换id
            nodata:false,
            load:true
        },
        filters: {
            addRootNav:function addRootNav(newsId) {
                var url;
                switch (newsId){
                    case "1":
                        url="teacherindex.html?teacherId="+teacherId;
                        break;
                    case "2":
                        url="teachercourse.html?teacherId="+teacherId;
                        break;
                    case "3":
                        url="teacherresource.html?teacherId="+teacherId;
                        break;
                    case "4":
                        url="teacherphoto.html?teacherId="+teacherId;
                        break;
                    case "5":
                        url="teacherrecord.html?teacherId="+teacherId;
                        break;
                    default:
                        break;
                }
                return ROOT+url;
            },
            addRoot: function addRoot(newsId) {
                return ROOT + "coursedetail.html?courseId=" + newsId;
            },
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            addMoneySign:function addMoneySign(obj) {
                return obj=="0.00"? "免费":"¥"+obj;
            },
            addCourseType:function addCourseType(type) {
                switch (type){
                    case 'video':
                        return "视频课";
                        break;
                    case 'live':
                        return "直播课";
                        break;
                    case 'oneToOne':
                        return "1对1";
                        break;
                    case 'public':
                        return "公开课";
                        break;
                }
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getTeacher(teacherId);
                _this.getMasterDetailNav();
                _this.getRecommendedCourses(_this.current,_this.courseType);
                _this.getRightNav();
            })
        },
        methods: {
            getTeacher:function (teacherId) {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Teacher.ashx?action=getTeacherById",
                    {
                        teacherId:teacherId
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.teacher = res.body;
                    })
            },
            getMasterDetailNav: function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Teacher.ashx?action=getTeacherInfoType",
                    {
                        teacherId:teacherId
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.masterdetailnav = res.body;
                    }).then(function () {
                    $('.femasterdetail-nav a:nth-child(2)').addClass('active');
                    _this.toggleNavClick();
                })
            },
            getRecommendedCourses: function (pageIndex,courseType) {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Course.ashx?action=getTeacherCourse",
                    {
                        teacherId:teacherId,
                        courseType:courseType,
                        pageIndex:pageIndex,
                        pageSize:4
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.rows.length < 1) {
                            _this.nodata=true;
                        } else {
                            _this.recommendedcourses =_this.recommendedcourses.concat(res.body.rows);
                            _this.nodata=false;
                        }
                        if(pageIndex >=res.body.totalPageCount){
                            _this.load=false;
                        }else{
                            _this.load=true;
                        }
                        _this.allcourse=res.body.totalCount;
                    })
            },
            getRightNav: function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Teacher.ashx?action=getTeacherCourseType",
                    {
                        teacherId:teacherId
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.rightnav = res.body;
                    }).then(function () {
                    $('.femasterdetail-allcourse').on('click','li',function () {
                        var title=$(this).text().split(' ')[0];
                        $('.ferecommendedcourses h1>b').html(title);

                        _this.courseType=$(this).data('id');
                        _this.current=1;
                        _this.recommendedcourses=[];
                        _this.getRecommendedCourses(_this.current,_this.courseType);
                    })
                })
            },
            toggleNavClick:function () {
                $('.femasterdetail-nav').on('click','a',function () {
                    $(this).siblings().removeClass('active');
                    $(this).addClass('active');
                })
            },
            recommendedCoursesLoadMore:function () {
                var _this=this;
                this.getRecommendedCourses(++_this.current,_this.courseType);
            }
        }
    })
}
// 名师3级页面-资源页
function teacherindex_resource(teacherId) {
    new Vue({
        el:"#femasterdetail_resource",
        data:{
            teacher:[],//老师
            masterdetailnav:[],//导航栏
            leftresource:[],//资源显示
            rightnav:[],//右侧导航栏
            resourceType:"article",//默认文章
            current:1,
            nodata:false,
            load:true
        },
        filters: {
            addRootNav:function addRootNav(newsId) {
                var url;
                switch (newsId){
                    case "1":
                        url="teacherindex.html?teacherId="+teacherId;
                        break;
                    case "2":
                        url="teachercourse.html?teacherId="+teacherId;
                        break;
                    case "3":
                        url="teacherresource.html?teacherId="+teacherId;
                        break;
                    case "4":
                        url="teacherphoto.html?teacherId="+teacherId;
                        break;
                    case "5":
                        url="teacherrecord.html?teacherId="+teacherId;
                        break;
                    default:
                        break;
                }
                return ROOT+url;
            },
            addRoot: function addRoot(newsId) {
                return ROOT + "articledetail.html?articleId=" + newsId;
            },
            downRoot: function downRoot(url) {
                return SERVERROOTFILE  + url;
            },
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getTeacher(teacherId);
                _this.getMasterDetailNav();
                _this.getLeftResource(_this.resourceType,_this.current);
                _this.getRightNav();
            })
        },
        methods: {
            getTeacher:function (teacherId) {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Teacher.ashx?action=getTeacherById",
                    {
                        teacherId:teacherId
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.teacher = res.body;
                    })
            },
            getMasterDetailNav: function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Teacher.ashx?action=getTeacherInfoType",
                    {
                        teacherId:teacherId
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.masterdetailnav = res.body;
                    }).then(function () {
                    $('.femasterdetail-nav a:nth-child(3)').addClass('active');
                    _this.toggleNavClick();
                })
            },
            getLeftResource: function (resourceType,pageIndex) {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "TeacherResource.ashx?action=getTeacherResource",
                    {
                        teacherId:teacherId,
                        resourceType:resourceType,
                        pageIndex:pageIndex,
                        pageSize:5
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.rows.length < 1) {
                            _this.nodata=true;
                        } else {
                            _this.leftresource =_this.leftresource.concat(res.body.rows);
                            _this.nodata=false;
                        }
                        if(pageIndex >=res.body.totalPageCount){
                            _this.load=false;
                        }else{
                            _this.load=true;
                        }
                    })
            },
            getRightNav: function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Teacher.ashx?action=getTeacherResourceType",
                    {
                        teacherId:teacherId
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.rightnav = res.body;
                        console.log(_this.rightnav);
                    }).then(function () {
                    $('.femasterdetail-allresource').on('click','li',function () {
                        var id=$(this).data('id');
                        $(this).siblings().removeClass('active');
                        $(this).addClass('active');
                        _this.current=1;
                        _this.resourceType=id;
                        _this.leftresource=[];
                        _this.getLeftResource(_this.resourceType,_this.current);
                    })
                    $('.femasterdetail-allresource li:first-child').addClass('active');
                })
            },
            toggleNavClick:function () {
                $('.femasterdetail-nav').on('click','a',function () {
                    $(this).siblings().removeClass('active');
                    $(this).addClass('active');
                })
            },
            resourceLoadMore:function () {
                var _this=this;
                this.getLeftResource(_this.resourceType,++_this.current);
            },
            addReadCount:function (articleId) {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Article.ashx?action=updateClickCount",
                    {
                        articleId:articleId
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        console.log(111);
                    })
            }
        }
    })
}
// 名师3级页面-视频/照片
function teacherindex_photo(teacherId) {
    new Vue({
        el:"#femasterdetail_photo",
        data:{
            teacher:[],//老师
            masterdetailnav:[],//导航栏
            vedioArr:[],//视频
            photoArr:[],//图片
            vediocurrent:1,
            photocurrent:1,
            allvedionum:0,
            allphotonum:0,
            vedionodata:false,
            vedioload:true,
            photonodata:false,
            photoload:true
        },
        filters: {
            addRootNav:function addRootNav(newsId) {
                var url;
                switch (newsId){
                    case "1":
                        url="teacherindex.html?teacherId="+teacherId;
                        break;
                    case "2":
                        url="teachercourse.html?teacherId="+teacherId;
                        break;
                    case "3":
                        url="teacherresource.html?teacherId="+teacherId;
                        break;
                    case "4":
                        url="teacherphoto.html?teacherId="+teacherId;
                        break;
                    case "5":
                        url="teacherrecord.html?teacherId="+teacherId;
                        break;
                    default:
                        break;
                }
                return ROOT+url;
            },
            addRoot: function addRoot(newsId) {
                return ROOT + "coursedetail.html?courseId=" + newsId;
            },
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getTeacher(teacherId);
                _this.getMasterDetailNav();
                _this.getVedioList(_this.vediocurrent);
                _this.getPhotoList(_this.photocurrent);
            })
        },
        methods: {
            getTeacher:function (teacherId) {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Teacher.ashx?action=getTeacherById",
                    {
                        teacherId:teacherId
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.teacher = res.body;
                    })
            },
            getMasterDetailNav: function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Teacher.ashx?action=getTeacherInfoType",
                    {
                        teacherId:teacherId
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.masterdetailnav = res.body;
                    }).then(function () {
                    $('.femasterdetail-nav a:nth-child(4)').addClass('active');
                    _this.toggleNavClick();
                })
            },
            getVedioList:function (pageIndex) {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "TeacherResource.ashx?action=getTeacherVideoPhoto",
                    {
                        teacherId:teacherId,
                        teacherVideoPhotoType:'video',
                        pageIndex:pageIndex,
                        pageSize:8
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.rows.length < 1) {
                            _this.vedionodata=true;
                        } else {
                            _this.vedioArr = _this.vedioArr.concat(res.body.rows);
                            _this.vedionodata=false;
                        }
                        if(pageIndex >=res.body.totalPageCount){
                            _this.vedioload=false;
                        }else{
                            _this.vedioload=true;
                        }
                        _this.allvedionum=res.body.totalCount;
                    }).then(function () {
                        $('.fevediodetail .feimage').on('click','a',function () {
                            var vid = $(this).data('id');
                            layer.open({
                                type: 2,
                                //title: '播米往前公开课',
                                //closeBtn: 0, //不显示关闭按钮
                                shadeClose: true,
                                shade: [0.5, '#000'],
                                area: ['800px', '500px'],
                                //offset: 'rb', //右下角弹出
                                //time: 2000, //2秒后自动关闭
                                anim: 2,
                                content: 'windowvideo.html?videoId=' + vid
                            });
                        });
                })
            },
            getPhotoList:function (pageIndex) {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "TeacherResource.ashx?action=getTeacherVideoPhoto",
                    {
                        teacherId:teacherId,
                        teacherVideoPhotoType:'photo',
                        pageIndex:pageIndex,
                        pageSize:8
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.rows.length < 1) {
                            _this.photonodata=true;
                        } else {
                            _this.photoArr = _this.photoArr.concat(res.body.rows);
                            console.log(_this.photoArr);
                            _this.photonodata=false;
                        }
                        if(pageIndex >=res.body.totalPageCount){
                            _this.photoload=false;
                        }else{
                            _this.photoload=true;
                        }
                        _this.allphotonum=res.body.totalCount;
                    }).then(function () {
                        $('.fephotodetail .fepanel ').on('click','.feimage',function () {
                            showPhoto($(this).find('img'));
                        })
                })
            },
            toggleNavClick:function () {
                $('.femasterdetail-nav').on('click','a',function () {
                    $(this).siblings().removeClass('active');
                    $(this).addClass('active');
                })
            },
            vedioLoadMore:function () {
                var _this=this;
                this.getVedioList(++_this.vediocurrent);
            },
            photoLoadMore:function () {
                var _this=this;
                this.getPhotoList(++_this.photocurrent);
            }
        }
    })
}
// 名师3级页面-履历
function teacherindex_record(teacherId) {
    new Vue({
        el:"#femasterdetail_record",
        data:{
            teacher:[],//老师
            masterdetailnav:[],//导航栏
            relevantcase:[],//相关案例
            teacherintroduction:[],//老师介绍
            pastthings:[]//过往案例
        },
        filters: {
            addRootNav:function addRootNav(newsId) {
                var url;
                switch (newsId){
                    case "1":
                        url="teacherindex.html?teacherId="+teacherId;
                        break;
                    case "2":
                        url="teachercourse.html?teacherId="+teacherId;
                        break;
                    case "3":
                        url="teacherresource.html?teacherId="+teacherId;
                        break;
                    case "4":
                        url="teacherphoto.html?teacherId="+teacherId;
                        break;
                    case "5":
                        url="teacherrecord.html?teacherId="+teacherId;
                        break;
                    default:
                        break;
                }
                return ROOT+url;
            },
            addRoot: function addRoot(newsId) {
                return ROOT + "teacherindex.html?newsId=" + newsId;
            },
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getTeacher(teacherId);
                _this.getMasterDetailNav();
                _this.getTeacherIntroduction();
                _this.getPastThings();
                _this.getRelevantCase();
            })
        },
        methods: {
            getTeacher:function (teacherId) {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Teacher.ashx?action=getTeacherById",
                    {
                        teacherId:teacherId
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.teacher = res.body;
                    })
            },
            getMasterDetailNav: function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Teacher.ashx?action=getTeacherInfoType",
                    {
                        teacherId:teacherId
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.masterdetailnav = res.body;
                    }).then(function () {
                    $('.femasterdetail-nav a:nth-child(5)').addClass('active');
                    _this.toggleNavClick();
                })
            },
            //老师介绍
            getTeacherIntroduction: function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Teacher.ashx?action=getTeacherIntroduceById",
                    {
                        teacherId:teacherId
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.teacherintroduction = res.body;
                    })
            },
            // 过往案例
            getPastThings: function () {
                var _this = this;
               // this.$http.post(SERVERROOTDATA + "TeachingProcess.ashx?action=getTeachingProcessByTeacherId",
                this.$http.post(SERVERROOTDATA + "Teacher.ashx?action=getTeacherExperience",
                    {
                        teacherId:teacherId,
                        pageIndex:1,
                        pageSize:10,
                        teacherInfoTypeId:5
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.pastthings = res.body.rows;
                        console.log(_this.pastthings);
                    })
            },
            // 相关案例
            getRelevantCase: function () {
                var _this = this;
                this.$http.get(ROOTDATA + "teacherindex-record-2.json", {emulateJSON: true})
                    .then(function (res) {
                        _this.relevantcase = res.body;
                        // console.log(_this.relevantcase);
                    }).then(function () {
                        //瀑布流排版
                        for(var i=0;i<_this.relevantcase.length;i++){
                            var $div=$('<div class="item"></div>');
                            $div.append('<h3>'+_this.relevantcase[i].title+'</h3>');
                            $div.append('<h4>'+_this.relevantcase[i].time+'</h4>');
                            $div.append('<p>'+_this.relevantcase[i].text+'</p>');
                            $('#masonry').append($div);
                        }
                        var $container = $('#masonry');
                        $container.imagesLoaded(function() {
                            $container.masonry({
                                itemSelector: '.item',
                                gutter: 0,
                                isAnimated: true,
                            });
                        });
                })
            },
            toggleNavClick:function () {
                $('.femasterdetail-nav').on('click','a',function () {
                    $(this).siblings().removeClass('active');
                    $(this).addClass('active');
                })
            }
        }
    })
}
// 学校课程
function schoolcourse(organId) {
    new Vue({
        el:"#fecoursedetail",
        data:{
            current: 1, //当前页
            showItem: 6,//显示条数
            allpage: '', //总页码
            courselist:[],
            allnav:[],//全部课程选择栏
            gradeArr:[],//年级
            subjectArr:[],//学科
            hotcourseArr:[],//右侧热门教程
            recommendedcourses:[],//推荐课程
            rankingPosition:[-106,-139,-173,-208,-244,-280],//排名图标坐标
            //筛选条件初始化
            gradeId:'',
            subjectId:'',
            orderName:'colligate',
            ascType:'asc'
        },
        filters: {
            addRoot: function addRoot(newsId) {
                return ROOT + "coursedetail.html?courseId=" + newsId;
            },
            addSchoolRoot:function addSchoolRoot(newsId) {
                return ROOT + "schoolindex.html?organId=" + newsId;
            },
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            addMoneySign:function addMoneySign(obj) {
                return "¥"+obj;
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.adclick();
                _this.getSelectlist();
                _this.getCourseList(_this.gradeId,_this.subjectId,_this.current,_this.orderName,_this.ascType);
                _this.getHotCourse('1');//默认为免费
                _this.getRecommendedCourses();
                _this.addBindSort();
                _this.toggleRankingList();
            })
        },
        computed: {
            pages: function() {
                var pag = [];
                if(this.current < this.showItem) { //如果当前的激活的项 小于要显示的条数
                    //总页数和要显示的条数那个大就显示多少条
                    var i = Math.min(this.showItem, this.allpage);
                    while(i) {
                        pag.unshift(i--);
                    }
                } else { //当前页数大于显示页数了
                    var middle = this.current - Math.floor(this.showItem / 2), //从哪里开始
                        i = this.showItem;
                    if(middle > (this.allpage - this.showItem)) {
                        middle = (this.allpage - this.showItem) + 1
                    }
                    while(i--) {
                        pag.push(middle++);
                    }
                }
                return pag
            }
        },
        methods: {
            // 广告关闭
            adclick:function () {
                $('.fecourselistad').on('click','span',function () {
                    $('.fecourselistad').slideUp(300);
                })
            },
            getSelectlist:function () {
                var _this = this;
                // 年级
                this.$http.post(SERVERROOTDATA + "Grade.ashx?action=getGrade",{organId:organId},{emulateJSON: true})
                    .then(function (res) {
                        _this.gradeArr = res.body;
                    }).then(function () {
                        $('.fegrade').on('click','li',function () {
                            _this.gradeId=$(this).data('id');
                            _this.subjectId='';
                            $('.fesubject li').removeClass('active');
                            $(this).siblings().removeClass('active');
                            $(this).addClass('active');
                            // 已选项显示栏操作
                            $('.fetitle .d1').html($(this).html());
                            $('.fetitle .d2').html('');
                            _this.$http.post(SERVERROOTDATA + "Subject.ashx?action=getSubject",
                                {
                                    gradeId:$(this).data('id'),
                                    organId:organId
                                },
                                {emulateJSON: true})
                                .then(function (res) {
                                    _this.subjectArr = res.body;
                                })
                            _this.current=1;
                            _this.getCourseList(_this.gradeId,_this.subjectId,_this.current,_this.orderName,_this.ascType);
                        })
                })
                // 学科
                this.$http.post(SERVERROOTDATA + "Subject.ashx?action=getSubject",
                    {
                        gradeId:$(this).data('id')==undefined ? '':$(this).data('id'),
                        organId:organId
                    },
                    {emulateJSON: true})
                    .then(function (res) {
                        _this.subjectArr = res.body;
                    }).then(function () {
                        $('.fesubject').on('click','li',function () {
                            $(this).siblings().removeClass('active');
                            $(this).addClass('active');
                            $('.fetitle .d2').html($(this).html());
                        })
                })
            },
            getsubject:function (p) {//绑定学科 点击按钮
                var _this=this;
                _this.subjectId=p;
                _this.current=1;
                _this.getCourseList(_this.gradeId,_this.subjectId,_this.current,_this.orderName,_this.ascType);
            },
            // 获取列表
            getCourseList: function (gradeId,subjectId,pageIndex,orderName,ascType) {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Course.ashx?action=getCourseListByQuery",
                    {
                        organId:organId,
                        gradeId:gradeId,
                        subjectId:subjectId,
                        pageIndex:pageIndex,
                        orderName:orderName,
                        ascType:ascType,
                        pageSize:12
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.courselist = res.body.rows;
                        _this.allpage = res.body.totalPageCount;
                        console.log(_this.courselist);
                    }).then(function () {

                })
            },
            // 分类按钮绑定
            addBindSort:function () {
                var _this=this;
                $('.fecoursedetailnav .fesortall').addClass('active');
                // 综合排序
                $('.fecoursedetailnav').on('click','.fesortall',function () {
                    $('.fecoursedetailnav .fesortprice').removeClass('active');
                    $('.fecoursedetailnav .fesortrenqi').removeClass('active');
                    $(this).addClass('active');
                    _this.current=1;
                    _this.orderName='colligate';
                    _this.getCourseList(_this.gradeId,_this.subjectId,_this.current,_this.orderName,_this.ascType);
                })
                // 价格排序
                $('.fecoursedetailnav').on('click','.fesortprice',function () {
                    $('.fecoursedetailnav .fesortall').removeClass('active');
                    $('.fecoursedetailnav .fesortrenqi').removeClass('active');
                    $(this).addClass('active');
                    var dom=$(this).children('i');
                    if(dom.hasClass('uk-icon-long-arrow-down')){
                        dom.removeClass();
                        dom.addClass('uk-icon-long-arrow-up');
                        //按价格升序
                        _this.current=1;
                        _this.orderName='price';
                        _this.ascType='asc';
                        _this.getCourseList(_this.gradeId,_this.subjectId,_this.current,_this.orderName,_this.ascType);
                    }else{
                        dom.removeClass();
                        dom.addClass('uk-icon-long-arrow-down');
                        //按价格降序
                        _this.current=1;
                        _this.orderName='price';
                        _this.ascType='desc';
                        _this.getCourseList(_this.gradeId,_this.subjectId,_this.current,_this.orderName,_this.ascType);
                    }
                })
                // 按人气排序
                $('.fecoursedetailnav').on('click','.fesortrenqi',function () {
                    $('.fecoursedetailnav .fesortall').removeClass('active');
                    $('.fecoursedetailnav .fesortprice').removeClass('active');
                    $(this).addClass('active');
                    var dom=$(this).children('i');
                    if(dom.hasClass('uk-icon-long-arrow-down')){
                        dom.removeClass();
                        dom.addClass('uk-icon-long-arrow-up');
                        //按人气升序
                        _this.current=1;
                        _this.orderName='clickCount';
                        _this.ascType='asc';
                        _this.getCourseList(_this.gradeId,_this.subjectId,_this.current,_this.orderName,_this.ascType);
                    }else{
                        dom.removeClass();
                        dom.addClass('uk-icon-long-arrow-down');
                        //按人气降序
                        _this.current=1;
                        _this.orderName='clickCount';
                        _this.ascType='desc';
                        _this.getCourseList(_this.gradeId,_this.subjectId,_this.current,_this.orderName,_this.ascType);
                    }
                })
            },
            // 清除全部
            clearAll:function () {
                $('.fetitle .d1').html('');
                $('.fetitle .d2').html('');
                $('.femodule li').removeClass('active');
                $('.femodule b').removeClass('active');
            },
            getHotCourse:function (isFree) {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Course.ashx?action=getCoursePurchaseRanking",
                    {
                        organId:organId,
                        periodType:'week',
                        pageIndex:1,
                        pageSize:6,
                        isFree:isFree
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.hotcourseArr = res.body.rows;
                    }).then(function () {
                    $('.fehotcoursemodule ul li:first-child h1').addClass('active');
                    $('.fehotcoursemodule ul li:first-child .fepanel').slideDown();
                    $('.fehotcoursemodule ul li').on('click','h1',function () {
                        if($(this).hasClass('active')){
                            // $(this).parent().siblings().find('.fepanel').slideUp(300);
                        }else{
                            $(this).parent().siblings().find('h1').removeClass('active');
                            $(this).parent().siblings().find('.fepanel').slideUp(300);
                            $(this).next().slideDown(300);
                            $(this).addClass('active');
                        }
                    })
                })
            },
            // 热门教程榜 tabs切换
            toggleRankingList:function () {
                var _this=this;
                $('.fehotcoursemodule').on('click','.fetabs a',function () {
                    $(this).siblings().removeClass('active');
                    $(this).addClass('active');
                    var isfree=$(this).data('id');
                    _this.getHotCourse(isfree);
                    console.log(23);
                })
            },
            // 推荐课程
            getRecommendedCourses:function () {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "Course.ashx?action=getHotRecommendCourse",
                    {
                        organId:organId,
                        pageIndex:1,
                        pageSize:2,
                        recordType:0
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.recommendedcourses = res.body.rows;
                    })
            },
            goto: function(index) { //枫叶处理
                var _this=this;
                if(index == this.current) return;
                if(index > this.allpage) {
                    this.current = this.current - 2;
                    layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
                    return false;
                }
                this.current = index;
                _this.getCourseList(_this.gradeId,_this.subjectId,_this.current,_this.orderName,_this.ascType);
            }
        }
    })
}
// 文章详情
function articleDetail(articleId) {
    new Vue({
        el: "#articleDetail",
        data: {
            articleId: "",
            currentArticleArr: [],
            preArticleArr: [],
            nextArticleArr: []
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            }
        },
        mounted: function mounted() {
            //1.0ready --> 2.0
            this.$nextTick(function () {
                this.articleId = articleId;
                this.getArticleDetail();
            });
        },
        methods: {
            //get news detail
            getArticleDetail: function getNewsDetail() {
                var _this = this;
                if( _this.articleId == false){
                    layer.msg("该条目暂无详情！");
                    return false;
                }
                this.$http.post(SERVERROOTDATA + "Article.ashx?action=getCurrentArticle", {
                    articleId: _this.articleId,
                    organId: TempOrgId
                }, {
                    emulateJSON: true
                }).then(function (res) {
                    if (res.body.length < 1) {
                        return false;
                    }

                    _this.currentArticleArr = res.body.currentArticle[0];
                    _this.preArticleArr = res.body.priorArticle[0];
                    _this.nextArticleArr = res.body.nextArticle[0];
                    if(_this.preArticleArr[0]== undefined || _this.preArticleArr =="undefined"){
                        _this.preArticleArr[0] = {'title':"无","articleId":undefined};
                    }
                    if(_this.nextArticleArr[0] == undefined || _this.nextArticleArr == "undefined"){
                        _this.nextArticleArr[0] = {'title':"无","articleId":undefined};
                    }
                    $.scrollTo(0);
                });
            },
            //select news
            openArticle: function openNews(id) {
                if(id == undefined|| id == 'undefined'|| id == null){
                    return false
                }else{
                    this.articleId = id;
                    this.getArticleDetail();
                }
            }
        }
    });
}
// 单个窗口播放
function windowVideoPlayer(vId) {
    new Vue({
        el: '#jbackPlayerApp',
        data: {

        },
        mounted: function() { //1.0ready --> 2.0
            this.$nextTick(function() {
                this.getPlayAuth(vId);
            })
        },
        methods: {
            getPlayAuth: function(vid) {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "CourseCatalog.ashx?action=getPlayUrlByVideoId", {
                    videoid: vid
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    _this.createBackPlayerEnDetail(vid, res.body);
                });
            },
            createBackPlayerEnDetail: function(vid, auto) {
                new prismplayer({
                    id: "backcoursePlayer", // 容器id
                    //source: "http://live.bmizx.net/yicelive/streamyice.flv", // 视频地址
                    // source: 'http://devimages.apple.com/iphone/samples/bipbop/bipbopall.m3u8',
                    //source: URL,
                    vid: vid,
                    playauth: auto,
                    autoplay: true, //自动播放：否
                    width: "100%", // 播放器宽度
                    height: "452px", // 播放器高度
                    playsinline: true,
                    preload: false,
                    //isLive: true,
                    skinLayout: [{
                        "name": "bigPlayButton",
                        "align": "cc",
                        "x": 30,
                        "y": 80
                    }, {
                        "name": "controlBar",
                        "align": "blabs",
                        "x": 0,
                        "y": 0,
                        "children": [{
                            "name": "playButton",
                            "align": "tlabs",
                            "x": 10,
                            "y": 25
                        }, {
                            "name": "fullScreenButton",
                            "align": "trabs",
                            "x": 10,
                            "y": 25
                        }, {
                            "name": "volume",
                            "align": "trabs",
                            "x": 50,
                            "y": 25
                        },{"name":"progress","align":"tlabs","x":0,"y":0}]
                    }],
                    cover: './images/public/playBgIcon.jpg'
                    //cover: 'http://liveroom-img.oss-cn-qingdao.aliyuncs.com/logo.png'
                });
            }
        }
    });
}
// 评论区
function leaveword(cId) {
    new Vue({
        el:"#feleaveword",
        data:{
            leavewordList:[],
            current:1,
            allCount:0,
            showItem:4,
            allpage:""
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            }
        },
        computed: {
            pages: function pages() {
                var pag = [];
                if(this.current < this.showItem) {
                    //如果当前的激活的项 小于要显示的条数
                    //总页数和要显示的条数那个大就显示多少条
                    var i = Math.min(this.showItem, this.allpage);
                    while(i) {
                        pag.unshift(i--);
                    }
                } else {
                    //当前页数大于显示页数了
                    var middle = this.current - Math.floor(this.showItem / 2),
                        //从哪里开始
                        i = this.showItem;
                    if(middle > this.allpage - this.showItem) {
                        middle = this.allpage - this.showItem + 1;
                    }
                    while(i--) {
                        pag.push(middle++);
                    }
                }
                return pag;
            }
        },
        mounted: function() { //1.0ready --> 2.0
            this.$nextTick(function() {
                this.getLeaveWord(cId,1);
                this.bindClick(cId);
            })
        },
        methods: {
            getLeaveWord: function (cid,pageIndex) {
                var _this = this;
                this.$http.post(SERVERROOTDATA + "CourseEvaluation.ashx?action=getEvaluation", {
                    courseId: cid,
                    pageIndex:pageIndex,
                    pageSize:3
                }, {
                    emulateJSON: true
                }).then(function (res) {
                    _this.leavewordList=res.body.rows;
                    _this.allCount=res.body.totalCount;
                    _this.allpage=res.body.totalPageCount;
                }).then(function () {
                    // 回复添加评论模块
                    $('.feleaveword .febox').on('click','button',function () {
                        $('.fepinglunarea .feliuyan').remove();
                        var duixiang=$(this).parent().parent().find('.fetop').find('h4').find('span').html();
                        var nick=localStorage.getItem('feUNickName');
                        if(nick==duixiang){//防止自己回复自己
                            layer.msg("不能回复自己");
                            return;
                        }
                        var pliuyan=$('<div class="feliuyan"><input type="text" placeholder="回复'+ duixiang +':"><button>评论</button></div>');
                        $(this).parent().after(pliuyan);
                    });

                })
            },
            bindClick:function (cid) {
                // 最外层评论课程按钮方法
                var _this=this;
                $('.feliuyan-parent').on('click','button',function () {
                    var uid=localStorage.getItem('feUid');
                    var utype=localStorage.getItem('feUType');
                    if(uid==undefined||uid==null||uid=='undefined'){
                        layer.msg('请先登录!');
                    }else{
                        var value=$(this).prev().val();
                        $(this).prev().val('');
                        var reg = /\S+/;
                        if(!reg.test(value)){
                            layer.msg('评论不能为空!');
                        }else{
                            _this.$http.post(SERVERROOTDATA + "CourseEvaluation.ashx?action=evaluation", {
                                valuatorId: uid,
                                userType:utype,
                                courseId:cid,
                                levelOneEvaluationId:0,
                                parentId:0,
                                evaluation:value
                            }, {
                                emulateJSON: true
                            }).then(function (res) {
                                if(res.body.code==200){
                                    layer.msg('评论成功')
                                    _this.getLeaveWord(cid,_this.current);
                                }else{
                                    layer.msg("评论失败");
                                }
                            })
                        }

                    }
                });
                // 绑定评论方法
                $('.feleaveword ').on('click','.feliuyan button',function () {
                    var uid=localStorage.getItem('feUid');
                    var mid=$(this).parent().parent().find('.fetop').find('h4').find('span').data('id');
                    console.log(uid);
                    console.log(mid)
                    if(mid==uid){
                        layer.msg('不能回复自己');
                        return;
                    }
                    var utype=localStorage.getItem('feUType');
                    var img=localStorage.getItem('feUIcon');
                    var nick=localStorage.getItem('feUNickName');

                    var courseEvaluationId=$(this).parent().parent().data('courseevaluationid');
                    var levelOneEvaluationId=$(this).parent().parent().data('leveloneevaluationid');
                    if (levelOneEvaluationId==0||levelOneEvaluationId==''){
                        levelOneEvaluationId=courseEvaluationId;
                    }
                    if(uid==undefined||uid==null||uid=='undefined'){
                        layer.msg('请先登录!');
                    }else{
                        var value=$(this).prev().val();
                        $(this).prev().val('');
                        var reg = /\S+/;
                        if(!reg.test(value)){
                            layer.msg('评论不能为空!');
                        }else{
                            _this.$http.post(SERVERROOTDATA + "CourseEvaluation.ashx?action=evaluation", {
                                valuatorId: uid,
                                userType:utype,
                                courseId:cid,
                                levelOneEvaluationId:levelOneEvaluationId,
                                parentId:courseEvaluationId,
                                evaluation:value
                            }, {
                                emulateJSON: true
                            }).then(function (res) {
                                if(res.body.code==200){
                                    layer.msg('评论成功')
                                    _this.getLeaveWord(cid,_this.current);
                                }else{
                                    layer.msg("评论失败");
                                }
                            })
                        }
                    }
                });
                // 绑定点赞方法
                $('.feleaveword').on('click','.dianzang',function () {
                    var courseEvaluationId=$(this).parent().parent().data('courseevaluationid');
                    _this.$http.post(SERVERROOTDATA + "CourseEvaluation.ashx?action=evaluationThumbUp", {
                        courseEvaluationId: courseEvaluationId
                    }, {
                        emulateJSON: true
                    }).then(function (res) {
                        // if(res.body.code==200){
                            layer.msg('点赞成功')
                            _this.getLeaveWord(cid,_this.current);
                        // }else{
                        //     layer.msg("评论失败");
                        // }
                    })

                });
                // 查看收起
                $('.feleaveword ').on('click','.lookup',function () {
                    if($(this).html()=='收起'){
                        $(this).parent().parent().find('.feleaveword-chirld').fadeOut();
                        $(this).html('查看('+ $(this).data('count') +')');
                    }else{
                        if($(this).data('count')==0){
                            return;
                        }
                        $(this).parent().parent().find('.feleaveword-chirld').fadeIn();
                        $(this).html('收起');
                    }
                });
            },
            goto: function goto(index) {
                //枫叶处理
                if(index == this.current) return;
                if(index > this.allpage) {
                    this.current = this.current - 2;
                    layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
                    return false;
                }
                this.current = index;
                this.getLeaveWord(cId,this.current);
            }

        }
    })
}