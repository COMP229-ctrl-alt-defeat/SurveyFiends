// IIFE -- Immediately Invoked Function Expression
(function(){

    function Start()
    {
        console.log("App Started...");
    }

    // Ask user to confirm submission of form
    $('#surveyComplete').on('click', (event)=>{        
        if(confirm("Submit Survey?")){
            console.log();
        }else{
            event.preventDefault();
        }
    })


    window.addEventListener("load", Start);
})();

//Formats MongoDB ISO date to YYYYMMDD (HTML FORMAT)
function formatISODate(dateSelected){
    date = new Date(dateSelected);
    year = date.getFullYear();
    month = date.getMonth()+1;
    dt = date.getDate();
    
    if (dt < 10) {
      dt = '0' + dt;
    }
    if (month < 10) {
      month = '0' + month;
    }

    return(year+'-' + month + '-'+ dt)
}
//Used to format dates for survey lists
if (document.title == "Edit Survey Details"){
    document.getElementById("getActDate").style.display = 'none';
    document.getElementById("getExpDate").style.display = 'none';

    let activationField = document.getElementById("getActDate").value;
    let expiryField = document.getElementById("getExpDate").value;

    let formattedActivationDate = (formatISODate(activationField))
    let formattedExpiryDate = (formatISODate(expiryField))
   window.addEventListener("load", (event)=>  {
        
        document.getElementById("activationDate").value = (formattedActivationDate);
        document.getElementById("expiryDate").value = (formattedExpiryDate);
    });
 
}


