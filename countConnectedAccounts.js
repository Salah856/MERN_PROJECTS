let accounts = [
     
     {
     	id: 1, 
		channels: [
          {
          	attributes: {
             is_connected: {
               is_connected_before: true,
				the_same_tenant: true, 
             
             }
            }
          }, 
          {
          	attributes: {
             is_connected: {
               is_connected_before: true,
				the_same_tenant: true, 
             
             }
            }
          }
        ]
     }, 
      {
     
     	id: 2, 
		channels: [
          {
          	attributes: {
             is_connected: {
               is_connected_before: false,
				the_same_tenant: null,
             }
            }
          }
        ]
     }, 
      {
     	id: 3, 
		channels: [
          {
          	attributes: {
             is_connected: {
               is_connected_before: false,
				the_same_tenant: null, 
             }
            }
          }, 
          {
          	attributes: {
             is_connected: {
               is_connected_before: true,
				the_same_tenant: true, 
             }
            }
          }, 
        ]
     },
 
 ]; 


const getConnectedChannels = (accounts) =>{
   
   let valid = [];
   // let idCount = 0; 
   
    accounts.forEach(({channels, id})=>{
        channels.forEach(({attributes})=>{
            if (attributes.is_connected.is_connected_before){
                // console.log("inside channels"); 
           		valid.push({
                	id, 
                    connected: true,
                }); 
    		}
     	})
    }); 

		return valid; 
	}; 

	
    let c = getConnectedChannels(accounts); 
    console.log(c); 
    
    let obj = {}; 
    
    c.forEach(({id, connected})=>{
      if(!obj[id]) obj[id] = 1; 
      else if(obj[id]) obj[id] += 1; 
     // console.log(obj)
      
    }); 
    
    console.log(obj); 
