

const checkDateInRange = (date, startDate, endDate) =>{

    
    var minDate = new Date(startDate);
    var maxDate =  new Date(endDate);

    if (new Date(date) >= minDate && new Date(date) <= maxDate ){
         return true;
    }
    else{
        return false; 
    }


}
