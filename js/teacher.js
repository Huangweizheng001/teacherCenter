var photoArray = "";
Vue.component('teacher-left-template', {
    template: '<div class="feteacherpersonalcenter-left">' +
        '<div class="feteacherpersonalcenter-left-head">' +
            '<form action="" id="membercenter">' +
                '<div class="feimage">' +
                    '<img src="images/temp/teachercenter-1.jpg">' +
                '</div>' +
                '<div class="feteacher-picture">' +
                    '<img v-bind:src="headimg|addRootFile">' +
                    '<input type="file" id="mytx" name="mphoto">' +
                '</div>' +
                '<h1>{{teacherName}}</h1>' +
                '<h2 id="norenzheng" v-cloak v-show="noyanzheng==0">暂无身份认证,<a href="teachercenterauthsetting.html" target="main">马上去认证</a></h2>' +
                '<h2 id="yesrenzheng" v-show="noyanzheng==1" style="color:#55b929">已认证</h2>' +
            '</form>' +
        '</div>' +
        '<ul class="feteacherpersonalcenter-left-content">' +
            '<li v-cloak v-for="item in list">' +
                '<a>' +
                    '<i :class="item.icon"></i>' +
                     '<span>{{item.parent}}</span>' +
                '</a>' +
                '<ul class="fechild">' +
                    '<li v-cloak v-for="i in item.children">' +
                        '<a v-bind:href="i.href">{{i.name}}</a>' +
                    '</li>' +
                '</ul>' +
             '</li>' +
        '</ul>' +
    '</div>',
    data: function data() {
        return {
            headimg: $(window).storager({ key: 'teachercenterhead' }).readStorage(),
            teacherName: $(window).storager({ key: 'teachercentername' }).readStorage(),
            noyanzheng: $(window).storager({ key: 'teachercenterRZ' }).readStorage(),
            list: [
                {
                    icon: "uk-icon-user",
                    parent: "个人设置",
                    children: [
                        {
                            href: "teachercenterpersonaldata.html",
                            name: "个人资料"
                        },
                        {
                            href: "teachersecuritysetting.html",
                            name: "安全设置"
                        },
                        {
                            href: "teachercenterauthsetting.html",
                            name: "认证设置"
                        }
                    ]
                },
                {
                    icon: "uk-icon-book",
                    parent: "我的课程",
                    children: [
                        //{
                        //    href: "teachercenterlivecourse.html",
                        //    name: "直播课"
                        //},
                        {
                            href: "teachercenterrecordedcourse.html",
                            name: "录播课"
                        }
                        ,
                        {
                            href: "teachercentermicroLecture.html",
                            name: "微课"
                        }
                    ]
                },
                {
                    icon: "uk-icon-institution",
                    parent: "主页管理",
                    children: [
                        {
                            href: "teachercenterupdatedata.html",
                            name: "资料上传"
                        },
                        {
                            href: "teachercentervideophoto.html",
                            name: "视频/照片"
                        }
                    ]
                },
                {
                    icon: "uk-icon-graduation-cap",
                    parent: "学生管理",
                    children: [
                        {
                            href: "teachercentercreateclass.html",
                            name: '班级管理'
                        },
                        {
                            href: "teachercenterfamily.html",
                            name: '家校互动'
                        },
                        {
                            href: "teachercenterarrangetask.html",
                            name: "布置任务"
                        }
                    ]
                },
                {
                    icon: "uk-icon-desktop",
                    parent: "名师工作室",
                    children: [
                        {
                            href: "teachercentermystudio.html",
                            name: "我的工作室"
                        },
                        {
                            href: "teachercenterapply.html",
                            name: "成员申请"
                        },
                        {
                            href: "teachercenterjoinedstudio.html",
                            name: "已加入工作室"
                        }
                    ]
                },
                {
                    icon: "uk-icon-rmb",
                    parent: "交易中心",
                    children: [
                        {
                            href: "teachercenterorder.html",
                            name: "订单管理"
                        },
                        {
                            href: "teachermycourse.html",
                            name: "课程学习"
                        }
                    ]
                },
                {
                    icon: "uk-icon-comments-o",
                    parent: "问答社区",
                    children: [
                        //{
                        //    href: "teachercenterlivecourse.html",
                        //    name: "直播课"
                        //},
                        //{
                        //    href: "teachercenterrecordedcourse.html",
                        //    name: "录播课"
                        //}
                        //,
                        {
                            href: "teachercenterQAmyquiz.html",
                            name: "我的提问"
                        },
                        {
                            href: "teachercenterQAmyreply.html",
                            name: "我的回答"
                        }
                    ]
                },
                {
                    icon: "uk-icon-envelope-o",
                    parent: "消息管理",
                    children: [
                        {
                            href: "teachercenteransweringreply.html",
                            name: "我的消息"
                        }
                    ]
                }
            ]
        };
    },
    mounted: function mounted() {
        //1.0ready --> 2.0
        this.$nextTick(function () {
            //初始化
            this.addActive();
            this.changeTx();

            //this.getTeacherInfo();
            //this.getTeacherRz();
        });
    },
    filters: {
        addRoot: function addRoot(obj) {
            return ROOT + obj;
        },
        addRootFile: function addRootFile(obj) {
            return SERVERROOTFILE + obj;
        }
    },
    methods: {

        addActive: function addActive() {
            //this.headimg = $(window).storager({
            //    key: 'feUIcon'
            //}).readStorage();
            //this.teacherName = $(window).storager({
            //    key: 'feUNickName'
            //}).readStorage();
            var url = window.location.pathname.split('/');
            // console.log(url[url.length - 1]);
            var currentUrl = url[url.length - 1];
            $('.feteacherpersonalcenter-left-content .fechild li a').removeClass('active');
            $('.feteacherpersonalcenter-left-content .fechild li a[href$="' + currentUrl + '"]').addClass('active');
        },
        changeTx: function changeTx() {
            $('.feteacherpersonalcenter-left-head').on('change', '#mytx', function () {
                var teacherId = $(window).storager({ key: 'feUid' }).readStorage();
                if ($(this).val().match(/.jpg|.gif|.png|.bmp/i)) {
                    var data = new FormData($('#membercenter')[0]);
                    $.ajax({
                        url: "ashx/teacherCenter.ashx?action=SaveTeacherHead",
                        type: "POST",
                        data: data,
                        processData: false,  // 告诉jQuery不要去处理发送的数据
                        contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                        success: function (res) {
                            var data = JSON.parse(res);
                            console.log(data);
                            if (data == 200) {
                                $.ajax({
                                    url: "ashx/teacherCenter.ashx",
                                    type: "POST",
                                    data: { action: "getTeacher" },
                                    // processData: false,  // 告诉jQuery不要去处理发送的数据
                                    // contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                                    success: function (res) {
                                        var data = JSON.parse(res);
                                        if (data.length < 1) {
                                            return false
                                        } else {
                                            $(window).storager({ //fePrePage
                                                key: 'teachercenterhead',
                                                // value: $.getBasePath(1),
                                                value: data.rows[0].iconPath,
                                                expires: 0
                                            }).addStorage();
                                        }
                                    }
                                });
                            } else {
                                layer.msg('保存数据失败！');
                                // setTimeout(function(){window.location.reload()},1000);
                            }
                        }
                    });
                    var dom = $(this).prev();
                    upload(this, dom);
                } else {
                    layer.msg("对不起，系统仅支持标准格式的照片，请您调整格式后重新上传，谢谢 !");
                }
            });
        }
    }
});
var leftTaside = new Vue({
    el: '#leftaside'
});
Vue.component('teacher-header-template', {
    template: '<div style="background: #474747;height:42px;line-height:42px">' +
                '<div class="fe-header-top-bar">' +
                    '<div class="container">' +
                        '<a class="fe-header-top-logo wow slideInLeft" @click="goOut">' +
                            '<img v-bind:src="smallLogo | addRoot" alt="福建教育网" />&nbsp;&nbsp;网站首页' +
                        '</a>&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;' +
                        '<a href="#this">App 下载</a>' +
                        '<div class="fe-header-top-other" style="margin-right: 50px;float:right;">' +
                            '<a v-show="!isLogined" @click="setPrePage">登录</a>' +
                            '<a v-show="!isLogined" @click="setPrePage">&nbsp;/&nbsp;注册</a>' +
                            '<a v-show="isLogined" >{{nickName}}</a>' +
                            '<a v-show="isLogined" @click="signOut">&nbsp;/&nbsp;安全退出</a>' +
                        '</div>' +
                    '</div>' +
                '</div>' +

            '</div>',
    data: function data() {
        return {
            isLogined: false,
            nickName: 'xxx',
            index: 'index.html',
            login: 'login.html',
            reg: 'login.html?login=3',
            member: '',
            smallLogo: 'images/public/logo-icon-small.png',
            headimg: "images/temp/mr-tx.png"
        };
    },
    mounted: function mounted() {
        //1.0ready --> 2.0
        this.$nextTick(function () {
            //初始化
            this.initData();

        });
    },
    filters: {
        addRoot: function addRoot(obj) {
            return "http://www.fetv.cn/" + obj;//feweb/
        },
        addRootFile: function addRootFile(obj) {
            return SERVERROOTFILE + obj;
        }
    },
    methods: {
        initData: function initData() {
            if ($(window).storager({
                key: 'feUid'
            }).readStorage() == undefined) {
                this.isLogined = false;
            } else {
                this.isLogined = true;
                this.nickName = $(window).storager({
                    key: 'feUNickName'
                }).readStorage();
                this.headimg = $(window).storager({
                    key: 'feUIcon'
                }).readStorage();
            }
        },
        goOut: function goOut() {
            top.location.href = "http://www.fetv.cn/";//feweb/
        },
        signOut: function signOut() {
            $(window).storager({
                key: 'feUid'
            }).removeStorage();
            $(window).storager({
                key: 'feUNickName'
            }).removeStorage();
            sessionStorage.removeItem('feUid');
            sessionStorage.removeItem('feUNickName');
            sessionStorage.removeItem('feUType');
            sessionStorage.removeItem('feUIcon');
            sessionStorage.removeItem('feUName');
            sessionStorage.removeItem('feCommunityUid');
            //$.session.remove('feUid');
            //$.session.remove('feUNickName');
            //$.session.remove('feUType');
            //$.session.remove('feUIcon');
            //$.session.remove('feUName');
            //$.session.remove('feCommunityUid');
            var _this = this;
            this.$http.post("../ashx/Login.ashx?action=outLogin",
                {

                }
                , { emulateJSON: true })
                .then(function (res) {
                    if (res.body == "1") {
                        top.location.href = "http://www.fetv.cn/";//feweb/
                        //parent.close();
                    }
                    else {

                    }
                })

            //window.location.reload();
        },
        setPrePage: function setPrePage() {
            $(window).storager({ //fePrePage
                key: 'fePrePage',
                // value: $.getBasePath(1),
                value: 'index.html',
                expires: 0
            }).addStorage();
        }
    }
});
var header = new Vue({
    el: '#header'
});
//获取登录教师基本信息(头像，名称)
function getTeacher() {
    $.ajax({
        async: true,
        type: "post",
        url: "ashx/teacherCenter.ashx",
        data: { action: "getTeacher" }, //提交表单，vistor.ashx?ID=XXX
        success: function (msg) {
            if (msg != "go_login") {
                var ob = JSON.parse(msg);
                $("#head").attr('src', "../" + ob.rows[0].iconPath);
                $("#name").html(ob.rows[0].name);
                $("#tid").val(ob.rows[0].teacherId);
            }
            else {
                top.location.href = "../login.html";
            }
        } //操作成功后的操作！msg是后台传过来的值
                , error: function (XMLHttpRequest) {
                    XMLHttpRequest.responseText
                }
    });
}
//获取登录教师认证情况
function getTeacherRz() {
    $.ajax({
        async: true,
        type: "post",
        url: "ashx/teacherCenter.ashx",
        data: { action: "getTeacherRz" }, //提交表单，vistor.ashx?ID=XXX
        success: function (msg) {
            if (msg != "go_login") {
                var ob = JSON.parse(msg);
                if (ob.rows[0].rz == "1")
                {
                    $("#rzxx").html("已认证");
                    $("#rzxx").css("color", "#55b929");
                }
            }
            else {
                top.location.href = "../login.html";
            }
        } //操作成功后的操作！msg是后台传过来的值
                , error: function (XMLHttpRequest) {
                    XMLHttpRequest.responseText
                }
    });
}
// 更换头像
//$('.feteacherpersonalcenter-left-head').on('change', '#mytx', function () {
//    if ($(this).val().match(/.jpg|.gif|.png|.bmp/i)) {
//        var data = new FormData($('#membercenter')[0]);
//        $.ajax({
//            url: "ashx/teacherCenter.ashx?action=SaveTeacherHead",
//            type: "POST",
//            data: data,
//            processData: false,  // 告诉jQuery不要去处理发送的数据
//            contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
//            success: function (res) {
//                if (res != "go_login") {
//                    if (res == 200) {

//                    } else {
//                        layer.msg('保存数据失败！');
//                        // setTimeout(function(){window.location.reload()},1000);
//                    }
//                }
//                else {
//                    top.location.href = "../login.html";
//                }
//            }
//        });
//        var dom = $(this).prev();
//        upload(this, dom);
//    } else {
//        layer.msg("对不起，系统仅支持标准格式的照片，请您调整格式后重新上传，谢谢 !");
//    }
//});
//获取教师具体信息
function getTeacherMore()
{
    $.ajax({
        type: "post",
        url: "ashx/teacherCenter.ashx",
        data: { action: "getTeacherMore" }, //提交表单，vistor.ashx?ID=XXX
        success: function (msg) {
            if (msg != "go_login") {
                var ob = JSON.parse(msg);
                //$("#head").attr('src', "../" + ob.rows[0].iconPath);
               
                $("#username").val(ob.rows[0].name);
                $("#autograph").val(ob.rows[0].autograph)
                $("#usernickname").val(ob.rows[0].nickName);
                if (ob.rows[0].sex == "0") {
                    $("#usersex").html("男");
                    $('#male').prop('checked', 'true');
                    $('#female').prop('checked', '');
                }
                else {
                    $("#usersex").html("女");
                    $('#male').prop('checked', '');
                    $('#female').prop('checked', 'true');
                }
                $("#school").html(ob.rows[0].organ);
                $("#school_educational").html(ob.rows[0].educationalLevel);
                $("#schoolType").html(ob.rows[0].typeName);
                $("#school_subject").html(ob.rows[0].subject);
                $("#teacher_level").html(ob.rows[0].teacherGrade);
                $("#school_grade").html(ob.rows[0].grade);
                $("#hidden_introduce").html(ob.rows[0].introduce);
                $("#introduces").html($("#hidden_introduce").text());
                $("#email").val(ob.rows[0].email);
                $("#phone").val(ob.rows[0].mobile);
                // $("#qq").val(ob.rows[0].qq);
                $("#SchoolAge").html(ob.rows[0].ofSchoolAge);
                
            }
            else {
                top.location.href = "../login.html";
            }
        } //操作成功后的操作！msg是后台传过来的值
                , error: function (XMLHttpRequest) {
                    XMLHttpRequest.responseText
                }
    });
}

//获取教师认证信息
function getTeacherProve() {
    $.ajax({
        async: false,
        type: "post",
        url: "ashx/teacherCenter.ashx",
        data: { action: "getTeacherProve" }, //提交表单，vistor.ashx?ID=XXX
        success: function (msg) {
            if (msg != "go_login") {
                var ob = JSON.parse(msg);
                if (ob.rows[0].auditState == "0") {
                    if (ob.rows[0].certification == "0") {
                        $("#jszrz").html("(尚未认证)");
                    }
                    else {
                        $("#jszrz").html("(等待审核)");
                        $("#jszrz").css("color", "#ff6d00");
                       // $("#jszrz").parent().next("button").addClass("active");
                    }
                    if (ob.rows[0].idCardPhoto == "0")
                    {
                        $("#sfzrz").html("(尚未认证)");
                    }
                    else {
                        $("#sfzrz").html("(等待审核)");
                        $("#sfzrz").css("color", "#ff6d00");
                        //$("#sfzrz").parent().next("button").addClass("active");
                    }
                    if (ob.rows[0].educational == "0") {
                        $("#xlzrz").html("(尚未认证)");
                    }
                    else {
                        $("#xlzrz").html("(等待审核)");
                        $("#xlzrz").css("color", "#ff6d00");
                        //$("#xlzrz").parent().next("button").addClass("active");
                    }
                    if (ob.rows[0].capability == "0") {
                        $("#zzzrz").html("(尚未认证)");
                    }
                    else {
                        $("#zzzrz").html("(等待审核)");
                        $("#zzzrz").css("color", "#ff6d00");
                       // $("#zzzrz").parent().next("button").addClass("active");
                    }
                }
                else {
                    if (ob.rows[0].certification == "0") {
                        $("#jszrz").html("(尚未认证)");
                    }
                    else {
                        $("#jszrz").html("(已认证)");
                        $("#jszrz").css("color", "#55b929");
                        $("#jszrz").parent().next("button").addClass("active");
                    }
                    if (ob.rows[0].idCardPhoto == "0") {
                        $("#sfzrz").html("(尚未认证)");
                    }
                    else {
                        $("#sfzrz").html("(已认证)");
                        $("#sfzrz").css("color", "#55b929");
                        $("#sfzrz").parent().next("button").addClass("active");
                    }
                    if (ob.rows[0].educational == "0") {
                        $("#xlzrz").html("(尚未认证)");
                    }
                    else {
                        $("#xlzrz").html("(已认证)");
                        $("#xlzrz").css("color", "#55b929");
                        $("#xlzrz").parent().next("button").addClass("active");
                    }
                    if (ob.rows[0].capability == "0") {
                        $("#zzzrz").html("(尚未认证)");
                    }
                    else {
                        $("#zzzrz").html("(已认证)");
                        $("#zzzrz").css("color", "#55b929");
                        $("#zzzrz").parent().next("button").addClass("active");
                    }
                }
            }
            else {
                top.location.href = "../login.html";
            }
        } //操作成功后的操作！msg是后台传过来的值
                , error: function (ex) {
                    alert(ex);
                }
    });
}

//获取教师课程信息
function getTeacherCourse()
{
    $.ajax({
        async: false,
        type: "post",
        url: "ashx/teacherCenter.ashx",
        data: { action: "getTeacherCourse" }, //提交表单，vistor.ashx?ID=XXX
        success: function (msg) {
            if (msg != "go_login") {
                var ob = JSON.parse(msg);
                var num = ob.total;
                var str = "<ul class=\"feorder-content\">";
                for (var i = 0; i < num; i++) {
                    str += "<li class=\"\"><div class=\"span3\"><div class=\"feimage\"><img src=\"http://www.fetv.cn/fe/" + ob.rows[i].iconPath + "\" alt=\"\"><h2>" + ob.rows[i].name + "</h2></div></div><div class=\"span2\"><span>¥" + ob.rows[i].price + "</span></div><div class=\"span2\"><b>" + ob.rows[i].buyCount + "</b></div><div class=\"span2\">" + ob.rows[i].states + "</div><div class=\"span3\"><a onclick=\"set_teacherCourse(" + ob.rows[i].courseId + ")\">编辑</a>&nbsp;|&nbsp;<a onclick=\"see_teacherCourse(" + ob.rows[i].courseId + ")\">查看</a>&nbsp;|&nbsp;<a onclick=\"del_teacherCourse(" + ob.rows[i].courseId + ")\">删除</a></div></li>";
                }
                str += "</ul>";
                $("#list").html(str);
            }
            else {
                top.location.href = "../login.html";
            }
        } //操作成功后的操作！msg是后台传过来的值
                , error: function (ex) {
                    alert(ex);
                }
    });
}
//获取课程微课
function getMicroLecture()
{
    $.ajax({
        async: false,
        type: "post",
        url: "ashx/teacherCenter.ashx",
        data: { action: "getMicroLecture" }, //提交表单，vistor.ashx?ID=XXX
        success: function (msg) {
            if (msg != "go_login") {
                var ob = JSON.parse(msg);
                var num = ob.total;
                var str = "<ul class=\"feorder-content\">";
                for (var i = 0; i < num; i++) {
                    str += "<li class=\"\"><div class=\"span3\"><div class=\"feimage\"><img src=\"http://www.fetv.cn/fe/" + ob.rows[i].iconPath + "\" alt=\"\"><h2>" + ob.rows[i].name + "</h2></div></div><div class=\"span2\"><span>¥" + ob.rows[i].price + "</span></div><div class=\"span2\"><b>" + ob.rows[i].buyCount + "</b></div><div class=\"span2\">" + ob.rows[i].states + "</div><div class=\"span3\"><a onclick=\"set_MicroLecture(" + ob.rows[i].microLectureId + ")\">编辑</a>&nbsp;|&nbsp;<a onclick=\"see_MicroLecture(" + ob.rows[i].microLectureId + ")\">查看</a>&nbsp;|&nbsp;<a onclick=\"del_MicroLecture(" + ob.rows[i].microLectureId + ")\">删除</a></div></li>";
                }
                str += "</ul>";
                $("#list").html(str);
            }
            else {
                top.location.href = "../login.html";
            }
        } //操作成功后的操作！msg是后台传过来的值
                , error: function (ex) {
                    alert(ex);
                }
    });
}
//获取教师过往经历
function getProcess()
{
    $.ajax({//过往经历
        url: "ashx/teacherCenter.ashx",
        type: "POST",
        data: { action: "getTeachingProcessByTeacherId" },
        success: function (res) {
            if (res != "go_login") {
                var data = JSON.parse(res);
                if (data.length < 1 || res == "[{}]") {
                } else {//初始化过往经历
                    for (var i = 0; i < data.length; i++) {
                        var beginDate = parseInt(data[i].beginYear) + '年' + parseInt(data[i].beginMonth) + '月';
                        var endDate = parseInt(data[i].endYear) + '年' + parseInt(data[i].endMonth) + '月';
                        addPastthingData(beginDate, endDate, data[i].experience, data[i].teachingProcessId);
                    }
                }
            }
            else {
                top.location.href = "../login.html";
            }
        }
    });
}

    // 获取教师课节
    function getCourseDetail(id)
    {
        $.ajax({
            async: false,
            type: "post",
            url: "ashx/teacherCenter.ashx",
            data: { action: "getTeacherCourseDetail",courseId:id }, //提交表单，vistor.ashx?ID=XXX
            success: function (msg) {
                if (msg != "go_login") {
                    var ob = JSON.parse(msg);
                    var num = ob.total;
                    var str = "<ul class=\"feorder-content-40\">";
                    for (var i = 0; i < num; i++) {
                        str += "<li class=\"\"><div class=\"span4\"><a title=\"" + ob.rows[i].name + "\"><span>" + ob.rows[i].name + "</span></a></div><div class=\"span2\">" + ob.rows[i].times + "</div><div class=\"span2\">" + ob.rows[i].states + "</div><div class=\"span4\"><button onclick=\"look_Video('" + ob.rows[i].videoId + "')\">播放</button>|<button onclick=\"updateTeacherCatalog(" + ob.rows[i].courseCatalogId + ")\">编辑</button>|<button onclick=\"del_teacherCourseCatalog(" + ob.rows[i].courseCatalogId + ")\">删除</button></div></li>";
                    }
                    str += "</ul>";
                    $("#content").html(str);
                    if (num!=0) {
                        $("#courseName").html(ob.rows[0].courseName);
                    }
                    else
                    {
                        $("#courseName").hide();
                    }
                }
                else {
                    top.location.href = "../login.html";
                }
            } //操作成功后的操作！msg是后台传过来的值
                    , error: function (ex) {
                        alert(ex);
                    }
        });
    }
    // 获取教师微课
    function getMicroLectureDetail(id) {
        $.ajax({
            async: false,
            type: "post",
            url: "ashx/teacherCenter.ashx",
            data: { action: "getMicroLectureDetailById", courseId: id }, //提交表单，vistor.ashx?ID=XXX
            success: function (msg) {
                if (msg != "go_login") {
                    var ob = JSON.parse(msg);
                    var num = ob.total;
                    var str = "<ul class=\"feorder-content-40\">";
                    for (var i = 0; i < num; i++) {
                        str += "<li class=\"\"><div class=\"span4\"><a title=\"" + ob.rows[i].name + "\"><span>" + ob.rows[i].name + "</span></a></div><div class=\"span2\">" + ob.rows[i].time + "</div><div class=\"span2\">" + ob.rows[i].state + "</div><div class=\"span4\"><button onclick=\"look_Video('" + ob.rows[i].videoId + "')\">播放</button></div></li>";//|<button onclick=\"updateMicroLecture(" + ob.rows[i].microLectureId + ")\">编辑</button>
                    }
                    str += "</ul>";
                    $("#content").html(str);
                    if (num != 0) {
                        $("#courseName").html(ob.rows[0].name);
                        $("#wkadd").hide();
                    }
                    else {
                        $("#courseName").hide();
                    }
                }
                else {
                    top.location.href = "../login.html";
                }
            } //操作成功后的操作！msg是后台传过来的值
                    , error: function (ex) {
                        alert(ex);
                    }
        });
    }
    // 获取教师微课详情
    function getLectureDetail(id)
    {
        $.ajax({
            type: "post",
            url: "ashx/teacherCenter.ashx",
            data: { action: "getMicroLectureDetailById", courseId: id }, //提交表单，vistor.ashx?ID=XXX
            success: function (msg) {
                if (msg != "go_login") {
                    var ob = JSON.parse(msg);
                    var num = ob.total;
                    $("#microLectureId").val(ob.rows[0].courseId);
                    $("#name").val(ob.rows[0].name);
                    
                }
                else {
                    top.location.href = "../login.html";
                }
            } //操作成功后的操作！msg是后台传过来的值
                    , error: function (ex) {
                        alert(ex);
                    }
        });
        var options = {
            url: "ashx/teacherCenter.ashx?action=TeacherCourseCatalog",
            success: function (data) {
                if (data != 'go_login') {
                    if (data == "200") {
                        layer.alert("修改成功", function (index) {
                            parent.layer.close(index);
                            parent.window.location.reload();
                        });
                    }

                }
                else {
                    top.location.href = "../login.html";
                }
            }
        };
        $("#submit_form").click(function () {
            if ($("#name").val() != '') {
                try {
                    $("#fmMicroLecture").ajaxSubmit(options);
                }
                catch (e) {
                    layer.alert(e);
                }
            }
            else {
                layer.msg('');
            }
        });
    }
    // 获取教师课节详情
    function getCatalogDetail(id)
    {
        var index = parent.layer.getFrameIndex(window.name);
        $.ajax({
            type: "post",
            url: "ashx/teacherCenter.ashx",
            data: { action: "getTeacherCatalogDetail", courseCatalogId: id }, //提交表单，vistor.ashx?ID=XXX
            success: function (msg) {
                if (msg != "go_login") {
                    var ob = JSON.parse(msg);
                    var num = ob.total;
                    $("#courseCatalogId").val(id);
                    $("#title").val(ob.rows[0].name);
                    $("#allowListen").val(ob.rows[0].allowListen);
                    $("#recommendListen").val(ob.rows[0].recommendListen);
                    $("#videoId").val(ob.rows[0].videoId);
                    $("#videoPath").val(ob.rows[0].videoPath);
                    $("#courseId").val(ob.rows[0].courseId);
                    $("#note").val(ob.rows[0].note);
                    if ($("#allowListen").val() == "true") {
                        $("#allowListens").attr("checked", 'true');
                    }
                    if ($("#recommendListen").val() == "true") {
                        $("#recommendListens").attr("checked", 'true');
                    }
                }
                else {
                    top.location.href = "../login.html";
                }
            } //操作成功后的操作！msg是后台传过来的值
                    , error: function (ex) {
                        alert(ex);
                    }
        });
        var options = {
            url: "ashx/teacherCenter.ashx?action=TeacherCourseCatalog",
            success: function (data) {
                if (data != 'go_login') {
                    if (data == "200")
                    {
                        layer.alert("修改成功", function (index) {
                            parent.layer.close(index);
                            parent.window.location.reload();
                        });
                    }
                
                }
                else {
                    top.location.href = "../login.html";
                }
            }
        };
        $("#submit_form").click(function () {
            if ($("#allowListens").attr('checked')) {
                $("#allowListen").val("1");
            }
            else {
                $("#allowListen").val("0");
            }
            if ($("#recommendListens").attr('checked')) {
                $("#recommendListen").val("1");
            }
            else {
                $("#recommendListen").val("0");
            }
            if ($("#name").val() != '') {
                try {
                    $("#fmCourseCatalog").ajaxSubmit(options);
                }
                catch (e) {
                    layer.alert(e);
                }
            }
        });
    }

    // 删除教师课程
    function del_teacherCourse(id) {
        if (confirm("确定要删除吗?") == false) {
            return;
        }
        $.ajax({//过往经历
            url: "ashx/teacherCenter.ashx",
            type: "POST",
            data: { action: "deleteTeacherCourse",courseId:id ,saveTag:"delete"},
            success: function (res) {
                if (res != "go_login") {
                    if (res == 200) {
                        layer.msg('已删除');
                        setTimeout(function () { window.location.reload() }, 1000);
                    }
                }
                else {
                    top.location.href = "../login.html";
                }
            }
        });
    }

//删除教师微课
    function del_MicroLecture(id)
    {
        if (confirm("确定要删除吗?") == false) {
            return;
        }
        $.ajax({//过往经历
            url: "ashx/teacherCenter.ashx",
            type: "POST",
            data: { action: "deleteTeacherLecture", courseId: id, saveTag: "delete" },
            success: function (res) {
                if (res != "go_login") {
                    if (res == 200) {
                        layer.msg('已删除');
                        setTimeout(function () { window.location.reload() }, 1000);
                    }
                }
                else {
                    top.location.href = "../login.html";
                }
            }
        });
    }

    // 更新教师课节
    function updateTeacherCatalog(id)
    {
        layer.open({
            type: 2,
            shadeClose: true,
            shade: false,
            maxmin: false, //开启最大化最小化按钮
            area: ['650px', '400px'],
            content: 'showTeacherCatalog.html?id=' + id
        });
    }
    // 更新教师微课
    function updateMicroLecture(id) {
        layer.open({
            type: 2,
            shadeClose: true,
            shade: false,
            maxmin: false, //开启最大化最小化按钮
            area: ['650px', '400px'],
            content: 'showMicroLecture.html?id=' + id
        });
    }

    // 删除教师课节
    function del_teacherCourseCatalog(id)
    {
        if (confirm("确定要删除吗?") == false) {
            return;
        }
        $.ajax({//过往经历
            url: "ashx/teacherCenter.ashx",
            type: "POST",
            data: { action: "TeacherCourseCatalog", courseCatalogId: id, saveTag: "delete" },
            success: function (res) {
                if (res != "go_login") {
                    if (res == 200) {
                        layer.msg('已删除');
                        setTimeout(function () { window.location.reload() }, 1000);
                    }
                }
                else {
                    top.location.href = "../login.html";
                }
            }
        });
    }

    // 查看教师课程详情
    function see_teacherCourse(id)
    {
        $(window).storager({ //fePrePage
            key: 'teachercenterCourseid',
            // value: $.getBasePath(1),
            value: id,
            expires: 0
        }).addStorage();
        window.location.href = "recordedcoursedetail.html";//?id=" + id;
    }

    // 查看教师微课详情
    function see_MicroLecture(id) {
        $(window).storager({ //fePrePage
            key: 'teachercenterLectureid',
            // value: $.getBasePath(1),
            value: id,
            expires: 0
        }).addStorage();
        window.location.href = "microLecturedetail.html";//?id=" + id;
    }

    // 编辑教师课程详情
    function set_teacherCourse(id)
    {
        $(window).storager({ //fePrePage
            key: 'teachercenterCourseid',
            // value: $.getBasePath(1),
            value: id,
            expires: 0
        }).addStorage();
        window.location.href = "addrecordedcourse.html?type=0";
    }

    // 编辑教师微课详情
    function set_MicroLecture(id) {
        $(window).storager({ //fePrePage
            key: 'teachercenterCourseid',
            // value: $.getBasePath(1),
            value: id,
            expires: 0
        }).addStorage();
        window.location.href = "addrecordedcourse.html?type=1";
    }

    // 教龄下拉框
    function setAgeSelect()
    {
        for (var i = 0; i < 80; i++) {
            var value = i + 1;
            $("#seniority").append("<option value='" + value + "'>" + value + "</option>")
        }
    }
    function setTimeSelect()
    {
        var date = new Date;
        var year = date.getFullYear();
        for (var i = 1950; i <= year; i++) {
            var value = i;
            $("#beginyear").append("<option value='" + value + "'>" + value + "</option>");
            $("#endyear").append("<option value='" + value + "'>" + value + "年</option>");

        }
    }

    // 学校下拉框
    function setSchoolSelect(typeid) {
        $.ajax({
            url: "ashx/teacherCenter.ashx",
            type: "POST",
            data: { action: "showOrganList", organType: typeid , search_content: $("#search_content").val() },
            success: function (res) {
                var ob = JSON.parse(res);
                var num = ob.total;
                var selObj = $("#search_content");
                //selObj.empty();
                var str = "";
                if (num == 0) {
                    str = "<p style=\"padding:10px\">暂无数据</p>";
                }
                else {
                    //selObj.empty();
                    for (var i = 0; i < num; i++) {
                        var value = ob.rows[i].organId;
                        var text = ob.rows[i].name;
                        str += "<li data-id=\"" + value + "\">" + text + "</li>";
                        //selObj.append("<option value='" + value + "'>" + text + "</option>");
                    }
                }
                $("#div_li").html(str);
            }
        });
    }

    // 学段下拉框
    function setEducationalSelect() {
        $.ajax({
            url: "ashx/teacherCenter.ashx",
            type: "POST",
            data: { action: "showEducationalLevelList" },
            success: function (res) {
                var ob = JSON.parse(res);
                var num = ob.total;
                var selObj = $("#educationalSelect");
                for (var i = 0; i < num; i++) {
                    var value = ob.rows[i].educationalLevelId;
                    var text = ob.rows[i].name;
                    selObj.append("<option value='" + value + "'>" + text + "</option>");
                }
            }
        });
    }

    //教师学历下拉框
    function EducationalSelect() {
        $.ajax({
            async: true,
            url: "ashx/teacherCenter.ashx",
            type: "POST",
            data: { action: "showEducationalList" },
            success: function (res) {
                var ob = JSON.parse(res);
                var num = ob.total;
                var selObj = $("#educationalSelect");
                for (var i = 0; i < num; i++) {
                    var value = ob.rows[i].educationalLevelId;
                    var text = ob.rows[i].name;
                    selObj.append("<option value='" + value + "'>" + text + "</option>");
                }
            }
        });
    }

    // 学科下拉框
    function setSubjectSelect() {
        $.ajax({
            url: "ashx/teacherCenter.ashx",
            type: "POST",
            data: { action: "showSubjectList" },
            success: function (res) {
                var ob = JSON.parse(res);
                var num = ob.total;
                var selObj = $("#subjectSelect");
                for (var i = 0; i < num; i++) {
                    var value = ob.rows[i].subjectId;
                    var text = ob.rows[i].name;
                    selObj.append("<option value='" + value + "'>" + text + "</option>");
                }
            }
        });
    }

    // 年级下拉框
    function setGradeSelect() {
        $.ajax({
            url: "ashx/teacherCenter.ashx",
            type: "POST",
            data: { action: "showGradeList" },
            success: function (res) {
                var ob = JSON.parse(res);
                var num = ob.total;
                var selObj = $("#gradeSelect");
                for (var i = 0; i < num; i++) {
                    var value = ob.rows[i].gradeId;
                    var text = ob.rows[i].name;
                    selObj.append("<option value='" + value + "'>" + text + "</option>");
                }
            }
        });
    }

    // 市区下拉框
    function setCitySelect() {
        $.ajax({
            async: false,
            url: "ashx/teacherCenter.ashx",
            type: "POST",
            data: { action: "showCityList" },
            success: function (res) {
                var ob = JSON.parse(res);
                var num = ob.total;
                var selObj = $("#citySelect");
                for (var i = 0; i < num; i++) {
                    var value = ob.rows[i].cityId;
                    var text = ob.rows[i].name;
                    selObj.append("<option value='" + value + "'>" + text + "</option>");
                }
            }
        });
    }

    // 教师等级下拉框
    function setTeacherGradeSelect()
    {
        $.ajax({
            url: "ashx/teacherCenter.ashx",
            type: "POST",
            data: { action: "showTeacherGradeList" },
            success: function (res) {
                var ob = JSON.parse(res);
                var num = ob.total;
                var selObj = $("#teacherGradeSelect");
                for (var i = 0; i < num; i++) {
                    var value = ob.rows[i].teacherGradeId;
                    var text = ob.rows[i].name;
                    selObj.append("<option value='" + value + "'>" + text + "</option>");
                }
            }
        });
    }

    //教师班级xialak
    function setClassSelect()
    {
        $.ajax({
            async: false,
            url: "ashx/teacherCenter.ashx",
            type: "POST",
            data: { action: "showClassList" },
            success: function (res) {
                var ob = JSON.parse(res);
                var num = ob.total;
                var selObj = $("#classSelect");
                for (var i = 0; i < num; i++) {
                    var value = ob.rows[i].classId;
                    var text = ob.rows[i].name;
                    selObj.append("<option value='" + value + "'>" + text + "</option>");
                }
            }
        });
    }

    // 根据市区获取学校下拉框
    function SchoolSelectByCity(cityId)
    {
        $.ajax({
            async: false,
            url: "ashx/teacherCenter.ashx",
            type: "POST",
            data: { action: "showOrganListByCity",cityId:cityId },
            success: function (res) {
                var ob = JSON.parse(res);
                var num = ob.total;
                var selObj = $("#schoolSelect");//
                var selObj_c = $("#classSelect");
                selObj.empty();
                selObj_c.empty();
                for (var i = 0; i < num; i++) {
                    if (i == 0)
                    {
                        ClassSelectByOrgan(ob.rows[i].organId);
                    }
                    var value = ob.rows[i].organId;
                    var text = ob.rows[i].name;
                    selObj.append("<option value='" + value + "'>" + text + "</option>");
                }
            }
        });
    }

    // 根据学校获取班级下拉框
    function ClassSelectByOrgan(organId)
    {
        $.ajax({
            async: false,
            url: "ashx/teacherCenter.ashx",
            type: "POST",
            data: { action: "showClassListByOrgan", organId: organId },
            success: function (res) {
                var ob = JSON.parse(res);
                var num = ob.total;
                var selObj = $("#classSelect");
                selObj.empty();
                for (var i = 0; i < num; i++) {
                    var value = ob.rows[i].classId;
                    var text = ob.rows[i].name;
                    selObj.append("<option value='" + value + "'>" + text + "</option>");
                }
            }
        });
    }

    function personaldata()
    {
        // 基本信息-编辑按钮事件
        $('#information').on('click', '.fepersonaldata-title span', function () {
            if (!$(this).hasClass('active')) {
                $(this).addClass('active');
                //if ($("#TauditState").val()!="1")
                //{
                
                //}
                $('#information #username').prop('disabled', '');
                $('#information #autograph').prop('disabled', '');
                //$('#information #usernickname').prop('disabled', '');
                $('#information i').css('display', 'none');
                $('#information input[type="radio"]').removeClass('fehidden');
                $('#information label').removeClass('fehidden');
                $('#information select').removeClass('fehidden');
                $('#information .fetextarea').attr('contentEditable', 'true').addClass('feedit');
                $('#information .feoperation').removeClass('fehidden');
                $("#introduces").prop("disabled", '');
            } else {
            }
        });

        // 基本信息-取消按钮事件
        $('#information .feoperation').on('click', 'a:last-child', function () {
            window.location.reload();
        });

        // 基本信息-保存按钮事件
        $('#information .feoperation').on('click', 'a:first-child', function () {
            if ($('#username').val() == "") {
                layer.msg('姓名不能为空！');
                return;
            } else {
                if ($('#information input[type="radio"]:checked').length < 1) {
                    layer.msg('请选择你的性别');
                    return;
                } else {
                    if ($('#introduces').val() == "") {
                        layer.msg('自我介绍不能为空！');
                        return;
                    } else {
                        if ($("#TauditState").val() == "1") {
                            layer.confirm('修改您的个人资料后您将会进入等待审核的状态，您将暂时无法操作部分功能，您确定修改吗？', {
                                btn: ['确定', '取消'] //按钮
                            }, function () {
                                var intro = $("#introduces").val();
                                // $('#information i').html(sexvalue);
                                var data = new FormData($('#information-form')[0]);
                                data.append("introduce", intro);
                                data.append('saveTag', 'update');
                                $.ajax({
                                    url: "ashx/teacherCenter.ashx?action=teacherBasicInfoSave",
                                    type: "POST",
                                    data: data,
                                    processData: false,  // 告诉jQuery不要去处理发送的数据
                                    contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                                    success: function (res) {
                                        if (res != "go_login") {
                                            if (res == 200) {
                                                layer.msg('保存成功！');
                                                $(window).storager({ //fePrePage
                                                    key: 'teachercenterRZ',
                                                    // value: $.getBasePath(1),
                                                    value: 0,
                                                    expires: 0
                                                }).addStorage();
                                                setTimeout(function () { top.location.reload() }, 1000);
                                                //var sex = $('#information input[type=radio]:checked').val();
                                                //if (sex == '0') {
                                                //    $('#information #male').prev().html('男');
                                                //} else {
                                                //    $('#information #male').prev().html('女');
                                                //}
                                                //$("#introduces").attr("disabled", 'disabled');
                                            } else {
                                                layer.msg('保存数据失败！');
                                                setTimeout(function () { window.location.reload() }, 1000);
                                            }
                                        }
                                        else {
                                            top.location.href = "../login.html";
                                        }
                                        // 改变样式
                                        $('#information .fepersonaldata-title>span').removeClass('active');
                                        $('#information input[type="text"]').prop('disabled', 'true');
                                        $('#information i').css('display', 'inline-black');
                                        $('#information input[type="radio"]').addClass('fehidden');
                                        $('#information label').addClass('fehidden');
                                        $('#information .fetextarea').attr('contentEditable', 'false').removeClass('feedit');
                                        $('#information .feoperation').addClass('fehidden');
                                    }
                                });
                            }, function () {

                            });
                        }
                        else {
                            // 保存数据
                            var intro = $("#introduces").val();
                            // $('#information i').html(sexvalue);
                            var data = new FormData($('#information-form')[0]);
                            data.append("introduce", intro);
                            data.append('saveTag', 'update');
                            $.ajax({
                                url: "ashx/teacherCenter.ashx?action=teacherBasicInfoSave",
                                type: "POST",
                                data: data,
                                processData: false,  // 告诉jQuery不要去处理发送的数据
                                contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                                success: function (res) {
                                    if (res != "go_login") {
                                        if (res == 200) {
                                            layer.msg('保存成功！');
                                            setTimeout(function () { top.location.reload() }, 1000);
                                            //var sex = $('#information input[type=radio]:checked').val();
                                            //if (sex == '0') {
                                            //    $('#information #male').prev().html('男');
                                            //} else {
                                            //    $('#information #male').prev().html('女');
                                            //}
                                            //$("#introduces").attr("disabled", 'disabled');
                                        } else {
                                            layer.msg('保存数据失败！');
                                            setTimeout(function () { window.location.reload() }, 1000);
                                        }
                                        // 改变样式
                                        $('#information .fepersonaldata-title>span').removeClass('active');
                                        $('#information input[type="text"]').prop('disabled', 'true');
                                        $('#information i').css('display', 'inline-black');
                                        $('#information input[type="radio"]').addClass('fehidden');
                                        $('#information label').addClass('fehidden');
                                        $('#information .fetextarea').attr('contentEditable', 'false').removeClass('feedit');
                                        $('#information .feoperation').addClass('fehidden');
                                    }
                                    else {
                                        top.location.href = "../login.html";
                                    }
                                }
                            });
                        }
                    }
                }
            }
       
        });

        // 联系方式-编辑按钮事件
        $('#contact').on('click', '.fepersonaldata-title span', function () {
            if (!$(this).hasClass('active')) {
                $(this).addClass('active');
                $('#contact input[type="text"]').prop('disabled', '');
                $('#contact .feoperation').removeClass('fehidden');
            } else {
            }
        });

        // 联系方式-取消按钮事件
        $('#contact .feoperation').on('click', 'a:last-child', function () {
            window.location.reload();
        });

        // 联系方式-保存按钮事件
        $('#contact .feoperation').on('click', 'a:first-child', function () {
            if (!isEmail($('#email').val())) {
                layer.msg('请输入正确的邮箱格式！');
                return;
            } else {
                if (!isPhone($('#phone').val())) {
                    layer.msg('请输入正确的手机号！');
                    return;
                }
                    //else {
                    //    if (!isQQ($('#qq').val())) {
                    //        layer.msg('请输入正确的QQ号！');
                    //        return;
                    //    }
                else {
                    // 保存数据
                    var data = new FormData($('#contact-form')[0]);
                    data.append('saveTag', 'update');
                    $.ajax({
                        url: "ashx/teacherCenter.ashx?action=teacherContactInfoSave",
                        type: "POST",
                        data: data,
                        processData: false,  // 告诉jQuery不要去处理发送的数据
                        contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                        success: function (res) {
                            if (res != "go_login") {
                                if (res == 200) {

                                }
                                else {
                                    layer.msg('保存数据失败！');
                                    setTimeout(function () { window.location.reload() }, 1000);
                                }
                            }
                            else {
                                top.location.href = "../login.html";
                            }
                        }
                    });
                }
            }
            // 改变样式
            $('#contact .fepersonaldata-title>span').removeClass('active');
            $('#contact input[type="text"]').prop('disabled', 'true');
            $('#contact .feoperation').addClass('fehidden');
        });

        // 背景资料-编辑按钮事件
        $('#background').on('click', '.fepersonaldata-title span', function () {
            $("#search_content").val($("#school").html())
            if (!$(this).hasClass('active')) {
                $(this).addClass('active');
                $('#background i').css('display', 'none');
                $('#background .fecompany').prop('disabled', '');
                $('#background select').removeClass('fehidden');
                $('#background .feoperation').removeClass('fehidden');
                $('#background .organ_School').removeClass('fehidden');
                $.ajax({
                    type: "post",
                    url: "ashx/teacherCenter.ashx",
                    data: { action: "getTeacherMore" }, //提交表单，vistor.ashx?ID=XXX
                    success: function (msg) {
                        if (msg != "go_login") {
                            var ob = JSON.parse(msg);
                            //$("#head").attr('src', "../" + ob.rows[0].iconPath);
                            $("#subjectSelect").find("option[value='" + ob.rows[0].subjectId + "']").attr("selected", true);
                            $("#schoolSelect").find("option[value='" + ob.rows[0].organId + "']").attr("selected", true);
                            $("#seniority").find("option[value='" + ob.rows[0].ofSchoolAge + "']").attr("selected", true);
                            $("#educationalSelect").find("option[value='" + ob.rows[0].educationalLevelId + "']").attr("selected", true);
                            $("#gradeSelect").find("option[value='" + ob.rows[0].gradeId + "']").attr("selected", true);
                            $("#teacherGradeSelect").find("option[value='" + ob.rows[0].teacherGradeId + "']").attr("selected", true);
                        }
                        else {
                            top.location.href = "../login.html";
                        }
                    } //操作成功后的操作！msg是后台传过来的值
                        , error: function (ex) {
                            alert(ex);
                        }
                });
            } else {
            }
        });
        //学校索引搜索-聚焦
        $('.organ_School').on('focus', 'input', function () {
            $(this).next('ul').css('display', 'inline-block');
        });
        //学校索引搜索-失焦
        //$('.organ_School').on('blur', 'input', function () {
        //    $(this).next('ul').css('display', 'none');
        //});
        //学校索引搜索-赋值
        $('.organ_School #div_li').on('click', 'li', function () {
            var id = $(this).data("id");
            $("#organId").val(id);
            console.log(id);
            $(this).parent().parent().find("input").val($(this).html());
            $(this).parent().css('display', 'none');
        });
        //学校索引搜索-keyup事件
        $('.organ_School').on('keyup', 'input', function () {
            var typeid = $("#organType").val();
            $.ajax({
                url: "ashx/teacherCenter.ashx",
                type: "POST",
                data: { action: "showOrganList", organType: typeid, search_content: $("#search_content").val() },
                success: function (res) {
                    var ob = JSON.parse(res);
                    var num = ob.total;
                    var selObj = $("#search_content");
                    var str = "";
                    if (num == 0) {
                        str = "<p style=\"padding:10px\">暂无数据</p>";
                    }
                    else {
                        //selObj.empty();
                        for (var i = 0; i < num; i++) {
                            var value = ob.rows[i].organId;
                            var text = ob.rows[i].name;
                            str += "<li data-id=\"" + value + "\">" + text + "</li>";
                            //selObj.append("<option value='" + value + "'>" + text + "</option>");
                        }
                    }
                    $("#div_li").html(str);
                }
            });
        });
        // 背景资料-取消按钮事件
        $('#background .feoperation').on('click', 'a:last-child', function () {
            window.location.reload();
        });

        // 背景资料-保存按钮事件
        $('#background .feoperation').on('click', 'a:first-child', function () {
            if ($('#schoolSelect').val() == "") {
                layer.msg('单位/机构/学校 不能为空！');
                return;
            } else {
                if ($("#TauditState").val() == "1") {
                    layer.confirm('修改您的个人资料后您将会进入等待审核的状态，您将暂时无法操作部分功能，您确定修改吗？', {
                        btn: ['确定', '取消'] //按钮
                    }, function () {
                        var data = new FormData($('#background-form')[0]);
                        data.append('saveTag', 'update');
                        data.append('schoolSelect', $("#organId").val());
                        $.ajax({
                            url: "ashx/teacherCenter.ashx?action=teacherBackgroundInfoSave",
                            type: "POST",
                            data: data,
                            processData: false,  // 告诉jQuery不要去处理发送的数据
                            contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                            success: function (res) {
                                if (res != "go_login") {
                                    if (res == 200) {
                                        layer.msg('保存成功！');
                                        $(window).storager({ //fePrePage
                                            key: 'teachercenterRZ',
                                            // value: $.getBasePath(1),
                                            value: 0,
                                            expires: 0
                                        }).addStorage();
                                        setTimeout(function () { top.location.reload() }, 1000);
                                    } else {
                                        layer.msg('保存失败！');
                                        setTimeout(function () { window.location.reload() }, 1000);
                                    }
                                }
                                else {
                                    top.location.href = "../login.html";
                                }
                                // 改变样式
                                $('#background .fepersonaldata-title>span').removeClass('active');
                                $('#background i').css('display', 'inline-block');
                                $('#background .fecompany').prop('disabled', 'true');
                                $('#background select').addClass('fehidden');
                                $('#background .feoperation').addClass('fehidden');
                            }
                        });
                    }, function () {

                    });
                }
                else {
                    // 保存数据
                    var data = new FormData($('#background-form')[0]);
                    data.append('saveTag', 'update');
                    $.ajax({
                        url: "ashx/teacherCenter.ashx?action=teacherBackgroundInfoSave",
                        type: "POST",
                        data: data,
                        processData: false,  // 告诉jQuery不要去处理发送的数据
                        contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                        success: function (res) {
                            if (res != "go_login") {
                                if (res == 200) {
                                    layer.msg('保存成功！');
                                    setTimeout(function () { top.location.reload() }, 1000);
                                } else {
                                    layer.msg('保存失败！');
                                    setTimeout(function () { window.location.reload() }, 1000);
                                }
                                // 改变样式
                                $('#background .fepersonaldata-title>span').removeClass('active');
                                $('#background i').css('display', 'inline-block');
                                $('#background .fecompany').prop('disabled', 'true');
                                $('#background select').addClass('fehidden');
                                $('#background .feoperation').addClass('fehidden');
                            }
                            else {
                                top.location.href = "../login.html";
                            }
                        }
                    });
                }
            }
        
        });

        var pastcontent = '';//过往经历默认提示语句
        // 过往经历-添加按钮事件
        $('#pastthing').on('click', '.fepersonaldata-title span', function () {
            $(this).parent().next().removeClass('fehidden');
            pastcontent = $('#pastthing .fetext').html();
        })

        // 过往经历-取消按钮事件
        $('#pastthing').on('click', '.feoperation a:last-child', function () {
            window.location.reload();
        });
        // 过往经历-保存按钮事件
        $('#pastthing').on('click', '.feoperation a:first-child', function () {
            if (!compareDate('#beginyear', '#beginmonth', '#endyear', '#endmonth')) {
                layer.msg('开始时间不能大于结束时间！');
                return;
            } else {
                if ($('#pastthing .fetext').val() == "") {
                    layer.msg('过往经历不能为空！');
                    return;
                } else {
                    if ($("#TauditState").val() == "1") {
                        layer.confirm('修改您的个人资料后您将会进入等待审核的状态，您将暂时无法操作部分功能，您确定修改吗？', {
                            btn: ['确定', '取消'] //按钮
                        }, function () {
                            var beginDate = $('#beginyear').val() + '-' + $('#beginmonth').val() + '-01';
                            var endDate = $('#endyear').val() + '-' + $('#endmonth').val() + '-01';
                            var experience = $('#pastthing .fetext').val();
                            $.ajax({
                                url: "ashx/teacherCenter.ashx?action=teachingProcessInfoSave",
                                type: "POST",
                                data: { beginDate: beginDate, endDate: endDate, saveTag: 'add', experience: experience },
                                success: function (res) {
                                    if (res != "go_login") {
                                        if (res == 200) {
                                            layer.msg('保存成功！');
                                            $(window).storager({ //fePrePage
                                                key: 'teachercenterRZ',
                                                // value: $.getBasePath(1),
                                                value: 0,
                                                expires: 0
                                            }).addStorage();
                                            setTimeout(function () { top.location.reload() }, 1000);
                                        } else {
                                            layer.msg('保存失败！');
                                        }
                                        $(this).parent().parent().addClass('fehidden');
                                        $('#pastthing .fetext').html(pastcontent);
                                    }
                                    else {
                                        top.location.href = "../login.html";
                                    }
                                }
                            });
                        }, function () {

                        });
                    }
                    else {
                        var beginDate = $('#beginyear').val() + '-' + $('#beginmonth').val() + '-01';
                        var endDate = $('#endyear').val() + '-' + $('#endmonth').val() + '-01';
                        var experience = $('#pastthing .fetext').val();
                        $.ajax({
                            url: "ashx/teacherCenter.ashx?action=teachingProcessInfoSave",
                            type: "POST",
                            data: { beginDate: beginDate, endDate: endDate, saveTag: 'add', experience: experience },
                            success: function (res) {
                                if (res != "go_login") {
                                    if (res == 200) {
                                        layer.msg('保存成功！');
                                        setTimeout(function () { top.location.reload() }, 1000);
                                    } else {
                                        layer.msg('保存失败！');
                                    }
                                    $(this).parent().parent().addClass('fehidden');
                                    $('#pastthing .fetext').html(pastcontent);
                                }
                                else {
                                    top.location.href = "../login.html";
                                }
                            }
                        });
                    }
                }
            }
       
        })

        // 经历-删除按钮事件
        $('.fepastthing-content').on('click', 'li span', function () {
            var _this = this;
            layer.confirm('你确定要删除吗？', {
                btn: ['确定', '取消'] //按钮
            }, function () {
                $.ajax({
                    url: SERVERROOTDATA + "Teacher.ashx?action=teachingProcessInfoSave",
                    type: "POST",
                    data: { teachingProcessId: $(_this).data('id'), saveTag: 'delete' },
                    success: function (res) {
                        if (res != "go_login") {
                            if (res == 200) {
                                $(_this).parent().parent().remove();
                                layer.msg('删除成功！', { icon: 1 });
                            }
                        }
                        else {
                            top.location.href = "../login.html";
                        }
                    }
                });
            }, function () {

            });
        });

        var relevantcasecontent = '';//相关案例
        // 相关案例-添加按钮事件
        $('#relevantcase').on('click', '.fepersonaldata-title span', function () {
            $(this).parent().next().removeClass('fehidden');
            relevantcasecontent = $('#relevantcase .fehistory .fetext').html();
        })

        // 相关案例-取消按钮事件
        $('#relevantcase').on('click', '.feoperation a:last-child', function () {
            // $(this).parent().parent().addClass('fehidden');
            window.location.reload();
        })

        // 相关案例-保存按钮事件
        $('#relevantcase').on('click', '.feoperation a:first-child', function () {
            if (!isEmpty($('#casename').val())) {
                layer.msg('案例名称不能为空！');
                return;
            } else {
                if (!isEmpty($('#relevantcase .fetext').text())) {
                    layer.msg('相关案例不能为空!');
                    return;
                } else {
                    var data = new FormData($('#relevantcase-form')[0]);
                    var experience = $('#relevantcase .fetext').text();
                    data.append('experience', experience);
                    $.ajax({
                        url: "data/grade.php",
                        type: "POST",
                        data: data,
                        processData: false,  // 告诉jQuery不要去处理发送的数据
                        contentType: false   // 告诉jQuery不要去设置Content-Type请求头
                    });
                }
            }
            $(this).parent().parent().addClass('fehidden');
            addRelevantcaseData();
            $('#relevantcase .fehistory .fetext').html(relevantcasecontent);
        });
    }

    // 添加过往经历事件
    function addPastthingData(beginDate, endDate, experience, teachingProcessId) {
        // var pastthing_begin=$('#pastthing #beginyear option:selected').text()+$('#pastthing #beginmonth option:selected').text();
        // var pastthing_end=$('#pastthing #endyear option:selected').text()+$('#pastthing #endmonth option:selected').text();
        // var html=$('#pastthing .fetext').html();
        var $li = $('<li></li>');
        var $h1 = $('<h1>' + beginDate + '  --  ' + endDate + '<span data-id="' + teachingProcessId + '">删除</span></h1>');
        var $p = $('<p>' + experience + '</p>');
        $li.append($h1).append($p);
        $('#pastthing .fepastthing-content').append($li);
    }

    // 添加相关案例事件
    function addRelevantcaseData() {
        var title = $('#relevantcase .fehistory .febox input').val();
        var relevantcasedate = $('#relevantcase #dateyear option:selected').text() + $('#relevantcase #datemonth option:selected').text();
        var html = $('#relevantcase .fehistory .fetext').html();
        var $li = $('<li></li>');
        var $h1 = $('<h1>' + relevantcasedate + '<s>' + title + '</s><span>删除</span></h1>');
        var $p = $('<p>' + html + '</p>');
        $li.append($h1).append($p);
        $('#relevantcase .fepastthing-content').append($li);
    }


    // 日期比较
    function compareDate(b_year, b_month, e_year, e_month) {
        var beginyear = parseInt($(b_year).val());
        var beginmonth = parseInt($(b_month).val());
        var endyear = parseInt($(e_year).val());
        var endmonth = parseInt($(e_month).val());
        if (beginyear < endyear) {
            return true;
        } else if (beginyear == endyear) {
            if (beginmonth <= endmonth) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }



    // 视频/照片
    function videophoto() {
        // 预览主页
        //$('.feteacherpersonalcenter-right-head a:contains("预览主页")').attr('href', ROOT + "teacherindex.html?teacherId=" + teacherId);
        // 切换 照片/视频列表
        $('.fevideophoto .febox h1').on('click', 'span', function () {
            if (!$(this).hasClass('active')) {
                $(this).addClass('active');
                $(this).siblings().removeClass('active');
                var val = '添加' + $(this).html();
                $('.fevideophoto .febox p button').html('<i class="uk-icon-plus-circle"></i>' + val);
                if ($(this).html() == '视频') {
                    $('.fephotodetail').addClass('fehidden');
                    $('.fevediodetail').removeClass('fehidden');
                    $('.fevediodetail').find('.pagenationbox').removeClass('fehidden');
                    $('.fephotodetail').find('.pagenationbox').addClass('fehidden');
                    // $('.fevideophoto>.febox>p>span').html('请将视频控制在1G之内，视频必须为你的原创作品。');
                } else {
                    $('.fevediodetail').addClass('fehidden');
                    $('.fephotodetail').removeClass('fehidden');
                    $('.fevediodetail').find('.pagenationbox').addClass('fehidden');
                    $('.fephotodetail').find('.pagenationbox').removeClass('fehidden');
                    // $('.fevideophoto>.febox>p>span').html('建议上传本人形象照、上课照片、与学生的合照以及教学环境，有助于让大家更好的了解你！');
                }
            } else {
            }
        });
        //显示视频
        function showvideo() {
            new Vue({
                el: "#showvideo",
                data: {
                    videoArr: [],//视频
                    showItem: 4,//页码显示条数
                    allpage: '',//总页数
                    current: 1//当前页
                },
                filters: {
                    addRootFile: function addRootFile(img) {
                        return SERVERROOTFILE + img;
                    }
                },
                mounted: function () {
                    var _this = this;
                    this.$nextTick(function () {
                        _this.getVideo(1);
                    })
                },
                computed: {
                    pages: function () {
                        var pag = [];
                        if (this.current < this.showItem) { //如果当前的激活的项 小于要显示的条数
                            //总页数和要显示的条数那个大就显示多少条
                            var i = Math.min(this.showItem, this.allpage);
                            while (i) {
                                pag.unshift(i--);
                            }
                        } else { //当前页数大于显示页数了
                            var middle = this.current - Math.floor(this.showItem / 2), //从哪里开始
                                i = this.showItem;
                            if (middle > (this.allpage - this.showItem)) {
                                middle = (this.allpage - this.showItem) + 1
                            }
                            while (i--) {
                                pag.push(middle++);
                            }
                        }
                        return pag
                    }
                },
                methods: {
                    getVideo: function (pageIndex) {
                        var _this = this;
                        this.$http.post("ashx/teacherCenter.ashx?action=getTeacherVideo",
                            {
                                pageIndex: pageIndex,
                                pageSize: 9
                            }
                            , { emulateJSON: true })
                            .then(function (res) {
                                if (res.body != "go_login") {
                                    _this.videoArr = res.body.rows;
                                    _this.allpage = res.body.totalPageCount;
                                }
                                else {
                                    top.location.href = "../login.html";
                                }
                            }).then(function () {
                                $('.fevediodetail').on('click', '.feimage', function () {
                                    var vid = $(this).parent().data('vid');
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
                            }).then(function () {
                                var _this = this;
                                //$('#courseware .fepanel ul').on('click', 'li:first-child', function () {
                                //    window.location.href = "updatecourseware.html?studioResourceId=" + $(this).parent().data('id');
                                //});
                                $('#showvideo .fepanel ul').on('click', 'li:first-child', function () {
                                    var _this = this;
                                    var studioResourceId = $(_this).parent().data('id');
                                    layer.confirm('你确定要删除吗？', {
                                        btn: ['确定', '取消'] //按钮
                                    }, function () {
                                        var index = layer.load(0, { shade: false });
                                        $.ajax({
                                            url: "ashx/teacherCenter.ashx?action=teacherResourceSave",
                                            type: "POST",
                                            data: { saveTag: 'delete', studioResourceId: studioResourceId },
                                            success: function (res) {
                                                layer.closeAll();
                                                if (res != "go_login") {
                                                    if (res == 200) {
                                                        layer.msg('删除成功！', { icon: 1 });
                                                        setTimeout(function () {
                                                            window.location.href = "teachercentervideophoto.html";
                                                        }, 1000)
                                                    }
                                                }
                                                else {
                                                    top.location.href = "../login.html";
                                                }
                                            }
                                        });
                                    }, function () {
                                    });
                                });
                            })
                    },
                    goto: function (index) { //枫叶处理
                        var _this = this;
                        if (index == this.current) return;
                        if (index > this.allpage) {
                            this.current = this.current - 2;
                            layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
                            return false;
                        }
                        this.current = index;
                        _this.getVideo(_this.current);
                    }
                }
            });
        }
        //显示照片
        function showphoto() {
            new Vue({
                el: "#showphoto",
                data: {
                    photoArr: [],//照片
                    showItem: 4,//页码显示条数
                    allpage: '',//总页数
                    current: 1//当前页
                },
                filters: {
                    addRootFile: function addRootFile(img) {
                        return SERVERROOTFILE + img;
                    }
                },
                computed: {
                    pages: function () {
                        var pag = [];
                        if (this.current < this.showItem) { //如果当前的激活的项 小于要显示的条数
                            //总页数和要显示的条数那个大就显示多少条
                            var i = Math.min(this.showItem, this.allpage);
                            while (i) {
                                pag.unshift(i--);
                            }
                        } else { //当前页数大于显示页数了
                            var middle = this.current - Math.floor(this.showItem / 2), //从哪里开始
                                i = this.showItem;
                            if (middle > (this.allpage - this.showItem)) {
                                middle = (this.allpage - this.showItem) + 1
                            }
                            while (i--) {
                                pag.push(middle++);
                            }
                        }
                        return pag
                    }
                },
                mounted: function () {
                    var _this = this;
                    this.$nextTick(function () {
                        _this.getPhoto(1);
                    })
                },
                methods: {
                    getPhoto: function (pageIndex) {
                        var _this = this;
                        this.$http.post("ashx/teacherCenter.ashx?action=getTeacherPhoto",
                            {
                                pageIndex: pageIndex,
                                pageSize: 9
                            }
                            , { emulateJSON: true })
                            .then(function (res) {
                                if (res.body != "go_login") {
                                    _this.photoArr = res.body.rows;
                                    _this.allpage = res.body.totalPageCount;
                                }
                                else {
                                    top.location.href = "../login.html";
                                }
                            }).then(function () {
                                $('.fephotodetail ').on('click', '.feimage', function () {
                                    showPhoto($(this).find('img'));
                                })
                            }).then(function () {
                                var _this = this;
                                //$('#courseware .fepanel ul').on('click', 'li:first-child', function () {
                                //    window.location.href = "updatecourseware.html?studioResourceId=" + $(this).parent().data('id');
                                //});
                                $('#showphoto .fepanel ul').on('click', 'li:first-child', function () {
                                    var _this = this;
                                    var studioResourceId = $(_this).parent().data('id');
                                    layer.confirm('你确定要删除吗？', {
                                        btn: ['确定', '取消'] //按钮
                                    }, function () {
                                        var index = layer.load(0, { shade: false });
                                        $.ajax({
                                            url: "ashx/teacherCenter.ashx?action=teacherResourceSave",
                                            type: "POST",
                                            data: { saveTag: 'delete', studioResourceId: studioResourceId },
                                            success: function (res) {
                                                layer.closeAll();
                                                if (res != "go_login") {
                                                    if (res == 200) {
                                                        layer.msg('删除成功！', { icon: 1 });
                                                        setTimeout(function () {
                                                            window.location.href = "teachercentervideophoto.html";
                                                        }, 1000)
                                                    }
                                                }
                                                else {
                                                    top.location.href = "../login.html";
                                                }
                                            }
                                        });
                                    }, function () {
                                    });
                                });
                            })
                    },
                    goto: function (index) { //枫叶处理
                        var _this = this;
                        if (index == this.current) return;
                        if (index > this.allpage) {
                            this.current = this.current - 2;
                            layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
                            return false;
                        }
                        this.current = index;
                        _this.getPhoto(_this.current);
                    }
                }
            });
        }
        showvideo();
        showphoto();
    }

    // 资料上传
    function updatedata() {
        // 预览主页
        // $('.feteacherpersonalcenter-right-head a:contains("预览主页")').attr('href', ROOT + "teacherindex.html?teacherId=" + teacherId);
        var type = $(this).getUrlParam("type");
        if (type == '文章') {
            $('.feupdatedata .febox h1 span:last-child').addClass('active');
            $('.feupdatedata .febox h1 span:nth-child(2)').removeClass('active');
            var val = '添加文章';
            $('.feupdatedata .febox p button').html('<i class="uk-icon-plus-circle"></i>' + val);
            $('#courseware').addClass('fehidden');
            $('#article').removeClass('fehidden');
            $('#courseware').find('.pagenationbox').addClass('fehidden');
            $('#article').find('.pagenationbox').removeClass('fehidden');
        } else {
            $('.feupdatedata .febox h1 span:nth-child(2)').addClass('active');
            $('.feupdatedata .febox h1 span:last-child').removeClass('active');
            var val = '添加课件';
            $('.feupdatedata .febox p button').html('<i class="uk-icon-plus-circle"></i>' + val);
            $('#article').addClass('fehidden');
            $('#courseware').removeClass('fehidden');
            $('#courseware').find('.pagenationbox').removeClass('fehidden');
            $('#article').find('.pagenationbox').addClass('fehidden');
        }
        // 切换 课件/文章列表
        $('.feupdatedata .febox h1').on('click', 'span', function () {
            if (!$(this).hasClass('active')) {
                window.location.href ="teachercenterupdatedata.html?type=" + $(this).html();
            } else {
            }
        });
        //显示课件列表
        function showcourseware() {
            new Vue({
                el: "#courseware",
                data: {
                    coursewareArr: [],//课件
                    showItem: 4,//页码显示条数
                    allpage: '',//总页数
                    current: 1//当前页
                },
                filters: {
                    addRootFile: function addRootFile(img) {
                        return SERVERROOTFILE + img;
                    }
                },
                mounted: function () {
                    var _this = this;
                    this.$nextTick(function () {
                        _this.getCourseware(1);
                    })
                },
                computed: {
                    pages: function () {
                        var pag = [];
                        if (this.current < this.showItem) { //如果当前的激活的项 小于要显示的条数
                            //总页数和要显示的条数那个大就显示多少条
                            var i = Math.min(this.showItem, this.allpage);
                            while (i) {
                                pag.unshift(i--);
                            }
                        } else { //当前页数大于显示页数了
                            var middle = this.current - Math.floor(this.showItem / 2), //从哪里开始
                                i = this.showItem;
                            if (middle > (this.allpage - this.showItem)) {
                                middle = (this.allpage - this.showItem) + 1
                            }
                            while (i--) {
                                pag.push(middle++);
                            }
                        }
                        return pag
                    }
                },
                methods: {
                    getCourseware: function (pageIndex) {
                        var _this = this;
                        this.$http.post("ashx/teacherCenter.ashx?action=getTeacherResource",
                            {
                                resourceType: 'courseware',
                                pageIndex: pageIndex,
                                pageSize: 10
                            }
                            , { emulateJSON: true })
                            .then(function (res) {
                                if (res.body != "go_login") {
                                    _this.allpage = res.body.totalPageCount;
                                    _this.coursewareArr = res.body.rows;
                                }
                                else {
                                    top.location.href = "../login.html";
                                }
                            }).then(function () {
                                var _this = this;
                                $('#courseware .fepanel ul').on('click', 'li:first-child', function () {
                                    $(window).storager({ //fePrePage
                                        key: 'teachercenterResourceId',
                                        // value: $.getBasePath(1),
                                        value: $(this).parent().data('id'),
                                        expires: 0
                                    }).addStorage();
                                    window.location.href = "updatecourseware.html";//?studioResourceId=" + $(this).parent().data('id');
                                });
                                $('#courseware .fepanel ul').on('click', 'li:last-child', function () {
                                    var _this = this;
                                    var studioResourceId = $(_this).parent().data('id');
                                    layer.confirm('你确定要删除吗？', {
                                        btn: ['确定', '取消'] //按钮
                                    }, function () {
                                        var index = layer.load(0, { shade: false });
                                        $.ajax({
                                            url: "ashx/teacherCenter.ashx?action=teacherResourceSave",
                                            type: "POST",
                                            data: { saveTag: 'delete', studioResourceId: studioResourceId },
                                            success: function (res) {
                                                if (res != "go_login") {
                                                    layer.closeAll();
                                                    if (res == 200) {
                                                   
                                                        layer.msg('删除成功！', { icon: 1 });
                                                        setTimeout(function () {
                                                            window.location.href ="teachercenterupdatedata.html?type=课件";
                                                        }, 1000)
                                                    }
                                                }
                                                else {
                                                    top.location.href = "../login.html";
                                                }
                                            }
                                        });
                                    }, function () {
                                    });
                                });
                            })
                    },
                    goto: function (index) { //枫叶处理
                        var _this = this;
                        if (index == this.current) return;
                        if (index > this.allpage) {
                            this.current = this.current - 2;
                            layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
                            return false;
                        }
                        this.current = index;
                        _this.getCourseware(_this.current);
                    }
                }
            });
        }
        //显示文章列表
        function showarticle() {
            new Vue({
                el: "#article",
                data: {
                    articleArr: [],//课件
                    showItem: 4,//页码显示条数
                    allpage: '',//总页数
                    current: 1//当前页
                },
                filters: {
                    addRootFile: function addRootFile(img) {
                        return SERVERROOTFILE + img;
                    },
                    gotoarticle: function gotoarticle(id) {
                        return "http://www.fetv.cn/articledetail.html?articleId=" + id; //feweb/
                    },
                },
                computed: {
                    pages: function () {
                        var pag = [];
                        if (this.current < this.showItem) { //如果当前的激活的项 小于要显示的条数
                            //总页数和要显示的条数那个大就显示多少条
                            var i = Math.min(this.showItem, this.allpage);
                            while (i) {
                                pag.unshift(i--);
                            }
                        } else { //当前页数大于显示页数了
                            var middle = this.current - Math.floor(this.showItem / 2), //从哪里开始
                                i = this.showItem;
                            if (middle > (this.allpage - this.showItem)) {
                                middle = (this.allpage - this.showItem) + 1
                            }
                            while (i--) {
                                pag.push(middle++);
                            }
                        }
                        return pag
                    }
                },
                mounted: function () {
                    var _this = this;
                    this.$nextTick(function () {
                        _this.getArticle(1);
                    })
                },
                methods: {
               
                    getArticle: function (pageIndex) {
                        var _this = this;
                        this.$http.post("ashx/teacherCenter.ashx?action=getTeacherResource",
                            {
                                resourceType: 'article',
                                pageIndex: pageIndex,
                                pageSize: 10
                            }
                            , { emulateJSON: true })
                            .then(function (res) {
                                if (res.body != "go_login") {
                                    _this.articleArr = res.body.rows;
                                    _this.allpage = res.body.totalPageCount;
                                }
                                else {
                                    top.location.href = "../login.html";
                                }
                            }).then(function () {
                                var _this = this;
                                $('#article .fepanel ul').on('click', 'li:first-child', function () {
                                    $(window).storager({ //fePrePage
                                        key: 'teachercenterResourceId',
                                        // value: $.getBasePath(1),
                                        value: $(this).parent().data('id'),
                                        expires: 0
                                    }).addStorage();
                                    window.location.href = "updatearticle.html";//?articleId=" + $(this).parent().data('id');
                                });
                                $('#article .fepanel ul').on('click', 'li:last-child', function () {
                                    var _this = this;
                                    var articleId = $(_this).parent().data('id');
                                    layer.confirm('你确定要删除吗？', {
                                        btn: ['确定', '取消'] //按钮
                                    }, function () {
                                        var index = layer.load(0, { shade: false });
                                        $.ajax({
                                            url: "ashx/teacherCenter.ashx?action=articleSave",
                                            type: "POST",
                                            data: { saveTag: 'delete', articleId: articleId },
                                            success: function (res) {
                                                layer.closeAll();
                                                if (res != "go_login") {
                                                    if (res == 200) {
                                                        layer.msg('删除成功！', { icon: 1 });
                                                        setTimeout(function () {
                                                            window.location.href = "teachercenterupdatedata.html?type=文章";
                                                        }, 1000)
                                                    }
                                                }
                                                else {
                                                    top.location.href = "../login.html";
                                                }
                                            }
                                        });
                                    }, function () {
                                    });
                                });
                            })
                    },
                    goto: function (index) { //枫叶处理
                        var _this = this;
                        if (index == this.current) return;
                        if (index > this.allpage) {
                            this.current = this.current - 2;
                            layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
                            return false;
                        }
                        this.current = index;
                        _this.getArticle(_this.current);
                    }
                }
            });
        }
        showcourseware();
        showarticle();
        // 添加课件/文章详情页面显示
        $('.feupdatedata .febox p').on('click', 'button', function () {
            var text = $('.feupdatedata .febox p button').text();
            if (text == '添加课件') {
                window.location.href ="updatecourseware.html";
            } else {
                window.location.href ="updatearticle.html";
            }
        });
    }

    // 添加课程
    function addTeacherCourse(id,courseType)
    {
        if (courseType == "1") {
            try {
                $("#type").find("option[value='1']").attr("selected", true);
                $("#topkc").html("微课");
            }
            catch (e) {

            }
        }
        else {
            $("#topkc").html("录播课");
        }
        if (isEmpty(id)&& id!=undefined)
        {
            $("#saveTag").val("update");
            $("#courseId").val(id);
            if (courseType == "0") {
                $.ajax({
                    type: "post",
                    url: "ashx/teacherCenter.ashx",
                    data: { action: "getTeacherCourseDetailById", courseId: id }, //提交表单，vistor.ashx?ID=XXX
                    success: function (msg) {
                        if (msg != "go_login") {
                            if (msg != "" && msg != "error") {
                                var ob = JSON.parse(msg);
                                $("#preview").attr('src', ob.rows[0].iconPath);
                                $("#iconPath").val(ob.rows[0].iconPath);
                                $("#name").val(ob.rows[0].name);
                                $("#title").val(ob.rows[0].title);
                                $("#price").val(ob.rows[0].price);
                                $("#isFree").val(ob.rows[0].isFree);
                                $("#subjectSelect").find("option[value='" + ob.rows[0].subjectId + "']").attr("selected", true);
                                $("#gradeSelect").find("option[value='" + ob.rows[0].gradeId + "']").attr("selected", true);
                                if ($("#isFree").val() == "true") {
                                    $("#isfree").attr("checked", 'true');
                                }
                                $("#isHottest").val(ob.rows[0].isHottest);
                                if ($("#isHottest").val() == "true") {
                                    $("#isforever").attr("checked", 'true');
                                }
                                $("#preferentialPrice").val(ob.rows[0].preferentialPrice);
                                $("#introduce").html(ob.rows[0].introduce);
                                $("#content").val(ob.rows[0].detail);
                                if (ob.rows[0].isOpen == "1") {
                                    $('#R_open').attr("checked", 'checked');
                                }
                                try {
                                    UE.getEditor('editor').setContent(data[0].detail);
                                }
                                catch (e) {
                                    var t = setTimeout("setContent_detail()", 1000)
                                }
                            }
                        }
                        else {
                            top.location.href = "../login.html";
                        }
                    } //操作成功后的操作！msg是后台传过来的值
                        , error: function (XMLHttpRequest) {
                            XMLHttpRequest.responseText
                        }
                });
            }
            else {
                $.ajax({
                    type: "post",
                    url: "ashx/teacherCenter.ashx",
                    data: { action: "getMicroLectureDetailById", courseId: id }, //提交表单，vistor.ashx?ID=XXX
                    success: function (msg) {
                        if (msg != "go_login") {
                            if (msg != "" && msg != "error") {
                                var ob = JSON.parse(msg);
                                $("#preview").attr('src', ob.rows[0].iconPath);
                                $("#iconPath").val(ob.rows[0].iconPath);
                                $("#name").val(ob.rows[0].name);
                                $("#title").val(ob.rows[0].title);
                                $("#price").val(ob.rows[0].price);
                                $("#isFree").val(ob.rows[0].isFree);
                                $("#subjectSelect").find("option[value='" + ob.rows[0].subjectId + "']").attr("selected", true);
                                $("#gradeSelect").find("option[value='" + ob.rows[0].gradeId + "']").attr("selected", true);
                                $("#type").find("option[value='1']").attr("selected", true);
                                if ($("#isFree").val() == "true") {
                                    $("#isfree").attr("checked", 'true');
                                }
                                $("#isHottest").val(ob.rows[0].isHottest);
                                if ($("#isHottest").val() == "true") {
                                    $("#isforever").attr("checked", 'true');
                                }
                                $("#isOpen").val(ob.rows[0].isOpen);
                                $("#preferentialPrice").val(ob.rows[0].preferentialPrice);
                                $("#introduce").html(ob.rows[0].introduce);
                                $("#content").val(ob.rows[0].detail);
                                if (ob.rows[0].isOpen == "1") {
                                    $('#R_open').attr("checked", 'checked');
                                }
                                else {
                                    $("#R_open").prop("checked", false);
                                }
                                try {
                                    UE.getEditor('editor').setContent(data[0].detail);
                                }
                                catch (e) {
                                    var t = setTimeout("setContent_detail()", 1000)
                                }
                            }
                        }
                        else {
                            top.location.href = "../login.html";
                        }
                    } //操作成功后的操作！msg是后台传过来的值
                        , error: function (XMLHttpRequest) {
                            XMLHttpRequest.responseText
                        }
                });
            }
        }
        $('#identity-auth').on('click', 'a:first-child', function () {
            if ($('#name').val() == "") {
                layer.msg('请填写课程名称！');
                return;
            } else
                if ($('#title').val() == "") {
                    layer.msg('请填写课程标语！');
                    return;
                } else {
                    if (document.getElementById('photos').files.length == 0 && $("#iconPath").val() == "") {
                        layer.msg('您还未上传课程封面！');
                        return;
                    } else {
                        getmyContent_detail();
                        if ($("#isfree:checked").length>0) {
                            $("#isFree").val("1");
                        }
                        else {
                            $("#isFree").val("0");
                        }
                        if ($("#isforever:checked").length>0) {
                            $("#isHottest").val("1");
                        }
                        else {
                            $("#isHottest").val("0");
                        }
                        var data = new FormData($('#identity-auth')[0]);
                        data.append('saveTag', $("#saveTag").val());
                        data.append('isHottest', $("#isHottest").val());
                        data.append('isFree', $("#isFree").val());
                        data.append('detail', $("#detail").val());
                        data.append('type', $("#type").val());
                        var index = layer.load(0, { shade: false });
                        $.ajax({
                            url: "ashx/teacherCenter.ashx?action=teacherCourseSave",
                            type: "POST",
                            data: data,
                            processData: false,  // 告诉jQuery不要去处理发送的数据
                            contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                            success: function (res) {
                                layer.closeAll();
                                if (res != "go_login") {
                                    if (res != "" && res != "error") {
                                        if ($("#saveTag").val() == "add") {
                                            if ($("#type").val() == "1") {
                                                window.location.href = "recordedcourseCatalog.html?tag=add&fromUrl=recordedcoursedetail&v_table=fe_microLecture&v_id=" + res + "&p_id=0&description=微课视频";
                                            }
                                            else {
                                                window.location.href = "recordedcourseCatalog.html?tag=add&fromUrl=recordedcoursedetail&v_table=courseCatalog&v_id=" + res + "&p_id=0&description=教师视频";
                                            }
                                        }
                                        else {
                                            if ($("#type").val() == "1") {
                                                window.location.href = "teachercentermicroLecture.html";
                                            }
                                            else {
                                                window.location.href = "teachercenterrecordedcourse.html";
                                            }
                                        }
                                    } else {
                                        layer.msg('保存课程失败！');
                                        setTimeout(function () { window.location.reload() }, 1000);
                                    }
                                }
                                else {
                                    top.location.href = "../login.html";
                                }
                            }
                        });
                    }
                }
        });
    }
    // 添加课件详情
    function updatecourseware() {
        // 预览主页
        //$('.feteacherpersonalcenter-right-head a:contains("预览主页")').attr('href', ROOT + "teacherindex.html?teacherId=" + teacherId);
        var studioResourceId = $(window).storager({ key: 'teachercenterResourceId' }).readStorage();//$(this).getUrlParam("studioResourceId");
        var isEidtCourseWare = false;    //全局变量 判断是否是编辑还是新增
        if (studioResourceId == undefined || studioResourceId == 'undefined' || studioResourceId == '') {

        } else {
            isEidtCourseWare = true;
            $.ajax({//获取内容
                url: "ashx/teacherCenter.ashx?action=getTeacherResourceById",
                type: "POST",
                data: { studioResourceId: studioResourceId },
                success: function (res) {
                    var data = JSON.parse(res);
                    if (data.length < 1) {

                    } else {
                        $('#updatefile').parent().prev().val(data[0].resourcePath);
                        $('#coursecarename').val(data[0].title);
                        $('#addcoursebg').prev().attr('src', SERVERROOTFILE + data[0].iconPath);
                        $('.feaddcourseware textarea').val(data[0].note);
                        if (data[0].isOpen == "1")
                        {
                            $('#R_open').attr("checked", 'checked');
                        }
                    }
                }
            });
        }
        // 上传课程封面图片
        $('.feupdatedata').on('change', '#addcoursebg', function () {
            if ($(this).val().match(/.jpg|.gif|.png|.bmp/i)) {
                var dom = $(this).prev();
                upload(this, dom);
            } else {
                layer.msg("对不起，系统仅支持标准格式的照片，请您调整格式后重新上传，谢谢 !");
            }
            // $(this).val('');
        });
        // 课件上传文件地址
        $('.feaddcourseware').on('change', '#updatefile', function () {
            var href = $(this).val();
            $(this).parent().prev().val(href);
        });
        // 添加课件详情
        $('.feaddcourseware').on('click', '.febox>h2 a', function () {
            if ($('#updatefile').val() == "" && !isEidtCourseWare) {
                layer.msg('请上传课件文件！');
                return;
            } else {
                if ($('#coursecarename').val() == "") {
                    layer.msg('标题不能为空！');
                    return;
                } else {
                    if ($('#addcoursebg').val() == null && !isEidtCourseWare) {
                        layer.msg('请上传课件封面图片！');
                        return;
                    } else {
                        if ($('#addcourseware textarea').val()=="") {
                            layer.msg('课件简介不能为空！');
                            return;
                        } else {
                            var data = new FormData($('#addcourseware')[0]);
                            var text = $('.feaddcourseware .febox textarea').val();
                            data.append('note', text);
                            if (isEidtCourseWare) {
                                data.append('saveTag', 'update');
                                data.append('studioResourceId', studioResourceId);
                            } else {
                                data.append('saveTag', 'add');
                                data.append('studioResourceId', '');
                            }
                            var index = layer.load(0, { shade: false });
                            $.ajax({
                                url: "ashx/teacherCenter.ashx?action=teacherResourceSave",
                                type: "POST",
                                data: data,
                                processData: false,  // 告诉jQuery不要去处理发送的数据
                                contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                                success: function (res) {
                                    layer.closeAll();
                                    if (res != "go_login") {
                                        if (res == 200) {
                                            layer.msg('保存成功!');
                                            setTimeout(function () {
                                                window.location.href = "teachercenterupdatedata.html?type=课件";
                                            }, 1000);
                                        } else {
                                            layer.msg('保存失败!');
                                        }
                                    }
                                    else {
                                        top.location.href = "../login.html";
                                    }
                                }
                            });
                        }
                    }
                }
            }
        });
    }

    // 添加文章详情
    function updatearticle() {
        var ue = UE.getEditor('editor');
        // 预览主页
        //$('.feteacherpersonalcenter-right-head a:contains("预览主页")').attr('href', ROOT + "teacherindex.html?teacherId=" + teacherId);
        var articleId = $(window).storager({ key: 'teachercenterResourceId' }).readStorage();//$(this).getUrlParam("articleId");
        console.log(articleId);
        var isEidtArticle = false;    //全局变量 判断是否是编辑还是新增
        if (articleId == undefined || articleId == 'undefined' || articleId == '') {
        } else {
        
            isEidtArticle = true;
            $.ajax({//获取内容
                url: "ashx/teacherCenter.ashx?action=getArticleById",
                type: "POST",
                data: { articleId: articleId },
                success: function (res) {
                    var data = JSON.parse(res);
                    if (data.length < 1) {

                    } else {
                        $('#title').val(data[0].title);
                        $('#addarticlebg').prev().attr('src', SERVERROOTFILE + data[0].iconPath);
                        $('#addarticle textarea').val(data[0].introduce);
                        $('#content').val(data[0].content);
                        try {
                            UE.getEditor('editor').setContent(data[0].content);
                        }
                        catch (e) {
                            var t = setTimeout("setContent_detail()", 1000)
                        }
                    }
                }
            });
        }
        // 上传文章封面图片
        $('.feupdatedata').on('change', '#addarticlebg', function () {
            if ($(this).val().match(/.jpg|.gif|.png|.bmp/i)) {
                var dom = $(this).prev();
                upload(this, dom);
            } else {
                layer.msg("对不起，系统仅支持标准格式的照片，请您调整格式后重新上传，谢谢 !");
            }
            // $(this).val('');
        });
        // 添加文章详情
        $('.feaddarticle').on('click', '.febox>h2 a', function () {
            if ($("#clickCount").val() == "1")
            {
                return;
            }
            $("#clickCount").val("1");
            if ($('#title').val()=="") {
                layer.msg('标题不能为空！');
                return;
            } else {
                if ($('#addarticlebg').val() == "" && !isEidtArticle) {
                    layer.msg('请上传文章封面图片！');
                    return;
                } else {
                    if ($('#addarticle textarea').val()=="") {
                        layer.msg('文章简介不能为空！');
                        return;
                    } else {
                        var index = layer.load(0, { shade: false });
                        var data = new FormData($('#addarticle')[0]);
                        var text = $('.feaddarticle .febox textarea').val();
                        data.append('introduce', text);
                        var content = UE.getEditor('editor').getContent();
                        data.append('content', content);
                        if (isEidtArticle) {
                            data.append('saveTag', 'update');
                            data.append('articleId', articleId);
                        } else {
                            data.append('saveTag', 'add');
                            data.append('articleId', '');
                        }
                        $.ajax({
                            url: "ashx/teacherCenter.ashx?action=articleSave",
                            type: "POST",
                            data: data,
                            processData: false,  // 告诉jQuery不要去处理发送的数据
                            contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                            success: function (res) {
                                layer.closeAll();
                                if (res != "go_login") {
                                    if (res == 200) {
                                        layer.msg('保存成功!');
                                        setTimeout(function () {
                                            $("#clickCount").val("0");
                                            window.location.href = "teachercenterupdatedata.html?type=文章";
                                        }, 500)
                                    } else {
                                        layer.msg('保存失败!');
                                        $("#clickCount").val("0");
                                    }
                                }
                                else {
                                    top.location.href = "../login.html";
                                }
                            }
                        });
                    }
                }
            }
        });
    }

    // 认证设置
    function authsetting() {
        // 预览主页
        //$('.feteacherpersonalcenter-right-head a:contains("预览主页")').attr('href', ROOT + "teacherindex.html?teacherId=" + teacherId);
        // 认证按钮
        $('.feauthsetting .fetitle').on('click', 'button', function () {
            if ($(this).hasClass('active'))
            {
                return;
            }
            if (!$(this).parent().hasClass('active')) {
                $(this).parent().addClass('active');
                // $(this).parent().next().removeClass('fehidden');
                $(this).parent().next().slideDown(500);
            } else {
            }
        });
        // 身份认证保存按钮
        $('#identity-auth').on('click', 'a:first-child', function () {
        
            if ($('#idcard').val() == "") {
                layer.msg('请填写身份证！');
                return;
            }
                //} else if (!validateIdCard($('#idcard').val()))
                //{
                //    layer.msg('身份证格式不正确！');
                //    return;
                //}
            else {
                if (document.getElementById('handheldphoto').files.length == 0) {
                    layer.msg('您还未上传手持身份证照片！');
                    return;
                } else {
                    if (document.getElementById('idface').files.length == 0) {
                        layer.msg('您还未上传身份证正面照片！');
                        return;
                    } else {
                        var index = layer.load(0, { shade: false });
                        var data = new FormData($('#identity-auth')[0]);
                        data.append('saveTag', 'update');
                        $.ajax({
                            url: "ashx/teacherCenter.ashx?action=teacheridCardPhotoSave",
                            type: "POST",
                            data: data,
                            processData: false,  // 告诉jQuery不要去处理发送的数据
                            contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                            success: function (res) {
                                layer.closeAll();
                                if (res != "go_login") {
                                    if (res == 200) {
                                        layer.msg('数据已提交');
                                        setTimeout(function () { window.location.reload() }, 1000);
                                    } else {
                                        layer.msg('保存数据失败！');
                                        setTimeout(function () { window.location.reload() }, 1000);
                                    }
                                }
                                else {
                                    top.location.href = "../login.html";
                                }
                            }
                        });
                    }
                }
            }
        });
        // 教师认证保存按钮
        $('#teacher-auth').on('click', 'a:first-child', function () {
            if (document.getElementById('teachercard').files.length == 0) {
                layer.msg('您还未上传图片！');
                return;
            } else {
                var index = layer.load(0, { shade: false });
                var data = new FormData($('#teacher-auth')[0]);
                data.append('saveTag', 'update');
                $.ajax({
                    url: "ashx/teacherCenter.ashx?action=teacherCertificationSave",
                    type: "POST",
                    data: data,
                    processData: false,  // 告诉jQuery不要去处理发送的数据
                    contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                    success: function (res) {
                        layer.closeAll();
                        if (res != "go_login") {
                            if (res == 200) {
                                layer.msg('数据已提交');
                                setTimeout(function () { window.location.reload() }, 1000);
                            } else {
                                layer.msg('保存数据失败！');
                                setTimeout(function () { window.location.reload() }, 1000);
                            }
                        }
                        else {
                            top.location.href = "../login.html";
                        }
                    }
                });
            }
        });
        // 学历认证保存按钮
        $('#education-auth').on('click', 'a:first-child', function () {
            if (document.getElementById('educationcard').files.length == 0) {
                layer.msg('您还未上传图片!');
                return;
            } else {
                var index = layer.load(0, { shade: false });
                var data = new FormData($('#education-auth')[0]);
                data.append('saveTag', 'update');
                $.ajax({
                    url: "ashx/teacherCenter.ashx?action=teacherEducationSave",
                    type: "POST",
                    data: data,
                    processData: false,  // 告诉jQuery不要去处理发送的数据
                    contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                    success: function (res) {
                        layer.closeAll();
                        if (res != "go_login") {
                            if (res == 200) {
                                layer.msg('数据已提交');
                                setTimeout(function () { window.location.reload() }, 1000);
                            } else {
                                layer.msg('保存数据失败！');
                                setTimeout(function () { window.location.reload() }, 1000);
                            }
                        }
                        else {
                            top.location.href = "../login.html";
                        }
                    }
                });
            }
        });
        //专业资质认证保存按钮
        $('#aptitude-auth').on('click', 'a:first-child', function () {
            if (document.getElementById('aptitudecard').files.length == 0) {
                layer.msg('您还未上传图片！');
                return;
            } else {
                var index = layer.load(0, { shade: false });
                var data = new FormData($('#aptitude-auth')[0]);
                data.append('saveTag', 'update');
                $.ajax({
                    url: "ashx/teacherCenter.ashx?action=teacherCapabilitySave",
                    type: "POST",
                    data: data,
                    processData: false,  // 告诉jQuery不要去处理发送的数据
                    contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                    success: function (res) {
                        layer.closeAll();
                        if (res != "go_login") {
                            if (res == 200) {
                                layer.msg('数据已提交');
                                setTimeout(function () { window.location.reload() }, 1000);
                            } else {
                                layer.msg('保存数据失败！');
                                setTimeout(function () { window.location.reload() }, 1000);
                            }
                        }
                        else {
                            top.location.href = "../login.html";
                        }
                    }
                });
            }
        });
        // 取消按钮
        $('.feauthsetting .feauth h2').on('click', 'a:last-child', function () {
            $(this).parent().parent().parent().prev().removeClass('active');
            $(this).parent().parent().parent().slideUp(500);
            window.location.reload();
        });
        $('.feupdatephoto').on('change', 'input', function () {
            if ($(this).val().match(/.jpg|.gif|.png|.bmp/i)) {
                var dom = $(this).prev();
                upload(this, dom);
            } else {
                layer.msg("对不起，系统仅支持标准格式的照片，请您调整格式后重新上传，谢谢 !");
            }
            // $(this).val('');
        })
    }

    // 我的工作室显示页面
    function mystudio() {
        $("#jump").attr("href", "createstudio.html");
        new Vue({
            el: "#femystudio",
            data: {
                mystudio: []
            },
            filters: {
                addRootFile: function addRootFile(img) {
                    return SERVERROOTFILE + img;
                },
                addStudioDetailRoot: function addStudioDetailRoot(id) {
                    return "teachercentermystudiodetail.html?teachingStudioId=" + id;
                }
            },
            mounted: function () {
                var _this = this;
                this.$nextTick(function () {
                    _this.getstudio();
                })
            },
            methods: {
                getstudio: function () {
                    var _this = this;
                    this.$http.post("ashx/teacherCenter.ashx?action=showTeachingStudioByTeacherId",
                        {
                            pageSize: 9
                        }
                        , { emulateJSON: true })
                        .then(function (res) {
                            if (isEmptyObject(res.body[0])) {
                                return false;
                            } else {
                                _this.mystudio = res.body;
                            }
                        }).then(function () {
                            $('.fevediodetail .fepanel ul').on('click', 'li:last-child', function () {
                                var _this = this;
                                var teachingStudioId = $(_this).parent().data('id');
                                layer.confirm('你确定要删除吗？', {
                                    btn: ['确定', '取消'] //按钮
                                }, function () {
                                    var index = layer.load(0, { shade: false });
                                    $.ajax({
                                        url: "ashx/teacherCenter.ashx?action=teachingStudioSave",
                                        type: "POST",
                                        data: { saveTag: 'delete', teachingStudioId: teachingStudioId, provinceId: 0 },
                                        success: function (res) {
                                            layer.closeAll();
                                            if (res != "go_login") {
                                                //layer.alert(res);
                                                layer.msg(res, { icon: 1 });
                                                setTimeout(function () {
                                                    window.location.href = "teachercentermystudio.html";
                                                }, 2000)
                                                //if (res == 200) {
                                                //    layer.msg('提交成功！', { icon: 1 });
                                                //    setTimeout(function () {
                                                //        window.location.href = "teachercentermystudio.html";
                                                //    }, 1000)
                                                //}
                                            }
                                            else {
                                                top.location.href = "../login.html";
                                            }
                                        }
                                    });
                                }, function () {
                                });
                            });
                            $('.fevediodetail .fepanel ').on('click', '.feimage', function () {
                                var teachingStudioId = $(this).parent().find('ul').data('id');
                                $(window).storager({ //fePrePage
                                    key: 'teachingStudioid',
                                    // value: $.getBasePath(1),
                                    value: teachingStudioId,
                                    expires: 0
                                }).addStorage();
                                window.location.href = "teachercentermystudiodetail.html";//?teachingStudioId=" + teachingStudioId;
                            });
                        })

                }
            }
        })
    }

    // 创建工作室
    function createstudio() {
        new Vue({
            el: "#fecreatestudio",
            data: {
                city: [],
                educationalLevel: [],
                grade: []
            },
            filters: {
                addRootFile: function addRootFile(img) {
                    return SERVERROOTFILE + img;
                },
                addStudioRoot: function addStudioRoot(id) {
                    return "teacherstudio.html?teachingStudioId=" + id;
                },
            },
            mounted: function () {
                var _this = this;
                this.$nextTick(function () {
                    _this.getcity();
                    _this.geteducationalLevel();
                    _this.getgrade();
                })
            },
            methods: {
                getcity: function () {
                    var _this = this;
                    this.$http.post(SERVERROOTDATA + "City.ashx?action=getCity",
                        {
                            provinceId: 1
                        }
                        , { emulateJSON: true })
                        .then(function (res) {
                            _this.city = res.body;
                        })
                },
                geteducationalLevel: function () {
                    var _this = this;
                    this.$http.post(SERVERROOTDATA + "EducationalLevel.ashx?action=getEducationalLevel",
                        {
                            organId: 0
                        }
                        , { emulateJSON: true })
                        .then(function (res) {
                            _this.educationalLevel = res.body;
                        }).then(function () {
                            var _this = this;
                            $('#period').on('change', function () {
                                _this.$http.post(SERVERROOTDATA + "Subject.ashx?action=getSubject",
                                    {
                                        educationalLevelId: $('#period').val(),
                                        gradeId: ''
                                    }
                                    , { emulateJSON: true })
                                    .then(function (res) {
                                        _this.grade = res.body;
                                    })
                            })


                        })
                },
                getgrade: function () {
                    var _this = this;
                    this.$http.post(SERVERROOTDATA + "Subject.ashx?action=getSubject",
                        {
                            educationalLevelId: $('#period').val(),
                            gradeId: ''
                        }
                        , { emulateJSON: true })
                        .then(function (res) {
                            _this.grade = res.body;
                        })
                }
            }
        })
        // 更换工作室头像预览
        $('.fecreatestudio').on('change', '#addphoto', function () {
            if ($(this).val().match(/.jpg|.gif|.png|.bmp/i)) {
                var dom = $(this).prev();
                upload_new(this, dom);
            } else {
                layer.msg("对不起，系统仅支持标准格式的照片，请您调整格式后重新上传，谢谢 !");
            }
            // $(this).val('');
        });
        $('.fecreatestudio>p').on('click', 'a', function () {
            if ($('#addphoto').val()=="") {
                layer.msg('请添加工作室封面！');
                return;
            } else {
                if ($('#studioname').val()=="") {
                    layer.msg('工作室名称不能为空！');
                    return;
                } else {
                    var index = layer.load(0, { shade: false });
                    var data = new FormData($('#createstudio-form')[0]);
                    data.append('saveTag', 'add');
                    data.append('teachingStudioId', "0");
                    data.append('provinceId', "0");
                    data.append('cityId', $("#citySelect").val());
                    data.append('educationalLevelId', $("#educationalSelect").val());
                    data.append('subjectId', $("#subjectSelect").val());
                    data.append('name', $("#studioname").val());
                    data.append('introduce', $("#introduces").val());
                    $.ajax({
                        url: "ashx/teacherCenter.ashx?action=teachingStudioSave",
                        type: "POST",
                        data: data,
                        processData: false,  // 告诉jQuery不要去处理发送的数据
                        contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                        success: function (res) {
                            layer.closeAll();
                            if (res != "go_login") {
                                layer.msg(res);
                                setTimeout(function () {
                                    window.location.href = "teachercentermystudio.html";
                                }, 1000)
                            }
                            else {
                                top.location.href = "../login.html";
                            }
                        }
                    });
                }
            }

        })
    }

    // 退出工作室
    function outStudio(StudioId)
    {
        layer.confirm('你确定要退出吗？', {
            btn: ['确定', '取消'] //按钮
        }, function () {
            $.ajax({
                type: "post",
                url: "ashx/teacherCenter.ashx",
                data: { action: "outSideStuodio", studioRsId: StudioId, tag: "delete" }, //提交表单，vistor.ashx?ID=XXX
                success: function (msg) {
                    if (msg != "go_login") {
                        layer.msg(msg);
                        setTimeout(function () {
                            window.location.reload();
                        }, 1000)
                    }
                    else {
                        top.location.href = "../login.html";
                    }
                } //操作成功后的操作！msg是后台传过来的值
                   , error: function (ex) {
                       alert(ex);
                   }
            });
        })
   
    }

    // 我加入的工作室
    function getIntoStuodio()
    {
        $.ajax({
            async: false,
            type: "post",
            url: "ashx/teacherCenter.ashx",
            data: { action: "getIntoStuodio" }, //提交表单，vistor.ashx?ID=XXX
            success: function (msg) {
                if (msg != "go_login") {
                    var ob = JSON.parse(msg);
                    var num = ob.total;
                    var str = "";
                    for (var i = 0; i < num; i++) {
                        str += "<li><div class=\"span4\"><div class=\"feimage\"><img src=\"http://www.fetv.cn/fe/" + ob.rows[i].iconPath + "\" alt=\"\"></div><h3>" + ob.rows[i].name + "</h3></div><div class=\"span8\"><div class=\"febox\"><a target=\"_blank\" href=\"http://www.fetv.cn/teacherstudio.html?teachingStudioId=" + ob.rows[i].organId + "\"+>进入工作室</a><a onclick=\"outStudio(" + ob.rows[i].studioTeacherRsId + ")\">退出工作室</a></div></div></li>";///feweb
                    }
                    //str += "</ul>";
                    $("#list").html(str);
                    //$("#courseName").html(ob.rows[0].courseName);
                }
                else {
                    top.location.href = "../login.html";
                }
            } //操作成功后的操作！msg是后台传过来的值
                    , error: function (ex) {
                        alert(ex);
                    }
        });
    }

    // 我的工作室基本信息
    function getmystudio(teachingStudioId)
    {
        $.ajax({
            type: "post",
            url: "ashx/teacherCenter.ashx",
            data: { action: "getTeachingStudio", organId: teachingStudioId }, //提交表单，vistor.ashx?ID=XXX
            success: function (msg) {
                if (msg != "go_login") {
                    var ob = JSON.parse(msg);
                    $("#studiohead").css('background', "url(\"" + SERVERROOTFILE + ob.rows[0].iconPath + "\") no-repeat center");
                    // $("#studiohead").css('background',"url(\"" +  SERVERROOTFILE + ob.rows[0].iconPath + "\") no-repeat center");
                    $("#studioname").val(ob.rows[0].name);
                    $("#s_city").html(ob.rows[0].city);
                    $("#s_educational").html(ob.rows[0].educational);
                    $("#s_subject").html(ob.rows[0].subject);
                    $("#introduces").val(ob.rows[0].introduce);
                    $("#citySelect").find("option[value='" + ob.rows[0].cityId + "']").attr("selected", true);
                    $("#educationalSelect").find("option[value='" + ob.rows[0].educationalLevelId + "']").attr("selected", true);
                    $("#subjectSelect").find("option[value='" + ob.rows[0].subjectId + "']").attr("selected", true);
                }
                else {
                    top.location.href = "../login.html";
                }
            } //操作成功后的操作！msg是后台传过来的值
                    , error: function (ex) {
                        layer.msg(ex);
                    }
        });
    }

    // 我的工作室详细页面
    function mystudiodetail(teachingStudioId, htmlType) {
        getmystudio(teachingStudioId);
        if (htmlType == undefined || htmlType == "")
        {
            $(".fetabs li:first-child span").addClass("active");
            $(".fetabs li:first-child").siblings().find("span").removeClass("active");
            var showdom = $('.femystudiodetail .fecontent>div:nth-child(1)');
            showdom.css("display","block");
            showdom.siblings().hide();
        }
        else if(htmlType == "1")
        {
            $(".fetabs li:nth-child(2) span").addClass("active");
            $(".fetabs li:nth-child(2)").siblings().find("span").removeClass("active");
            var showdom = $('.femystudiodetail .fecontent>div:nth-child(2)');
            showdom.css("display", "block");
            showdom.siblings().hide();
        }
        else if (htmlType == "2")
        {
            $(".fetabs li:nth-child(3) span").addClass("active");
            $(".fetabs li:nth-child(3)").siblings().find("span").removeClass("active");
            var showdom = $('.femystudiodetail .fecontent>div:nth-child(3)');
            showdom.css("display", "block");
            showdom.siblings().hide();
        }
        else if (htmlType == "3") {
            $(".fetabs li:nth-child(4) span").addClass("active");
            $(".fetabs li:nth-child(4)").siblings().find("span").removeClass("active");
            var showdom = $('.femystudiodetail .fecontent>div:nth-child(4)');
            showdom.css("display", "block");
            showdom.siblings().hide();
        }
        $('.femystudiodetail ul li').on('click', 'span', function () {
            $(this).parent().siblings().find('span').removeClass('active');
            $(this).addClass('active');
            var id = $(this).data('id');
            var showdom = $('.femystudiodetail .fecontent>div:nth-child(' + id + ')');
            // console.log(showdom);
            showdom.fadeIn(1000);
            showdom.siblings().hide();
        });
        // 资讯显示
        new Vue({
            el: "#feinformation",
            data: {
                information: []
            },
            filters: {
                addRootFile: function addRootFile(img) {
                    return SERVERROOTFILE + img;
                },
                addStudioRoot: function addStudioRoot(id) {
                    return "http://www.fetv.cn/" + "teacherstudio.html?teachingStudioId=" + id;//feweb/
                },
                gotoNew: function gotoNew(id)
                {
                    return "http://www.fetv.cn/" + "newsdetail.html?newsId=" + id;//feweb
                }
            },
            mounted: function () {
                var _this = this;
                this.$nextTick(function () {
                    _this.getinformation();
                })
            },
            methods: {
                getinformation: function () {
                    var _this = this;
                    this.$http.post(SERVERROOTDATA + "News.ashx?action=getTeachingStudioNews",
                        {
                            teachingStudioId: teachingStudioId,
                            pageIndex: 1,
                            pageSize: 10
                        }
                        , { emulateJSON: true })
                        .then(function (res) {
                            _this.information = res.body.rows;
                        }).then(function () {
                            var _this = this;
                            $('#feinformation .fepanel ul').on('click', 'li:first-child', function () {
                                var _this = this;
                                var nId = $(_this).parent().data('id');
                                layer.open({
                                    type: 2,
                                    title: '添加工作室资讯',
                                    shadeClose: true,
                                    shade: false,
                                    maxmin: true, //开启最大化最小化按钮
                                    area: ['800px', '700px'],
                                    content: 'addstudioinformation.html?teachingStudioId=' + teachingStudioId+"&nid="+nId
                                });
                            });
                            $('#feinformation .fepanel ul').on('click', 'li:last-child', function () {
                                var _this = this;
                                var nId = $(_this).parent().data('id');
                                layer.confirm('你确定要删除吗？', {
                                    btn: ['确定', '取消'] //按钮
                                }, function () {
                                    var index = layer.load(0, { shade: false });
                                    $.ajax({
                                        url: "ashx/teacherCenter.ashx?action=studioNewsSave",
                                        type: "POST",
                                        data: { tag: 'delete', newsId: nId },
                                        success: function (res) {
                                            layer.closeAll();
                                            if (res != "go_login") {
                                                if (res != "") {
                                                    layer.msg('删除成功！', { icon: 1 });
                                                    setTimeout(function () {
                                                        refreshs(teachingStudioId, 1)
                                                    }, 500)
                                                }
                                            }
                                            else {
                                                top.location.href = "../login.html";
                                            }
                                        }
                                    });
                                }, function () {
                                });
                            });
                        })
                }
            }
        });
        // 公告显示
        new Vue({
            el: "#feannouncement",
            data: {
                notice: []
            },
            filters: {
                addRootFile: function addRootFile(img) {
                    return SERVERROOTFILE + img;
                }
                // addStudioRoot: function addStudioRoot(id) {
                //     return ROOT + "teacherstudio.html?teachingStudioId=" + id;
                // }
            },
            mounted: function () {
                var _this = this;
                this.$nextTick(function () {
                    _this.getnotice();
                    _this.addActivity();
                })
            },
            methods: {
                getnotice: function () {
                    var _this = this;
                    this.$http.post("../website/ashx/Activity.ashx?action=getStudioActivity",
                        {
                            teachingStudioId: teachingStudioId,
                            pageIndex: 1,
                            pageSize: 10
                        }
                        , { emulateJSON: true })
                        .then(function (res) {
                            if (res.body != "go_login") {
                                _this.notice = res.body.rows;
                            }
                            else {
                                top.location.href = "../login.html";
                            }
                        })
                },
                addActivity: function ()
                {
                    // 添加公告
                    $('.feannouncement>p').on('click', 'button', function () {
                        layer.open({
                            type: 2,
                            title: '添加工作室公告',
                            shadeClose: true,
                            shade: false,
                            maxmin: true, //开启最大化最小化按钮
                            area: ['800px', '700px'],
                            content: 'addnotice.html?teachingStudioId=' + teachingStudioId+'&saveTag=add'
                        });
                    })
                },
                updateActivity: function (id) {
                    // 添加公告
                    layer.open({
                        type: 2,
                        title: '修改工作室公告',
                        shadeClose: true,
                        shade: false,
                        maxmin: true, //开启最大化最小化按钮
                        area: ['800px', '700px'],
                        content: 'addnotice.html?teachingStudioId=' + teachingStudioId + '&saveTag=update' + '&id=' + id
                    });
                },
                deleteActivity: function (id) {
                    var _this = this;
                    layer.confirm('你确定要删除吗？', {
                        btn: ['确定', '取消'] //按钮
                    }, function () {
                        $.ajax({
                            url: "../website/ashx/Activity.ashx?action=StudioActivitySave",
                            type: "POST",
                            data: { organId: teachingStudioId, saveTag: 'delete', activityId: id, tid: 0 },
                            success: function (res) {
                                if (res != "go_login") {
                                    if (res != "") {
                                        layer.msg('删除成功！', { icon: 1 });
                                        setTimeout(function () {
                                            refreshs(teachingStudioId, 2)
                                            //window.location.href = "teachercentermystudiodetail.html?teachingStudioId=" + teachingStudioId + "&htmlType=1";
                                            //window.location.reload();
                                        }, 500)
                                    }
                                }
                                else {
                                    top.location.href = "../login.html";
                                }
                            }
                        });
                        //this.$http.post("../website/ashx/Activity.ashx?action=StudioActivitySave",
                        //{
                        //    organId: teachingStudioId,
                        //    activityId: id,
                        //    tid: 0,
                        //    saveTag: "delete"
                        //}
                        //, { emulateJSON: true })
                        //.then(function (res) {
                        //    layer.msg(res);
                        //    layer.closeAll();
                        //    window.location.reload();
                        //})
                    
                    }, function () {
                    });
                
                }
            }
        });
        // 成员显示
        new Vue({
            el: "#femymenber",
            data: {
                menber: []
            },
            filters: {
                addRootFile: function addRootFile(img) {
                    return SERVERROOTFILE + img;
                },
                addStudioRoot: function addStudioRoot(id) {
                    return "http://www.fetv.cn/" + "teacherstudio.html?teachingStudioId=" + id;//feweb/
                }
            },
            mounted: function () {
                var _this = this;
                this.$nextTick(function () {
                    _this.getmenber();
                })
            },
            methods: {
                getmenber: function () {
                    var _this = this;
                    this.$http.post("../website/ashx/TeachingStudio.ashx?action=getStudioMember",
                        {
                            teachingStudioId: teachingStudioId,
                            pageIndex: 1,
                            pageSize: 10
                        }
                        , { emulateJSON: true })
                        .then(function (res) {
                            _this.menber = res.body.rows;
                        })
                },
                deleteMember: function (id)
                {
                    var _this = this;
                    layer.confirm('你确定要删除吗？', {
                        btn: ['确定', '取消'] //按钮
                    }, function () {
                        $.ajax({
                            url: "ashx/teacherCenter.ashx?action=saveStudioTeacherRs",
                            type: "POST",
                            data: { saveTag: 'delete', studioTeacherRsId: id },
                            success: function (res) {
                                if (res != "go_login") {
                                    if (res != "无法删除") {
                                        layer.msg(res);
                                        setTimeout(function () {
                                            window.location.reload();
                                        }, 500)
                                    }
                                    else {
                                        layer.msg(res);
                                    }
                                }
                                else {
                                    top.location.href = "../login.html";
                                }
                            }
                        });
                    })
                }
            }
        });
        // 基本信息-编辑按钮
        $('.femystudiodetail').on('click', '.febasicinformation>button', function () {
            if (!$(this).hasClass('fehidden')) {
                $('.febasicinformation .fepanel s:not("#studiohead")').addClass('fehidden');
                // $('.febasicinformation .fepanel>img').addClass('fehidden');
                $('.febasicinformation>button').addClass('fehidden');
                $('.febasicinformation .fepanel select').removeClass('fehidden');
                $('.febasicinformation .fepanel .feimage input').prop('disabled', '');
                // $('.febasicinformation .fepanel .feimage').removeClass('fehidden');
                $('.febasicinformation .fepanel b').removeClass('fehidden');
                $('.febasicinformation .fepanel>input').prop('disabled', '');
                $('.febasicinformation .fepanel>textarea').prop('disabled', '');
                $('.febasicinformation p').removeClass('fehidden');
            }
        })
        // 基本信息-保存按钮
        $('.femystudiodetail .febasicinformation>p').on('click', 'button', function () {
            var data = new FormData($('#basicinformation')[0]);
            data.append('saveTag', 'update');
            data.append('teachingStudioId', teachingStudioId);
            data.append('provinceId', "0");
            data.append('cityId', $("#citySelect").val());
            data.append('educationalLevelId', $("#educationalSelect").val());
            data.append('subjectId', $("#subjectSelect").val());
            data.append('name', $("#studioname").val());
            data.append('introduce', $("#introduces").val());
            $.ajax({
                url: "ashx/teacherCenter.ashx?action=teachingStudioSave",
                type: "POST",
                data: data,
                processData: false,  // 告诉jQuery不要去处理发送的数据
                contentType: false   // 告诉jQuery不要去设置Content-Type请求头
            });
            var address = $('.febasicinformation #address option:selected').text();
            $('.febasicinformation #address').prev().html(address);
            var period = $('.febasicinformation #period option:selected').text();
            $('.febasicinformation #period').prev().html(period);
            var subject = $('.febasicinformation #subject option:selected').text();
            $('.febasicinformation #subject').prev().html(subject);
            $('.febasicinformation .fepanel s').removeClass('fehidden');
            // $('.febasicinformation .fepanel>img').removeClass('fehidden');
            $('.febasicinformation>button').removeClass('fehidden');
            $('.febasicinformation .fepanel select').addClass('fehidden');
            // $('.febasicinformation .fepanel .feimage').addClass('fehidden');
            $('.febasicinformation .fepanel .feimage input').prop('disabled', 'true');
            $('.febasicinformation .fepanel b').addClass('fehidden');
            $('.febasicinformation .fepanel>input').prop('disabled', 'true');
            $('.febasicinformation .fepanel>textarea').prop('disabled', 'true');
            $('.febasicinformation p').addClass('fehidden');
        });
        // 更换工作室头像预览
        $('.febasicinformation').on('change', '.feimage input', function () {
            if ($(this).val().match(/.jpg|.gif|.png|.bmp/i)) {
                var dom = $(this).prev();
                upload(this, dom);
                // $(this).val('');
            } else {
                layer.msg("对不起，系统仅支持标准格式的照片，请您调整格式后重新上传，谢谢 !");
            }
        })
        // 公告
        $('.feannouncement-content').on('click', '.fetitle', function () {
            var text = $(this).html();
            var p = '公告正文公告正文公告正文公告正文公告正文公告正文公告正文公告文公告正文公告正文公告正文公告正文公告正文公告正文公告正文公告正文公告正文公告正文公告正文公告正文公告正文公告正文公告正文公告正文公告正文公告正文公告正文公告正文' +
                '公告正文公告正文公告正文公告正文公告正文公告正文公告正文公告正文公告正文公告正正文公告正文公告正文公告正文公告正文公告正文公告正文';
            var teacher = $(this).parent().find('.fepublisher').html();
            var time = $(this).parent().find('.fetime').html();
            popbox(text, p, teacher, time);
        })
        // 添加资讯
        $('.feconsultation').on('click', '.feaddconsultation', function () {
            layer.open({
                type: 2,
                title: '添加工作室资讯',
                shadeClose: true,
                shade: false,
                maxmin: true, //开启最大化最小化按钮
                area: ['800px', '700px'],
                content: 'addstudioinformation.html?teachingStudioId=' + teachingStudioId
            });
        })
    
    }
    function refreshs(teachingStudioId,type)
    {
        window.location.href = "teachercentermystudiodetail.html?teachingStudioId=" + teachingStudioId + "&htmlType=" + type;
    }
    // 公告弹框   clock-o user file-text-o
    function popbox(text, p, teacher, time) {//text 标题 p为内容
        var pop = $('<div class="pop"></div>');
        var panel = $('<div class="pop-panel"></div>');
        var title = $('<h2 class="title"><i class="uk-icon-file-text-o"></i>公告标题 : ' + text + '</h2>');
        var close = $('<s>×</s>');
        close.on('click', function () {
            pop.remove();
        });
        var content = $('<div class="content"><h3>公告内容 :</h3><p>' + p + '</p></div>');
        var publisher = $('<div class="publisher"><span><i class="uk-icon-user"></i>发布人 : ' + teacher + '</span>' +
            '<span><i class="uk-icon-clock-o"></i>发表时间 : ' + time + '</span></div>')
        title.append(close);
        panel.append(title);
        panel.append(content);
        panel.append(publisher);
        pop.append(panel);
        $('body').append(pop);
    }

    // 添加工作室资讯弹窗
    function addstudioinformation(teachingStudioId, typeId, nid) {
        if (isEmpty(nid) && nid != undefined)
        {
            $.ajax({
                url: "ashx/teacherCenter.ashx?action=getStudioNewById",
                type: "POST",
                data: { newsId: nid},
                success: function (res) {
                    var ob = JSON.parse(res);
                    $("#title").val(ob[0].title);
                    $("#introduce").val(ob[0].introduce);
                    $("#contentDetail").val(ob[0].newsDetail);
                    $("#iconPath").val(ob[0].iconPath);
                    $("#lookimage").attr("src",SERVERROOTFILE + ob[0].iconPath);
                    $("#saveTag").val("update");
                    setContent();
                }
            });
        }
        // 更换资讯预览
        $('.feaddstudioinformation').on('change', '#information-photo', function () {
            if ($(this).val().match(/.jpg|.gif|.png|.bmp/i)) {
                var dom = $(this).prev();
                upload(this, dom);
                // $(this).val('');
            } else {
                layer.msg("对不起，系统仅支持标准格式的照片，请您调整格式后重新上传，谢谢 !");
            }
        })
        $('#addstudioinformation .febox>h2').on('click', 'a', function () {
            if (!isEmpty($("#title").val())) {
                layer.msg("资讯标题不能为空");
            }
            else if (!isEmpty(UE.getEditor('editor').getContent())) {
                layer.msg("资讯内容不能为空");
            }
            else {
                var data = new FormData($('#addstudioinformation')[0]);
                data.append('tag', $("#saveTag").val());
                data.append('newsId', nid);
                data.append('organId', teachingStudioId);
                data.append('newsTypeId', typeId);
                data.append('newsDetail', UE.getEditor('editor').getContent());
                $.ajax({
                    url: "ashx/teacherCenter.ashx?action=studioNewsSave",
                    type: "POST",
                    data: data,
                    processData: false,  // 告诉jQuery不要去处理发送的数据
                    contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                    success: function (res) {
                        if (res != "go_login") {
                            layer.msg(res);
                            setTimeout(function () {
                                parent.close();
                                parent.refreshs(teachingStudioId,1)
                                //window.location.href = "teachercentermystudiodetail.html?teachingStudioId="+teachingStudioId+"&htmlType=1";
                            }, 1000)
                        }
                        else {
                            top.location.href = "../login.html";
                        }
                    }
                });
            }
        })
    }

    // 添加工作室公告
    function addstudioActivity(teachingStudioId, id, saveTag) {
        if (saveTag == "update")
        {
            $.ajax({
                url: "../website/ashx/Activity.ashx?action=getstudioActivityById",
                type: "POST",
                data: { activityId: id },
                success: function (res) {
                    var ob = JSON.parse(res);
                    $("#title").val(ob.rows[0].name);
                    $("#contentDetail").val(ob.rows[0].content);
                    setContent();
                }
            });
        }
        $('#addstudioinformation .febox>h2').on('click', 'a', function () {
            var index = layer.load(0, { shade: false });
            var data = new FormData($('#addstudioinformation')[0]);
            data.append('saveTag', saveTag);
            data.append('organId', teachingStudioId);
            data.append('activityId', id);
            data.append('tid', $("#tid").val());
            data.append('detail', UE.getEditor('editor').getContent());
            $.ajax({
                url: "../website/ashx/Activity.ashx?action=StudioActivitySave",
                type: "POST",
                data: data,
                processData: false,  // 告诉jQuery不要去处理发送的数据
                contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                success: function (res) {
                    layer.closeAll();
                    layer.msg(res);
                    setTimeout(function () {
                        parent.close();
                        refreshs(teachingStudioId, 2)
                        //window.location.href = "teachercentermystudiodetail.html?teachingStudioId=" + teachingStudioId + "&htmlType=2";
                    }, 1000)
                }
            });
        })
    }
    function setContent() {
        var strv = $("#contentDetail").val();
        try {
            UE.getEditor('editor').setContent(strv);
        }
        catch (e) {
            var t = setTimeout("setContent()", 1000)
        }
    }
    //上传图像，并显示图像
    //c:点击节点，即点击input type=fille 后内容存贮
    //d:存贮图像的节点
    var upload = function (c, d) {
        var $file = $(c);
        var fileObj = $file[0];
        var windowURL = window.URL || window.webkitURL;
        var dataURL;
        var $img = $(d);

        if (fileObj && fileObj.files && fileObj.files[0]) {
            dataURL = windowURL.createObjectURL(fileObj.files[0]);
            $img.attr('src', dataURL);
            // console.log(dataURL);
        } else {
            dataURL = $file.val();
            var imgObj = document.querySelector(d);
            // 两个坑:
            // 1、在设置filter属性时，元素必须已经存在在DOM树中，动态创建的Node，也需要在设置属性前加入到DOM中，先设置属性在加入，无效；
            // 2、src属性需要像下面的方式添加，上面的两种方式添加，无效；
            imgObj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
            imgObj.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = dataURL;
            // console.log(dataURL);
        }
    };
    var upload_new = function (c, d) {
        var $file = $(c);
        var fileObj = $file[0];
        var windowURL = window.URL || window.webkitURL;
        var dataURL;
        var $img = $(d);

        if (fileObj && fileObj.files && fileObj.files[0]) {
            dataURL = windowURL.createObjectURL(fileObj.files[0]);
            $img.css('background', "url(\"" + dataURL + "\") no-repeat center");
            // console.log(dataURL);
        } else {
            dataURL = $file.val();
            var imgObj = document.querySelector(d);
            // 两个坑:
            // 1、在设置filter属性时，元素必须已经存在在DOM树中，动态创建的Node，也需要在设置属性前加入到DOM中，先设置属性在加入，无效；
            // 2、src属性需要像下面的方式添加，上面的两种方式添加，无效；
            imgObj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
            imgObj.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = dataURL;
            // console.log(dataURL);
        }
    };


    //预览图片
    function setPreview(obj,pre)
    {
        var objUrl = getObjectURL(obj.files[0]); //获取图片的路径，该路径不是图片在本地的路径
        if (objUrl) {
            $("#" + pre).attr("src", objUrl); //将图片路径存入src中，显示出图片
        }
    }
    //建立一個可存取到該file的url
    function getObjectURL(file) {
        var url = null;
        if (window.createObjectURL != undefined) { // basic
            url = window.createObjectURL(file);
        } else if (window.URL != undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file);
        }
        return url;
    }

    // 设置富文本内容
    function setContent_detail() {
        var strv = $("#content").val();
        try {
            UE.getEditor('editor').setContent(strv);
        }
        catch (e) {
            var t = setTimeout("setContent_detail()", 1000)
        }
    }

    // 获取富文本内容
    function getmyContent_detail() {
        $("#detail").val(UE.getEditor('editor').getContent());
    }

    // 看视频
    function look_Video(id) {
        layer.open({
            type: 2,
            shadeClose: true,
            shade: false,
            maxmin: true, //开启最大化最小化按钮
            area: ['800px', '650px'],
            content: '../aliyunUpload/lookVideo.html?id=' + id
        });
    }


    function GetRequest() {

        var url = location.search; //获取url中含"?"符后的字串

        var theRequest = new Object();

        if (url.indexOf("?") != -1) {

            var str = url.substr(1);

            strs = str.split("&");

            for (var i = 0; i < strs.length; i++) {

                theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);

            }

        }

        return theRequest;

    }

    function isEmptyObject(obj) {
        var name;
        for ( name in obj ) {
            return false;
        }
        return true;
    }
    // 判断是否为空
    function isEmpty(str) {
        var reg = /\S+/;
        return reg.test(str);
    }

    // 班级管理
    function createclass() {
        // 预览主页
        var type=$(this).getUrlParam("type");
        if(type=='2'){
            $('.feupdatedata .febox h1 span:last-child').addClass('active');
            $('.feupdatedata .febox h1 span:nth-child(2)').removeClass('active');
            $('#allschool').addClass('fehidden');
            $('#trainschool').removeClass('fehidden');
        }else{
            $('.feupdatedata .febox h1 span:nth-child(2)').addClass('active');
            $('.feupdatedata .febox h1 span:last-child').removeClass('active');
            $('#trainschool').addClass('fehidden');
            $('#allschool').removeClass('fehidden');
        }
        // 切换 列表
        $('.feupdatedata .febox h1').on('click', 'span', function () {
            if (!$(this).hasClass('active')) {
                window.location.href ="teachercentercreateclass.html?type="+$(this).data('id');
            } else {
            }
        });
    
        //显示全日制班级列表
        function showallschool() {
            new Vue({
                el: "#allschool",
                data: {
                    allschoolArr:[],//课件
                    showItem:4,//页码显示条数
                    allpage:'',//总页数
                    current:1//当前页
                },
                filters: {
                    addRootFile: function addRootFile(img) {
                        return SERVERROOTFILE + img;
                    },
                    addRoot: function addRoot(id) {
                        return 'showclass.html?classId='+id;
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
                        _this.getallschool(1);
                    })
                },
                methods: {
                    getallschool:function (pageIndex) {
                        var _this = this;
                        this.$http.post("ashx/teacherCenter.ashx?action=getTeacherClass",
                            {
                                pageIndex: pageIndex,
                                pageSize: 6
                            }
                            , {emulateJSON: true})
                            .then(function (res) {
                                if (res.body != "go_login") {
                                    _this.allpage = res.body.totalPageCount;
                                    _this.allschoolArr = res.body.rows;
                                }
                                else {
                                    top.location.href = "../login.html";
                                }
                            }).then(function () {
                                var _this = this;
                                $('#allschool .fepanel ul').on('click', 'li:first-child', function () {
                                    $(window).storager({ //fePrePage
                                        key: 'teachercenterclassid',
                                        // value: $.getBasePath(1),
                                        value: $(this).parent().data('id'),
                                        expires: 0
                                    }).addStorage();
                                    window.location.href = "showclass.html"//?classId=" + $(this).parent().data('id');
                                });
                                $('#allschool .fepanel ul').on('click', 'li:last-child', function () {
                                    var _this = this;
                                    var classTId = $(_this).parent().data('id');
                                    layer.confirm('你确定要删除吗？', {
                                        btn: ['确定', '取消'] //按钮
                                    }, function () {
                                        $.ajax({
                                            url: "ashx/teacherCenter.ashx?action=TeacherClassSave",
                                            type: "POST",
                                            data: { saveTag: 'delete', classTId: classTId },
                                            success: function (res) {
                                                if (res != "go_login") {
                                                    if (res == 200) {
                                                        layer.msg('删除成功！', {icon: 1});
                                                        setTimeout(function () {
                                                            window.location.href = "teachercentercreateclass.html?type=1";
                                                        }, 1000)
                                                    }
                                                }
                                                else {
                                                    top.location.href = "../login.html";
                                                }
                                            }
                                        });
                                    }, function () {
                                    });
                                });
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
                        _this.getallschool(_this.current);
                    }
                }
            });
        }
        //显示培训机构班级列表
        function showtrainschool() {
            new Vue({
                el: "#trainschool",
                data: {
                    trainschoolArr:[],//课件
                    showItem:4,//页码显示条数
                    allpage:'',//总页数
                    current:1//当前页
                },
                filters: {
                    addRootFile: function addRootFile(img) {
                        return SERVERROOTFILE + img;
                    },
                    addRoot:function addRoot(id) {
                        return 'showclass.html?classId='+id;
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
                        _this.gettrainschool(1);
                    })
                },
                methods: {
                    gettrainschool:function (pageIndex) {
                        var _this=this;
                        this.$http.post(SERVERROOTDATA + "TeacherResource.ashx?action=getTeacherResource",
                            {
                                resourceType:'article',
                                pageIndex:pageIndex,
                                pageSize:6
                            }
                            ,{emulateJSON: true})
                            .then(function (res) {
                                if (res.body != "go_login") {
                                    _this.allpage = res.body.totalPageCount;
                                    _this.trainschoolArr = res.body.rows;
                                }
                                else {
                                    top.location.href = "../login.html";
                                }
                            }).then(function () {
                                var _this=this;
                                $('#trainschool .fepanel ul').on('click','li:first-child',function () {
                                    window.location.href =ROOT+"showclass.html?classId="+$(this).parent().data('id');
                                });
                                $('#trainschool .fepanel ul').on('click','li:last-child',function () {
                                    var _this=this;
                                    var articleId=$(_this).parent().data('id');
                                    layer.confirm('你确定要删除吗？', {
                                        btn: ['确定','取消'] //按钮
                                    }, function(){
                                        $.ajax({
                                            url: SERVERROOTDATA+"Article.ashx?action=articleSave",
                                            type: "POST",
                                            data: {saveTag:'delete',articleId:articleId},
                                            success: function (res) {
                                                if (res != "go_login") {
                                                    if(res==200){
                                                        layer.msg('删除成功！', {icon: 1});
                                                        setTimeout(function () {
                                                            window.location.href =ROOT+"teachercentercreateclass.html?type=2";
                                                        },1000)
                                                    }
                                                }
                                                else {
                                                    top.location.href = "../login.html";
                                                }
                                            }
                                        });
                                    }, function(){
                                    });
                                });
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
                        _this.gettrainschool(_this.current);
                    }
                }
            });
        }
        showallschool();
        //showtrainschool();
        // 添加班级界面
        $('.feupdatedata .febox p').on('click','button',function () {
            var id=$('.feupdatedata .febox h1').find('.active').data('id');
            if(id=='1'||id==1){
                layer.open({
                    type: 1,
                    title:"全日制班级",
                    area:['400px','320px'],
                    content: $('#addallschool') //这里content是一个DOM
                });
            }else{
                layer.open({
                    type: 1,
                    title:"培训机构班级",
                    area:['400px','320px'],
                    content: $('#addtrainschool') //这里content是一个DOM
                });
            }
        });
        // 添加全日制班级取消按钮
        $('#addallschool .feoperation').on('click','button:last-child',function () {
            layer.closeAll();
        });
        // 添加全日制班级确定按钮
        $('#addallschool .feoperation').on('click', 'button:first-child', function () {
            if ($("#schoolSelect").val() == "") {
                layer.msg('请选择学校！');
                return;
            }
            else if ($("#classSelect").val() == "") {
                layer.msg('请选择班级！');
                return;
            }
            var data = new FormData();
            data.append('saveTag', "add");
            data.append('classTId', "0");
            data.append('classId', $("#classSelect").val());
            $.ajax({
                url: "ashx/teacherCenter.ashx?action=TeacherClassSave",
                type: "POST",
                data: data,
                processData: false,  // 告诉jQuery不要去处理发送的数据
                contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                success: function (res) {
                    if (res != "go_login") {
                        if (res == 200) {
                            layer.msg('添加成功！');
                            setTimeout(function () {
                                window.location.href = "teachercentercreateclass.html?type=1";
                            }, 1000)
                        }
                    }
                    else {
                        top.location.href = "../login.html";
                    }
                }
            });
        });
        // 添加培训机构班级取消按钮
        $('#addtrainschool .feoperation').on('click','button:last-child',function () {
            layer.closeAll();
        })
        $('#addtrainschool .feoperation').on('click', 'button:first-child', function () {
            alert('暂缓');
        })
    }
    // 班级信息
    function classdetail() {
        var classTId = $(window).storager({ key: 'teachercenterclassid' }).readStorage();//$(this).getUrlParam("classId");
    
        new Vue({
            el: "#feclassdetail",
            data: {
                allschoolArr: [],//课件
                showItem: 4,//页码显示条数
                allpage: '',//总页数
                current: 1//当前页
            },
            filters: {
                addRootFile: function addRootFile(img) {
                    return img == '' ? 'images/temp/teachernews-1.png' : SERVERROOTFILE + img;
                },
                addRoot: function addRoot(id) {
                    return 'showclass.html?classId=' + id;
                },
                getEmail: function getEmail(p) {
                    return p == '' ? '未填写' : p;
                }
            },
            computed: {
                pages: function () {
                    var pag = [];
                    if (this.current < this.showItem) { //如果当前的激活的项 小于要显示的条数
                        //总页数和要显示的条数那个大就显示多少条
                        var i = Math.min(this.showItem, this.allpage);
                        while (i) {
                            pag.unshift(i--);
                        }
                    } else { //当前页数大于显示页数了
                        var middle = this.current - Math.floor(this.showItem / 2), //从哪里开始
                            i = this.showItem;
                        if (middle > (this.allpage - this.showItem)) {
                            middle = (this.allpage - this.showItem) + 1
                        }
                        while (i--) {
                            pag.push(middle++);
                        }
                    }
                    return pag
                }
            },
            mounted: function () {
                var _this = this;
                this.$nextTick(function () {
                    _this.getallschool(1, $("#screen").val());
                    _this.ss();
                    _this.bd();
                })
            },
            methods: {
                getallschool: function (pageIndex,condition) {
                    var _this = this;
                    this.$http.post("ashx/teacherCenter.ashx?action=getClassStudent",
                        {
                            id:classTId ,
                            pageIndex: pageIndex,
                            pageSize: 8,
                            condition:condition,
                            screen: $("#screen").val()
                        }
                        , { emulateJSON: true })
                        .then(function (res) {
                            if (res.body != "go_login") {
                                _this.allpage = res.body.totalPageCount;
                                _this.allschoolArr = res.body.rows;
                            }
                            else {
                                top.location.href = "../login.html";
                            }
                        }).then(function () {
                            var _this = this;
                            $('#feclassdetail .fecontent').on('click', 'button', function () {
                                var studentId = $(this).parent().parent().data('id');
                                layer.confirm('你确定要移除吗？', {
                                    btn: ['确定', '取消'] //按钮
                                }, function () {
                                    $.ajax({
                                        url: "ashx/teacherCenter.ashx?action=ClassStudentDelete",
                                        type: "POST",
                                        data: { saveTag: 'delete', studentId: studentId },
                                        success: function (res) {
                                            if (res != "go_login") {
                                                if (res == 200) {
                                                    layer.msg('删除成功！', { icon: 1 });
                                                    setTimeout(function () {
                                                        window.location.href = "showclass.html?classId=" + classTId;
                                                    }, 1000)
                                                }
                                            }
                                            else {
                                                top.location.href = "../login.html";
                                            }
                                        }
                                    });
                                }, function () {
                                });
                            });
                        })
                },
                goto: function (index) { //枫叶处理
                    var _this = this;
                    if (index == this.current) return;
                    if (index > this.allpage) {
                        this.current = this.current - 2;
                        layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
                        return false;
                    }
                    this.current = index;
                    //_this.condition = $("#screen").val();
                    _this.getallschool(_this.current,_this.condition);
                },
                ss: function ()//搜索
                {
                    var _this = this;
                    _this.current = 1;
                    $('#feclassdetail .festudentmsg p').on('click', 'button', function () {
                        _this.condition = $("#screen").val();
                        _this.getallschool(1, _this.condition);
                    });
                },
                bd: function ()
                {
                    var _this = this;
                    $('#feclassdetail .festudentmsg p input').bind('keypress', function (event) {
                        if (event.keyCode == "13") {
                            _this.current = 1;
                            _this.getallschool(1, $("#screen").val());
                        }
                    });
                }
            }
        });
        $('.feclassdetail').on('click','span',function () {
            if(!$(this).hasClass('active')){
                var id=$(this).data('id');
                $(this).siblings().removeClass('active');
                $(this).addClass('active');
                if(id==1||id=='1'){
                    $('.feschoolmsg').removeClass('fehidden');
                    $('.festudentmsg').addClass('fehidden');
                }else{
                    $('.festudentmsg').removeClass('fehidden');
                    $('.feschoolmsg').addClass('fehidden');
                }
            }else{
            }
        })
    
    }
    // 老师答疑回复
    function answeringreply() {
        new Vue({
            el: "#answeringreply",
            data: {
                result: [],
                type: 0,
                showItem: 4,//页码显示条数
                allpage: '1',//总页数
                current: 1,//当前页
                replynum:0,
                discussnum: 0,
                noticenum: 0
            },
            filters: {
                addRootFile: function addRootFile(img) {
                    return SERVERROOTFILE + img;
                }
            },
            computed: {
                pages: function () {
                    var pag = [];
                    if (this.current < this.showItem) { //如果当前的激活的项 小于要显示的条数
                        //总页数和要显示的条数那个大就显示多少条
                        var i = Math.min(this.showItem, this.allpage);
                        while (i) {
                            pag.unshift(i--);
                        }
                    } else { //当前页数大于显示页数了
                        var middle = this.current - Math.floor(this.showItem / 2), //从哪里开始
                            i = this.showItem;
                        if (middle > (this.allpage - this.showItem)) {
                            middle = (this.allpage - this.showItem) + 1
                        }
                        while (i--) {
                            pag.push(middle++);
                        }
                    }
                    return pag
                }
            },
            mounted: function () {
                var _this = this;
                this.$nextTick(function () {
                    _this.getresult(1, _this.type);
                    _this.changeRead();
                    _this.bindSelect();
                    _this.noticeTimer();
                })
            },
            methods: {
                getresult: function (pageIndex, type) {
                    var _this = this;
                    this.$http.post("ashx/teacherCenter.ashx?action=getQuestionReplyList",//
                        {
                            questionerType: 0,
                            readType: type,
                            pageIndex: pageIndex,
                            pageSize: 8
                        }
                        , { emulateJSON: true })
                        .then(function (res) {
                            if (res.body != "go_login") {
                                _this.result = res.body.rows.reverse();
                                // _this.result=[{questionContent:'dada',courseName:'大大',questioner:"天天",time:"2017-10-30 12:00",questionId:1}]
                                _this.allpage = res.body.totalPageCount;
                            }
                            else { top.location.href = "../login.html"; }
                        })
                },
                noticeTimer:function () {
                    var _this=this;
                    var timer1=setTimeout(function () {
                        _this.$http.post("ashx/teacherCenter.ashx?action=getQuestionNum",
                    {
                    
                    }
                            ,{emulateJSON: true})
                            .then(function (res) {
                                if (res.body != "go_login") {
                                    _this.replynum = res.body.num1;
                                    _this.discussnum = res.body.num2;
                                    _this.noticenum = res.body.num3;
                                }
                                else { top.location.href = "../login.html"; }
                            });
                        _this.getresult(_this.current,_this.type);
                    },0);
                    var timer=setInterval(function () {
                        _this.$http.post("ashx/teacherCenter.ashx?action=getQuestionNum",
                    {
                    
                    }
                            ,{emulateJSON: true})
                            .then(function (res) {
                                if (res.body != "go_login") {
                                    _this.replynum = res.body.num1;
                                    _this.discussnum = res.body.num2;
                                    _this.noticenum = res.body.num3;
                                } else { top.location.href = "../login.html"; }
                            });
                        _this.getresult(_this.current,_this.type);
                    },10000)
                },
                bindSelect:function () {
                    var _this=this;
                    $('#allSelect').on('click',function () {
                        if ($(this).html() == '全选') {
                            if ($('.felist').length < 1) {
                                return;
                            }
                            $('.felist').find('input[type=checkbox]').prop('checked',true);
                            $(this).html('取消全选');
                        }else{
                            $('.felist').find('input[type=checkbox]').prop('checked','');
                            $(this).html('全选');
                        }
                    });
                    $('#setRead').on('click',function () {
                        var list=$('.felist').find('input[type=checkbox]:checked');
                        for(var i=0;i<list.length;i++){
                            var id=$(list[i]).data('id');
                            $(list[i]).prop('checked','');
                            _this.$http.post("ashx/teacherCenter.ashx?action=updateQuestionState",
                        {
                            questionId:id,
                            saveTag:'update'
                        }
                        ,{emulateJSON: true})
                                .then(function (res) {

                                });
                        }
                        $('#allSelect').html('全选');
                        setTimeout(function () {
                            _this.getresult(_this.current, _this.type);
                        }, 100);
                    });
                    $('#delete').on('click',function () {
                        var list = $('.felist').find('input[type=checkbox]:checked');
                        layer.confirm('你确定要删除吗？', {
                            btn: ['确定','取消'] //按钮
                        }, function(){
                            if (list.length < 1) {
                                layer.msg('无任何选择项');
                                return;
                            }
                            for(var i=0;i<list.length;i++){
                                var id=$(list[i]).data('id');
                                $(list[i]).prop('checked','');
                                _this.$http.post("ashx/teacherCenter.ashx?action=updateQuestionState",
                            {
                                questionId:id,
                                saveTag:'delete'
                            }
                            ,{emulateJSON: true})
                                    .then(function (res) {
                                        layer.closeAll();
                                    });
                            }
                            // setTimeout(function () {
                            //     location.reload();
                            //     layer.msg('删除成功！')
                            // },0);
                            $('#allSelect').html('全选');
                            setTimeout(function () {
                                _this.getresult(_this.current, _this.type);
                                _this.$http.post("ashx/teacherCenter.ashx?action=getQuestionNum",
                                    {
                               
                                    }
                                    , { emulateJSON: true })
                                    .then(function (res) {
                                        if (res.body != "go_login") {
                                            _this.replynum = res.body.num1;
                                            _this.discussnum = res.body.num2;
                                            _this.noticenum = res.body.num3;
                                        }
                                        else { top.location.href = "../login.html"; }
                                    });
                            }, 100);
                            layer.closeAll();
                        }, function () {
                        });
                    });
                },
                lookdetail: function (id, title, coursename, time, teachername) {
                    layer.open({
                        type: 2,
                        title: '详情',
                        //closeBtn: 0, //不显示关闭按钮
                        shadeClose: false,
                        shade: [0.5, '#000'],
                        area: ['800px', '550px'],
                        //offset: 'rb', //右下角弹出
                        //time: 2000, //2秒后自动关闭
                        anim: 2,
                        content: 'answeringreplydetail.html?questionId=' + id + '&title=' + title + '&coursename=' + coursename + '&time=' + time + "&teachername=" + teachername
                    });
                },
                changeRead: function () {
                    var _this = this;
                    $('.femessage-head .feselect').on('click', 'span', function () {
                        var type = $(this).data('id');
                        $(this).siblings().removeClass('active');
                        $(this).addClass('active');
                        _this.type = type;
                        _this.current = 1;
                        _this.getresult(_this.current, _this.type);
                    });
                },
                goto: function (index) { //枫叶处理
                    var _this = this;
                    if (index == this.current) return;
                    if (index > this.allpage) {
                        this.current = this.current - 2;
                        layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
                        return false;
                    }
                    this.current = index;
                    _this.getresult(_this.current, _this.type);
                }
            }
        });
    }
    // 老师答疑回复详情
    function answeringreplydetail() {
        var questionId = $(this).getUrlParam("questionId");
        var title = $(this).getUrlParam("title");
        var coursename = $(this).getUrlParam("coursename");
        var time = $(this).getUrlParam("time");
        var teachername = $(this).getUrlParam("teachername");
        var studentId = $(window).storager({ key: 'feUid' }).readStorage();
        function draw(questionId, title, coursename, time, teachername) {
            new Vue({
                el: "#answeringreplydetail",
                data: {
                    pastanswer: [],
                    nodata: true,
                    current: 1,//当前页
                    title: title,
                    coursename: coursename,
                    time: time,
                    teachername: teachername
                },
                filters: {
                    addRootFile: function addRootFile(img) {
                        return SERVERROOTFILE + img;
                    },
                    whosay: function whosay(type) {
                        return type == 0 ? '我 :' : '提问 :';
                    }
                },
                mounted: function () {
                    var _this = this;
                    this.$nextTick(function () {
                        _this.getpastanswer(1);
                        _this.bindFn();
                    })
                },
                methods: {
                    getpastanswer: function (pageSize) {
                        var _this = this;
                        this.$http.post("ashx/teacherCenter.ashx?action=getQuestionReply",
                            {
                                questionId: questionId,
                                pageIndex: 1,
                                pageSize: pageSize * 5
                            }
                            , { emulateJSON: true })
                            .then(function (res) {
                                if (res.body != "go_login") {
                                    if (pageSize * 5 < res.body.totalCount) {
                                        _this.nodata = true;
                                    } else {
                                        _this.nodata = false;
                                    }
                                    if (res.body.code == 200) {
                                        _this.pastanswer = res.body.rows;
                                    }
                                }
                                else {
                                    top.location.href = "../login.html";
                                }
                            }).then(function () {

                            })
                    },
                    lookmore: function () {
                        this.getpastanswer(++this.current);
                    }
                   ,
                    bindFn: function () {
                        var _this = this;
                        $('#answeringreplydetail .feoperation').on('click', 'button:first-child', function () {
                            var text = $(this).parent().prev().find('textarea').val();
                            $(this).parent().prev().find('textarea').val('');
                            if (!isEmpty(text)) {
                                layer.msg('回答内容不能为空!')
                            } else {
                                _this.$http.post("ashx/teacherCenter.ashx?action=studentQuestionReplySave",
                                    {
                                        questionId: questionId,
                                        questionerType: 1,
                                        replyContent: text,
                                        replyOrQuestion: 0
                                    }
                                    , { emulateJSON: true })
                                    .then(function (res) {
                                        if (res.body != "go_login") {
                                            if (res.body == 200) {
                                                layer.msg('回答成功!');
                                                _this.getpastanswer(_this.current);
                                                $('#content').scrollTop($('#content')[0].scrollHeight);
                                            } else {
                                                layer.msg('回答失败')
                                            }
                                        }
                                        else {
                                            top.location.href = "../login.html";
                                        }
                                    })
                            }
                        });
                        //$('#answeringreplydetail .feoperation').on('click', 'button:last-child', function () {
                        //    _this.$http.post("ashx/teacherCenter.ashx?action=studentQuestionSave",
                        //        {
                        //            questionId: questionId,
                        //            saveTag: 'update',
                        //            replystates: 1
                        //        }
                        //        , { emulateJSON: true })
                        //        .then(function (res) {
                        //            if (res.body == 200) {
                        //                layer.msg('已标记为解决!');
                        //                setTimeout(function () {
                        //                    parent.close();
                        //                    parent.reload();
                        //                }, 1000)
                        //            } else {
                        //                layer.msg('操作失败')
                        //            }
                        //        })
                        //});
                        var dingshi = setInterval(function () {
                            _this.getpastanswer(_this.current);
                        }, 10000);
                    }
                }
            });
        }
        draw(questionId, title, coursename, time, teachername);
    }
    // 问答社区-我的提问
    function QAmyquiz() {
        //var studentId = $(window).storager({ key: 'feUid' }).readStorage();
        //var userType = $(window).storager({ key: 'feUType' }).readStorage();
        //if (studentId == null || studentId == undefined || studentId == 'undefined' || userType != 1) {
        //    layer.msg('请先登录');
        //    setTimeout(function () {
        //        window.location.href = ROOT + "login.html";
        //    }, 1000);
        //    return;
        //}
        var teacherId = $(window).storager({ key: 'feUid' }).readStorage();
        new Vue({
            el: "#QAmyquiz",
            data: {
                quizList: [],
                adopt: '',
                answer: '',
                showItem: 4,//页码显示条数
                allpage: '0',//总页数
                current: 1,
                nodata: false
            },
            filters: {
                addRootFile: function addRootFile(img) {
                    return SERVERROOTFILE + 'uploads/images/' + img;
                },
                addRoot: function addRoot(id, c) {
                    return ROOT + "knowledgereplydetail.html?questionId=" + id + "&r=1" + "&c=" + c;
                },
                showTime: function showTime(date) {
                    // return $.getCurrentTime(date,3);
                    var end_str = (date).replace(/-/g, "/");//发布时间
                    var current_str = new Date();//当前时间
                    var differ_str = current_str.getTime() - new Date(end_str).getTime();   //时间差的毫秒数
                    //计算出相差天数
                    var days = Math.floor(differ_str / (24 * 3600 * 1000));

                    //计算出小时数

                    var leave1 = differ_str % (24 * 3600 * 1000);    //计算天数后剩余的毫秒数
                    var hours = Math.floor(leave1 / (3600 * 1000));
                    //计算相差分钟数
                    var leave2 = leave1 % (3600 * 1000);      //计算小时数后剩余的毫秒数
                    var minutes = Math.floor(leave2 / (60 * 1000));
                    //计算相差秒数
                    var leave3 = leave2 % (60 * 1000);   //计算分钟数后剩余的毫秒数
                    var seconds = Math.round(leave3 / 1000);
                    // console.log(" 相差 "+days+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒");
                    if (days > 0) {
                        return days + "天前";
                    } else if (hours > 0) {
                        return hours + "小时前";
                    } else if (minutes > 0) {
                        return minutes + "分钟前";
                    } else if (seconds > 0) {
                        return "刚刚";
                    }
                }
            },
            computed: {
                pages: function () {
                    var pag = [];
                    if (this.current < this.showItem) { //如果当前的激活的项 小于要显示的条数
                        //总页数和要显示的条数那个大就显示多少条
                        var i = Math.min(this.showItem, this.allpage);
                        while (i) {
                            pag.unshift(i--);
                        }
                    } else { //当前页数大于显示页数了
                        var middle = this.current - Math.floor(this.showItem / 2), //从哪里开始
                            i = this.showItem;
                        if (middle > (this.allpage - this.showItem)) {
                            middle = (this.allpage - this.showItem) + 1
                        }
                        while (i--) {
                            pag.push(middle++);
                        }
                    }
                    return pag
                }
            },
            mounted: function () {
                var _this = this;
                this.$nextTick(function () {
                    this.getList(_this.current, _this.adopt, _this.answer);
                })
            },
            methods: {
                bindSelect: function (event, adopt, answer) {
                    $(event.target).addClass('active');
                    $(event.target).parent().siblings().find('span').removeClass('active');
                    this.current = 1;
                    this.getList(this.current, adopt, answer);
                },
                getList: function (pageIndex, adopt, answer) {
                    var _this = this;
                    var index = layer.load(1, {
                        shade: [0.1, '#fff'] //0.1透明度的白色背景
                    });
                    this.$http.post(SERVERROOTDATA + "KnowledgePay.ashx?action=getMyKPQuestionList",
                        {
                            userId: teacherId,
                            userType: 3,
                            adopt: adopt,
                            answer: answer,
                            pageIndex: pageIndex,
                            pageSize: 10
                        }
                        , { emulateJSON: true })
                        .then(function (res) {
                            layer.close(index);
                            if (res.body.code == 200) {
                                if (res.body.rows.length < 1) {
                                    _this.nodata = true;
                                } else {
                                    _this.nodata = false;
                                }
                                _this.quizList = res.body.rows;
                                _this.allpage = res.body.totalPageCount;
                            }
                        })
                },
                goto: function (index) { //枫叶处理
                    var _this = this;
                    if (index == this.current) return;
                    if (index > this.allpage) {
                        this.current = this.current - 2;
                        layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
                        return false;
                    }
                    this.current = index;
                    _this.getList(_this.current, _this.adopt, _this.answer);
                    // $.scrollTo($('#problemcollection').offset().top, 300);
                }
            }
        });
    }
    // 问答社区-我的回答
    function teacherQAmyreply() {
        var teacherId = $(window).storager({ key: 'feUid' }).readStorage();
        new Vue({
            el: "#QAmyreply",
            data: {
                replyList: [],
                Qtype: 0,
                showItem: 4,//页码显示条数
                allpage: '0',//总页数
                current: 1,
                nodata: false,
                isFree: true
            },
            filters: {
                addRootFile: function addRootFile(img) {
                    return SERVERROOTFILE + 'uploads/images/' + img;
                },
                addRoot: function addRoot(id, c) {
                    return ROOT + "knowledgereplydetail.html?questionId=" + id + "&r=0" + "&c=" + c;
                },
                showTime: function showTime(date) {
                    // return $.getCurrentTime(date,3);
                    var end_str = (date).replace(/-/g, "/");//发布时间
                    var current_str = new Date();//当前时间
                    var differ_str = current_str.getTime() - new Date(end_str).getTime();   //时间差的毫秒数
                    //计算出相差天数
                    var days = Math.floor(differ_str / (24 * 3600 * 1000));

                    //计算出小时数

                    var leave1 = differ_str % (24 * 3600 * 1000);    //计算天数后剩余的毫秒数
                    var hours = Math.floor(leave1 / (3600 * 1000));
                    //计算相差分钟数
                    var leave2 = leave1 % (3600 * 1000);      //计算小时数后剩余的毫秒数
                    var minutes = Math.floor(leave2 / (60 * 1000));
                    //计算相差秒数
                    var leave3 = leave2 % (60 * 1000);   //计算分钟数后剩余的毫秒数
                    var seconds = Math.round(leave3 / 1000);
                    // console.log(" 相差 "+days+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒");
                    if (days > 0) {
                        return days + "天前";
                    } else if (hours > 0) {
                        return hours + "小时前";
                    } else if (minutes > 0) {
                        return minutes + "分钟前";
                    } else if (seconds > 0) {
                        return "刚刚";
                    }
                }
            },
            computed: {
                pages: function () {
                    var pag = [];
                    if (this.current < this.showItem) { //如果当前的激活的项 小于要显示的条数
                        //总页数和要显示的条数那个大就显示多少条
                        var i = Math.min(this.showItem, this.allpage);
                        while (i) {
                            pag.unshift(i--);
                        }
                    } else { //当前页数大于显示页数了
                        var middle = this.current - Math.floor(this.showItem / 2), //从哪里开始
                            i = this.showItem;
                        if (middle > (this.allpage - this.showItem)) {
                            middle = (this.allpage - this.showItem) + 1
                        }
                        while (i--) {
                            pag.push(middle++);
                        }
                    }
                    return pag
                }
            },
            mounted: function () {
                var _this = this;
                this.$nextTick(function () {
                    this.getList(_this.current, _this.Qtype);
                })
            },
            methods: {
                bindSelect: function (event, Qtype, isfree) {
                    $(event.target).addClass('active');
                    $(event.target).parent().siblings().find('span').removeClass('active');
                    this.current = 1;
                    this.Qtype = Qtype;
                    this.isFree = isfree;
                    this.replyList = [];
                    this.getList(this.current, this.Qtype);
                },
                getList: function (pageIndex, Qtype) {
                    var _this = this;
                    var index = layer.load(1, {
                        shade: [0.1, '#fff'] //0.1透明度的白色背景
                    });
                    if (Qtype == 0) {
                        this.$http.post(SERVERROOTDATA + "KnowledgePay.ashx?action=getMyKPResponseList",
                            {
                                userId: teacherId,
                                userType: 3,
                                Qtype: Qtype,
                                pageIndex: pageIndex,
                                pageSize: 10
                            }
                            , { emulateJSON: true })
                            .then(function (res) {
                                layer.close(index);
                                if (res.body.code == 200) {
                                    if (res.body.rows.length < 1) {
                                        _this.nodata = true;
                                    } else {
                                        _this.nodata = false;
                                    }
                                    _this.replyList = res.body.rows;
                                    _this.allpage = res.body.totalPageCount;
                                }
                            })
                    }
                    else {
                        this.$http.post(SERVERROOTDATA + "KnowledgePay.ashx?action=getKPAskMeList",
                            {
                                teacherId: teacherId,
                                pageIndex: pageIndex,
                                pageSize: 10
                            }
                            , { emulateJSON: true })
                            .then(function (res) {
                                layer.close(index);
                                if (res.body.code == 200) {
                                    if (res.body.rows.length < 1) {
                                        _this.nodata = true;
                                    } else {
                                        _this.nodata = false;
                                    }
                                    _this.replyList = res.body.rows;
                                    _this.allpage = res.body.totalPageCount;
                                }
                            })
                    }
                },
                answer: function (id) {
                    window.open(ROOT + "knowledgereplydetail.html?questionId=" + id + "&r=0" + "&c=1");
                },
                goto: function (index) { //枫叶处理
                    var _this = this;
                    if (index == this.current) return;
                    if (index > this.allpage) {
                        this.current = this.current - 2;
                        layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
                        return false;
                    }
                    this.current = index;
                    _this.getList(_this.current, _this.Qtype);
                    // $.scrollTo($('#problemcollection').offset().top, 300);
                }
            }
        });
    }
    // 老师评论回复
    function discussreply() {
  
        new Vue({
            el: "#discussreply",
            data: {
                result: [],
                type: 0,
                showItem: 4,//页码显示条数
                allpage: '1',//总页数
                current: 1,//当前页
                replynum: 0,
                discussnum: 0,
                noticenum:0
            },
            filters: {
                addRootFile: function addRootFile(img) {
                    return SERVERROOTFILE + img;
                },
                addSource: function addSource(id, type) {
                    if (type == 1) {
                        url = 'cloundcoursedetail.html?courseId=' + id;
                    } else {
                        url = 'coursedetail.html?courseId=' + id;
                    }
                    return url;
                }
            },
            computed: {
                pages: function () {
                    var pag = [];
                    if (this.current < this.showItem) { //如果当前的激活的项 小于要显示的条数
                        //总页数和要显示的条数那个大就显示多少条
                        var i = Math.min(this.showItem, this.allpage);
                        while (i) {
                            pag.unshift(i--);
                        }
                    } else { //当前页数大于显示页数了
                        var middle = this.current - Math.floor(this.showItem / 2), //从哪里开始
                            i = this.showItem;
                        if (middle > (this.allpage - this.showItem)) {
                            middle = (this.allpage - this.showItem) + 1
                        }
                        while (i--) {
                            pag.push(middle++);
                        }
                    }
                    return pag
                }
            },
            mounted: function () {
                var _this = this;
                this.$nextTick(function () {
                    _this.getresult(1, _this.type);
                    _this.changeRead();
                    _this.noticeTimer();
                    _this.bindSelect();
                })
            },
            methods: {
                noticeTimer: function () {
                    var _this = this;
                    var timer1 = setTimeout(function () {
                        _this.$http.post("ashx/teacherCenter.ashx?action=getQuestionNum",
                            {
                           
                            }
                            , { emulateJSON: true })
                            .then(function (res) {
                                if (res.body != "go_login") {
                                    _this.replynum = res.body.num1;
                                    _this.discussnum = res.body.num2;
                                    _this.noticenum = res.body.num3;
                                }
                                else { top.location.href = "../login.html"; }
                            });
                        // _this.getresult(_this.current,_this.type);
                    }, 0);
                    var timer = setInterval(function () {
                        _this.$http.post("ashx/teacherCenter.ashx?action=getQuestionNum",
                            {
                           
                            }
                            , { emulateJSON: true })
                            .then(function (res) {
                                if (res.body != "go_login") {
                                    _this.replynum = res.body.num1;
                                    _this.discussnum = res.body.num2;
                                    _this.noticenum = res.body.num3;
                                }
                                else { top.location.href = "../login.html"; }
                            });
                        _this.getresult(_this.current, _this.type);
                    }, 10000)
                },
                changeRead: function () {
                    var _this = this;
                    $('.femessage-head .feselect').on('click', 'span', function () {
                        var type = $(this).data('id');
                        $(this).siblings().removeClass('active');
                        $(this).addClass('active');
                        _this.type = type;
                        _this.current = 1;
                        _this.getresult(_this.current, _this.type);
                    });
                },
                getresult: function (pageIndex, type) {
                    var _this = this;
                    this.$http.post("ashx/teacherCenter.ashx?action=getEvaluationToMe",
                        {
                            //studentId: studentId,
                            valuatorType: "3",
                            states: type,
                            pageIndex: pageIndex,
                            pageSize: 8
                        }
                        , { emulateJSON: true })
                        .then(function (res) {
                            if (res.body != "go_login") {
                                _this.result = res.body.rows.reverse();
                                // _this.result=[{disucssContent:'dada',courseName:'大大',disucsser:"天天",time:"2017-10-30 12:00",discussId:1}];
                                _this.allpage = res.body.totalPageCount;
                            }
                            else {
                                top.location.href = "../login.html";
                            }
                        })
                },
                lookdetail: function (id, coursename, valuator, courseId, lid, pid) {
                    var _this = this;
                    var oneId = '';
                    if (lid == 0) {
                        oneId = id
                    } else {
                        oneId = lid;
                    }
                    _this.$http.post("ashx/teacherCenter.ashx?action=updateEvaluationState",
                        {
                            courseEvaluationId: id,
                            saveTag: 'update'
                        }
                        , { emulateJSON: true })
                        .then(function (res) {

                        });
                    layer.open({
                        type: 2,
                        title: '详情',
                        //closeBtn: 0, //不显示关闭按钮
                        shadeClose: false,
                        shade: [0.5, '#000'],
                        area: ['800px', '550px'],
                        //offset: 'rb', //右下角弹出
                        //time: 2000, //2秒后自动关闭
                        anim: 2,
                        cancel: function () {
                            _this.getresult(_this.current, _this.type);
                        },
                        content: 'discussdetail.html?courseEvaluationId=' + id + '&coursename=' + coursename + "&valuator=" + valuator + "&courseId=" + courseId + "&lid=" + oneId + "&pid=" + pid + '&teacherId='+$("#tid").val()
                    });
                },
                bindSelect: function () {
                    var _this = this;
                    $('#allSelect').on('click', function () {
                        if ($(this).html() == '全选') {
                            if ($('.felist').length < 1) {
                                return;
                            }
                            $('.felist').find('input[type=checkbox]').prop('checked', true);
                            $(this).html('取消全选');
                        } else {
                            $('.felist').find('input[type=checkbox]').prop('checked', '');
                            $(this).html('全选');
                        }
                    });
                    $('#setRead').on('click', function () {
                        var list = $('.felist').find('input[type=checkbox]:checked');
                        for (var i = 0; i < list.length; i++) {
                            var id = $(list[i]).data('id');
                            $(list[i]).prop('checked', '');
                            _this.$http.post("ashx/teacherCenter.ashx?action=updateEvaluationState",
                                {
                                    courseEvaluationId: id,
                                    saveTag: 'update'
                                }
                                , { emulateJSON: true })
                                .then(function (res) {

                                });
                        }
                        $('#allSelect').html('全选');
                        setTimeout(function () {
                            _this.getresult(_this.current, _this.type);
                        }, 100);
                    });
                    $('#delete').on('click', function () {
                        var list = $('.felist').find('input[type=checkbox]:checked');
                        layer.confirm('你确定要删除吗？', {
                            btn: ['确定', '取消'] //按钮
                        }, function () {
                            if (list.length < 1) {
                                layer.msg('无任何选择项');
                                return;
                            }
                            for (var i = 0; i < list.length; i++) {
                                var id = $(list[i]).data('id');
                                $(list[i]).prop('checked', '');
                                _this.$http.post("ashx/teacherCenter.ashx?action=updateEvaluationState",
                                    {
                                        courseEvaluationId: id,
                                        saveTag: 'delete'
                                    }
                                    , { emulateJSON: true })
                                    .then(function (res) {
                                        layer.closeAll();
                                    });
                            }
                            $('#allSelect').html('全选');
                            setTimeout(function () {
                                _this.getresult(_this.current,_this.type);
                                _this.$http.post("ashx/teacherCenter.ashx?action=getQuestionNum",
                                    {
                                    }
                                    ,{emulateJSON: true})
                                    .then(function (res) {
                                        if (res.body != "go_login") {
                                            _this.replynum = res.body.num1;
                                            _this.discussnum = res.body.num2;
                                            _this.noticenum = res.body.num3;
                                        }
                                        else { top.location.href = "../login.html"; }
                                    });
                            },100);
                            //parent.close();
                        }, function () {
                        });

                        // setTimeout(function () {
                        //     location.reload();
                        //     layer.msg('删除成功！')
                        // },0);
                    });
                },
                goto: function (index) { //枫叶处理
                    var _this = this;
                    if (index == this.current) return;
                    if (index > this.allpage) {
                        this.current = this.current - 2;
                        layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
                        return false;
                    }
                    this.current = index;
                    _this.getresult(_this.current, _this.type);
                }
            }
        });
    }

    // 老师评论回复详情
    function discussdetail() {
        var courseEvaluationId = $(this).getUrlParam("courseEvaluationId");
        // var evaluation = $(this).getUrlParam("evaluation");
        var coursename = $(this).getUrlParam("coursename");
        //var time = $(this).getUrlParam("time");
        var courseId = $(this).getUrlParam("courseId");
        var valuator = $(this).getUrlParam("valuator");
        var lid = $(this).getUrlParam("lid");
        var pid = $(this).getUrlParam("pid");
        var teacherId = $(this).getUrlParam("teacherId");
        function draw(courseEvaluationId, coursename, valuator) {
            new Vue({
                el: "#discussdetail",
                data: {
                    nodata: true,
                    result: [],
                    current: 1,
                    coursename: coursename,
                    valuator: valuator
                },
                filters: {
                    addRootFile: function addRootFile(img) {
                        return SERVERROOTFILE + img;
                    },
                    whosay: function whosay(id, type) {
                        if (type != "3") {
                            return "回复 :";
                        } else {
                            if (id != teacherId) {
                                return "回复 :";
                            } else {
                                return "我 :";
                            }
                        }
                    }
                },
                mounted: function () {
                    var _this = this;
                    this.$nextTick(function () {
                        _this.bindFn();
                        _this.getresult('1')
                    })
                },
                methods: {
                
                    bindFn: function () {
                        var _this = this;
                        var dingshi = setInterval(function () {
                            _this.getresult(_this.current);
                        }, 10000);
                        $('#discussdetail .feoperation').on('click', 'button:first-child', function () {
                            var text = $(this).parent().prev().find('textarea').val();
                            $(this).parent().prev().find('textarea').val('');
                            if (!isEmpty(text)) {
                                layer.msg('回复内容不能为空!')
                            } else {
                                _this.$http.post("ashx/teacherCenter.ashx?action=evaluation",
                                    {
                                        //valuatorId: studentId,
                                        userType: "3",
                                        courseId: courseId,
                                        levelOneEvaluationId: lid,
                                        parentId: courseEvaluationId,
                                        evaluation: text
                                    }
                                    , { emulateJSON: true })
                                    .then(function (res) {
                                        if (res.body != "go_login") {
                                            layer.msg('评论成功');
                                            setTimeout(function () {
                                                _this.getresult(_this.current);
                                                $('#content').scrollTop($('#content')[0].scrollHeight);
                                            }, 1000)
                                        }
                                        else {
                                            top.location.href = "../login.html";
                                        }
                                    })
                            }
                        });
                        // $('#discussdetail .feoperation').on('click','button:last-child',function () {
                        //     parent.close();
                        // });
                    },
                    getresult:function (pageSize) {
                        var _this = this;
                        _this.$http.post("ashx/teacherCenter.ashx?action=updateEvaluationState",
                        {
                            courseEvaluationId: courseEvaluationId,
                            saveTag: 'update'
                        }
                        , { emulateJSON: true })
                        .then(function (res) {

                        });
                        _this.$http.post("ashx/teacherCenter.ashx?action=getEvaluationDetail",
                    {
                        courseEvaluationId:courseEvaluationId,
                        pageIndex:1,
                        pageSize:pageSize*4
                    }
                            ,{emulateJSON: true})
                            .then(function (res) {
                                if(pageSize*4<res.body.totalCount){
                                    _this.nodata=true;
                                }else {
                                    _this.nodata=false;
                                }
                                if(res.body.code==200){
                                    _this.result = res.body.rows.reverse();
                                }
                            }).then(function () {
                                _this.result.forEach(function(item,index){
                                    if (item.valuatorType != "3") {
                                        Vue.set(item, "className", 'orange');
                                    }else {
                                        if (item.valuatorId != jQuery.trim(teacherId)) {
                                            Vue.set(item, "className", 'orange');
                                        } else {
                                            Vue.set(item, "className", 'blue');
                                        }
                                    }
                                });
                            })
                    },
                    lookmore:function () {
                        this.getresult(++this.current);
                    }
                }
            });
        }
        draw(courseEvaluationId, coursename, valuator);
    }
    // 老师网站通知
    function webnotice() {
        new Vue({
            el: "#webnotice",
            data: {
                result: [],
                type: '',
                showItem: 4,//页码显示条数
                allpage: '1',//总页数
                current: 1,//当前页
                replynum: 0,
                discussnum: 0,
                noticenum: 0
            },
            filters: {
                addRootFile: function addRootFile(img) {
                    return SERVERROOTFILE + img;
                }
            },
            computed: {
                pages: function () {
                    var pag = [];
                    if (this.current < this.showItem) { //如果当前的激活的项 小于要显示的条数
                        //总页数和要显示的条数那个大就显示多少条
                        var i = Math.min(this.showItem, this.allpage);
                        while (i) {
                            pag.unshift(i--);
                        }
                    } else { //当前页数大于显示页数了
                        var middle = this.current - Math.floor(this.showItem / 2), //从哪里开始
                            i = this.showItem;
                        if (middle > (this.allpage - this.showItem)) {
                            middle = (this.allpage - this.showItem) + 1
                        }
                        while (i--) {
                            pag.push(middle++);
                        }
                    }
                    return pag
                }
            },
            mounted: function () {
                var _this = this;
                this.$nextTick(function () {
                    _this.getresult(1, _this.type);
                    _this.changeRead();
                    _this.noticeTimer();
                    _this.bindSelect();
                })
            },
            methods: {
                noticeTimer: function () {
                    var _this = this;
                    var timer1 = setTimeout(function () {
                        _this.$http.post("ashx/teacherCenter.ashx?action=getQuestionNum",
                            {

                            }
                            , { emulateJSON: true })
                            .then(function (res) {
                                if (res.body != "go_login") {
                                    _this.replynum = res.body.num1;
                                    _this.discussnum = res.body.num2;
                                    _this.noticenum = res.body.num3;
                                }
                                else { top.location.href = "../login.html"; }
                            });
                        // _this.getresult(_this.current,_this.type);
                    }, 0);
                    var timer = setInterval(function () {
                        _this.$http.post("ashx/teacherCenter.ashx?action=getQuestionNum",
                            {

                            }
                            , { emulateJSON: true })
                            .then(function (res) {
                                if (res.body != "go_login") {
                                    _this.replynum = res.body.num1;
                                    _this.discussnum = res.body.num2;
                                    _this.noticenum = res.body.num3;
                                }
                                else { top.location.href = "../login.html"; }
                            });
                        _this.getresult(_this.current, _this.type);
                    }, 10000)
                },
                changeRead: function () {
                    var _this = this;
                    $('.femessage-head .feselect').on('click', 'span', function () {
                        var type = $(this).data('id');
                        $(this).siblings().removeClass('active');
                        $(this).addClass('active');
                        _this.type = type;
                        _this.current = 1;
                        _this.getresult(_this.current, _this.type);
                    });
                },
                getresult: function (pageIndex, type) {
                    var _this = this;
                    this.$http.post("ashx/teacherCenter.ashx?action=getSystemNoticeList",
                        {
                            type: type,
                            pageIndex: pageIndex,
                            pageSize: 5
                        }
                        , { emulateJSON: true })
                        .then(function (res) {
                            if (res.body != "go_login") {
                                _this.result = res.body.rows.reverse();;
                                //_this.result = [{ title: '头条', publisher: "天天", time: "2017-10-30 12:00", discussId: 1, content: "你很帅!" }];
                                _this.allpage = res.body.totalPageCount;
                            }
                            else { top.location.href = "../login.html"; }
                        })
                }, bindSelect: function () {
                    var _this = this;
                    $('#allSelect').on('click', function () {
                        if ($(this).html() == '全选') {
                            if ($('.felist').length < 1) {
                                return;
                            }
                            $('.felist').find('input[type=checkbox]').prop('checked', true);
                            $(this).html('取消全选');
                        } else {
                            $('.felist').find('input[type=checkbox]').prop('checked', '');
                            $(this).html('全选');
                        }
                    });
                    $('#setRead').on('click', function () {
                        var list = $('.felist').find('input[type=checkbox]:checked');
                        for (var i = 0; i < list.length; i++) {
                            var id = $(list[i]).data('id');
                            $(list[i]).prop('checked', '');
                            _this.$http.post("ashx/teacherCenter.ashx?action=updateSystemNoticeState",
                                {
                                    systemNoticeId: id,
                                    saveTag: 'update'
                                }
                                , { emulateJSON: true })
                                .then(function (res) {
                                    if (res.body == "go_login") {
                                        top.location.href = "../login.html";
                                    }
                                });
                        }
                        $('#allSelect').html('全选');
                        setTimeout(function () {
                            _this.getresult(_this.current, _this.type);
                        }, 100);
                    });
                    $('#delete').on('click', function () {
                        var list = $('.felist').find('input[type=checkbox]:checked');
                        layer.confirm('你确定要删除吗？', {
                            btn: ['确定', '取消'] //按钮
                        }, function () {
                            if (list.length < 1) {
                                layer.msg('无任何选择项');
                                return;
                            }
                            for (var i = 0; i < list.length; i++) {
                                var id = $(list[i]).data('id');
                                $(list[i]).prop('checked', '');
                                _this.$http.post("ashx/teacherCenter.ashx?action=updateSystemNoticeState",
                                    {
                                        systemNoticeId: id,
                                        saveTag: 'delete'
                                    }
                                    , { emulateJSON: true })
                                    .then(function (res) {
                                        if (res.body == "go_login") {
                                            top.location.href = "../login.html";
                                        }
                                        layer.closeAll();
                                    });
                            }
                            $('#allSelect').html('全选');
                            setTimeout(function () {
                                _this.getresult(_this.current, _this.type);
                                _this.$http.post("ashx/teacherCenter.ashx?action=getQuestionNum",
                                    {
                                    }
                                    , { emulateJSON: true })
                                    .then(function (res) {
                                        if (res.body != "go_login") {
                                            _this.replynum = res.body.num1;
                                            _this.discussnum = res.body.num2;
                                            _this.noticenum = res.body.num3;
                                        }
                                        else { top.location.href = "../login.html"; }
                                    });
                            }, 100);
                            //parent.close();
                        }, function () {
                        });

                        // setTimeout(function () {
                        //     location.reload();
                        //     layer.msg('删除成功！')
                        // },0);
                    });
                },
                goto: function (index) { //枫叶处理
                    var _this = this;
                    if (index == this.current) return;
                    if (index > this.allpage) {
                        this.current = this.current - 2;
                        layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
                        return false;
                    }
                    this.current = index;
                    _this.getresult(_this.current, _this.type);
                },
                lookNotice: function lookNotice(title, content,id) {
                    var _this = this;
                    _this.$http.post("ashx/teacherCenter.ashx?action=updateSystemNoticeState",
                        {
                            systemNoticeId: id,
                            saveTag: 'update'
                        }
                        , { emulateJSON: true })
                        .then(function (res) {
                            if (res.body == "go_login")
                            {
                                top.location.href = "../login.html";
                            }
                        });
                    layer.open({
                        type: 1,
                        title: title,
                        //closeBtn: 0, //不显示关闭按钮
                        shadeClose: false,
                        shade: [0.5, '#000'],
                        area: ['650px', '500px'],
                        //offset: 'rb', //右下角弹出
                        //time: 2000, //2秒后自动关闭
                        anim: 2,
                        content: '<div style="padding: 20px;text-indent:2em">' + content + '</div>'
                    });
                }
            }
        });
    }
    // 老师家校互动
    function teacherfamily() {
        $('.feteacherfamily .fehead').on('click', 'span', function () {
            if ($(this).hasClass('active')) {
                return
            } else {
                $(this).siblings().removeClass('active');
                $(this).addClass('active');
                var type = $(this).data('id');
                if (type == 1 || type == '1') {
                    $('#answeringreply').css('display', 'block');
                    $('#parentcontact').css('display', 'none');
                } else {
                    $('#parentcontact').css('display', 'block');
                    $('#answeringreply').css('display', 'none');
                }
            }
        })

        //答疑解惑
        new Vue({
            el: "#answeringreply",
            data: {
                result: [],
                courseName: '',//课程名称
                date:'',//日期
                state: '',//状态
                showItem: 4,//页码显示条数
                allpage: '1',//总页数
                current: 1//当前页
            },
            filters: {
                addRootFile: function addRootFile(img) {
                    return SERVERROOTFILE + img;
                }
            },
            computed: {
                pages: function () {
                    var pag = [];
                    if (this.current < this.showItem) { //如果当前的激活的项 小于要显示的条数
                        //总页数和要显示的条数那个大就显示多少条
                        var i = Math.min(this.showItem, this.allpage);
                        while (i) {
                            pag.unshift(i--);
                        }
                    } else { //当前页数大于显示页数了
                        var middle = this.current - Math.floor(this.showItem / 2), //从哪里开始
                            i = this.showItem;
                        if (middle > (this.allpage - this.showItem)) {
                            middle = (this.allpage - this.showItem) + 1
                        }
                        while (i--) {
                            pag.push(middle++);
                        }
                    }
                    return pag
                }
            },
            mounted: function () {
                var _this = this;
                this.$nextTick(function () {
                    _this.getresult(1, _this.courseName, _this.date, _this.state);
        
                    _this.bindfn();
                })
            },
            methods: {
  
                bindfn: function bindfn() {
                    var _this = this;
                    $('#answeringreply .feoperation').on('click', 'button:first-child', function () {
                        _this.courseName = $('#suject').val();
                        _this.date = $('#questiontime').val();
                        _this.state = $('#state').val();
                        _this.current = 1;
                        _this.getresult(_this.current, _this.courseName, _this.date, _this.state);
                    });
                    $('#answeringreply .feoperation').on('click', 'button:last-child', function () {
                        _this.courseName = '';
                        _this.date = '';
                        _this.state = '';
                        $('#suject').val('');
                        $('#questiontime').val('');
                        $('#state').val('');
                        _this.current = 1;
                        _this.getresult(_this.current, _this.courseName, _this.date, _this.state);
                    });
                    $('#questiontime').ECalendar({
                        type: "date", //模式，time: 带时间选择; date: 不带时间选择;
                        stamp: false, //是否转成时间戳，默认true;
                        offset: [0, 2], //弹框手动偏移量;
                        format: "yyyy-mm-dd", //时间格式 默认 yyyy-mm-dd hh:ii;
                        //skin: 3, //皮肤颜色，默认随机，可选值：0-8,或者直接标注颜色值;
                        step: 10, //选择时间分钟的精确度;
                        callback: function(v, e) {} //回调函数
                    });
                },
                getresult: function (pageIndex, courseName, date, state) {
                    var _this = this;
                    this.$http.post("ashx/teacherCenter.ashx?action=getStudentQuestion",
                        {
                            courseName: courseName,
                            date: date,
                            replystate: state,
                            pageIndex: pageIndex,
                            pageSize: 5
                        }
                        , { emulateJSON: true })
                        .then(function (res) {
                            if (res.body != "go_login") {
                                _this.result = res.body.rows;
                                //_this.result = [{ questionContent: 'dada', courseName: '大大', questioner: "天天", time: "2017-10-30 12:00", questionId: 1, type: "未解决" }]
                                _this.allpage = res.body.totalPageCount;
                            }
                            else {
                                top.location.href = "../login.html";
                            }
                        }).then(function () {
                        
                       
                        })
                },
                jumpjieda: function (id, title, coursename, time, teachername)
                {
                    // 查看详情
              
                    layer.open({
                        type: 2,
                        title: '详情',
                        //closeBtn: 0, //不显示关闭按钮
                        shadeClose: false,
                        shade: [0.5, '#000'],
                        area: ['800px', '550px'],
                        //offset: 'rb', //右下角弹出
                        //time: 2000, //2秒后自动关闭
                        anim: 2,
                        content: 'answeringreplydetail.html?questionId=' + id + '&title=' + title + '&coursename=' + coursename + '&time=' + time + "&teachername=" + teachername
                    });
              
                },
                goto: function (index) { //枫叶处理
                    var _this = this;
                    if (index == this.current) return;
                    if (index > this.allpage) {
                        this.current = this.current - 2;
                        layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
                        return false;
                    }
                    this.current = index;
                    _this.getresult(_this.current, _this.courseName, _this.date, _this.state);
                }
            }
        });
        //召开家长会
        new Vue({
            el: "#parentcontact",
            data: {
                result: [],
                classarray:[],
                showItem: 4,//页码显示条数
                allpage: '1',//总页数
                current: 1//当前页
            },
            filters: {
                addRootFile: function addRootFile(img) {
                    return SERVERROOTFILE + img;
                }
            },
            computed: {
                pages: function () {
                    var pag = [];
                    if (this.current < this.showItem) { //如果当前的激活的项 小于要显示的条数
                        //总页数和要显示的条数那个大就显示多少条
                        var i = Math.min(this.showItem, this.allpage);
                        while (i) {
                            pag.unshift(i--);
                        }
                    } else { //当前页数大于显示页数了
                        var middle = this.current - Math.floor(this.showItem / 2), //从哪里开始
                            i = this.showItem;
                        if (middle > (this.allpage - this.showItem)) {
                            middle = (this.allpage - this.showItem) + 1
                        }
                        while (i--) {
                            pag.push(middle++);
                        }
                    }
                    return pag
                }
            },
            mounted: function () {
                var _this = this;
                this.$nextTick(function () {
                    _this.getresult(1);
                    _this.bindfn();
                })
            },
            methods: {
                bindfn: function bindfn() {
                    var _this = this;
                    $('#meetingBTime').ECalendar({
                        type: "time", //模式，time: 带时间选择; date: 不带时间选择;
                        stamp: false, //是否转成时间戳，默认true;
                        offset: [0, 2], //弹框手动偏移量;
                        format: "yyyy-mm-dd hh:ii", //时间格式 默认 yyyy-mm-dd hh:ii;
                        //skin: 3, //皮肤颜色，默认随机，可选值：0-8,或者直接标注颜色值;
                        step: 10, //选择时间分钟的精确度;
                        callback: function (v, e) { } //回调函数
                    });
                    $('#meetingETime').ECalendar({
                        type: "time", //模式，time: 带时间选择; date: 不带时间选择;
                        stamp: false, //是否转成时间戳，默认true;
                        offset: [0, 2], //弹框手动偏移量;
                        format: "yyyy-mm-dd hh:ii", //时间格式 默认 yyyy-mm-dd hh:ii;
                        //skin: 3, //皮肤颜色，默认随机，可选值：0-8,或者直接标注颜色值;
                        step: 10, //选择时间分钟的精确度;
                        callback: function (v, e) { } //回调函数
                    });
                    $('.addnewPop').on('click', 'button', function () {
                        layer.open({
                            type: 1,
                            title: "新增会议",
                            area: ['800px', '600px'],
                            content: $('#addnewPop') //这里content是一个DOM
                        });
                    })
                    //新增会议取消方法
                    $('#addnewPop .feoperation').on('click', 'button:last-child', function () {
                        layer.closeAll();
                    });
                    this.$http.post("ashx/teacherCenter.ashx?action=getTeacherClass",
                        {
                            pageIndex: 1,
                            pageSize: 9999
                        }
                        , { emulateJSON: true }).then(function (res) {
                            if (res.body != "go_login") {
                                _this.classarray = res.body.rows;
                            }
                            else {
                                top.location.href = "../login.html";
                            }
                        })
                    //新增会议保存方法
                    $('#addnewPop .feoperation').on('click', 'button:first-child', function () {

                        _this.$http.post("ashx/teacherCenter.ashx?action=ChannelProgramSave",
                        {
                            channelProgramId: $("#channelProgramId").val(),
                            classId: $("#class").val(),
                            title: $("#title").val(),
                            playBeginTime: $("#meetingBTime").val(),
                            playEndTime: $("#meetingETime").val(),
                            note: $("#metContent").val(),
                            saveTag: $("#saveT").val()
                        }
                        , { emulateJSON: true })
                        .then(function (res) {
                            if (res.body != "go_login") {
                                if (res.body == 200)
                                {
                                    layer.msg("已提交");
                                    setTimeout(function () {
                                        layer.closeAll();
                                        window.location.reload();
                                    }, 1000)
                           
                                }
                            }
                            else {
                                top.location.href = "../login.html";
                            }
                        })
                    });
                
                },
                getresult: function (pageIndex) {
                    var _this = this;
                    this.$http.post("ashx/teacherCenter.ashx?action=getParentsMeeting",
                        {
                            pageIndex: pageIndex,
                            pageSize: 5
                        }
                        , { emulateJSON: true })
                        .then(function (res) {
                            if (res.body != "go_login") {
                                _this.result = res.body.rows;
                                //_this.result = [{ questionContent: 'dada', courseName: '大大', questioner: "天天", time: "2017-10-30 12:00", questionId: 1, type: "未解决" }]
                                _this.allpage = res.body.totalPageCount;
                            }
                            else {
                                top.location.href = "../login.html";
                            }
                        }).then(function () {
                        
                        })
                },
                lookmeeting: function (id,classId, name, playBTime, playETime, note) {
                    $("#class").find("option[value='" + classId + "']").attr("selected", true);
                    $("#channelProgramId").val(id);
                    $("#title").val(name);
                    $("#meetingBTime").val(playBTime);
                    $("#meetingETime").val(playETime);
                    $("#metContent").val(note);
                    $("#saveT").val("update");
                    layer.open({
                        type: 1,
                        title: "新增会议",
                        area: ['800px', '600px'],
                        content: $('#addnewPop') //这里content是一个DOM
                    });
                },
                goto: function (index) { //枫叶处理
                    var _this = this;
                    if (index == this.current) return;
                    if (index > this.allpage) {
                        this.current = this.current - 2;
                        layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
                        return false;
                    }
                    this.current = index;
                    _this.getresult(_this.current);
                }
            }
        });
    }
    // 我的课程
    function mycourse() {
        $('.festudentmycourse .fehead').on('click', 'span', function () {
            if ($(this).hasClass('active')) {
                return;
            } else {
                $(this).siblings().removeClass('active');
                $(this).addClass('active');
                if ($(this).data('id') == 1) {
                    $('#livecourse').css('display', 'block');
                    $('#recordedcourse').css('display', 'none');
                } else {
                    $('#livecourse').css('display', 'none');
                    $('#recordedcourse').css('display', 'block');
                }
            }
        });
        new Vue({
            el: "#livecourse",
            data: {
                livecourse: [],
                showItem: 4,//页码显示条数
                allpage: '',//总页数
                current: 1,//当前页
                subjectName: '',
                courseName: '',
                playState: ''
            },
            filters: {
                addRootFile: function addRootFile(img) {
                    return SERVERROOTFILE + img;
                },
                addCourseRoot: function addCourseRoot(id) {
                    return 'http://www.fetv.cn/cloundcoursedetail.html?courseId=' + id;//feweb/
                },
                goToLive: function goToLive(cid, pid) {
                    return "http://www.fetv.cn/liveroom.html?channelId=" + cid + "&channelProgramId=" + pid;//feweb/
                }
            },
            computed: {
                pages: function () {
                    var pag = [];
                    if (this.current < this.showItem) { //如果当前的激活的项 小于要显示的条数
                        //总页数和要显示的条数那个大就显示多少条
                        var i = Math.min(this.showItem, this.allpage);
                        while (i) {
                            pag.unshift(i--);
                        }
                    } else { //当前页数大于显示页数了
                        var middle = this.current - Math.floor(this.showItem / 2), //从哪里开始
                            i = this.showItem;
                        if (middle > (this.allpage - this.showItem)) {
                            middle = (this.allpage - this.showItem) + 1
                        }
                        while (i--) {
                            pag.push(middle++);
                        }
                    }
                    return pag
                }
            },
            mounted: function () {
                var _this = this;
                this.$nextTick(function () {
                    _this.getlivecourse(1, _this.subjectName, _this.courseName, _this.playState);
                    _this.bindSearch();
                    _this.emptySearch();
                })
            },
            methods: {
                getlivecourse: function (pageIndex, subjectName, courseName, playState) {
                    var _this = this;
                    var index = layer.load(1, { shade: false }); //0代表加载的风格，支持0-2
                    this.$http.post("ashx/teacherCenter.ashx?action=getOrderLiveCourse",
                        {
                            //userId: studentId,
                            //userType: 'student',
                            subjectName: subjectName,
                            courseName: courseName,
                            playState: playState,
                            pageIndex: pageIndex,
                            pageSize: 5
                        }
                        , { emulateJSON: true })
                        .then(function (res) {
                            if (res.body != "go_login") {
                                layer.closeAll();
                                if (res.body.code == 200) {
                                    _this.livecourse = res.body.rows;
                                    _this.allpage = res.body.totalPageCount;
                                }
                            }
                            else {
                                top.location.href = "../login.html";
                            }
                        })
                },
                goto: function (index) { //枫叶处理
                    var _this = this;
                    if (index == this.current) return;
                    if (index > this.allpage) {
                        this.current = this.current - 2;
                        layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
                        return false;
                    }
                    this.current = index;
                    _this.getlivecourse(_this.current, _this.subjectName, _this.courseName, _this.playState);
                },
                bindSearch: function bindSearch() {
                    var _this = this;
                    $('#livecourse .feselect .feoperation').on('click', 'button:first-child', function () {
                        _this.subjectName = $(this).parent().parent().find('#subject1').val();
                        _this.courseName = $(this).parent().parent().find('#courseName1').val();
                        _this.playState = $(this).parent().parent().find('#playState1').val();
                        _this.current = 1;
                        _this.getlivecourse(_this.current, _this.subjectName, _this.courseName, _this.playState);
                    });
                },
                emptySearch: function emptySearch() {
                    var _this = this;
                    $('#livecourse .feselect .feoperation').on('click', 'button:last-child', function () {
                        $(this).parent().parent().find('#subject1').val('');
                        $(this).parent().parent().find('#courseName1').val('');
                        $(this).parent().parent().find('#playState1').val('');
                        _this.current = 1;
                        _this.subjectName = '';
                        _this.courseName = '';
                        _this.playState = '';
                        _this.getlivecourse(_this.current, _this.subjectName, _this.courseName, _this.playState);
                    });
                },
                //评价
                pingjia: function (id, kid) {
                    layer.open({
                        type: 2,
                        title: '添加评价',
                        //closeBtn: 0, //不显示关闭按钮
                        shadeClose: false,
                        shade: [0.5, '#000'],
                        area: ['520px', '400px'],
                        //offset: 'rb', //右下角弹出
                        //time: 2000, //2秒后自动关闭
                        anim: 2,
                        resize: false,
                        content: 'addcoursecomment.html?courseId=' + id + "&courseKind=" + kid
                    });
                }
            }
        });
        new Vue({
            el: "#recordedcourse",
            data: {
                recordedcourse: [],
                showItem: 4,//页码显示条数
                allpage: '',//总页数
                current: 1,//当前页
                subjectName: '',
                courseName: '',
                playState: ''
            },
            filters: {
                addRootFile: function addRootFile(img) {
                    return SERVERROOTFILE + img;
                },
                addCourseRoot: function addCourseRoot(id) {
                    return 'http://www.fetv.cn/coursedetail.html?courseId=' + id;//feweb/
                },
                goToCourse: function goToCourse(cid,kid) {
                    return 'http://www.fetv.cn/courseplayer.html?cid=' + cid + "&vid=" + "&courseType=0&courseKind=" + kid;//feweb/
                }
            },
            computed: {
                pages: function () {
                    var pag = [];
                    if (this.current < this.showItem) { //如果当前的激活的项 小于要显示的条数
                        //总页数和要显示的条数那个大就显示多少条
                        var i = Math.min(this.showItem, this.allpage);
                        while (i) {
                            pag.unshift(i--);
                        }
                    } else { //当前页数大于显示页数了
                        var middle = this.current - Math.floor(this.showItem / 2), //从哪里开始
                            i = this.showItem;
                        if (middle > (this.allpage - this.showItem)) {
                            middle = (this.allpage - this.showItem) + 1
                        }
                        while (i--) {
                            pag.push(middle++);
                        }
                    }
                    return pag
                }
            },
            mounted: function () {
                var _this = this;
                this.$nextTick(function () {
                    _this.getrecordedcourse(1, _this.subjectName, _this.courseName, _this.playState);
                    _this.bindSearch();
                    _this.emptySearch();
                })
            },
            methods: {
                getrecordedcourse: function (pageIndex, subjectName, courseName, playState) {
                    var _this = this;
                    var index = layer.load(1, { shade: false }); //0代表加载的风格，支持0-2
                    this.$http.post("ashx/teacherCenter.ashx?action=getOrderRecordCourse",
                        {
                            //userId: studentId,
                            //userType: 'student',
                            subjectName: subjectName,
                            courseName: courseName,
                            playState: playState,
                            pageIndex: pageIndex,
                            pageSize: 5
                        }
                        , { emulateJSON: true })
                        .then(function (res) {
                            if (res.body != "go_login") {
                                layer.closeAll();
                                if (res.body.code == 200) {
                                    _this.recordedcourse = res.body.rows;
                                    _this.allpage = res.body.totalPageCount;
                                }
                            }
                            else {
                                top.location.href = "../login.html";
                            }
                        })
                },
                goto: function (index) { //枫叶处理
                    var _this = this;
                    if (index == this.current) return;
                    if (index > this.allpage) {
                        this.current = this.current - 2;
                        layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
                        return false;
                    }
                    this.current = index;
                    _this.getrecordedcourse(_this.current, _this.subjectName, _this.courseName, _this.playState);
                },
                bindSearch: function bindSearch() {
                    var _this = this;
                    $('#recordedcourse .feselect .feoperation').on('click', 'button:first-child', function () {
                        _this.subjectName = $(this).parent().parent().find('#subject2').val();
                        _this.courseName = $(this).parent().parent().find('#courseName2').val();
                        _this.playState = $(this).parent().parent().find('#playState2').val();
                        _this.current = 1;
                        _this.getrecordedcourse(_this.current, _this.subjectName, _this.courseName, _this.playState);
                    });
                },
                emptySearch: function emptySearch() {
                    var _this = this;
                    $('#recordedcourse .feselect .feoperation').on('click', 'button:last-child', function () {
                        $(this).parent().parent().find('#subject2').val('');
                        $(this).parent().parent().find('#courseName2').val('');
                        $(this).parent().parent().find('#playState2').val('');
                        _this.current = 1;
                        _this.subjectName = '';
                        _this.courseName = '';
                        _this.playState = '';
                        _this.getrecordedcourse(_this.current, _this.subjectName, _this.courseName, _this.playState);
                    });
                },
                //评价
                pingjia: function (id, kid) {
                    layer.open({
                        type: 2,
                        title: '添加评价',
                        //closeBtn: 0, //不显示关闭按钮
                        shadeClose: false,
                        shade: [0.5, '#000'],
                        area: ['520px', '400px'],
                        //offset: 'rb', //右下角弹出
                        //time: 2000, //2秒后自动关闭
                        anim: 2,
                        resize: false,
                        content: 'addcoursecomment.html?courseId=' + id + "&courseKind=" + kid
                    });
                }
            }
        });
    }
    // 添加课程评价
    function addcoursecomment(cid, kid) {
    
        $('.addcoursecomment .fescore').on('click', 'li', function () {
            if ($(this).hasClass('active')) {
                return;
            } else {
                $(this).siblings().removeClass('active');
                $(this).addClass('active');
                var count = $(this).data('id');
                $('.addcoursecomment .fescore li').removeClass('fullstar');
                for (var i = 1; i <= count; i++) {
                    $('.addcoursecomment .fescore li:nth-child(' + i + ')').addClass('fullstar');
                }
                var text = '';
                switch (count) {
                    case 1:
                        text = "非常差";
                        break;
                    case 2:
                        text = "差";
                        break;
                    case 3:
                        text = "一般";
                        break;
                    case 4:
                        text = "满意";
                        break;
                    case 5:
                        text = "非常满意";
                        break;
                }
                $('.addcoursecomment .fepanel b').html(text);
            }
        });
        $('.addcoursecomment .feoperation').on('click', 'button:last-child', function () {
            parent.close();
        });
        $('.addcoursecomment .feoperation').on('click', 'button:first-child', function () {
            if ($("#clickCount").val() == "1") {
                return;
            }
            $("#clickCount").val("1");
            var dom = $('.addcoursecomment .fescore').find('.active');
            if (dom.length < 1) {
                layer.msg('请进行评分!');
                $("#clickCount").val("0");
            } else {
                // console.log(dom.data('id')*2);
                if (!isEmpty($('#discuss').val())) {
                    layer.msg('评论不能为空');
                    $("#clickCount").val("0");
                } else {
                    $.ajax({
                        type: "post",
                        url: "ashx/teacherCenter.ashx?action=evaluation",
                        dataType: 'text',
                        data: {
                            //valuatorId: uId,
                            //userType: userType,
                            courseId: cid,
                            courseKind: kid,
                            score: dom.data('id') * 2,
                            levelOneEvaluationId: 0,
                            parentId: 0,
                            evaluation: $('#discuss').val()
                        },
                        success: function (res) {
                            if (res.body != "go_login") {
                                var data = JSON.parse(res);
                                if (data.code == 200) {
                                    layer.msg('评论成功');
                                    setTimeout(function () {
                                        // $("#clickCount").val("0");
                                        parent.close();
                                    }, 1000);
                                } else {
                                    layer.msg('提问失败');
                                    setTimeout(function () {
                                        $("#clickCount").val("0");
                                    }, 1000);
                                }
                            }
                            else {
                                top.location.href = "../login.html";
                            }
                        },
                        error: function (ex) {

                        }
                    });
                }
            }

        })
    }
    function arrangework() {
    
        $('.festudentmycourse .fehead').on('click', 'span', function () {
            if ($(this).hasClass('active')) {
                return;
            } else {
                $(this).siblings().removeClass('active');
                $(this).addClass('active');
                if ($(this).data('id') == 1) {
                    $('#homework').css('display', 'block');
                    $('#onlineexam').css('display', 'none');
                } else {
                    $('#homework').css('display', 'none');
                    $('#onlineexam').css('display', 'block');
                }
            }
        });
        // 在线作业
        new Vue({
            el: "#homework",
            data: {
                homework: [],
                array: [],
                Couarray:[],
                showItem: 4,//页码显示条数
                allpage: '',//总页数
                current: 1,//当前页
                subjectName: '',
                className: '0',
                arrangeTime: '4',
                courseId: '0'
            },
            filters: {
                addRootFile: function addRootFile(img) {
                    return SERVERROOTFILE + img;
                },
                lookpaper: function lookpaper(id) {
                    return "tasktemplate.html?paperid=" + id;
                }
            },
            computed: {
                pages: function () {
                    var pag = [];
                    if (this.current < this.showItem) { //如果当前的激活的项 小于要显示的条数
                        //总页数和要显示的条数那个大就显示多少条
                        var i = Math.min(this.showItem, this.allpage);
                        while (i) {
                            pag.unshift(i--);
                        }
                    } else { //当前页数大于显示页数了
                        var middle = this.current - Math.floor(this.showItem / 2), //从哪里开始
                            i = this.showItem;
                        if (middle > (this.allpage - this.showItem)) {
                            middle = (this.allpage - this.showItem) + 1
                        }
                        while (i--) {
                            pag.push(middle++);
                        }
                    }
                    return pag
                }
            },
            mounted: function () {
                var _this = this;
                this.$nextTick(function () {
                    _this.gethomework(1, _this.className, _this.arrangeTime,_this.courseId);
                    _this.bindSearch();
                    //_this.bindCourse();
                })
            },
            methods: {
                seePaper: function (id) {
                    $(window).storager({ //fePrePage
                        key: 'teachercenterPaperId',
                        // value: $.getBasePath(1),
                        value: id,
                        expires: 0
                    }).addStorage();
                    window.location.href = "tasktemplate.html";//?articleId=" + $(this).parent().data('id');
                },
                bindCompleteease:function (id,classId) {
                    layer.open({
                        type: 2,
                        // title: '',
                        //closeBtn: 0, //不显示关闭按钮
                        shadeClose: false,
                        shade: [0.5, '#000'],
                        area: ['800px', '550px'],
                        //offset: 'rb', //右下角弹出
                        //time: 2000, //2秒后自动关闭
                        anim: 2,
                        content: 'completesituation.html?id=' + id + "&classId=" + classId
                    });
                },
                gethomework: function (pageIndex, className, arrangeTime, courseId) {
                    var _this = this;
                    this.$http.post("ashx/teacherCenter.ashx?action=getTeacherSetWork",
                        {
                            courseId : courseId,
                            classId: className,
                            type:0,
                            playState: arrangeTime,
                            pageIndex: pageIndex,
                            pageSize: 12
                        }
                        , { emulateJSON: true })
                        .then(function (res) {
                            if (res.body != "go_login") {
                                _this.homework = res.body.rows.reverse();
                                _this.allpage = res.body.totalPageCount;
                            }
                            else {
                                top.location.href = "../login.html";
                            }
                            //if (res.body.code == 200) {
                            
                            //}
                        })
                },
                goto: function (index) { //枫叶处理
                    var _this = this;
                    if (index == this.current) return;
                    if (index > this.allpage) {
                        this.current = this.current - 2;
                        layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
                        return false;
                    }
                    this.current = index;
                    _this.gethomework(_this.current, _this.className, _this.arrangeTime);
                },
                bindCourse:function bindCourse()
                {
                    var _this = this;
                    this.$http.post("ashx/teacherCenter.ashx?action=getTeacherCourse",
                        {
                           
                        }
                        , { emulateJSON: true }).then(function (res) {
                            if (res.body != "go_login") {
                                _this.Couarray = res.body.rows;
                            }
                            else {
                                top.location.href = "../login.html";
                            }
                        })
                },
                bindSearch: function bindSearch() {
                    var _this = this;
                    //$('#homework .feselect').on('change', 'select:first-child', function () {
                    //    _this.subjectName = $(this).val();
                    //    _this.arrangeTime = $(this).next().val();
                    //    _this.current = 1;
                    //    _this.gethomework(_this.current, _this.subjectName, _this.arrangeTime);
                    //});
                    //$('#homework .feselect').on('change', 'select:last-child', function () {
                    //    _this.subjectName = $(this).prev().val();
                    //    _this.arrangeTime = $(this).val();
                    //    _this.current = 1;
                    //    _this.gethomework(_this.current, _this.subjectName, _this.arrangeTime);
                    //});
                    this.$http.post("ashx/teacherCenter.ashx?action=getTeacherClass",
                        {
                            pageIndex: 1,
                            pageSize: 9999
                        }
                        , { emulateJSON: true }).then(function (res) {
                            if (res.body != "go_login") {
                                _this.array = res.body.rows;
                            }
                            else {
                                top.location.href = "../login.html";
                            }
                        }).then(function () {
                            var _this = this;
                            $('#homework .feselect').on('change', '#classes', function () {
                                _this.className = $(this).val();
                                //_this.arrangeTime = $(this).next().val();
                                _this.current = 1;
                                _this.gethomework(_this.current, _this.className, _this.arrangeTime);
                            });
                        })
                
                    $('#homework .feselect').on('change', '#time', function () {
                        //_this.className = $(this).prev().val();
                        _this.arrangeTime = $(this).val();
                        _this.current = 1;
                        _this.gethomework(_this.current, _this.className, _this.arrangeTime);
                    });
                    //$('#homework .feselect>p').on('click', 'button:first-child', function () {
                    //    //window.location.href = "arrangetaskdetail.html";
                    //    layer.open({
                    //        type: 2,
                    //        // title: '',
                    //        //closeBtn: 0, //不显示关闭按钮
                    //        shadeClose: false,
                    //        shade: [0.5, '#000'],
                    //        area: ['800px', '550px'],
                    //        //offset: 'rb', //右下角弹出
                    //        //time: 2000, //2秒后自动关闭
                    //        anim: 2,
                    //        content: 'arrangetaskdetail.html'//?type=1
                    //    });
                    //});
                    //$('#homework .feselect>p').on('click', 'button:last-child', function () {
                    //    window.location.href = "arrangetaskdetail.html";
                    //});
                    $('#homework .feselect>p').on('click', '#paperWork', function () {
                        // layer.open({
                        //     type: 2,
                        //     // title: '',
                        //     //closeBtn: 0, //不显示关闭按钮
                        //     shadeClose: false,
                        //     shade: [0.5, '#000'],
                        //     area: ['800px', '550px'],
                        //     //offset: 'rb', //右下角弹出
                        //     //time: 2000, //2秒后自动关闭
                        //     anim: 2,
                        //     content: 'createtestpaper.html?type=1'
                        // });
                        layer.open({
                            type: 2,
                            title: '布置作业',
                            //closeBtn: 0, //不显示关闭按钮
                            shadeClose: false,
                            shade: [0.5, '#000'],
                            area: ['880px', '510px'],
                            //offset: 'rb', //右下角弹出
                            //time: 2000, //2秒后自动关闭
                            anim: 2,
                            content: 'arrangetaskPop.html'
                        });
                    })
                    $('#homework .feselect>p').on('click', '#batchQuestion', function () {
                        window.open('batchimportquestion.html');
                    });
                    $('#homework .feselect>p').on('click', '#photoWork', function () {
                        layer.open({
                            type: 2,
                            title: '图片作业',
                            //closeBtn: 0, //不显示关闭按钮
                            shadeClose: false,
                            shade: [0.5, '#000'],
                            area: ['880px', '510px'],
                            //offset: 'rb', //右下角弹出
                            //time: 2000, //2秒后自动关闭
                            anim: 2,
                            content: 'phototaskPop.html'
                        });
                    })
                }
            }
        });
        
    }
    // 布置作业1级弹框
    function arrangeTaskPop() {
        new Vue({
            el: "#basicTask",
            data: {
                array: [],
                teacherClass: [],
                teacherCourse: [],
                teacherOutline: []
            },
            filters: {
                addRootFile: function addRootFile(img) {
                    return SERVERROOTFILE + img;
                }
            },
            mounted: function () {
                var _this = this;
                this.$nextTick(function () {
                    _this.init();
                    _this.getClass();
                    _this.getCourse();
                })
            },
            methods: {
                init: function () {
                    parent.ECalendarisOpen1($("#endTime"));
                    $('.fe-arrangetask-pop').on('click', '#random', function () {
                        $('.fe-random').show()
                    });
                    $('.fe-arrangetask-pop').on('click', '#static', function () {
                        $('.fe-random').hide()
                    });
                    $('.fe-arrangetask-pop').on('click', '.fe-random button', function () {
                        parent.layer.open({
                            type: 2,
                            title: '知识点大纲',
                            //closeBtn: 0, //不显示关闭按钮
                            shadeClose: false,
                            shade: [0.5, '#000'],
                            area: ['600px', '400px'],
                            //offset: 'rb', //右下角弹出
                            //time: 2000, //2秒后自动关闭
                            anim: 2,
                            content: 'knowledgepointPop.html?type=1'
                        })

                    });
                    $(".fe-arrangetask-pop #classes").on('click', "div", function () {
                        if ($(this).hasClass("active")) {
                            $(this).removeClass("active");
                        }
                        else {
                            $(this).addClass("active");
                        }
                    })
                    // 添加题型
                    $('.fe-arrangetask-pop').on('click', '#hidden-btn', function () {
                        var kn = $('#knowledgeName').val();
                        var count = "0";
                        var diff = "1";
                        var knowledgeId = $('#knowledgeId').val();
                        var source = $('#knowledgeSource').val();
                        var selectquestionStr = "";
                        var questionTypeIdOne = "";
                        $.ajax({
                            async: false,
                            type: "post",
                            url: "ashx/teacherCenter.ashx",
                            data: { action: "getNewsQuestionType", knowledgeId: knowledgeId }, //提交表单，vistor.ashx?ID=XXX
                            success: function (msg) {
                                if (msg != "") {
                                    var ob = JSON.parse(msg);
                                    var num = ob.totalCount;
                                    //var selObj = $("#chapter");
                                    //selObj.empty();
                                    for (var i = 0; i < num; i++) {
                                        if (i == 0)
                                        {
                                            questionTypeIdOne = ob.rows[i].questionTypeId;
                                        }
                                        var value = ob.rows[i].questionTypeId;
                                        var text = Trim(ob.rows[i].name);
                                        selectquestionStr += "<option value='" + value + "'>" + text + "</option>";

                                        //selObj.append("<option value='" + value + "'>" + text + "</option>");
                                    }
                                }
                                
                            } //操作成功后的操作！msg是后台传过来的值
                        , error: function (ex) {
                            alert(ex);
                        }
                        });
                        $.ajax({
                            async: false,
                            type: "post",
                            url: "ashx/teacherCenter.ashx",
                            data: { action: "getNewsQuestionNum", knowledgeId: knowledgeId, source: source, questionTypeIdOne: questionTypeIdOne, diff: diff }, //提交表单，vistor.ashx?ID=XXX
                            success: function (msg) {
                                if (msg != "") {
                                    count = msg;
                                }

                            } //操作成功后的操作！msg是后台传过来的值
                        , error: function (ex) {
                            alert(ex);
                        }
                        });
                        //_this.$http.post("ashx/teacherCenter.ashx?action=getNewsQuestionType",
                        //{
                        //    knowledgeId: knowledgeId
                        //}
                        //, { emulateJSON: true }).then(function (res) {
                        //    if (res.body != "") {
                                
                        //    }
                        //})

                        var content = $('<div class="fe-add-new-timu" data-id="' + knowledgeId + '" data-count="' + count + '" data-source="' + source + '"></div>');
                        var span = $('<span>' + kn + '</span>');
                        var selectQuestion = $('<select class="question">' + selectquestionStr + '</select>');
                        selectQuestion.on('change', function () {
                            var _this = this;
                            questionTypeIdOne = $(this).val();
                            $.ajax({
                                type: "post",
                                url: "ashx/teacherCenter.ashx",
                                data: { action: "getNewsQuestionNum", knowledgeId: knowledgeId, source: source, questionTypeIdOne: questionTypeIdOne, diff: diff }, //提交表单，vistor.ashx?ID=XXX
                                success: function (msg) {
                                    if (msg != "") {
                                        count = msg;
                                        $(_this).parent().find(".pCount").html(count);
                                    }

                                } //操作成功后的操作！msg是后台传过来的值
                        , error: function (ex) {
                            alert(ex);
                        }
                            });
                        })
                        var selectNandu = $('<select class="difficulty"><option value="1">简单</option><option value="2">一般</option><option value="3">困难</option></select>');
                        selectNandu.on('change', function () {
                            var _this = this;
                            diff = $(this).val();
                            $.ajax({
                                type: "post",
                                url: "ashx/teacherCenter.ashx",
                                data: { action: "getNewsQuestionNum", knowledgeId: knowledgeId, source: source, questionTypeIdOne: questionTypeIdOne, diff: diff }, //提交表单，vistor.ashx?ID=XXX
                                success: function (msg) {
                                    if (msg != "") {
                                        count = msg;
                                        $(_this).parent().find(".pCount").html(count);
                                    }

                                } //操作成功后的操作！msg是后台传过来的值
                        , error: function (ex) {
                            alert(ex);
                        }
                            });
                        })
                        var other = $('<div style="display: inline-block">&nbsp;&nbsp;题数: <input type="number" style="width: 80px"> /<span style="width:auto;margin-right:10px;" class="pCount">' + count + ' </span>&nbsp;&nbsp;单题分数: <input type="text" class="fenshu" style="width: 80px"><b class="uk-icon-trash"></b></div>');
                        content.append(span);
                        content.append(selectQuestion);
                        content.append(selectNandu);
                        content.append(other);
                        $(this).before(content);
                    });
                    $('.fe-arrangetask-pop').on('click', '.fe-save button', function () {
                        if ($("#paperName").val() == "")
                        {
                            layer.msg("作业名称不能为空");
                            return;
                        }
                        var classAry = $("#classes").find(".active");
                        if (classAry.length == 0) {
                            layer.msg("请选择班级");
                            return;
                        }
                       
                        var classstr = "";
                        for (var i = 0 ; i < classAry.length ; i++)
                        {
                            classstr += classAry[i].dataset.id;
                            if (i != classAry.length - 1)
                            {
                                classstr += ",";
                            }
                        }
                        
                        if ($("#static").prop("checked") == true) {
                            var name = $("#paperName").val();
                            var classId = classstr;
                            var courseId = $("#teacherCourse").val();
                            var courseCatalogId = $("#chapter").val();
                            var endTime = $("#endTime").val();
                            //console.log(name + "," + classId + "," + courseId + "," + courseCatalogId + "," + endTime);
                            parent.layer.closeAll();

                            parent.layer.open({
                                type: 2,
                                title: '题库选题',
                                //closeBtn: 0, //不显示关闭按钮
                                shadeClose: false,
                                shade: [0.5, '#000'],
                                area: ['880px', '593px'],
                                //offset: 'rb', //右下角弹出
                                //time: 2000, //2秒后自动关闭
                                anim: 2,
                                content: 'selectquestionPop.html?name='+name +'&classId='+classId + '&courseId='+courseId + '&courseCatalogId='+courseCatalogId+'&endTime='+endTime 
                            })
                            console.log(name + "," + classId + "," + courseId + "," + courseCatalogId + "," + endTime);

                        }
                        else {
                            var listArray = $(".fe-random .fe-add-new-timu");
                            if (listArray.length < 1) {
                                layer.msg("请添加组卷规则");
                                return;
                            }
                            else {
                                var roleArray = "";
                                for (var i = 0 ; i < listArray.length; i++)
                                {
                                    var knowId = listArray[i].dataset.id;
                                    var count = listArray[i].dataset.count;
                                    var kSource = listArray[i].dataset.source;
                                    var typeId = $(listArray[i]).find(".question").val();
                                    var difficultyId = $(listArray[i]).find(".difficulty").val();
                                    var questionCount = $(listArray[i]).find("input:first-child").val();
                                    var score = $(listArray[i]).find(".fenshu").val();
                                    if (parseInt(questionCount) >parseInt(count))
                                    {
                                        layer.msg("题数大于可选数量");
                                        return;
                                    }
                                    if (questionCount <= 0)
                                    {
                                        layer.msg("题数必须大于0");
                                        return;
                                    }
                                    if (score <= 0) {
                                        layer.msg("分值必须大于0");
                                        return;
                                    }
                                    roleArray += knowId + "," + typeId + "," + difficultyId + "," + questionCount + "," + score + "," + kSource;
                                    if (i != listArray.length - 1)
                                    {
                                        roleArray += "|";
                                    }
                                    //roleArray.push(new obj(knowId, count, typeId, difficultyId, questionCount, score));

                                }
                                $.ajax({
                                    async: false,
                                    type: "post",
                                    url: "ashx/teacherCenter.ashx",
                                    data: { action: "homeworkSaveNew", role: roleArray, photoArray: photoArray, paperType: "1", classify: "1", name: $("#paperName").val(), classId: classstr, courseId: $("#teacherCourse").val(), courseCatalogId: $("#chapter").val(), endDate: $("#endTime").val(), saveTag: "add" }, //提交表单，vistor.ashx?ID=XXX
                                    success: function (msg) {
                                        if (msg != "go_login") {
                                            if (msg == "200") {

                                                parent.window.reload();
                                            }
                                            else {
                                                layer.msg("操作错误");
                                            }
                                        }
                                    } //操作成功后的操作！msg是后台传过来的值
                                , error: function (ex) {
                                    alert(ex);
                                }
                                });
                                //console.log(roleArray);
                                //function obj(knowId, count, typeId, difficultyId, questionCount, score) {
                                //    this.knowId = knowId;
                                //    this.count = count;
                                //    this.typeId = typeId;
                                //    this.difficultyId = difficultyId;
                                //    this.questionCount = questionCount;
                                //    this.score = score;
                                //}
                            }
                        }
                        
                    });
                    $('.fe-arrangetask-pop').on('click', '.fe-add-new-timu b', function () {
                        $(this).parent().parent().remove();
                    })
                },
                getClass: function () {
                    var _this = this;
                    this.$http.post("ashx/teacherCenter.ashx?action=getTeacherClass",
                        {
                            pageIndex: 1,
                            pageSize: 9999
                        }
                        , { emulateJSON: true }).then(function (res) {
                            if (res.body != "go_login") {
                                _this.array = res.body.rows;
                            }
                            else {
                                top.location.href = "../login.html";
                            }
                        })

                },
                getCourse: function () {
                    var _this = this;
                    this.$http.post("ashx/teacherCenter.ashx?action=getTeacherCourse",
                        {

                        }
                        , { emulateJSON: true }).then(function (res) {
                            if (res.body != "go_login") {
                                _this.teacherCourse = res.body.rows;
                            }
                            else {
                                top.location.href = "../login.html";
                            }
                        })

                },
                getOutline: function () {

                }
            }
        });
    }
    function SelectQuestionObj(Id,name, source) {
        this.Id = Id;
        this.name = name;
        this.source = source;

    }
    function SelectQuestionRemove(obj, source, id) {
        var index = -1;
        for (var i = 0; i < obj.length; i++) {
            if (obj[i]["source"] == source && obj[i]["Id"] == id) {
                index = i;
            };
        }
        if (index > -1) {
            obj.splice(index, 1);
        }
        return obj;
    }

    //匹配
    function pipeiList(obj,source,id)
    {
        var flag = false;
        for (var i = 0; i < obj.length; i++) {
            if (obj[i]["source"] == source && obj[i]["Id"] == id) {
                flag = true;
            };
        }
        return flag;
    }
    // 选择题目弹框
    function selectQuestionPop() {
        var name = $(this).getUrlParam("name");
        var classId = $(this).getUrlParam("classId");
        var courseId = $(this).getUrlParam("courseId");
        var courseCatalogId = $(this).getUrlParam("courseCatalogId");
        var endTime = $(this).getUrlParam("endTime");
        //console.log(name + "," + classId + "," + courseId + "," + courseCatalogId + "," + endTime);
        new Vue({
            el: "#selectQuestion",
            data: {
                KnowledgeSource: "1",//分类来源
                KnowledgeId: "",
                SearchName: "",
                Diffculty: "",
                QuestionType: "",
                current: 1,
                questionType: [],
                rightAlready:[],
                questionList:[]
            },
            filters: {
                addRootFile: function addRootFile(img) {
                    return SERVERROOTFILE + img;
                }
            },
            mounted: function () {
                var _this = this;
                this.$nextTick(function () {
                    _this.init();
                    _this.getQuestionType();
                    _this.selectQuestion();
                    _this.deleteRightQuestion();
                    _this.getQuestionList(_this.KnowledgeSource, _this.KnowledgeId, _this.SearchName, _this.Diffculty, _this.QuestionType, _this.current);
                })
            },
            methods: {
                init: function () {
                    // var index = parent.layer.getFrameIndex(window.name);
                    var _this = this;
                    $('.fe-select-question-pop').on('click', '.feoperation button', function () {
                        // parent[0].$('#hh').click();
                        // parent[0].$('#hh').text('哈哈');
                        // parent.layer.close(index);
                    });
                    //全选
                    $(".fe-select-condition").on("click", ".fe-checkall input", function () {
                        var list = $(".fe-question-bank .fe-item");
                        for (var i = 0 ; i < list.length; i++)
                        {
                            if ($(this).prop("checked") == true) {
                                if ($(list[i]).find("input").prop("checked") == true) {

                                }
                                else {
                                    var listInput = $(list[i]).find("input");
                                    listInput.prop("checked", true);
                                    var Sid = $(list[i]).find("input").data("id");
                                    var Ssource = $(list[i]).find("input").data("source");
                                    var Sname = $(list[i]).find("h3").html();
                                    $(list[i]).find("span").addClass("active");
                                    _this.rightAlready.push(new SelectQuestionObj(Sid, Sname, Ssource));
                                }
                            }
                            else {
                                var listInput = $(list[i]).find("input");
                                listInput.prop("checked", false);
                                var Sid = $(list[i]).find("input").data("id");
                                var Ssource = $(list[i]).find("input").data("source");
                                $(list[i]).find("span").removeClass("active");
                                SelectQuestionRemove(_this.rightAlready, Ssource, Sid);
                            }
                        }
                    })
                    // 分类按钮
                    $('.fe-select-question-pop').on('click', '.fe-classify button', function () {
                        parent.layer.open({
                            type: 2,
                            title: '知识点大纲',
                            //closeBtn: 0, //不显示关闭按钮
                            shadeClose: false,
                            shade: [0.5, '#000'],
                            area: ['600px', '400px'],
                            //offset: 'rb', //右下角弹出
                            //time: 2000, //2秒后自动关闭
                            anim: 2,
                            content: 'knowledgepointPop.html?type=2'
                        })
                    });
                    // 子类触发分类筛选方法
                    $('.fe-select-question-pop').on('click', '#hidden-btn1', function () {
                        var kn = $('#selectName').val();
                        var ksort = $('#selectSortId').val();
                        var ksourse = $('#selectSource').val();
                        _this.KnowledgeId = ksort;
                        _this.KnowledgeSource = ksourse;
                        _this.current = 1;
                        _this.questionList = [];
                        _this.getQuestionList(_this.KnowledgeSource, _this.KnowledgeId, _this.SearchName, _this.Diffculty, _this.QuestionType, _this.current);
                        $(".fe-checkall input").prop("checked", "");
                        // console.log(kn);
                        $('.fe-classify button').css('display', 'none');
                        $('.fe-already-mes a').html(kn);
                        $('.fe-already-mes a').attr('title', kn);
                        $('.fe-already-mes').css('display', 'inline-block');
                    });
                    $('.fe-select-question-pop').on('click', '.fe-already-mes b', function () {
                        $('.fe-classify button').css('display', 'inline-block');
                        $('.fe-already-mes').css('display', 'none');
                        $('#selectName').val('');
                        $('#selectSortId').val('');
                        $('#selectSource').val('');
                        _this.KnowledgeId = "";
                        _this.KnowledgeSource = "1";
                        _this.current = 1;
                        _this.questionList = [];
                        _this.getQuestionList(_this.KnowledgeSource, _this.KnowledgeId, _this.SearchName, _this.Diffculty, _this.QuestionType, _this.current);
                        $(".fe-checkall input").prop("checked", "");
                    });
                    // 难度按钮
                    $('.fe-select-question-pop').on('click', '.fe-difficulty button', function () {
                        if ($(this).hasClass('active')) {
                            $(this).parent().find('ul').css('display', 'none');
                            $(this).removeClass('active');
                        } else {
                            $(this).addClass('active');
                            $(this).parent().find('ul').css('display', 'block')
                        }
                    });
                    $('.fe-select-question-pop .fe-difficulty').on('click', 'ul li', function () {
                        var text = $(this).html();
                        _this.Diffculty  = $(this).data('id');
                        $(this).parent().hide();
                        _this.current = 1;
                        _this.questionList = [];
                        _this.getQuestionList(_this.KnowledgeSource, _this.KnowledgeId, _this.SearchName, _this.Diffculty, _this.QuestionType, _this.current);
                        $(".fe-checkall input").prop("checked", "");
                        $('.fe-already-difficulty').show();
                        $('.fe-already-difficulty a').html(text);
                        $('.fe-difficulty button').hide();
                    });
                    $('.fe-select-question-pop .fe-difficulty').on('click', '.fe-already-difficulty b', function () {
                        $('.fe-already-difficulty').hide();
                        $('.fe-difficulty button').show();
                        $('.fe-difficulty button').removeClass('active');
                        _this.Diffculty = "";
                        _this.current = 1;
                        _this.questionList = [];
                        _this.getQuestionList(_this.KnowledgeSource, _this.KnowledgeId, _this.SearchName, _this.Diffculty, _this.QuestionType, _this.current);
                        $(".fe-checkall input").prop("checked", "");
                    });
                    // 类型按钮
                    $('.fe-select-question-pop').on('click', '.fe-type button', function () {
                        if ($(this).hasClass('active')) {
                            $(this).parent().find('ul').css('display', 'none');
                            $(this).removeClass('active');
                        } else {
                            $(this).addClass('active');
                            $(this).parent().find('ul').css('display', 'block')
                        }
                    });
                    $('.fe-select-question-pop .fe-type').on('click', 'ul li', function () {
                        var text = $(this).html();
                        _this.QuestionType = $(this).data('id');
                        $(this).parent().hide();
                        _this.current = 1;
                        _this.questionList = [];
                        _this.getQuestionList(_this.KnowledgeSource, _this.KnowledgeId, _this.SearchName, _this.Diffculty, _this.QuestionType, _this.current);
                        $(".fe-checkall input").prop("checked", "");
                        $('.fe-already-type').show();
                        $('.fe-already-type a').html(text);
                        $('.fe-type button').hide();
                    });
                    $('.fe-select-question-pop .fe-type').on('click', '.fe-already-type b', function () {
                        $('.fe-already-type').hide();
                        $('.fe-type button').show();
                        $('.fe-type button').removeClass('active');
                        _this.QuestionType = "";
                        _this.current = 1;
                        _this.questionList = [];
                        _this.getQuestionList(_this.KnowledgeSource, _this.KnowledgeId, _this.SearchName, _this.Diffculty, _this.QuestionType, _this.current);
                        $(".fe-checkall input").prop("checked", "");
                    });
                    // 题干名字
                    $('.fe-select-question-left').on('keyup', 'p input', function () {
                        var comTitle = $(this).val();
                        _this.current = 1;
                        _this.SearchName = comTitle;
                        _this.questionList = [];
                        _this.getQuestionList(_this.KnowledgeSource, _this.KnowledgeId, _this.SearchName, _this.Diffculty, _this.QuestionType, _this.current);
                    })
                    // 重新选择按钮
                    $('.fe-select-question-right').on('click', '.fe-select-question-right-top button', function () {
                        _this.rightAlready = [];
                        _this.setLeftgougou();
                    });
                    // 生成作业按钮
                    $('.fe-select-question-pop').on('click', '.feoperation button', function () {
                        var index = layer.load(1, {
                            shade: [0.1, '#fff'] //0.1透明度的白色背景
                        });
                        var str = "";
                        for (var i = 0 ; i < _this.rightAlready.length; i++)
                        {
                            str += _this.rightAlready[i].Id + "," + _this.rightAlready[i].source + "|";
                            if (i != _this.rightAlready.length - 1)
                            {
                                str += "|";
                            }
                        }
                        _this.$http.post("ashx/teacherCenter.ashx?action=homeworkSaveNewForTeacher",
                            {
                                paperName: name,
                                paperType:"1",
                                classId: classId,
                                courseId: courseId,
                                courseCatalogId: courseCatalogId,
                                endTime: endTime,
                                saveTag: "add",
                                classify: "0",
                                quesitonList:str
                            }
                            , { emulateJSON: true }).then(function (res) {
                                layer.close(index);
                                if (res.body != "go_login") {
                                    if (res.body == "200") {

                                        parent.window.reload();
                                    }
                                    else {
                                        layer.msg("操作错误");
                                    }
                                }
                                else {
                                    top.location.href = "../login.html";
                                }
                            })
                    })
                },
                setLeftgougou: function () {
                    var _this = this;
                    var list = $(".fe-question-bank .fe-item");
                    for (var i = 0; i < list.length; i++)
                    {
                        var id = $(list[i]).find("input").data("id");
                        var source = $(list[i]).find("input").data("source");
                        if (pipeiList(_this.rightAlready, source, id)) {
                            $(list[i]).find("span").addClass("active");
                            $(list[i]).find("input").prop("checked",true);
                        }
                        else {
                            $(list[i]).find("span").removeClass("active");
                            $(list[i]).find("input").prop("checked", "");
                        }
                    }
                    
                    var alLeftList = $(".fe-question-bank .fe-item span.active");
                    if (alLeftList.length < 1)
                    {
                        $(".fe-checkall input").prop("checked", "");
                    }
                },
                deleteRightQuestion: function () {
                    var _this = this;
                    $(".fe-already-select-question").on("click", ".fe-item i", function (e) {
                        var Sid = e.target.dataset.id;
                        var Ssource = e.target.dataset.source;
                        SelectQuestionRemove(_this.rightAlready, Ssource, Sid);
                        _this.setLeftgougou();
                    })
                },
                selectQuestion: function () {
                    var _this = this;
                    $(".fe-question-bank").on("click", ".fe-item", function (e) {
                        e.preventDefault();
                        if ($(this).find("input").prop("checked") == true) {
                            $(this).find("input").prop("checked", false);
                            var Sid = $(this).find("input").data("id");
                            var Ssource = $(this).find("input").data("source");
                            $(this).find("span").removeClass("active");
                            //alert('1');
                            SelectQuestionRemove(_this.rightAlready, Ssource, Sid);
                        }
                        else {
                            $(this).find("input").prop("checked", true);
                            var Sid = $(this).find("input").data("id");
                            var Ssource = $(this).find("input").data("source");
                            var Sname = $(this).find("h3").html();
                            //alert('3');
                            $(this).find("span").addClass("active");
                            _this.rightAlready.push(new SelectQuestionObj(Sid, Sname, Ssource));
                        }
                    })
                    //$(".fe-question-bank").on("click", ".fe-item input", function () {
                    //    if ($(this).prop("checked") == true) {
                    //        $(this).prop("checked", false);
                    //        var Sid = $(this).data("id");
                    //        var Ssource = $(this).data("source");
                    //        console.log(Sid + "|" + Ssource);
                    //        console.log(_this.rightAlready);
                    //        alert("2");
                    //        SelectQuestionRemove(_this.rightAlready, Ssource, Sid);
                    //    }
                    //    else {
                    //        $(this).prop("checked", true);
                    //        var Sid = $(this).data("id");
                    //        var Ssource = $(this).data("source");
                    //        var Sname = $(this).parent().next("h3").html();
                    //        alert('4');
                    //        _this.rightAlready.push(new SelectQuestionObj(Sid, Sname, Ssource));
                    //    }
                    //})
                },
                getQuestionType:function()
                {
                    var _this = this;
                    this.$http.post("ashx/teacherCenter.ashx?action=getQuestionType",
                        {
                           
                        }
                        , { emulateJSON: true }).then(function (res) {
                            //console.log(res);
                            if (res.body != "") {
                                _this.questionType = res.body.rows;
                               // _this.questionList = _this.questionList.concat(res.body.rows);
                            }
                            //else {
                            //    top.location.href = "../login.html";
                            //}
                        })
                },
                lodingMore:function()
                {
                    var _this = this;
                    _this.current++;
                    _this.getQuestionList(_this.KnowledgeSource, _this.KnowledgeId, _this.SearchName, _this.Diffculty, _this.QuestionType, _this.current);
                },
                getQuestionList: function (kType,Kid,questionName,diff,Qtype,pageIndex)
                {
                    var _this = this;
                    this.$http.post("ashx/teacherCenter.ashx?action=getQuestionList",
                        {
                            knowledgepointId: Kid,
                            kType:kType,
                            questionName: questionName,
                            diff: diff,
                            Qtype: Qtype,
                            pageIndex:pageIndex
                        }
                        , { emulateJSON: true }).then(function (res) {
                            //console.log(res);
                            if (res.body != "go_login") {
                                _this.questionList = _this.questionList.concat(res.body.rows);

                            }
                            else {
                                top.location.href = "../login.html";
                            }
                        }).then(function () {
                            _this.setLeftgougou();
                        })
                }
            }
        });
    }
    // 知识点弹框
    function knowledgepointPop(type) {
        new Vue({
            el: "#knowledgePoint",
            data: {
                knowledgeArray: [],
                SysKnowledgeArray:[]
            },
            filters: {
                addRootFile: function addRootFile(img) {
                    return SERVERROOTFILE + img;
                }
            },
            mounted: function () {
                var _this = this;
                this.$nextTick(function () {
                    _this.init();
                })
            },
            methods: {
                init: function () {
                    var _this = this;
                    this.$http.post("ashx/teacherCenter.ashx?action=getTeacherKnowledge",
                        {
                            
                        }
                        , { emulateJSON: true }).then(function (res) {
                            if (res.body != "go_login") {
                                _this.knowledgeArray = res.body.rows;
                            }
                            else {
                                top.location.href = "../login.html";
                            }
                        })
                    this.$http.post("ashx/teacherCenter.ashx?action=getSystemKnowledge",
                        {

                        }
                        , { emulateJSON: true }).then(function (res) {
                            _this.SysKnowledgeArray = res.body.rows;
                        })
                    // 绑定头部切换分类
                    $('.fe-knowledgepoint-pop').on('click', '.fe-nav span', function () {
                        if ($(this).hasClass('active')) {
                            return;
                        } else {
                            $(this).siblings().removeClass('active');
                            $(this).addClass('active');
                            var id = $(this).data('id');
                            if (id == 0) {
                                $('.fe-person').show();
                                $('.fe-system').hide();
                            } else {
                                $('.fe-person').hide();
                                $('.fe-system').show();
                            }
                        }
                    });
                    // 知识点层叠开关
                    $('.fe-knowledgepoint-pop').on('click', 'i', function () {
                        if ($(this).hasClass('uk-icon-plus-square-o')) {
                            $(this).next().next().show();
                            $(this).removeClass();
                            $(this).addClass('uk-icon-minus-square-o');
                        } else {
                            $(this).next().next().hide();
                            $(this).removeClass();
                            $(this).addClass('uk-icon-plus-square-o');
                        }
                    });
                    $('.fe-knowledgepoint-pop').on('click', 'h4', function () {
                        // 组卷规则
                        var index = parent.layer.getFrameIndex(window.name);
                        if (type == 1) {
                            var source = $(".fe-nav .active").data("id");
                            var h = $(this).data("id");
                            var name = $(this).data("name");
                            var count = $(this).data("count");
                            parent[0].$('#knowledgeId').val(h);
                            // console.log(h);
                            parent[0].$('#knowledgeName').val(name);
                            parent[0].$('#count').val(count);
                            parent[0].$('#knowledgeSource').val(source+1);
                            parent[0].$('#hidden-btn').click();
                            parent.layer.close(index);
                        } else if (type == 2) {
                            var source = $(".fe-nav .active").data("id");
                            var h = $(this).data("id");
                            var name = $(this).data("name");
                            // console.log(h);
                            parent[0].$('#selectSortId').val(h);
                            parent[0].$('#selectSource').val(source+1);
                            parent[0].$('#selectName').val(name);
                            parent[0].$('#hidden-btn1').click();
                            parent.layer.close(index);
                        }

                    });
                }
            }
        });
    }
    // 批量导入试题
    function batchImportQuestion(paperType) {
        new Vue({
            el: "#batchImportQuestion",
            data: {
                checkFlag: false,
                checkContent: '',
                questions: [],
                leftCon: ''
            },
            filters: {
                addRootFile: function addRootFile(img) {
                    return SERVERROOTFILE + img;
                },
                getType: function (type) {
                    switch (type) {
                        case 1:
                            return '选择题';
                            break;
                        case 2:
                            return '多选题';
                            break;
                        case 3:
                            return '判断题';
                            break;
                        case 4:
                            return '问答题';
                            break;
                        case 5:
                            return '填空题';
                            break;
                    }
                }
            },
            mounted: function () {
                var _this = this;
                this.$nextTick(function () {
                    _this.init();
                })
            },
            methods: {
                init: function () {
                    var screenH = $(window).height() - 71;
                    var _this = this;
                    $('.fe-batchimport-question-left .fe-left-con').css('height', screenH);
                    $('.fe-batchimport-question-right .fe-right-con').css('height', screenH);

                    // 导入文档按钮
                    $('.fe-batchimport-question-left').on('click', '.fe-left-nav #word', function () {
                        if ($('.fe-word-type').hasClass('active')) {
                            $('.fe-word-type').slideUp(300);
                            $('.fe-word-type').removeClass('active');
                        } else {
                            $('.fe-word-type').slideDown(300);
                            $('.fe-word-type').addClass('active');
                        }
                    });
                    $('.fe-batchimport-question-left').on('click', '.fe-word-type  .fe-bottom button', function () {
                        $('.fe-word-type').slideUp(300);
                        $('.fe-word-type').removeClass('active');
                    });
                    // 识别
                    $('.fe-batchimport-question').on('click', '.feoperation button:first-child', function () {
                        var index = layer.load(1, {
                            shade: [0.1, '#fff'] //0.1透明度的白色背景
                        });
                        _this.$http.post('http://www.fetv.cn/fe/QuestionsForTeacher/' + "QuestionsInput.ashx?action=CheckWord",
                            {

                            }
                            , { emulateJSON: true })
                            .then(function (res) {
                                // console.log(res.body);
                                layer.closeAll();
                                if (res.body.code == 200) {
                                    _this.checkFlag = res.body.returnJson.checkFlag;
                                    _this.checkContent = res.body.returnJson.checkContent;
                                    _this.questions = res.body.returnJson.questions;
                                } else {
                                    layer.msg('识别错误，请按格式更改')
                                    _this.checkFlag = false;
                                    _this.checkContent = res.body.returnJson;
                                    _this.questions = [];
                                }
                            }).then(function () {
                                // var imgs=$('.fe-batchimport-question-right .fe-right-con .fe-items span img');
                                // console.log(imgs);
                                // for(var i=0;i<imgs.length;i++){
                                //     var url=$(imgs[i])[0].src;
                                //     console.log('------');
                                //     console.log(url);
                                //     $(imgs[i]).attr('src',url.splice('/%22')[1]);
                                // }
                            })
                    });
                    // 保存
                    $('.fe-batchimport-question').on('click', '.feoperation button:last-child', function () {
                        var index = layer.load(1, {
                            shade: [0.1, '#fff'] //0.1透明度的白色背景
                        });
                       
                        _this.$http.post('http://www.fetv.cn/fe/QuestionsForTeacher/' + "QuestionsInput.ashx?action=SaveWord",
                            {
                                //teacherId: uid
                            }
                            , { emulateJSON: true })
                            .then(function (res) {
                                // console.log(res.body);
                                layer.closeAll();
                                if (res.body.code == 200) {
                                     layer.msg('导入成功！');
                                    $('.fe-batchimport-question-left').css('display', 'none');
                                    $('.fe-batchimport-question-right').css('display', 'none');
                                    $('.feoperation').css('display', 'none');
                                    $('.fe-goback').css('display', 'block');
                                }

                            })
                    });
                    // 右边筛选
                    $('.fe-batchimport-question-right').on('click', '.fe-right-nav span', function () {
                        if ($(this).hasClass('active')) {
                            return
                        } else {
                            $(this).siblings().removeClass('active');
                            $(this).addClass('active');
                            var id = $(this).data('id');
                            _this.$http.post('http://www.fetv.cn/fe/QuestionsForTeacher/' + 'QuestionsInput.ashx?action=FilterCheckResult',
                                {
                                    type: id
                                }
                                , { emulateJSON: true })
                                .then(function (res) {
                                    // console.log(res.body)
                                    if (res.body.code == 200) {
                                        _this.checkFlag = res.body.returnJson.checkFlag;
                                        _this.checkContent = res.body.returnJson.checkContent;
                                        _this.questions = res.body.returnJson.questions;
                                    }
                                })
                        }
                    })
                    // 上传word
                    $('.fe-batchimport-question .fe-word-type').on('change', '#upload', function () {
                        $('.fe-word-type').removeClass('active');
                        $('.fe-word-type').slideUp(300);
                        var data = new FormData($('#upload-form')[0]);
                        // var uid=$(window).storager({key: 'feUid'}).readStorage();
                        // data.append('teacherId',uid);
                        var index = layer.load(1, {
                            shade: [0.1, '#fff'] //0.1透明度的白色背景
                        });
                        $.ajax({
                            url: 'http://www.fetv.cn/fe/QuestionsForTeacher/' + "QuestionsInput.ashx?action=UploadWord",
                            type: "POST",
                            data: data,
                            processData: false,  // 告诉jQuery不要去处理发送的数据
                            contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                            success: function (res) {
                                layer.closeAll();
                                var result = JSON.parse(res);
                                // console.log(result);
                                if (result.code == 200) {
                                    _this.leftCon = result.returnJson;
                                }
                                // console.log(res);
                            }
                        });
                    })
                }
            }
        });
    }
    function batchImportQuestionSurvey() {
        var Request = new Object();
        Request = GetRequest();
        var titless = Request["title"];
        var endDatess = Request["endDate"];
        var showScore = Request["showScore"];
        new Vue({
            el: "#batchImportQuestion",
            data: {
                checkFlag: false,
                checkContent: '',
                questions: [],
                leftCon: ''
            },
            filters: {
                addRootFile: function addRootFile(img) {
                    return SERVERROOTFILE + img;
                },
                getType: function (type) {
                    switch (type) {
                        case 1:
                            return '选择题';
                            break;
                        case 2:
                            return '多选题';
                            break;
                        case 3:
                            return '判断题';
                            break;
                        case 4:
                            return '问答题';
                            break;
                        case 5:
                            return '填空题';
                            break;
                    }
                }
            },
            mounted: function () {
                var _this = this;
                this.$nextTick(function () {
                    _this.init();
                })
            },
            methods: {
                init: function () {
                    var screenH = $(window).height() - 71;
                    var _this = this;
                    $('.fe-batchimport-question-left .fe-left-con').css('height', screenH);
                    $('.fe-batchimport-question-right .fe-right-con').css('height', screenH);

                    // 导入文档按钮
                    $('.fe-batchimport-question-left').on('click', '.fe-left-nav #word', function () {
                        if ($('.fe-word-type').hasClass('active')) {
                            $('.fe-word-type').slideUp(300);
                            $('.fe-word-type').removeClass('active');
                        } else {
                            $('.fe-word-type').slideDown(300);
                            $('.fe-word-type').addClass('active');
                        }
                    });
                    $('.fe-batchimport-question-left').on('click', '.fe-word-type  .fe-bottom button', function () {
                        $('.fe-word-type').slideUp(300);
                        $('.fe-word-type').removeClass('active');
                    });
                    // 识别
                    $('.fe-batchimport-question').on('click', '.feoperation button:first-child', function () {
                        var index = layer.load(1, {
                            shade: [0.1, '#fff'] //0.1透明度的白色背景
                        });
                        _this.$http.post('http://www.fetv.cn/fe/QuestionsForTeacher/' + "QuestionsInput.ashx?action=CheckWord",
                            {

                            }
                            , { emulateJSON: true })
                            .then(function (res) {
                                // console.log(res.body);
                                layer.closeAll();
                                if (res.body.code == 200) {
                                    _this.checkFlag = res.body.returnJson.checkFlag;
                                    _this.checkContent = res.body.returnJson.checkContent;
                                    _this.questions = res.body.returnJson.questions;
                                } else {
                                    layer.msg('识别错误，请按格式更改')
                                    _this.checkFlag = false;
                                    _this.checkContent = res.body.returnJson;
                                    _this.questions = [];
                                }
                            }).then(function () {
                                // var imgs=$('.fe-batchimport-question-right .fe-right-con .fe-items span img');
                                // console.log(imgs);
                                // for(var i=0;i<imgs.length;i++){
                                //     var url=$(imgs[i])[0].src;
                                //     console.log('------');
                                //     console.log(url);
                                //     $(imgs[i]).attr('src',url.splice('/%22')[1]);
                                // }
                            })
                    });
                    // 保存
                    $('.fe-batchimport-question').on('click', '.feoperation button:last-child', function () {
                        var index = layer.load(1, {
                            shade: [0.1, '#fff'] //0.1透明度的白色背景
                        });

                        _this.$http.post('http://www.fetv.cn/fe/QuestionsForTeacher/' + "QuestionsInput.ashx?action=SaveSurvey",
                            {
                                //teacherId: uid
                                Title: titless,
                                endDate: endDatess,
                                showScore: showScore
                            }
                            , { emulateJSON: true })
                            .then(function (res) {
                                // console.log(res.body);
                                layer.closeAll();
                                if (res.body.code == 200) {
                                    layer.msg('导入成功！');
                                    $('.fe-batchimport-question-left').css('display', 'none');
                                    $('.fe-batchimport-question-right').css('display', 'none');
                                    $('.feoperation').css('display', 'none');
                                    $('.fe-goback').css('display', 'block');
                                }

                            })
                    });
                    // 右边筛选
                    $('.fe-batchimport-question-right').on('click', '.fe-right-nav span', function () {
                        if ($(this).hasClass('active')) {
                            return
                        } else {
                            $(this).siblings().removeClass('active');
                            $(this).addClass('active');
                            var id = $(this).data('id');
                            _this.$http.post('http://www.fetv.cn/fe/QuestionsForTeacher/' + 'QuestionsInput.ashx?action=FilterCheckResult',
                                {
                                    type: id
                                }
                                , { emulateJSON: true })
                                .then(function (res) {
                                    // console.log(res.body)
                                    if (res.body.code == 200) {
                                        _this.checkFlag = res.body.returnJson.checkFlag;
                                        _this.checkContent = res.body.returnJson.checkContent;
                                        _this.questions = res.body.returnJson.questions;
                                    }
                                })
                        }
                    })
                    // 上传word
                    $('.fe-batchimport-question .fe-word-type').on('change', '#upload', function () {
                        $('.fe-word-type').removeClass('active');
                        $('.fe-word-type').slideUp(300);
                        var data = new FormData($('#upload-form')[0]);
                        // var uid=$(window).storager({key: 'feUid'}).readStorage();
                        // data.append('teacherId',uid);
                        var index = layer.load(1, {
                            shade: [0.1, '#fff'] //0.1透明度的白色背景
                        });
                        $.ajax({
                            url: 'http://www.fetv.cn/fe/QuestionsForTeacher/' + "QuestionsInput.ashx?action=UploadWord",
                            type: "POST",
                            data: data,
                            processData: false,  // 告诉jQuery不要去处理发送的数据
                            contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                            success: function (res) {
                                layer.closeAll();
                                var result = JSON.parse(res);
                                // console.log(result);
                                if (result.code == 200) {
                                    _this.leftCon = result.returnJson;
                                }
                                // console.log(res);
                            }
                        });
                    })
                }
            }
        });
    }
    // 图片作业
    function photoTask() {
        
        new Vue({
            el: "#photoTask",
            data: {
                array: [],
                teacherClass: [],
                teacherCourse: [],
                teacherOutline: []
            },
            filters: {
                addRootFile: function addRootFile(img) {
                    return SERVERROOTFILE + img;
                }
            },
            mounted: function () {
                var _this = this;
                this.$nextTick(function () {
                    _this.init();
                    _this.getClass();
                    _this.getCourse();
                })
            },
            methods: {
                init: function () {
                    //配置需要引入jq 1.7.2版本以上
                    //服务器端成功返回 {state:1,path:文件保存路径}
                    //服务器端失败返回 {state:0,errmsg:错误原因}
                    //默认做了文件名不能含有中文,后端接收文件的变量名为file

                    $(".fe-arrangetask-pop #classes").on('click', "div", function () {
                        if ($(this).hasClass("active")) {
                            $(this).removeClass("active");
                        }
                        else {
                            $(this).addClass("active");
                        }
                    })
                    $("#zwb_upload").bindUpload({
                        url: "ashx/teacherCenter.ashx",//上传服务器地址
                        callbackPath: "#callbackPath2",//绑定上传成功后 图片地址的保存容器的id或者class 必须为input或者textarea等可以使用$(..).val()设置之的表单元素
                        // ps:值返回上传成功的 默认id为#callbackPath  保存容器为位置不限制,id需要加上#号,class需要加上.
                        // 返回格式为:
                        // 原来的文件名,服务端保存的路径|原来的文件名,服务端保存的路径|原来的文件名,服务端保存的路径|原来的文件名,服务端保存的路径....
                        num: 8,//上传数量的限制 默认为空 无限制
                        type: "jpg|png|gif|svg",//上传文件类型 默认为空 无限制
                        size: 3,//上传文件大小的限制,默认为5单位默认为mb
                    });
                   
                    parent.ECalendarisOpen1($("#endTime"));
                    $('.fe-arrangetask-pop').on('click', '.fe-save button', function () {
                        if ($("#paperName").val() == "") {
                            layer.msg("作业名称不能为空");
                            return;
                        }
                        $.ajax({
                            async: false,
                            type: "post",
                            url: "ashx/teacherCenter.ashx",
                            data: { action: "homeworkSaveNew", photoArray: photoArray,paperType:"1", classify: "2", name: $("#paperName").val(), classId: $("#classes").val(), courseId: $("#teacherCourse").val(), courseCatalogId: $("#chapter").val(), endDate: $("#endTime").val(), saveTag: "add" }, //提交表单，vistor.ashx?ID=XXX
                            success: function (msg) {
                                if (msg != "go_login") {
                                    if (msg == "200") {

                                        parent.window.reload();
                                    }
                                    else {
                                        layer.msg("操作错误");
                                    }
                                }
                            } //操作成功后的操作！msg是后台传过来的值
                                , error: function (ex) {
                                    alert(ex);
                                }
                        });
                        photoArray = "";
                    });
                },
                getClass: function () {
                    var _this = this;
                    this.$http.post("ashx/teacherCenter.ashx?action=getTeacherClass",
                        {
                            pageIndex: 1,
                            pageSize: 9999
                        }
                        , { emulateJSON: true }).then(function (res) {
                            if (res.body != "go_login") {
                                _this.array = res.body.rows;
                            }
                            else {
                                top.location.href = "../login.html";
                            }
                        })

                },
                getCourse: function () {
                    var _this = this;
                    this.$http.post("ashx/teacherCenter.ashx?action=getTeacherCourse",
                        {

                        }
                        , { emulateJSON: true }).then(function (res) {
                            if (res.body != "go_login") {
                                _this.teacherCourse = res.body.rows;
                            }
                            else {
                                top.location.href = "../login.html";
                            }
                        })

                },
                getOutline: function () {

                }
            }
        });
    }
    function ECalendarisOpen1(obj) {
        if (obj.length > 0) {
            obj.ECalendar({
                type: "time", //模式，time: 带时间选择; date: 不带时间选择;
                stamp: false, //是否转成时间戳，默认true;
                offset: [0, 2], //弹框手动偏移量;
                format: "yyyy-mm-dd hh:ii", //时间格式 默认 yyyy-mm-dd hh:ii;
                //skin: 3, //皮肤颜色，默认随机，可选值：0-8,或者直接标注颜色值;
                step: 10, //选择时间分钟的精确度;
                callback: function (v, e) { } //回调函数
            });
        }
    }
    function GetDateT() {
        var d, s;
        d = new Date();
        s = d.getFullYear() + "-";             //取年份  
        s = s + (d.getMonth() + 1) + "-";//取月份  
        s += d.getDate() + " ";         //取日期  
        s += d.getHours() + ":";       //取小时  
        s += d.getMinutes();    //取分  

        return (s);

    }

    function saveHomeWork()
    {
        $.ajax({
            async: false,
            type: "post",
            url: "ashx/teacherCenter.ashx",
            data: { action: "homeworkSaveNew", questionType: strT, question: strQ, classId: $("#classname").val(), courseId: $("#coursename").val(), courseCatalogId: $("#chapter").val(), name: $("#workname").val(), releaseTime: $("#publishtime").val(), endTime: $("#endtime").val(), limitTime: $("#limitTime").val(), saveTag: "add", homeworkType: "0" }, //提交表单，vistor.ashx?ID=XXX
            success: function (msg) {
                if (msg != "go_login") {
                    if (msg == "200") {
                        layer.msg('发布成功');
                        parent.close();
                        parent.Preload();
                    }
                    else {
                        layer.msg('发布失败');
                    }
                }
                else {
                    top.location.href = "../login.html";
                }
            } //操作成功后的操作！msg是后台传过来的值
                    , error: function (ex) {
                        alert(ex);
                    }
        });
    }
    // 创建试卷
    function createtestpaper() {
        var type = $(this).getUrlParam("type");
        ECalendarisOpen1($("#publishtime"));
        ECalendarisOpen1($("#endtime"));
        var myDate = GetDateT()
        $("#publishtime").val(myDate);
        if (type == 1) {
            $('.examtype1').css('display', 'inline-block');
            $('.examtype2').css('display', 'none');
            $('.createtestpaper-content .fetitle>div:last-child').css('display', 'none');
            $('.createtestpaper-content p').on('click', 'button', function () {
                var list = $('<div class="felist clearfix"></div>');
                var xuhao = $('<div class="span2"><input type="checkbox"></div>');
                var examtype = $('<div class="span4"><select><option value="0">选择题</option><option value="1">填空题</option></select></div>');
                var number = $('<div class="span3"><input type="number"></div>');
                list.append(xuhao);
                list.append(examtype);
                list.append(number);
                $('.feoperation').before(list);
            });
        } else {
            $('.examtype1').css('display', 'none');
            $('.examtype2').css('display', 'inline-block');
            $('.createtestpaper-content .fetitle>div:last-child').css('display', 'inline-block');
            $('.createtestpaper-content p').on('click', 'button', function () {
                var list = $('<div class="felist clearfix"></div>');
                var xuhao = $('<div class="span2"><input type="checkbox"></div>');
                var examtype = $('<div class="span4"><select><option value="0">选择题</option><option value="1">填空题</option></select></div>');
                var number = $('<div class="span3"><input type="number"></div>');
                var score = $('<div class="span3"><input type="number"></div>');
                list.append(xuhao);
                list.append(examtype);
                list.append(number);
                list.append(score);
                $('.feoperation').before(list);
            });
        }
        $('.createtestpaper-content p').on('click', 'span', function () {
            var list = $('.felist input[type=checkbox]:checked');
            for (var i = 0; i < list.length; i++) {
                $(list[i]).parent().parent().remove();
            }
            if (list.length > 0) {
                layer.msg('已删除选择项');
            }
        });
        $('.createtestpaper-content .feoperation').on('click', 'button:first-child', function () {
            var list = $('.felist');
            //var arr = new Array;
            var strT = "";
            var strQ = "";
            for (var i = 0; i < list.length; i++) {
                var type = $(list[i]).find('select').val();
            
                var num = $(list[i]).find('input[type=number]').val();
                if (num == "")
                {
                    layer.msg('您有未填的题数');
                    return;
                }
                //arr.push([type, num]);
                strT += type + ",";
                strQ += num + ",";
            }
            strT = strT.substring(0, strT.length - 1);
        
            strQ = strQ.substring(0, strQ.length - 1);
            if ($("#workname").val() == "")
            {
                layer.msg('您有未填的项目');
                return;
            }
            $.ajax({
                async: false,
                type: "post",
                url: "ashx/teacherCenter.ashx",
                data: { action: "homeworkSave", questionType: strT, question: strQ, classId: $("#classname").val(), courseId: $("#coursename").val(), courseCatalogId: $("#chapter").val(), name: $("#workname").val(), releaseTime: $("#publishtime").val(), endTime: $("#endtime").val(), limitTime: $("#limitTime").val(),saveTag:"add", homeworkType:"0" }, //提交表单，vistor.ashx?ID=XXX
                success: function (msg) {
                    if (msg != "go_login") {
                        if (msg == "200") {
                            layer.msg('发布成功');
                            parent.close();
                            parent.Preload();
                        }
                        else {
                            layer.msg('发布失败');
                        }
                    }
                    else {
                        top.location.href = "../login.html";
                    }
                } //操作成功后的操作！msg是后台传过来的值
                    , error: function (ex) {
                        alert(ex);
                    }
            });
        });
        $('.feoperation').on('click', 'button:last-child', function () {
            parent.close();
        })
        $.ajax({
            async: false,
            type: "post",
            url: "ashx/teacherCenter.ashx",
            data: { action: "getTeacherCourse" }, //提交表单，vistor.ashx?ID=XXX
            success: function (msg) {
                if (msg != "go_login") {
                    var ob = JSON.parse(msg);
                    var num = ob.total;
                    var selObj = $("#coursename");
                    var firstCourse = "";
                    for (var i = 0; i < num; i++) {
                        if (i == 0)
                        {
                            firstCourse = ob.rows[i].courseId
                            getCourseCatalog(firstCourse);
                        }
                        var value = ob.rows[i].courseId;
                        var text = Trim(ob.rows[i].name);
                        selObj.append("<option value='" + value + "'>" + text + "</option>");
                    }
                }
                else {
                    top.location.href = "../login.html";
                }
            } //操作成功后的操作！msg是后台传过来的值
                    , error: function (ex) {
                        alert(ex);
                    }
        });
        $.ajax({
            async: false,
            type: "post",
            url: "ashx/teacherCenter.ashx",
            data: { action: "getTeacherClass", pageIndex: 1, pageSize: 9999}, //提交表单，vistor.ashx?ID=XXX
            success: function (msg) {
                if (msg != "go_login") {
                    var ob = JSON.parse(msg);
                    var num = ob.totalCount;
                    var selObj = $("#classname");
                    for (var i = 0; i < num; i++) {
                        var value = ob.rows[i].classId;
                        var text = Trim(ob.rows[i].name);
                        selObj.append("<option value='" + value + "'>" + text + "</option>");
                    }
                }
                else {
                    top.location.href = "../login.html";
                }
            } //操作成功后的操作！msg是后台传过来的值
                    , error: function (ex) {
                        alert(ex);
                    }
        });
    }
    function Preload()
    {
        window.location.reload();
    }
    // 作业模板
    function taskTemplate() {
        var Request = new Object();
        Request = GetRequest();
        var paperid = $(window).storager({ key: 'teachercenterPaperId' }).readStorage();//Request["paperid"];
        new Vue({
            el: "#tasktemplate",
            data: {
                questionList: [],
                taskName: '',
                isPicture: '',
                imgArr: []
            },
            filters: {
                addRootFile: function addRootFile(img) {
                    return SERVERROOTFILE + 'uploads/images/' + img;
                },
                getStyle: function getStyle(type) {
                    switch (type) {
                        case 1:
                            return 'single-choice';
                            break;
                        case 2:
                            return 'multiple-choice';
                            break;
                        case 3:
                            return 'judge';
                            break;
                        case 4:
                            return 'question-answer';
                            break;
                        case 5:
                            return 'completion';
                            break;
                    }
                },
                tostring: function tostring(i) {
                    switch (i) {
                        case 1:
                            return 'A';
                            break;
                        case 2:
                            return 'B';
                            break;
                        case 3:
                            return 'C';
                            break;
                        case 4:
                            return 'D';
                            break;
                    }
                },
                toChinese: function toChinese(i) {
                    switch (i) {
                        case 1:
                            return '一';
                            break;
                        case 2:
                            return '二';
                            break;
                        case 3:
                            return '三';
                            break;
                        case 4:
                            return '四';
                            break;
                        case 5:
                            return '五';
                            break;
                        case 6:
                            return '六';
                            break;
                        case 7:
                            return '七';
                            break;
                    }
                }
            },
            mounted: function () {
                var _this = this;
                this.$nextTick(function () {
                    _this.getQuestionList();
                    _this.bindChoice();
                })
            },
            methods: {
                getQuestionList: function () {
                    var _this = this;
                    var index = layer.load(1, {
                        shade: [0.1, '#fff'] //0.1透明度的白色背景
                    });
                    this.$http.post('http://www.fetv.cn/fe/QuestionsForTeacher/' + "QuestionsInput.ashx?action=GetPaper",
                        {
                            paperid: paperid
                        }
                        , { emulateJSON: true })
                        .then(function (res) {
                            layer.close(index);
                            if (res.body.code == 200) {
                                _this.questionList = res.body.returnJson.typeQuestions;
                                _this.taskName = res.body.returnJson.paperTitle;
                                _this.imgArr = res.body.returnJson.pictureNameArray;
                                _this.isPicture = res.body.returnJson.isPicture;
                            }
                        }).then(function () {
                            var p = $('.feanswer-card').height();
                            $('.fetaskTemplate').css('marginBottom', p);
                            var w = $('.fetaskTemplate').width();
                            $('.feanswer-card').css('width', w);
                        })
                },
                bindChoice: function () {
                    // 选择题
                    $('.fetaskTemplate').on('click', '.single-choice .febox .fe-items .i-select', function () {
                        $(this).siblings().removeClass('active');
                        $(this).addClass('active');
                        var text = $(this).find('b').html();
                        // console.log(text);
                        $(this).parent().parent().find('input.studentAnswer').val(text);
                        var id = $(this).parent().parent().data('id');
                        var source = $(this).parent().parent().data('source');
                        if (isEmpty(text)) {
                            $('.w' + id + '-' + source).addClass('active');
                        } else {
                            $('.w' + id + '-' + source).removeClass('active');
                        }
                    });
                    // 多选题
                    $('.fetaskTemplate').on('click', '.multiple-choice .febox .fe-items .i-select', function () {
                        if ($(this).hasClass('active')) {
                            $(this).removeClass('active');
                        } else {
                            $(this).addClass('active');
                        }
                        var list = $(this).parent().find('.active');
                        var text = '';
                        for (var i = 0; i < list.length; i++) {
                            text += $(list[i]).find('b').html();
                            if (i < list.length - 1) {
                                text += '、';
                            }
                        }
                        // console.log(text);
                        $(this).parent().parent().find('input.studentAnswer').val(text);
                        var id = $(this).parent().parent().data('id');
                        var source = $(this).parent().parent().data('source');
                        if (isEmpty(text)) {
                            $('.w' + id + '-' + source).addClass('active');
                        } else {
                            $('.w' + id + '-' + source).removeClass('active');
                        }
                    });
                    // 判断题
                    $('.fetaskTemplate').on('click', '.judge .febox .fe-items .i-select', function () {
                        $(this).siblings().removeClass('active');
                        $(this).addClass('active');
                        var text = $(this).find('b').html();
                        // console.log(text);
                        $(this).parent().parent().find('input.studentAnswer').val(text);
                        var id = $(this).parent().parent().data('id');
                        var source = $(this).parent().parent().data('source');
                        if (isEmpty(text)) {
                            $('.w' + id + '-' + source).addClass('active');
                        } else {
                            $('.w' + id + '-' + source).removeClass('active');
                        }
                    });
                    // 问答题
                    $('.fetaskTemplate').on('keyup', '.question-answer .febox .fe-items textarea', function () {
                        var text = $(this).val();
                        // console.log(text);
                        $(this).parent().parent().parent().find('input.studentAnswer').val(text);
                        var id = $(this).parent().parent().parent().data('id');
                        var source = $(this).parent().parent().parent().data('source');
                        if (isEmpty(text)) {
                            $('.w' + id + '-' + source).addClass('active');
                        } else {
                            $('.w' + id + '-' + source).removeClass('active');
                        }
                    });
                    // 填空题
                    $('.fetaskTemplate').on('keyup', '.completion .febox .fe-stems input', function () {
                        var inputs = $(this).parent().parent().find('input');
                        var text = '';
                        var n = 0;
                        for (var i = 0; i < inputs.length; i++) {
                            text += $(inputs[i]).val();
                            if (i < inputs.length - 1) {
                                text += '_';
                            }
                            if (!isEmpty($(inputs[i]).val())) {
                                n++;
                            }
                        }
                        // console.log(text);
                        $(this).parent().parent().parent().find('input.studentAnswer').val(text);
                        var id = $(this).parent().parent().parent().data('id');
                        var source = $(this).parent().parent().parent().data('source');
                        //console.log(n);
                        if (n > 0) {
                            $('.w' + id + '-' + source).removeClass('active');
                        } else {
                            $('.w' + id + '-' + source).addClass('active');
                        }
                    });
                    // 答题卡-定位题目
                    $('.feanswer-card').on('click', 'span', function () {
                        var id = $(this).data('id');
                        var source = $(this).data('source');
                        $('body').animate({ scrollTop: $('.q' + id + '-' + source).offset().top - 200 }, 1000)
                    });
                    // 答题卡-提交
                    $('.feanswer-card').on('click', '.feoperation button', function () {
                        var spans = $('.feanswer-card span');
                        var isAnswer = true;
                        for (var i = 0; i < spans.length; i++) {
                            //console.log('aa');
                            if (!$(spans[i]).hasClass('active')) {
                                isAnswer = false;
                                break;
                            }
                        }
                        if (isAnswer) {
                            var inputs = $('.febox .studentAnswer');
                            var answerArr = [];
                            for (var i = 0; i < inputs.length; i++) {
                                var val = $(inputs[i]).val();
                                var id = $(inputs[i]).parent().data('id');
                                var source = $(inputs[i]).parent().data('source');
                                answerArr.push(new answerObj(id, source, val))
                            }
                            answerArr = JSON.stringify(answerArr);
                            layer.confirm('确定提交？', {
                                btn: ['提交', '取消'] //按钮
                            }, function () {
                                var index = layer.load(1, {
                                    shade: [0.1, '#fff'] //0.1透明度的白色背景
                                });
                                $.ajax({
                                    url: 'http://www.fetv.cn/fe/QuestionsForTeacher/' + "QuestionsInput.ashx?action=SubmitPaper",
                                    type: "POST",
                                    data: { studentId: studentId, paperid: paperid, questions: answerArr },
                                    success: function (res) {
                                        var data = JSON.parse(res);
                                        if (data.code == 200) {
                                            layer.closeAll();
                                            window.location.href = 'taskresultsummary.html?paperid=' + paperid;
                                        } else {
                                            layer.close(index);
                                            layer.msg(data.message);
                                        }
                                    }
                                });
                            }, function () {

                            });
                        } else {
                            var inputs = $('.febox .studentAnswer');
                            var answerArr = [];
                            for (var i = 0; i < inputs.length; i++) {
                                var val = $(inputs[i]).val();
                                var id = $(inputs[i]).parent().data('id');
                                var source = $(inputs[i]).parent().data('source');
                                answerArr.push(new answerObj(id, source, val))
                            }
                            answerArr = JSON.stringify(answerArr);
                            layer.confirm('你还有题未答！', {
                                btn: ['继续答题', '提交'] //按钮
                            }, function () {
                                layer.closeAll();
                            }, function () {
                                var index = layer.load(1, {
                                    shade: [0.1, '#fff'] //0.1透明度的白色背景
                                });
                                $.ajax({
                                    url: 'http://www.fetv.cn/fe/QuestionsForTeacher/' + "QuestionsInput.ashx?action=SubmitPaper",
                                    type: "POST",
                                    data: { studentId: studentId, paperid: paperid, questions: answerArr },
                                    success: function (res) {
                                        var data = JSON.parse(res);
                                        if (data.code == 200) {
                                            layer.closeAll();
                                            window.location.href = 'taskresultsummary.html?paperid=' + paperid;
                                        } else {
                                            layer.close(index);
                                            layer.msg(data.message);
                                        }
                                    }
                                });
                            });
                        }
                    });
                    // 控制答题卡显示
                    $(window).scroll(function () {
                        if ($(window).scrollTop() >= ($(".fetaskTemplate").height() - $(window).height()) || $(window).scrollTop() >= $(window).height()) {
                            $('.feanswer-card').fadeIn(300);
                        } else {
                            $('.feanswer-card').fadeOut(300);
                        }
                    });
                }
            }
        });
    }
    function testpaper(id, subjectId, gradeId,type,studentId) {
        new Vue({
            el: "#testpaper",
            data: {
                test: []
            },
            filters: {
                addRootFile: function addRootFile(img) {
                    return SERVERROOTFILE + img;
                },
                tostring: function tostring(i) {
                    switch (i) {
                        case 1:
                            return 'A';
                            break;
                        case 2:
                            return 'B';
                            break;
                        case 3:
                            return 'C';
                            break;
                        case 4:
                            return 'D';
                            break;
                    }
                },
                toChinese: function toChinese(i) {
                    switch (i) {
                        case 1:
                            return '一';
                            break;
                        case 2:
                            return '二';
                            break;
                        case 3:
                            return '三';
                            break;
                        case 4:
                            return '四';
                            break;
                        case 5:
                            return '五';
                            break;
                        case 6:
                            return '六';
                            break;
                        case 7:
                            return '七';
                            break;
                    }
                }
            },
            mounted: function () {
                var _this = this;
                this.$nextTick(function () {
                    _this.gettest();
                    _this.changeTimu();
                })
            },
            methods: {
                gettest: function () {
                    var _this = this;
                    if (type == "0") {
                        this.$http.post("../website/ashx/questionBank.ashx?action=getHomeWork",
                            {
                                homeworkId: id,
                                getType: 'answer',
                                studentId: studentId
                            }
                            , { emulateJSON: true })
                            .then(function (res) {
                                _this.test = res.body.rows;
                            }).then(function () {
                                $('.testpaper .fetitle button').css('display', 'none');
                                $('.testpaper .feoperation button').css('display', 'none');
                            });
                    }
                    else {
                        this.$http.post("../website/ashx/questionBank.ashx?action=getHomeWork",
                            {
                                homeworkId: id
                            }
                            , { emulateJSON: true })
                            .then(function (res) {
                                _this.test = res.body.rows;
                            });
                    }
                },
                changeTimu: function () {
                    var _this = this;
                    $('.testpaper').on('click', '.fetitle button', function () {
                        var list = $(this).parent().parent().parent().find('li');
                        var oldid = "";
                        for (var i = 0; i < list.length; i++) {
                            oldid += $(list[i]).data('questionbankid') + ",";
                        }
                        oldid = oldid.substring(0,oldid.length-1);
                        var homeworkQuestionId = $(this).parent().parent().data('homeworkquestionid');
                        var questionBankId = $(this).parent().parent().data('questionbankid');
                        var questionTypeId = $(this).parent().parent().data('questiontypeid');
                        layer.confirm('你确定要替换该题吗？', {
                            btn: ['确定', '取消'] //按钮
                        }, function () {
                            _this.$http.post("../website/ashx/questionBank.ashx?action=getRandomQuestion",
                        {
                            oldid: oldid,
                            homeworkQuestionId: homeworkQuestionId,
                            questionBankId: questionBankId,
                            questionTypeId: questionTypeId,
                            subjectId: subjectId,
                            gradeId: gradeId
                        }
                                , { emulateJSON: true })
                                .then(function (res) {
                                    if (res.body == "200") {
                                        //_this.gettest();
                                        window.location.reload();
                                    }
                                    else if (res.body == "404")
                                    {
                                        layer.msg("题库不足");
                                    }
                                    else {
                                        layer.msg("替换失败");
                                    }
                                    layer.closeAll();
                                });
                        }, function () {
                        });
                    })
                }
            }
        });
    }
    // 完成作业情况
    function completesituation(id,classId) {
    
        new Vue({
            el: "#completesituation",
            data: {
                paper: [],
                studentname: '',
                situation: ''
            },
            filters: {
                addRootFile: function addRootFile(img) {
                    return SERVERROOTFILE + img;
                },
                getState: function getState(state) {
                    return state == 0 ? "未完成" : "已完成";
                },
                lookpaper: function lookpaper(id, subjectId, gradeId,type,studentId) {
                    return "testpaper.html?id=" + id + "&subjectId=" + subjectId + "&gradeId=" + gradeId+"&type="+type+"&studentId="+studentId;
                }
            },
            mounted: function () {
                var _this = this;
                this.$nextTick(function () {
                    _this.getpaper(_this.studentname, _this.situation);
                })
            },
            methods: {
                remind:function (studentId)
                {
                    var _this = this;
                    this.$http.post("ashx/teacherCenter.ashx?action=teacherRemindWork",
                        {
                            studentId: studentId,
                        }
                        , { emulateJSON: true })
                        .then(function (res) {
                            if (res.body != "go_login") {
                                if (res.body == 200) {
                                    layer.msg('已提醒');
                                }
                            }
                            else {
                                top.location.href = "../login.html";
                            }
                        })

                },
                getpaper: function (studentname, situation) {
                    var _this = this;
                    this.$http.post("ashx/teacherCenter.ashx?action=getStudentRepondList",
                        {
                            homeworkId: id,
                            classId: classId
                        }
                        , { emulateJSON: true })
                        .then(function (res) {
                            if (res.body != "go_login") {
                                _this.paper = res.body.rows;
                            }
                            else {
                                top.location.href = "../login.html";
                            }
                            //if (res.body.code == 200) {
                            //_this.paper = [{
                            //    "title": "测试1", "studentname": "艾斯比", "state": "0", "time": "2017-11-08"
                            //}];
                             
                            //}
                        })
                },
                bindFn: function () {
                    var _this = this;
                    $('.completesituation').on('click', '#studentName', function () {
                        _this.getpaper();
                    });
                    $('.completesituation').on('click', '#state', function () {
                        _this.getpaper();
                    })
                }
            }
        });
    }

    function arrangeworkdetail() {
        
        new Vue({
            el: "#homeworkdetail",
            data: {
                homework: [],
                array: [],
                Couarray: [],
                showItem: 4,//页码显示条数
                allpage: '',//总页数
                current: 1,//当前页
                subjectName: '',
                arrangeTime: '',
                myTiku: [],
                nodata: false
            },
            filters: {
                addRootFile: function addRootFile(img) {
                    return SERVERROOTFILE + img;
                }
            },
            computed: {
                pages: function () {
                    var pag = [];
                    if (this.current < this.showItem) { //如果当前的激活的项 小于要显示的条数
                        //总页数和要显示的条数那个大就显示多少条
                        var i = Math.min(this.showItem, this.allpage);
                        while (i) {
                            pag.unshift(i--);
                        }
                    } else { //当前页数大于显示页数了
                        var middle = this.current - Math.floor(this.showItem / 2), //从哪里开始
                            i = this.showItem;
                        if (middle > (this.allpage - this.showItem)) {
                            middle = (this.allpage - this.showItem) + 1
                        }
                        while (i--) {
                            pag.push(middle++);
                        }
                    }
                    return pag
                }
            },
            mounted: function () {
                var _this = this;
                this.$nextTick(function () {
                    _this.bindTikuSelect();
                    _this.bindDeleteTimu();
                    _this.bindAddTimu();
                    _this.lookAnswer();
                    _this.getMyClass();
                    _this.getMyCourse();
                })
            },
            methods: {
                getMyCourse:function()
                {
                    var _this = this;
                    this.$http.post("ashx/teacherCenter.ashx?action=getTeacherCourse",
                        {
                            //pageIndex: 1,
                            //pageSize: 999
                        }
                        , { emulateJSON: true })
                        .then(function (res) {
                            if (res.body != "go_login") {
                                _this.Couarray = res.body.rows;
                            }
                            else {
                                top.location.href = "../login.html";
                            }
                        })
                },
                getMyClass:function()
                {
                    var _this = this;
                    this.$http.post("ashx/teacherCenter.ashx?action=getTeacherClass",
                        {
                            pageIndex: 1,
                            pageSize: 999
                        }
                        , { emulateJSON: true })
                        .then(function (res) {
                            if (res.body != "go_login") {
                                _this.array = res.body.rows;
                            }
                            else {
                                top.location.href = "../login.html";
                            }
                        })
                },
                // 获取我的题库
                getMyTiku: function (pageIndex) {
                    var _this = this;
                    this.$http.post("ashx/teacherCenter.ashx?action=getTeacherQuestionBankSketch",
                        {
                            pageIndex: pageIndex,
                            pageSize: 4
                        }
                        , { emulateJSON: true })
                        .then(function (res) {
                            if (res.body != "go_login") {
                                if (res.body.rows.length < 1) {
                                    _this.nodata = true;
                                } else {
                                    _this.nodata = false;
                                }
                                _this.myTiku = res.body.rows;
                                _this.allpage = res.body.totalPageCount;
                            }
                            else {
                                top.location.href = "../login.html";
                            }
                        }).then(function () {
                            $('.fequestionList-content .feanswer a').removeClass('active');
                            $('.fequestionList-content .ferightanswer').css('display', 'none');
                        })
                },
                lookAnswer: function () {
                    $('.fequestionList-content').on('click', '.fepanel .feanswer a', function () {
                        if ($(this).hasClass('active')) {
                            $(this).parent().parent().find('.ferightanswer').hide(300);
                            $(this).removeClass('active');
                        } else {
                            $(this).parent().parent().find('.ferightanswer').show(300);
                            $(this).addClass('active');
                        }
                    })
                },
                // 题目预览
                preview: function (html) {
                    layer.open({
                        type: 1,
                        // title:,
                        skin: 'layui-layer-rim', //加上边框
                        area: ['720px', 'auto'], //宽高
                        content: html
                    });
                },
                goto: function (index) { //枫叶处理
                    var _this = this;
                    if (index == this.current) return;
                    if (index > this.allpage) {
                        this.current = this.current - 2;
                        layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
                        return false;
                    }
                    this.current = index;
                    _this.getMyTiku(_this.current);
                },
                // 绑定题库选择按钮

                bindTikuSelect: function () {
                    ECalendarisOpen1($("#publishtime"));
                    ECalendarisOpen1($("#endtime"));
                    var _this = this;
                    $('.feteacherfamily').on('click', '#selectTimuBtn', function () {
                        layer.open({
                            type: 1,
                            title: "题库选择",
                            area: ['880px', '600px'],
                            resize: false,
                            content: $('#mytiku') //这里content是一个DOM
                        });
                        _this.getMyTiku(1);
                    });
                },
                // 题库选择中添加到作业按钮
                addHomework: function (id, title, type) {
                    // var newObj={
                    //     tid:id,
                    //     title:title
                    // };
                    function obj(name, value, type) {
                        this.tid = name;
                        this.title = value;
                        this.type = type;
                    }
                    this.homework.push(new obj(id, title, type));
                    // console.log(this.homework);
                },
                // 绑定1级作业页面 题目删除按钮
                bindDeleteTimu: function () {
                    var _this = this;
                    $('.feteacherfamily .feselect').on('click', 'p>span', function () {
                        var list = $('.felist').find('input[type=checkbox]:checked');
                        //alert($(list[0]).data('id'));
                        layer.confirm('你确定要删除吗？', {
                            btn: ['确定', '取消'] //按钮
                        }, function () {
                            if (list.length < 1) {
                                layer.msg('无任何选择项');
                                return;
                            }
                           
                            for (var i = 0; i < list.length; i++) {
                                var id = list[i].dataset.id;
                                //var id = $(list[i]).data('id');
                                $(list[i]).prop('checked', '');
                                _this.homework.remove(id, 'tid');
                                // console.log(_this.homework.remove(id,'tid'))
                            }
                            layer.closeAll()
                        }, function () {
                        });
                    })
                },
                // 绑定新增试题按钮
                bindAddTimu: function () {
                    var _this = this;
                    $('.feteacherfamily').on('click', '#addTimuBtn', function () {
                        layer.open({
                            type: 1,
                            title: "新增题目",
                            area: ['880px', '600px'],
                            resize: false,
                            content: $('#addnewtimu') //这里content是一个DOM
                        });
                    });
                }
            }
        });
    }
    Array.prototype.indexOf = function (val, id) {
        for (var i = 0; i < this.length; i++) {
            if (this[i][id] == val) return i;
        }
        return -1;
    };
    Array.prototype.remove = function (val, id) {
        var index = this.indexOf(val, id);
        if (index > -1) {
            this.splice(index, 1);
        }
    };
    // 订单管理
    function ordermanage() {
        $('.feordermanage .feorder-nav').on('click', 'span', function () {
            if ($(this).hasClass('active')) {
                return;
            } else {
                $(this).siblings().removeClass('active');
                $(this).addClass('active');
                if ($(this).data('id') == 1) {
                    $('#sold').css('display', 'block');
                    $('#buy').css('display', 'none');
                } else {
                    $('#buy').css('display', 'block');
                    $('#sold').css('display', 'none');
                }
            }
        });
        // 已售课程
        new Vue({
            el: "#sold",
            data: {
                soldorder: [],
                showItem: 4,//页码显示条数
                allpage: '',//总页数
                current: 1//当前页
            },
            filters: {
                addRootFile: function addRootFile(img) {
                    return SERVERROOTFILE + img;
                }
            },
            computed: {
                pages: function () {
                    var pag = [];
                    if (this.current < this.showItem) { //如果当前的激活的项 小于要显示的条数
                        //总页数和要显示的条数那个大就显示多少条
                        var i = Math.min(this.showItem, this.allpage);
                        while (i) {
                            pag.unshift(i--);
                        }
                    } else { //当前页数大于显示页数了
                        var middle = this.current - Math.floor(this.showItem / 2), //从哪里开始
                            i = this.showItem;
                        if (middle > (this.allpage - this.showItem)) {
                            middle = (this.allpage - this.showItem) + 1
                        }
                        while (i--) {
                            pag.push(middle++);
                        }
                    }
                    return pag
                }
            },
            mounted: function () {
                var _this = this;
                this.$nextTick(function () {
                    _this.getorder(1);
                })
            },
            methods: {
                getorder: function (pageIndex) {
                    var _this = this;
                    this.$http.post("ashx/teacherCenter.ashx?action=getTeacherSoldList",
                        {
                            pageIndex: pageIndex,
                            pageSize: 3
                        }
                        , { emulateJSON: true })
                        .then(function (res) {
                            if (res.body != "go_login") {
                                _this.soldorder = res.body.rows;
                                _this.allpage = res.body.totalPageCount;
                            }
                            else {
                                top.location.href = "../login.html";
                            }
                        })
                },
                goto: function (index) { //枫叶处理
                    var _this = this;
                    if (index == this.current) return;
                    if (index > this.allpage) {
                        this.current = this.current - 2;
                        layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
                        return false;
                    }
                    this.current = index;
                    _this.getorder(_this.current);
                }
            }
        });
        // 已买课程
        new Vue({
            el: "#buy",
            data: {
                buyorder: [],
                showItem: 4,//页码显示条数
                allpage: '',//总页数
                current: 1//当前页
            },
            filters: {
                addRootFile: function addRootFile(img) {
                    return SERVERROOTFILE + img;
                },
                payRoot: function payRoot(cid, oid) {
                    return ROOT + "paymentoptions.html?cid=" + cid + "&oid=" + oid;
                },
                gotoCourseRoot: function (cid, recordType) {
                    if (recordType == '直播') {
                        return ROOT + "cloundcoursedetail.html?courseId=" + cid;
                    } else {
                        return ROOT + "coursedetail.html?courseId=" + cid;
                    }
                }
            },
            computed: {
                pages: function () {
                    var pag = [];
                    if (this.current < this.showItem) { //如果当前的激活的项 小于要显示的条数
                        //总页数和要显示的条数那个大就显示多少条
                        var i = Math.min(this.showItem, this.allpage);
                        while (i) {
                            pag.unshift(i--);
                        }
                    } else { //当前页数大于显示页数了
                        var middle = this.current - Math.floor(this.showItem / 2), //从哪里开始
                            i = this.showItem;
                        if (middle > (this.allpage - this.showItem)) {
                            middle = (this.allpage - this.showItem) + 1
                        }
                        while (i--) {
                            pag.push(middle++);
                        }
                    }
                    return pag
                }
            },
            mounted: function () {
                var _this = this;
                this.$nextTick(function () {
                    _this.getorder(1);
                })
            },
            methods: {
                getorder: function (pageIndex) {
                    var _this = this;
                    this.$http.post("ashx/teacherCenter.ashx?action=getOrderList",
                        {
                            pageIndex: pageIndex,
                            pageSize: 3
                        }
                        , { emulateJSON: true })
                        .then(function (res) {
                            if (res.body != "go_login") {
                                _this.buyorder = res.body.rows;
                                _this.allpage = res.body.totalPageCount;
                            }
                            else {
                                top.location.href = "../login.html";
                            }
                        })
                },
                goto: function (index) { //枫叶处理
                    var _this = this;
                    if (index == this.current) return;
                    if (index > this.allpage) {
                        this.current = this.current - 2;
                        layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
                        return false;
                    }
                    this.current = index;
                    _this.getorder(_this.current);
                }
            }
        });
    }
    // 成员申请
    function memberapply() {
        $('.femygroupdetail ul').on('click', 'li', function () {
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            var id = $(this).data('id');
            var showdom = $('.femygroupdetail .fecontent>div:nth-child(' + id + ')');
            // console.log(showdom);
            showdom.fadeIn(300);
            showdom.siblings().hide();
        });
        // 我发出的申请
        new Vue({
            el: "#send",
            data: {
                post: [],
                state: '',
                keyword: '',
                showItem: 4,//页码显示条数
                allpage: '',//总页数
                current: 1,//当前页
                groupArr: []
            },
            filters: {
                addRootFile: function addRootFile(img) {
                    return SERVERROOTFILE + img;
                },
                addTeacherRoot: function addTeacherRoot(id) {
                    return "http://www.fetv.cn/" + "teacherindex.html?teacherId=" + id;//feweb/
                }
                ,
                gotostudio: function gotostudio(id) {
                    return "http://www.fetv.cn/" + "teacherstudio.html?teachingStudioId=" + id;//feweb/
                }
            },
            computed: {
                pages: function () {
                    var pag = [];
                    if (this.current < this.showItem) { //如果当前的激活的项 小于要显示的条数
                        //总页数和要显示的条数那个大就显示多少条
                        var i = Math.min(this.showItem, this.allpage);
                        while (i) {
                            pag.unshift(i--);
                        }
                    } else { //当前页数大于显示页数了
                        var middle = this.current - Math.floor(this.showItem / 2), //从哪里开始
                            i = this.showItem;
                        if (middle > (this.allpage - this.showItem)) {
                            middle = (this.allpage - this.showItem) + 1
                        }
                        while (i--) {
                            pag.push(middle++);
                        }
                    }
                    return pag
                }
            },
            mounted: function () {
                var _this = this;
                this.$nextTick(function () {
                    _this.getpost(1, _this.state, _this.keyword);
                    _this.bingSelect();
                })
            },
            methods: {
                bingSelect: function () {
                    var _this = this;
                    //绑定状态搜索
                    $('.mycreategrouppost').on('change', '#group', function () {
                        _this.state = $(this).val();
                        _this.current = 1;
                        _this.getpost(_this.current, _this.state, _this.keyword);
                    });
                    // 绑定关键字搜索
                    $('#keyword').on('blur', function () {
                        _this.keyword = $(this).val();
                        _this.current = 1;
                        _this.getpost(_this.current, _this.state, _this.keyword);
                    })
                },
                getpost: function (pageIndex, state, keyword) {
                    var _this = this;
                    this.$http.post("ashx/teacherCenter.ashx?action=getStudioTeacherRs",
                        {
                            state: state,
                            keyword: keyword,
                            pageIndex: pageIndex,
                            pageSize: 8
                        }
                        , { emulateJSON: true })
                        .then(function (res) {
                            if (res.body != "go_login") {
                                _this.allpage = res.body.totalPageCount; //总页数
                                _this.post = res.body.rows;
                            }
                            else {
                                top.location.href = "../login.html";
                            }
                        })
                },
                goto: function (index) { //枫叶处理
                    var _this = this;
                    if (index == this.current) return;
                    if (index > this.allpage) {
                        this.current = this.current - 2;
                        layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
                        return false;
                    }
                    this.current = index;
                    _this.getpost(_this.current, _this.state, _this.keyword);
                }
            }
        });
        // 我收到的申请
        new Vue({
            el: "#receive",
            data: {
                post: [],
                time: '',
                state: '',
                showItem: 4,//页码显示条数
                allpage: '',//总页数
                current: 1//当前页
            },
            filters: {
                addRootFile: function addRootFile(img) {
                    return SERVERROOTFILE + img;
                },
                addTeacherRoot: function addTeacherRoot(id) {
                    return "http://www.fetv.cn/" + "teacherindex.html?teacherId=" + id;//feweb/
                }
            },
            computed: {
                pages: function () {
                    var pag = [];
                    if (this.current < this.showItem) { //如果当前的激活的项 小于要显示的条数
                        //总页数和要显示的条数那个大就显示多少条
                        var i = Math.min(this.showItem, this.allpage);
                        while (i) {
                            pag.unshift(i--);
                        }
                    } else { //当前页数大于显示页数了
                        var middle = this.current - Math.floor(this.showItem / 2), //从哪里开始
                            i = this.showItem;
                        if (middle > (this.allpage - this.showItem)) {
                            middle = (this.allpage - this.showItem) + 1
                        }
                        while (i--) {
                            pag.push(middle++);
                        }
                    }
                    return pag
                }
            },
            mounted: function () {
                var _this = this;
                this.$nextTick(function () {
                    _this.getpost(1, _this.time, _this.state);
                    _this.bingSelect();
                })
            },
            methods: {
                bingSelect: function () {
                    var _this = this;
                    $('.mycreategrouppost').on('change', '#time', function () {
                        _this.time = $(this).val();
                        _this.current = 1;
                        _this.getpost(_this.current, _this.time, _this.state);
                    });
                    $('.mycreategrouppost').on('change', '#state', function () {
                        _this.state = $(this).val();
                        _this.current = 1;
                        _this.getpost(_this.current, _this.time, _this.state);
                    });
                },
                getpost: function (pageIndex, time, state) {
                    var _this = this;
                    this.$http.post("ashx/teacherCenter.ashx?action=getStudioTeacherRsToMe",
                        {
                            time: time,
                            state: state,
                            pageIndex: pageIndex,
                            pageSize: 8
                        }
                        , { emulateJSON: true })
                        .then(function (res) {
                            if (res.body != "go_login") {
                                _this.allpage = res.body.totalPageCount; //总页数
                                _this.post = res.body.rows;
                            }
                            else {
                                top.location.href = "../login.html";
                            }
                        }).then(function () {
                            var _this = this;
                            $("#receive").on("click", ".felist-big a:first-child", function () {
                                var id = $(this).data("id");
                                _this.$http.post("ashx/teacherCenter.ashx?action=updateStudioTeacherRsState",
                                    {
                                        saveTag: "update",
                                        state: "1",
                                        studioTeacherRsId:id
                                    }
                                    , { emulateJSON: true })
                                    .then(function (res) {
                                        if (res.body != "go_login") {
                                            if (res.body == "200") {
                                                layer.msg('已提交');
                                                setTimeout(function () {
                                                    window.location.reload();
                                                }, 1000)
                                            }
                                            else {
                                                layer.msg('审核失败');
                                            }
                                        }
                                        else {
                                            top.location.href = "../login.html";
                                        }
                                    })
                            })
                            $(".fecommunitytable ").on("click", ".felist-big a:last-child", function () {
                                var id = $(this).data("id");
                                _this.$http.post("ashx/teacherCenter.ashx?action=updateStudioTeacherRsState",
                                    {
                                        saveTag: "update",
                                        state: "2",
                                        studioTeacherRsId: id
                                    }
                                    , { emulateJSON: true })
                                    .then(function (res) {
                                        if (res.body != "go_login") {
                                            if (res.body == "200") {
                                                layer.msg('已提交');
                                                setTimeout(function () {
                                                    window.location.reload();
                                                }, 1000)
                                            }
                                            else {
                                                layer.msg('审核失败');
                                            }
                                        }
                                        else {
                                            top.location.href = "../login.html";
                                        }
                                    })
                            })
                        })

                },
                goto: function (index) { //枫叶处理
                    var _this = this;
                    if (index == this.current) return;
                    if (index > this.allpage) {
                        this.current = this.current - 2;
                        layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
                        return false;
                    }
                    this.current = index;
                    _this.getpost(_this.current, _this.time, _this.state);
                }
            }
        });
    }

    // 找回密码
    function forgetpassword() {
    
        new Vue({
            el: "#forgetpassword",
            data: {
                phone: "",//输入的手机号
                verificationCode: "",//输入的验证码
                checkCode: "",//输入的校验码
                VCTime: 120,//倒计时
                VCTimeKey: true,
                VCLabel: "获取校验码",
                newPassword: "",//输入新密码
                confirmPassword: "",//输入2次密码

                email: "",//输入的邮箱
                EverificationCode: "",//输入的验证码
                EcheckCode: "",//输入的校验码
                EVCTime: 120,//倒计时
                EVCTimeKey: true,
                EVCLabel: "获取校验码",
                imageCode: "",//接口返回的验证码
                imageCodeImg: ""
            },
            mounted: function mounted() {
                //1.0ready --> 2.0
                this.$nextTick(function () {
                    this.init();
                    this.getImageVC();
                    this.editBtn();
                });
            },
            methods: {
                init: function init() {

                },
                editBtn: function editBtn() {
                    //绑定修改按钮
                    $('#forgetpassword .fechangeNav').on('click', 'span', function () {
                        $(this).siblings().removeClass('active');
                        $(this).addClass('active');
                        var id = $(this).data('id');
                        if (id == 1) {
                            $(this).parent().parent().find('.fepanel').css('display', 'none');
                            $(this).parent().parent().find('#bindPhone').css('display', 'inline-block');
                        } else {
                            $(this).parent().parent().find('.fepanel').css('display', 'none');
                            $(this).parent().parent().find('#bindEmail').css('display', 'inline-block');
                        }
                    });
                    $('#forgetpassword .fepanel').on('click', '.feoperation a:last-child', function () {
                        parent.close();
                    })
                },
                // 获取图文验证码
                getImageVC: function () {
                    var _this = this;
                    this.$http.post(SERVERROOTDATA + 'User.ashx?action=getImageVerifyCode', {}, {
                        emulateJSON: true
                    }).then(function (res) {
                        _this.imageCode = res.body.imageCode;
                        _this.imageCodeImg = SERVERROOTFILE + res.body.imagePath;
                    });
                },
                //短信验证码
                getVCCode: function getVCCode() {
                    var imageCodeVal = "";
                    var vc = "";
                    vc = this.phone;
                    imageCodeVal = this.verificationCode;
                    this.$http.post(SERVERROOTDATA + "User.ashx?action=getRetrievalPwdValidateCode", {
                        mobile: vc,
                        imageCode: this.imageCode,
                        imageValue: imageCodeVal
                    }, {
                        emulateJSON: true
                    }).then(function (res) {
                        var obj = res.body;
                        var _this = this;
                        if (obj.code == 200 || obj.code == '200') {
                            layer.msg("验证码已发送注意查收短信");
                            var Interval = setInterval(function () {
                                _this.VCTimeKey = false;
                                _this.VCLabel = _this.VCTime-- + "s";
                                if (_this.VCTime < 1) {
                                    _this.VCTimeKey = true;
                                    _this.VCLabel = '获取短信验证码';
                                    _this.VCTime = 120;
                                    clearInterval(Interval);
                                }
                            }, 1000);
                        } else {
                            layer.msg(obj.message);
                        }
                        // if(811 == obj || "811" == obj) {
                        //     layer.msg("请求超时");
                        // } else if(808 == obj || "808" == obj) {
                        //     layer.msg("改手机号已注册");
                        // } else {
                        //     layer.msg("验证码已发送注意查收短信");
                        //     var Interval = setInterval(function() {
                        //         _this.VCTimeKey = false;
                        //         _this.VCLabel = _this.VCTime-- + "s";
                        //         if(_this.VCTime < 1) {
                        //             _this.VCTimeKey = true;
                        //             _this.VCLabel = '获取短信验证码';
                        //             clearInterval(Interval);
                        //         }
                        //     }, 1000);
                        // }
                    });
                },
                // 通过手机
                vcTimeCount: function vcTimeCount() {
                    var _this = this;
                    if (_this.VCTimeKey) {
                        if (!isPhone(this.phone)) {
                            layer.msg("请输入正确的手机号码!");
                            return false;
                        }
                        if (!isEmpty(this.verificationCode)) {
                            layer.msg("请输入验证码");
                            return false;
                        }
                        _this.getVCCode();
                    }
                },
                // 通过邮箱
                EvcTimeCount: function EvcTimeCount() {
                    var _this = this;
                    if (_this.EVCTimeKey) {
                        if (!isEmail(this.email)) {
                            layer.msg("请输入正确的邮箱!");
                            return false;
                        }
                        // if(!isEmpty(this.EverificationCode)){
                        //     layer.msg("请输入验证码");
                        //     return false;
                        // }
                        var Interval = setInterval(function () {
                            _this.EVCTimeKey = false;
                            _this.EVCLabel = _this.EVCTime-- + "s";
                            if (_this.EVCTime < 1) {
                                _this.EVCTimeKey = true;
                                _this.EVCLabel = '获取校验码';
                                clearInterval(Interval);
                            }
                        }, 1000);
                        // _this.getVCCode();
                    }
                },
                // 手机找回密码保存
                callPasswordByPhone: function callPasswordByPhone() {
                    var _this = this;
                    if (!isPhone(_this.phone)) {
                        layer.msg('请输入正确的手机号！');
                    } else {
                        if (!isEmpty(_this.verificationCode)) {
                            layer.msg("验证码不能为空!");
                        } else {
                            if (!isEmpty(_this.checkCode)) {
                                layer.msg('校验码不能为空！');
                            } else {
                                if (!isEmpty(_this.newPassword)) {
                                    layer.msg('新密码不能为空！');
                                } else {
                                    if (_this.newPassword == _this.confirmPassword) {
                                        this.$http.post("ashx/teacherCenter.ashx?action=retrievalUserPassword", {
                                            mobile: _this.phone,
                                            validateCode: _this.checkCode,
                                            newPassword: _this.newPassword,
                                            confirmPassword: _this.confirmPassword
                                        }, {
                                            emulateJSON: true
                                        }).then(function (res) {
                                            if (res.body != "go_login") {
                                                layer.msg(res.body.message);
                                                if (res.body.code == 200) {
                                                    setTimeout(function () {
                                                        location.reload()
                                                    }, 1000)
                                                }
                                            }
                                            else {
                                                top.location.href = "../login.html";
                                            }
                                        })
                                    } else { layer.msg('2次密码不一致！') }
                                }

                            }
                        }
                    }
                }
            }
        })
    }
    // 安全设置
    function securitysetting() {
        new Vue({
            el: "#securitysetting",
            data: {
                currentPassword: '',//当前密码
                newPassword: '',//新密码
                confirmPassword: '',//确定新密码
                phone: "",//输入的手机号
                verificationCode: "",//输入的验证码
                checkCode: "",//输入的校验码
                VCTime: 120,//倒计时
                VCTimeKey: true,
                VCLabel: "获取校验码",
                imageCode: "",//接口返回的验证码
                imageCodeImg: ""
            },
            mounted: function mounted() {
                //1.0ready --> 2.0
                this.$nextTick(function () {
                    this.init();
                    this.getImageVC();
                    this.editBtn();
                });
            },
            methods: {
                init: function init() {

                },
                editBtn: function editBtn() {
                    //绑定修改按钮
                    $('#securitysetting .fepanel .fepersonaldata-title').on('click', 'span', function () {
                        if ($(this).hasClass('active')) {
                            return;
                        } else {
                            $(this).addClass('active');
                            $(this).parent().next().css('display', 'none');
                            $(this).parent().next().next('ul').css('display', 'block');
                            $(this).parent().parent().find('.feoperation').css('display', 'block');
                        }
                    });
                    // 绑定取消按钮
                    $('#securitysetting .fepanel').on('click', '.feoperation a:last-child', function () {
                        $(this).parent().css('display', 'none');
                        $(this).parent().prev().css('display', 'none');
                        $(this).parent().prev().prev('p').css('display', 'block');
                        $(this).parent().parent().find('.fepersonaldata-title').find('span').removeClass('active');
                    });
                    // 找回密码按钮
                    $('#callBackPassword').on('click', function () {
                        layer.open({
                            type: 2,
                            title: '找回密码',
                            //closeBtn: 0, //不显示关闭按钮
                            shadeClose: false,
                            shade: [0.5, '#000'],
                            area: ['800px', '500px'],
                            anim: 2,
                            content: 'forgetpassword.html'
                        })
                    })
                },
                // 获取图文验证码
                getImageVC: function () {
                    var _this = this;
                    this.$http.post(SERVERROOTDATA + 'User.ashx?action=getImageVerifyCode', {}, {
                        emulateJSON: true
                    }).then(function (res) {
                        _this.imageCode = res.body.imageCode;
                        _this.imageCodeImg = SERVERROOTFILE + res.body.imagePath;
                    });
                },
                //短信验证码
                getVCCode: function getVCCode() {
                    var imageCodeVal = "";
                    var vc = "";
                    vc = this.phone;
                    imageCodeVal = this.verificationCode;
                    this.$http.post(SERVERROOTDATA + "User.ashx?action=getMobAlterValidateCode", {
                        mobile: vc,
                        imageCode: this.imageCode,
                        imageValue: imageCodeVal
                    }, {
                        emulateJSON: true
                    }).then(function (res) {
                        var obj = res.body;
                        if (obj.code == 200 || obj.code == '200') {
                            layer.msg("验证码已发送注意查收短信");
                            var Interval = setInterval(function () {
                                this.VCTimeKey = false;
                                this.VCLabel = _this.VCTime-- + "s";
                                if (this.VCTime < 1) {
                                    this.VCTimeKey = true;
                                    this.VCLabel = '获取短信验证码';
                                    _this.VCTime = 120;
                                    clearInterval(Interval);
                                }
                            }, 1000);
                        } else {
                            layer.msg(obj.message);
                        }
                        // if(811 == obj || "811" == obj) {
                        //     layer.msg("请求超时");
                        // } else if(808 == obj || "808" == obj) {
                        //     layer.msg("改手机号已注册");
                        // } else {
                        //     layer.msg("验证码已发送注意查收短信");
                        //     var Interval = setInterval(function() {
                        //         this.VCTimeKey = false;
                        //         this.VCLabel = _this.VCTime-- + "s";
                        //         if(this.VCTime < 1) {
                        //             this.VCTimeKey = true;
                        //             this.VCLabel = '获取短信验证码';
                        //             clearInterval(Interval);
                        //         }
                        //     }, 1000);
                        // }
                    });
                },
                vcTimeCount: function vcTimeCount() {
                    var _this = this;
                    if (_this.VCTimeKey) {
                        if (!isPhone(this.phone)) {
                            layer.msg("请输入正确的手机号码!");
                            return false;
                        }
                        if (!isEmpty(this.verificationCode)) {
                            layer.msg("请输入验证码");
                            return false;
                        }
                        _this.getVCCode();
                    }
                },
                // 更新密码
                updatePassword: function updatePassword() {
                    var _this = this;
                    if (!isEmpty(_this.currentPassword)) {
                        layer.msg('当前密码不能为空');
                    } else {
                        if (!isEmpty(_this.newPassword)) {
                            layer.msg("新密码不能为空!");
                        } else {
                            if (_this.newPassword == _this.confirmPassword) {
                                var index = layer.load(0, { shade: false });
                                this.$http.post("ashx/teacherCenter.ashx?action=updateUserPassword", {
                                    oldPassword: _this.currentPassword,
                                    newPassword: _this.newPassword
                                }, {
                                    emulateJSON: true
                                }).then(function (res) {
                                    layer.closeAll();
                                    if (res.body != "go_login") {
                                        layer.msg(res.body.message);
                                        if (res.body.code == 200) {
                                            setTimeout(function () {
                                                location.reload()
                                            }, 1000)
                                        }
                                    }
                                    else {
                                        top.location.href = "../login.html";
                                    }
                                })
                            } else {
                                layer.msg('两次密码不一致！');
                            }
                        }
                    }

                },
                // 绑定手机
                updatePhone: function updatePhone() {
                    var _this = this;
                    if (!isPhone(_this.phone)) {
                        layer.msg('请输入正确的手机号！');
                    } else {
                        if (!isEmpty(_this.verificationCode)) {
                            layer.msg("验证码不能为空!");
                        } else {
                            if (!isEmpty(_this.checkCode)) {
                                layer.msg('校验码不能为空！');
                            } else {
                                var index = layer.load(0, { shade: false });
                                this.$http.post("ashx/teacherCenter.ashx?action=updateUserMobile", {
                                    mobile: _this.phone,
                                    validateCode: _this.checkCode
                                }, {
                                    emulateJSON: true
                                }).then(function (res) {
                                    layer.closeAll();
                                    if (res.body != "go_login") {
                                        layer.msg(res.body.message);
                                        if (res.body.code == 200) {
                                            setTimeout(function () {
                                                location.reload()
                                            }, 1000)
                                        }
                                    }
                                    else {
                                        top.location.href = "../login.html";
                                    }
                                })
                            }
                        }
                    }

                }
            }
        })
    }

    function getCourseCatalog(courseId)
    {
        $.ajax({
            async: false,
            type: "post",
            url: "ashx/teacherCenter.ashx",
            data: { action: "getTeacherCourseCatalog", courseId: courseId }, //提交表单，vistor.ashx?ID=XXX
            success: function (msg) {
                if (msg != "go_login") {
                    var ob = JSON.parse(msg);
                    var num = ob.total;
                    var selObj = $("#chapter");
                    selObj.empty();
                    for (var i = 0; i < num; i++) {
                        var value = ob.rows[i].courseCatalogId;
                        var text = Trim(ob.rows[i].name);
                        selObj.append("<option value='" + value + "'>" + text + "</option>");
                    }
                }
                else {
                    top.location.href = "../login.html";
                }
            } //操作成功后的操作！msg是后台传过来的值
                    , error: function (ex) {
                        alert(ex);
                    }
        });
    }
    function reload()
    {
        window.location.reload();
    }
    function close()
    {
        layer.closeAll();
    }
    // 判断是否符合邮箱规则
    function isEmail(str) {
        var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        return reg.test(str);
    }
    // 判断是否符合手机号码规则
    function isPhone(str) {
        var reg = /^1[34578]\d{9}$/;
        return reg.test(str);
    }
    // 判断是否符合QQ规则
    function isQQ(str) {
        var reg = /^[1-9][0-9]{4,14}$/;
        return reg.test(str);
    }
    function Trim(str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }
    // 验证身份证
    function validateIdCard(idCard) {
        //15位和18位身份证号码的正则表达式
        var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;

        //如果通过该验证，说明身份证格式正确，但准确性还需计算
        if (regIdCard.test(idCard)) {
            if (idCard.length == 18) {
                var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //将前17位加权因子保存在数组里
                var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
                var idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
                for (var i = 0; i < 17; i++) {
                    idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
                }

                var idCardMod = idCardWiSum % 11;//计算出校验码所在数组的位置
                var idCardLast = idCard.substring(17);//得到最后一位身份证号码

                //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
                if (idCardMod == 2) {
                    if (idCardLast == "X" || idCardLast == "x") {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                    if (idCardLast == idCardY[idCardMod]) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        } else {
            return false;
        }
    }