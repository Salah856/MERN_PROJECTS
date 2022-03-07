

const checkDateInRange = (date, startDate, endDate) =>{

    
    var minDate = new Date(startDate);
    var maxDate =  new Date(endDate);

    if (date >= minDate && date <= maxDate ){
         return true;
    }
    else{
        return false; 
    }


}
