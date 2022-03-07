

const checkDateInRange = (date, startDate, endDate) =>{
    
    // format of date must be : mm/dd/yyyy 
    
    var currentDate = new Date(date); 
    var minDate = new Date(startDate);
    var maxDate =  new Date(endDate);

    if (currentDate >= minDate && currentDate <= maxDate ){
         return true;
    }
    else{
        return false; 
    }

}
