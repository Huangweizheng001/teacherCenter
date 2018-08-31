<%@ WebHandler Language="C#" Class="fjEducation.ashx.teacherCenter" %>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using System.Text.RegularExpressions;

namespace fjEducation.ashx
{
    /// <summary>
    /// 摘要说明
    /// </summary>
    public class teacherCenter : BasicHandler
    {

        public override void ProcessRequest(HttpContext context)
        {
            base.ProcessRequest(context);
              
            try
            { 
                switch (action){
                    case "getTeacher":
                        sHtml = getTeacher(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "getTeacher_web":
                        sHtml = getTeacher(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "getTeacherRz":
                        sHtml = getTeacherRz(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "getTeacherMore":
                        sHtml = getTeacherMore(context);
                        sHtml = sHtml.Replace("\r\t", "\\r\\t");
                        sHtml = sHtml.Replace("\r\n", "\\r\\n");
                        sHtml = sHtml.Replace("	", "");
                        sHtml = sHtml.Replace("\n", "\\n"); 
                        sHtml = sHtml.Replace("\r", "\\r");
                        break;
                    case "getTeachingProcessByTeacherId":
                        sHtml = getTeachingProcessByTeacherId(context);
                        sHtml = sHtml.Replace("\r\t", "\\r\\t");
                        sHtml = sHtml.Replace("\r\n", "\\r\\n");
                        sHtml = sHtml.Replace("	", "");
                        sHtml = sHtml.Replace("\n", "\\n"); 
                        sHtml = sHtml.Replace("\r", "\\r");
                        break;
                    case "getTeacherProve":
                        sHtml = getTeacherProve(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "getIntoStuodio":
                        sHtml = getIntoStuodio(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "showEducationalList":
                        sHtml = showEducationalList(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "getStudioTeacherRs"://ok 
                        sHtml = getStudioTeacherRs(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "getStudioTeacherRsToMe"://ok 
                        sHtml = getStudioTeacherRsToMe(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "getQuestionType":
                        sHtml = getQuestionType(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "getNewsQuestionType":
                        sHtml = getNewsQuestionType(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "getEvaluationNum"://ok 
                        sHtml = getEvaluationNum(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "getTeacherCourse":
                        sHtml = getTeacherCourse(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "getMicroLecture":
                        sHtml = getMicroLecture(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "getTeacherSetWork":
                        sHtml = getTeacherSetWork(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "getTeacherQuestionBankSketch":
                        sHtml = getTeacherQuestionBankSketch(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "homeworkSave":
                        sHtml = homeworkSave(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "homeworkSaveNew":
                        sHtml = homeworkSaveNew(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "homeworkSaveNewForTeacher":
                        sHtml = homeworkSaveNewForTeacher(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "getTeacherCourseCatalog":
                        sHtml = getTeacherCourseCatalog(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "getSystemNoticeList":
                        sHtml = getSystemNoticeList(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "getTeacherKnowledge":
                        sHtml = getTeacherKnowledge(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "getSystemKnowledge":
                        sHtml = getSystemKnowledge(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "getStudentRepondList":
                        sHtml = getStudentRepondList(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "updateUserPassword":
                        sHtml = updateUserPassword(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "retrievalUserPassword":
                        sHtml = retrievalUserPassword(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "getEvaluationToMe"://ok 
                        sHtml = getEvaluationToMe(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "getEvaluationDetail"://ok 
                        sHtml = getEvaluationDetail(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "getOrderList":
                        sHtml = getOrderList(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "getParentsMeeting":
                        sHtml = getParentsMeeting(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "getTeacherCourseDetail":
                        sHtml = getTeacherCourseDetail(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "getTeacherCourseDetailById":
                        sHtml = getTeacherCourseDetailById(context);
                        sHtml = sHtml.Replace("\r\t", "\\r\\t");
                        sHtml = sHtml.Replace("\r\n", "\\r\\n");
                        sHtml = sHtml.Replace("	", "");
                        sHtml = sHtml.Replace("\n", "\\n"); 
                        sHtml = sHtml.Replace("\r", "\\r");
                        break;
                    case "getMicroLectureDetailById":
                        sHtml = getMicroLectureDetailById(context);
                        sHtml = sHtml.Replace("\r\t", "\\r\\t");
                        sHtml = sHtml.Replace("\r\n", "\\r\\n");
                        sHtml = sHtml.Replace("	", "");
                        sHtml = sHtml.Replace("\n", "\\n");
                        sHtml = sHtml.Replace("\r", "\\r");
                        break;
                    case "teacherBasicInfoSave":
                        sHtml = teacherBasicInfoSave(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "teacherRemindWork":
                        sHtml = teacherRemindWork(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "teacherContactInfoSave":
                        sHtml = teacherContactInfoSave(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "teacherBackgroundInfoSave"://教师背景信息保存
                        sHtml = teacherBackgroundInfoSave(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "SaveTeacherHead":
                        sHtml = SaveTeacherHead(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "saveTeacherPhoto":
                        sHtml = saveTeacherPhoto(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "teachingProcessInfoSave"://
                        sHtml = teachingProcessInfoSave(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "ChannelProgramSave"://
                        sHtml = ChannelProgramSave(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "teacheridCardPhotoSave"://
                        sHtml = teacheridCardPhotoSave(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "teacherCertificationSave"://
                        sHtml = teacherCertificationSave(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "updateUserMobile":
                        sHtml = updateUserMobile(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "teacherEducationSave"://
                        sHtml = teacherEducationSave(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "teacherCapabilitySave"://
                        sHtml = teacherCapabilitySave(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "teacherCourseSave"://
                        sHtml = teacherCourseSave(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "studentQuestionReplySave"://ok 
                        sHtml = studentQuestionReplySave(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "deleteTeacherCourse"://
                        sHtml = deleteTeacherCourse(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "deleteTeacherLecture"://
                        sHtml = deleteTeacherLecture(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "updateQuestionState"://ok 
                        sHtml = updateQuestionState(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "updateSystemNoticeState"://ok 
                        sHtml = updateSystemNoticeState(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "getOrderRecordCourse":
                        sHtml = getOrderRecordCourse(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "getNewsQuestionNum":
                        sHtml = getNewsQuestionNum(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "updateStudioTeacherRsState"://ok 
                        sHtml = updateStudioTeacherRsState(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "QuestionSave"://
                        sHtml = QuestionSave(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "TeacherCourseCatalog"://
                        sHtml = TeacherCourseCatalog(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "updateEvaluationState"://ok 
                        sHtml = updateEvaluationState(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "getOrderLiveCourse":
                        sHtml = getOrderLiveCourse(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "getTeacherPhoto":
                        sHtml = getTeacherPhoto(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "getStudentQuestion":
                        sHtml = getStudentQuestion(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "getTeacherSoldList":
                        sHtml = getTeacherSoldList(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "getQuestionList":
                        sHtml = getQuestionList(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break; 
                    case "getTeacherClass":
                        sHtml = getTeacherClass(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "getClassStudent":
                        sHtml = getClassStudent(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "getTeacherVideo":
                        sHtml = getTeacherVideo(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "getTeacherResource":
                        sHtml = getTeacherResource(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "teacherResourceSave":
                        sHtml = teacherResourceSave(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "ClassStudentDelete":
                        sHtml = ClassStudentDelete(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "articleSave":
                        sHtml = articleSave(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "evaluation":
                        sHtml = evaluation(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "getTeacherCatalogDetail":
                        sHtml = getTeacherCatalogDetail(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "getArticleById":
                        sHtml = getArticleById(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "getTeacherResourceById":
                        sHtml = getTeacherResourceById(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break; //
                    case "getStudioNewById":
                        sHtml = getStudioNewById(context);
                        sHtml = sHtml.Replace("\r\t", "\\r\\t");
                        sHtml = sHtml.Replace("\r\n", "\\r\\n");
                        sHtml = sHtml.Replace("	", "");
                        sHtml = sHtml.Replace("\n", "\\n"); 
                        sHtml = sHtml.Replace("\r", "\\r");
                        break; //
                    case "getTeachingStudio":
                        sHtml = getTeachingStudio(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break; //
                    case "showTeachingStudioByTeacherId":
                        sHtml = showTeachingStudioByTeacherId(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "getQuestionReply":
                        sHtml = getQuestionReply(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "getQuestionReplyList":
                        sHtml = getQuestionReplyList(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "teachingStudioSave":
                        sHtml = teachingStudioSave(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "TeacherClassSave":
                        sHtml = TeacherClassSave(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "outSideStuodio":
                        sHtml = outSideStuodio(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "studioNewsSave":
                        sHtml = studioNewsSave(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "getQuestionNum"://ok 
                        sHtml = getQuestionNum(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "saveTeacher":
                        sHtml = saveTeacher(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "saveTeacherCenter":
                        sHtml = saveTeacherCenter(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "formDataUpload":
                        sHtml = formDataUpload(context);
                        break;
                    case "formDataUploadNew":
                        sHtml = formDataUploadNew(context);
                        break;
                    case "getDynum":
                        sHtml = getDynum(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break; //
                    case "showTeacherGradeList":
                        sHtml = showTeacherGradeList(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "showEducationalLevelList":
                        sHtml = showEducationalLevelList(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "showClassList":
                        sHtml = showClassList(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "showGradeList": 
                        sHtml = showGradeList(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "showSubjectList":
                        sHtml = showSubjectList(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "showProvinceList":
                        sHtml = showProvinceList(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "showCityList":
                        sHtml = showCityList(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "showDistrictList":
                        sHtml = showDistrictList(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "showOrganList":
                        sHtml = showOrganList(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "showOrganListByCity":
                        sHtml = showOrganListByCity(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "showClassListByOrgan":
                        sHtml = showClassListByOrgan(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "showSelectCityList":
                        sHtml = showSelectCityList(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "showSelectDistrictList":
                        sHtml = showSelectDistrictList(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "updateTeacherState":
                        sHtml = updateTeacherState(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                    case "saveStudioTeacherRs":
                        sHtml = saveStudioTeacherRs(context);
                        sHtml = sHtml.Replace("\r", "").Replace("\n", "");
                        break;
                        
                }
                LogOper.writeLog("action:" + action + " " + sHtml);
            }catch(Exception ex)
            {
                sHtml = ex.ToString();
            } 
            HttpContext.Current.Response.Write(sHtml); 
        }
        private string getTeacherMore(HttpContext context)
        {
            string result = "";
            HttpRequest request = HttpContext.Current.Request;
            System.Web.SessionState.HttpSessionState session = context.Session;
            if (session["userId"] != null)
            {
                try
                {
                    StringBuilder sql = new StringBuilder();
                    sql.Append("select teacherId,educationalLevelId,organId,deptId,gradeId,subjectId,teacherGrade,teacherGradeId,name,nickName,password,sex,birthDay,mobile,email,provinceId,cityId,districtId,address,iconPath,mobileIconPath,note,ofSchoolAge,registerType,certificationIconPath,idCard,idPhoto,educationalLevelPhoto,handHoldPhoto,capabilityPhoto,organ,educationalLevel,subject,grade,introduce,autograph,organType,typeName from v_teacher where adminId = " + session["userId"]);

                    DataTable dtPage = SqlHelper.GetTable(sql.ToString());

                    result = JSonHelper.DataTableToJsonData(dtPage, true, Convert.ToInt32(dtPage.Rows.Count));
                }
                catch
                {
                    result = "Error";
                }
            }
            else
            {
                session["userId"] = HttpContext.Current.Request.Cookies["userId"].Value;
                if (session["userId"] == null)
                {
                    result = "go_login";
                }
            }
            return result;
        }
        private string getTeachingStudio(HttpContext context)
        {
            string result = "";
            HttpRequest request = HttpContext.Current.Request;
            System.Web.SessionState.HttpSessionState session = context.Session;
            if (session["userId"] != null)
            {
                try
                {
                    StringBuilder sql = new StringBuilder();
                    sql.Append("select * from v_teacherStudio where organId = " + request["organId"]);

                    DataTable dtPage = SqlHelper.GetTable(sql.ToString());

                    result = JSonHelper.DataTableToJsonData(dtPage, true, Convert.ToInt32(dtPage.Rows.Count));
                }
                catch
                {
                    result = "Error";
                }
            }
            else
            {
                result = "go_login";
            }
            return result;
        }
        private string getIntoStuodio(HttpContext context)
        {
            string result = "";
            HttpRequest request = HttpContext.Current.Request;
            System.Web.SessionState.HttpSessionState session = context.Session;
            if (session["userId"] != null)
            {
                try
                {
                    StringBuilder sql = new StringBuilder();
                    //sql.Append("select * from v_studioTeacherRs where teacherId <> (select teacherId from fe_teacher where adminId = " + session["userId"] + ") and adminId = " + session["userId"]);
                    sql.Append("select * from v_studioTeacherRs where inserter <> (select teacherId from fe_teacher where adminId = " + session["userId"] + ") and adminId = " + session["userId"]);
                    sql.Append(" and auditState = 1");
                    DataTable dtPage = SqlHelper.GetTable(sql.ToString());

                    result = JSonHelper.DataTableToJsonData(dtPage, true, Convert.ToInt32(dtPage.Rows.Count));
                }
                catch
                {
                    result = "Error";
                }
            }
            else
            {
                result = "go_login";
            }
            return result;
        }
        private string getTeacher(HttpContext context)
        {
            string result = "";
            HttpRequest request = HttpContext.Current.Request;
            System.Web.SessionState.HttpSessionState session = context.Session;
            if (session["userId"] != null)
            {
                try
                {
                    StringBuilder sql = new StringBuilder();
                    sql.Append("select iconPath,name,teacherId,auditState,(select count(1) from [dbo].[fe_teacher] where certificationIconPath is not null and idPhoto is not null and auditState = 1 and adminId = " + session["userId"] + ") as rz from fe_teacher where adminId = " + session["userId"]);

                    DataTable dtPage = SqlHelper.GetTable(sql.ToString());

                    result = JSonHelper.DataTableToJsonData(dtPage, true, Convert.ToInt32(dtPage.Rows.Count));
                }
                catch
                {
                    result = "Error";
                }
            }
            else 
            {
                session["userId"] = HttpContext.Current.Request.Cookies["userId"].Value;
                if (session["userId"] == null)
                {
                    result = "go_login";
                }
            }
            return result;
        }
        private string getTeacher_web(HttpContext context)
        {
            string result = "";
            HttpRequest request = HttpContext.Current.Request;
            System.Web.SessionState.HttpSessionState session = context.Session;
            try
            {
                StringBuilder sql = new StringBuilder();
                sql.Append("select iconPath,name,teacherId,auditState,(select count(1) from [dbo].[fe_teacher] where certificationIconPath is not null and idPhoto is not null and auditState = 1 and teacherId = " + request["teacherId"] + ") as rz from fe_teacher where teacherId = " + request["teacherId"]);

                DataTable dtPage = SqlHelper.GetTable(sql.ToString());

                result = JSonHelper.DataTableToJsonData(dtPage, true, Convert.ToInt32(dtPage.Rows.Count));
            }
            catch
            {
                result = "Error";
            }
            return result;
        }
        private string getTeacherRz(HttpContext context)
        {
            string result = "";
            HttpRequest request = HttpContext.Current.Request;
            System.Web.SessionState.HttpSessionState session = context.Session;
            if (session["userId"] != null)
            {
                try
                {
                    StringBuilder sql = new StringBuilder();
                    sql.Append("select count(1) as rz from [dbo].[fe_teacher] where certificationIconPath is not null and idPhoto is not null and auditState = 1 and adminId = " + session["userId"]);

                    DataTable dtPage = SqlHelper.GetTable(sql.ToString());

                    result = JSonHelper.DataTableToJsonData(dtPage, true, Convert.ToInt32(dtPage.Rows.Count));
                }
                catch
                {
                    result = "Error";
                }
            }
            else
            {
                session["userId"] = HttpContext.Current.Request.Cookies["userId"].Value;
                if (session["userId"] == null)
                {
                    result = "go_login";
                }
            }
            return result;
        }
        private string getTeacherCourse(HttpContext context)
        {
            string result = "";
            HttpRequest request = HttpContext.Current.Request;
            System.Web.SessionState.HttpSessionState session = context.Session;
            if (session["userId"] != null)
            {
                try
                {
                    StringBuilder sql = new StringBuilder();
                    sql.Append("select *,(case when auditState = 1 then '已审核' else '未审核' end)as states from fe_course where teacherId = (select teacherId from fe_teacher where adminId =" + session["userId"] + ")");

                    DataTable dtPage = SqlHelper.GetTable(sql.ToString());

                    result = JSonHelper.DataTableToJsonData(dtPage, true, Convert.ToInt32(dtPage.Rows.Count));
                }
                catch
                {
                    result = "Error";
                }
            }
            else
            {
                result = "go_login";
            }
            return result;
        }
        private string getMicroLecture(HttpContext context)
        {
            string result = "";
            HttpRequest request = HttpContext.Current.Request;
            System.Web.SessionState.HttpSessionState session = context.Session;
            if (session["userId"] != null)
            {
                try
                {
                    StringBuilder sql = new StringBuilder();
                    sql.Append("select *,(case when auditState = 1 then '已审核' else '未审核' end)as states from fe_microLecture where teacherId = (select teacherId from fe_teacher where adminId =" + session["userId"] + ")");

                    DataTable dtPage = SqlHelper.GetTable(sql.ToString());

                    result = JSonHelper.DataTableToJsonData(dtPage, true, Convert.ToInt32(dtPage.Rows.Count));
                }
                catch
                {
                    result = "Error";
                }
            }
            else
            {
                result = "go_login";
            }
            return result;
        }
        private string getParentsMeeting(HttpContext context)
        {
            string result = "";
            HttpRequest request = context.Request;
            System.Web.SessionState.HttpSessionState session = context.Session;
            try
            {
                if (session["userId"] != null)
                {
                    StringBuilder sqls = new StringBuilder();
                    sqls.Append("select teacherId from fe_teacher where adminId = " + session["userId"]);
                    DataTable dtt = SqlHelper.GetTable(sqls.ToString());
                    string teacherId = "0";
                    if (dtt.Rows.Count > 0)
                    {
                        teacherId = dtt.Rows[0][0].ToString();
                    }

                    string pageIndexs = request["pageIndex"];
                    string pageSizes = request["pageSize"];
                    int.TryParse(pageSizes, out pageSize);
                    int.TryParse(pageIndexs, out pageIndex);
                    if (pageSize <= 0)
                        pageSize = 5;
                    if (pageIndex <= 0)
                        pageIndex = 1;

                    string ssql = "select row_number() over(order by channelProgramId desc) as rownum,* from [dbo].[fun_getChannelMeetingList] (" + teacherId + ")";

                    string countSql = "select rownum from (" + ssql + ") c ";
                    DataTable dtCount = SqlHelper.GetTable(countSql);
                    string allSql = "select * from(" + ssql + " ) c where rownum >(" + (pageIndex - 1) * pageSize + ") AND rownum <=(" + pageIndex * pageSize + ") order by rownum desc ";
                    DataTable dtPage = SqlHelper.GetTable(allSql);//获取分页的数据源
                    int pageCount = (int)(Math.Ceiling(dtCount.Rows.Count * 1.0 / pageSize));
                    result = JSonHelper.DataTableToJsonData(dtPage, true, pageCount, dtCount.Rows.Count);
                    
                }
                else
                {
                    result = "go_login";
                }
            }
            catch
            {
                 
            }
            return result;
        }
        private string getOrderList(HttpContext context)
        {
            string result = "";
            try
            {
                HttpRequest request = context.Request;
                System.Web.SessionState.HttpSessionState session = context.Session;
                StringBuilder sqls = new StringBuilder();
                sqls.Append("select teacherId from fe_teacher where adminId = " + session["userId"]);
                DataTable dtt = SqlHelper.GetTable(sqls.ToString());
                string teacherId = "0";
                if (dtt.Rows.Count > 0)
                {
                    teacherId = dtt.Rows[0][0].ToString();
                }
                string userId = teacherId;
                string userTypes = "teacher";//request["userType"];
                string period = request["period"];
                string recordType = request["recordType"];
                string payState = request["payState"];
                string sWhere = "";
                userTypes = getUserTypeIndex(userTypes);
                int userType = getAppropriateId(userTypes);

                string pageIndexs = request["pageIndex"];
                string pageSizes = request["pageSize"];
                pageIndex = getAppropriateId(pageIndexs);
                pageSize = getAppropriateId(pageSizes, true);
                if (pageSize == 0)
                    pageSize = 10;
                switch (recordType)
                {
                    case "1":
                    case "录播":
                        sWhere += " and c.recordType=0 ";
                        break;
                    case "2":
                    case "直播":
                        sWhere += " and c.recordType=1 ";
                        break;
                }
                switch (payState)
                {
                    case "未支付":
                    case "1":
                        sWhere += " and isnull(o.isSold,0)=0 ";
                        break;
                    case "已支付":
                    case "2":
                        sWhere += " and isnull(o.isSold,0)=1 ";
                        break;
                }
                switch (period)
                {
                    case "近一年":
                    case "1":
                        sWhere += " and datediff(year,o.orderTime,getdate()) <= 1 "; //salesTime
                        break;
                    case "近三个月":
                    case "2":
                        sWhere += " and datediff(month,o.orderTime,getdate()) <= 3  ";
                        break;
                }
                StringBuilder sb = new StringBuilder();
                sb.Append("select row_number() over(order by od.orderDetailId desc) as rownum,  o.orderId,o.orderNumber,c.name courseName,c.courseId,c.iconPath,case c.recordType when 0 then '录播' when 1 then '直播' end recordType,convert(varchar(10),orderTime,120) orderTime,od.TotalPrice, ");
                sb.Append(" od.preferentialPrice,od.orderDetailId, case isSold when 0 then '未支付' when 1 then '已支付' else '未支付' end payState from fe_order o inner join fe_orderDetail od ");
                sb.Append(" on o.orderId = od.orderId and o.orderType=0 inner join fe_course c on od.goodsId = c.courseId where o.orderPersonType =" + userType);
                sb.Append(" and o.orderPersonId=" + userId + sWhere);
                string ssql = sb.ToString();

                string countSql = "select orderDetailId from (" + ssql + ") c ";
                DataTable dtCount = SqlHelper.GetTable(countSql);
                string allSql = "select * from(" + ssql + " ) c where rownum >(" + (pageIndex - 1) * pageSize + ") AND rownum <=(" + pageIndex * pageSize + ") order by rownum asc ";
                DataTable dtPage = SqlHelper.GetTable(allSql);//获取分页的数据源
                pageCount = (int)(Math.Ceiling(dtCount.Rows.Count * 1.0 / pageSize));
                result = JSonHelper.DataTableToJsonData(dtPage, true, pageCount, dtCount.Rows.Count);
            }
            catch (Exception ex)
            {
            }
            return result;
        } 
        
        /// <summary>
        /// 获取该老师的已售的订单列表
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        private string getTeacherSoldList(HttpContext context)
        {
            string result = "";
            try
            {
                HttpRequest request = context.Request;
                System.Web.SessionState.HttpSessionState session = context.Session;
                StringBuilder sqls = new StringBuilder();
                if (session["userId"] != null)
                {
                    sqls.Append("select teacherId from fe_teacher where adminId = " + session["userId"]);
                    DataTable dtt = SqlHelper.GetTable(sqls.ToString());
                    string teacherId = "0";
                    if (dtt.Rows.Count > 0)
                    {
                        teacherId = dtt.Rows[0][0].ToString();
                    }
                    string userId = teacherId;
                    string userTypes = "teacher";//request["userType"];

                    string sWhere = " "; //sWhere = " and o.isSold = 1 "
                    userTypes = getUserTypeIndex(userTypes);
                    int userType = getAppropriateId(userTypes);
                    string courseId = request["courseId"];
                    if (action == "getTeacherSoldDetail")
                        sWhere += " and c.courseId='" + courseId + "' ";

                    string pageIndexs = request["pageIndex"];
                    string pageSizes = request["pageSize"];
                    int.TryParse(pageSizes, out pageSize);
                    int.TryParse(pageIndexs, out pageIndex);
                    if (pageSize <= 0)
                        pageSize = 3;
                    if (pageIndex <= 0)
                        pageIndex = 1;

                    StringBuilder sb = new StringBuilder();
                    sb.Append("select row_number() over(order by od.orderDetailId desc) as rownum, o.orderId,o.orderNumber,c.name courseName,c.iconPath,case c.recordType when 0 then '录播' when 1 then '直播' end recordType,convert(varchar(10),orderTime,120) orderTime, ");
                    sb.Append(" od.quantity,od.totalPrice, od.preferentialTotalPrice,od.orderDetailId,v.userId purchaserId,v.userName purchaser, case isSold when 0 then '未支付' when 1 then '已支付' else '未支付' end payState from fe_order o inner join fe_orderDetail od ");
                    sb.Append(" on o.orderId = od.orderId and o.orderType=0 inner join fe_course c on od.goodsId = c.courseId inner join v_user v on o.orderPersonId = v.userId and o.orderPersonType = v.userKind where c.teacherId ='" + userId + "' ");
                    sb.Append(sWhere);
                    string ssql = sb.ToString();

                    string countSql = "select orderDetailId from (" + ssql + ") c ";
                    DataTable dtCount = SqlHelper.GetTable(countSql);
                    string allSql = "select * from(" + ssql + " ) c where rownum >(" + (pageIndex - 1) * pageSize + ") AND rownum <=(" + pageIndex * pageSize + ") order by rownum asc ";
                    DataTable dtPage = SqlHelper.GetTable(allSql);//获取分页的数据源
                    pageCount = (int)(Math.Ceiling(dtCount.Rows.Count * 1.0 / pageSize));
                    result = JSonHelper.DataTableToJsonData(dtPage, true, pageCount, dtCount.Rows.Count);
                }
                else 
                {
                    result = "go_login";
                }
                
            }
            catch (Exception ex)
            {
            }
            return result;
        }
        private string getQuestionList(HttpContext context)
        {
            string result = "[{}]";
            HttpRequest request = context.Request;
            string teacherId = "0";
            System.Web.SessionState.HttpSessionState session = context.Session;
            try
            {
                if (session["userId"] != null)
                {
                    StringBuilder sqls = new StringBuilder();
                    sqls.Append("select teacherId from fe_teacher where adminId = " + session["userId"]);
                    DataTable dtt = SqlHelper.GetTable(sqls.ToString());

                    if (dtt.Rows.Count > 0)
                    {
                        teacherId = dtt.Rows[0][0].ToString();
                    }

                    string knowledgepointId = request["knowledgepointId"];
                    string knowledgeType = request["kType"];
                    string conditionTitle = request["questionName"];
                    string difficulty = request["diff"];
                    string questionType = request["Qtype"];
                    string pageIndexs = request["pageIndex"];
                    string pageSizes = request["pageSize"];
                    int.TryParse(pageIndexs, out pageIndex);
                    int.TryParse(pageSizes, out pageSize);
                    if (pageIndex == 0)
                    {
                        pageIndex = 1;
                    }
                    if (pageSize == 0)
                    {
                        pageSize = 10;
                    }
                    string ssql = "";

                    string condition = " where teacherId = " + teacherId;
                    if (conditionTitle != null && conditionTitle != "")
                    {
                        condition += " and stem like '%" + conditionTitle + "%'";
                    }
                    if (difficulty != null && difficulty != "")
                    {
                        condition += " and difficulty = " + difficulty;
                    }
                    if (questionType != null && questionType != "")
                    {
                        condition += " and type = " + questionType;
                    }
                    if (knowledgepointId != null && knowledgepointId != "")
                    {
                        condition += " and ( classify = " + knowledgepointId + " or parentid = " + knowledgepointId + " or LevelOneid = " + knowledgepointId + ")";
                    }
                    if (knowledgeType == "2")
                    {
                        ssql = "select row_number() over(order by id desc) as rownum,stem,id,2 as [source] from v_new_questions_teacher" + condition;
                    }
                    else
                    {
                        ssql = "select row_number() over(order by id desc) as rownum,stem,id,1 as [source] from v_new_questions_teacher" + condition;
                    }
                    string countSql = "select rownum from (" + ssql + ") c ";
                    DataTable dtCount = SqlHelper.GetTable(countSql);
                    string allSql = "select * from(" + ssql + " ) c where rownum >(" + (pageIndex - 1) * pageSize + ") AND rownum <=(" + pageIndex * pageSize + ") order by rownum asc ";
                    DataTable dtPage = SqlHelper.GetTable(allSql);//获取分页的数据源
                    int pageCount = (int)(Math.Ceiling(dtCount.Rows.Count * 1.0 / pageSize));
                    result = JSonHelper.DataTableToJsonData(dtPage, true, pageCount, dtCount.Rows.Count);
                }
                else
                {
                    return "go_login";
                }
                
            }
            catch
            { 
            }
            return result;
        }
        private string getTeacherQuestionBankSketch(HttpContext context)
        {
            string result = "[{}]";
            HttpRequest request = context.Request;
            string teacherId = "0";
            System.Web.SessionState.HttpSessionState session = context.Session;
            try
            {
                if (session["userId"] != null)
                {
                    StringBuilder sqls = new StringBuilder();
                    sqls.Append("select teacherId from fe_teacher where adminId = " + session["userId"]);
                    DataTable dtt = SqlHelper.GetTable(sqls.ToString());

                    if (dtt.Rows.Count > 0)
                    {
                        teacherId = dtt.Rows[0][0].ToString();
                    }
                }
                else
                {
                    return "go_login"; 
                }
                string pageIndexs = request["pageIndex"];
                string pageSizes = request["pageSize"];
                int.TryParse(pageIndexs, out pageIndex);
                int.TryParse(pageSizes, out pageSize);
                if (pageIndex == 0)
                    pageIndex = 1;
                if (pageSize == 0)
                    pageSize = 9;

                string ssql = "select row_number() over(order by teacherQuestionBankId desc) as rownum,questionBankSketchId,title,selectAnswer,analysis,questionType,degreeName from v_teacherQuestionbankSketch where teacherId = " + teacherId;
                string countSql = "select rownum from (" + ssql + ") c ";
                DataTable dtCount = SqlHelper.GetTable(countSql);
                string allSql = "select * from(" + ssql + " ) c where rownum >(" + (pageIndex - 1) * pageSize + ") AND rownum <=(" + pageIndex * pageSize + ") order by rownum asc ";
                DataTable dtPage = SqlHelper.GetTable(allSql);//获取分页的数据源
                int pageCount = (int)(Math.Ceiling(dtCount.Rows.Count * 1.0 / pageSize));
                result = JSonHelper.DataTableToJsonData(dtPage, true, pageCount, dtCount.Rows.Count);
            }
            catch
            {

            }
            return result;
        }
        private string getTeacherSetWork(HttpContext context)
        {
            string result = "";
            HttpRequest request = HttpContext.Current.Request;
            System.Web.SessionState.HttpSessionState session = context.Session;
            if (session["userId"] != null)
            {
                try
                {
                    StringBuilder sqls = new StringBuilder();
                    sqls.Append("select teacherId from fe_teacher where adminId = " + session["userId"]);
                    DataTable dtt = SqlHelper.GetTable(sqls.ToString());
                    string teacherId = "0";
                    if (dtt.Rows.Count > 0)
                    {
                        teacherId = dtt.Rows[0][0].ToString();
                    }
                    
                    string classId = request["classId"];
                    string classCom = "";
                    if (classId != "0")
                    {
                        classCom = " and [classId] = " + classId;
                    }
                    
                    
                    string playState = request["playState"];
                    string dateCom="";
                    if (playState == "0")
                    {
                        dateCom = " and datediff(day,Times,getdate())=0";
                    }
                    else if (playState == "1")
                    {
                        dateCom = " and datediff(day,Times,getdate())<= 2 and datediff(day,Times,getdate())>= 0";
                    }
                    else if (playState == "2")
                    {
                        dateCom = " and datediff(day,Times,getdate())<= 7 and datediff(day,Times,getdate())>= 0";
                    }
                    else if (playState == "3")
                    {
                        dateCom = " and datediff(day,Times,getdate())<= 30 and datediff(day,Times,getdate())>= 0";
                    }
                    else
                    {
                         
                    }
                    string randType = request["type"];
                    string pageIndexs = request["pageIndex"];
                    string pageSizes = request["pageSize"];
                    int.TryParse(pageSizes, out pageSize);
                    int.TryParse(pageIndexs, out pageIndex);
                    if (pageSize <= 0)
                        pageSize = 8;
                    if (pageIndex <= 0)
                        pageIndex = 1;

                    string ssql = "select row_number() over(order by paperId desc) as rownum,* from (SELECT * FROM [dbo].[fun_getNew_paperListforTeacher] (" + teacherId + "))a where 1 = 1 " + classCom + dateCom + "";
                    string countSql = "select rownum from (" + ssql + ") c ";
                    DataTable dtCount = SqlHelper.GetTable(countSql);

                    string allSql = "select * from(" + ssql + " ) c where rownum >(" + (pageIndex - 1) * pageSize + ") AND rownum <=(" + pageIndex * pageSize + ") order by rownum desc ";
                    DataTable dtPage = SqlHelper.GetTable(allSql);//获取分页的数据源
                    int pageCount = (int)(Math.Ceiling(dtCount.Rows.Count * 1.0 / pageSize));
                    result = JSonHelper.DataTableToJsonData(dtPage, true, pageCount, dtCount.Rows.Count);
                }
                catch (Exception ex)
                {
                    result = ex.ToString();
                }
            }
            else
            {
                result = "go_login";
            }
            return result;
        }
        private string getTeacherCourseCatalog(HttpContext context)
        {
            string result = "";
            HttpRequest request = HttpContext.Current.Request;
            System.Web.SessionState.HttpSessionState session = context.Session;
            if (session["userId"] != null)
            {
                try
                {
                    StringBuilder sql = new StringBuilder();
                    sql.Append("select * from fe_courseCatalog where courseId =" + request["courseId"]);

                    DataTable dtPage = SqlHelper.GetTable(sql.ToString());

                    result = JSonHelper.DataTableToJsonData(dtPage, true, Convert.ToInt32(dtPage.Rows.Count));
                }
                catch
                {
                    result = "Error";
                }
            }
            else
            {
                result = "go_login";
            }
            return result;
        }
        private string getTeacherKnowledge(HttpContext context)
        {
            string result = "";
            string sqlChild = "";
            string sqlGrandson = "";
            string sqlPageCount = "";
            string sqlChildCount = "";
            string sqlCount = "";
            StringBuilder JsonString = new StringBuilder();
            HttpRequest request = HttpContext.Current.Request;
            System.Web.SessionState.HttpSessionState session = context.Session;
            if (session["userId"] != null)
            {
                try
                {
                    StringBuilder sqls = new StringBuilder();
                    sqls.Append("select teacherId from fe_teacher where adminId = " + session["userId"]);
                    DataTable dtt = SqlHelper.GetTable(sqls.ToString());
                    string teacherId = "0";
                    if (dtt.Rows.Count > 0)
                    {
                        teacherId = dtt.Rows[0][0].ToString();
                    }
                    StringBuilder sql = new StringBuilder();
                    sql.Append("select * from fe_new_knowledgepoint_teacher where parentid = 0 and teacherId =" + teacherId);

                    DataTable dtPage = SqlHelper.GetTable(sql.ToString());
                    
                    if (dtPage.Rows.Count > 0)
                    {
                        JsonString.Append("{ ");
                        JsonString.Append("\"rows\":[ ");
                        
                        for (int i = 0; i < dtPage.Rows.Count; i++)
                        {
                            int PageCountTotal = 0;
                            int ChildCountTotal = 0;
                            
                            JsonString.Append("{\"id\":\"" + dtPage.Rows[i]["id"] + "\",\"name\":\"" + dtPage.Rows[i]["name"] + "\",\"child\":[");
                            sqlChild = "select * from fe_new_knowledgepoint_teacher where parentid = " + dtPage.Rows[i]["id"];
                            DataTable dtChild = SqlHelper.GetTable(sqlChild);

                            sqlPageCount = "select count(1) from fe_new_questions_teacher where classify = " + dtPage.Rows[i]["id"];
                            DataTable dttPageCount = SqlHelper.GetTable(sqlPageCount);
                            
                            if (dtChild.Rows.Count > 0)
                            {
                                for (int j = 0; j < dtChild.Rows.Count; j++)
                                {
                                    JsonString.Append("{\"id\":\"" + dtChild.Rows[j]["id"] + "\",\"name\":\"" + dtChild.Rows[j]["name"] + "\",\"grandson\":[");
                                    sqlGrandson = "select * from fe_new_knowledgepoint_teacher where parentid =" + dtChild.Rows[j]["id"];
                                    DataTable dtSon = SqlHelper.GetTable(sqlGrandson);

                                    sqlChildCount = "select count(1) from fe_new_questions_teacher where classify = " + dtChild.Rows[j]["id"];
                                    DataTable dttChildCount = SqlHelper.GetTable(sqlChildCount);

                                    if (dtSon.Rows.Count > 0)
                                    {
                                        for (int k = 0; k < dtSon.Rows.Count; k++)
                                        {
                                            sqlCount = "select count(1) from fe_new_questions_teacher where classify = " + dtSon.Rows[k]["id"];
                                            DataTable dttSonCount = SqlHelper.GetTable(sqlCount);
                                            JsonString.Append("{\"id\":\"" + dtSon.Rows[k]["id"] + "\",\"name\":\"" + dtSon.Rows[k]["name"] + "\",\"count\":\"" + dttSonCount.Rows[0][0]+ "\"");
                                            ChildCountTotal += Convert.ToInt32(dttSonCount.Rows[0][0]);
                                            if (k == dtSon.Rows.Count - 1)
                                            {
                                                JsonString.Append("}");
                                            }
                                            else
                                            {
                                                JsonString.Append("},");
                                            }
                                        } 
                                        
                                    }
                                    ChildCountTotal += Convert.ToInt32(dttChildCount.Rows[0][0]);
                                    JsonString.Append("],\"count\":\"" + ChildCountTotal + "\"");
                                    if (j == dtChild.Rows.Count - 1)
                                    {
                                        JsonString.Append("}");
                                    }
                                    else
                                    {
                                        JsonString.Append("},");
                                    }
                                    PageCountTotal += ChildCountTotal;
                                }
                            }

                            PageCountTotal += Convert.ToInt32(dttPageCount.Rows[0][0]);
                            JsonString.Append("],\"count\":\"" + PageCountTotal + "\"");
                            if (i == dtPage.Rows.Count - 1)
                            {
                                JsonString.Append("}");
                            }
                            else
                            {
                                JsonString.Append("},");
                            }
                        }
                        
                    }
                    JsonString.Append("]}");
                    result = JsonString.ToString().Replace("\n", "");
                    
                }
                catch
                {
                     
                }
            }
            else
            {
                result = "go_login";
            }
            return result;
        }
        private string getSystemKnowledge(HttpContext context)
        {
            string result = "";
            StringBuilder JsonString = new StringBuilder();
            try
            {
                string sqlChild = "";
                string sqlGrandson = "";
                string sqlPageCount = "";
                string sqlChildCount = "";
                string sqlCount = "";
                StringBuilder sql = new StringBuilder();
                sql.Append("select * from fe_new_knowledgepoint where parentid = 0");
                DataTable dtPage = SqlHelper.GetTable(sql.ToString());

                if (dtPage.Rows.Count > 0)
                {
                    JsonString.Append("{ ");
                    JsonString.Append("\"rows\":[ ");

                    for (int i = 0; i < dtPage.Rows.Count; i++)
                    {
                        int PageCountTotal = 0;
                        int ChildCountTotal = 0;

                        JsonString.Append("{\"id\":\"" + dtPage.Rows[i]["id"] + "\",\"name\":\"" + dtPage.Rows[i]["name"] + "\",\"child\":[");
                        sqlChild = "select * from fe_new_knowledgepoint where parentid = " + dtPage.Rows[i]["id"];
                        DataTable dtChild = SqlHelper.GetTable(sqlChild);

                        sqlPageCount = "select count(1) from fe_new_questions where classify = " + dtPage.Rows[i]["id"];
                        DataTable dttPageCount = SqlHelper.GetTable(sqlPageCount);

                        if (dtChild.Rows.Count > 0)
                        {
                            for (int j = 0; j < dtChild.Rows.Count; j++)
                            {
                                JsonString.Append("{\"id\":\"" + dtChild.Rows[j]["id"] + "\",\"name\":\"" + dtChild.Rows[j]["name"] + "\",\"grandson\":[");
                                sqlGrandson = "select * from fe_new_knowledgepoint where parentid =" + dtChild.Rows[j]["id"];
                                DataTable dtSon = SqlHelper.GetTable(sqlGrandson);

                                sqlChildCount = "select count(1) from fe_new_questions where classify = " + dtChild.Rows[j]["id"];
                                DataTable dttChildCount = SqlHelper.GetTable(sqlChildCount);

                                if (dtSon.Rows.Count > 0)
                                {
                                    for (int k = 0; k < dtSon.Rows.Count; k++)
                                    {
                                        sqlCount = "select count(1) from fe_new_questions where classify = " + dtSon.Rows[k]["id"];
                                        DataTable dttSonCount = SqlHelper.GetTable(sqlCount);
                                        JsonString.Append("{\"id\":\"" + dtSon.Rows[k]["id"] + "\",\"name\":\"" + dtSon.Rows[k]["name"] + "\",\"count\":\"" + dttSonCount.Rows[0][0] + "\"");
                                        ChildCountTotal += Convert.ToInt32(dttSonCount.Rows[0][0]);
                                        if (k == dtSon.Rows.Count - 1)
                                        {
                                            JsonString.Append("}");
                                        }
                                        else
                                        {
                                            JsonString.Append("},");
                                        }
                                    }

                                }
                                ChildCountTotal += Convert.ToInt32(dttChildCount.Rows[0][0]);
                                JsonString.Append("],\"count\":\"" + ChildCountTotal + "\"");
                                if (j == dtChild.Rows.Count - 1)
                                {
                                    JsonString.Append("}");
                                }
                                else
                                {
                                    JsonString.Append("},");
                                }
                                PageCountTotal += ChildCountTotal;
                            }
                        }

                        PageCountTotal += Convert.ToInt32(dttPageCount.Rows[0][0]);
                        JsonString.Append("],\"count\":\"" + PageCountTotal + "\"");
                        if (i == dtPage.Rows.Count - 1)
                        {
                            JsonString.Append("}");
                        }
                        else
                        {
                            JsonString.Append("},");
                        }
                    }
                }
                JsonString.Append("]}");
                result = JsonString.ToString().Replace("\n", "");
            }
            catch
            { }
            return result;
        }
        private string getSystemNoticeList(HttpContext context)
        {
            string result = "";
            HttpRequest request = HttpContext.Current.Request;
            System.Web.SessionState.HttpSessionState session = context.Session;
            if (session["userId"] != null)
            {
                try
                {
                    StringBuilder sqls = new StringBuilder();
                    sqls.Append("select teacherId from fe_teacher where adminId = " + session["userId"]);
                    DataTable dtt = SqlHelper.GetTable(sqls.ToString());
                    string teacherId = "0";
                    if (dtt.Rows.Count > 0)
                    {
                        teacherId = dtt.Rows[0][0].ToString();
                    }
                    string readType = request["type"];
                    string readCom="";
                    if (readType != null && readType != "" && readType != "0")
                    {
                        if (readType != "2")
                        {
                            readCom = " and readtype = 1";
                        }
                        else
                        {
                            readCom = " and readtype = 0";
                        }
                    }
                    string pageIndexs = request["pageIndex"];
                    string pageSizes = request["pageSize"];
                    int.TryParse(pageSizes, out pageSize);
                    int.TryParse(pageIndexs, out pageIndex);
                    if (pageSize <= 0)
                        pageSize = 8;
                    if (pageIndex <= 0)
                        pageIndex = 1;
                    string ssql = "select row_number() over(order by systemNoticeId desc) as rownum,* from (SELECT * FROM [dbo].[fun_getSystemNoticeList] (" + teacherId + ",3)) a where isShowforUser = 0 " + readCom + " and (noticeType = 0 or noticeType = 1 or (noticeType = 4 and accepterType = 3 and accepterId = " + teacherId + "))";

                    string countSql = "select rownum from (" + ssql + ") c ";
                    DataTable dtCount = SqlHelper.GetTable(countSql);

                    string allSql = "select * from(" + ssql + " ) c where rownum >(" + (pageIndex - 1) * pageSize + ") AND rownum <=(" + pageIndex * pageSize + ") order by rownum desc ";
                    DataTable dtPage = SqlHelper.GetTable(allSql);//获取分页的数据源
                    int pageCount = (int)(Math.Ceiling(dtCount.Rows.Count * 1.0 / pageSize));
                    result = JSonHelper.DataTableToJsonData(dtPage, true, pageCount, dtCount.Rows.Count);
                }
                catch
                {
                    result = "Error";
                }
            }
            else
            {
                result = "go_login";
            }
            return result;
        }
        private string getStudentRepondList(HttpContext context)
        {
            string result = "";
            HttpRequest request = HttpContext.Current.Request;
            System.Web.SessionState.HttpSessionState session = context.Session;
            if (session["userId"] != null)
            {
                try
                {
                    StringBuilder sqls = new StringBuilder();
                    sqls.Append("select teacherId from fe_teacher where adminId = " + session["userId"]);
                    DataTable dtt = SqlHelper.GetTable(sqls.ToString());
                    string teacherId = "0";
                    if (dtt.Rows.Count > 0)
                    {
                        teacherId = dtt.Rows[0][0].ToString();
                    }
                    string homeworkId = request["homeworkId"];
                    string classId = request["classId"];

                    string ssql = "select row_number() over(order by studentname asc) as rownum,* from (SELECT * FROM [dbo].[fun_getStudentNewPaperRepondList] (" + homeworkId + "," + classId + "))a ";

                    DataTable dtPage = SqlHelper.GetTable(ssql);

                    result = JSonHelper.DataTableToJsonData(dtPage, true, Convert.ToInt32(dtPage.Rows.Count));
                }
                catch
                {
                    result = "Error";
                }
            }
            else
            {
                result = "go_login";
            }
            return result;
        }
        /// <summary>
        /// 根据Id获取文章
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        private string getArticleById(HttpContext context)
        {
            string result = "{}";
            try
            {
                HttpRequest request = context.Request;
                string articleIds = request["articleId"];
                int articleId = getAppropriateId(articleIds);
                string ssql = "select a.name,t.teacherId,t.name teacherName,a.title,a.note introduce,a.content,a.iconPath,a.mobileIconPath from fe_article a inner join fe_teacher t on a.publisherId = t.teacherId where a.articleId=" + articleId;
                DataTable dt = SqlHelper.GetTable(ssql);
                result = JSonHelper.DataTableToJson(dt);
            }
            catch (Exception ex)
            {
            }
            return result;
        }
        private string getEvaluationDetail(HttpContext context)
        {
            string result = "[{}]";
            try
            {
                HttpRequest request = context.Request;
                int courseEvaluationId = 0;
                string courseEvaluationIds = request["courseEvaluationId"];
                int.TryParse(courseEvaluationIds, out courseEvaluationId);
                
                string pageIndexs = request["pageIndex"];
                string pageSizes = request["pageSize"];
                int.TryParse(pageSizes, out pageSize);
                int.TryParse(pageIndexs, out pageIndex);
                if (pageSize <= 0)
                    pageSize = 8;
                if (pageIndex <= 0)
                    pageIndex = 1;

                string ssql = "select  row_number() over(order by courseEvaluationId desc) as rownum,* from (SELECT * FROM [dbo].[fun_getEvaluationDetail] (" + courseEvaluationId + "))a";
                string countSql = "select rownum from (" + ssql + ") c ";
                DataTable dtCount = SqlHelper.GetTable(countSql);
                string allSql = "select * from(" + ssql + " ) c where rownum >(" + (pageIndex - 1) * pageSize + ") AND rownum <=(" + pageIndex * pageSize + ")  order by rownum asc ";
                DataTable dtPage = SqlHelper.GetTable(allSql);//获取分页的数据源
                int pageCount = (int)(Math.Ceiling(dtCount.Rows.Count * 1.0 / pageSize));
                result = JSonHelper.DataTableToJsonData(dtPage, true, pageCount, dtCount.Rows.Count);
            }
            catch (Exception ex)
            {
                result = ex.ToString();
            }
            return result;
        }
        private string getEvaluationToMe(HttpContext context)
        {
            string result = "{\"rows\":[]}";
            string ssql = "";
            string sql = "";
            DataTable dtPage = new DataTable();
            try
            {
                HttpRequest request = context.Request;
                
                System.Web.SessionState.HttpSessionState session = context.Session;
                if (session["userId"] == null)
                {
                    return "go_login";
                }
                StringBuilder sqls = new StringBuilder();
                sqls.Append("select teacherId from fe_teacher where adminId = " + session["userId"]);
                DataTable dtt = SqlHelper.GetTable(sqls.ToString());
                string teacherId = "0";
                if (dtt.Rows.Count > 0)
                {
                    teacherId = dtt.Rows[0][0].ToString();
                }

                int states = 0;
                string statess = request["states"];
                int.TryParse(statess, out states);

                string valuatorType = request["valuatorType"];

                string stateCom = "";
                if (states != 0)
                {
                    stateCom = " and states = " + states;
                }


                string pageIndexs = request["pageIndex"];
                string pageSizes = request["pageSize"];
                int.TryParse(pageSizes, out pageSize);
                int.TryParse(pageIndexs, out pageIndex);
                if (pageSize <= 0)
                    pageSize = 8;
                if (pageIndex <= 0)
                    pageIndex = 1;

                ssql = "select  row_number() over(order by courseEvaluationId desc) as rownum,* from (SELECT * FROM [dbo].[fun_getCourseEvaluationList] (" + teacherId + ",3))a where 1=1 " + stateCom + "";

                string countSql = "select rownum from (" + ssql + ") c ";
                DataTable dtCount = SqlHelper.GetTable(countSql);

                string allSql = "select * from(" + ssql + " ) c where rownum >(" + (pageIndex - 1) * pageSize + ") AND rownum <=(" + pageIndex * pageSize + ") order by rownum desc ";
                dtPage = SqlHelper.GetTable(allSql);//获取分页的数据源
                int pageCount = (int)(Math.Ceiling(dtCount.Rows.Count * 1.0 / pageSize));
                StringBuilder JsonString = new StringBuilder();
                if (dtPage.Rows.Count > 0)
                {
                    JsonString.Append("{ ");
                    JsonString.Append("\"totalCount\":");
                    JsonString.Append(dtCount.Rows.Count);
                    JsonString.Append(",");
                    JsonString.Append("\"totalPageCount\":");
                    JsonString.Append(pageCount);
                    JsonString.Append(",");
                    JsonString.Append("\"rows\":[ ");
                    for (int i = 0; i < dtPage.Rows.Count; i++)
                    {
                        
                        if (dtPage.Rows[i]["valuatorType"].ToString() == "1")
                        {
                            sql = "select * from fe_student where studentId = " + dtPage.Rows[i]["valuatorId"];
                        }
                        else if (dtPage.Rows[i]["valuatorType"].ToString() == "3")
                        {
                            sql = "select * from fe_teacher where teacherId = " + dtPage.Rows[i]["valuatorId"];
                        }
                        else
                        {
                            sql = "select * from fe_parent where parentId = " + dtPage.Rows[i]["valuatorId"];
                        }
                        DataTable dt = SqlHelper.GetTable(sql);


                        JsonString.Append("{\"courseEvaluationId\":\"" + dtPage.Rows[i]["courseEvaluationId"] + "\",\"levelOneEvaluationId\":\"" + dtPage.Rows[i]["levelOneEvaluationId"] + "\",\"parentId\":\"" + dtPage.Rows[i]["parentId"] + "\",\"valuatorId\":\"" + dtPage.Rows[i]["valuatorId"] + "\",\"valuatorType\":\"" + dtPage.Rows[i]["valuatorType"] + "\",\"time\":\"" + dtPage.Rows[i]["Time"] + "\",\"evaluation\":\"" + dtPage.Rows[i]["evaluation"] + "\",\"valuator\":\"" + dt.Rows[0]["name"] + "\",\"courseId\":\"" + dtPage.Rows[i]["courseId"] + "\",\"parentPath\":\"" + dtPage.Rows[i]["parentPath"] + "\",\"states\":\"" + dtPage.Rows[i]["states"] + "\",\"coursename\":\"" + dtPage.Rows[i]["coursename"] + "\",\"recordType\":\"" + dtPage.Rows[i]["recordType"] + "\"");
                        if (i == dtPage.Rows.Count - 1)
                        {
                            JsonString.Append("} ");
                        }
                        else
                        {
                            JsonString.Append("}, ");
                        }
                    }
                    JsonString.Append("]}");
                    result = JsonString.ToString().Replace("\n", "");
                }
            }
            catch (Exception ex)
            {
                result = ex.ToString();
            }
            return result;
        }
        private string updateEvaluationState(HttpContext context)
        {
            string result = "";
            try
            {
                HttpRequest request = context.Request;

                string saveTag = request["saveTag"];//request["saveTag"]
                int dataOper = GetDataOperType(saveTag) + 1;
                int errorCode = 0;

                int courseEvaluationId = 0;
                string courseEvaluationIds = request["courseEvaluationId"];
                int.TryParse(courseEvaluationIds, out courseEvaluationId);

                List<SqlParameter> sqlparm = new List<SqlParameter>();
                sqlparm.Add(new SqlParameter("@courseEvaluationId", courseEvaluationId));
                sqlparm.Add(new SqlParameter("@saveTag", dataOper));
                sqlparm.Add(new SqlParameter("@errorCode", errorCode));
                sqlparm.Add(new SqlParameter("@errorMessage", SqlDbType.VarChar, 100));

                string[] sOut = new string[3];
                sOut[0] = "@courseEvaluationId";
                sOut[1] = "@errorCode";
                sOut[2] = "@errorMessage";
                result = SqlHelper.ExecProcedure("proc_fe_couserEvaluation_Update", sqlparm.ToArray(), sOut, '|');
                string[] sResult = result.Split('|');
                string errorCodes = sResult[1];
                errorCode = getAppropriateId(errorCodes, true);
                if (errorCode == 0)
                    result = ((int)UpdateInfo.success).ToString();
                else
                    result = ((int)UpdateInfo.failure).ToString();
            }
            catch (Exception ex)
            {
                result = ex.ToString();
            }
            return result;
        }
        private string updateSystemNoticeState(HttpContext context)
        {
            string result = "";
            try
            {
                HttpRequest request = context.Request;
                System.Web.SessionState.HttpSessionState session = context.Session;
                if (session["userId"] == null)
                {
                    return "go_login";
                }
                StringBuilder sql = new StringBuilder();
                sql.Append("select teacherId from fe_teacher where adminId = " + session["userId"]);
                DataTable dt = SqlHelper.GetTable(sql.ToString());
                string teacherId = "0";
                if (dt.Rows.Count > 0)
                {
                    teacherId = dt.Rows[0][0].ToString();
                }
                
                string saveTag = request["saveTag"];//request["saveTag"]
                int dataOper = GetDataOperType(saveTag) + 1;
                int errorCode = 0;

                int systemNoticeId = 0;
                string systemNoticeIds = request["systemNoticeId"];
                int.TryParse(systemNoticeIds, out systemNoticeId);

                List<SqlParameter> sqlparm = new List<SqlParameter>();
                sqlparm.Add(new SqlParameter("@systemNoticeId", systemNoticeId));
                sqlparm.Add(new SqlParameter("@userId", teacherId));
                sqlparm.Add(new SqlParameter("@readType", "3"));
                sqlparm.Add(new SqlParameter("@saveTag", dataOper));
                sqlparm.Add(new SqlParameter("@errorCode", errorCode));
                sqlparm.Add(new SqlParameter("@errorMessage", SqlDbType.VarChar, 100));

                string[] sOut = new string[3];
                sOut[0] = "@systemNoticeId";
                sOut[1] = "@errorCode";
                sOut[2] = "@errorMessage";
                result = SqlHelper.ExecProcedure("proc_fe_systemNotice_Update", sqlparm.ToArray(), sOut, '|');
                string[] sResult = result.Split('|');
                string errorCodes = sResult[1];
                errorCode = getAppropriateId(errorCodes, true);
                if (errorCode == 0)
                    result = ((int)UpdateInfo.success).ToString();
                else
                    result = ((int)UpdateInfo.failure).ToString();
            }
            catch (Exception ex)
            {
                result = ex.ToString();
            }
            return result;
        }
        private string updateStudioTeacherRsState(HttpContext context)
        {
            string result = "";
            try
            {
                HttpRequest request = context.Request;
                System.Web.SessionState.HttpSessionState session = context.Session;
                if (session["userId"] == null)
                {
                    return "go_login";
                }
                StringBuilder sql = new StringBuilder();
                sql.Append("select teacherId from fe_teacher where adminId = " + session["userId"]);
                DataTable dt = SqlHelper.GetTable(sql.ToString());
                string teacherId = "0";
                if (dt.Rows.Count > 0)
                {
                    teacherId = dt.Rows[0][0].ToString();
                }

                string saveTag = request["saveTag"];//request["saveTag"]
                int dataOper = GetDataOperType(saveTag) + 1;
                int errorCode = 0;

                int studioTeacherRsId = 0;
                string studioTeacherRsIds = request["studioTeacherRsId"];
                int.TryParse(studioTeacherRsIds, out studioTeacherRsId);

                List<SqlParameter> sqlparm = new List<SqlParameter>();
                sqlparm.Add(new SqlParameter("@studioTeacherRsId", studioTeacherRsId));
                sqlparm.Add(new SqlParameter("@auditState", request["state"]));
                sqlparm.Add(new SqlParameter("@auditorId", teacherId));
                //sqlparm.Add(new SqlParameter("@saveTag", dataOper));
                sqlparm.Add(new SqlParameter("@errorCode", errorCode));
                sqlparm.Add(new SqlParameter("@errorMessage", SqlDbType.VarChar, 100));

                string[] sOut = new string[3];
                sOut[0] = "@studioTeacherRsId";
                sOut[1] = "@errorCode";
                sOut[2] = "@errorMessage";
                result = SqlHelper.ExecProcedure("proc_fe_studioTeacherRs_Update", sqlparm.ToArray(), sOut, '|');
                string[] sResult = result.Split('|');
                string errorCodes = sResult[1];
                errorCode = getAppropriateId(errorCodes, true);
                if (errorCode == 0)
                    result = ((int)UpdateInfo.success).ToString();
                else
                    result = ((int)UpdateInfo.failure).ToString();
            }
            catch (Exception ex)
            {
                result = ex.ToString();
            }
            return result;
        }
        private string getTeacherCourseDetail(HttpContext context)
        {
            string result = "";
            HttpRequest request = HttpContext.Current.Request;
            System.Web.SessionState.HttpSessionState session = context.Session;
            if (session["userId"] != null)
            {
                try
                {
                    StringBuilder sql = new StringBuilder();
                    sql.Append("select *,(case when auditState = 1 then '已审核' else '等待审核' end)as states,CONVERT(varchar(10), insertTime, 111)as times from v_teacherCatalog where courseId =" + request["courseId"] + " and adminId =" + session["userId"]);

                    DataTable dtPage = SqlHelper.GetTable(sql.ToString());

                    result = JSonHelper.DataTableToJsonData(dtPage, true, Convert.ToInt32(dtPage.Rows.Count));
                }
                catch
                {
                    result = "Error";
                }
            }
            else
            {
                result = "go_login";
            }
            return result;
        }
        private string getTeacherCourseDetailById(HttpContext context)
        {
            string result = "";
            HttpRequest request = HttpContext.Current.Request;
            System.Web.SessionState.HttpSessionState session = context.Session;
            if (session["userId"] != null)
            {
                try
                {
                    StringBuilder sql = new StringBuilder();
                    sql.Append("select * from v_courseById where courseId =" + request["courseId"]);

                    DataTable dtPage = SqlHelper.GetTable(sql.ToString());

                    result = JSonHelper.DataTableToJsonData(dtPage, true, dtPage.Rows.Count);
                }
                catch
                {
                    result = "Error";
                }
            }
            else
            {
                result = "go_login";
            }
            return result;
        }
        private string getMicroLectureDetailById(HttpContext context)
        {
            string result = "";
            HttpRequest request = HttpContext.Current.Request;
            System.Web.SessionState.HttpSessionState session = context.Session;
            if (session["userId"] != null)
            {
                try
                {
                    StringBuilder sql = new StringBuilder();
                    sql.Append("select * from v_microCourse where microLectureId =" + request["courseId"]);

                    DataTable dtPage = SqlHelper.GetTable(sql.ToString());

                    result = JSonHelper.DataTableToJsonData(dtPage, true, dtPage.Rows.Count);
                }
                catch
                {
                    result = "Error";
                }
            }
            else
            {
                result = "go_login";
            }
            return result;
        }
        private string getTeacherResourceById(HttpContext context)
        {
            string result = "";
            try
            {
                HttpRequest request = context.Request;
                string studioResourceIds = request["studioResourceId"];
                int studioResourceId = getAppropriateId(studioResourceIds);
                string ssql = "select studioResourceId, t.teacherId,t.name teacherName,sr.name,sr.title,sr.iconPath,sr.mobileIconPath,resourcePath,sr.note,sr.isOpen from fe_studioResource sr inner join fe_teacher t on sr.inserter = t.teacherId "
                            + " where sr.studioResourceId=" + studioResourceId;
                DataTable dt = SqlHelper.GetTable(ssql);
                result = JSonHelper.DataTableToJson(dt);
            }
            catch (Exception ex)
            {
            }
            return result;
        }
        private string getStudioNewById(HttpContext context)
        {
            string result = "";
            try
            {
                HttpRequest request = context.Request;
                string newsId = request["newsId"];
                string ssql = "select * from v_news where newsId = " + newsId;
                           
                DataTable dt = SqlHelper.GetTable(ssql);
                result = JSonHelper.DataTableToJson(dt);
            }
            catch (Exception ex)
            {
            }
            return result;
        }
        /// <summary>
        /// 保存老师头像
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        private string SaveTeacherHead(HttpContext context)
        {
            HttpFileCollection files = context.Request.Files;
            HttpRequest request = context.Request;
            string msg = string.Empty;
            StringBuilder sbMsg = new StringBuilder();
            int errorCode = 0;
            string result = "";
            System.Web.SessionState.HttpSessionState session = context.Session;
            if (session["userId"] == null)
            {
                return "go_login";
            }
            StringBuilder sql = new StringBuilder();
            sql.Append("select teacherId from fe_teacher where adminId = " + session["userId"]);
            DataTable dt = SqlHelper.GetTable(sql.ToString());
            string teacherId = "0";
            if (dt.Rows.Count > 0)
            {
                teacherId = dt.Rows[0][0].ToString();
            }
            try
            {
                if (files.Count > 0)
                {
                    for (int i = 0; i < files.Count; i++)
                    {
                        if (files[i].FileName != null && files[i].FileName != "" && files[i].FileName != "undefined")
                        {
                            string filePath = context.Server.MapPath("..\\..\\uploads\\images\\");

                            if (!System.IO.Directory.Exists(filePath))
                                System.IO.Directory.CreateDirectory(filePath);
                            filePath = System.IO.Path.Combine(filePath, System.IO.Path.GetFileName(files[i].FileName));
                            if (!System.IO.File.Exists(filePath))
                                files[i].SaveAs(filePath);
                            if (renameFile(ref filePath, context))
                            {
                                msg = filePath;
                                msg = System.IO.Path.GetFileName(filePath);
                                sbMsg.Append(msg + ",");
                            }
                            //LogOper.writeLog("formDataUpload filePath=" + filePath);
                            List<SqlParameter> sqlparm = new List<SqlParameter>();
                            sqlparm.Add(new SqlParameter("@teacherId", teacherId));
                            sqlparm.Add(new SqlParameter("@iconPath", "uploads/images/" + msg));//files[i].FileName
                            sqlparm.Add(new SqlParameter("@saveTag", 0));//无用
                            sqlparm.Add(new SqlParameter("@errorCode", errorCode));
                            sqlparm.Add(new SqlParameter("@errorMessage", SqlDbType.VarChar, 100));

                            string[] sResult = new string[] { "@errorMessage" };
                            result = SqlHelper.ExecProcedure("proc_fe_teacherHead_Save", sqlparm.ToArray(), sResult, '|');
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                result = ex.ToString();
            }
            return result;
        }
        private string saveTeacherPhoto(HttpContext context)
        {
            HttpFileCollection files = context.Request.Files;
            HttpRequest request = context.Request;
            int errorCode = 0;
            string result = "";
            System.Web.SessionState.HttpSessionState session = context.Session;
            if (session["userId"] == null)
            {
                return "go_login";
            }
            StringBuilder sql = new StringBuilder();
            sql.Append("select teacherId from fe_teacher where adminId = " + session["userId"]);
            DataTable dt = SqlHelper.GetTable(sql.ToString());
            string teacherId = "0";
            if (dt.Rows.Count > 0)
            {
                teacherId = dt.Rows[0][0].ToString();
            }
            string msg = string.Empty;
            StringBuilder sbMsg = new StringBuilder();
            try
            {
                if (files.Count > 0)
                {
                    for (int i = 0; i < files.Count; i++)
                    {
                        if (files[i].FileName != null && files[i].FileName != "" && files[i].FileName != "undefined")
                        {
                            string filePath = context.Server.MapPath("..\\..\\uploads\\images\\");

                            if (!System.IO.Directory.Exists(filePath))
                                System.IO.Directory.CreateDirectory(filePath);
                            filePath = System.IO.Path.Combine(filePath, System.IO.Path.GetFileName(files[i].FileName));
                            if (!System.IO.File.Exists(filePath))
                                files[i].SaveAs(filePath);
                            if (renameFile(ref filePath, context))
                            {
                                msg = filePath;
                                msg = System.IO.Path.GetFileName(filePath);
                                sbMsg.Append(msg + ",");
                            }
                            //LogOper.writeLog("formDataUpload filePath=" + filePath);
                            string studioResourceIds = request["studioResourceId"];
                            int studioResourceId = 0;
                            int.TryParse(studioResourceIds, out studioResourceId);
                            
                            List<SqlParameter> sqlparm = new List<SqlParameter>();
                            sqlparm.Add(new SqlParameter("@studioResourceId", studioResourceId));
                            sqlparm.Add(new SqlParameter("@organId", session["organId"]));
                            sqlparm.Add(new SqlParameter("@Name", request["picturetitle"]));
                            sqlparm.Add(new SqlParameter("@title", request["picturetitle"]));
                            sqlparm.Add(new SqlParameter("@iconPath", "uploads/images/" + msg));
                            sqlparm.Add(new SqlParameter("@resourceExt", "7"));
                            sqlparm.Add(new SqlParameter("@videoId", request["videoId"]));
                            sqlparm.Add(new SqlParameter("@resourcePath", ""));
                            sqlparm.Add(new SqlParameter("@inserter", session["userId"]));
                            sqlparm.Add(new SqlParameter("@saveTag", "1"));
                            sqlparm.Add(new SqlParameter("@errorCode", errorCode));
                            sqlparm.Add(new SqlParameter("@errorMessage", SqlDbType.VarChar, 100));
                            string[] sResult = new string[] { "@errorMessage" };
                            result = SqlHelper.ExecProcedure("proc_fe_teacherCenter_Save", sqlparm.ToArray(), sResult, '|');
                            
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                result = ex.ToString();
            }
            return result;
        }
        /// <summary>
        /// 返回TeacherResource
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        private string getTeacherResource(HttpContext context)
        {
            string result = "";
            try
            {
                HttpRequest request = context.Request;
                System.Web.SessionState.HttpSessionState session = context.Session;
                if (session["userId"] == null)
                {
                    return "go_login";
                }
                StringBuilder sql = new StringBuilder();
                sql.Append("select teacherId from fe_teacher where adminId = " + session["userId"]);
                DataTable dt = SqlHelper.GetTable(sql.ToString());
                string teacherId = "0";
                if (dt.Rows.Count > 0)
                {
                    teacherId = dt.Rows[0][0].ToString();
                }
                string resourceTypes = request["resourceType"];
                string pageIndexs = request["pageIndex"];
                string pageSizes = request["pageSize"];
                string auditStates = request["auditState"];
                
                //int teacherResourceTypeId = getAppropriateId(teacherResourceTypeIds);
                pageIndex = getAppropriateId(pageIndexs);
                pageSize = getAppropriateId(pageSizes);
                int auditState = getAppropriateId(auditStates, true);

                string ssql = "";
                //string sResourceSql = "";
                string auditSql = "";
                if (auditState > 0)
                    auditSql = "  and auditState = " + auditState;
                switch (resourceTypes)
                {
                    case "all"://全部资源
                       
                        ssql = " select row_number() over(order by studioResourceId desc) as rownum,* from ( select 'courseware' resourceType, studioResourceId,name,title,iconPath,mobileIconPath,convert(varchar(19),isnull(modifyTime, insertTime) ,120) publishDate,downLoadCount,note,resourcePath from fe_studioResource "
                             + " where 1=1 and resourceExt < 6 and inserter= '" + teacherId + "'" + auditSql + " union select 'article' resourceType, articleId,name,title,iconPath,mobileIconPath,convert(varchar(19),isnull(modifyTime, publishDate) ,120) publishDate, clickCount,note,'' resourcePath /*,content*/ from fe_article where publisherType = 0  " + auditSql + " and publisherId='" + teacherId + "') a ";

                        break;
                    case "article"://文章
                        ssql = " select row_number() over(order by articleId desc) as rownum,'article' resourceType, articleId,name,title,iconPath,mobileIconPath,convert(varchar(19),isnull(modifyTime, publishDate) ,120) publishDate, clickCount,note,'' resourcePath /*,content*/ from fe_article where publisherType = 0 " + auditSql + " and publisherId='" + teacherId + "'";
                        break;
                    case "courseware"://课件
                        ssql = " select row_number() over(order by studioResourceId desc) as rownum,'courseware' resourceType, studioResourceId,name,title,iconPath,mobileIconPath,convert(varchar(19),isnull(modifyTime, insertTime) ,120) publishDate,downLoadCount,note,resourcePath from fe_studioResource "
                             + " where 1=1 and resourceExt < 6 and inserter= '" + teacherId + "'" + auditSql;
                        break;
                }
                //文章
                string countSql = "select rownum from (" + ssql + ") c ";
                DataTable dtCount = SqlHelper.GetTable(countSql);
                string allSql = "select * from(" + ssql + " ) c where rownum >(" + (pageIndex - 1) * pageSize + ") AND rownum <=(" + pageIndex * pageSize + ")  order by rownum asc ";
                LogOper.writeLog("getTeacherResource allSql=" + allSql);
                DataTable dtPage = SqlHelper.GetTable(allSql);//获取分页的数据源
                int pageCount = (int)(Math.Ceiling(dtCount.Rows.Count * 1.0 / pageSize));
                result = JSonHelper.DataTableToJsonData(dtPage, true, pageCount, dtCount.Rows.Count);

             
            }
            catch (Exception ex)
            {
            }
            return result;
        }
        /// <summary>
        /// 教师认证信息
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        private string getTeacherProve(HttpContext context)
        {
            string result = "";
            try
            {
                System.Web.SessionState.HttpSessionState session = context.Session;
                if (session["userId"] == null)
                {
                    return "go_login";
                }
                StringBuilder sql = new StringBuilder();
                sql.Append("select auditState,(case when certificationIconPath is null then '0' else '1' end)as certification ,(case when idPhoto is null then '0' else '1' end)as idCardPhoto,(case when educationalLevelPhoto is null then '0' else '1' end)as educational,(case when handHoldPhoto is null then '0' else '1' end)as handHoldPhoto,(case when capabilityPhoto is null then '0' else '1' end)as capability from fe_teacher where adminId = " + session["userId"]);
                DataTable dtPage = SqlHelper.GetTable(sql.ToString());

                result = JSonHelper.DataTableToJsonData(dtPage, true, Convert.ToInt32(dtPage.Rows.Count));
            }
            catch
            {

            }
            return result;
        }

        private string getTeacherClass(HttpContext context)
        {
            string result = "";
            try
            {
                HttpRequest request = context.Request;
                System.Web.SessionState.HttpSessionState session = context.Session;
                if (session["userId"] == null)
                {
                    return "go_login";
                }
                StringBuilder sql = new StringBuilder();
                sql.Append("select teacherId from fe_teacher where adminId = " + session["userId"]);
                DataTable dt = SqlHelper.GetTable(sql.ToString());
                string teacherId = "0";
                if (dt.Rows.Count > 0)
                {
                    teacherId = dt.Rows[0][0].ToString();
                }
                string pageIndexs = request["pageIndex"];
                string pageSizes = request["pageSize"];

                pageIndex = getAppropriateId(pageIndexs);
                pageSize = getAppropriateId(pageSizes);

                string ssql = "select  row_number() over(order by classId desc) as rownum,* from v_classTeacherRs where teacherId = " + teacherId;
                string countSql = "select rownum from (" + ssql + ") c ";
                DataTable dtCount = SqlHelper.GetTable(countSql);
                string allSql = "select * from(" + ssql + " ) c where rownum >(" + (pageIndex - 1) * pageSize + ") AND rownum <=(" + pageIndex * pageSize + ")  order by rownum asc ";
                DataTable dtPage = SqlHelper.GetTable(allSql);//获取分页的数据源
                int pageCount = (int)(Math.Ceiling(dtCount.Rows.Count * 1.0 / pageSize));
                result = JSonHelper.DataTableToJsonData(dtPage, true, pageCount, dtCount.Rows.Count);
            }
            catch (Exception ex)
            {
            }
            return result;
        }
        private string getClassStudent(HttpContext context)
        {
            string result = "";
            try
            {
                HttpRequest request = context.Request;
                System.Web.SessionState.HttpSessionState session = context.Session;
                if (session["userId"] == null)
                {
                    return "go_login";
                }
                StringBuilder sql = new StringBuilder();
                sql.Append("select teacherId from fe_teacher where adminId = " + session["userId"]);
                DataTable dt = SqlHelper.GetTable(sql.ToString());
                string teacherId = "0";
                if (dt.Rows.Count > 0)
                {
                    teacherId = dt.Rows[0][0].ToString();
                }
                string pageIndexs = request["pageIndex"];
                string pageSizes = request["pageSize"];
                string condition = request["condition"];
                pageIndex = getAppropriateId(pageIndexs);
                pageSize = getAppropriateId(pageSizes);

                string ssql = "select  row_number() over(order by studentId desc) as rownum,* from fe_student where classId = (select classId from v_classTeacherRs where classTeacherRsId = " + request["id"] + ") and (name like '%" + condition.Trim() + "%' or email like '%" + condition.Trim() + "%' or mobile like '%" + condition.Trim() + "%')";
                string countSql = "select rownum from (" + ssql + ") c ";
                DataTable dtCount = SqlHelper.GetTable(countSql);
                string allSql = "select * from(" + ssql + " ) c where rownum >(" + (pageIndex - 1) * pageSize + ") AND rownum <=(" + pageIndex * pageSize + ")  order by rownum asc ";
                DataTable dtPage = SqlHelper.GetTable(allSql);//获取分页的数据源
                int pageCount = (int)(Math.Ceiling(dtCount.Rows.Count * 1.0 / pageSize));
                result = JSonHelper.DataTableToJsonData(dtPage, true, pageCount, dtCount.Rows.Count);
            }
            catch (Exception ex)
            {
            }
            return result;
        }
        private string getTeacherPhoto(HttpContext context)
        {
            string result = "";
            try
            {
                HttpRequest request = context.Request;
                System.Web.SessionState.HttpSessionState session = context.Session;
                if (session["userId"] == null)
                {
                    return "go_login";
                }
                StringBuilder sql = new StringBuilder();
                sql.Append("select teacherId from fe_teacher where adminId = " + session["userId"]);
                DataTable dt = SqlHelper.GetTable(sql.ToString());
                string teacherId = "0";
                if (dt.Rows.Count > 0)
                {
                    teacherId = dt.Rows[0][0].ToString();
                }


                string pageIndexs = request["pageIndex"];
                string pageSizes = request["pageSize"];
                int resourceExt = 7;


                pageIndex = getAppropriateId(pageIndexs);
                pageSize = getAppropriateId(pageSizes);

                string ssql = " select row_number() over(order by studioResourceId desc) as rownum, studioResourceId,name resourceName,iconPath,mobileIconPath,convert(varchar(19),isnull(modifyTime, insertTime) ,120) publishDate,videoId,note,resourcePath from fe_studioResource "
                            + " where 1=1 and resourceExt = " + resourceExt + " and inserter= '" + teacherId + "'";
                string countSql = "select rownum from (" + ssql + ") c ";
                DataTable dtCount = SqlHelper.GetTable(countSql);
                string allSql = "select * from(" + ssql + " ) c where rownum >(" + (pageIndex - 1) * pageSize + ") AND rownum <=(" + pageIndex * pageSize + ")  order by rownum asc ";
                LogOper.writeLog("getTeacherVideo allSql=" + allSql);
                DataTable dtPage = SqlHelper.GetTable(allSql);//获取分页的数据源
                int pageCount = (int)(Math.Ceiling(dtCount.Rows.Count * 1.0 / pageSize));
                result = JSonHelper.DataTableToJsonData(dtPage, true, pageCount, dtCount.Rows.Count);
            }
            catch (Exception ex)
            {
            }
            return result;
        }
        private string getStudentQuestion(HttpContext context)
        {
            string result = "";
            string ssql = "";
            string readstate = "";
            try
            {
                HttpRequest request = context.Request;
                System.Web.SessionState.HttpSessionState session = context.Session;
                if (session["userId"] == null)
                {
                    return "go_login";
                }
                StringBuilder sql = new StringBuilder();
                sql.Append("select teacherId from fe_teacher where adminId = " + session["userId"]);
                DataTable dt = SqlHelper.GetTable(sql.ToString());
                string teacherId = "0";
                if (dt.Rows.Count > 0)
                {
                    teacherId = dt.Rows[0][0].ToString();
                }

                string pageIndexs = request["pageIndex"];
                string pageSizes = request["pageSize"];
                readstate = request["readstate"];
                string replystate = request["replystate"];
                string coursename = request["courseName"];
                string date = request["date"];
                
                pageIndex = getAppropriateId(pageIndexs);
                pageSize = getAppropriateId(pageSizes);

                string com = "";
                if (readstate != "" && readstate !=null)
                {
                    com += " and readstates = " + readstate;
                }

                if (replystate != "" && replystate != null)
                {
                    com += " and replystates = " + replystate;
                }

                if (coursename != "" && coursename != null)
                {
                    com += " and coursename like '%" + coursename + "%'";
                }

                if (date != "" && date != null)
                {
                    com += " and convert(varchar(10),Time,120) = '" + date + "'";
                }

                ssql = " select row_number() over(order by questionId desc) as rownum,questionId,content,courseId,questionerId,questionerType,teacherId,studentname,coursename,replystates,[Time],reply,teachername,readstatesforT,readstatesforS,isShowforT,isShowforS,isShowforP from v_question where teacherId = " + teacherId + com + " union   select  row_number() over(order by questionId desc) as rownum,questionId,content,courseId,questionerId,questionerType,teacherId,studentname,coursename,replystates,[Time],reply,teachername,readstatesforT,readstatesforS,isShowforT,isShowforS,isShowforP from v_questionforParent where teacherId =" + teacherId + com;
                           
                string countSql = "select rownum from (" + ssql + ") c ";
                DataTable dtCount = SqlHelper.GetTable(countSql);
                string allSql = "select * from(" + ssql + " ) c where rownum >(" + (pageIndex - 1) * pageSize + ") AND rownum <=(" + pageIndex * pageSize + ")  order by rownum asc ";
                
                DataTable dtPage = SqlHelper.GetTable(allSql);//获取分页的数据源
                int pageCount = (int)(Math.Ceiling(dtCount.Rows.Count * 1.0 / pageSize));
                result = JSonHelper.DataTableToJsonData(dtPage, true, pageCount, dtCount.Rows.Count);
            }
            catch (Exception ex)
            {
                result = ex.ToString();
            }
            return result;
        }
        private string getTeacherVideo(HttpContext context)
        {
            string result = "";
            try
            {
                HttpRequest request = context.Request;
                System.Web.SessionState.HttpSessionState session = context.Session;
                if (session["userId"] == null)
                {
                    return "go_login";
                }
                StringBuilder sql = new StringBuilder();
                sql.Append("select teacherId from fe_teacher where adminId = " + session["userId"]);
                DataTable dt = SqlHelper.GetTable(sql.ToString());
                string teacherId = "0";
                if (dt.Rows.Count > 0)
                {
                    teacherId = dt.Rows[0][0].ToString();
                }
                
               
                string pageIndexs = request["pageIndex"];
                string pageSizes = request["pageSize"];
                int resourceExt = 6;
                
                
                pageIndex = getAppropriateId(pageIndexs);
                pageSize = getAppropriateId(pageSizes);

                string ssql = " select row_number() over(order by studioResourceId desc) as rownum, studioResourceId,name resourceName,iconPath,mobileIconPath,convert(varchar(19),isnull(modifyTime, insertTime) ,120) publishDate,videoId,note,resourcePath from fe_studioResource "
                            + " where 1=1 and resourceExt = " + resourceExt + " and inserter= '" + teacherId + "'";
                string countSql = "select rownum from (" + ssql + ") c ";
                DataTable dtCount = SqlHelper.GetTable(countSql);
                string allSql = "select * from(" + ssql + " ) c where rownum >(" + (pageIndex - 1) * pageSize + ") AND rownum <=(" + pageIndex * pageSize + ")  order by rownum asc ";
                LogOper.writeLog("getTeacherVideo allSql=" + allSql);
                DataTable dtPage = SqlHelper.GetTable(allSql);//获取分页的数据源
                int pageCount = (int)(Math.Ceiling(dtCount.Rows.Count * 1.0 / pageSize));
                result = JSonHelper.DataTableToJsonData(dtPage, true, pageCount, dtCount.Rows.Count);
            }
            catch (Exception ex)
            {
            }
            return result;
        }
        private string showTeacherGradeList(HttpContext context)
        {
            string result = "";
            System.Web.SessionState.HttpSessionState session = context.Session;
            try
            {
                string condition = "";
                if (session["organId"] != null && session["roleId"] != null)
                {
                    int count = 0;
                    if (session["roleId"].ToString() != "1")
                    {
                        condition = " and organId = 0 or organId = " + session["organId"].ToString();
                    }
                    //获取分页的数据源 
                    DataTable dtPage = SqlHelper.GetTable("select * from fe_teacherGrade where 1=1 " + condition);
                    //获取数据源
                    //DataTable dtCount = SqlHelper.GetTable("select count(1) from v_teacherGrade ");
                    //将数据转换成json格式
                    count = dtPage.Rows.Count;
                    result = JSonHelper.DataTableToJsonData(dtPage, true, count);
                }
               
            }
            catch
            {
                result = "Error";
            }
            return result;
        }
        private string getDynum(HttpContext context)
        {
            string result = "";
            System.Web.SessionState.HttpSessionState session = context.Session;
            try
            {
                if (session["userId"] == null)
                {
                    return "go_login";
                }
                StringBuilder tsql = new StringBuilder();
                tsql.Append("select teacherId from fe_teacher where adminId = " + session["userId"]);
                DataTable dt = SqlHelper.GetTable(tsql.ToString());
                string teacherId = "0";
                if (dt.Rows.Count > 0)
                {
                    teacherId = dt.Rows[0][0].ToString();
                }
                
                StringBuilder sql = new StringBuilder();
                sql.Append("select count(1) as num from fe_question where states = 2 and teacherId  = " + teacherId);

                DataTable dtPage = SqlHelper.GetTable(sql.ToString());

                //将数据转换成json格式
                result = JSonHelper.DataTableToJsonData(dtPage, true, Convert.ToInt32(dtPage.Rows.Count));

            }
            catch
            {
                result = "Error";
            }
            return result;
        }
        private string showGradeList(HttpContext context)
        {
            string result = "";
            try
            {
                //获取分页的数据源 
                DataTable dtPage = SqlHelper.Proc_Table(int.Parse("9999"), int.Parse("1"), "v_gradeList", "gradeId");
                //获取数据源
                DataTable dtCount = SqlHelper.GetTable("select count(1) from v_gradeList ");
                //将数据转换成json格式
                result = JSonHelper.DataTableToJsonData(dtPage, true, Convert.ToInt32(dtCount.Rows[0][0]));
            }
            catch
            {
                result = "Error";
            }
            return result;
        }
        private string showSubjectList(HttpContext context)
        {
            string result = "";
            try
            {
                //获取分页的数据源 
                DataTable dtPage = SqlHelper.Proc_Table(int.Parse("9999"), int.Parse("1"), "v_subject", "subjectId");
                //获取数据源
                DataTable dtCount = SqlHelper.GetTable("select count(1) from v_subject ");
                //将数据转换成json格式
                result = JSonHelper.DataTableToJsonData(dtPage, true, Convert.ToInt32(dtCount.Rows[0][0]));
            }
            catch
            {
                result = "Error";
            }
            return result;
        }
        private string showEducationalLevelList(HttpContext context)
        {
            string result = "";
            try
            {
                //获取分页的数据源 
                DataTable dtPage = SqlHelper.Proc_Table(int.Parse("9999"), int.Parse("1"), "v_educationalLevelList", "educationalLevelId");
                //获取数据源
                DataTable dtCount = SqlHelper.GetTable("select count(1) from v_educationalLevelList ");
                //将数据转换成json格式
                result = JSonHelper.DataTableToJsonData(dtPage, true, Convert.ToInt32(dtCount.Rows[0][0]));
            }
            catch
            {
                result = "Error";
            }
            return result;
        }
        private string showEducationalList(HttpContext context)
        {
            string result = "";
            try
            {
                //获取分页的数据源 
                DataTable dtPage = SqlHelper.GetTable("select * from fe_educationalLevel where educationPhase > 2 and educationPhase <> 6");
                //获取数据源
                //DataTable dtCount = SqlHelper.GetTable("select count(1) from v_educationalLevelList ");
                //将数据转换成json格式
                result = JSonHelper.DataTableToJsonData(dtPage, true, dtPage.Rows.Count);
            }
            catch
            {
                result = "Error";
            }
            return result;
        }
        private string showClassList(HttpContext context)
        {
            string result = "";
            try
            {
                System.Web.SessionState.HttpSessionState session = context.Session;
                if (session["userId"] == null)
                {
                    return "go_login";
                }

                StringBuilder sql = new StringBuilder();
                sql.Append("select teacherId from fe_teacher where adminId = " + session["userId"]);
                DataTable dtPage = SqlHelper.GetTable(sql.ToString());
                string teacherId = "0";
                if (dtPage.Rows.Count > 0)
                {
                    teacherId = dtPage.Rows[0][0].ToString();
                }
                
                //获取分页的数据源 
                DataTable dt = SqlHelper.GetTable("select * from fe_class where organId = (select organId from fe_teacher where teacherId = " + teacherId + ")");
                //获取数据源
                //DataTable dtCount = SqlHelper.GetTable("select count(1) from v_gradeList ");
                //将数据转换成json格式
                result = JSonHelper.DataTableToJsonData(dt, true,dt.Rows.Count);
            }
            catch
            {
                result = "Error";
            }
            return result;
        }
        private string showOrganList(HttpContext context)
        {
            string result = "";
            System.Web.SessionState.HttpSessionState session = context.Session;
            HttpRequest request = HttpContext.Current.Request;
            try
            {
                string condition = "";
                if (request["organType"] != null && request["organType"] != "")
                {
                    condition = " AND organType = " + request["organType"].ToString();
                }
                else
                {
                    condition = " AND organType = 1 or organType = 2";
                }
                if (request["search_content"] != null)
                {
                    condition += " and ( name like '%" + request["search_content"] + "%' or spellCode like '%" + request["search_content"] + "%' ) ";
                }
                //获取分页的数据源 
                DataTable dtPage = SqlHelper.Proc_Table_condition(int.Parse("199999"), int.Parse("1"), "v_organList", "spellCode", "asc", condition);
                //获取数据源
                DataTable dtCount = SqlHelper.GetTable("select count(1) from v_organList ");
                //将数据转换成json格式
                result = JSonHelper.DataTableToJsonData(dtPage, true, Convert.ToInt32(dtPage.Rows.Count));
            }
            catch
            {
                result = "Error";
            }
            return result;
        }
        private string showOrganListByCity(HttpContext context)
        {
            string result = "";
            System.Web.SessionState.HttpSessionState session = context.Session;
            HttpRequest request = HttpContext.Current.Request;
            try
            {
                StringBuilder sql = new StringBuilder();
                sql.Append("select * from v_organList where organType = 1 and cityId = " + request["cityId"]);

                DataTable dtPage = SqlHelper.GetTable(sql.ToString());
                
                //将数据转换成json格式
                result = JSonHelper.DataTableToJsonData(dtPage, true, Convert.ToInt32(dtPage.Rows.Count));
            }
            catch
            {
                result = "Error";
            }
            return result;
        }
        private string showClassListByOrgan(HttpContext context)
        {
            string result = "";
            System.Web.SessionState.HttpSessionState session = context.Session;
            HttpRequest request = HttpContext.Current.Request;
            try
            {
                StringBuilder sql = new StringBuilder();
                sql.Append("select * from v_class where organId = " + request["organId"]);

                DataTable dtPage = SqlHelper.GetTable(sql.ToString());

                //将数据转换成json格式
                result = JSonHelper.DataTableToJsonData(dtPage, true, Convert.ToInt32(dtPage.Rows.Count));
            }
            catch
            {
                result = "Error";
            }
            return result;
        }
        private string showProvinceList(HttpContext context)
        {
            string result = "";
            try
            {
                //获取分页的数据源 
                DataTable dtPage = SqlHelper.Proc_Table(int.Parse("199999"), int.Parse("1"), "v_province", "provinceId");
                //获取数据源
                DataTable dtCount = SqlHelper.GetTable("select count(1) from v_province ");
                //将数据转换成json格式
                result = JSonHelper.DataTableToJsonData(dtPage, true, Convert.ToInt32(dtCount.Rows[0][0]));
            }
            catch
            {
                result = "Error";
            }
            return result;
        }
        private string showSelectCityList(HttpContext context)
        {
            string result = "";
            try
            {
                //获取分页的数据源 
                DataTable dtPage = SqlHelper.Proc_Table(int.Parse("199999"), int.Parse("1"), "v_city", "cityId");
                //获取数据源
                DataTable dtCount = SqlHelper.GetTable("select count(1) from v_city ");
                //将数据转换成json格式
                result = JSonHelper.DataTableToJsonData(dtPage, true, Convert.ToInt32(dtCount.Rows[0][0]));
            }
            catch
            {
                result = "Error";
            }
            return result;
        }
        private string showSelectDistrictList(HttpContext context)
        {
            string result = "";
            try
            {
                //获取分页的数据源 
                DataTable dtPage = SqlHelper.Proc_Table(int.Parse("199999"), int.Parse("1"), "v_district", "districtId");
                //获取数据源
                DataTable dtCount = SqlHelper.GetTable("select count(1) from v_district ");
                //将数据转换成json格式
                result = JSonHelper.DataTableToJsonData(dtPage, true, Convert.ToInt32(dtCount.Rows[0][0]));
            }
            catch
            {
                result = "Error";
            }
            return result;
        }
        private string showCityList(HttpContext context)
        {
            string result = "";
            try
            {
                HttpRequest request = HttpContext.Current.Request;
                StringBuilder sql = new StringBuilder();
                sql.Append("select * from fe_city");

                DataTable dtPage = SqlHelper.GetTable(sql.ToString());
                //将数据转换成json格式
                result = JSonHelper.DataTableToJsonData(dtPage, true, Convert.ToInt32(dtPage.Rows.Count));
            }
            catch
            {
                result = "Error";
            }
            return result;
        }
        private string showDistrictList(HttpContext context)
        {
            string result = "";
            try
            {
                HttpRequest request = HttpContext.Current.Request;
                StringBuilder sql = new StringBuilder();
                sql.Append("select * from fe_district where cityId = " + request["cityId"]);

                DataTable dtPage = SqlHelper.GetTable(sql.ToString());
                //将数据转换成json格式
                result = JSonHelper.DataTableToJsonData(dtPage, true, Convert.ToInt32(dtPage.Rows.Count));

            }
            catch
            {
                result = "Error";
            }
            return result;
        }
        private string formDataUpload(HttpContext context)
        {
            try
            {
                return UploadHandlers.formDataUpload(context);
            }
            catch
            {
                return "文件错误";
            }
        }
        private string formDataUploadNew(HttpContext context)
        {
            try
            {
                return UploadHandlers.formDataUpload(context);
            }
            catch(Exception ex)
            {
                return "文件错误";
            }
        }
        private string getTeachingProcessByTeacherId(HttpContext context)
        {
            HttpRequest request = HttpContext.Current.Request;
            StringBuilder sql = new StringBuilder();
            System.Web.SessionState.HttpSessionState session = context.Session;
            string result = "[{}]";
            if (session["userId"] != null)
            {
                try
                {
                    string adminId = session["userId"].ToString();
                    string ssql = "select tp.teachingProcessId, tp.teacherId, year(tp.beginDate) beginYear,month(tp.beginDate) beginMonth,year(tp.endDate) endYear,month(tp.endDate) endMonth,convert(varchar(10),tp.beginDate,120) beginDate, convert(varchar(10),tp.endDate,120)  endDate,tp.note, tp.experience from fe_teachingProcess tp inner join fe_teacher t ON  tp.teacherId = t.teacherId "
                                + " where t.adminId='" + adminId + "' ";
                    DataTable dt = SqlHelper.GetTable(ssql);
                    result = JSonHelper.DataTableToJson(dt);
                }
                catch (Exception ex)
                {
                }
            }
            else
            {
                result = "go_login";
            }
            return result;
        }
        private string outSideStuodio(HttpContext context)
        {
            string result = "";
            HttpRequest request = context.Request;
            System.Web.SessionState.HttpSessionState session = context.Session;
            if (session["userId"] == null)
            {
                return "go_login";
            }
            string saveTag = request["tag"].ToString();

            string studioIds = request["studioRsId"].ToString();
            int studioId = 0;
            int.TryParse(studioIds, out studioId);

            int dataOper = GetDataOperType(saveTag);
            int errorCode = 0;
            try
            {
                List<SqlParameter> sqlparm = new List<SqlParameter>();
                sqlparm.Add(new SqlParameter("@studioTeacherRsId", studioId));
                sqlparm.Add(new SqlParameter("@organId", session["organId"]));
                sqlparm.Add(new SqlParameter("@teacherId", session["userId"]));
                sqlparm.Add(new SqlParameter("@inserter", session["userId"]));
                sqlparm.Add(new SqlParameter("@saveTag", dataOper + 1));
                sqlparm.Add(new SqlParameter("@errorCode", errorCode));
                sqlparm.Add(new SqlParameter("@errorMessage", SqlDbType.VarChar, 100));
                string[] sResult = new string[] { "@errorMessage" };
                result = SqlHelper.ExecProcedure("proc_fe_studioTeacherRs_Save", sqlparm.ToArray(), sResult, '|');
            }
            catch (Exception ex)
            {
                result = ex.Message.ToString();
            }
            return result;
        }
        private string saveTeacherCenter(HttpContext context)
        {
            string result = "";
            HttpRequest request = context.Request;
            System.Web.SessionState.HttpSessionState session = context.Session;
            if (session["userId"] == null)
            {
                return "go_login";
            }
            string saveTag = request["tag"].ToString();
            
            string studioResourceIds = request["studioResourceId"].ToString();
            int studioResourceId = 0;
            int.TryParse(studioResourceIds, out studioResourceId);

            int dataOper = GetDataOperType(saveTag);
            int errorCode = 0;
            try
            {
                List<SqlParameter> sqlparm = new List<SqlParameter>();
                sqlparm.Add(new SqlParameter("@studioResourceId", studioResourceId));
                sqlparm.Add(new SqlParameter("@organId", session["organId"]));
                sqlparm.Add(new SqlParameter("@Name", request["title"]));
                sqlparm.Add(new SqlParameter("@title", request["title"]));
                sqlparm.Add(new SqlParameter("@iconPath", request["photo"]));
                sqlparm.Add(new SqlParameter("@resourceExt", "7"));
                sqlparm.Add(new SqlParameter("@videoId", request["videoId"]));
                sqlparm.Add(new SqlParameter("@resourcePath", ""));
                sqlparm.Add(new SqlParameter("@inserter", session["userId"]));
                sqlparm.Add(new SqlParameter("@saveTag", dataOper + 1));
                sqlparm.Add(new SqlParameter("@errorCode", errorCode));
                sqlparm.Add(new SqlParameter("@errorMessage", SqlDbType.VarChar, 100));
                string[] sResult = new string[] { "@errorMessage" };
                result = SqlHelper.ExecProcedure("proc_fe_teacherCenter_Save", sqlparm.ToArray(), sResult, '|');
            }
            catch (Exception ex)
            {
                result = ex.Message.ToString();
            }
            return result;
        }
        private string saveTeacher(HttpContext context)
        {
            string result = "";
            HttpRequest request = context.Request;
            System.Web.SessionState.HttpSessionState session = context.Session;
            if (session["userId"] == null)
            {
                return "go_login";
            }
            string saveTag = request["tag"].ToString();
            string teacherIds = request["teacherId"];
            Int64 teacherId = 0;
            Int64.TryParse(teacherIds, out teacherId);

            string ofSchoolAges = request["ofSchoolAge"];
            Int64 ofSchoolAge = 0;
            Int64.TryParse(ofSchoolAges, out ofSchoolAge);

            string password = getMd5EncryptPassword(request["teacherpassword"]);
            int dataOper = GetDataOperType(saveTag);
            int errorCode = 0;
            try
            {
                List<SqlParameter> sqlparm = new List<SqlParameter>();
                sqlparm.Add(new SqlParameter("@teacherId", teacherId));
                sqlparm.Add(new SqlParameter("@educationalLevelId", request["educationalLevelId"]));
                sqlparm.Add(new SqlParameter("@subjectId", request["subjectId"]));
                sqlparm.Add(new SqlParameter("@organId", request["organId"]));
                sqlparm.Add(new SqlParameter("@gradeId", request["gradeId"]));
                sqlparm.Add(new SqlParameter("@teacherGradeId", request["teacherGradeId"]));
                sqlparm.Add(new SqlParameter("@code", request["code"]));
                sqlparm.Add(new SqlParameter("@name", request["teachername"]));
                sqlparm.Add(new SqlParameter("@nickName", request["nickName"]));
                sqlparm.Add(new SqlParameter("@password", password));
                sqlparm.Add(new SqlParameter("@sex", request["sex"]));
                sqlparm.Add(new SqlParameter("@birthDay", request["birthDay"]));
                sqlparm.Add(new SqlParameter("@mobile", request["mobile"]));
                sqlparm.Add(new SqlParameter("@email", request["email"]));
                sqlparm.Add(new SqlParameter("@provinceId", request["provinceId"]));
                sqlparm.Add(new SqlParameter("@cityId", request["cityId"]));
                sqlparm.Add(new SqlParameter("@districtId", request["districtId"]));
                sqlparm.Add(new SqlParameter("@address", request["address"]));
                sqlparm.Add(new SqlParameter("@iconPath", request["iconPath"]));
                sqlparm.Add(new SqlParameter("@mobileIconPath", request["mobileIconPath"]));
                sqlparm.Add(new SqlParameter("@certificationIconPath", request["certificationIconPath"]));
                sqlparm.Add(new SqlParameter("@idPhoto", request["idPhoto"]));
                sqlparm.Add(new SqlParameter("@educationalLevelPhoto", request["educationalLevelPhoto"]));
                sqlparm.Add(new SqlParameter("@handHoldPhoto", request["handHoldPhoto"]));
                sqlparm.Add(new SqlParameter("@introduce", request["introduce"]));
                sqlparm.Add(new SqlParameter("@note", request["note"]));
                sqlparm.Add(new SqlParameter("@ofSchoolAge", ofSchoolAge));
                sqlparm.Add(new SqlParameter("@isHottest", request["isHottest"]));
                sqlparm.Add(new SqlParameter("@inserter", session["userId"]));
                sqlparm.Add(new SqlParameter("@saveTag", dataOper + 1));
                sqlparm.Add(new SqlParameter("@errorCode", errorCode));
                sqlparm.Add(new SqlParameter("@errorMessage", SqlDbType.VarChar, 100));
                string[] sResult = new string[] { "@errorMessage" };
                result = SqlHelper.ExecProcedure("proc_fe_teacher_Save", sqlparm.ToArray(), sResult, '|');
            }
            catch (Exception ex)
            {
                result = ex.Message.ToString();
            }

            return result;

        }
        private string updateTeacherState(HttpContext context)
        {
            string result = "";
            HttpRequest request = context.Request;
            System.Web.SessionState.HttpSessionState session = context.Session;
            if (session["userId"] == null)
            {
                return "go_login";
            }
            string teacherIds = request["teacherId"];
            Int64 teacherId = 0;
            Int64.TryParse(teacherIds, out teacherId);
            int errorCode = 0;
            try
            {
                List<SqlParameter> sqlparm = new List<SqlParameter>();
                sqlparm.Add(new SqlParameter("@teacherId", teacherId));
                sqlparm.Add(new SqlParameter("@auditState", "1"));
                sqlparm.Add(new SqlParameter("@auditorId", session["userId"]));
                sqlparm.Add(new SqlParameter("@errorCode", errorCode));
                sqlparm.Add(new SqlParameter("@errorMessage", SqlDbType.VarChar, 100));
                string[] sResult = new string[] { "@errorMessage" };
                result = SqlHelper.ExecProcedure("proc_fe_teacherState_Update", sqlparm.ToArray(), sResult, '|');
            }
            catch (Exception ex)
            {
                result = ex.Message.ToString();
            }
            return result;
        }
        
        /// <summary>
        /// 教师基本信息保存
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        private string teacherBasicInfoSave(HttpContext context)
        {
            string result = "[{}]";
            try
            {
                System.Web.SessionState.HttpSessionState session = context.Session;
                if (session["userId"] == null)
                {
                    return "go_login";
                }
                
                HttpRequest request = context.Request;
                string saveTag = request["saveTag"];

                StringBuilder sql = new StringBuilder();
                sql.Append("select teacherId from fe_teacher where adminId = " + session["userId"]);
                DataTable dtPage = SqlHelper.GetTable(sql.ToString());
                string teacherId = "0";
                if(dtPage.Rows.Count>0)
                {
                    teacherId = dtPage.Rows[0][0].ToString();
                }
                
                int dataOper = GetDataOperType(saveTag) + 1;
                int errorCode = 0;
                List<SqlParameter> sqlparm = new List<SqlParameter>();
                sqlparm.Add(new SqlParameter("@teacherId", teacherId));
                sqlparm.Add(new SqlParameter("@name", request["username"]));
                sqlparm.Add(new SqlParameter("@nickName", request["usernickname"]));
                sqlparm.Add(new SqlParameter("@sex", request["sex"]));
                sqlparm.Add(new SqlParameter("@introduce", request["introduce"]));
                sqlparm.Add(new SqlParameter("@autograph", request["autograph"]));
                sqlparm.Add(new SqlParameter("@saveTag", dataOper));
                sqlparm.Add(new SqlParameter("@errorCode", errorCode));
                sqlparm.Add(new SqlParameter("@errorMessage", SqlDbType.VarChar, 100));

                string[] sOut = new string[3];
                sOut[0] = "@teacherId";
                sOut[1] = "@errorCode";
                sOut[2] = "@errorMessage";
                result = SqlHelper.ExecProcedure("proc_fe_teacherBasicInfo_Save", sqlparm.ToArray(), sOut, '|');
                string[] sResult = result.Split('|');
                string errorCodes = sResult[1];
                errorCode = getAppropriateId(errorCodes, true);
                if (errorCode == 0)
                    result = ((int)UpdateInfo.success).ToString();
                else
                    result = ((int)UpdateInfo.failure).ToString();
            }
            catch (Exception ex)
            {
            }
            return result;
        }
        private string teacherRemindWork(HttpContext context)
        {
            string result = "[{}]";
            HttpRequest request = context.Request;
            System.Web.SessionState.HttpSessionState session = context.Session;
            try
            {
                if (session["userId"] == null)
                {
                    session["userId"] = HttpContext.Current.Request.Cookies["userId"].Value;
                    if (session["userId"] == null)
                    {
                        return "go_login";
                    }
                }
                StringBuilder sql = new StringBuilder();
                sql.Append("select teacherId from fe_teacher where adminId = " + session["userId"]);
                DataTable dtPage = SqlHelper.GetTable(sql.ToString());
                string teacherId = "0";
                if (dtPage.Rows.Count > 0)
                {
                    teacherId = dtPage.Rows[0][0].ToString();
                }

                string systemNoticeIds = request["systemNoticeId"];
                Int64 systemNoticeId = 0;
                Int64.TryParse(systemNoticeIds, out systemNoticeId);
                
                string studentId = request["studentId"];
                int errorCode = 0;
                List<SqlParameter> sqlparm = new List<SqlParameter>();
                sqlparm.Add(new SqlParameter("@systemNoticeId", systemNoticeId));
                sqlparm.Add(new SqlParameter("@title", "作业提醒"));
                sqlparm.Add(new SqlParameter("@content", "请尽快完成作业"));
                sqlparm.Add(new SqlParameter("@noticeType", "4"));
                sqlparm.Add(new SqlParameter("@accepterId", studentId));
                sqlparm.Add(new SqlParameter("@accepterType", "1"));
                sqlparm.Add(new SqlParameter("@inserter", teacherId));
                sqlparm.Add(new SqlParameter("@inserterRole", "2"));
                sqlparm.Add(new SqlParameter("@isShow", "1"));
                sqlparm.Add(new SqlParameter("@errorCode", errorCode));
                sqlparm.Add(new SqlParameter("@errorMessage", SqlDbType.VarChar, 100));

                string[] sOut = new string[3];
                sOut[0] = "@systemNoticeId";
                sOut[1] = "@errorCode";
                sOut[2] = "@errorMessage";
                result = SqlHelper.ExecProcedure("proc_teacherRemindWork_Save", sqlparm.ToArray(), sOut, '|');
                string[] sResult = result.Split('|');
                string errorCodes = sResult[1];
                errorCode = getAppropriateId(errorCodes, true);
                if (errorCode == 0)
                    result = ((int)UpdateInfo.success).ToString();
                else
                    result = ((int)UpdateInfo.failure).ToString();
            }
            catch(Exception ex)
            {
                result = ex.ToString();
            }
            return result;
        }
        private string getStudioTeacherRs(HttpContext context)
        {
            string result = "";
            HttpRequest request = HttpContext.Current.Request;
            System.Web.SessionState.HttpSessionState session = context.Session;
            try
            {
                if (session["userId"] == null)
                {
                    session["userId"] = HttpContext.Current.Request.Cookies["userId"].Value;
                    if (session["userId"] == null)
                    {
                        return "go_login";
                    }
                }
                StringBuilder tsql = new StringBuilder();
                tsql.Append("select teacherId from fe_teacher where adminId = " + session["userId"]);
                DataTable dtt = SqlHelper.GetTable(tsql.ToString());
                string teacherId = "0";
                if (dtt.Rows.Count > 0)
                {
                    teacherId = dtt.Rows[0][0].ToString();
                }
                string condition = request["keyword"];
                string state = request["state"];
                string stateCom = "";
                if(state != "")
                {
                    stateCom = " and auditState = " + state;
                }
                
                string pageIndexs = request["pageIndex"];
                string pageSizes = request["pageSize"];
                pageIndex = getAppropriateId(pageIndexs);
                pageSize = getAppropriateId(pageSizes);

                string ssql = "select row_number() over(order by studioTeacherRsId desc) as rownum,* from v_studioTeacherRs where inserter <> " + teacherId + " and name like '%" + condition + "%' and  teacherId = " + teacherId + stateCom;
                string allSql = "select * from(" + ssql + " ) c where rownum >(" + (pageIndex - 1) * pageSize + ") AND rownum <=(" + pageIndex * pageSize + ") order by rownum desc ";
             
                DataTable dtCount = SqlHelper.GetTable(ssql);
                DataTable dtPage = SqlHelper.GetTable(allSql);//获取分页的数据源
                //DataTable dt = SqlHelper.GetTable(ssql);
                int pageCount = (int)(Math.Ceiling(dtCount.Rows.Count * 1.0 / pageSize));
                result = JSonHelper.DataTableToJsonData(dtPage, true, pageCount, dtCount.Rows.Count);
                
            }
            catch
            {
                 
            }
            return result;
        }
        private string getStudioTeacherRsToMe(HttpContext context)
        {
            string result = "";
            HttpRequest request = HttpContext.Current.Request;
            System.Web.SessionState.HttpSessionState session = context.Session;
            try
            {
                if (session["userId"] == null)
                {
                    return "go_login";
                }
                StringBuilder tsql = new StringBuilder();
                tsql.Append("select teacherId from fe_teacher where adminId = " + session["userId"]);
                DataTable dtt = SqlHelper.GetTable(tsql.ToString());
                string teacherId = "0";
                if (dtt.Rows.Count > 0)
                {
                    teacherId = dtt.Rows[0][0].ToString();
                }
                string time = request["time"];
                string timeCom = "";
                if (time != "")
                {
                    if (time == "0")
                    {
                        timeCom = " and datediff(day,Times,getdate())=0";
                    }
                    else if (time == "1")
                    {
                        timeCom = " and datediff(day,Times,getdate())<= 2 and datediff(day,Times,getdate())>= 0";
                    }
                    else if (time == "2")
                    {
                        timeCom = " and datediff(day,Times,getdate())<= 7 and datediff(day,Times,getdate())>= 0";
                    }
                    else if (time == "3")
                    {
                        timeCom = " and datediff(day,Times,getdate())<= 30 and datediff(day,Times,getdate())>= 0";
                    }
                }
                
                string state = request["state"];
                string stateCom = "";
                if (state != "")
                {
                    stateCom = " and auditState = " + state;
                }

                string pageIndexs = request["pageIndex"];
                string pageSizes = request["pageSize"];
                pageIndex = getAppropriateId(pageIndexs);
                pageSize = getAppropriateId(pageSizes);

                string ssql = "select row_number() over(order by studioTeacherRsId desc) as rownum,* from v_studioTeacherRs where teacherId <> " + teacherId + " and inserter = " + teacherId + stateCom + timeCom;
                string allSql = "select * from(" + ssql + " ) c where rownum >(" + (pageIndex - 1) * pageSize + ") AND rownum <=(" + pageIndex * pageSize + ") order by rownum desc ";

                DataTable dtCount = SqlHelper.GetTable(ssql);
                DataTable dtPage = SqlHelper.GetTable(allSql);//获取分页的数据源
                //DataTable dt = SqlHelper.GetTable(ssql);
                int pageCount = (int)(Math.Ceiling(dtCount.Rows.Count * 1.0 / pageSize));
                result = JSonHelper.DataTableToJsonData(dtPage, true, pageCount, dtCount.Rows.Count);

            }
            catch
            {

            }
            return result;
        }
        private string getQuestionType(HttpContext context)
        {
            string result = "[{}]";
            HttpRequest request = context.Request;
            try
            {
                string knowledgeId = "0";
                string condition = " where 1 = 1";
                if (request["knowledgeId"] != null)
                {
                    knowledgeId = request["knowledgeId"].ToString();
                    condition += "  and knowledgeId = " + knowledgeId + " or parentid = " + knowledgeId + " or LevelOneid = " + knowledgeId;
                }
                string ssql = "select questionTypeId, name from fe_questionType " + condition;
                DataTable dt = SqlHelper.GetTable(ssql);
                result = JSonHelper.DataTableToJsonData(dt, true, 9999, dt.Rows.Count);
                //result = JSonHelper.DataTableToJson(dt);
            }
            catch
            {

            }
            return result;
        }
        private string getNewsQuestionType(HttpContext context)
        {
            string result = "[{}]";
            HttpRequest request = context.Request;
            try
            {
                string knowledgeId = "0";
                string condition = " where 1 = 1";
                if (request["knowledgeId"] != null)
                {
                    knowledgeId = request["knowledgeId"].ToString();
                    condition += "  and knowledgeId = " + knowledgeId + " or parentid = " + knowledgeId + " or LevelOneid = " + knowledgeId;
                }
                string ssql = "select DISTINCT questionTypeId, name from v_new_questions_teacher " + condition;
                DataTable dt = SqlHelper.GetTable(ssql);
                result = JSonHelper.DataTableToJsonData(dt, true, 9999, dt.Rows.Count);
                //result = JSonHelper.DataTableToJson(dt);
            }
            catch
            {

            }
            return result;
        }
        private string getEvaluationNum(HttpContext context)
        {
            string result = "[{}]";
            string ssql = "";
            try
            {
                HttpRequest request = context.Request;
                StringBuilder JsonString = new StringBuilder();

                System.Web.SessionState.HttpSessionState session = context.Session;
                if (session["userId"] == null)
                {
                    return "go_login";
                }
                StringBuilder tsql = new StringBuilder();
                tsql.Append("select teacherId from fe_teacher where adminId = " + session["userId"]);
                DataTable dtt = SqlHelper.GetTable(tsql.ToString());
                string teacherId = "0";
                if (dtt.Rows.Count > 0)
                {
                    teacherId = dtt.Rows[0][0].ToString();
                }

                int courseEvaluationId = 0;
                string courseEvaluationIds = request["courseEvaluationId"];
                int.TryParse(courseEvaluationIds, out courseEvaluationId);

                string valuatorType = request["valuatorType"];
                ssql = "select count(1) as num from fe_courseEvaluation where parentId = " + courseEvaluationId + " and valuatorId= " + teacherId + " and valuatorType = " + valuatorType;
                DataTable dt = SqlHelper.GetTable(ssql);

                string sql = "select evaluation from fe_courseEvaluation where parentId = " + courseEvaluationId + " and valuatorId= " + teacherId + " and valuatorType = " + valuatorType;
                DataTable dt1 = SqlHelper.GetTable(sql);

                if (dt1.Rows.Count > 0)
                {
                }
                JsonString.Append("{\"count\":\"" + dt.Rows[0][0] + "\",\"content\":\"" + dt1.Rows[0][0] + "\"");
                JsonString.Append("}");
                result = JsonString.ToString().Replace("\n", "");

            }
            catch (Exception ex)
            {
                result = ssql;// ex.ToString();
            }
            return result;
        }
        /// <summary>
        /// 教师联系方式保存
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        private string teacherContactInfoSave(HttpContext context)
        {
            string result = "[{}]";
            try
            {
                HttpRequest request = context.Request;
                string saveTag = request["saveTag"];
                System.Web.SessionState.HttpSessionState session = context.Session;
                if (session["userId"] == null)
                {
                    return "go_login";
                }

                StringBuilder sql = new StringBuilder();
                sql.Append("select teacherId from fe_teacher where adminId = " + session["userId"]);
                DataTable dtPage = SqlHelper.GetTable(sql.ToString());
                string teacherId = "0";
                if (dtPage.Rows.Count > 0)
                {
                    teacherId = dtPage.Rows[0][0].ToString();
                }
                
                int dataOper = GetDataOperType(saveTag) + 1;
                int errorCode = 0;
                List<SqlParameter> sqlparm = new List<SqlParameter>();
                sqlparm.Add(new SqlParameter("@teacherId", teacherId));
                sqlparm.Add(new SqlParameter("@qq", request["qq"]));
                sqlparm.Add(new SqlParameter("@email", request["email"]));
                sqlparm.Add(new SqlParameter("@mobile", request["phone"]));
                sqlparm.Add(new SqlParameter("@saveTag", dataOper));
                sqlparm.Add(new SqlParameter("@errorCode", errorCode));
                sqlparm.Add(new SqlParameter("@errorMessage", SqlDbType.VarChar, 100));

                string[] sOut = new string[3];
                sOut[0] = "@teacherId";
                sOut[1] = "@errorCode";
                sOut[2] = "@errorMessage";
                result = SqlHelper.ExecProcedure("proc_fe_teacherContactInfo_Save", sqlparm.ToArray(), sOut, '|');
                string[] sResult = result.Split('|');
                string errorCodes = sResult[1];
                errorCode = getAppropriateId(errorCodes, true);
                if (errorCode == 0)
                    result = ((int)UpdateInfo.success).ToString();
                else
                    result = ((int)UpdateInfo.failure).ToString();
            }
            catch (Exception ex)
            {
            }
            return result;
        }
        /// <summary>
        /// 根据教师Id获取工作室
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        private string showTeachingStudioByTeacherId(HttpContext context)
        {
            string result = "[{}]";
            try
            {
                HttpRequest request = context.Request;
                string ssql = "";
                System.Web.SessionState.HttpSessionState session = context.Session;
                if (session["userId"] == null)
                {
                    return "go_login";
                }

                StringBuilder sql = new StringBuilder();
                sql.Append("select teacherId from fe_teacher where adminId = " + session["userId"]);
                DataTable dtPage = SqlHelper.GetTable(sql.ToString());
                string teacherId = "0";
                if (dtPage.Rows.Count > 0)
                {
                    teacherId = dtPage.Rows[0][0].ToString();
                }

                ssql = "select o.organId teachingStudioId,o.name, o.iconPath  from fe_organ o where organType = 3 and o.inserter=" + teacherId;
                DataTable dt = SqlHelper.GetTable(ssql);
                result = JSonHelper.DataTableToJson(dt);
            }
            catch (Exception ex)
            {
            }
            return result;
        }
        private string getQuestionReply(HttpContext context)
        {
            string result = "[{}]";
            try
            {
                HttpRequest request = context.Request;
                System.Web.SessionState.HttpSessionState session = context.Session;
                if (session["userId"] == null)
                {
                    return "go_login";
                }

                StringBuilder sql = new StringBuilder();
                sql.Append("select teacherId from fe_teacher where adminId = " + session["userId"]);
                DataTable dt = SqlHelper.GetTable(sql.ToString());
                string teacherId = "0";
                if (dt.Rows.Count > 0)
                {
                    teacherId = dt.Rows[0][0].ToString();
                }
                
                int questionId = 0;
                string questionIds = request["questionId"];
                int.TryParse(questionIds, out questionId);


                string readCom = "";
                string readType = request["readType"];
                if (readType != "0" && readType != "" && readType != null)
                {
                    readCom = " and readstatesforT = " + readType;
                }

                string studentCom = "";
                studentCom = " and teacherId = " + teacherId;

                string pageIndexs = request["pageIndex"];
                string pageSizes = request["pageSize"];
                int.TryParse(pageSizes, out pageSize);
                int.TryParse(pageIndexs, out pageIndex);
                if (pageSize <= 0)
                    pageSize = 2;
                if (pageIndex <= 0)
                    pageIndex = 1;

                string questionCom = "";
                if (questionId > 0)
                {
                    questionCom = " and questionId = " + questionId;
                }

                string ssql = "select row_number() over(order by questionReplyId desc) as rownum,* from v_questionReply where 1=1  " + questionCom + readCom + studentCom;
                string allSql = "select * from(" + ssql + " ) c where rownum >(" + (pageIndex - 1) * pageSize + ") AND rownum <=(" + pageIndex * pageSize + ") order by rownum desc ";
                string sssql = "update fe_question set readstatesforT=1,modifyTime=GETDATE() where questionId = " + questionId;
                string ssssql = "update fe_questionReply set readstatesforT=1,modifyTime=GETDATE() where questionId = " + questionId;
                DataTable dtUpdate = SqlHelper.GetTable(sssql);
                dtUpdate = SqlHelper.GetTable(ssssql);
                DataTable dtCount = SqlHelper.GetTable(ssql);
                DataTable dtPage = SqlHelper.GetTable(allSql);//获取分页的数据源
                //DataTable dt = SqlHelper.GetTable(ssql);
                int pageCount = (int)(Math.Ceiling(dtCount.Rows.Count * 1.0 / pageSize));
                result = JSonHelper.DataTableToJsonData(dtPage, true, pageCount, dtCount.Rows.Count);

            }
            catch (Exception ex)
            {
                result = ex.ToString();
            }
            return result;
           
        }
        private string getQuestionReplyList(HttpContext context)
        {
            string result = "[{}]";
            string ssql = "";
            string listSql = "";
            DataTable dtCount;
            try
            {
                HttpRequest request = context.Request;
                System.Web.SessionState.HttpSessionState session = context.Session;
                if (session["userId"] == null)
                {
                    return "go_login";
                }

                StringBuilder sql = new StringBuilder();
                sql.Append("select teacherId from fe_teacher where adminId = " + session["userId"]);
                DataTable dtt = SqlHelper.GetTable(sql.ToString());
                string teacherId = "0";
                if (dtt.Rows.Count > 0)
                {
                    teacherId = dtt.Rows[0][0].ToString();
                }


                string readCom = "";
                string readType = request["readType"];
                if (readType != "0" && readType != "" && readType != null)
                {
                    readCom = " and readstatesforT = " + readType;
                }

                string studentCom = "";
                studentCom = " and teacherId = " + teacherId;

                string pageIndexs = request["pageIndex"];
                string pageSizes = request["pageSize"];
                int.TryParse(pageSizes, out pageSize);
                int.TryParse(pageIndexs, out pageIndex);
                if (pageSize <= 0)
                    pageSize = 2;
                if (pageIndex <= 0)
                    pageIndex = 1;


                ssql = "select  row_number() over(order by questionId desc) as rownum,* from (SELECT * FROM [dbo].[fun_getTeacherQuestionList] (" + teacherId + ",'" + readType + "'))a";
                string allSql = "select * from(" + ssql + " ) c where rownum >(" + (pageIndex - 1) * pageSize + ") AND rownum <=(" + pageIndex * pageSize + ") order by rownum desc ";
                
                dtCount = SqlHelper.GetTable(ssql);
                DataTable dtPage = SqlHelper.GetTable(allSql);//获取分页的数据源
                int pageCount = (int)(Math.Ceiling(dtCount.Rows.Count * 1.0 / pageSize));
                result = JSonHelper.DataTableToJsonData(dtPage, true, pageCount, dtCount.Rows.Count);
                //StringBuilder JsonString = new StringBuilder();
                //if (dtCount.Rows.Count>0)
                //{
                //    int count =0;
                //    if (dtCount.Rows.Count > ((pageIndex * pageSize) - 1))
                //    {
                //        count = ((pageIndex * pageSize) - 1);
                //    }
                //    else
                //    {
                //        count = dtCount.Rows.Count;
                //    }
                //    JsonString.Append("{ ");
                //    JsonString.Append("\"totalCount\":");
                //    JsonString.Append(dtCount.Rows.Count);
                //    JsonString.Append(",");
                //    JsonString.Append("\"totalPageCount\":");
                //    JsonString.Append(pageCount);
                //    JsonString.Append(",");
                //    JsonString.Append("\"rows\":[ ");
                //    for (int i = ((pageIndex - 1) * pageSize); i < count; i++)
                //    {
                //        listSql = "select * from v_questionReply where isShow = 1 and questionerId = " + dtCount.Rows[i][0] + " and replyOrQuestion = 1 and insertTime = (select max(insertTime) from v_questionReply where questionerId = " + dtCount.Rows[i][0] + ")";
                //        DataTable dt = SqlHelper.GetTable(listSql);
                //        if (dt.Rows.Count > 0)
                //        {
                //            JsonString.Append("{\"questionReplyId\":\"" + dt.Rows[0]["questionReplyId"] + "\",\"questionId\":\"" + dt.Rows[0]["questionId"] + "\",\"replycontent\":\"" + dt.Rows[0]["replycontent"] + "\",\"replyOrQuestion\":\"" + dt.Rows[0]["replyOrQuestion"] + "\",\"coursename\":\"" + dt.Rows[0]["coursename"] + "\",\"classname\":\"" + dt.Rows[0]["classname"] + "\",\"Time\":\"" + dt.Rows[0]["Time"] + "\",\"studentId\":\"" + dt.Rows[0]["studentId"] + "\",\"studentname\":\"" + dt.Rows[0]["studentname"] + "\",\"readstatesforT\":\"" + dt.Rows[0]["readstatesforT"] + "\",\"parentname\":\"" + dt.Rows[0]["parentname"] + "\",\"teacherId\":\"" + dt.Rows[0]["teacherId"] + "\",\"parentId\":\"" + dt.Rows[0]["parentId"] + "\"},");
                //        }
                //    }
                //    JsonString.Remove(JsonString.ToString().LastIndexOf(','), 1);
                //    JsonString.Append("]}");

                //}
                //result = JsonString.ToString().Replace("\n", "");

            }
            catch (Exception ex)
            {
                result = ex.ToString();
            }
            return result;

        }
        /// <summary>
        /// 教师背景保存
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        private string teacherBackgroundInfoSave(HttpContext context)
        {
            string result = "[{}]";
            try
            {
                HttpRequest request = context.Request;
                System.Web.SessionState.HttpSessionState session = context.Session;
                if (session["userId"] == null)
                {
                    return "go_login";
                }

                StringBuilder sql = new StringBuilder();
                sql.Append("select teacherId from fe_teacher where adminId = " + session["userId"]);
                DataTable dtPage = SqlHelper.GetTable(sql.ToString());
                string teacherId = "0";
                if (dtPage.Rows.Count > 0)
                {
                    teacherId = dtPage.Rows[0][0].ToString();
                }
                string saveTag = request["saveTag"];
               

                int dataOper = GetDataOperType(saveTag) + 1;
                int errorCode = 0;
                List<SqlParameter> sqlparm = new List<SqlParameter>();
                sqlparm.Add(new SqlParameter("@teacherId", teacherId));
                sqlparm.Add(new SqlParameter("@ofSchoolAge", request["seniority"]));
                sqlparm.Add(new SqlParameter("@organId", request["schoolSelect"]));
                sqlparm.Add(new SqlParameter("@educationalLevelId", request["educationalSelect"]));
                sqlparm.Add(new SqlParameter("@gradeId", request["gradeSelect"]));
                sqlparm.Add(new SqlParameter("@subjectId", request["subjectSelect"]));
                sqlparm.Add(new SqlParameter("@teacherGradeId", request["teacherGradeSelect"]));
                sqlparm.Add(new SqlParameter("@saveTag", dataOper));
                sqlparm.Add(new SqlParameter("@errorCode", errorCode));
                sqlparm.Add(new SqlParameter("@errorMessage", SqlDbType.VarChar, 100));

                string[] sOut = new string[3];
                sOut[0] = "@teacherId";
                sOut[1] = "@errorCode";
                sOut[2] = "@errorMessage";
                result = SqlHelper.ExecProcedure("proc_fe_teacherBackgroundInfo_Save", sqlparm.ToArray(), sOut, '|');
                string[] sResult = result.Split('|');
                string errorCodes = sResult[1];
                errorCode = getAppropriateId(errorCodes, true);
                if (errorCode == 0)
                    result = ((int)UpdateInfo.success).ToString();
                else
                    result = ((int)UpdateInfo.failure).ToString();
            }
            catch (Exception ex)
            {
            }
            return result;
        }
        private string retrievalUserPassword(HttpContext context)
        {
            string result = "";
            HttpRequest request = HttpContext.Current.Request;
            try
            {
                System.Web.SessionState.HttpSessionState session = context.Session;
                if (session["userId"] == null)
                {
                    return "go_login";
                }

                StringBuilder sql = new StringBuilder();
                sql.Append("select teacherId from fe_teacher where adminId = " + session["userId"]);
                DataTable dtPage = SqlHelper.GetTable(sql.ToString());
                string teacherId = "0";
                if (dtPage.Rows.Count > 0)
                {
                    teacherId = dtPage.Rows[0][0].ToString();
                }
                string userId = teacherId;
                string userType = "teacher";
                string mobile = request["mobile"];
                string validateCode = request["validateCode"];
                string newPassword = request["newPassword"];
                string confirmPassword = request["confirmPassword"];
                newPassword = getMd5EncryptPassword(newPassword);
                confirmPassword = getMd5EncryptPassword(confirmPassword);
                userType = getUserType(userType);

                int errorCode = checkValidateCodeExpiredOrError(mobile, validateCode);
                if (errorCode > 0)
                {
                    result = result = "{\"code\":" + errorCode.ToString() + ",\"message\":\"" + "验证码不存在或已过期！" + "\"}";
                    return result;
                }
                if (newPassword != confirmPassword)
                {
                    result = result = "{\"code\":" + 808 + ",\"message\":\"" + "密码与确认密码不一致！" + "\"}";
                    return result;
                }

                List<SqlParameter> sqlparm = new List<SqlParameter>();

                sqlparm.Add(new SqlParameter("@userId", userId));
                sqlparm.Add(new SqlParameter("@mobile", mobile));
                sqlparm.Add(new SqlParameter("@userType", userType));
                sqlparm.Add(new SqlParameter("@validateCode", validateCode));
                sqlparm.Add(new SqlParameter("@password", request["newPassword"]));

                sqlparm.Add(new SqlParameter("@saveTag", 2));
                sqlparm.Add(new SqlParameter("@errorCode", errorCode));
                sqlparm.Add(new SqlParameter("@errorMessage", SqlDbType.VarChar, 100));
                string[] sOut = new string[3];
                sOut[0] = "@userId";
                sOut[1] = "@errorCode";
                sOut[2] = "@errorMessage";
                result = SqlHelper.ExecProcedure("proc_fe_userPassword_reset", sqlparm.ToArray(), sOut, '|');
                string[] sResult = result.Split('|');
                if (sResult[1] == "0")
                    result = "{\"code\":200,\"message\":\"用户密码修改成功！\"}";
                else
                    result = "{\"code\":" + sResult[1] + ",\"message\":\"" + sResult[2] + "\"}";
            }
            finally
            {
            }
            return result;
        } 
        private string updateUserPassword(HttpContext context)
        {
            string result = "";
            HttpRequest request = HttpContext.Current.Request;
            try
            {
                System.Web.SessionState.HttpSessionState session = context.Session;
                if (session["userId"] == null)
                {
                    return "go_login";
                }

                StringBuilder sql = new StringBuilder();
                sql.Append("select teacherId from fe_teacher where adminId = " + session["userId"]);
                DataTable dtPage = SqlHelper.GetTable(sql.ToString());
                string teacherId = "0";
                if (dtPage.Rows.Count > 0)
                {
                    teacherId = dtPage.Rows[0][0].ToString();
                }
                string userId = teacherId;
                string userType = "teacher";
                string oldPassword = request["oldPassword"];
                string newPassword = request["newPassword"];
                int errorCode = 0;

                oldPassword = getMd5EncryptPassword(oldPassword);
                newPassword = getMd5EncryptPassword(newPassword);

                List<SqlParameter> sqlparm = new List<SqlParameter>();
                sqlparm.Add(new SqlParameter("@userId", userId));
                sqlparm.Add(new SqlParameter("@userType", userType));
                sqlparm.Add(new SqlParameter("@oldPassword", oldPassword));
                sqlparm.Add(new SqlParameter("@newPassword", newPassword));
                sqlparm.Add(new SqlParameter("@saveTag", 2));
                sqlparm.Add(new SqlParameter("@errorCode", errorCode));
                sqlparm.Add(new SqlParameter("@errorMessage", SqlDbType.VarChar, 100));

                string[] sOut = new string[3];
                sOut[0] = "@userId";
                sOut[1] = "@errorCode";
                sOut[2] = "@errorMessage";
                result = SqlHelper.ExecProcedure("proc_fe_userPassword_update", sqlparm.ToArray(), sOut, '|');
                string[] sResult = result.Split('|');
                if (sResult[1] == "0")
                    result = "{\"code\":200,\"message\":\"用户密码修改成功！\"}";
                else
                    result = "{\"code\":" + sResult[1] + ",\"message\":\"" + sResult[2] + "\"}";
            }
            finally
            {
            }
            return result;
        }
        private string homeworkSaveNew(HttpContext context)
        {
            string result = "[{}]";
            HttpRequest request = context.Request;
            HttpFileCollection files = context.Request.Files;
            System.Web.SessionState.HttpSessionState session = context.Session;
            try
            {
                string msg = string.Empty;
                string sbMsg = "";
                if (session["userId"] == null)
                {
                    return "go_login";
                }
               
                StringBuilder sql = new StringBuilder();
                sql.Append("select teacherId from fe_teacher where adminId = " + session["userId"]);
                DataTable dtPage = SqlHelper.GetTable(sql.ToString());
                string teacherId = "0";
                if (dtPage.Rows.Count > 0)
                {
                    teacherId = dtPage.Rows[0][0].ToString();
                }
                string saveTag = request["saveTag"];
                int dataOper = GetDataOperType(saveTag) + 1;
                int errorCode = 0;

                string paperids = request["paperid"];
                Int64 paperid = 0;
                Int64.TryParse(paperids, out paperid);

                string role = request["role"];
                sbMsg = request["photoArray"];
                if (sbMsg.Length > 1)
                {
                    sbMsg = sbMsg.Substring(0, sbMsg.Length - 1);
                }
                
                List<SqlParameter> sqlparm = new List<SqlParameter>();
                sqlparm.Add(new SqlParameter("@paperid", paperid));
                sqlparm.Add(new SqlParameter("@paperType", request["paperType"]));
                sqlparm.Add(new SqlParameter("@pic", sbMsg.Trim().ToString()));
                sqlparm.Add(new SqlParameter("@classify", request["classify"]));
                sqlparm.Add(new SqlParameter("@name", request["name"]));
                sqlparm.Add(new SqlParameter("@classId", request["classId"]));
                sqlparm.Add(new SqlParameter("@courseId", request["courseId"]));
                sqlparm.Add(new SqlParameter("@courseCatalogId", request["courseCatalogId"]));
                sqlparm.Add(new SqlParameter("@endDate", request["endDate"]));
                sqlparm.Add(new SqlParameter("@role", role));
                sqlparm.Add(new SqlParameter("@teacherId", teacherId));
                sqlparm.Add(new SqlParameter("@insertType", "2"));
                sqlparm.Add(new SqlParameter("@saveTag", dataOper));
                sqlparm.Add(new SqlParameter("@errorCode", errorCode));
                sqlparm.Add(new SqlParameter("@errorMessage", SqlDbType.VarChar, 100));

                string[] sOut = new string[3];
                sOut[0] = "@paperid";
                sOut[1] = "@errorCode";
                sOut[2] = "@errorMessage";
                result = SqlHelper.ExecProcedure("proc_fe_new_paper_Save", sqlparm.ToArray(), sOut, '|');
                string[] sResult = result.Split('|');
                string errorCodes = sResult[1];
                errorCode = getAppropriateId(errorCodes, true);
                if (errorCode == 0)
                    result = ((int)UpdateInfo.success).ToString();
                else
                    result = ((int)UpdateInfo.failure).ToString();
            }
            catch
            {
                 
            }
            return result;
        }
        private string homeworkSaveNewForTeacher(HttpContext context)
        {
            string result = "[{}]";
            HttpRequest request = context.Request;
            HttpFileCollection files = context.Request.Files;
            System.Web.SessionState.HttpSessionState session = context.Session;
            try
            {
                string msg = string.Empty;
                string sbMsg = "";
                if (session["userId"] == null)
                {
                    return "go_login";
                }

                StringBuilder sql = new StringBuilder();
                sql.Append("select teacherId from fe_teacher where adminId = " + session["userId"]);
                DataTable dtPage = SqlHelper.GetTable(sql.ToString());
                string teacherId = "0";
                if (dtPage.Rows.Count > 0)
                {
                    teacherId = dtPage.Rows[0][0].ToString();
                }
                string saveTag = request["saveTag"];
                int dataOper = GetDataOperType(saveTag) + 1;
                int errorCode = 0;

                string paperids = request["paperid"];
                Int64 paperid = 0;
                Int64.TryParse(paperids, out paperid);

                string courseIds = request["courseId"];
                Int64 courseId = 0;
                Int64.TryParse(courseIds, out courseId);

                string courseCatalogIds = request["courseCatalogId"];
                Int64 courseCatalogId = 0;
                Int64.TryParse(courseCatalogIds, out courseCatalogId);

                string role = request["quesitonList"];
                //sbMsg = request["photoArray"];
                //if (sbMsg.Length > 1)
                //{
                //    sbMsg = sbMsg.Substring(0, sbMsg.Length - 1);
                //}

                List<SqlParameter> sqlparm = new List<SqlParameter>();
                sqlparm.Add(new SqlParameter("@paperid", paperid));
                sqlparm.Add(new SqlParameter("@paperType", request["paperType"]));
                sqlparm.Add(new SqlParameter("@classify", request["classify"]));
                sqlparm.Add(new SqlParameter("@name", request["paperName"]));
                sqlparm.Add(new SqlParameter("@classId", request["classId"]));
                sqlparm.Add(new SqlParameter("@courseId", courseId));
                sqlparm.Add(new SqlParameter("@courseCatalogId", courseCatalogId));
                sqlparm.Add(new SqlParameter("@endDate", request["endTime"]));
                sqlparm.Add(new SqlParameter("@role", role));
                sqlparm.Add(new SqlParameter("@teacherId", teacherId));
                sqlparm.Add(new SqlParameter("@insertType", "2"));
                sqlparm.Add(new SqlParameter("@saveTag", dataOper));
                sqlparm.Add(new SqlParameter("@errorCode", errorCode));
                sqlparm.Add(new SqlParameter("@errorMessage", SqlDbType.VarChar, 100));

                string[] sOut = new string[3];
                sOut[0] = "@paperid";
                sOut[1] = "@errorCode";
                sOut[2] = "@errorMessage";
                result = SqlHelper.ExecProcedure("proc_fe_new_paperforTeacher_Save", sqlparm.ToArray(), sOut, '|');
                string[] sResult = result.Split('|');
                string errorCodes = sResult[1];
                errorCode = getAppropriateId(errorCodes, true);
                if (errorCode == 0)
                    result = ((int)UpdateInfo.success).ToString();
                else
                    result = ((int)UpdateInfo.failure).ToString();
            }
            catch(Exception ex)
            {
                result = ex.ToString();
            }
            return result;
        }
        private string homeworkSave(HttpContext context)
        {
            string result = "[{}]";
            try
            {
                HttpRequest request = context.Request;
                System.Web.SessionState.HttpSessionState session = context.Session;
                if (session["userId"] == null)
                {
                    return "go_login";
                }

                StringBuilder sql = new StringBuilder();
                sql.Append("select teacherId from fe_teacher where adminId = " + session["userId"]);
                DataTable dtPage = SqlHelper.GetTable(sql.ToString());
                string teacherId = "0";
                if (dtPage.Rows.Count > 0)
                {
                    teacherId = dtPage.Rows[0][0].ToString();
                }
                string saveTag = request["saveTag"];

                string homeworkIds = request["homeworkId"];
                Int64 homeworkId = 0;
                Int64.TryParse(homeworkIds, out homeworkId);

                string homeworkTypeIds = request["homeworkTypeId"];
                Int64 homeworkTypeId = 0;
                Int64.TryParse(homeworkTypeIds, out homeworkTypeId);

                int dataOper = GetDataOperType(saveTag) + 1;
                int errorCode = 0;

                string questionType = request["questionType"];
                string question = request["question"];
                string[] stmp_Type = questionType.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
                string[] stmp = question.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
                List<SqlParameter> sqlparm = new List<SqlParameter>();
                sqlparm.Add(new SqlParameter("@homeworkId", homeworkId));
                //sqlparm.Add(new SqlParameter("@homeworkTypeId", homeworkTypeId));
                sqlparm.Add(new SqlParameter("@homeworkType", request["homeworkType"]));
                sqlparm.Add(new SqlParameter("@teacherId", teacherId));
                sqlparm.Add(new SqlParameter("@classId", request["classId"]));
                sqlparm.Add(new SqlParameter("@courseId", request["courseId"]));
                sqlparm.Add(new SqlParameter("@courseCatalogId", request["courseCatalogId"]));
                sqlparm.Add(new SqlParameter("@name", request["name"]));
                sqlparm.Add(new SqlParameter("@releaseTime", request["releaseTime"]));
                sqlparm.Add(new SqlParameter("@endTime", request["endTime"]));
                sqlparm.Add(new SqlParameter("@limitTime", request["limitTime"]));//request["limitTime"]
                //sqlparm.Add(new SqlParameter("@questionType", stmp_Type[i]));
                //sqlparm.Add(new SqlParameter("@questionNum", stmp[i]));
                //sqlparm.Add(new SqlParameter("@questionTypeNum", i + 1));
                sqlparm.Add(new SqlParameter("@saveTag", dataOper));
                sqlparm.Add(new SqlParameter("@errorCode", errorCode));
                sqlparm.Add(new SqlParameter("@errorMessage", SqlDbType.VarChar, 100));
                string[] sOut = new string[3];
                sOut[0] = "@homeworkId";
                sOut[1] = "@errorCode";
                sOut[2] = "@errorMessage";
                result = SqlHelper.ExecProcedure("proc_fe_studentHomework_Save", sqlparm.ToArray(), sOut, '|');
                string[] sResultone = result.Split('|');
                string errorCodes = sResultone[1];
                errorCode = getAppropriateId(errorCodes, true);
                for (int i = 0; i < stmp_Type.Length; i++)
                {
                    List<SqlParameter> typesqlparm = new List<SqlParameter>();
                    typesqlparm.Add(new SqlParameter("@homeworkId", sResultone[0]));
                    typesqlparm.Add(new SqlParameter("@homeworkTypeId", homeworkTypeId));
                    typesqlparm.Add(new SqlParameter("@questionType", stmp_Type[i]));
                    typesqlparm.Add(new SqlParameter("@questionTypeNum", i + 1));
                    typesqlparm.Add(new SqlParameter("@saveTag", dataOper));
                    typesqlparm.Add(new SqlParameter("@errorCode", errorCode));
                    typesqlparm.Add(new SqlParameter("@errorMessage", SqlDbType.VarChar, 100));
                    string[] sOutype = new string[3];
                    sOutype[0] = "@homeworkTypeId";
                    sOutype[1] = "@errorCode";
                    sOutype[2] = "@errorMessage";
                    result = SqlHelper.ExecProcedure("proc_fe_studentHomeworkType_Save", typesqlparm.ToArray(), sOutype, '|');
                    string[] sResult = result.Split('|');
                    errorCodes = sResult[1];
                    errorCode = getAppropriateId(errorCodes, true);
                    
                    string ssql = "";
                    if (stmp_Type[i] == "1")
                    {
                        ssql = "select row_number() over(order by questionBankWordId desc) as rownum,* from (select top " + stmp[i] + " * from	[dbo].[fe_questionBankWord] where questionTypeId = " + stmp_Type[i] + " and gradeId =  (select gradeId from fe_class where classId = " + request["classId"] + ") and subjectId = (select subjectId from fe_teacher where teacherId = " + teacherId + ") order by newid()) a";
                    }
                    else
                    {
                         ssql = "select row_number() over(order by questionBankId desc) as rownum,* from (select top " + stmp[i] + " * from	[dbo].[fe_questionBank] where questionTypeId = " + stmp_Type[i] + " and gradeId =  (select gradeId from fe_class where classId = " + request["classId"] + ") and subjectId = (select subjectId from fe_teacher where teacherId = " + teacherId + ") order by newid()) a";
                    }
                    
                    DataTable dt = SqlHelper.GetTable(ssql);
                    for (int j = 0; j < dt.Rows.Count; j++)
                    {
                        List<SqlParameter> parm = new List<SqlParameter>();
                        parm.Add(new SqlParameter("@homeworkQuestionId", request["homeworkQuestionId"]));
                        parm.Add(new SqlParameter("@homeworkTypeId", sResult[0]));
                        parm.Add(new SqlParameter("@optionNo", j + 1));
                        if (stmp_Type[i] == "1")
                        {
                            parm.Add(new SqlParameter("@questionBankId", dt.Rows[j]["questionBankWordId"]));
                        }
                        else
                        {
                            parm.Add(new SqlParameter("@questionBankId", dt.Rows[j]["questionBankId"]));
                        }
                        parm.Add(new SqlParameter("@saveTag", dataOper));
                        parm.Add(new SqlParameter("@errorCode", errorCode));
                        parm.Add(new SqlParameter("@errorMessage", SqlDbType.VarChar, 100));
                        string[] sResult1 = new string[] { "@errorMessage" };
                        result = SqlHelper.ExecProcedure("proc_fe_studentHomeworkQuestion_Save", parm.ToArray(), sResult1, '|');
                        
                        errorCode = 0;
                    }
                    if (errorCode == 0)
                        result = ((int)UpdateInfo.success).ToString();
                    else
                        result = ((int)UpdateInfo.failure).ToString();
                }
                
            }
            catch (Exception ex)
            {
            }
            return result;
        }
        private string getQuestionNum(HttpContext context) //个人中心未读通知数
        {
            string result = "[{}]";
            string sqll = "";
            try
            {
                HttpRequest request = context.Request;

                System.Web.SessionState.HttpSessionState session = context.Session;
                if (session["userId"] == null)
                {
                    return "go_login";
                }

                StringBuilder sql = new StringBuilder();
                sql.Append("select teacherId from fe_teacher where adminId = " + session["userId"]);
                DataTable dtPage = SqlHelper.GetTable(sql.ToString());
                string teacherId = "0";
                if (dtPage.Rows.Count > 0)
                {
                    teacherId = dtPage.Rows[0][0].ToString();
                }
                
                StringBuilder JsonString = new StringBuilder();

                string ssql = "select count(1) as num from v_questionReply where readstatesforT = 2 and isShow = 1 and replyOrQuestion = 1 and teacherId =" + teacherId;
                DataTable dt = SqlHelper.GetTable(ssql);

                sqll = "select count(1) as num from [v_EvaluationForUser] where (states = 2 and parentId in (select courseEvaluationId from fe_courseEvaluation where valuatorId = " + teacherId + " and valuatorType = 3)) or (states = 2 and teacherId = " + teacherId + " and valuatorId <> " + teacherId + " and parentId not in (select courseEvaluationId from v_EvaluationForUser where valuatorId= " + teacherId + " and valuatorType = 3))";
                DataTable dt1 = SqlHelper.GetTable(sqll);

                string noticesql = "SELECT * FROM [dbo].[fun_getSystemNoticeNum] (" + teacherId + ",3)";
                DataTable dt2 = SqlHelper.GetTable(noticesql);
                JsonString.Append("{\"num1\":\"" + dt.Rows[0][0] + "\",\"num2\":\"" + dt1.Rows[0][0] + "\",\"num3\":\"" + dt2.Rows[0][0] + "\"");
                JsonString.Append("}");
                result = JsonString.ToString().Replace("\n", "");

            }
            catch (Exception ex)
            {
                result = ex.ToString();
            }
            return result;
        }
        /// <summary>
        /// 教育经历
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        private string teachingProcessInfoSave(HttpContext context)
        {
            string result = "[{}]";
            try
            {
                HttpRequest request = context.Request;
                string teachingProcessIds = request["teachingProcessId"];
                System.Web.SessionState.HttpSessionState session = context.Session;
                if (session["userId"] == null)
                {
                    return "go_login";
                }

                StringBuilder sql = new StringBuilder();
                sql.Append("select teacherId from fe_teacher where adminId = " + session["userId"]);
                DataTable dtPage = SqlHelper.GetTable(sql.ToString());
                string teacherId = "0";
                if (dtPage.Rows.Count > 0)
                {
                    teacherId = dtPage.Rows[0][0].ToString();
                }
                string saveTag = request["saveTag"];
                int teachingProcessId = getAppropriateId(teachingProcessIds);
                

                int dataOper = GetDataOperType(saveTag) + 1;
                int errorCode = 0;
                List<SqlParameter> sqlparm = new List<SqlParameter>();
                sqlparm.Add(new SqlParameter("@teachingProcessId", teachingProcessId));
                sqlparm.Add(new SqlParameter("@teacherId", teacherId));
                sqlparm.Add(new SqlParameter("@beginDate", request["beginDate"]));
                sqlparm.Add(new SqlParameter("@endDate", request["endDate"]));
                sqlparm.Add(new SqlParameter("@experience", request["experience"]));

                sqlparm.Add(new SqlParameter("@saveTag", dataOper));
                sqlparm.Add(new SqlParameter("@errorCode", errorCode));
                sqlparm.Add(new SqlParameter("@errorMessage", SqlDbType.VarChar, 100));

                string[] sOut = new string[3];
                sOut[0] = "@teachingProcessId";
                sOut[1] = "@errorCode";
                sOut[2] = "@errorMessage";
                result = SqlHelper.ExecProcedure("proc_fe_teachingProcessInfo_Save", sqlparm.ToArray(), sOut, '|');
                string[] sResult = result.Split('|');
                string errorCodes = sResult[1];
                errorCode = getAppropriateId(errorCodes, true);
                if (errorCode == 0)
                    result = ((int)UpdateInfo.success).ToString();
                else
                    result = ((int)UpdateInfo.failure).ToString();
            }
            catch (Exception ex)
            {
            }
            return result;
        }
        private string ChannelProgramSave(HttpContext context)
        {
            string result = "";
            HttpRequest request = context.Request;
            try
            {
                string note = request["note"];
                string classId = request["classId"];
                string title = request["title"];
                string playBeginTime = request["playBeginTime"];
                string playEndTime = request["playEndTime"];
                
                System.Web.SessionState.HttpSessionState session = context.Session;
                if (session["userId"] == null)
                {
                    return "go_login";
                }

                StringBuilder sql = new StringBuilder();
                sql.Append("select teacherId from fe_teacher where adminId = " + session["userId"]);
                DataTable dtPage = SqlHelper.GetTable(sql.ToString());
                string teacherId = "0";
                if (dtPage.Rows.Count > 0)
                {
                    teacherId = dtPage.Rows[0][0].ToString();
                }

                int channelProgramId = 0;
                string channelProgramIds = request["channelProgramId"];
                int.TryParse(channelProgramIds, out channelProgramId);

                string saveTag = request["saveTag"];
                int dataOper = GetDataOperType(saveTag) + 1;
                int errorCode = 0;
                List<SqlParameter> sqlparm = new List<SqlParameter>();
                sqlparm.Add(new SqlParameter("@channelProgramId", channelProgramId));
                sqlparm.Add(new SqlParameter("@classId", classId));
                sqlparm.Add(new SqlParameter("@teacherId", teacherId));
                sqlparm.Add(new SqlParameter("@title", title));
                sqlparm.Add(new SqlParameter("@playBeginTime", playBeginTime));
                sqlparm.Add(new SqlParameter("@playEndTime", playEndTime));
                sqlparm.Add(new SqlParameter("@note", note));
                sqlparm.Add(new SqlParameter("@saveTag", dataOper));
                sqlparm.Add(new SqlParameter("@errorCode", errorCode));
                sqlparm.Add(new SqlParameter("@errorMessage", SqlDbType.VarChar, 100));

                string[] sOut = new string[3];
                sOut[0] = "@channelProgramId";
                sOut[1] = "@errorCode";
                sOut[2] = "@errorMessage";
                result = SqlHelper.ExecProcedure("proc_fe_channelMeeting_Save", sqlparm.ToArray(), sOut, '|');
                string[] sResult = result.Split('|');
                string errorCodes = sResult[1];
                errorCode = getAppropriateId(errorCodes, true);
                if (errorCode == 0)
                    result = ((int)UpdateInfo.success).ToString();
                else
                    result = ((int)UpdateInfo.failure).ToString();
                
            }
            catch
            {
                 
            }
            return result;
        }
        /// <summary>
        /// 教师身份证保存
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        private string teacheridCardPhotoSave(HttpContext context)
        {
            string result = "";
            string msg = string.Empty;
            StringBuilder sbMsg = new StringBuilder();
            HttpFileCollection files = context.Request.Files;
            string idPhoto = "";
            string handHoldPhoto = "";
            try
            {
                if (files.Count > 0)
                {
                    for (int i = 0; i < files.Count; i++)
                    {
                        string filePath = context.Server.MapPath("..\\..\\uploads\\images\\");
                        if (i == 0)
                        {
                            handHoldPhoto = files[i].FileName;
                        }
                        if (i == 1)
                        {
                            idPhoto = files[i].FileName;
                        }
                        if (!System.IO.Directory.Exists(filePath))
                            System.IO.Directory.CreateDirectory(filePath);
                        filePath = System.IO.Path.Combine(filePath, System.IO.Path.GetFileName(files[i].FileName));
                        if (i == 0)
                        {
                            handHoldPhoto = System.IO.Path.GetFileName(files[i].FileName);
                        }
                        if (i == 1)
                        {
                            idPhoto = System.IO.Path.GetFileName(files[i].FileName);
                        }
                        if (!System.IO.File.Exists(filePath))
                            files[i].SaveAs(filePath);
                        if (renameFile(ref filePath, context))
                        {
                            msg = filePath;
                            msg = System.IO.Path.GetFileName(filePath);
                            sbMsg.Append(msg + ",");
                        }
                    }
                    string[] arr = sbMsg.ToString().Split(new string[] { "," }, StringSplitOptions.RemoveEmptyEntries);
                    if (arr.Length > 1)
                    {
                        handHoldPhoto = arr[0];
                        idPhoto = arr[1];
                    }
                    else
                    {
                        if (idPhoto != "")
                        {
                            idPhoto = msg;
                        }
                        else
                        {
                            handHoldPhoto = msg;
                        }
                    }
                }
                
                HttpRequest request = context.Request;
                System.Web.SessionState.HttpSessionState session = context.Session;
                if (session["userId"] == null)
                {
                    return "go_login";
                }
                StringBuilder sql = new StringBuilder();
                sql.Append("select teacherId from fe_teacher where adminId = " + session["userId"]);
                DataTable dtPage = SqlHelper.GetTable(sql.ToString());
                string teacherId = "0";
                if (dtPage.Rows.Count > 0)
                {
                    teacherId = dtPage.Rows[0][0].ToString();
                }
                string saveTag = request["saveTag"];
                int dataOper = GetDataOperType(saveTag) + 1;
                int errorCode = 0;

                List<SqlParameter> sqlparm = new List<SqlParameter>();
                sqlparm.Add(new SqlParameter("@teacherId", teacherId));
                sqlparm.Add(new SqlParameter("@idCard", request["idCard"]));
                sqlparm.Add(new SqlParameter("@idPhoto", "uploads/images/" + idPhoto));
                sqlparm.Add(new SqlParameter("@handHoldPhoto", "uploads/images/" + handHoldPhoto));
                sqlparm.Add(new SqlParameter("@saveTag", dataOper));
                sqlparm.Add(new SqlParameter("@errorCode", errorCode));
                sqlparm.Add(new SqlParameter("@errorMessage", SqlDbType.VarChar, 100));

                string[] sOut = new string[3];
                sOut[0] = "@teacherId";
                sOut[1] = "@errorCode";
                sOut[2] = "@errorMessage";
                result = SqlHelper.ExecProcedure("proc_fe_teacher_idCardPhoto_Save", sqlparm.ToArray(), sOut, '|');
                string[] sResult = result.Split('|');
                string errorCodes = sResult[1];
                errorCode = getAppropriateId(errorCodes, true);
                if (errorCode == 0)
                    result = ((int)UpdateInfo.success).ToString();
                else
                    result = ((int)UpdateInfo.failure).ToString();
            }
            catch
            {
                 
            }
            return result;
        }
        /// <summary>
        /// 课程评价
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        private string evaluation(HttpContext context)
        {
            string result = "";
            try
            {
                HttpRequest request = context.Request;
                int errorCode = 0;
                List<SqlParameter> sqlparm = new List<SqlParameter>();
                string courseEvaluationIds = request["courseEvaluationId"];
                string parentIds = request["parentId"];
                string levelOneEvaluationIds = request["levelOneEvaluationId"];
                System.Web.SessionState.HttpSessionState session = context.Session;
                if (session["userId"] == null)
                {
                    return "go_login";
                }
                StringBuilder sql = new StringBuilder();
                sql.Append("select teacherId from fe_teacher where adminId = " + session["userId"]);
                DataTable dtPage = SqlHelper.GetTable(sql.ToString());
                string teacherId = "0";
                if (dtPage.Rows.Count > 0)
                {
                    teacherId = dtPage.Rows[0][0].ToString();
                }
                string valuatorIds = teacherId;
                string userTypes = "3";
                string courseKinds = request["courseKind"];
                string scores = request["score"];

                Int64 courseEvaluationId = 0;
                Int64.TryParse(courseEvaluationIds, out courseEvaluationId);

                Int64 parentId = 0;
                Int64.TryParse(parentIds, out parentId);
                Int64 levelOneEvaluationId = 0;
                Int64.TryParse(levelOneEvaluationIds, out levelOneEvaluationId);
                Int64 valuatorId = 0;
                Int64.TryParse(valuatorIds, out valuatorId);
                int userType = 0;
                int.TryParse(userTypes, out userType);
                int score = getAppropriateId(scores, true);
                if (score > 10)
                    score = 10;
                if (score < 0)
                    score = 0;

                sqlparm.Add(new SqlParameter("@courseEvaluationId", courseEvaluationId));
                sqlparm.Add(new SqlParameter("@parentId", parentId));
                sqlparm.Add(new SqlParameter("@levelOneEvaluationId", levelOneEvaluationId));
                sqlparm.Add(new SqlParameter("@courseId", request["courseId"]));
                sqlparm.Add(new SqlParameter("@courseKind", request["courseKind"]));
                sqlparm.Add(new SqlParameter("@score", score));

                sqlparm.Add(new SqlParameter("@valuatorId", valuatorId));
                sqlparm.Add(new SqlParameter("@valuatorType", userType));// 评价者类型 1 学生 2 家长 3 老师 4 游客

                sqlparm.Add(new SqlParameter("@evaluation", request["evaluation"]));
                sqlparm.Add(new SqlParameter("@saveTag", "1"));
                sqlparm.Add(new SqlParameter("@errorCode", errorCode));
                sqlparm.Add(new SqlParameter("@errorMessage", SqlDbType.VarChar, 100));
                string[] sResult = new string[] { "@errorMessage" };
                result = SqlHelper.ExecProcedure("proc_fe_courseEvaluation_Save", sqlparm.ToArray(), sResult, '|');
                StringBuilder JsonString = new StringBuilder();
                JsonString.Append("{");
                JsonString.Append("\"code\":");
                JsonString.Append("200,");
                JsonString.Append("\"message\":");
                JsonString.Append("\"课程评论成功\"");
                JsonString.Append("}");
                result = JsonString.ToString(); 
            }
            catch (Exception ex)
            {
                result = ex.Message.ToString();
            }
            return result;
        }
        private string updateUserMobile(HttpContext context)
        {
            string result = "";
            HttpRequest request = HttpContext.Current.Request;
            try
            {
                System.Web.SessionState.HttpSessionState session = context.Session;
                if (session["userId"] == null)
                {
                    return "go_login";
                }
                StringBuilder sql = new StringBuilder();
                sql.Append("select teacherId from fe_teacher where adminId = " + session["userId"]);
                DataTable dtPage = SqlHelper.GetTable(sql.ToString());
                string teacherId = "0";
                if (dtPage.Rows.Count > 0)
                {
                    teacherId = dtPage.Rows[0][0].ToString();
                }

                string userId = teacherId;
                string userType = "teacher";
                string mobile = request["mobile"];
                string validateCode = request["validateCode"];
                userType = getUserType(userType);

                int errorCode = checkValidateCodeExpiredOrError(mobile, validateCode);
                if (errorCode > 0)
                {
                    result = result = "{\"code\":" + errorCode.ToString() + ",\"message\":\"" + "验证码不存在或已过期！" + "\"}";
                    return result;
                }

                List<SqlParameter> sqlparm = new List<SqlParameter>();
                sqlparm.Add(new SqlParameter("@userId", userId));
                sqlparm.Add(new SqlParameter("@userType", userType));
                sqlparm.Add(new SqlParameter("@mobile", mobile));
                sqlparm.Add(new SqlParameter("@validateCode", validateCode));
                sqlparm.Add(new SqlParameter("@saveTag", 2));
                sqlparm.Add(new SqlParameter("@errorCode", errorCode));
                sqlparm.Add(new SqlParameter("@errorMessage", SqlDbType.VarChar, 100));

                string[] sOut = new string[3];
                sOut[0] = "@userId";
                sOut[1] = "@errorCode";
                sOut[2] = "@errorMessage";
                result = SqlHelper.ExecProcedure("proc_fe_userMobile_update", sqlparm.ToArray(), sOut, '|');
                string[] sResult = result.Split('|');
                if (sResult[1] == "0")
                    result = "{\"code\":200,\"message\":\"用户手机号修改成功！\"}";
                else
                    result = "{\"code\":" + sResult[1] + ",\"message\":\"" + sResult[2] + "\"}";
            }
            finally
            {
            }
            return result;
        }
        private int checkValidateCodeExpiredOrError(string mobile, string validateCode)
        {
            int errorCode = 0;
            try
            {
                string ssql = "select mobileValidateCodeId from fe_mobileValidateCode where mobile = '" + mobile + "' and validateCode = '" + validateCode + "'";
                DataTable dt = SqlHelper.GetTable(ssql);
                if (dt.Rows.Count == 0)
                    //errorCode = (int)LoginOrRegisterError.validateCodeError;

                ssql = "select mobileValidateCodeId from fe_mobileValidateCode where mobile = '" + mobile + "' and validateCode = '" + validateCode + "' and DATEADD(SECOND, 120,validTime) >= GETDATE() ";
                dt = SqlHelper.GetTable(ssql);
                if (dt.Rows.Count == 0)
                { }
                    //errorCode = (int)LoginOrRegisterError.validateCodeExpired;
            }
            catch (Exception ex)
            {
            }
            return errorCode;
        }
        /// <summary>
        /// 教师资格证书保存
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        private string teacherCertificationSave(HttpContext context)
        {
            string result = "";
            string msg = string.Empty;
            StringBuilder sbMsg = new StringBuilder();
            HttpFileCollection files = context.Request.Files;
            try
            {
                if (files.Count > 0)
                {
                    string filePath = context.Server.MapPath("..\\..\\uploads\\images\\");
                    
                    if (!System.IO.Directory.Exists(filePath))
                        System.IO.Directory.CreateDirectory(filePath);
                    filePath = System.IO.Path.Combine(filePath, System.IO.Path.GetFileName(files[0].FileName));
                    
                    if (!System.IO.File.Exists(filePath))
                        files[0].SaveAs(filePath);
                    if (renameFile(ref filePath, context))
                    {
                        msg = filePath;
                        msg = System.IO.Path.GetFileName(filePath);
                        sbMsg.Append(msg + ",");
                    }
                }

                HttpRequest request = context.Request;
                System.Web.SessionState.HttpSessionState session = context.Session;
                if (session["userId"] == null)
                {
                    return "go_login";
                }
                StringBuilder sql = new StringBuilder();
                sql.Append("select teacherId from fe_teacher where adminId = " + session["userId"]);
                DataTable dtPage = SqlHelper.GetTable(sql.ToString());
                string teacherId = "0";
                if (dtPage.Rows.Count > 0)
                {
                    teacherId = dtPage.Rows[0][0].ToString();
                }
                string saveTag = request["saveTag"];
                int dataOper = GetDataOperType(saveTag) + 1;
                int errorCode = 0;

                List<SqlParameter> sqlparm = new List<SqlParameter>();
                sqlparm.Add(new SqlParameter("@teacherId", teacherId));
                sqlparm.Add(new SqlParameter("@certificationIconPath", "uploads/images/" + msg));
                sqlparm.Add(new SqlParameter("@saveTag", dataOper));
                sqlparm.Add(new SqlParameter("@errorCode", errorCode));
                sqlparm.Add(new SqlParameter("@errorMessage", SqlDbType.VarChar, 100));

                string[] sOut = new string[3];
                sOut[0] = "@teacherId";
                sOut[1] = "@errorCode";
                sOut[2] = "@errorMessage";
                result = SqlHelper.ExecProcedure("proc_fe_teacher_Certification_Save", sqlparm.ToArray(), sOut, '|');
                string[] sResult = result.Split('|');
                string errorCodes = sResult[1];
                errorCode = getAppropriateId(errorCodes, true);
                if (errorCode == 0)
                    result = ((int)UpdateInfo.success).ToString();
                else
                    result = ((int)UpdateInfo.failure).ToString();
            }
            catch
            {

            }
            return result;
        }
        private string updateQuestionState(HttpContext context)
        {
            string result = "";
            try
            {
                HttpRequest request = context.Request;

                string saveTag = request["saveTag"];//request["saveTag"]
                int dataOper = GetDataOperType(saveTag) + 1;
                int errorCode = 0;

                int questionId = 0;
                string questionIds = request["questionId"];
                int.TryParse(questionIds, out questionId);

                //int studentId = 0;
                //string studentIds = request["studentId"];
                //int.TryParse(studentIds, out studentId);

                //int teacherId = 0;
                //string teacherIds = request["teacherId"];
                //int.TryParse(teacherIds, out teacherId);

                //int parentId = 0;
                //string parentIds = request["parentId"];
                //int.TryParse(parentIds, out parentId);

                List<SqlParameter> sqlparm = new List<SqlParameter>();
                sqlparm.Add(new SqlParameter("@questionId", questionId));
                sqlparm.Add(new SqlParameter("@type", "1"));
                sqlparm.Add(new SqlParameter("@saveTag", dataOper));
                sqlparm.Add(new SqlParameter("@errorCode", errorCode));
                sqlparm.Add(new SqlParameter("@errorMessage", SqlDbType.VarChar, 100));

                string[] sOut = new string[3];
                sOut[0] = "@questionId";
                sOut[1] = "@errorCode";
                sOut[2] = "@errorMessage";
                result = SqlHelper.ExecProcedure("proc_fe_questionReply_Update", sqlparm.ToArray(), sOut, '|');
                string[] sResult = result.Split('|');
                string errorCodes = sResult[1];
                errorCode = getAppropriateId(errorCodes, true);
                if (errorCode == 0)
                    result = ((int)UpdateInfo.success).ToString();
                else
                    result = ((int)UpdateInfo.failure).ToString();
            }
            catch (Exception ex)
            {
                result = ex.ToString();
            }
            return result;
        }
        /// <summary>
        /// 教师学历证书保存
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        private string teacherEducationSave(HttpContext context)
        {
            string result = "";
            string msg = string.Empty;
            StringBuilder sbMsg = new StringBuilder();
            HttpFileCollection files = context.Request.Files;
            try
            {
                if (files.Count > 0)
                {
                    string filePath = context.Server.MapPath("..\\..\\uploads\\images\\");

                    if (!System.IO.Directory.Exists(filePath))
                        System.IO.Directory.CreateDirectory(filePath);
                    filePath = System.IO.Path.Combine(filePath, System.IO.Path.GetFileName(files[0].FileName));

                    if (!System.IO.File.Exists(filePath))
                        files[0].SaveAs(filePath);
                    if (renameFile(ref filePath, context))
                    {
                        msg = filePath;
                        msg = System.IO.Path.GetFileName(filePath);
                        sbMsg.Append(msg + ",");
                    }
                }

                HttpRequest request = context.Request;
                System.Web.SessionState.HttpSessionState session = context.Session;
                if (session["userId"] == null)
                {
                    return "go_login";
                }
                StringBuilder sql = new StringBuilder();
                sql.Append("select teacherId from fe_teacher where adminId = " + session["userId"]);
                DataTable dtPage = SqlHelper.GetTable(sql.ToString());
                string teacherId = "0";
                if (dtPage.Rows.Count > 0)
                {
                    teacherId = dtPage.Rows[0][0].ToString();
                }
                string saveTag = request["saveTag"];
                int dataOper = GetDataOperType(saveTag) + 1;
                int errorCode = 0;

                List<SqlParameter> sqlparm = new List<SqlParameter>();
                sqlparm.Add(new SqlParameter("@teacherId", teacherId));
                sqlparm.Add(new SqlParameter("@educationalLevelPhoto", "uploads/images/" + msg));
                sqlparm.Add(new SqlParameter("@saveTag", dataOper));
                sqlparm.Add(new SqlParameter("@errorCode", errorCode));
                sqlparm.Add(new SqlParameter("@errorMessage", SqlDbType.VarChar, 100));

                string[] sOut = new string[3];
                sOut[0] = "@teacherId";
                sOut[1] = "@errorCode";
                sOut[2] = "@errorMessage";
                result = SqlHelper.ExecProcedure("proc_fe_teacher_Education_Save", sqlparm.ToArray(), sOut, '|');
                string[] sResult = result.Split('|');
                string errorCodes = sResult[1];
                errorCode = getAppropriateId(errorCodes, true);
                if (errorCode == 0)
                    result = ((int)UpdateInfo.success).ToString();
                else
                    result = ((int)UpdateInfo.failure).ToString();
            }
            catch
            {

            }
            return result;
        }
        private string saveStudioTeacherRs(HttpContext context)
        {
            string result = "";
            try
            {
                HttpRequest request = context.Request;
                System.Web.SessionState.HttpSessionState session = context.Session;
                if (session["userId"] == null)
                {
                    return "go_login";
                }
                StringBuilder sql = new StringBuilder();
                sql.Append("select teacherId from fe_teacher where adminId = " + session["userId"]);
                DataTable dtPage = SqlHelper.GetTable(sql.ToString());
                string teacherId = "0";
                if (dtPage.Rows.Count > 0)
                {
                    teacherId = dtPage.Rows[0][0].ToString();
                }

                string studioTeacherRsIds = request["studioTeacherRsId"];
                Int64 studioTeacherRsId = 0;
                Int64.TryParse(studioTeacherRsIds, out studioTeacherRsId);
                
                string saveTag = request["saveTag"];
                int dataOper = GetDataOperType(saveTag);
                int errorCode = 0;

                List<SqlParameter> sqlparm = new List<SqlParameter>();
                sqlparm.Add(new SqlParameter("@studioTeacherRsId", studioTeacherRsId));
                sqlparm.Add(new SqlParameter("@organId", request["teachingStudioId"]));
                sqlparm.Add(new SqlParameter("@teacherId", teacherId));
                sqlparm.Add(new SqlParameter("@inserter", teacherId));
                sqlparm.Add(new SqlParameter("@saveTag", dataOper + 1));
                sqlparm.Add(new SqlParameter("@errorCode", errorCode));
                sqlparm.Add(new SqlParameter("@errorMessage", SqlDbType.VarChar, 100));
                string[] sOut = new string[3];
                sOut[0] = "@studioTeacherRsId";
                sOut[1] = "@errorCode";
                sOut[2] = "@errorMessage";
                result = SqlHelper.ExecProcedure("proc_fe_studioTeacherRs_Save", sqlparm.ToArray(), sOut, '|');
                string[] sResult = result.Split('|');
                string errorCodes = sResult[1];
                errorCode = getAppropriateId(errorCodes, true);
                if (errorCode == 0)
                    result = ((int)UpdateInfo.success).ToString();
                else
                    result = ((int)UpdateInfo.failure).ToString();
                result = sResult[2];
            }
            catch
            { 
                
            }
            return result;
        }
        /// <summary>
        /// 教师学历证书保存
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        private string teacherCapabilitySave(HttpContext context)
        {
            string result = "";
            string msg = string.Empty;
            StringBuilder sbMsg = new StringBuilder();
            HttpFileCollection files = context.Request.Files;
            try
            {
                if (files.Count > 0)
                {
                    string filePath = context.Server.MapPath("..\\..\\uploads\\images\\");

                    if (!System.IO.Directory.Exists(filePath))
                        System.IO.Directory.CreateDirectory(filePath);
                    filePath = System.IO.Path.Combine(filePath, System.IO.Path.GetFileName(files[0].FileName));

                    if (!System.IO.File.Exists(filePath))
                        files[0].SaveAs(filePath);
                    if (renameFile(ref filePath, context))
                    {
                        msg = filePath;
                        msg = System.IO.Path.GetFileName(filePath);
                        sbMsg.Append(msg + ",");
                    }
                }

                HttpRequest request = context.Request;
                System.Web.SessionState.HttpSessionState session = context.Session;
                if (session["userId"] == null)
                {
                    return "go_login";
                }
                StringBuilder sql = new StringBuilder();
                sql.Append("select teacherId from fe_teacher where adminId = " + session["userId"]);
                DataTable dtPage = SqlHelper.GetTable(sql.ToString());
                string teacherId = "0";
                if (dtPage.Rows.Count > 0)
                {
                    teacherId = dtPage.Rows[0][0].ToString();
                }
                string saveTag = request["saveTag"];
                int dataOper = GetDataOperType(saveTag) + 1;
                int errorCode = 0;

                List<SqlParameter> sqlparm = new List<SqlParameter>();
                sqlparm.Add(new SqlParameter("@teacherId", teacherId));
                sqlparm.Add(new SqlParameter("@capabilityPhoto", "uploads/images/" + msg));
                sqlparm.Add(new SqlParameter("@saveTag", dataOper));
                sqlparm.Add(new SqlParameter("@errorCode", errorCode));
                sqlparm.Add(new SqlParameter("@errorMessage", SqlDbType.VarChar, 100));

                string[] sOut = new string[3];
                sOut[0] = "@teacherId";
                sOut[1] = "@errorCode";
                sOut[2] = "@errorMessage";
                result = SqlHelper.ExecProcedure("proc_fe_teacher_Capability_Save", sqlparm.ToArray(), sOut, '|');
                string[] sResult = result.Split('|');
                string errorCodes = sResult[1];
                errorCode = getAppropriateId(errorCodes, true);
                if (errorCode == 0)
                    result = ((int)UpdateInfo.success).ToString();
                else
                    result = ((int)UpdateInfo.failure).ToString();
            }
            catch
            {

            }
            return result;
        }
        private string studioNewsSave(HttpContext context)
        {
            string result = "";
            HttpRequest request = context.Request;
            System.Web.SessionState.HttpSessionState session = context.Session;
            string msg = string.Empty;
            StringBuilder sbMsg = new StringBuilder();
            try
            {
                if (session["userId"] == null)
                {
                    return "go_login";
                }

                HttpFileCollection files = context.Request.Files;
                if (files.Count > 0)
                {
                    string filePath = context.Server.MapPath("..\\..\\uploads\\images\\");

                    if (!System.IO.Directory.Exists(filePath))
                        System.IO.Directory.CreateDirectory(filePath);
                    filePath = System.IO.Path.Combine(filePath, System.IO.Path.GetFileName(files[0].FileName));

                    if (!System.IO.File.Exists(filePath))
                        files[0].SaveAs(filePath);
                    if (renameFile(ref filePath, context))
                    {
                        msg = filePath;
                        msg = System.IO.Path.GetFileName(filePath);
                        sbMsg.Append(msg + ",");
                    }
                }
            }
            catch (Exception ex)
            {
                result = ex.Message.ToString();
            }
            finally
            {
                int errorCode = 0;
                string saveTag = request["tag"].ToString();
                string newsIds = request["newsId"];
                int newsId = 0;
                int.TryParse(newsIds, out newsId);
                int dataOper = GetDataOperType(saveTag);

                if (msg == String.Empty)
                {
                    msg = request["iconPath"];
                }
                else
                {
                    msg = "uploads/images/" + msg;
                }
                string newsDetail = request["newsDetail"];
                string newsDetail_h5 = newsDetail;
                if (newsDetail.IndexOf("img") != -1 && newsDetail.IndexOf("http://www.fetv.cn/fe/ueditor/net") != -1)
                {
                    string savePath = context.Server.MapPath("..\\..\\ueditor\\net\\uploads\\images\\");
                    newsDetail_h5 = H5Helper.getH5Content(newsDetail, savePath);
                }
                if (newsDetail.IndexOf("embed") != -1 && newsDetail.IndexOf("<video") != -1)
                {
                    Regex reg = new Regex("width\\s*=\\s*\\S+ height\\s*=\\s*\\S+");
                    string replaceStr = "width=\"100%\" height=\"\"";
                    newsDetail_h5 = reg.Replace(newsDetail, replaceStr);
                }
                
                List<SqlParameter> sqlparm = new List<SqlParameter>();
                sqlparm.Add(new SqlParameter("@newsId", newsId));
                sqlparm.Add(new SqlParameter("@newsTypeId", request["newsTypeId"]));
                sqlparm.Add(new SqlParameter("@organId", request["organId"]));
                sqlparm.Add(new SqlParameter("@code", request["code"]));
                sqlparm.Add(new SqlParameter("@name", request["title"]));
                sqlparm.Add(new SqlParameter("@title", request["title"]));
                sqlparm.Add(new SqlParameter("@iconPath", msg));
                sqlparm.Add(new SqlParameter("@mobileIconPath", msg));
                sqlparm.Add(new SqlParameter("@source", request["source"]));

                sqlparm.Add(new SqlParameter("@reportDate", request["reportDate"]));
                sqlparm.Add(new SqlParameter("@useAsBanner", request["useAsBanner"]));
                sqlparm.Add(new SqlParameter("@introduce", request["introduce"]));
                sqlparm.Add(new SqlParameter("@newsDetail", request["newsDetail"]));
                sqlparm.Add(new SqlParameter("@newsDetail_h5", newsDetail_h5));
                sqlparm.Add(new SqlParameter("@inserter", session["userId"]));
                sqlparm.Add(new SqlParameter("@saveTag", dataOper + 1));
                sqlparm.Add(new SqlParameter("@errorCode", errorCode));
                sqlparm.Add(new SqlParameter("@errorMessage", SqlDbType.VarChar, 100));
                string[] sResult = new string[] { "@errorMessage" };
                result = SqlHelper.ExecProcedure("proc_fe_news_Save", sqlparm.ToArray(), sResult, '|');

            }
            return result;

        }
 
        /// <summary>
        /// 工作室保存
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        private string teachingStudioSave(HttpContext context)
        {
            string result = "[{}]";
            string msg = string.Empty;
            System.Web.SessionState.HttpSessionState session = context.Session;
            StringBuilder sbMsg = new StringBuilder();
            try
            {
                if (session["userId"] == null)
                {
                    return "go_login";
                }
                
                HttpFileCollection files = context.Request.Files;
                if (files.Count > 0)
                {
                    if (files[0].FileName != null && files[0].FileName != "" && files[0].FileName != "undefined")
                    {
                        string filePath = context.Server.MapPath("..\\..\\uploads\\images\\");

                        if (!System.IO.Directory.Exists(filePath))
                            System.IO.Directory.CreateDirectory(filePath);
                        filePath = System.IO.Path.Combine(filePath, System.IO.Path.GetFileName(files[0].FileName));

                        if (!System.IO.File.Exists(filePath))
                            files[0].SaveAs(filePath);
                        if (renameFile(ref filePath, context))
                        {
                            msg = filePath;
                            msg = System.IO.Path.GetFileName(filePath);
                            sbMsg.Append(msg + ",");
                        }
                    }
                }
                
            }
            catch (Exception ex)
            {
                result = ex.ToString();
            }
            finally
            {
                StringBuilder sql = new StringBuilder();
                sql.Append("select teacherId from fe_teacher where adminId = " + session["userId"]);
                DataTable dtPage = SqlHelper.GetTable(sql.ToString());
                string teacherId = "0";
                if (dtPage.Rows.Count > 0)
                {
                    teacherId = dtPage.Rows[0][0].ToString();
                }
                
                HttpRequest request = context.Request;
                string teachingStudioIds = request["teachingStudioId"];

                string provinceIds = request["provinceId"];
                int teachingStudioId = getAppropriateId(teachingStudioIds, true);

                int provinceId = getAppropriateId(provinceIds);

                string saveTag = request["saveTag"];

                int dataOper = GetDataOperType(saveTag) + 1;
                int errorCode = 0;
                List<SqlParameter> sqlparm = new List<SqlParameter>();
                //sqlparm.Add(new SqlParameter("@teachingStudioId", teachingStudioId));
                sqlparm.Add(new SqlParameter("@organId", teachingStudioId));
                sqlparm.Add(new SqlParameter("@organType", 3));
                sqlparm.Add(new SqlParameter("@inserter", teacherId));

                sqlparm.Add(new SqlParameter("@provinceId", provinceId));

                sqlparm.Add(new SqlParameter("@cityId", request["cityId"]));
                sqlparm.Add(new SqlParameter("@educationalLevelId", request["educationalLevelId"]));

                sqlparm.Add(new SqlParameter("@subjectId", request["subjectId"]));
                sqlparm.Add(new SqlParameter("@iconPath", "uploads/images/"+msg));
                sqlparm.Add(new SqlParameter("@name", request["name"]));
                sqlparm.Add(new SqlParameter("@introduce", request["introduce"]));

                sqlparm.Add(new SqlParameter("@saveTag", dataOper));
                sqlparm.Add(new SqlParameter("@errorCode", errorCode));
                sqlparm.Add(new SqlParameter("@errorMessage", SqlDbType.VarChar, 100));

                string[] sOut = new string[3];
                sOut[0] = "@organId";
                sOut[1] = "@errorCode";
                sOut[2] = "@errorMessage";
                result = SqlHelper.ExecProcedure("proc_fe_teachingStudio_Save", sqlparm.ToArray(), sOut, '|');
                string[] sResult = result.Split('|');
                string errorCodes = sResult[1];
                errorCode = getAppropriateId(errorCodes, true);
                if (errorCode == 0)
                    result = ((int)UpdateInfo.success).ToString();
                else
                    result = ((int)UpdateInfo.failure).ToString();
                result = sResult[2];
            }
            return result;
        }
        private string TeacherClassSave(HttpContext context)
        {
            string result = "[{}]";
            try
            {
                System.Web.SessionState.HttpSessionState session = context.Session;
                if (session["userId"] == null)
                {
                    return "go_login";
                }
                StringBuilder sql = new StringBuilder();
                sql.Append("select teacherId from fe_teacher where adminId = " + session["userId"]);
                DataTable dtPage = SqlHelper.GetTable(sql.ToString());
                string teacherId = "0";
                if (dtPage.Rows.Count > 0)
                {
                    teacherId = dtPage.Rows[0][0].ToString();
                }
                
                HttpRequest request = context.Request;
                string classTeacherRsIds = request["classTId"];


                int classTeacherRsId = getAppropriateId(classTeacherRsIds, true);

                

                string saveTag = request["saveTag"];

                int dataOper = GetDataOperType(saveTag) + 1;
                int errorCode = 0;
                List<SqlParameter> sqlparm = new List<SqlParameter>();
                //sqlparm.Add(new SqlParameter("@teachingStudioId", teachingStudioId));
                sqlparm.Add(new SqlParameter("@classTeacherRsId", classTeacherRsId));
                sqlparm.Add(new SqlParameter("@classId", request["classId"]));
                sqlparm.Add(new SqlParameter("@teacherId", teacherId));
                sqlparm.Add(new SqlParameter("@inserter", teacherId));

                sqlparm.Add(new SqlParameter("@saveTag", dataOper));
                sqlparm.Add(new SqlParameter("@errorCode", errorCode));
                sqlparm.Add(new SqlParameter("@errorMessage", SqlDbType.VarChar, 100));

                string[] sOut = new string[3];
                sOut[0] = "@classTeacherRsId";
                sOut[1] = "@errorCode";
                sOut[2] = "@errorMessage";
                result = SqlHelper.ExecProcedure("proc_fe_classTeacherRs_Save", sqlparm.ToArray(), sOut, '|');
                string[] sResult = result.Split('|');
                string errorCodes = sResult[1];
                errorCode = getAppropriateId(errorCodes, true);
                if (errorCode == 0)
                    result = ((int)UpdateInfo.success).ToString();
                else
                    result = ((int)UpdateInfo.failure).ToString();
            }
            catch (Exception ex)
            {
            }
            return result;
        }
        /// <summary>
        /// 文章保存
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        private string articleSave(HttpContext context)
        {
            string result = "[]";
            string msg = string.Empty;
            string iconPath = "";
            StringBuilder sbMsg = new StringBuilder();
            try
            {
                System.Web.SessionState.HttpSessionState session = context.Session;
                if (session["userId"] == null)
                {
                    return "go_login";
                }
                StringBuilder sql = new StringBuilder();
                sql.Append("select teacherId from fe_teacher where adminId = " + session["userId"]);
                DataTable dtPage = SqlHelper.GetTable(sql.ToString());
                string teacherId = "0";
                if (dtPage.Rows.Count > 0)
                {
                    teacherId = dtPage.Rows[0][0].ToString();
                }
                HttpFileCollection files = context.Request.Files;
                if (files.Count > 0)
                {
                    for (int i = 0; i < files.Count; i++)
                    {
                        if (files[i].FileName != null && files[i].FileName != "" && files[i].FileName != "undefined")
                        {
                            string filePath = context.Server.MapPath("..\\..\\uploads\\images\\");
                            iconPath = files[i].FileName;
                            if (!System.IO.Directory.Exists(filePath))
                                System.IO.Directory.CreateDirectory(filePath);
                            filePath = System.IO.Path.Combine(filePath, System.IO.Path.GetFileName(files[i].FileName));
                            if (!System.IO.File.Exists(filePath))
                                files[i].SaveAs(filePath);
                            //LogOper.writeLog("formDataUpload filePath=" + filePath);
                            //if (!System.IO.File.Exists(filePath))
                            //{
                            //    result = "904";
                            //    return result;
                            //}
                            if (renameFile(ref filePath, context))
                            {
                                msg = filePath;
                                msg = System.IO.Path.GetFileName(filePath);
                                sbMsg.Append(msg + " ");
                            }
                        }
                    }
                    
                }
                HttpRequest request = context.Request;
                string articleIds = request["articleId"];
               
                string saveTag = request["saveTag"];

                int articleId = getAppropriateId(articleIds, true);
               

                int dataOper = GetDataOperType(saveTag) + 1;
                int errorCode = 0;
                List<SqlParameter> sqlparm = new List<SqlParameter>();
                sqlparm.Add(new SqlParameter("@articleId", articleId));
                sqlparm.Add(new SqlParameter("@teacherId", teacherId));
                sqlparm.Add(new SqlParameter("@title", request["title"]));
                sqlparm.Add(new SqlParameter("@note", request["introduce"]));
                sqlparm.Add(new SqlParameter("@content", request["content"]));
                if (iconPath != "")
                {
                    sqlparm.Add(new SqlParameter("@iconPath", "uploads/images/" + msg));//需要另外处理
                }
                else
                {
                    sqlparm.Add(new SqlParameter("@iconPath", ""));
                }
                sqlparm.Add(new SqlParameter("@saveTag", dataOper));
                sqlparm.Add(new SqlParameter("@errorCode", errorCode));
                sqlparm.Add(new SqlParameter("@errorMessage", SqlDbType.VarChar, 100));

                string[] sOut = new string[3];
                sOut[0] = "@articleId";
                sOut[1] = "@errorCode";
                sOut[2] = "@errorMessage";
                result = SqlHelper.ExecProcedure("proc_fe_article_Save", sqlparm.ToArray(), sOut, '|');
                string[] sResult = result.Split('|');
                string errorCodes = sResult[1];
                errorCode = getAppropriateId(errorCodes, true);
                if (errorCode == 0)
                    result = ((int)UpdateInfo.success).ToString();
                else
                    result = ((int)UpdateInfo.failure).ToString();
            }
            catch (Exception ex)
            {
                result = ex.ToString();
            }
            return result;
        }
        private string ClassStudentDelete(HttpContext context)
        {
            string result = "";
            
            try
            {
                System.Web.SessionState.HttpSessionState session = context.Session;
                if (session["userId"] == null)
                {
                    return "go_login";
                }
                StringBuilder sql = new StringBuilder();
                sql.Append("select teacherId from fe_teacher where adminId = " + session["userId"]);
                DataTable dtPage = SqlHelper.GetTable(sql.ToString());
                string teacherId = "0";
                if (dtPage.Rows.Count > 0)
                {
                    teacherId = dtPage.Rows[0][0].ToString();
                }
                
                HttpRequest request = context.Request;
                string saveTag = request["saveTag"];
                string studentIds = request["studentId"];
                int studentId = getAppropriateId(studentIds, true);
                int dataOper = GetDataOperType(saveTag) + 1;
                int errorCode = 0;
                List<SqlParameter> sqlparm = new List<SqlParameter>();
                sqlparm.Add(new SqlParameter("@studentId", studentId));
                sqlparm.Add(new SqlParameter("@inserter", teacherId));
               
                sqlparm.Add(new SqlParameter("@saveTag", dataOper));
                sqlparm.Add(new SqlParameter("@errorCode", errorCode));
                sqlparm.Add(new SqlParameter("@errorMessage", SqlDbType.VarChar, 100));

                string[] sOut = new string[3];
                sOut[0] = "@studentId";
                sOut[1] = "@errorCode";
                sOut[2] = "@errorMessage";
                result = SqlHelper.ExecProcedure("proc_fe_studentClass_Delete", sqlparm.ToArray(), sOut, '|');
                string[] sResult = result.Split('|');
                string errorCodes = sResult[1];
                errorCode = getAppropriateId(errorCodes, true);
                if (errorCode == 0)
                    result = ((int)UpdateInfo.success).ToString();
                else
                    result = ((int)UpdateInfo.failure).ToString();
            }
            catch (Exception ex)
            {
                result = ex.ToString();
            }
            return result;
        }
        private string teacherResourceSave(HttpContext context)
        {
            string result = "";
            string msg = string.Empty;
            string iconPath = "";
            string resourcePath = "";
            StringBuilder sbMsg = new StringBuilder();
            HttpFileCollection files = context.Request.Files;
            try
            {
                System.Web.SessionState.HttpSessionState session = context.Session;
                if (session["userId"] == null)
                {
                    return "go_login";
                }
                StringBuilder sql = new StringBuilder();
                sql.Append("select teacherId from fe_teacher where adminId = " + session["userId"]);
                DataTable dtPage = SqlHelper.GetTable(sql.ToString());
                string teacherId = "0";
                if (dtPage.Rows.Count > 0)
                {
                    teacherId = dtPage.Rows[0][0].ToString();
                }
                if (files.Count > 0)
                {
                    for (int i = 0; i < files.Count; i++)
                    {
                        if (files[i].FileName != null && files[i].FileName != "" && files[i].FileName != "undefined")
                        {
                            string filePath = context.Server.MapPath("..\\..\\uploads\\resource\\");
                            if (i == 0)
                            {
                                resourcePath = files[i].FileName;
                            }
                            if (i == 1)
                            {
                                iconPath = files[i].FileName;
                            }
                            if (!System.IO.Directory.Exists(filePath))
                                System.IO.Directory.CreateDirectory(filePath);
                            filePath = System.IO.Path.Combine(filePath, System.IO.Path.GetFileName(files[i].FileName));
                            if (i == 0)
                            {
                                resourcePath = System.IO.Path.GetFileName(files[i].FileName);
                            }
                            if (i == 1)
                            {
                                iconPath = System.IO.Path.GetFileName(files[i].FileName);
                            }
                            if (!System.IO.File.Exists(filePath))
                                files[i].SaveAs(filePath);
                            //LogOper.writeLog("formDataUpload filePath=" + filePath);
                            if (renameFile_Resource(ref filePath, context))
                            {
                                msg = filePath;
                                msg = System.IO.Path.GetFileName(filePath);
                                sbMsg.Append(msg + " ");
                            }
                        }
                    }
                    msg = sbMsg.ToString().Trim().Replace(" ", ",");//获取文件路径列表 
                    string res = msg;//"{msg:'" + msg + "'}";
                    //context.Response.Write(res);
                }
                string[] arr = msg.Split(new string[] { "," }, StringSplitOptions.RemoveEmptyEntries);
                if (arr.Length > 1)
                {
                    resourcePath = arr[0];
                    iconPath = arr[1];
                }
                else
                {
                    if (iconPath != "")
                    {
                        iconPath = msg;
                    }
                    else
                    {
                        resourcePath = msg;
                    }
                }

                HttpRequest request = context.Request;
                string studioResourceIds = request["studioResourceId"];
               
                string saveTag = request["saveTag"];
                //resourcePath = request["resourcePath"];

                string resourceExts = "";
                if (!string.IsNullOrEmpty(resourcePath))
                    resourceExts = System.IO.Path.GetExtension(resourcePath);
                if (!string.IsNullOrEmpty(resourceExts))
                    resourceExts = resourceExts.ToLower().Replace(".", "").Replace("docx", "doc").Replace("xlsx", "xls");

                ResourceType rt = ResourceType.img;// 
                try
                {
                    if (!string.IsNullOrEmpty(resourceExts))
                        rt = (fjEducation.ResourceType)Enum.Parse(typeof(ResourceType), resourceExts);
                }
                catch (Exception ex)
                {
                    rt = ResourceType.img;
                }
                int vesourceType = (int)rt;
                int studioResourceId = getAppropriateId(studioResourceIds, true);

                string isopen = request["R_open"]; // on

                int dataOper = GetDataOperType(saveTag) + 1;
                int errorCode = 0;
                List<SqlParameter> sqlparm = new List<SqlParameter>();
                sqlparm.Add(new SqlParameter("@studioResourceId", studioResourceId));
                sqlparm.Add(new SqlParameter("@organId ", request["organId"]));
                sqlparm.Add(new SqlParameter("@inserter", teacherId));
                sqlparm.Add(new SqlParameter("@title", request["title"]));
                sqlparm.Add(new SqlParameter("@note", request["note"]));

                if (isopen == "on")
                {
                    sqlparm.Add(new SqlParameter("@isopen", "1"));
                }
                else
                {
                    sqlparm.Add(new SqlParameter("@isopen", "0"));
                }

                if (iconPath != "")
                {
                    sqlparm.Add(new SqlParameter("@iconPath", "uploads/resource/" + iconPath)); //request["iconPath"]
                }
                else
                {
                    sqlparm.Add(new SqlParameter("@iconPath", ""));
                }
                sqlparm.Add(new SqlParameter("@resourceExt", vesourceType));
                if (resourcePath != "")
                {
                    sqlparm.Add(new SqlParameter("@resourcePath", "uploads/resource/" + resourcePath));//
                }
                else
                {
                    sqlparm.Add(new SqlParameter("@resourcePath", ""));
                }
                sqlparm.Add(new SqlParameter("@saveTag", dataOper));
                sqlparm.Add(new SqlParameter("@errorCode", errorCode));
                sqlparm.Add(new SqlParameter("@errorMessage", SqlDbType.VarChar, 100));

                string[] sOut = new string[3];
                sOut[0] = "@studioResourceId";
                sOut[1] = "@errorCode";
                sOut[2] = "@errorMessage";
                result = SqlHelper.ExecProcedure("proc_fe_studioResource_Save", sqlparm.ToArray(), sOut, '|');
                string[] sResult = result.Split('|');
                string errorCodes = sResult[1];
                errorCode = getAppropriateId(errorCodes, true);
                if (errorCode == 0)
                    result = ((int)UpdateInfo.success).ToString();
                else
                    result = ((int)UpdateInfo.failure).ToString();
            }
            catch (Exception ex)
            {
                result = ex.ToString();
            }
            return result;
        }
        /// <summary>
        /// 教师录播课程基本信息保存
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        private string teacherCourseSave(HttpContext context)
        {
            string result = "";
            string msg = string.Empty;
            StringBuilder sbMsg = new StringBuilder();
            HttpFileCollection files = context.Request.Files;
            try
            {
                if (files.Count > 0)
                {
                    if (files[0].ContentLength > 0)
                    {
                        string filePath = context.Server.MapPath("..\\..\\uploads\\images\\");

                        if (!System.IO.Directory.Exists(filePath))
                            System.IO.Directory.CreateDirectory(filePath);
                        filePath = System.IO.Path.Combine(filePath, System.IO.Path.GetFileName(files[0].FileName));

                        if (!System.IO.File.Exists(filePath))
                            files[0].SaveAs(filePath);
                        if (renameFile(ref filePath, context))
                        {
                            msg = filePath;
                            msg = System.IO.Path.GetFileName(filePath);
                            sbMsg.Append(msg + ",");
                        }
                    }
                }

                HttpRequest request = context.Request;
                System.Web.SessionState.HttpSessionState session = context.Session;
                if (session["userId"] == null)
                {
                    return "go_login";
                }
                StringBuilder sql = new StringBuilder();
                sql.Append("select teacherId from fe_teacher where adminId = " + session["userId"]);
                DataTable dtPage = SqlHelper.GetTable(sql.ToString());
                string teacherId = "0";
                if (dtPage.Rows.Count > 0)
                {
                    teacherId = dtPage.Rows[0][0].ToString();
                }
                string saveTag = request["saveTag"];
                int dataOper = GetDataOperType(saveTag) + 1;

                string prices = request["price"];
                Decimal price = 0;
                Decimal.TryParse(prices, out price);

                string preferentialPrices = request["preferentialPrice"];
                Decimal preferentialPrice = 0;
                Decimal.TryParse(preferentialPrices, out preferentialPrice);

                string courseIds = request["courseId"];
                int courseId = 0;
                int.TryParse(courseIds, out courseId);

                if (msg == String.Empty)
                {
                    msg = request["iconPath"];
                }
                else
                {
                    msg = "uploads/images/" + msg;
                }

                string isopen = request["R_open"];
                int errorCode = 0;
                if (request["type"].ToString() == "1")
                {
                    List<SqlParameter> sqlparme = new List<SqlParameter>();
                    sqlparme.Add(new SqlParameter("@microLectureId", courseId));
                    sqlparme.Add(new SqlParameter("@teacherId", teacherId));
                    sqlparme.Add(new SqlParameter("@name", request["name"]));
                    sqlparme.Add(new SqlParameter("@title", request["title"]));
                    sqlparme.Add(new SqlParameter("@iconPath", msg));
                    sqlparme.Add(new SqlParameter("@price", price));
                    sqlparme.Add(new SqlParameter("@preferentialPrice", preferentialPrice));
                    sqlparme.Add(new SqlParameter("@isFree", request["isFree"]));
                    sqlparme.Add(new SqlParameter("@isHottest", request["isHottest"]));
                    if (isopen == "on")
                    {
                        sqlparme.Add(new SqlParameter("@isOpen", "1"));
                    }
                    else
                    {
                        sqlparme.Add(new SqlParameter("@isOpen", "0"));
                    }
                    sqlparme.Add(new SqlParameter("@gradeId", request["gradeSelect"]));
                    sqlparme.Add(new SqlParameter("@subjectId", request["subjectSelect"]));
                    sqlparme.Add(new SqlParameter("@introduce", request["introduce"]));
                    sqlparme.Add(new SqlParameter("@detail", request["detail"]));
                    sqlparme.Add(new SqlParameter("@saveTag", dataOper));
                    sqlparme.Add(new SqlParameter("@errorCode", errorCode));
                    sqlparme.Add(new SqlParameter("@errorMessage", SqlDbType.VarChar, 100));

                    string[] sOut = new string[3];
                    sOut[0] = "@microLectureId";
                    sOut[1] = "@errorCode";
                    sOut[2] = "@errorMessage";
                    result = SqlHelper.ExecProcedure("proc_fe_microLecture_Save", sqlparme.ToArray(), sOut, '|');
                    string[] sResult = result.Split('|');
                    string errorCodes = sResult[1];
                    errorCode = getAppropriateId(errorCodes, true);
                    if (errorCode == 0)
                        result = ((int)UpdateInfo.success).ToString();
                    else
                        result = ((int)UpdateInfo.failure).ToString();
                    if (result == "200")
                    {
                        result = sResult[0];
                    }
                    else
                    {
                        result = "";
                    }
                }
                else
                {
                    List<SqlParameter> sqlparm = new List<SqlParameter>();
                    sqlparm.Add(new SqlParameter("@courseId", courseId));
                    sqlparm.Add(new SqlParameter("@teacherId", teacherId));
                    sqlparm.Add(new SqlParameter("@name", request["name"]));
                    sqlparm.Add(new SqlParameter("@title", request["title"]));
                    sqlparm.Add(new SqlParameter("@iconPath", msg));
                    sqlparm.Add(new SqlParameter("@price", price));
                    sqlparm.Add(new SqlParameter("@preferentialPrice", preferentialPrice));
                    sqlparm.Add(new SqlParameter("@isFree", request["isFree"]));
                    sqlparm.Add(new SqlParameter("@isHottest", request["isHottest"]));
                    if (isopen == "on")
                    {
                        sqlparm.Add(new SqlParameter("@isOpen", "1"));
                    }
                    else
                    {
                        sqlparm.Add(new SqlParameter("@isOpen", "0"));
                    }
                    sqlparm.Add(new SqlParameter("@gradeId", request["gradeSelect"]));
                    sqlparm.Add(new SqlParameter("@subjectId", request["subjectSelect"]));
                    sqlparm.Add(new SqlParameter("@introduce", request["introduce"]));
                    sqlparm.Add(new SqlParameter("@detail", request["detail"]));
                    sqlparm.Add(new SqlParameter("@saveTag", dataOper));
                    sqlparm.Add(new SqlParameter("@errorCode", errorCode));
                    sqlparm.Add(new SqlParameter("@errorMessage", SqlDbType.VarChar, 100));

                    string[] sOut = new string[3];
                    sOut[0] = "@courseId";
                    sOut[1] = "@errorCode";
                    sOut[2] = "@errorMessage";
                    result = SqlHelper.ExecProcedure("proc_fe_teacher_RECCourse_Save", sqlparm.ToArray(), sOut, '|');
                    string[] sResult = result.Split('|');
                    string errorCodes = sResult[1];
                    errorCode = getAppropriateId(errorCodes, true);
                    if (errorCode == 0)
                        result = ((int)UpdateInfo.success).ToString();
                    else
                        result = ((int)UpdateInfo.failure).ToString();
                    if (result == "200")
                    {
                        result = sResult[0];
                    }
                    else
                    {
                        result = "";
                    }
                }
            }
            catch
            {
                result = "error";
            }
            return result;
        }
        private string getOrderLiveCourse(HttpContext context)
        {
            string result = "[{}]";
            try
            {
                HttpRequest request = context.Request;
                System.Web.SessionState.HttpSessionState session = context.Session;
                if (session["userId"] == null)
                {
                    return "go_login";
                }
                StringBuilder sql = new StringBuilder();
                sql.Append("select teacherId from fe_teacher where adminId = " + session["userId"]);
                DataTable dtPage = SqlHelper.GetTable(sql.ToString());
                string teacherId = "0";
                if (dtPage.Rows.Count > 0)
                {
                    teacherId = dtPage.Rows[0][0].ToString();
                }
                string userIds = teacherId;
                string userType = "teacher";
                string subjectName = request["subjectName"];
                string courseName = request["courseName"];
                string playState = request["playState"];

                string personType = getUserTypeIndex(userType);
                userId = getAppropriateId(userIds);

                string pageIndexs = request["pageIndex"];
                string pageSizes = request["pageSize"];
                pageIndex = getAppropriateId(pageIndexs);
                pageSize = getAppropriateId(pageSizes);

                if (pageIndex == 0)
                    pageIndex = 1;
                if (pageSize == 0)
                    pageSize = 9;

                string sWhere = " "; //
                if (!string.IsNullOrEmpty(subjectName))
                    sWhere += " and s.name like '%" + subjectName + "%' ";
                if (!string.IsNullOrEmpty(courseName))
                    sWhere += " and c.name like '%" + courseName + "%' ";
                if (!string.IsNullOrEmpty(playState))
                {
                    if (playState == "0")
                        sWhere += " and convert(datetime,  convert(varchar(10), cp.playDate) + ' ' + convert(varchar(8),cp.playBeginTime))  > getDate() ";
                    else if (playState == "1")
                        sWhere += " and convert(datetime,  convert(varchar(10), cp.playDate) + ' ' + convert(varchar(8),cp.playBeginTime))  <= getDate() and convert(datetime,  convert(varchar(10), cp.playDate) + ' ' + convert(varchar(8),cp.playEndTime))  >= getDate() ";
                    else if (playState == "2")
                        sWhere += " and convert(datetime,  convert(varchar(10), cp.playDate) + ' ' + convert(varchar(8),cp.playEndTime))  < getDate() ";
                }

                StringBuilder sb = new StringBuilder();
                sb.Append("select row_number() over(order by c.courseId desc) as rownum,0 courseKind,c.recordType,c.price,c.preferentialPrice,cp.channelId,cp.channelProgramId, c.courseId,c.name courseName,cen.enrolmentId,cen.enrolmentType,s.subjectId, s.name subjectName,/*t.teacherId,t.name teacherName,c.classHour */ ch.rtmpUrl,ch.hlsUrl,  ");
                sb.Append(" convert(varchar(10), cp.playDate,120)  + ' ' + convert(varchar(5),cp.playBeginTime,120)  playBeginTime,convert(varchar(10), cp.playDate,120) + ' ' + convert(varchar(5),cp.playEndTime,120) playEndTime ,case when  convert(datetime,  convert(varchar(10), cp.playDate) + ' ' + convert(varchar(8),cp.playBeginTime))  > getDate() then '未开始' ");
                sb.Append(" when  convert(datetime,  convert(varchar(10), cp.playDate) + ' ' + convert(varchar(8),cp.playEndTime))  < getDate() then '已结束' ");
                sb.Append("  when convert(datetime,  convert(varchar(10), cp.playDate) + ' ' + convert(varchar(8),cp.playBeginTime))  <= getDate() and convert(datetime,  convert(varchar(10), cp.playDate) + ' ' + convert(varchar(8),cp.playEndTime))  >= getDate() then '进行中' end playState ");

                sb.Append(" from fe_courseEnrollment cen  inner join fe_course c on cen.courseId = c.courseId left join fe_subject s on c.subjectId = s.subjectId ");
                sb.Append(" left join fe_channelProgram cp on c.channelProgramId = cp.channelProgramId left join fe_channel ch on c.channelId = ch.channelId ");
                sb.Append("  where c.recordType=1 and cen.courseKind=0 and cen.enrolmentId =" + userId);
                sb.Append("  and cen.enrolmentType=" + personType + sWhere);

                string ssql = sb.ToString();

                string countSql = "select rownum from (" + ssql + ") c ";
                DataTable dtCount = SqlHelper.GetTable(countSql);

                string allSql = "select * from(" + ssql + " ) c where rownum >(" + (pageIndex - 1) * pageSize + ") AND rownum <=(" + pageIndex * pageSize + ") order by rownum asc ";
                DataTable dtAll = SqlHelper.GetTable(allSql);

                pageCount = (int)(Math.Ceiling((dtCount.Rows.Count) * 1.0 / pageSize));
                result = JSonHelper.DataTableToJsonData(dtAll, true, pageCount, dtCount.Rows.Count);  
            }
            catch (Exception ex)
            {
            }
            return result;
        }
        private string studentQuestionReplySave(HttpContext context)
        {
            string result = "";
            try
            {
                HttpRequest request = context.Request;

                System.Web.SessionState.HttpSessionState session = context.Session;
                if (session["userId"] == null)
                {
                    return "go_login";
                }
                StringBuilder sql = new StringBuilder();
                sql.Append("select teacherId from fe_teacher where adminId = " + session["userId"]);
                DataTable dtPage = SqlHelper.GetTable(sql.ToString());
                string teacherId = "0";
                if (dtPage.Rows.Count > 0)
                {
                    teacherId = dtPage.Rows[0][0].ToString();
                }
                
                string saveTag = "add";//request["saveTag"]
                int dataOper = GetDataOperType(saveTag) + 1;
                int errorCode = 0;

                int questionReplyId = 0;
                string questionReplyIds = request["questionReplyId"];
                int.TryParse(questionReplyIds, out questionReplyId);

                int questionerId = 0;
                string questionerIds = teacherId;
                int.TryParse(questionerIds, out questionerId);

                int questionId = 0;
                string questionIds = request["questionId"];
                int.TryParse(questionIds, out questionId);

                List<SqlParameter> sqlparm = new List<SqlParameter>();
                sqlparm.Add(new SqlParameter("@questionReplyId", questionReplyId));
                sqlparm.Add(new SqlParameter("@questionId", questionId));
                sqlparm.Add(new SqlParameter("@replyOrQuestion", request["replyOrQuestion"]));
                sqlparm.Add(new SqlParameter("@replyContent", request["replyContent"]));
                sqlparm.Add(new SqlParameter("@questionerId", questionerId));
                sqlparm.Add(new SqlParameter("@questionerType", request["questionerType"]));
                sqlparm.Add(new SqlParameter("@saveTag", dataOper));
                sqlparm.Add(new SqlParameter("@errorCode", errorCode));
                sqlparm.Add(new SqlParameter("@errorMessage", SqlDbType.VarChar, 100));

                string[] sOut = new string[3];
                sOut[0] = "@questionReplyId";
                sOut[1] = "@errorCode";
                sOut[2] = "@errorMessage";
                result = SqlHelper.ExecProcedure("proc_fe_questionReply_Save", sqlparm.ToArray(), sOut, '|');
                string[] sResult = result.Split('|');
                string errorCodes = sResult[1];
                errorCode = getAppropriateId(errorCodes, true);
                if (errorCode == 0)
                    result = ((int)UpdateInfo.success).ToString();
                else
                    result = ((int)UpdateInfo.failure).ToString();
            }
            catch (Exception ex)
            {
                result = ex.ToString();
            }
            return result;
        }
        private string deleteTeacherCourse(HttpContext context)
        {
            string result = "";
            try
            {
                HttpRequest request = context.Request;
                System.Web.SessionState.HttpSessionState session = context.Session;
                if (session["userId"] == null)
                {
                    return "go_login";
                }
                StringBuilder sql = new StringBuilder();
                sql.Append("select teacherId from fe_teacher where adminId = " + session["userId"]);
                DataTable dtPage = SqlHelper.GetTable(sql.ToString());
                string teacherId = "0";
                if (dtPage.Rows.Count > 0)
                {
                    teacherId = dtPage.Rows[0][0].ToString();
                }
                string saveTag = request["saveTag"];
                int dataOper = GetDataOperType(saveTag) + 1;
                int errorCode = 0;

                List<SqlParameter> sqlparm = new List<SqlParameter>();
                sqlparm.Add(new SqlParameter("@courseId", request["courseId"]));
                sqlparm.Add(new SqlParameter("@teacherId", teacherId));
                sqlparm.Add(new SqlParameter("@name", request["title"]));
                sqlparm.Add(new SqlParameter("@iconPath", request["iconPath"]));
                sqlparm.Add(new SqlParameter("@price", request["price"]));
                sqlparm.Add(new SqlParameter("@preferentialPrice", request["preferentialPrice"]));
                sqlparm.Add(new SqlParameter("@isFree", request["isFree"]));
                sqlparm.Add(new SqlParameter("@isHottest", request["isHottest"]));
                sqlparm.Add(new SqlParameter("@introduce", request["introduce"]));
                sqlparm.Add(new SqlParameter("@detail", request["detail"]));
                sqlparm.Add(new SqlParameter("@saveTag", dataOper));
                sqlparm.Add(new SqlParameter("@errorCode", errorCode));
                sqlparm.Add(new SqlParameter("@errorMessage", SqlDbType.VarChar, 100));

                string[] sOut = new string[3];
                sOut[0] = "@teacherId";
                sOut[1] = "@errorCode";
                sOut[2] = "@errorMessage";
                result = SqlHelper.ExecProcedure("proc_fe_teacher_RECCourse_Save", sqlparm.ToArray(), sOut, '|');
                string[] sResult = result.Split('|');
                string errorCodes = sResult[1];
                errorCode = getAppropriateId(errorCodes, true);
                if (errorCode == 0)
                    result = ((int)UpdateInfo.success).ToString();
                else
                    result = ((int)UpdateInfo.failure).ToString();
            }
            catch
            {
                result = "error";
            }
            return result;
        }
        private string deleteTeacherLecture(HttpContext context)
        {
            string result = "";
            try
            {
                HttpRequest request = context.Request;
                System.Web.SessionState.HttpSessionState session = context.Session;
                if (session["userId"] == null)
                {
                    return "go_login";
                }
                StringBuilder sql = new StringBuilder();
                sql.Append("select teacherId from fe_teacher where adminId = " + session["userId"]);
                DataTable dtPage = SqlHelper.GetTable(sql.ToString());
                string teacherId = "0";
                if (dtPage.Rows.Count > 0)
                {
                    teacherId = dtPage.Rows[0][0].ToString();
                }
                string saveTag = request["saveTag"];
                int dataOper = GetDataOperType(saveTag) + 1;
                int errorCode = 0;

                List<SqlParameter> sqlparm = new List<SqlParameter>();
                sqlparm.Add(new SqlParameter("@microLectureId", request["courseId"]));
                sqlparm.Add(new SqlParameter("@saveTag", dataOper));
                sqlparm.Add(new SqlParameter("@errorCode", errorCode));
                sqlparm.Add(new SqlParameter("@errorMessage", SqlDbType.VarChar, 100));

                string[] sOut = new string[3];
                sOut[0] = "@microLectureId";
                sOut[1] = "@errorCode";
                sOut[2] = "@errorMessage";
                result = SqlHelper.ExecProcedure("proc_fe_microLecture_Save", sqlparm.ToArray(), sOut, '|');
                string[] sResult = result.Split('|');
                string errorCodes = sResult[1];
                errorCode = getAppropriateId(errorCodes, true);
                if (errorCode == 0)
                    result = ((int)UpdateInfo.success).ToString();
                else
                    result = ((int)UpdateInfo.failure).ToString();
            }
            catch
            {
                result = "error";
            }
            return result;
        }
        private string QuestionSave(HttpContext context)
        {
            string result = "";
            try
            {
                HttpRequest request = context.Request;
                System.Web.SessionState.HttpSessionState session = context.Session;
                if (session["userId"] == null)
                {
                    return "go_login";
                }
                StringBuilder sql = new StringBuilder();
                sql.Append("select teacherId from fe_teacher where adminId = " + session["userId"]);
                DataTable dtPage = SqlHelper.GetTable(sql.ToString());
                string teacherId = "0";
                if (dtPage.Rows.Count > 0)
                {
                    teacherId = dtPage.Rows[0][0].ToString();
                }
                string saveTag = request["saveTag"];
                int dataOper = GetDataOperType(saveTag) + 1;
                int errorCode = 0;

                List<SqlParameter> sqlparm = new List<SqlParameter>();
                sqlparm.Add(new SqlParameter("@questionId", request["questionId"]));
                sqlparm.Add(new SqlParameter("@teacherId", teacherId));
                sqlparm.Add(new SqlParameter("@name", request["name"]));
                sqlparm.Add(new SqlParameter("@title", request["title"]));
                sqlparm.Add(new SqlParameter("@content", request["content"]));
                sqlparm.Add(new SqlParameter("@courseId", request["courseId"]));
                sqlparm.Add(new SqlParameter("@questionerId", request["questionerId"]));
                sqlparm.Add(new SqlParameter("@questionerType", request["questionerType"]));
                sqlparm.Add(new SqlParameter("@readstates", request["states"]));
                sqlparm.Add(new SqlParameter("@replystates", "0"));
                sqlparm.Add(new SqlParameter("@saveTag", dataOper));
                sqlparm.Add(new SqlParameter("@errorCode", errorCode));
                sqlparm.Add(new SqlParameter("@errorMessage", SqlDbType.VarChar, 100));

                string[] sOut = new string[3];
                sOut[0] = "@questionId";
                sOut[1] = "@errorCode";
                sOut[2] = "@errorMessage";
                result = SqlHelper.ExecProcedure("proc_fe_question_Save", sqlparm.ToArray(), sOut, '|');
                string[] sResult = result.Split('|');
                string errorCodes = sResult[1];
                errorCode = getAppropriateId(errorCodes, true);
                if (errorCode == 0)
                    result = ((int)UpdateInfo.success).ToString();
                else
                    result = ((int)UpdateInfo.failure).ToString();
            }
            catch
            {
                result = "error";
            }
            return result;
        }
        private string getNewsQuestionNum(HttpContext context)
        {
            string result = "";
            HttpRequest request = context.Request;
            try
            {
                string kid = request["knowledgeId"];
                string source = request["source"];
                string questionTypeId = request["questionTypeIdOne"];
                string diff = request["diff"];
                string countSql = "";
                if (source == "1")
                {
                    countSql = "select count(1) from v_new_questions_teacher where difficulty = " + diff + " and questionTypeId = " + questionTypeId + " and (knowledgeId = " + kid + " or parentid = " + kid + " or LevelOneid = " + kid + ")";
                }
                else
                {
                    countSql = "select count(1) from v_new_questions where difficulty = " + diff + " and questionTypeId = " + questionTypeId + " and (knowledgeId = " + kid + " or parentid = " + kid + " or LevelOneid = " + kid + ")";
                }
                DataTable dtCount = SqlHelper.GetTable(countSql);
                result = dtCount.Rows[0][0].ToString();
                
            }
            catch(Exception ex)
            {
                result = ex.ToString();
            }
            return result;
        }
        private string getOrderRecordCourse(HttpContext context)
        {
            string result = "[{}]";
            try
            {
                HttpRequest request = context.Request;
                System.Web.SessionState.HttpSessionState session = context.Session;
                if (session["userId"] == null)
                {
                    return "go_login";
                }
                StringBuilder sql = new StringBuilder();
                sql.Append("select teacherId from fe_teacher where adminId = " + session["userId"]);
                DataTable dtPage = SqlHelper.GetTable(sql.ToString());
                string teacherId = "0";
                if (dtPage.Rows.Count > 0)
                {
                    teacherId = dtPage.Rows[0][0].ToString();
                }
                string userIds = teacherId;
                string userTypes = "teacher";
                string subjectName = request["subjectName"];
                string courseName = request["courseName"];
                string playState = request["playState"];

                string userType = getUserTypeIndex(userTypes);
                userId = getAppropriateId(userIds);

                string pageIndexs = request["pageIndex"];
                string pageSizes = request["pageSize"];
                pageIndex = getAppropriateId(pageIndexs);
                pageSize = getAppropriateId(pageSizes);

                if (pageIndex == 0)
                    pageIndex = 1;
                if (pageSize == 0)
                    pageSize = 9;

                string sWhere = " ";
                if (!string.IsNullOrEmpty(subjectName))
                    sWhere += " and s.name like '%" + subjectName + "%' ";
                if (!string.IsNullOrEmpty(courseName))
                    sWhere += " and c.name like '%" + courseName + "%' ";
                if (!string.IsNullOrEmpty(playState))
                    ; // to do

                StringBuilder sb = new StringBuilder();

                sb.Append("select row_number() over(order by c.courseId desc) as rownum ,* from (");
                sb.Append(" select c.recordType,0 courseKind, c.courseId,c.name courseName,cen.enrolmentId,cen.enrolmentType, s.subjectId,cc.videoId, s.name subjectName,t.teacherId,t.name teacherName,c.classHour,'未开始' playState from fe_courseEnrollment cen ");

                sb.Append(" inner join fe_course c on cen.courseId = c.courseId left join (select cc.courseId,min(videoId) videoId from fe_courseCatalog cc group by cc.courseId) cc on cc.courseId = c.courseId left join fe_teacher t on c.teacherId = t.teacherId left join fe_subject s on c.subjectId = s.subjectId ");
                sb.Append(" where c.recordType=0 and cen.courseKind=0 and  cen.enrolmentId=  " + userId);
                sb.Append("   and cen.enrolmentType=" + userType + sWhere);

                sb.Append("  union select c.recordType,1 courseKind, c.microLectureId courseId ,c.name courseName,cen.enrolmentId,cen.enrolmentType,s.subjectId,c.videoId, s.name subjectName,t.teacherId,t.name teacherName,1 classHour,'未开始' playState ");
                sb.Append("  from   fe_courseEnrollment cen inner join fe_microLecture c on cen.courseId = c.microLectureId  left join fe_teacher t on c.teacherId = t.teacherId left join fe_subject s on c.subjectId = s.subjectId ");
                sb.Append("  where c.recordType=0  and cen.courseKind=1 and  cen.enrolmentId=" + userId);
                sb.Append("  and cen.enrolmentType =" + userType + sWhere + ") c ");

                string ssql = sb.ToString();

                string countSql = "select rownum from (" + ssql + ") c ";
                DataTable dtCount = SqlHelper.GetTable(countSql);

                string allSql = "select * from(" + ssql + " ) c where rownum >(" + (pageIndex - 1) * pageSize + ") AND rownum <=(" + pageIndex * pageSize + ") order by rownum asc ";
                DataTable dtAll = SqlHelper.GetTable(allSql);

                pageCount = (int)(Math.Ceiling((dtCount.Rows.Count) * 1.0 / pageSize));
                result = JSonHelper.DataTableToJsonData(dtAll, true, pageCount, dtCount.Rows.Count);
            }
            catch (Exception ex)
            {
            }
            return result;
        }
        private string TeacherCourseCatalog(HttpContext context)
        {
            string result = "";
            try
            {
                HttpRequest request = context.Request;
                System.Web.SessionState.HttpSessionState session = context.Session;
                if (session["userId"] == null)
                {
                    return "go_login";
                }
                
                string saveTag = request["saveTag"];
                int dataOper = GetDataOperType(saveTag) + 1;
                int errorCode = 0;

                List<SqlParameter> sqlparm = new List<SqlParameter>();
                sqlparm.Add(new SqlParameter("@courseCatalogId", request["courseCatalogId"]));
                sqlparm.Add(new SqlParameter("@courseId", request["courseId"]));
                sqlparm.Add(new SqlParameter("@name", request["title"]));
                sqlparm.Add(new SqlParameter("@allowListen", request["allowListen"]));
                sqlparm.Add(new SqlParameter("@videoId", request["videoId"]));
                sqlparm.Add(new SqlParameter("@videoPath", request["videoPath"]));
                sqlparm.Add(new SqlParameter("@recommendListen", request["recommendListen"]));
                sqlparm.Add(new SqlParameter("@saveTag", dataOper));
                sqlparm.Add(new SqlParameter("@errorCode", errorCode));
                sqlparm.Add(new SqlParameter("@errorMessage", SqlDbType.VarChar, 100));

                string[] sOut = new string[3];
                sOut[0] = "@courseCatalogId";
                sOut[1] = "@errorCode";
                sOut[2] = "@errorMessage";
                result = SqlHelper.ExecProcedure("proc_fe_teacher_RECCourseCatalog_Save", sqlparm.ToArray(), sOut, '|');
                string[] sResult = result.Split('|');
                string errorCodes = sResult[1];
                errorCode = getAppropriateId(errorCodes, true);
                if (errorCode == 0)
                    result = ((int)UpdateInfo.success).ToString();
                else
                    result = ((int)UpdateInfo.failure).ToString();
            }
            catch
            {
                result = "error";
            }
            return result;
        }
        private string getTeacherCatalogDetail(HttpContext context)
        {
            string result = "";
            HttpRequest request = HttpContext.Current.Request;
            System.Web.SessionState.HttpSessionState session = context.Session;
            if (session["userId"] != null)
            {
                try
                {
                    StringBuilder sql = new StringBuilder();
                    sql.Append("select * from v_teacherCatalog where courseCatalogId =" + request["courseCatalogId"] + " and adminId =" + session["userId"]);

                    DataTable dtPage = SqlHelper.GetTable(sql.ToString());

                    result = JSonHelper.DataTableToJsonData(dtPage, true, Convert.ToInt32(dtPage.Rows.Count));
                }
                catch
                {
                    result = "Error";
                }
            }
            else
            {
                result = "go_login";
            }
            return result;
        }
        private static bool renameFile(ref string filePath, HttpContext context)
        {
            bool success = false;
            try
            {
                string tempfilePath = filePath;
                string time = GetTimeStamp();
                string fileMd5 = fjEducation.Md5Checker.getMD5ByMD5CryptoService(filePath);
                string fileExt = System.IO.Path.GetExtension(filePath);
                string fileName = fileMd5 + time + fileExt;
                filePath = context.Server.MapPath("..\\..\\uploads\\images\\");
                filePath = System.IO.Path.Combine(filePath, fileName);
                LogOper.writeLog("renameFile filePath=" + filePath);
                if (!System.IO.File.Exists(filePath))
                    System.IO.File.Move(tempfilePath, filePath);
                success = true;
            }
            catch (Exception ex)
            {
                success = false;
            }
            return success;
        }
        private static bool renameFile_Resource(ref string filePath, HttpContext context)
        {
            bool success = false;
            try
            {
                string tempfilePath = filePath;
                string time = GetTimeStamp();
                string fileMd5 = fjEducation.Md5Checker.getMD5ByMD5CryptoService(filePath);
                string fileExt = System.IO.Path.GetExtension(filePath);
                string fileName = fileMd5 + time + fileExt;
                filePath = context.Server.MapPath("..\\..\\uploads\\resource\\");
                filePath = System.IO.Path.Combine(filePath, fileName);
                LogOper.writeLog("renameFile filePath=" + filePath);
                if (!System.IO.File.Exists(filePath))
                    System.IO.File.Move(tempfilePath, filePath);
                success = true;
            }
            catch (Exception ex)
            {
                success = false;
            }
            return success;
        }
        public static string GetTimeStamp()
        {
            TimeSpan ts = DateTime.UtcNow - new DateTime(1970, 1, 1, 0, 0, 0, 0);
            return Convert.ToInt64(ts.TotalSeconds).ToString();
        } 
        private string getMd5EncryptPassword(string password)
        {
            string result = password;
            try
            {
                if (string.IsNullOrEmpty(password))
                    password = "";
                password = DesEncrypt.Encrypt(password);
                result = Md5Checker.Md5Encrypt(password);
                if (!string.IsNullOrEmpty(result))
                    result = result.ToLower();
            }
            catch (Exception e)
            {
            }
            return result;
        } 
         
    }
}
