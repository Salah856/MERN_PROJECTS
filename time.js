
function formatDate(d){
  return new Date(d)
                .toLocaleDateString("en-US", {
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric'
              }); 
}
