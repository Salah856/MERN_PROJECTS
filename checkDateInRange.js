

const checkDateInRange = (date, startDate, endDate) =>{
    
    // format of date must be : mm/dd/yyyy 
    
    var minDate = new Date(startDate);
    var maxDate =  new Date(endDate);

    if (new Date(date) >= minDate && new Date(date) <= maxDate ){
         return true;
    }
    else{
        return false; 
    }

}
