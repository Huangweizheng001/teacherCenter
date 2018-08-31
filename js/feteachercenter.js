/**
 * Created by Administrator on 2017/9/7 0007.
 */
Vue.component('teacher-header-template', {
    template: '<div><div class="fe-header-top-bar1">' + '<div class="container">' +  '<div class="fe-header-top-other1"><span>老师个人中心</span>' + '<a v-show="!isLogined" v-bind:href="login| addRoot" @click="setPrePage">登录</a>' + '<a v-show="!isLogined" v-bind:href="reg| addRoot" @click="setPrePage">&nbsp;/&nbsp;注册</a>' + '<a v-show="isLogined"  v-bind:href="member | addRoot" >{{nickName}}</a>' + '<a v-show="isLogined" @click="signOut">&nbsp;/&nbsp;退出</a>' + '</div>' + '</div>' + '</div>',
    data: function data() {
        return {
            list: [{
                "name": "平台首页",
                "href": "index.html"
            }, {
                "name": "教育资讯",
                "href": "news.html"
            }, {
                "name": "云课堂",
                "href": "cloundroom.html"
            }, {
                "name": "名师工作室",
                "href": "teacheronline.html"
            }, {
                "name": "选课中心",
                "href": "coursecenter.html"
            }, {
                "name": "影视圈",
                "href": "moviecircle.html"
            }, {
                "name": "作业",
                "href": "questionindex.html"
            }, {
                "name": "社圈",
                "href": "community.html"
            }],
            isLogined: false,
            searchType: 1, //1 课程 2：老师 3：机构
            searchValue: '',
            nickName: '',
            index: 'index.html',
            login: 'login.html',
            reg: 'login.html?login=3',
            member: 'teachercenter.html',
            message: 'messagecenter.html',
            shoppingcar: 'shoppingcar.html',
            smallLogo: 'images/public/logo-icon-small.png',
            logo: 'images/public/logo-front-icon.jpg'
        };
    },
    mounted: function mounted() {
        //1.0ready --> 2.0
        this.$nextTick(function() {
            //初始化
            this.initData();
        });
    },
    filters: {
        addRoot: function addRoot(obj) {
            return ROOT + obj;
        }
    },
    methods: {
        storageActive: function storageActive(id) {
            $(window).storager({ //Uid
                key: 'navkey',
                value: id,
                expires: 0
            }).addStorage();
        },
        initData: function initData() {
            this.list.forEach(function(item, index) {
                if(typeof item.active == "undefined") {
                    Vue.set(item, "active", false); //全局注册变量
                }
            });

            if($(window).storager({
                    key: 'navkey'
                }).readStorage() == undefined) {
                this.list[0].active = true;
            } else {
                var index = parseInt($(window).storager({
                    key: 'navkey'
                }).readStorage());
                this.list[index].active = true;
            }
            if($(window).storager({
                    key: 'feUid'
                }).readStorage() == undefined) {
                this.isLogined = false;
            } else {
                this.isLogined = true;
                this.nickName = $(window).storager({
                    key: 'feUNickName'
                }).readStorage();
            }
        },
        changeSearchType: function changeSearchType(type) {
            this.searchType = type;
        },
        subSearch: function subSearch() {
            if("" == this.searchValue) {
                layer.msg("请输入搜索内容哦！");
                return false;
            }
            var _this = this;
            this.$http.post(ROOTDATA + "indexNewsData.json", {
                searchValue: _this.searchValue,
                searchType: _this.searchType
            }, {
                emulateJSON: true
            });
        },
        keyEnter: function keyEnter(et) {
            this.subSearch();
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
                value: $.getBasePath(1),
                expires: 0
            }).addStorage();
        }
    }
});
var header = new Vue({
    el: '#header'
});

if($(window).storager({ key: 'feUid' }).readStorage()=='undefined'){
    window.location.href = "http://www.fetv.cn/feweb/login.html";
}else{
    var teacherId=$(window).storager({key: 'feUid'}).readStorage();
    $('.feteacherpersonalcenter-left-head h1').html($(window).storager({key: 'feUNickName'}).readStorage());
    $.ajax({
        url: SERVERROOTDATA+"Teacher.ashx?action=getTeacherById",
        type: "POST",
        data: {"teacherId":teacherId},
        // processData: false,  // 告诉jQuery不要去处理发送的数据
        // contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
        success:function (res) {
            var data = JSON.parse(res);
            console.log(data);
            if(data.length<1){
                return false
            }else{
                $('.feteacherpersonalcenter-left-head .feteacher-picture img').attr('src',SERVERROOTFILE + data[0].iconPath);
            }
        }
    });
}
// 老师个人中心-左边跳转
$('.feteacherpersonalcenter-left-content .fechild').on('click','li a',function () {
    $('.feteacherpersonalcenter-left-content').find('.fechild a').removeClass('active');
    $(this).addClass('active');
});
// 更换头像
$('.feteacherpersonalcenter-left-head').on('change','#mytx',function () {
    if($(this).val().match( /.jpg|.gif|.png|.bmp/i)) {
        var data = new FormData($('#membercenter')[0]);
        data.append('teacherId',teacherId);
        console.log(22)
        $.ajax({
            url: SERVERROOTDATA+"Teacher.ashx?action=SaveTeacherHead",
            type: "POST",
            data: data,
            processData: false,  // 告诉jQuery不要去处理发送的数据
            contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
            success:function (res) {
                console.log(res);
                if(res==200){

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
//上传图像，并显示图像
//c:点击节点，即点击input type=fille 后内容存贮
//d:存贮图像的节点
var upload = function (c, d) {
    console.log(555);
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
// 老师个人中心-个人资料
function personalsetting(teacherId) {
    // 预览主页
    $('.feteacherpersonalcenter-right-head a:contains("预览主页")').attr('href',ROOT+"teacherindex.html?teacherId="+teacherId);
    var opts='';
    for(var i=1;i<=30;i++){
        opts+='<option value="'+i+'">'+i+'年</option>';
    }
    $('#seniority').html(opts);//追加教龄option
    // 获取初始值
    $.ajax({//基本信息
        url: SERVERROOTDATA+"Teacher.ashx?action=getTeacherBasicInfoById",
        type: "POST",
        data: {teacherId:teacherId},
        success:function (res) {
            var data = JSON.parse(res);
            if(data.length<1){

            }else {// 初始化基本信息
                $('#username').val(data[0].name);
                $('#nickname').val(data[0].nickName);
                if (data[0].sex == '0') {
                    $('#male').prop('checked', 'true');
                    $('#female').prop('checked', '');
                    $('#male').prev().html('男');
                } else {
                    $('#male').prop('checked', '');
                    $('#female').prop('checked', 'true');
                    $('#male').prev().html('女');
                }
                $('#information .fetextarea').html(data[0].introduce);
            }
        }
    });
    $.ajax({//联系方式
        url: SERVERROOTDATA+"Teacher.ashx?action=getTeacherContactInfoById&teacherId",
        type: "POST",
        data: {teacherId:teacherId},
        success:function (res) {
            var data = JSON.parse(res);
            if(data.length<1){

            }else {// 初始化联系方式
                $('#email').val(data[0].email);
                $('#phone').val(data[0].mobile);
                $('#qq').val(data[0].qq);
            }
        }
    });
    $.ajax({//背景资料
        url: SERVERROOTDATA+"Teacher.ashx?action=getTeacherBackgroundInfoById",
        type: "POST",
        data: {teacherId:teacherId},
        success:function (res) {
            var data = JSON.parse(res);
            if(data.length<1){

            }else{
                // 初始化背景资料
                if(data[0].ofSchoolAge==undefined||data[0].ofSchoolAge=='undefined'){
                    $('#seniority').prev().html();
                }else{
                    $('#seniority').prev().html(data[0].ofSchoolAge+'年');
                }
                $.each($('#seniority option'),function (i,j) {
                    if($(j).val()==data[0].ofSchoolAge){
                        $(j).prop('selected','true');
                    }else {
                        $(j).prop('selected','');
                    }
                });
                if(data[0].educationalLevelName==undefined||data[0].ofSchoolAge=='undefined'){
                    $('#Teachingsubject i').html();
                }else{
                    $('#Teachingsubject i').html(data[0].educationalLevelName+'/'+data[0].gradeName+'/'+data[0].subjectName);
                }
                var period=$('#period option');
                for(var i=0;i<period.length;i++){//学段
                    if($(period[i]).val()==data[0].educationalLevelId){
                        $(period[i]).prop('selected','true');
                    }else{
                        $(period[i]).prop('selected','');
                    }
                }
                var grade=$('#grade option');
                for(var i=0;i<grade.length;i++){//年级
                    if($(grade[i]).val()==data[0].gradeId){
                        $(grade[i]).prop('selected','true');
                    }else{
                        $(grade[i]).prop('selected','');
                    }
                }
                var subject=$('#subject option');
                for(var i=0;i<subject.length;i++){//学科
                    if($(subject[i]).val()==data[0].subjectId){
                        $(subject[i]).prop('selected','true');
                    }else{
                        $(subject[i]).prop('selected','');
                    }
                }
            }
            teachingsubject();//动态加载教学课程下拉框
        }
    });
    $.ajax({//过往经历
        url: SERVERROOTDATA+"Teacher.ashx?action=getTeachingProcessByTeacherId",
        type: "POST",
        data: {teacherId:teacherId},
        success:function (res) {
            var data = JSON.parse(res);
            if(data.length<1||isEmptyObject(data[0])){

            }else{//初始化过往经历
                for(var i=0;i<data.length;i++){
                    var beginDate=parseInt(data[i].beginYear)+'年'+parseInt(data[i].beginMonth)+'月';
                    var endDate=parseInt(data[i].endYear)+'年'+parseInt(data[i].endMonth)+'月';
                    addPastthingData(beginDate,endDate,data[i].experience,data[i].teachingProcessId);
                }
            }
        }
    });
    // 获取教学科目选择下拉
    function teachingsubject() {
        new Vue({
            el: "#Teachingsubject",
            data: {
                educationalLevel:[],
                grade:[],
                subject:[],
                educationalLevelId:'',
                gradeId:'',
                subjectId:''
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
                    // 学段
                    this.$http.post(SERVERROOTDATA + "EducationalLevel.ashx?action=getEducationalLevel",
                        {
                            organId:''
                        }
                        ,{emulateJSON: true})
                        .then(function (res) {
                            _this.educationalLevel = res.body;
                        }).then(function () {
                        // var doms=$('#period option');
                        // for(var i=0;i<doms.length;i++){
                        //     if($(doms[i]).val()==obj.educationalLevelId){
                        //         $(doms[i]).prop('selected','true');
                        //     }else{
                        //         $(doms[i]).prop('selected','');
                        //     }
                        // }
                    }).then(function () {
                        $('#period').on('change',function () {
                            _this.educationalLevelId=$('#period').val();
                            _this.gradeId='';
                            _this.subjectId='';
                            _this.$http.post(SERVERROOTDATA + "Grade.ashx?action=getGrade",
                                {
                                    educationalLevelId:$('#period').val()
                                }
                                ,{emulateJSON: true})
                                .then(function (res) {
                                    _this.grade = res.body;
                                })
                        })
                    })
                    // 年级
                    this.$http.post(SERVERROOTDATA + "Grade.ashx?action=getGrade",
                        {
                            educationalLevelId:$('#period').val()
                        },
                        {emulateJSON: true})
                        .then(function (res) {
                            _this.grade = res.body;
                        }).then(function () {
                        // var doms=$('#grade option');
                        // for(var i=0;i<doms.length;i++){
                        //     if($(doms[i]).val()==obj.gradeId){
                        //         $(doms[i]).prop('selected','true');
                        //     }else{
                        //         $(doms[i]).prop('selected','');
                        //     }
                        // }
                    }).then(function () {
                        $('#grade').on('change',function () {
                            _this.gradeId=$('#grade').val();
                            _this.subjectId='';
                            _this.$http.post(SERVERROOTDATA + "Subject.ashx?action=getSubject",
                                {
                                    educationalLevelId:$('#period').val(),
                                    gradeId:$('#grade').val()
                                }
                                ,{emulateJSON: true})
                                .then(function (res) {
                                    console.log('哈哈');
                                    _this.subject = res.body;
                                })
                        })
                    })
                    // 学科
                    this.$http.post(SERVERROOTDATA + "Subject.ashx?action=getSubject",
                        {
                            educationalLevelId:$('#period').val(),
                            gradeId:$('#grade').val()
                        }
                        ,{emulateJSON: true})
                        .then(function (res) {
                            _this.subject = res.body;
                        }).then(function () {
                        // var doms=$('#subject option');
                        // // console.log(obj.grade);
                        // for(var i=0;i<doms.length;i++){
                        //     if($(doms[i]).val()==obj.subjectId){
                        //         $(doms[i]).prop('selected','true');
                        //     }else{
                        //         $(doms[i]).prop('selected','');
                        //     }
                        // }
                    }).then(function () {
                        $('#subject').on('change',function () {
                            _this.subjectId=$('#subject').val();
                        })
                    })
                }
            }
        });
    }
    // 基本信息-编辑按钮事件
    $('#information').on('click','.fepersonaldata-title span',function () {
        if(!$(this).hasClass('active')){
            $(this).addClass('active');
            $('#information input[type="text"]').prop('disabled','');
            $('#information i').css('display','none');
            $('#information input[type="radio"]').removeClass('fehidden');
            $('#information label').removeClass('fehidden');
            $('#information .fetextarea').attr('contentEditable','true').addClass('feedit');
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
                if(!isEmpty($('#information .fetextarea').text())){
                    layer.msg('自我介绍不能为空！');
                    return;
                }else {
                    // 保存数据
                    var intro=$('#information .fetextarea').text();
                    // $('#information i').html(sexvalue);
                    var data = new FormData($('#information-form')[0]);
                    data.append('teacherId',teacherId);
                    data.append("introduce",intro);
                    data.append('saveTag','update');
                    $.ajax({
                        url: SERVERROOTDATA+"Teacher.ashx?action=teacherBasicInfoSave",
                        type: "POST",
                        data: data,
                        processData: false,  // 告诉jQuery不要去处理发送的数据
                        contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                        success:function (res) {
                            console.log(res);
                            if(res==200){
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
        $('#information .fetextarea').attr('contentEditable','false').removeClass('feedit');
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
                    data.append('teacherId',teacherId);
                    data.append('saveTag','update');
                    $.ajax({
                        url: SERVERROOTDATA+"Teacher.ashx?action=teacherContactInfoSave",
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
    // 背景资料-编辑按钮事件
    $('#background').on('click','.fepersonaldata-title span',function () {
        if(!$(this).hasClass('active')){
            $(this).addClass('active');
            $('#background i').css('display','none');
            $('#background .fecompany').prop('disabled','');
            $('#background select').removeClass('fehidden');
            $('#background .feoperation').removeClass('fehidden');
        }else{
        }
    });
    // 背景资料-取消按钮事件
    $('#background .feoperation').on('click','a:last-child',function () {
        window.location.reload();
    });
    // 背景资料-保存按钮事件
    $('#background .feoperation').on('click','a:first-child',function () {
        if(!isEmpty($('#company').val())){
            layer.msg('单位/机构/学校 不能为空！');
            return;
        }else{
            // 保存数据
            var data = new FormData($('#background-form')[0]);
            data.append('teacherId',teacherId);
            data.append('saveTag','update');
            $.ajax({
                url: SERVERROOTDATA+"Teacher.ashx?action=teacherBackgroundInfoSave",
                type: "POST",
                data: data,
                processData: false,  // 告诉jQuery不要去处理发送的数据
                contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                success:function (res) {
                    if(res==200){
                        $('#background li:first-child i').html($('#background .feseniority option:selected').text());//教龄
                        var subject=[];
                        $.each($('#background .fesubject'),function (i,j) {
                            subject.push($(j).find('option:selected').html());
                        });
                        console.log(subject)
                        // 教学科目
                        $('#Teachingsubject i').html(subject.join('/'));
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
    var pastcontent='';//过往经历默认提示语句
    // 过往经历-添加按钮事件
    $('#pastthing').on('click','.fepersonaldata-title span',function () {
        $(this).parent().next().removeClass('fehidden');
        pastcontent=$('#pastthing .fetext').html();
    })
    // 过往经历-取消按钮事件
    $('#pastthing').on('click','.feoperation a:last-child',function () {
        window.location.reload();
    });
    // 日期比较
    function  compareDate(b_year,b_month,e_year,e_month) {
        var beginyear=parseInt($(b_year).val());
        var beginmonth=parseInt($(b_month).val());
        var endyear=parseInt($(e_year).val());
        var endmonth=parseInt($(e_month).val());
        if(beginyear<endyear){
            return true;
        }else if(beginyear==endyear){
            if(beginmonth<=endmonth){
                return true;
            }else {
                return false;
            }
        }else{
            return false;
        }
    }
    // 过往经历-保存按钮事件
    $('#pastthing').on('click','.feoperation a:first-child',function () {
        if(!compareDate('#beginyear','#beginmonth','#endyear','#endmonth')){
            layer.msg('开始时间不能大于结束时间！');
            return;
        }else {
            if(!isEmpty($('#pastthing .fetext').text())){
                layer.msg('过往经历不能为空！');
                return;
            }else{
                var beginDate=$('#beginyear').val()+'-'+$('#beginmonth').val()+'-01';
                var endDate=$('#endyear').val()+'-'+$('#endmonth').val()+'-01';
                console.log(beginDate);
                console.log(endDate);
                var experience=$('#pastthing .fetext').text();
                $.ajax({
                    url: SERVERROOTDATA+"Teacher.ashx?action=teachingProcessInfoSave",
                    type: "POST",
                    data: {teacherId:teacherId,beginDate:beginDate,endDate:endDate,saveTag:'add',experience:experience},
                    success:function (res) {
                        if(res==200){
                            layer.msg('保存成功！');
                            setTimeout(function(){window.location.reload()},1000);
                        }else{
                            layer.msg('保存失败！');
                        }
                    }
                });
            }
        }
        $(this).parent().parent().addClass('fehidden');
        $('#pastthing .fetext').html(pastcontent);
    })
    // 经历-删除按钮事件
    $('.fepastthing-content').on('click','li span',function () {
        var _this=this;
        layer.confirm('你确定要删除吗？', {
            btn: ['确定','取消'] //按钮
        }, function(){
            $.ajax({
                url: SERVERROOTDATA+"Teacher.ashx?action=teachingProcessInfoSave",
                type: "POST",
                data: {teachingProcessId:$(_this).data('id'),teacherId:teacherId,saveTag:'delete'},
                success:function (res) {
                    if(res==200){
                        $(_this).parent().parent().remove();
                        layer.msg('删除成功！', {icon: 1});
                    }
                }
            });
        }, function(){

        });
    });
    var relevantcasecontent='';//相关案例
    // 相关案例-添加按钮事件
    $('#relevantcase').on('click','.fepersonaldata-title span',function () {
        $(this).parent().next().removeClass('fehidden');
        relevantcasecontent=$('#relevantcase .fehistory .fetext').html();
    })
    // 相关案例-取消按钮事件
    $('#relevantcase').on('click','.feoperation a:last-child',function () {
        // $(this).parent().parent().addClass('fehidden');
        window.location.reload();
    })
    // 相关案例-保存按钮事件
    $('#relevantcase').on('click','.feoperation a:first-child',function () {
        if(!isEmpty($('#casename').val())){
            layer.msg('案例名称不能为空！');
            return;
        }else{
            if(!isEmpty($('#relevantcase .fetext').text())){
                layer.msg('相关案例不能为空!');
                return;
            }else{
                var data = new FormData($('#relevantcase-form')[0]);
                var experience=$('#relevantcase .fetext').text();
                data.append('experience',experience);
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
    // 添加过往经历事件
    function addPastthingData(beginDate,endDate,experience,teachingProcessId) {
        // var pastthing_begin=$('#pastthing #beginyear option:selected').text()+$('#pastthing #beginmonth option:selected').text();
        // var pastthing_end=$('#pastthing #endyear option:selected').text()+$('#pastthing #endmonth option:selected').text();
        // var html=$('#pastthing .fetext').html();
        var $li=$('<li></li>');
        var $h1=$('<h1>'+beginDate+'  --  '+endDate+'<span data-id="'+teachingProcessId+'">删除</span></h1>');
        var $p=$('<p>'+experience+'</p>');
        $li.append($h1).append($p);
        $('#pastthing .fepastthing-content').append($li);
    }
    // 添加相关案例事件
    function addRelevantcaseData() {
        var title=$('#relevantcase .fehistory .febox input').val();
        var relevantcasedate=$('#relevantcase #dateyear option:selected').text()+$('#relevantcase #datemonth option:selected').text();
        var html=$('#relevantcase .fehistory .fetext').html();
        var $li=$('<li></li>');
        var $h1=$('<h1>'+relevantcasedate+'<s>'+title+'</s><span>删除</span></h1>');
        var $p=$('<p>'+html+'</p>');
        $li.append($h1).append($p);
        $('#relevantcase .fepastthing-content').append($li);
    }
}
// 视频/照片
function videophoto(teacherId) {
    // 预览主页
    $('.feteacherpersonalcenter-right-head a:contains("预览主页")').attr('href',ROOT+"teacherindex.html?teacherId="+teacherId);
    // 切换 照片/视频列表
    $('.fevideophoto .febox h1').on('click','span',function () {
        if(!$(this).hasClass('active')){
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
            var val='添加'+$(this).html();
            $('.fevideophoto .febox p button').html('<i class="uk-icon-plus-circle"></i>'+val);
            if($(this).html()=='视频'){
                $('.fephotodetail').addClass('fehidden');
                $('.fevediodetail').removeClass('fehidden');
                // $('.fevideophoto>.febox>p>span').html('请将视频控制在1G之内，视频必须为你的原创作品。');
            }else{
                $('.fevediodetail').addClass('fehidden');
                $('.fephotodetail').removeClass('fehidden');
                // $('.fevideophoto>.febox>p>span').html('建议上传本人形象照、上课照片、与学生的合照以及教学环境，有助于让大家更好的了解你！');
            }
        }else{
        }
    });
    //显示视频
    function showvideo() {
        new Vue({
            el: "#showvideo",
            data: {
                videoArr:[],//视频
                showItem:4,//页码显示条数
                allpage:'',//总页数
                current:1//当前页
            },
            filters: {
                addRootFile: function addRootFile(img) {
                    return SERVERROOTFILE + img;
                }
            },
            mounted:function () {
                var _this=this;
                this.$nextTick(function () {
                    _this.getVideo(1);
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
                getVideo:function (pageIndex) {
                    var _this=this;
                    this.$http.post(SERVERROOTDATA + "TeacherResource.ashx?action=getTeacherVideo",
                        {
                            teacherId:teacherId,
                            pageIndex:pageIndex,
                            pageSize:1
                        }
                        ,{emulateJSON: true})
                        .then(function (res) {
                            _this.videoArr = res.body.rows;
                            _this.allpage=res.body.totalPageCount;
                        }).then(function () {
                        $('.fevediodetail').on('click','.fepanel',function () {
                            var vid = $(this).data('vid');
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
                goto: function(index) { //枫叶处理
                    var _this=this;
                    if(index == this.current) return;
                    if(index > this.allpage) {
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
                photoArr:[],//照片
                showItem:4,//页码显示条数
                allpage:'',//总页数
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
                    _this.getPhoto(1);
                })
            },
            methods: {
                getPhoto:function (pageIndex) {
                    var _this=this;
                    this.$http.post(SERVERROOTDATA + "TeacherResource.ashx?action=getTeacherPhoto",
                        {
                            teacherId:teacherId,
                            pageIndex:pageIndex,
                            pageSize:2
                        }
                        ,{emulateJSON: true})
                        .then(function (res) {
                            _this.photoArr = res.body.rows;
                            _this.allpage=res.body.totalPageCount;
                        }).then(function () {
                        $('.fephotodetail ').on('click','.fepanel',function () {
                            showPhoto($(this).find('img'));
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
                    _this.getPhoto(_this.current);
                }
            }
        });
    }
    showvideo();
    showphoto();
}
// 资料上传
function updatedata(teacherId) {
    // 预览主页
    $('.feteacherpersonalcenter-right-head a:contains("预览主页")').attr('href',ROOT+"teacherindex.html?teacherId="+teacherId);
    var type=$(this).getUrlParam("type");
    console.log(type);
    if(type=='文章'){
        $('.feupdatedata .febox h1 span:last-child').addClass('active');
        $('.feupdatedata .febox h1 span:nth-child(2)').removeClass('active');
        var val = '添加文章';
        $('.feupdatedata .febox p button').html('<i class="uk-icon-plus-circle"></i>' + val);
        $('#courseware').addClass('fehidden');
        $('#article').removeClass('fehidden');
    }else{
        $('.feupdatedata .febox h1 span:nth-child(2)').addClass('active');
        $('.feupdatedata .febox h1 span:last-child').removeClass('active');
        var val = '添加课件';
        $('.feupdatedata .febox p button').html('<i class="uk-icon-plus-circle"></i>' + val);
        $('#article').addClass('fehidden');
        $('#courseware').removeClass('fehidden');
    }
    // 切换 课件/文章列表
    $('.feupdatedata .febox h1').on('click', 'span', function () {
        if (!$(this).hasClass('active')) {
            window.location.href =ROOT+"teachercenterupdatedata.html?type="+$(this).html();
        } else {
        }
    });
    //显示课件列表
    function showcourseware() {
        new Vue({
            el: "#courseware",
            data: {
                coursewareArr:[]//课件
            },
            filters: {
                addRootFile: function addRootFile(img) {
                    return SERVERROOTFILE + img;
                }
            },
            mounted:function () {
                var _this=this;
                this.$nextTick(function () {
                    _this.getCourseware();
                })
            },
            methods: {
                getCourseware:function () {
                    var _this=this;
                    this.$http.post(SERVERROOTDATA + "TeacherResource.ashx?action=getTeacherResource",
                        {
                            teacherId:teacherId,
                            resourceType:'courseware',
                            pageIndex:1,
                            pageSize:10
                        }
                        ,{emulateJSON: true})
                        .then(function (res) {
                            console.log(res);

                            _this.coursewareArr = res.body.rows;
                        }).then(function () {
                            var _this=this;
                            $('#courseware .fepanel ul').on('click','li:first-child',function () {
                                window.location.href =ROOT+"updatecourseware.html?studioResourceId="+$(this).parent().data('id');
                            });
                            $('#courseware .fepanel ul').on('click','li:last-child',function () {
                                var _this=this;
                                var studioResourceId=$(_this).parent().data('id');
                                layer.confirm('你确定要删除吗？', {
                                    btn: ['确定','取消'] //按钮
                                }, function(){
                                    $.ajax({
                                        url: SERVERROOTDATA+"TeacherResource.ashx?action=teacherResourceSave",
                                        type: "POST",
                                        data: {saveTag:'delete',studioResourceId:studioResourceId},
                                        success:function (res) {
                                            if(res==200){
                                                layer.msg('删除成功！', {icon: 1});
                                                setTimeout(function () {
                                                    window.location.href =ROOT+"teachercenterupdatedata.html?type=课件";
                                                },1000)
                                            }
                                        }
                                    });
                                }, function(){
                                });
                            });
                    })
                }
            }
        });
    }
    //显示文章列表
    function showarticle() {
        new Vue({
            el: "#article",
            data: {
                articleArr:[]//课件
            },
            filters: {
                addRootFile: function addRootFile(img) {
                    return SERVERROOTFILE + img;
                }
            },
            mounted:function () {
                var _this=this;
                this.$nextTick(function () {
                    _this.getArticle();
                })
            },
            methods: {
                getArticle:function () {
                    var _this=this;
                    this.$http.post(SERVERROOTDATA + "TeacherResource.ashx?action=getTeacherResource",
                        {
                            teacherId:teacherId,
                            resourceType:'article',
                            pageIndex:1,
                            pageSize:10
                        }
                        ,{emulateJSON: true})
                        .then(function (res) {
                            _this.articleArr = res.body.rows;
                        }).then(function () {
                            var _this=this;
                            $('#article .fepanel ul').on('click','li:first-child',function () {
                                window.location.href =ROOT+"updatearticle.html?articleId="+$(this).parent().data('id');
                            });
                            $('#article .fepanel ul').on('click','li:last-child',function () {
                                var _this=this;
                                var articleId=$(_this).parent().data('id');
                                layer.confirm('你确定要删除吗？', {
                                    btn: ['确定','取消'] //按钮
                                }, function(){
                                    $.ajax({
                                        url: SERVERROOTDATA+"Article.ashx?action=articleSave",
                                        type: "POST",
                                        data: {saveTag:'delete',articleId:articleId},
                                        success:function (res) {
                                            if(res==200){
                                                layer.msg('删除成功！', {icon: 1});
                                                setTimeout(function () {
                                                    window.location.href =ROOT+"teachercenterupdatedata.html?type=文章";
                                                },1000)
                                            }
                                        }
                                    });
                                }, function(){
                                });
                            });
                    })
                }
            }
        });
    }
    showcourseware();
    showarticle();
    // 添加课件/文章详情页面显示
    $('.feupdatedata .febox p').on('click','button',function () {
        var text=$('.feupdatedata .febox p button').text();
        if(text=='添加课件'){
            window.location.href =ROOT+"updatecourseware.html";
        }else{
            window.location.href =ROOT+"updatearticle.html";
        }
    });
}
// 添加课件详情
function updatecourseware(teacherId) {
    // 预览主页
    $('.feteacherpersonalcenter-right-head a:contains("预览主页")').attr('href',ROOT+"teacherindex.html?teacherId="+teacherId);
    var studioResourceId=$(this).getUrlParam("studioResourceId");
    console.log(studioResourceId);
    var isEidtCourseWare=false;    //全局变量 判断是否是编辑还是新增
    if(studioResourceId==undefined||studioResourceId=='undefined'||studioResourceId==''){

    }else{
        isEidtCourseWare=true;
        $.ajax({//获取内容
            url: SERVERROOTDATA+"TeacherResource.ashx?action=getTeacherResourceById",
            type: "POST",
            data: {teacherId:teacherId,studioResourceId:studioResourceId},
            success:function (res) {
                var data = JSON.parse(res);
                if(data.length<1){

                }else {
                    console.log(data[0]);
                    $('#updatefile').parent().prev().val(data[0].resourcePath);
                    $('#coursecarename').val(data[0].title);
                    $('#addcoursebg').prev().attr('src',SERVERROOTFILE+data[0].iconPath);
                    $('.feaddcourseware textarea').val(data[0].note);
                }
            }
        });
    }
    // 上传课程封面图片
    $('.feupdatedata').on('change','#addcoursebg',function () {
        if($(this).val().match( /.jpg|.gif|.png|.bmp/i)) {
            var dom = $(this).prev();
            upload(this, dom);
        }else{
            layer.msg("对不起，系统仅支持标准格式的照片，请您调整格式后重新上传，谢谢 !");
        }
        // $(this).val('');
    });
    // 课件上传文件地址
    $('.feaddcourseware').on('change','#updatefile',function () {
        var href=$(this).val();
        $(this).parent().prev().val(href);
    });
    // 添加课件详情
    $('.feaddcourseware').on('click','.febox>h2 a',function () {
        if(!isEmpty($('#updatefile').val())&&!isEidtCourseWare){
            layer.msg('请上传课件文件！');
            return;
        }else{
            if(!isEmpty($('#coursecarename').val())){
                layer.msg('标题不能为空！');
                return;
            }else{
                if(!isEmpty($('#addcoursebg').val())&&!isEidtCourseWare){
                    layer.msg('请上传课件封面图片！');
                    return;
                }else{
                    if(!isEmpty($('#addcourseware textarea').val())){
                        layer.msg('课件简介不能为空！');
                        return;
                    }else{
                        var data = new FormData($('#addcourseware')[0]);
                        var text=$('.feaddcourseware .febox textarea').val();
                        data.append('note',text);
                        data.append('teacherId',teacherId);
                        if(isEidtCourseWare){
                            data.append('saveTag','update');
                            data.append('studioResourceId',studioResourceId);
                        }else{
                            data.append('saveTag','add');
                            data.append('studioResourceId','');
                        }
                        $.ajax({
                            url: SERVERROOTDATA+"TeacherResource.ashx?action=teacherResourceSave",
                            type: "POST",
                            data: data,
                            processData: false,  // 告诉jQuery不要去处理发送的数据
                            contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                            success:function (res) {
                                if(res==200){
                                    layer.msg('保存成功!');
                                    setTimeout(function () {
                                        window.location.href =ROOT+"teachercenterupdatedata.html?type=课件";
                                    },1000);
                                }else{
                                    layer.msg('保存失败!');
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
function updatearticle(teacherId) {
    // 预览主页
    $('.feteacherpersonalcenter-right-head a:contains("预览主页")').attr('href',ROOT+"teacherindex.html?teacherId="+teacherId);
    var articleId=$(this).getUrlParam("articleId");
    console.log(articleId);
    var isEidtArticle=false;    //全局变量 判断是否是编辑还是新增
    if(articleId==undefined||articleId=='undefined'||articleId==''){
        console.log('好好');
    }else{
        isEidtArticle=true;
        $.ajax({//获取内容
            url: SERVERROOTDATA+"Article.ashx?action=getArticleById",
            type: "POST",
            data: {teacherId:teacherId,articleId:articleId},
            success:function (res) {
                var data = JSON.parse(res);
                if(data.length<1){

                }else {
                    console.log(data[0]);
                    $('#title').val(data[0].title);
                    $('#addarticlebg').prev().attr('src',SERVERROOTFILE+data[0].iconPath);
                    $('#addarticle textarea').val(data[0].introduce);
                    UE.getEditor('editor').setContent(data[0].content);
                }
            }
        });
    }
    // 上传文章封面图片
    $('.feupdatedata').on('change','#addarticlebg',function () {
        if($(this).val().match( /.jpg|.gif|.png|.bmp/i)) {
            var dom = $(this).prev();
            upload(this, dom);
        }else{
            layer.msg("对不起，系统仅支持标准格式的照片，请您调整格式后重新上传，谢谢 !");
        }
        // $(this).val('');
    });
    // 添加文章详情
    $('.feaddarticle').on('click','.febox>h2 a',function () {
        if(!isEmpty($('#title').val())){
            layer.msg('标题不能为空！');
            return;
        }else{
            if(!isEmpty($('#addarticlebg').val())&&!isEidtArticle){
                layer.msg('请上传文章封面图片！');
                return;
            }else{
                if(!isEmpty($('#addarticle textarea').val())){
                    layer.msg('文章简介不能为空！');
                    return;
                }else{
                    var data = new FormData($('#addarticle')[0]);
                    var text=$('.feaddarticle .febox textarea').val();
                    data.append('introduce',text);
                    var content=UE.getEditor('editor').getContent();
                    data.append('content',content);
                    data.append('teacherId',teacherId);
                    if(isEidtArticle){
                        data.append('saveTag','update');
                        data.append('articleId',articleId);
                    }else{
                        data.append('saveTag','add');
                        data.append('articleId','');
                    }
                    $.ajax({
                        url: SERVERROOTDATA+"Article.ashx?action=articleSave",
                        type: "POST",
                        data: data,
                        processData: false,  // 告诉jQuery不要去处理发送的数据
                        contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                        success:function (res) {
                            if(res==200){
                                layer.msg('保存成功!');
                                setTimeout(function () {
                                    window.location.href =ROOT+"teachercenterupdatedata.html?type=文章";
                                },1000)
                            }else{
                                layer.msg('保存失败!');
                            }
                        }
                    });
                }
            }
        }
    });
}
// 认证设置
function authsetting(teacherId) {
    // 预览主页
    $('.feteacherpersonalcenter-right-head a:contains("预览主页")').attr('href',ROOT+"teacherindex.html?teacherId="+teacherId);
    // 认证按钮
    $('.feauthsetting .fetitle').on('click','button',function () {
        if(!$(this).parent().hasClass('active')){
            $(this).parent().addClass('active');
            // $(this).parent().next().removeClass('fehidden');
            $(this).parent().next().slideDown(500);
        }else{
            console.log(2222)
        }
    });
    // 身份认证保存按钮
    $('#identity-auth').on('click','a:first-child',function () {
        if(!isEmpty($('#username').val())){
            layer.msg('姓名不能为空！');
            return;
        }else {
            if(!validateIdCard($('#idcard').val())){
                layer.msg('身份证格式不正确！');
                return;
            }else{
                if(!isEmpty($('#handheldphoto').val())){
                    layer.msg('您还未上传图片！');
                    return;
                }else {
                    if(!isEmpty($('#idface').val())){
                        layer.msg('您还未上传图片！');
                        return;
                    }else{
                        var data = new FormData($('#identity-auth')[0]);
                        $.ajax({
                            url: "data/grade.php",
                            type: "POST",
                            data: data,
                            processData: false,  // 告诉jQuery不要去处理发送的数据
                            contentType: false   // 告诉jQuery不要去设置Content-Type请求头
                        });
                    }
                }
            }
        }
    });
    // 教师认证保存按钮
    $('#teacher-auth').on('click','a:first-child',function () {
        if(!isEmpty($('#teachercard').val())){
            layer.msg('您还未上传图片！');
            return;
        }else{
            var data = new FormData($('#teacher-auth')[0]);
            $.ajax({
                url: "data/grade.php",
                type: "POST",
                data: data,
                processData: false,  // 告诉jQuery不要去处理发送的数据
                contentType: false   // 告诉jQuery不要去设置Content-Type请求头
            });
        }
    });
    // 学历认证保存按钮
    $('#education-auth').on('click','a:first-child',function () {
        if(!isEmpty($('#educationcard').val())){
            layer.msg('您还未上传图片!');
            return;
        }else{
            var data = new FormData($('#education-auth')[0]);
            $.ajax({
                url: "data/grade.php",
                type: "POST",
                data: data,
                processData: false,  // 告诉jQuery不要去处理发送的数据
                contentType: false   // 告诉jQuery不要去设置Content-Type请求头
            });
        }
    });
    //专业资质认证保存按钮
    $('#aptitude-auth').on('click','a:first-child',function () {
        if(!isEmpty($('#aptitudecard').val())){
            layer.msg('您还未上传图片！');
            return;
        }else{
            var data = new FormData($('#aptitude-auth')[0]);
            $.ajax({
                url: "data/grade.php",
                type: "POST",
                data: data,
                processData: false,  // 告诉jQuery不要去处理发送的数据
                contentType: false   // 告诉jQuery不要去设置Content-Type请求头
            });
        }
    });
    // 取消按钮
    $('.feauthsetting .feauth h2').on('click','a:last-child',function () {
        $(this).parent().parent().parent().prev().removeClass('active');
        $(this).parent().parent().parent().slideUp(500);
        window.location.reload();
    });
    $('.feupdatephoto').on('change','input',function () {
        if($(this).val().match( /.jpg|.gif|.png|.bmp/i)) {
            var dom=$(this).prev();
            upload(this,dom);
        }else{
            layer.msg("对不起，系统仅支持标准格式的照片，请您调整格式后重新上传，谢谢 !");
        }
        // $(this).val('');
    })
}
// 我的工作室显示页面
function mystudio(teacherId) {
    new Vue({
        el:"#femystudio",
        data:{
            mystudio:[]
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            addStudioDetailRoot: function addStudioDetailRoot(id) {
                return ROOT + "teachercentermystudiodetail.html?teachingStudioId=" + id;
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getstudio();
            })
        },
        methods: {
            getstudio:function () {
                var _this=this;
                this.$http.post(SERVERROOTDATA + "TeachingStudio.ashx?action=showTeachingStudioByTeacherId",
                    {
                        teacherId:teacherId
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.mystudio = res.body;
                    })
            }
        }
    })
}
// 创建工作室
function createstudio(teacherId) {
    new Vue({
        el:"#fecreatestudio",
        data:{
            city:[],
            educationalLevel:[],
            grade:[]
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            addStudioRoot: function addStudioRoot(id) {
                return ROOT + "teacherstudio.html?teachingStudioId=" + id;
            },
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getcity();
                _this.geteducationalLevel();
                _this.getgrade();
            })
        },
        methods: {
            getcity:function () {
                var _this=this;
                this.$http.post(SERVERROOTDATA + "City.ashx?action=getCity",
                    {
                        provinceId:1
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.city = res.body;
                    })
            },
            geteducationalLevel:function () {
                var _this=this;
                this.$http.post(SERVERROOTDATA + "EducationalLevel.ashx?action=getEducationalLevel",
                    {
                        organId:0
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.educationalLevel = res.body;
                    }).then(function () {
                        var _this=this;
                        $('#period').on('change',function () {
                            _this.$http.post(SERVERROOTDATA + "Subject.ashx?action=getSubject",
                                {
                                    educationalLevelId:$('#period').val(),
                                    gradeId:''
                                }
                                ,{emulateJSON: true})
                                .then(function (res) {
                                    _this.grade = res.body;
                                })
                        })


                })
            },
            getgrade:function () {
                var _this=this;
                this.$http.post(SERVERROOTDATA + "Subject.ashx?action=getSubject",
                    {
                        educationalLevelId:$('#period').val(),
                        gradeId:''
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.grade = res.body;
                    })
            }
        }
    })
    // 更换工作室头像预览
    $('.fecreatestudio').on('change','#addphoto',function () {
        if($(this).val().match( /.jpg|.gif|.png|.bmp/i)) {
            var dom=$(this).prev();
            upload(this,dom);
        }else {
            layer.msg("对不起，系统仅支持标准格式的照片，请您调整格式后重新上传，谢谢 !");
        }
        // $(this).val('');
        console.log(777);
    });
    $('.fecreatestudio>p').on('click', 'a',function () {
        if(!isEmpty($('#addphoto').val())){
            layer.msg('请添加工作室封面！');
            return;
        }else{
            if(!isEmpty($('#studioname').val())){
                layer.msg('工作室名称不能为空！');
                return;
            }else {
                var data = new FormData($('#createstudio-form')[0]);
                data.append('saveTag','add');
                data.append('teacherId',teacherId);
                $.ajax({
                    url: SERVERROOTDATA+"TeachingStudio.ashx?action=teachingStudioSave",
                    type: "POST",
                    data: data,
                    processData: false,  // 告诉jQuery不要去处理发送的数据
                    contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                    success:function (res) {
                        if(res==200){
                            layer.msg("保存成功！");
                            setTimeout(function () {
                                window.location.href =ROOT+"teachercentermystudio.html";
                            },1000)
                        }
                    }
                });
            }
        }

    })
}
// 我的工作室详细页面
function mystudiodetail(teacherId,teachingStudioId) {
    $('.femystudiodetail ul li').on('click','span',function () {
        $(this).parent().siblings().find('span').removeClass('active');
        $(this).addClass('active');
        var id=$(this).data('id');
        var showdom=$('.femystudiodetail .fecontent>div:nth-child('+id+')');
        // console.log(showdom);
        showdom.fadeIn(1000);
        showdom.siblings().hide();
    });
    // 资讯显示
    new Vue({
        el:"#feinformation",
        data:{
            information:[]
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            addStudioRoot: function addStudioRoot(id) {
                return ROOT + "teacherstudio.html?teachingStudioId=" + id;
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getinformation();
            })
        },
        methods: {
            getinformation:function () {
                var _this=this;
                this.$http.post(SERVERROOTDATA + "News.ashx?action=getTeachingStudioNews",
                    {
                        teachingStudioId:teachingStudioId,
                        pageIndex:1,
                        pageSize:10
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.information = res.body.rows;
                    })
            }
        }
    });
    // 公告显示
    new Vue({
        el:"#feannouncement",
        data:{
            notice:[]
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            }
            // addStudioRoot: function addStudioRoot(id) {
            //     return ROOT + "teacherstudio.html?teachingStudioId=" + id;
            // }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getnotice();
            })
        },
        methods: {
            getnotice:function () {
                var _this=this;
                this.$http.post(SERVERROOTDATA + "Activity.ashx?action=getStudioActivity",
                    {
                        teachingStudioId:teachingStudioId,
                        pageIndex:1,
                        pageSize:10
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.notice = res.body.rows;
                    })
            }
        }
    });
    // 成员显示
    new Vue({
        el:"#femymenber",
        data:{
            menber:[]
        },
        filters: {
            addRootFile: function addRootFile(img) {
                return SERVERROOTFILE + img;
            },
            addStudioRoot: function addStudioRoot(id) {
                return ROOT + "teacherstudio.html?teachingStudioId=" + id;
            }
        },
        mounted:function () {
            var _this=this;
            this.$nextTick(function () {
                _this.getmenber();
            })
        },
        methods: {
            getmenber:function () {
                var _this=this;
                this.$http.post(SERVERROOTDATA + "TeachingStudio.ashx?action=getStudioMember",
                    {
                        teachingStudioId:teachingStudioId,
                        pageIndex:1,
                        pageSize:10
                    }
                    ,{emulateJSON: true})
                    .then(function (res) {
                        _this.menber = res.body.rows;
                    })
            }
        }
    });
    // 基本信息-编辑按钮
    $('.femystudiodetail').on('click','.febasicinformation>button',function () {
        if(!$(this).hasClass('fehidden')){
            $('.febasicinformation .fepanel s').addClass('fehidden');
            // $('.febasicinformation .fepanel>img').addClass('fehidden');
            $('.febasicinformation>button').addClass('fehidden');
            $('.febasicinformation .fepanel select').removeClass('fehidden');
            $('.febasicinformation .fepanel .feimage input').prop('disabled','');
            // $('.febasicinformation .fepanel .feimage').removeClass('fehidden');
            $('.febasicinformation .fepanel b').removeClass('fehidden');
            $('.febasicinformation .fepanel>input').prop('disabled','');
            $('.febasicinformation p').removeClass('fehidden');
        }
    })
    // 基本信息-保存按钮
    $('.femystudiodetail .febasicinformation>p').on('click','button',function () {
        var data = new FormData($('#basicinformation')[0]);
        $.ajax({
            url: "data/grade.php",
            type: "POST",
            data: data,
            processData: false,  // 告诉jQuery不要去处理发送的数据
            contentType: false   // 告诉jQuery不要去设置Content-Type请求头
        });
        var address=$('.febasicinformation #address option:selected').text();
        $('.febasicinformation #address').prev().html(address);
        var period=$('.febasicinformation #period option:selected').text();
        $('.febasicinformation #period').prev().html(period);
        var subject=$('.febasicinformation #subject option:selected').text();
        $('.febasicinformation #subject').prev().html(subject);
        $('.febasicinformation .fepanel s').removeClass('fehidden');
        // $('.febasicinformation .fepanel>img').removeClass('fehidden');
        $('.febasicinformation>button').removeClass('fehidden');
        $('.febasicinformation .fepanel select').addClass('fehidden');
        // $('.febasicinformation .fepanel .feimage').addClass('fehidden');
        $('.febasicinformation .fepanel .feimage input').prop('disabled','true');
        $('.febasicinformation .fepanel b').addClass('fehidden');
        $('.febasicinformation .fepanel>input').prop('disabled','true');
        $('.febasicinformation p').addClass('fehidden');
    });
    // 更换工作室头像预览
    $('.febasicinformation').on('change','.feimage input',function () {
        if($(this).val().match( /.jpg|.gif|.png|.bmp/i)) {
            var dom = $(this).prev();
            upload(this, dom);
            // $(this).val('');
        }else {
            layer.msg("对不起，系统仅支持标准格式的照片，请您调整格式后重新上传，谢谢 !");
        }
        console.log(777);
    })
    // 公告
    $('.feannouncement-content').on('click','.fetitle',function () {
        var text=$(this).html();
        var p='公告正文公告正文公告正文公告正文公告正文公告正文公告正文公告文公告正文公告正文公告正文公告正文公告正文公告正文公告正文公告正文公告正文公告正文公告正文公告正文公告正文公告正文公告正文公告正文公告正文公告正文公告正文公告正文' +
            '公告正文公告正文公告正文公告正文公告正文公告正文公告正文公告正文公告正文公告正正文公告正文公告正文公告正文公告正文公告正文公告正文';
        var teacher=$(this).parent().find('.fepublisher').html();
        var time=$(this).parent().find('.fetime').html();
        popbox(text,p,teacher,time);
    })
    // 添加资讯
    $('.feconsultation').on('click','.feaddconsultation',function () {
        layer.open({
            type: 2,
            title: '添加工作室资讯',
            shadeClose: true,
            shade: false,
            maxmin: true, //开启最大化最小化按钮
            area: ['1100px', '700px'],
            content: 'addstudioinformation.html'
        });
    })
    // 添加公告
    $('.feannouncement>p').on('click','button',function () {
        layer.open({
            type: 2,
            title: '添加工作室公告',
            shadeClose: true,
            shade: false,
            maxmin: true, //开启最大化最小化按钮
            area: ['1100px', '700px'],
            content: 'addnotice.html'
        });
    })
}

// 公告弹框   clock-o user file-text-o
function popbox(text,p,teacher,time) {//text 标题 p为内容
    var pop=$('<div class="pop"></div>');
    var panel=$('<div class="pop-panel"></div>');
    var title = $('<h2 class="title"><i class="uk-icon-file-text-o"></i>公告标题 : '+ text +'</h2>');
    var close = $('<s>×</s>');
    close.on('click', function () {
        pop.remove();
    });
    var content=$('<div class="content"><h3>公告内容 :</h3><p>'+ p +'</p></div>');
    var publisher=$('<div class="publisher"><span><i class="uk-icon-user"></i>发布人 : '+ teacher +'</span>'+
        '<span><i class="uk-icon-clock-o"></i>发表时间 : '+ time +'</span></div>')
    title.append(close);
    panel.append(title);
    panel.append(content);
    panel.append(publisher);
    pop.append(panel);
    $('body').append(pop);
}
// 添加工作室资讯弹窗
function addstudioinformation() {
    // 更换资讯预览
    $('.feaddstudioinformation').on('change','#information-photo',function () {
        if($(this).val().match( /.jpg|.gif|.png|.bmp/i)) {
            var dom = $(this).prev();
            upload(this, dom);
            // $(this).val('');
        }else {
            layer.msg("对不起，系统仅支持标准格式的照片，请您调整格式后重新上传，谢谢 !");
        }
        console.log(777);
    })
}
