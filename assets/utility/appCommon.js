function convertDate_to_MMddYYYY(date)
{
    var dateArray = date.split('/');
    return (dateArray[1]+'/'+dateArray[0]+'/'+dateArray[2]);

}
function convertDate_to_ddMMYYYY(date)
{
    var dateArray = date.split('/');
    return (dateArray[0]+'/'+dateArray[1]+'/'+dateArray[2]);

}

function formatDate_MMddYYYY(date)
{
    let _formattedDate=((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
    return _formattedDate;
}
function formatDate_ddMMYYYY(date)
{
        let day = date.getDate();
        let month = date.getMonth() + 1; //Months are zero-based
        let year = date.getFullYear();

        // Pad the day and month with leading zeros, if necessary
        day = (day < 10) ? '0' + day : day;
        month = (month < 10) ? '0' + month : month;

        return day + '/' + month + '/' + year;
    
}
function formatDate_ddMMYYYYfromString(date)
{        let formattedDate=new Date(date);
        let day = formattedDate.getDate();
        let month = formattedDate.getMonth() + 1; //Months are zero-based
        let year = formattedDate.getFullYear();

        // Pad the day and month with leading zeros, if necessary
        day = (day < 10) ? '0' + day : day;
        month = (month < 10) ? '0' + month : month;

        return day + '/' + month + '/' + year;
    
}

// Using Moment.js  >> https://gist.github.com/brandonjp/ac259099ba95868c4826fc0f58f9e7b4
function formateDateTimeInYYMMDDHHmmss(date)
{
    let data = moment(date);
    return data.format("YY-MM-DD HH:mm:ss");
}
function formateDateTimeInMMDDYYYYHHmmss(date)
{
    let data = moment(date);
    return data.format("MM/DD/YYYY HH:mm:ss");
}
function formatTimein24hourFormat(date)
{
    let data = moment(date);
    return data.format("HH:mm");
}
function formatTimein12hourFormat(date)
{
    let data = moment(date);
    return data.format("hh:mm A");
}


//Pass Dates (in DDMMYYYY format) and get the difference between two dates where Selected Age is less than current
function dateDifferenceBetweenTwoDates(newerdate,olderdate)
{
    
    const newerdate_MMDDYYYY=formatDate_MMddYYYY(olderdate);
    const olderdate_MMDDYYYY=formatDate_MMddYYYY(newerdate);
    
     //new date instance
     const dt_date1 = newerdate;
     const dt_date2 = olderdate;
 
     //Get the Timestamp
     const date1_time_stamp = dt_date1.getTime();
     const date2_time_stamp = dt_date2.getTime();
     let calc;

    //Check which timestamp is greater
    if (date1_time_stamp > date2_time_stamp) {
        calc = new Date(date1_time_stamp - date2_time_stamp);
    } else {
        calc = new Date(date2_time_stamp - date1_time_stamp);
    }
    //Retrieve the date, month and year
    const calcFormatTmp = calc.getDate() + '-' + (calc.getMonth() + 1) + '-' + calc.getFullYear();
    //Convert to an array and store
    const calcFormat = calcFormatTmp.split("-");
    //Subtract each member of our array from the default date
    const days_passed = Number(Math.abs(calcFormat[0]) - 1);
    const months_passed = Number(Math.abs(calcFormat[1]) - 1);
    const years_passed = Number(Math.abs(calcFormat[2]) - 1970);
    return {newerdate_MMDDYYYY:newerdate_MMDDYYYY,olderdate_MMDDYYYY:olderdate_MMDDYYYY,YY:years_passed,MM:months_passed,DD:days_passed};
}
//Pass DOB (in DDMMYYYY format) and get the Age
function dateDifferenceFromCurrentDate(_date)
{
    const dateinMMDDYYYY=formatDate_MMddYYYY(_date);
     //new date instance
     const dt_date1 = _date;
     const dt_date2 = new Date();
 
     //Get the Timestamp
     const date1_time_stamp = dt_date1.getTime();
     const date2_time_stamp = dt_date2.getTime();
     let calc;

    //Check which timestamp is greater
    if (date1_time_stamp > date2_time_stamp) {
        calc = new Date(date1_time_stamp - date2_time_stamp);
    } else {
        calc = new Date(date2_time_stamp - date1_time_stamp);
    }
    //Retrieve the date, month and year
    const calcFormatTmp = calc.getDate() + '-' + (calc.getMonth() + 1) + '-' + calc.getFullYear();
    //Convert to an array and store
    const calcFormat = calcFormatTmp.split("-");
    //Subtract each member of our array from the default date
    const days_passed = Number(Math.abs(calcFormat[0]) - 1);
    const months_passed = Number(Math.abs(calcFormat[1]) - 1);
    const years_passed = Number(Math.abs(calcFormat[2]) - 1970);
    return {dateMMDDYYYY:dateinMMDDYYYY,YY:years_passed,MM:months_passed,DD:days_passed};
}

function ValidateEmail(mail) 
{
    
    if(mail){

        var atposition=mail.indexOf("@");  
        var dotposition=mail.lastIndexOf(".");  
        if (atposition<1 || dotposition<atposition+2 || dotposition+2>=mail.length){  
           
          return false;  
          }return true;  
}

}
function generateUniqueId() {
    var timestamp = new Date().getTime();
    var randomChars = Math.random().toString(36).substr(2, 8);

    // Combine timestamp and random characters
    var uniqueId = timestamp.toString() + randomChars;

    // Take the first 8 characters
    uniqueId = uniqueId.substring(0, 8);

    return uniqueId;
  }
function PopupAlert(type,message)
{   let stylename='alert-warning';
    let Header='';
    let alertbox=$('.alert.alert-dismissible.CustomAlert.fade.show').attr("role","alert");
    switch (type) { 
        case 'erro': {
            stylename='alert-danger';Header='Error!';
            
            break;}
        case 'succ': {
            stylename='alert-success';Header='Success!';
            break;}
        case 'info': {
            stylename='alert-info';Header='Note!';
            break;	}	
        case 'warn': {
            stylename='alert-warning';Header='Warning!';
            break;}
        default:{
            stylename='alert-warning';Header='Warning!';message='';
        }
    }
    alertbox.removeClass("alert-danger alert-success alert-info alert-warning");
    alertbox.find('label.alert-message').html(message);
    alertbox.find('strong>label').text(Header);
    alertbox.addClass(stylename);
    alertbox.addClass('CustomAlertPopup');alertbox.fadeIn(100);
    //const showalert=setTimeout(function(){clearTimeout(showalert);alertbox.removeClass('show CustomAlert');}, 5000);
    const showalert=setTimeout(function(){clearTimeout(showalert);alertbox.fadeOut(500);alertbox.removeClass('CustomAlertPopup');}, 5000);
}

$(document).ready(function() {
$('.alert.alert-dismissible.CustomAlert.fade>button.btn-close').click(function(){
    $('.alert.alert-dismissible.CustomAlert.fade').fadeOut(500);
});
});
