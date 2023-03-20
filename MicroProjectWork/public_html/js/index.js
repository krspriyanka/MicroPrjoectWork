/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var jpdbBaseURL = 'http://api.login2explore.com:5577';
var jpdbIRL ='/api/irl';
var jpdbIML='/api/iml';
var StuDBName= "SCHOOL-DB";
var StuRelationName = "STUDENT-TABLE";
var connToken = "90932958|-31949275024670600|90947777";

$('#StuId').focus();


function resetForm() {
    $('#StuId').val("");
    $('#StuName').val("");
    $('#StuClass').val("");
    $('#dob').val("");
    $('#add').val("");
    $('#edate').val("");
    $('#StuId').prop("disabled",false);
    $('#save').prop("disabled",true);
    $('#update').prop("disabled",true);
    $('#reset').prop("disabled",false);
    $('#StuId').focus();
}

function saveaddta() {
    var jsonStrObj = valiaddteaddta();
    if(jsonStrObj === '') {
        return "";
    }
    var putRequest = createPUTRequest(connToken,jsonStrObj,StuDBName,StuRelationName);
    jQuery.ajaxSetup({async:false});
    var resJsonObj = executeCommanaddtGivenBaseUrl(putRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async:true});
    resetForm();
    $('#StuId').focus();
}

function valiaddteaddta() {
    var StuId,StuName, StuClass, dob, add, edate;
    StuId= $('#StuId').val();
    StuName= $('#StuName').val();
    StuClass= $('#StuClass').val();
    dob= $('#dob').val();
    add= $('#add').val();
    edate= $('#edate').val();

    if (StuId === '') {
        alert('Employee ID missing');
        $('#StuId').focus();
        return "";
    }
    if (StuName === '') {
        alert('Employee name missing');
        $('#StuName').focus();
        return "";
    }
    if (StuClass === '') {
        alert('Employee salary missing');
        $('#StuClass').focus();
        return "";
    }
    if (dob === '') {
        alert('dob missing');
        $('#dob').focus();
        return "";
    }
    if (add === '') {
        alert('add missing');
        $('#add').focus();
        return "";
    }
    if (edate=== '') {
        alert('edateion missing');
        $('#edate').focus();
        return "";
    }

    var jsonStrObj = {
        rollno: StuId,
        name: StuName,
        class: StuClass,
        dob: dob,
        add: add,
        edateion: edate
    };

    return JSON.stringify(jsonStrObj);
}

function updateaddta() {
    $('#update').prop('disabled',true);
    jsonChg = valiaddteaddta();
    var upaddteRequest = createUPaddTERecordRequest(connToken,jsonChg,StuDBName,StuRelationName, localStorage.getItem('recno'))
    jQuery.ajaxSetup({async:false});
    var resJsonObj = executeCommanaddtGivenBaseUrl(upaddteRequest,jpdbBaseURL,jpdbIML);
    jQuery.ajaxSetup({asyn:true});
    console.log(resJsonObj);
    resetForm();
    $('#StuId').focus();
}

function getStu() {
    var StuIdJsonObj = getStuIaddsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken,StuDBName, StuRelationName, StuIdJsonObj);
    jQuery.ajaxSetup({async:false});
    var resJsonObj = executeCommanaddtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({async:true});
    if (resJsonObj.status===400){
        $('#save').prop('disabled',false);
        $('#reset').prop('disabled',false);
        $('#StuName').focus();

    }
    else if (resJsonObj.status===200){
        $('#StuId').prop('disabled',true);
        filladdta(resJsonObj);

        $('#update').prop('disabled',false);
        $('#reset').prop('disabled',false);
        $('#StuName').focus();
    }
}

function getStuIaddsJsonObj(){
    var StuId = $('#StuId').val();
    var jsonStr ={
        id:StuId
    };
    return JSON.stringify(jsonStr);
}

function filladdta(jsonObj){
    saveRecNo2LS(jsonObj);
    var record= JSON.parse(jsonObj.addta).record;
    $('#StuName').val(record.name);
    $('#StuClass').val(record.name);
    $('#dob').val(record.dob);
    $('#add').val(record.add);
    $('#edate').val(record.edateion);

}

function saveRecNo2LS(jsonObj){
    var lvaddta = JSON.parse(jsonObj.addta);
    localStorage.setItem('recno',lvaddta.rec_no);
}

