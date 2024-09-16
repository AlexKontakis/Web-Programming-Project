var click = 0;
function showProfileOptions(){
    var optionForm = document.getElementById("option_form");
    click = click + 1;
    
    
    if( click % 2  == 1){
        //Αν είναι μονός τότε εμφανίζει το form
    document.getElementById("opt_myForm").style.display = "block";
    }else if (click % 2 == 0 ){
        //Αν είναι ζυγός τότε κρύβει το form
    document.getElementById("opt_myForm").style.display = "none";
    }
}