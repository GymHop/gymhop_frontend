
export function dateFormatter( strDate, format ){
    var theDate;
    debugger;
    if (strDate instanceof Date) {
      theDate = strDate
    } else {
      theDate = new Date(strDate + " EST");
    }
    if( format=="time" )
       return getTimeFromDate(theDate);
    else{
       var dateOptions = {year:'numeric', month:'long', day:'numeric'};
       var formattedDate = theDate.toLocaleDateString("en-US", + dateOptions);
       if( format=="date" )
           return formattedDate;
       return formattedDate + " " + getTimeFromDate(theDate);
    }
}

export function getTimeFromDate( theDate ){
    var sec = theDate.getSeconds();
    if( sec<10 )
        sec = "0"+sec;
    var min = theDate.getMinutes();
    if( min<10 )
        min = "0"+min;
    let hr = theDate.getHours()
    var ampm = "AM";
    if( hr > 12 ) {
        hr -= 12;
        ampm = "PM";
    }

    return hr + ':'+ min + " " + ampm
}
