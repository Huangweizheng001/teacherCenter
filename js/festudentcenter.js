/**
 * Created by Administrator on 2017/10/30 0030.
 */
// 学生个人中心 头部
Vue.component('student-header-template', {
    template: '<div style="background: #eee">' +
                '<div class="fe-header-top-bar">' +
                    '<div class="container">' +
                        '<a class="fe-header-top-logo wow slideInLeft" v-bind:href="index | addRoot">' +
                            '<img v-bind:src="smallLogo | addRoot" alt="福建教育网" />' +
                        '</a>' +
                        '<a href="#this">App 下载</a>' +
                        '<div class="fe-header-top-other" style="margin-right: 50px">' +
                            '<a v-show="!isLogined" v-bind:href="login| addRoot" @click="setPrePage">登录</a>' +
                            '<a v-show="!isLogined" v-bind:href="reg| addRoot" @click="setPrePage">&nbsp;/&nbsp;注册</a>' +
                            '<a v-show="isLogined"  v-bind:href="member | addRoot" >{{nickName}}</a>' +
                            '<a v-show="isLogined" @click="signOut">&nbsp;/&nbsp;退出</a>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="container">' +
                    '<form action="" id="membercenter">'+
                        '<div class="festudent-head">' +
                            '<div class="feimage">' +
                                '<img v-bind:src="headimg | addRootFile"/>' +
                                '<input type="file" id="mytx" name="mphoto">'+
                            '</div>'+
                            '<div class="febox">' +
                                '<h2>{{nickName}}</h2>' +
                                // '<h4><span>关注：88</span><span>粉丝：133</span></h4>' +
                            '</div>'+
                        '</div>' +
                    '</form>'+
                '</div>'+
            '</div>',
    data: function data() {
        return {
            isLogined: false,
            nickName: 'xxx',
            index: 'index.html',
            login: 'login.html',
            reg: 'login.html?login=3',
            member: 'studentcenter.html',
            smallLogo: 'images/public/logo-icon-small.png',
            headimg:"images/temp/mr-tx.png"
        };
    },
    mounted: function mounted() {
        //1.0ready --> 2.0
        this.$nextTick(function() {
            //初始化
            this.initData();
            this.changeTx();
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
        initData: function initData() {
            if($(window).storager({
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
        changeTx:function changeTx() {
            $('.festudent-head').on('change','#mytx',function () {
                var studentId=$(window).storager({key: 'feUid'}).readStorage();
                if(studentId==undefined||studentId==null||studentId=='undefined'){
                    layer.msg('请先登录');
                    return;
                }
                if($(this).val().match( /.jpg|.gif|.png|.bmp/i)) {
                    var data = new FormData($('#membercenter')[0]);
                    data.append('userId',studentId);
                    data.append('userType','student');
                    $.ajax({
                        url: SERVERROOTDATA+"User.ashx?action=updateUserHeadPortrait",
                        type: "POST",
                        data: data,
                        processData: false,  // 告诉jQuery不要去处理发送的数据
                        contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                        success:function (res) {
                            var data = JSON.parse(res);
                            if(data.code==200){
                                $.ajax({
                                    url: SERVERROOTDATA+"User.ashx?action=getUserHeadPortrait",
                                    type: "POST",
                                    data: {"userId":studentId,"userType":"student"},
                                    // processData: false,  // 告诉jQuery不要去处理发送的数据
                                    // contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                                    success:function (res) {
                                        var data = JSON.parse(res);
                                        if(data.length<1){
                                            return false
                                        }else{
                                            window.localStorage.setItem("feUIcon",data.rows[0].iconPath);
                                        }
                                    }
                                });
                            }else{
                                layer.msg('保存数据失败！');
                                // setTimeout(function(){window.location.reload()},1000);
                            }
                        }
                    });
                    var dom = $(this).prev();
                    upload(this, dom);
                }else{
                    layer.msg("对不起，系统仅支持标准格式的照片，请您调整格式后重新上传，谢谢 !");
                }
            });
        },
        signOut: function signOut() {
            $(window).storager({
                key: 'feUid'
            }).removeStorage();
            $(window).storager({
                key: 'feUNickName'
            }).removeStorage();
            window.location.reload();
        },
        setPrePage: function setPrePage() {
            $(window).storager({ //fePrePage
                key: 'fePrePage',
                // value: $.getBasePath(1),
                value:'index.html',
                expires: 0
            }).addStorage();
        }
    }
});
var header = new Vue({
    el: '#header'
});
//上传图像，并显示图像
//c:点击节点，即点击input type=fille 后内容存贮
//d:存贮图像的节点
var upload = function (c, d) {
    var $file = $(c);
    var fileObj = $file[0];
    var windowURL = window.URL || window.webkitURL;
    var dataURL;
    var $img = $(d);

    if(fileObj && fileObj.files && fileObj.files[0]){
        dataURL = windowURL.createObjectURL(fileObj.files[0]);
        $img.attr('src',dataURL);
        // console.log(dataURL);
    }else{
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
// 学生个人中心 左边筛选栏
Vue.component('student-left-template', {
    template:   '<div class="feteacherpersonalcenter-left">' +
        '<h1>我的首页</h1>' +
        '<ul class="feteacherpersonalcenter-left-content">' +
            '<li v-cloak v-for="item in list">' +
                '<a>' +
                    '<i :class="item.icon"></i>'+
                    '<span>{{item.parent}}</span>' +
                '</a>' +
                '<ul class="fechild">' +
                    '<li v-cloak v-for="i in item.children">' +
                        '<a v-bind:href="i.href">{{i.name}}</a>' +
                    '</li>' +
                '</ul>'+
            '</li>'+
        '</ul>'+
    '</div>',
    data: function data() {
        return {
            list:[
                {
                    icon:"uk-icon-book",
                    parent:"学习中心",
                    children:[
                        {
                            href:"studentmycourse.html",
                            name:"我的课程"
                        },
                        {
                            href:"studentlearningnote.html",
                            name:"学习笔记"
                        },
                        {
                            href:"studentdownload.html",
                            name:"下载管理"
                        }
                        // {
                        //     href:"",
                        //     name:"我的作业"
                        // }
                    ]
                },
                {
                    icon:"uk-icon-user",
                    parent:"个人中心",
                    children:[
                        {
                            href:"studentaccountinformation.html",
                            name:"账号信息"
                        },
                        {
                            href:"studentsecuritysetting.html",
                            name:"安全设置"
                        },
                        {
                            href:"studentinvitefriend.html",
                            name:"邀请好友"
                        },
                        {
                            href:"studentmyparent.html",
                            name:"我的家长"
                        },
                        {
                            href:"studentmyteacher.html",
                            name:"我的老师"
                        }
                    ]
                },
                {
                    icon:"uk-icon-bell-o",
                    parent:"消息中心",
                    children:[
                        {
                            href:"",
                            name:"订单管理"
                        },
                        // {
                        //     href:"",
                        //     name:"提醒私信"
                        // },
                        // {
                        //     href:"",
                        //     name:"订阅关注"
                        // },
                        // {
                        //     href:"",
                        //     name:"评价回复"
                        // }
                        {
                            href:"studentansweringreply.html",
                            name:"我的消息"
                        }
                    ]
                },
                {
                    icon:"uk-icon-life-ring",
                    parent:"社圈小组",
                    children:[
                        {
                            href:"",
                            name:"我的动态"
                        },
                        {
                            href:"",
                            name:"我的家长"
                        },
                        {
                            href:"",
                            name:"我的小组"
                        },
                        {
                            href:"",
                            name:"我的帖子"
                        }
                    ]
                }
            ]
        };
    },
    mounted: function mounted() {
        //1.0ready --> 2.0
        this.$nextTick(function() {
            //初始化
            this.addActive();
        });
    },
    filters: {
        addRoot: function addRoot(obj) {
            return ROOT + obj;
        }
    },
    methods: {
        addActive: function addActive() {
            var url = window.location.pathname.split('/');
            // console.log(url[url.length - 1]);
            var currentUrl = url[url.length - 1];
            $('.feteacherpersonalcenter-left-content .fechild li a').removeClass('active');
            $('.feteacherpersonalcenter-left-content .fechild li a[href$="' + currentUrl + '"]').addClass('active');
        }
    }
});
var leftaside = new Vue({
    el: '#leftaside'
});
// 判断是否为空
function isEmpty(str){
    var reg = /\S+/;
    return reg.test(str);
}
// 判断是否符合邮箱规则
function isEmail(str){
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    return reg.test(str);
}
// 判断是否符合手机号码规则
function isPhone(str){
    var reg = /^1[34578]\d{9}$/;
    return reg.test(str);
}
// 判断是否符合QQ规则
function isQQ(str){
    var reg = /^[1-9][0-9]{4,14}$/;
    return reg.test(str);
}
// 验证身份证
function validateIdCard(idCard){
    //15位和18位身份证号码的正则表达式
    var regIdCard=/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;

    //如果通过该验证，说明身份证格式正确，但准确性还需计算
    if(regIdCard.test(idCard)){
        if(idCard.length==18){
            var idCardWi=new Array( 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ); //将前17位加权因子保存在数组里
            var idCardY=new Array( 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
            var idCardWiSum=0; //用来保存前17位各自乖以加权因子后的总和
            for(var i=0;i<17;i++){
                idCardWiSum+=idCard.substring(i,i+1)*idCardWi[i];
            }

            var idCardMod=idCardWiSum%11;//计算出校验码所在数组的位置
            var idCardLast=idCard.substring(17);//得到最后一位身份证号码

            //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
            if(idCardMod==2){
                if(idCardLast=="X"||idCardLast=="x"){
                    return true;
                }else{
                    return false;
                }
            }else{
                //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                if(idCardLast==idCardY[idCardMod]){
                    return true;
                }else{
                    return false;
                }
            }
        }
    }else{
        return false;
    }
}
// 判断是否为空对象
function isEmptyObject(e) {
    var t;
    for (t in e)
        return !1;
    return !0
}
function ECalendarisOpen(obj) {
    if(obj.length > 0) {
        obj.ECalendar({
            type: "date", //模式，time: 带时间选择; date: 不带时间选择;
            stamp: false, //是否转成时间戳，默认true;
            offset: [0, 2], //弹框手动偏移量;
            format: "yyyy-mm-dd", //时间格式 默认 yyyy-mm-dd hh:ii;
            //skin: 3, //皮肤颜色，默认随机，可选值：0-8,或者直接标注颜色值;
            step: 10, //选择时间分钟的精确度;
            callback: function(v, e) {} //回调函数
        });
    }
}
ECalendarisOpen($("#birth"));
function teachingsubject(obj) {
    new Vue({
        el: "#Teachingsubject",
        data: {
            organArr:[],
            gradeArr:[],
            classArr:[],
            organId:obj.organId,
            gradeId:obj.gradeId,
            classId:obj.classId
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getselect();
            })
        },
        methods: {
            getselect:function () {
                var _this = this;
                // 学校
                this.$http.post(SERVERROOTDATA + "Organ.ashx?action=getSchoolList",
                    {}
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.organArr = res.body.rows;
                    }).then(function () {
                        var doms=$('#school option');
                        for(var i=0;i<doms.length;i++){
                            if($(doms[i]).val()==obj.organId){
                                $(doms[i]).prop('selected','true');
                            }else{
                                $(doms[i]).prop('selected','');
                            }
                        }
                }).then(function () {
                        $('#school').on('change',function () {
                            _this.organId=$('#school').val();
                            _this.gradeId='';
                            _this.classId='';
                            _this.$http.post(SERVERROOTDATA + "Grade.ashx?action=getGradeList",
                                {
                                    organId:$('#school').val()
                                }
                                ,{emulateJSON: true})
                                .then(function (res) {
                                    _this.gradeArr = res.body.rows;
                                })
                        })
                });
                // 年级
                this.$http.post(SERVERROOTDATA + "Grade.ashx?action=getGradeList",
                    {
                        organId:_this.organId
                    },
                    {emulateJSON: true})
                    .then(function (res) {
                        _this.gradeArr = res.body.rows;
                    }).then(function () {
                        var doms=$('#grade option');
                        for(var i=0;i<doms.length;i++){
                            if($(doms[i]).val()==obj.gradeId){
                                $(doms[i]).prop('selected','true');
                            }else{
                                $(doms[i]).prop('selected','');
                            }
                        }
                }).then(function () {
                        $('#grade').on('change',function () {
                            _this.gradeId=$('#grade').val();
                            _this.classId='';
                            _this.$http.post(SERVERROOTDATA + "Class.ashx?action=getClassList",
                                {
                                    organId:_this.organId,
                                    gradeId:$('#grade').val()
                                }
                                ,{emulateJSON: true})
                                .then(function (res) {
                                    _this.classArr = res.body.rows;
                                })
                        })
                });
                // 学科
                this.$http.post(SERVERROOTDATA + "Class.ashx?action=getClassList",
                    {
                        organId:_this.organId,
                        gradeId:_this.gradeId
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.classArr = res.body.rows;
                    }).then(function () {
                        var doms=$('#class option');
                        for(var i=0;i<doms.length;i++){
                            if($(doms[i]).val()==obj.classId){
                                $(doms[i]).prop('selected','true');
                            }else{
                                $(doms[i]).prop('selected','');
                            }
                        }
                }).then(function () {
                        $('#class').on('change',function () {
                            _this.classId=$('#class').val();
                        })
                })
            }
        }
    });
}
// 账号信息
function accountinformation() {
    var studentId=$(window).storager({key: 'feUid'}).readStorage();
    var userType=$(window).storager({key: 'feUType'}).readStorage();
    if(studentId==null||studentId==undefined||studentId=='undefined'||userType!=1){
        layer.msg('请先登录');
        setTimeout(function () {
            window.location.href = ROOT+"login.html";
        },1000);
        return;
    }
    $.ajax({//基本信息
        url: SERVERROOTDATA+"User.ashx?action=getBasicInfo",
        type: "POST",
        data: {userId:studentId,userType:'student'},
        success:function (res) {
            var data = JSON.parse(res);
            if(data.length<1){

            }else {// 初始化基本信息
                if(data.rows.length<1){

                }else{
                    $('#username').val(data.rows[0].userName);
                    $('#nickname').val(data.rows[0].nickName);
                    if (data.rows[0].sex == '0') {
                        $('#male').prop('checked', 'true');
                        $('#female').prop('checked', '');
                        $('#male').prev().html('男');
                    } else {
                        $('#male').prop('checked', '');
                        $('#female').prop('checked', 'true');
                        $('#male').prev().html('女');
                    }
                    $('#birth').val(data.rows[0].birthDay)
                    $('#address').val(data.rows[0].address)
                }
            }
        }
    });
    $.ajax({//联系方式
        url: SERVERROOTDATA+"User.ashx?action=getContact",
        type: "POST",
        data: {userId:studentId,userType:'student'},
        success:function (res) {
            var data = JSON.parse(res);
            if(data.length<1){

            }else {// 初始化联系方式
                if (data.rows.length < 1) {

                } else {
                    $('#email').val(data.rows[0].email);
                    $('#phone').val(data.rows[0].mobile);
                    $('#qq').val(data.rows[0].qq);
                }
            }
        }
    });
    $.ajax({//教育经历
        url: SERVERROOTDATA+"Student.ashx?action=getEducationExperience",
        type: "POST",
        data: {userId:studentId,userType:'student'},
        success:function (res) {
            var data = JSON.parse(res);
            if (data.length < 1) {

            } else {
                // 初始化教育经历
                if(data.rows.length<1){
                    layer.msg("请完善你的个人信息");
                }else{
                    if(data.rows[0].classId==''||data.rows[0].classId=='undefined'||data.rows[0].classId==undefined||data.rows[0].classId<=0){
                        layer.msg("请完善你的个人信息");
                    }
                    var schoolName=data.rows[0].organName;
                    $('#school').prev().html(schoolName);
                    var gradeName=data.rows[0].gradeName;
                    $('#grade').prev().html(gradeName);
                    var className=data.rows[0].className;
                    $('#class').prev().html(className);
                    // var schoolName,gradeName,className;
                    // var school = $('#school option');
                    // for (var i = 0; i < school.length; i++) {//学段
                    //     if ($(school[i]).val() == data.rows[0].organId) {
                    //         $(school[i]).prop('selected', 'true');
                    //         schoolName=$(school[i]).html();
                    //         $('#school').prev().html(schoolName);
                    //     } else {
                    //         $(school[i]).prop('selected', '');
                    //     }
                    // }
                    // var grade = $('#grade option');
                    // for (var i = 0; i < grade.length; i++) {//年级
                    //     if ($(grade[i]).val() == data.rows[0].gradeId) {
                    //         $(grade[i]).prop('selected', 'true');
                    //         gradeName=$(grade[i]).html();
                    //         $('#grade').prev().html(gradeName);
                    //     } else {
                    //         $(grade[i]).prop('selected', '');
                    //     }
                    // }
                    // var subject = $('#class option');
                    // for (var i = 0; i < subject.length; i++) {//学科
                    //     if ($(subject[i]).val() == data.rows[0].classId) {
                    //         $(subject[i]).prop('selected', 'true');
                    //         className=$(subject[i]).html();
                    //         $('#class').prev().html(className);
                    //     } else {
                    //         $(subject[i]).prop('selected', '');
                    //     }
                    // }
                    teachingsubject(data.rows[0]);

                }
            }
        }
    })
    // 基本信息-编辑按钮事件
    $('#information').on('click','.fepersonaldata-title span',function () {
        if(!$(this).hasClass('active')){
            $(this).addClass('active');
            $('#information input[type="text"]').prop('disabled','');
            $('#information i').css('display','none');
            $('#information input[type="radio"]').removeClass('fehidden');
            $('#information label').removeClass('fehidden');
            $('#information .feoperation').removeClass('fehidden');
        }else{
        }
    });
    // 基本信息-取消按钮事件
    $('#information .feoperation').on('click','a:last-child',function () {
        window.location.reload();
    });
    // 基本信息-保存按钮事件
    $('#information .feoperation').on('click','a:first-child',function () {
        if(!isEmpty($('#username').val())){
            layer.msg('姓名不能为空！');
            return;
        }else{
            if($('#information input[type="radio"]:checked').length<1){
                layer.msg('请选择你的性别');
                return;
            }else {
                if(!isEmpty($('#nickname').val())){
                    layer.msg('昵称不能为空！');
                    return;
                }else {
                    // 保存数据
                    var data = new FormData($('#information-form')[0]);
                    data.append('userId',studentId);
                    data.append("userType",'student');
                    $.ajax({
                        url: SERVERROOTDATA+"User.ashx?action=updateBasicInfo",
                        type: "POST",
                        data: data,
                        processData: false,  // 告诉jQuery不要去处理发送的数据
                        contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                        success:function (res) {
                            var data = JSON.parse(res);
                            if(data.code==200){
                                var sex=$('#information input[type=radio]:checked').val();
                                console.log(sex);
                                if(sex=='0'){
                                    $('#information #male').prev().html('男');
                                }else{
                                    $('#information #male').prev().html('女');
                                }
                            }else{
                                layer.msg('保存数据失败！');
                                setTimeout(function(){window.location.reload()},1000);
                            }
                        }
                    });
                }
            }
        }
        // 改变样式
        $('#information .fepersonaldata-title>span').removeClass('active');
        $('#information input[type="text"]').prop('disabled','true');
        $('#information i').css('display','inline-black');
        $('#information input[type="radio"]').addClass('fehidden');
        $('#information label').addClass('fehidden');
        $('#information .feoperation').addClass('fehidden');
    });
    // 联系方式-编辑按钮事件
    $('#contact').on('click','.fepersonaldata-title span',function () {
        if(!$(this).hasClass('active')){
            $(this).addClass('active');
            $('#contact input[type="text"]').prop('disabled','');
            $('#contact .feoperation').removeClass('fehidden');
        }else{
        }
    });
    // 联系方式-取消按钮事件
    $('#contact .feoperation').on('click','a:last-child',function () {
        window.location.reload();
    });
    // 联系方式-保存按钮事件
    $('#contact .feoperation').on('click','a:first-child',function () {
        if(!isEmail($('#email').val())){
            layer.msg('请输入正确的邮箱格式！');
            return;
        }else {
            if(!isPhone($('#phone').val())){
                layer.msg('请输入正确的手机号！');
                return;
            }else{
                if(!isQQ($('#qq').val())){
                    layer.msg('请输入正确的QQ号！');
                    return;
                }else {
                    // 保存数据
                    var data = new FormData($('#contact-form')[0]);
                    data.append('userId',studentId);
                    data.append('userType','student');
                    $.ajax({
                        url: SERVERROOTDATA+"User.ashx?action=updateContactInfo",
                        type: "POST",
                        data: data,
                        processData: false,  // 告诉jQuery不要去处理发送的数据
                        contentType: false   // 告诉jQuery不要去设置Content-Type请求头
                    });
                }
            }
        }
        // 改变样式
        $('#contact .fepersonaldata-title>span').removeClass('active');
        $('#contact input[type="text"]').prop('disabled','true');
        $('#contact .feoperation').addClass('fehidden');
    });
    // 教育经历-编辑按钮事件
    $('#background').on('click','.fepersonaldata-title span',function () {
        if(!$(this).hasClass('active')){
            $(this).addClass('active');
            $('#background i').css('display','none');
            $('#background input[type="text"]').prop('disabled','');
            $('#background select').removeClass('fehidden');
            $('#background .feoperation').removeClass('fehidden');
        }else{
        }
    });
    // 教育经历-取消按钮事件
    $('#background .feoperation').on('click','a:last-child',function () {
        window.location.reload();
    });
    // 教育经历-保存按钮事件
    $('#background .feoperation').on('click','a:first-child',function () {
        if(!isEmpty($('#school').val())){
            layer.msg('学校 不能为空！');
            return;
        }else{
            // 保存数据
            var data = new FormData($('#background-form')[0]);
            data.append('userId',studentId);
            data.append('userType','student');
            $.ajax({
                url: SERVERROOTDATA+"Student.ashx?action=updateEducationExperience",
                type: "POST",
                data: data,
                processData: false,  // 告诉jQuery不要去处理发送的数据
                contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                success:function (res) {
                    var data = JSON.parse(res);
                    if(data.code==200){
                        var schoolName=$('#school').find('option:selected').html();
                        $('#school').prev().html(schoolName);
                        var gradeName=$('#grade').find('option:selected').html();
                        $('#grade').prev().html(gradeName);
                        var className=$('#class').find('option:selected').html();
                        $('#class').prev().html(className);
                    }else{
                        layer.msg('保存失败！');
                        setTimeout(function(){window.location.reload()},1000);
                    }
                }
            });
        }
        // 改变样式
        $('#background .fepersonaldata-title>span').removeClass('active');
        $('#background i').css('display','inline-block');
        $('#background .fecompany').prop('disabled','true');
        $('#background select').addClass('fehidden');
        $('#background .feoperation').addClass('fehidden');
    });
}
// 安全设置
function securitysetting() {
    var studentId=$(window).storager({key: 'feUid'}).readStorage();
    var userType=$(window).storager({key: 'feUType'}).readStorage();
    if(studentId==null||studentId==undefined||studentId=='undefined'||userType!=1){
        layer.msg('请先登录');
        setTimeout(function () {
            window.location.href = ROOT+"login.html";
        },1000);
        return;
    }
    new Vue({
        el:"#securitysetting",
        data:{
            currentPassword:'',//当前密码
            newPassword:'',//新密码
            confirmPassword:'',//确定新密码
            phone:"",//输入的手机号
            verificationCode:"",//输入的验证码
            checkCode:"",//输入的校验码
            VCTime:120,//倒计时
            VCTimeKey:true,
            VCLabel:"获取校验码",
            imageCode:"",//接口返回的验证码
            imageCodeImg:""
        },
        mounted: function mounted() {
            //1.0ready --> 2.0
            this.$nextTick(function() {
                this.init();
                this.getImageVC();
                this.editBtn();
            });
        },
        methods:{
            init:function init() {

            },
            editBtn:function editBtn() {
                //绑定修改按钮
                $('#securitysetting .fepanel .fepersonaldata-title').on('click','span',function () {
                    if($(this).hasClass('active')){
                        return;
                    }else{
                        $(this).addClass('active');
                        $(this).parent().next().css('display','none');
                        $(this).parent().next().next('ul').css('display','block');
                        $(this).parent().parent().find('.feoperation').css('display','block');
                    }
                });
                // 绑定取消按钮
                $('#securitysetting .fepanel').on('click','.feoperation a:last-child',function () {
                    $(this).parent().css('display','none');
                    $(this).parent().prev().css('display','none');
                    $(this).parent().prev().prev('p').css('display','block');
                    $(this).parent().parent().find('.fepersonaldata-title').find('span').removeClass('active');
                });
                // 找回密码按钮
                $('#callBackPassword').on('click',function () {
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
            getImageVC: function() {
                var _this = this;
                this.$http.post(SERVERROOTDATA + 'User.ashx?action=getImageVerifyCode', {}, {
                    emulateJSON: true
                }).then(function(res) {
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
                }).then(function(res) {
                    var obj = res.body;
                    if(obj.code==200||obj.code=='200'){
                        layer.msg("验证码已发送注意查收短信");
                        var Interval = setInterval(function() {
                            this.VCTimeKey = false;
                            this.VCLabel = _this.VCTime-- + "s";
                            if(this.VCTime < 1) {
                                this.VCTimeKey = true;
                                this.VCLabel = '获取短信验证码';
                                clearInterval(Interval);
                            }
                        }, 1000);
                    }else{
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
                if(_this.VCTimeKey) {
                    if(!isPhone(this.phone)) {
                        layer.msg("请输入正确的手机号码!");
                        return false;
                    }
                    if(!isEmpty(this.verificationCode)){
                        layer.msg("请输入验证码");
                        return false;
                    }
                    _this.getVCCode();
                }
            },
            // 更新密码
            updatePassword:function updatePassword() {
                var _this = this;
                if(!isEmpty(_this.currentPassword)) {
                    layer.msg('当前密码不能为空');
                }else {
                    if(!isEmpty(_this.newPassword)) {
                        layer.msg("新密码不能为空!");
                    }else{
                        if(_this.newPassword==_this.confirmPassword){
                            this.$http.post(SERVERROOTDATA + "User.ashx?action=updateUserPassword", {
                                userId: studentId,
                                userType:'student',
                                oldPassword: _this.currentPassword,
                                newPassword: _this.newPassword
                            }, {
                                emulateJSON: true
                            }).then(function (res) {
                                layer.msg(res.body.message);
                                if(res.body.code==200){
                                    setTimeout(function () {
                                        location.reload()
                                    },1000)
                                }
                            })
                        }else{
                            layer.msg('两次密码不一致！');
                        }
                    }
                }

            },
            // 绑定手机
            updatePhone:function updatePhone() {
                var _this = this;
                if(!isPhone(_this.phone)) {
                    layer.msg('请输入正确的手机号！');
                }else {
                    if(!isEmpty(_this.verificationCode)) {
                        layer.msg("验证码不能为空!");
                    }else{
                        if(!isEmpty(_this.checkCode)){
                            layer.msg('校验码不能为空！');
                        }else{
                            this.$http.post(SERVERROOTDATA + "User.ashx?action=updateUserMobile", {
                                userId: studentId,
                                userType:'student',
                                mobile: _this.phone,
                                validateCode: _this.checkCode
                            }, {
                                emulateJSON: true
                            }).then(function (res) {
                                layer.msg(res.body.message);
                                if(res.body.code==200){
                                    setTimeout(function () {
                                        location.reload()
                                    },1000)
                                }
                            })
                        }
                    }
                }

            }
        }
    })
}
function close() {
    layer.closeAll();
}
// 找回密码
function forgetpassword() {
    var studentId=$(window).storager({key: 'feUid'}).readStorage();
    var userType=$(window).storager({key: 'feUType'}).readStorage();
    if(studentId==null||studentId==undefined||studentId=='undefined'||userType!=1){
        layer.msg('请先登录');
        setTimeout(function () {
            window.location.href = ROOT+"login.html";
        },1000);
        return;
    }
    new Vue({
        el:"#forgetpassword",
        data:{
            phone:"",//输入的手机号
            verificationCode:"",//输入的验证码
            checkCode:"",//输入的校验码
            VCTime:120,//倒计时
            VCTimeKey:true,
            VCLabel:"获取校验码",
            newPassword:"",//输入新密码
            confirmPassword:"",//输入2次密码

            email:"",//输入的邮箱
            EverificationCode:"",//输入的验证码
            EcheckCode:"",//输入的校验码
            EVCTime:120,//倒计时
            EVCTimeKey:true,
            EVCLabel:"获取校验码",
            imageCode:"",//接口返回的验证码
            imageCodeImg:""
        },
        mounted: function mounted() {
            //1.0ready --> 2.0
            this.$nextTick(function() {
                this.init();
                this.getImageVC();
                this.editBtn();
            });
        },
        methods:{
            init:function init() {

            },
            editBtn:function editBtn() {
                //绑定修改按钮
                $('#forgetpassword .fechangeNav').on('click','span',function () {
                    $(this).siblings().removeClass('active');
                    $(this).addClass('active');
                    var id=$(this).data('id');
                    if(id==1){
                        $(this).parent().parent().find('.fepanel').css('display','none');
                        $(this).parent().parent().find('#bindPhone').css('display','inline-block');
                    }else{
                        $(this).parent().parent().find('.fepanel').css('display','none');
                        $(this).parent().parent().find('#bindEmail').css('display','inline-block');
                    }
                });
                $('#forgetpassword .fepanel').on('click','.feoperation a:last-child',function () {
                    console.log(222);
                    parent.close();
                })
            },
            // 获取图文验证码
            getImageVC: function() {
                var _this = this;
                this.$http.post(SERVERROOTDATA + 'User.ashx?action=getImageVerifyCode', {}, {
                    emulateJSON: true
                }).then(function(res) {
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
                }).then(function(res) {
                    var obj = res.body;
                    var _this=this;
                    if(obj.code==200||obj.code=='200'){
                        layer.msg("验证码已发送注意查收短信");
                        var Interval = setInterval(function() {
                            _this.VCTimeKey = false;
                            _this.VCLabel = _this.VCTime-- + "s";
                            if(_this.VCTime < 1) {
                                _this.VCTimeKey = true;
                                _this.VCLabel = '获取短信验证码';
                                clearInterval(Interval);
                            }
                        }, 1000);
                    }else{
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
                if(_this.VCTimeKey) {
                    if(!isPhone(this.phone)) {
                        layer.msg("请输入正确的手机号码!");
                        return false;
                    }
                    if(!isEmpty(this.verificationCode)){
                        layer.msg("请输入验证码");
                        return false;
                    }
                    _this.getVCCode();
                }
            },
            // 通过邮箱
            EvcTimeCount: function EvcTimeCount() {
                var _this = this;
                if(_this.EVCTimeKey) {
                    if(!isEmail(this.email)) {
                        layer.msg("请输入正确的邮箱!");
                        return false;
                    }
                    // if(!isEmpty(this.EverificationCode)){
                    //     layer.msg("请输入验证码");
                    //     return false;
                    // }
                    var Interval = setInterval(function() {
                        _this.EVCTimeKey = false;
                        _this.EVCLabel = _this.EVCTime-- + "s";
                        if(_this.EVCTime < 1) {
                            _this.EVCTimeKey = true;
                            _this.EVCLabel = '获取校验码';
                            clearInterval(Interval);
                        }
                    }, 1000);
                    // _this.getVCCode();
                }
            },
            // 手机找回密码保存
            callPasswordByPhone:function callPasswordByPhone() {
                var _this = this;
                if(!isPhone(_this.phone)) {
                    layer.msg('请输入正确的手机号！');
                }else {
                    if(!isEmpty(_this.verificationCode)) {
                        layer.msg("验证码不能为空!");
                    }else{
                        if(!isEmpty(_this.checkCode)){
                            layer.msg('校验码不能为空！');
                        }else{
                            if(!isEmpty(_this.newPassword)){
                                layer.msg('新密码不能为空！');
                            }else {
                                if(_this.newPassword==_this.confirmPassword){
                                    this.$http.post(SERVERROOTDATA + "User.ashx?action=retrievalUserPassword", {
                                        userId: studentId,
                                        userType:'student',
                                        mobile: _this.phone,
                                        validateCode: _this.checkCode,
                                        newPassword:_this.newPassword,
                                        confirmPassword:_this.confirmPassword
                                    }, {
                                        emulateJSON: true
                                    }).then(function (res) {
                                        layer.msg(res.body.message);
                                        if(res.body.code==200){
                                            setTimeout(function () {
                                                location.reload()
                                            },1000)
                                        }
                                    })
                                }else{layer.msg('2次密码不一致！')}
                            }

                        }
                    }
                }
            }
        }
    })
}

// 邀请好友
function invitefriend() {
    $('#copy').zclip({
        path: 'js/ZeroClipboard.swf',
        copy: function(){//复制内容
            return $('#content').val();
        },
        afterCopy: function(){//复制成功
            var $copysuc = $("<div class='copy-tips'><div class='copy-tips-wrap'>☺ 复制成功</div></div>");
            $("body").find(".copy-tips").remove().end().append($copysuc);
            $(".copy-tips").fadeOut(3000);
        }
    });
}
// 我的家长
function myparent() {
    var studentId=$(window).storager({key: 'feUid'}).readStorage();
    var userType=$(window).storager({key: 'feUType'}).readStorage();
    if(studentId==null||studentId==undefined||studentId=='undefined'||userType!=1){
        layer.msg('请先登录');
        setTimeout(function () {
            window.location.href = ROOT+"login.html";
        },1000);
        return;
    }
    $('.festudentmyparent .feedit').on('click','span',function () {
        if($('.fecontent .feitem').length>=2){
            layer.msg('你已经添加2位家长了，不能再加了');
            return;
        }
        $('.fehead').addClass('fehidden');
        $('.feedit').addClass('fehidden');
        $('.fecontent').addClass('fehidden');
        $('.addparent').removeClass('fehidden');
    });
    // 显示绑定家长
    new Vue({
        el:"#showmyparent",
        data:{
            myparent:[]
        },
        mounted: function mounted() {
            //1.0ready --> 2.0
            this.$nextTick(function() {
                this.getParent();
            });
        },
        methods:{
            // 获取家长
            getParent: function() {
                var _this = this;
                this.$http.post(SERVERROOTDATA + 'User.ashx?action=getUserKithList',
                    {
                        userId:studentId,
                        userType:'student'
                    }, {
                    emulateJSON: true
                }).then(function(res) {
                    if(res.body.code==200){
                        _this.myparent = res.body.rows;
                    }

                });
            }
        }
    });
    // 查询家长
    new Vue({
        el:"#addParent",
        data:{
            result:[],
            nodata:true
        },
        mounted: function mounted() {
            //1.0ready --> 2.0
            this.$nextTick(function() {
                this.bindSearch();
            });
        },
        methods:{
            // 查询家长
            bindSearch: function() {
                var _this = this;
                $('#search').on('click',function () {
                   if(!isEmpty($(this).prev().val())){
                       layer.msg('请输入查询手机号码');
                   } else {
                       _this.$http.post(SERVERROOTDATA + 'User.ashx?action=queryUserKithList',
                           {
                               userId:studentId,
                               userType:'student',
                               mobile:$(this).prev().val()
                           }, {
                               emulateJSON: true
                           }).then(function(res) {
                           _this.nodata=true;
                           if(res.body.code==200){
                               _this.result = res.body.rows;
                               _this.nodata=false;
                           }
                       });
                   }
                });
            },
            bindParentPop:function bindParentPop(phone,parentId) {
                $('#bindParent #phone').val(phone);
                $('#bindParent #parentId').val(parentId);
                layer.open({
                    type: 1,
                    area:['500px','400px'],
                    content: $('#bindParent') //这里content是一个DOM
                });
            }
        }
    });
    // 绑定家长弹框
    new Vue({
        el:"#bindParent",
        data:{
            userType:1,
            // phone:"",//输入的手机号
            verificationCode:"",//输入的验证码
            checkCode:"",//输入的校验码
            VCTime:120,//倒计时
            VCTimeKey:true,
            VCLabel:"获取校验码",
            imageCode:"",//接口返回的验证码
            imageCodeImg:""
        },
        mounted: function mounted() {
            //1.0ready --> 2.0
            this.$nextTick(function() {
                this.getImageVC();
            });
        },
        methods:{
            // 获取图文验证码
            getImageVC: function() {
                var _this = this;
                this.$http.post(SERVERROOTDATA + 'User.ashx?action=getImageVerifyCode', {}, {
                    emulateJSON: true
                }).then(function(res) {
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
                this.$http.post(SERVERROOTDATA + "User.ashx?action=getKithBindValidateCode", {
                    mobile: vc,
                    imageCode: this.imageCode,
                    imageValue: imageCodeVal
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    var obj = res.body.code;
                    var _this=this;
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
                    if(obj==200||obj=='200'){
                        layer.msg("验证码已发送注意查收短信");
                        var Interval = setInterval(function() {
                            _this.VCTimeKey = false;
                            _this.VCLabel = _this.VCTime-- + "s";
                            if(_this.VCTime < 1) {
                                _this.VCTimeKey = true;
                                _this.VCLabel = '获取短信验证码';
                                clearInterval(Interval);
                            }
                        }, 1000);
                    }else{
                        layer.msg(res.body.message);
                    }

                });
            },
            // 通过手机获得验证码
            vcTimeCount: function vcTimeCount() {
                var _this = this;
                if(_this.VCTimeKey) {
                    if(!isPhone($('#phone').val())) {
                        layer.msg("请输入正确的手机号码!");
                        return false;
                    }
                    if(!isEmpty(this.verificationCode)){
                        layer.msg("请输入验证码");
                        return false;
                    }
                    _this.getVCCode();
                }
            },
            // 确定绑定按钮
            confirmBind:function () {
                var relation=$('#relation').val();
                var phone=$('#phone').val();
                var checkCode=$('#checkCode').val();
                var parentId=$('#parentId').val();
                if(!isEmpty(checkCode)){
                    layer.msg('校验码不能为空！');
                }else{
                    this.$http.post(SERVERROOTDATA + "User.ashx?action=bindUserKith", {
                        userId: studentId,
                        userType: 'student',
                        parentId: parentId,
                        relationType:relation
                    }, {
                        emulateJSON: true
                    }).then(function (res) {
                        layer.msg(res.body.message);
                        setTimeout(function () {
                            window.location.href = "studentmyparent.html";
                        },1000)
                    });
                    // $.ajax({
                    //     url: SERVERROOTDATA+"TeachingStudio.ashx?action=teachingStudioSave",
                    //     type: "POST",
                    //     data: data,
                    //     processData: false,  // 告诉jQuery不要去处理发送的数据
                    //     contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                    //     success:function (res) {
                    //         if(res==200){
                    //             layer.msg("保存成功！");
                    //             setTimeout(function () {
                    //                 window.location.href =ROOT+"teachercentermystudio.html";
                    //             },1000)
                    //         }
                    //     }
                    // });
                }
            },
            close:function () {
                layer.closeAll();
            }
        }
    })
}
// 绑定家长弹框
// function bindParentPop(obj) {
//     console.log($(obj).parent().prev().html());
//     $('#bindParent #phone').val($(obj).parent().prev().html());
//     layer.open({
//         type: 1,
//         area:['500px','400px'],
//         content: $('#bindParent') //这里content是一个DOM
//     });
//
// }
// 我的老师
// 我的老师
// 我的老师
function myteacher() {
    var studentId=$(window).storager({key: 'feUid'}).readStorage();
    var userType=$(window).storager({key: 'feUType'}).readStorage();
    if(studentId==null||studentId==undefined||studentId=='undefined'||userType!=1){
        layer.msg('请先登录');
        setTimeout(function () {
            window.location.href = ROOT+"login.html";
        },1000);
        return;
    }
    $.ajax({
        url: SERVERROOTDATA+"Student.ashx?action=getEducationExperience",
        type: "POST",
        data: {
            userId:studentId,
            userType:"student"
        },
        // processData: false,  // 告诉jQuery不要去处理发送的数据
        // contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
        success:function (res) {
            var data = JSON.parse(res);
            if(data.rows==undefined){
                layer.msg('您还没有班级设置');
                setTimeout(function () {
                    window.location.href = ROOT+"studentaccountinformation.html";
                },1000);
                return;
            }else{
                if(data.rows[0].classId==''||data.rows[0].classId=='undefined'||data.rows[0].classId==undefined||data.rows[0].classId<=0){
                    layer.msg('您还没有班级设置');
                    setTimeout(function () {
                        window.location.href = ROOT+"studentaccountinformation.html";
                    },1000);
                    return;
                }else {
                    var classId=data.rows[0].classId;
                    getteacher(classId);
                }
            }
        }
    });
    function getteacher(classId) {
        new Vue({
            el:"#myteacher",
            data:{
                myteacher:[],
                showItem:4,//页码显示条数
                allpage:'',//总页数
                current:1,//当前页
                condition:''//关键字搜索
            },
            filters: {
                addRootFile: function addRootFile(img) {
                    return SERVERROOTFILE + img;
                },
                addAnswerRoot:function addAnswerRoot(id) {
                    return "answerquestion.html?teacherId=" + id;
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
                    _this.getmyteacher(1,_this.condition);
                    _this.bindSearch();
                })
            },
            methods: {
                getmyteacher:function (pageIndex,condition) {
                    var _this=this;
                    this.$http.post(SERVERROOTDATA + "StudentTrs.ashx?action=getMyTeacher",
                        {
                            classId:classId,
                            condition:condition,
                            pageIndex:pageIndex,
                            pageSize:2
                        }
                        ,{emulateJSON: true})
                        .then(function (res) {
                            if(res.body.code==200){
                                _this.myteacher = res.body.rows;
                                _this.allpage=res.body.totalPageCount;
                            }
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
                    _this.getmyteacher(_this.current,_this.condition);
                },
                bindSearch:function bindSearch() {
                    var _this=this;
                    $('#myteacher .feselect').on('click','button',function () {
                        _this.condition=$(this).parent().find('#keyword').val();
                        _this.current=1;
                        _this.getmyteacher(_this.current,_this.condition);
                    });
                }
            }
        });
    }

}
// 我的课程
function mycourse() {
    var studentId=$(window).storager({key: 'feUid'}).readStorage();
    var userType=$(window).storager({key: 'feUType'}).readStorage();
    if(studentId==null||studentId==undefined||studentId=='undefined'||userType!=1){
        layer.msg('请先登录');
        setTimeout(function () {
            window.location.href = ROOT+"login.html";
        },1000);
        return;
    }
    $('.festudentmycourse .fehead').on('click','span',function () {
        if($(this).hasClass('active')){
            return;
        }else {
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            if($(this).data('id')==1){
                $('#livecourse').css('display','block');
                $('#recordedcourse').css('display','none');
            }else{
                $('#livecourse').css('display','none');
                $('#recordedcourse').css('display','block');
            }
        }
    });
    new Vue({
        el:"#livecourse",
        data:{
            livecourse:[],
            showItem:4,//页码显示条数
            allpage:'',//总页数
            current:1,//当前页
            subjectName:'',
            courseName:'',
            playState:''
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            addCourseRoot:function addCourseRoot(id) {
                return 'cloundcoursedetail.html?courseId='+id;
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
                _this.getlivecourse(1,_this.subjectName,_this.courseName,_this.playState);
                _this.bindSearch();
                _this.emptySearch();
            })
        },
        methods: {
            getlivecourse:function (pageIndex,subjectName,courseName,playState) {
                var _this=this;
                this.$http.post(SERVERROOTDATA + "Course.ashx?action=getOrderLiveCourse",
                    {
                        userId:13,
                        userType:'student',
                        subjectName:subjectName,
                        courseName:courseName,
                        playState:playState,
                        pageIndex:pageIndex,
                        pageSize:2
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.code==200){
                            _this.livecourse = res.body.rows;
                            _this.allpage=res.body.totalPageCount;
                        }
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
                _this.getlivecourse(_this.current,_this.subjectName,_this.courseName,_this.playState);
            },
            bindSearch:function bindSearch() {
                var _this=this;
                $('#livecourse .feselect .feoperation').on('click','button:first-child',function () {
                    _this.subjectName=$(this).parent().parent().find('#subject1').val();
                    _this.courseName=$(this).parent().parent().find('#courseName1').val();
                    _this.playState=$(this).parent().parent().find('#playState1').val();
                    _this.current=1;
                    _this.getlivecourse(_this.current,_this.subjectName,_this.courseName,_this.playState);
                });
            },
            emptySearch:function emptySearch() {
                var _this=this;
                $('#livecourse .feselect .feoperation').on('click','button:last-child',function () {
                    $(this).parent().parent().find('#subject1').val('');
                    $(this).parent().parent().find('#courseName1').val('');
                    $(this).parent().parent().find('#playState1').val('');
                    _this.current=1;
                    _this.subjectName='';
                    _this.courseName='';
                    _this.playState='';
                    _this.getlivecourse(_this.current,_this.subjectName,_this.courseName,_this.playState);
                });
            }
        }
    });
    new Vue({
        el:"#recordedcourse",
        data:{
            recordedcourse:[],
            showItem:4,//页码显示条数
            allpage:'',//总页数
            current:1,//当前页
            subjectName:'',
            courseName:'',
            playState:''
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            addCourseRoot:function addCourseRoot(id) {
                return 'coursedetail.html?courseId='+id;
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
                _this.getrecordedcourse(1,_this.subjectName,_this.courseName,_this.playState);
                _this.bindSearch();
                _this.emptySearch();
            })
        },
        methods: {
            getrecordedcourse:function (pageIndex,subjectName,courseName,playState) {
                var _this=this;
                this.$http.post(SERVERROOTDATA + "Course.ashx?action=getOrderRecordCourse",
                    {
                        userId:studentId,
                        userType:'student',
                        subjectName:subjectName,
                        courseName:courseName,
                        playState:playState,
                        pageIndex:pageIndex,
                        pageSize:2
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.code==200){
                            _this.recordedcourse = res.body.rows;
                            _this.allpage=res.body.totalPageCount;
                        }
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
                _this.getrecordedcourse(_this.current,_this.subjectName,_this.courseName,_this.playState);
            },
            bindSearch:function bindSearch() {
                var _this=this;
                $('#recordedcourse .feselect .feoperation').on('click','button:first-child',function () {
                    _this.subjectName=$(this).parent().parent().find('#subject2').val();
                    _this.courseName=$(this).parent().parent().find('#courseName2').val();
                    _this.playState=$(this).parent().parent().find('#playState2').val();
                    _this.current=1;
                    _this.getrecordedcourse(_this.current,_this.subjectName,_this.courseName,_this.playState);
                });
            },
            emptySearch:function emptySearch() {
                var _this=this;
                $('#recordedcourse .feselect .feoperation').on('click','button:last-child',function () {
                    $(this).parent().parent().find('#subject2').val('');
                    $(this).parent().parent().find('#courseName2').val('');
                    $(this).parent().parent().find('#playState2').val('');
                    _this.current=1;
                    _this.subjectName='';
                    _this.courseName='';
                    _this.playState='';
                    _this.getrecordedcourse(_this.current,_this.subjectName,_this.courseName,_this.playState);
                });
            }
        }
    });
}
// 提问老师
function answerquestion() {
    var studentId=$(window).storager({key: 'feUid'}).readStorage();
    var userType=$(window).storager({key: 'feUType'}).readStorage();
    var teacherId=$(this).getUrlParam("teacherId");
    if(studentId==null||studentId==undefined||studentId=='undefined'||userType!=1){
        layer.msg('请先登录');
        setTimeout(function () {
            window.location.href = ROOT+"login.html";
        },1000);
        return;
    }
    new Vue({
        el:"#answerquestion",
        data:{
            pastanswer:[],
            showItem:4,//页码显示条数
            allpage:'',//总页数
            current:1,//当前页
            teacherName:'',
            courseArr:''
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
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
                _this.getpastanswer(1);
                _this.addQuestion();
            })
        },
        methods: {
            addQuestion:function addQuestion() {
                $('.addquestion').on('click','span',function () {
                    layer.open({
                        type: 1,
                        title:"提问",
                        area:['500px','400px'],
                        content: $('#answerview') //这里content是一个DOM
                    });
                });
                var _this=this;
                this.$http.post(SERVERROOTDATA + "StudentTrs.ashx?action=getTeacherCourse",
                    {
                        teacherId:teacherId
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                            _this.courseArr = res.body;
                    }).then(function () {
                        $('#answerview').on('click','p>button',function () {
                            var courseId=$(this).parent().parent().find('#answerview-course').val();
                            var text=$(this).parent().parent().find('#answerview-content').val();
                            _this.$http.post(SERVERROOTDATA + "StudentTrs.ashx?action=studentQuestionSave",
                                {
                                    teacherId:teacherId,
                                    courseId:courseId,
                                    questionerId:studentId,
                                    questionerType:0,
                                    content:text
                                }
                                ,{emulateJSON: true})
                                .then(function (res) {
                                    if(res.body==200){
                                        layer.msg('提问成功');
                                        setTimeout(function () {
                                            layer.closeAll();
                                        },1000);
                                        _this.getpastanswer(_this.current);

                                    }else{
                                        layer.msg('提问失败')
                                    }

                                })
                        })
                });
            },
            getpastanswer:function (pageIndex) {
                var _this=this;
                this.$http.post(SERVERROOTDATA + "StudentTrs.ashx?action=getMyQuestion",
                    {
                        teacherId:teacherId,
                        studentId:studentId,
                        questionerType:0,
                        pageIndex:pageIndex,
                        pageSize:4
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.pastanswer = res.body.rows;
                        _this.teacherName = res.body.teachername;
                        _this.allpage=res.body.totalPageCount;
                    }).then(function () {
                })
            },
            lookdetail:function (id,title,coursename,time,teachername) {
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
                    content: 'answeringreplydetail.html?questionId='+ id + '&title=' + title + '&coursename='+coursename+'&time='+time + "&teachername="+ teachername
                });
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
                _this.getpastanswer(_this.current);
            }
        }
    });
}
/*
 消息管理
    */
// 学生答疑回复
function answeringreply() {
    var studentId=$(window).storager({key: 'feUid'}).readStorage();
    var userType=$(window).storager({key: 'feUType'}).readStorage();
    if(studentId==null||studentId==undefined||studentId=='undefined'||userType!=1){
        layer.msg('请先登录');
        setTimeout(function () {
            window.location.href = ROOT+"login.html";
        },1000);
        return;
    }
    new Vue({
        el:"#answeringreply",
        data:{
            result:[],
            type:0,
            showItem:4,//页码显示条数
            allpage:'1',//总页数
            current:1//当前页
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
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
                _this.getresult(1,_this.type);
                _this.changeRead();
            })
        },
        methods: {
            getresult:function (pageIndex,type) {
                var _this=this;
                this.$http.post('http://192.168.101.195/website/ashx/' + "StudentTrs.ashx?action=getQuestionReply",
                    {
                        studentId:studentId,
                        questionerType:0,
                        readType:type,
                        pageIndex:pageIndex,
                        pageSize:10
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.result = res.body.rows;
                        // _this.result=[{questionContent:'dada',courseName:'大大',questioner:"天天",time:"2017-10-30 12:00",questionId:1}]
                        _this.allpage=res.body.totalPageCount;
                    })
            },
            lookdetail:function (id,title,coursename,time,teachername) {
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
                    content: 'answeringreplydetail.html?questionId='+ id + '&title=' + title + '&coursename='+coursename+'&time='+time + "&teachername="+ teachername
                });
            },
            changeRead:function () {
                var _this=this;
                $('.femessage-head .feselect').on('click','span',function () {
                    var type=$(this).data('id');
                    $(this).siblings().removeClass('active');
                    $(this).addClass('active');
                    _this.type=type;
                    _this.current = 1;
                    _this.getresult(_this.current,_this.type);
                });
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
                _this.getresult(_this.current,_this.type);
            }
        }
    });
}
// 学生评论回复
function discussreply() {
    var studentId=$(window).storager({key: 'feUid'}).readStorage();
    var userType=$(window).storager({key: 'feUType'}).readStorage();
    if(studentId==null||studentId==undefined||studentId=='undefined'||userType!=1){
        layer.msg('请先登录');
        setTimeout(function () {
            window.location.href = ROOT+"login.html";
        },1000);
        return;
    }
    new Vue({
        el:"#discussreply",
        data:{
            result:[],
            type:'',
            showItem:4,//页码显示条数
            allpage:'1',//总页数
            current:1//当前页
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
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
                _this.getresult(1,_this.type);
                _this.bindfn();
            })
        },
        methods: {
            bindfn:function bindfn() {
                var _this=this;
                $('.femessage-head .feselect').on('click','span',function () {
                    if(!$(this).hasClass('active')){
                        $(this).siblings('span').removeClass('active');
                        $(this).addClass('active');
                        var type=$(this).data('type');
                        _this.current = 1;
                        _this.getresult(_this.current,_this.type);
                    }
                });
            },
            getresult:function (pageIndex,type) {
                var _this=this;
                this.$http.post(SERVERROOTDATA + "TeacherResource.ashx?action=getTeacherResource",
                    {
                        type:type,
                        pageIndex:pageIndex,
                        pageSize:2
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        // _this.result = res.body.rows;
                        _this.result=[{disucssContent:'dada',courseName:'大大',disucsser:"天天",time:"2017-10-30 12:00",discussId:1}];
                        _this.allpage=res.body.totalPageCount;
                    }).then(function () {
                    // 查看详情
                    $('.feansweringreply').on('click','.felist .lookdetail',function () {
                        var id = $(this).data('id');
                        layer.open({
                            type: 2,
                            title: '详情',
                            //closeBtn: 0, //不显示关闭按钮
                            shadeClose: false,
                            shade: [0.5, '#000'],
                            area: ['600px', '420px'],
                            //offset: 'rb', //右下角弹出
                            //time: 2000, //2秒后自动关闭
                            anim: 2,
                            content: 'discussdetail.html?discussId=' + id
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
                _this.getresult(_this.current,_this.type);
            }
        }
    });
}
// 学生网站通知
function webnotice() {
    new Vue({
        el:"#webnotice",
        data:{
            result:[],
            type:'',
            showItem:4,//页码显示条数
            allpage:'1',//总页数
            current:1//当前页
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
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
                _this.getresult(1,_this.type);
                _this.bindfn();
            })
        },
        methods: {
            bindfn:function bindfn() {
                var _this=this;
                $('.femessage-head .feselect').on('click','span',function () {
                    if(!$(this).hasClass('active')){
                        $(this).siblings('span').removeClass('active');
                        $(this).addClass('active');
                        var type=$(this).data('type');
                        _this.current = 1;
                        _this.getresult(_this.current,_this.type);
                    }
                });
            },
            getresult:function (pageIndex,type) {
                var _this=this;
                this.$http.post(SERVERROOTDATA + "TeacherResource.ashx?action=getTeacherResource",
                    {
                        type:type,
                        pageIndex:pageIndex,
                        pageSize:2
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        // _this.result = res.body.rows;
                        _this.result=[{title:'头条',publisher:"天天",time:"2017-10-30 12:00",discussId:1,content:"你很帅!"}];
                        _this.allpage=res.body.totalPageCount;
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
                _this.getresult(_this.current,_this.type);
            },
            lookNotice:function  lookNotice(title,content) {
                layer.open({
                    type: 1,
                    title: title,
                    //closeBtn: 0, //不显示关闭按钮
                    shadeClose: false,
                    shade: [0.5, '#000'],
                    area: ['500px', 'auto'],
                    //offset: 'rb', //右下角弹出
                    //time: 2000, //2秒后自动关闭
                    anim: 2,
                    content: '<p style="padding: 20px">'+content +'</p>'
                });
            }
        }
    });
}


// 学习笔记
function learningnote() {
    var studentId=$(window).storager({key: 'feUid'}).readStorage();
    var userType=$(window).storager({key: 'feUType'}).readStorage();
    if(studentId==null||studentId==undefined||studentId=='undefined'||userType!=1){
        layer.msg('请先登录');
        setTimeout(function () {
            window.location.href = ROOT+"login.html";
        },1000);
        return;
    }
    new Vue({
        el:"#learningnote",
        data:{
            learningnote:[],
            showItem:4,//页码显示条数
            allpage:'',//总页数
            current:1,//当前页
            subjectName:'',
            courseName:'',
            subjectArr:"",//下拉科目列表
            courseArr:"",//下拉课程列表
            currentNote:''
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
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
                _this.getlearningnote(1,_this.subjectName,_this.courseName);
                _this.bindSearch();
                _this.bindAddNote();
                _this.getselect();
            })
        },
        methods: {
            getselect:function () {
                var _this=this;
                this.$http.post(SERVERROOTDATA + "Subject.ashx?action=getUserSubject",
                    {
                        userId:13,
                        userType:'student'
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.code==200){
                            _this.subjectArr = res.body.rows;
                        }
                    }).then(function () {
                        $('#subject').on('change',function () {
                            var subjectId=$(this).find('option:selected').val();
                            _this.$http.post(SERVERROOTDATA + "Course.ashx?action=getSubjectCourse",
                                {
                                    subjectId:subjectId
                                }
                                ,{emulateJSON: true})
                                .then(function (res) {
                                    if(res.body.code==200){
                                        _this.courseArr = res.body.rows;
                                    }
                                })
                        });

                })
            },
            getlearningnote:function (pageIndex,subjectName,courseName) {
                var _this=this;
                this.$http.post(SERVERROOTDATA + "Note.ashx?action=getNoteList",
                    {
                        userId:13,
                        userType:'student',
                        subjectName:subjectName,
                        courseName:courseName,
                        pageIndex:pageIndex,
                        pageSize:11
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.code==200){
                            _this.learningnote = res.body.rows;
                            _this.allpage=res.body.totalPageCount;
                        }
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
                _this.getlearningnote(_this.current,_this.subjectName,_this.courseName);
            },
            bindSearch:function bindSearch() {
                var _this=this;
                $('#learningnote').on('click','.feselect>button',function () {
                    _this.subjectName=$(this).parent().find('#subjectname').val();
                    _this.courseName=$(this).parent().find('#coursename').val();
                    _this.current=1;
                    _this.getlearningnote(_this.current,_this.subjectName,_this.courseName);
                });
            },
            bindAddNote:function bindAddNote() {
                var _this=this;
                $('#learningnote .feselect p').on('click','button',function () {
                    layer.open({
                        type: 1,
                        title:"添加笔记",
                        area:['600px','380px'],
                        content: $('#addlearningnote') //这里content是一个DOM
                    });
                });
            },
            // 新增笔记
            saveNote:function () {
                var _this=this;
                var subjectId=$('#subject').val();
                var courseId=$('#course').val();
                var text=$('#content').val();
                $('#content').val('');
                if(!isEmpty(subjectId)){
                    layer.msg('请选择学科!');
                }else{
                    if(!isEmpty(courseId)){
                        layer.msg('请选择课程!');
                    }else{
                        if(!isEmpty(text)){
                            layer.msg('笔记不能为空！')
                        }else {
                            _this.$http.post(SERVERROOTDATA + "Note.ashx?action=noteSave",
                                {
                                    userId:13,
                                    userType:'student',
                                    subjectId:subjectId,
                                    courseId:courseId,
                                    content:text,
                                    noteId:0,
                                    saveTag:'add'
                                }
                                ,{emulateJSON: true})
                                .then(function (res) {
                                    if(res.body.code==200){
                                        layer.msg(res.body.message);
                                        setTimeout(function () {
                                            layer.closeAll();
                                            _this.getlearningnote(_this.current,_this.subjectName,_this.courseName);
                                        },1000);

                                    }else {
                                        layer.msg('保存失败！');
                                    }
                                })
                        }
                    }
                }

            },
            //编辑笔记
            editNote:function (id) {
                var _this=this;
                layer.open({
                    type: 1,
                    title:"编辑笔记",
                    area:['600px','380px'],
                    content: $('#editlearningnote') //这里content是一个DOM
                });
                this.$http.post(SERVERROOTDATA + "Note.ashx?action=getNoteById",
                    {
                        noteId:id
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.length<1){
                            return false
                        }else {
                            _this.currentNote = res.body[0];
                        }
                    })
            },
            // 删除笔记
            deleteNote:function (id) {
                var _this=this;
                layer.confirm('你确定要删除吗？', {
                    btn: ['确定','取消'] //按钮
                }, function(){
                    _this.$http.post(SERVERROOTDATA + "Note.ashx?action=noteSave",
                        {
                            noteId:id,
                            saveTag:'delete'
                        }
                        ,{emulateJSON: true})
                        .then(function (res) {
                            if(res.body.code==200){
                                layer.msg(res.body.message);
                                setTimeout(function () {
                                    layer.closeAll();
                                    _this.getlearningnote(_this.current,_this.subjectName,_this.courseName);
                                },1000);

                            }else{
                                layer.msg('删除失败！');
                            }
                        })
                }, function(){
                });

            },
            // 更新笔记
            updateNote:function (id,subjectId,courseId) {
                var _this=this;
                var text=$('#editcontent').val();
                $('#editcontent').val('');
                if(!isEmpty(text)){
                    layer.msg('笔记不能为空！')
                }else{
                    this.$http.post(SERVERROOTDATA + "Note.ashx?action=noteSave",
                        {
                            userId:13,
                            userType:'student',
                            subjectId:subjectId,
                            courseId:courseId,
                            content:text,
                            noteId:id,
                            saveTag:'update'
                        }
                        ,{emulateJSON: true})
                        .then(function (res) {
                            if(res.body.code==200){
                                layer.msg(res.body.message);
                                setTimeout(function () {
                                    layer.closeAll();
                                    _this.getlearningnote(_this.current,_this.subjectName,_this.courseName);
                                },1000);

                            }else{
                                layer.msg('保存失败！');
                            }
                        })
                }

            }
        }
    });
}
// 下载管理
function download() {
    var studentId=$(window).storager({key: 'feUid'}).readStorage();
    var userType=$(window).storager({key: 'feUType'}).readStorage();
    if(studentId==null||studentId==undefined||studentId=='undefined'||userType!=1){
        layer.msg('请先登录');
        setTimeout(function () {
            window.location.href = ROOT+"login.html";
        },1000);
        return;
    }
    new Vue({
        el:"#download",
        data:{
            downloadArr:[],
            showItem:4,//页码显示条数
            allpage:'',//总页数
            current:1,//当前页
            title:'',
            source:''
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            downRoot: function downRoot(url) {
                return SERVERROOTFILE  + url;
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
                _this.getdownload(1,_this.title,_this.source);
                _this.bindSearch();
            })
        },
        methods: {
            getdownload:function (pageIndex,title,source) {
                var _this=this;
                this.$http.post(SERVERROOTDATA + "ResourceDownload.ashx?action=getResourceDownload",
                    {
                        userId:13,
                        userType:'student',
                        title:title,
                        source:source,
                        pageIndex:pageIndex,
                        pageSize:11
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        if(res.body.code==200){
                            _this.downloadArr = res.body.rows;
                            _this.allpage=res.body.totalPageCount;
                        }
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
                _this.getdownload(_this.current,_this.title,_this.source);
            },
            bindSearch:function () {
                var _this=this;
                $('#download').on('click','.feselect>button',function () {
                    _this.title=$(this).parent().find('#title').val();
                    _this.source=$(this).parent().find('#source').val();
                    _this.current=1;
                    _this.getdownload(_this.current,_this.title,_this.source);
                });
            },
            deleteDownload:function (id) {
                var _this=this;
                layer.confirm('你确定要删除吗？', {
                    btn: ['确定','取消'] //按钮
                }, function(){
                    _this.$http.post(SERVERROOTDATA + "ResourceDownload.ashx?action=resourceDownloadSave",
                        {
                            resourceDownloadId:id,
                            saveTag:'delete'
                        }
                        ,{emulateJSON: true})
                        .then(function (res) {
                            if(res.body.code==200){
                                layer.msg(res.body.message);
                                setTimeout(function () {
                                    layer.closeAll();
                                    _this.getdownload(_this.current,_this.title,_this.source);
                                },1000);

                            }else{
                                layer.msg('删除失败！');
                            }
                        })
                }, function(){
                });
            }
        }
    });
}

function reload() {
    location.reload();
}
// 答疑回复详情
function answeringreplydetail() {
    var questionId=$(this).getUrlParam("questionId");
    var title=$(this).getUrlParam("title");
    var coursename=$(this).getUrlParam("coursename");
    var time=$(this).getUrlParam("time");
    var teachername=$(this).getUrlParam("teachername");
    var studentId=$(window).storager({key: 'feUid'}).readStorage();
    function draw(questionId,title,coursename,time,teachername) {
        new Vue({
            el:"#answeringreplydetail",
            data:{
                pastanswer:[],
                nodata:true,
                current:1,//当前页
                title:title,
                coursename:coursename,
                time:time,
                teachername:teachername
            },
            filters: {
                addRootFile: function addRootFile(img) {
                    return SERVERROOTFILE + img;
                },
                whosay:function whosay(type) {
                    return type==0 ? '回答 :' : '我 :';
                }
            },
            mounted:function () {
                var _this=this;
                this.$nextTick(function () {
                    _this.getpastanswer(1);
                    _this.bindFn();
                })
            },
            methods: {
                getpastanswer:function (pageSize) {
                    var _this=this;
                    this.$http.post('http://192.168.101.195/website/ashx/' + "StudentTrs.ashx?action=getQuestionReply",
                        {
                            questionId:questionId,
                            pageIndex:1,
                            pageSize:pageSize*5
                        }
                        ,{emulateJSON: true})
                        .then(function (res) {
                            if(pageSize*5<res.body.totalCount){
                                _this.nodata=true;
                            }else {
                                _this.nodata=false;
                            }
                            if(res.body.code==200){
                                _this.pastanswer = res.body.rows;
                            }

                        }).then(function () {

                    })
                },
                lookmore:function () {
                    this.getpastanswer(++this.current);
                },
                bindFn:function () {
                    var _this=this;
                    $('#answeringreplydetail .feoperation').on('click','button:first-child',function () {
                        var text=$(this).parent().prev().find('textarea').val();
                        $(this).parent().prev().find('textarea').val('');
                        if(!isEmpty(text)){
                            layer.msg('提问内容不能为空!')
                        }else {
                            _this.$http.post('http://192.168.101.195/website/ashx/' + "StudentTrs.ashx?action=studentQuestionReplySave",
                                {
                                    questionId:questionId,
                                    questionerId:studentId,
                                    questionerType:0,
                                    replyContent:text,
                                    replyOrQuestion:1
                                }
                                ,{emulateJSON: true})
                                .then(function (res) {
                                    if(res.body==200){
                                        layer.msg('提问成功!');
                                        _this.getpastanswer(_this.current);
                                        $('#content').scrollTop( $('#content')[0].scrollHeight );
                                    }else {
                                        layer.msg('提问失败')
                                    }
                                })
                        }
                    });
                    $('#answeringreplydetail .feoperation').on('click','button:last-child',function () {
                        _this.$http.post('http://192.168.101.195/website/ashx/' + "StudentTrs.ashx?action=studentQuestionSave",
                            {
                                questionId:questionId,
                                saveTag:'update',
                                replystates:1
                            }
                            ,{emulateJSON: true})
                            .then(function (res) {
                                if(res.body==200){
                                    layer.msg('已标记为解决!');
                                    setTimeout(function () {
                                        parent.close();
                                        parent.reload();
                                    },1000)
                                }else {
                                    layer.msg('操作失败')
                                }
                            })
                    });
                    var dingshi=setInterval(function () {
                        _this.getpastanswer(_this.current);
                    },10000);
                }
            }
        });
    }
    draw(questionId,title,coursename,time,teachername);
}