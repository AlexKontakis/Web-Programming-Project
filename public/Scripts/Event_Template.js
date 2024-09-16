var t1 = 0;//Normal tickets amount
var t2 = 0;//VIP tickets amount
var t3 = 0;//Special_Needs tickets amount
var total = 0;//total tickets amount

function showInputFields() {
    
    
    var inputContainer = document.getElementById("inputContainer");
    var ticket_type1 = document.getElementById("Normal");
    var ticket_type2 = document.getElementById("VIP");
    var ticket_type3 = document.getElementById("Special_Needs");

    


    var selectedNumber =  t1+t2+t3;
    var NormalticketPrice = document.getElementById("Nprice").innerText;
    var VIPticketPrice = document.getElementById("Vprice").innerText;
    var SpecialticketPrice = document.getElementById("Sprice").innerText;
    
    var amount = 0;

    //check if a type of ticket has been selected
    if((ticket_type1.checked || ticket_type2.checked || ticket_type3.checked) && selectedNumber <= 4){
        // Απαλείψτε τα υπάρχοντα πεδία εισόδου
        inputContainer.innerHTML = "";

        //Εμφανιζει το form
        document.getElementById("myForm").style.display = "block";

        
        
        amount = t1*parseInt(NormalticketPrice)+t2*parseInt(VIPticketPrice)+t3*parseInt(SpecialticketPrice);
        

        // Δημιουργία νέων πεδίων εισόδου βάσει του επιλεγμένου αριθμού
        for (var i = 0; i < selectedNumber; i++) {
            
            //Name
            var label = document.createElement("label");
            label.textContent = "Name:";
            label.setAttribute("for", "myInput");
            label.classList.add("popuplabel");
            inputContainer.appendChild(label);

            var inputField = document.createElement("input");
            inputField.setAttribute("type", "text");
            inputField.setAttribute("name", "Input_name" + i);
            
            inputContainer.appendChild(inputField);

            //Last Name
            var label = document.createElement("label");
            label.textContent = "Last Name:";
            label.setAttribute("for", "myInput");
            label.classList.add("popuplabel");
            inputContainer.appendChild(label);

            var inputField = document.createElement("input");
            inputField.setAttribute("type", "text");
            inputField.setAttribute("name", "Input_lastname" + i);
            inputContainer.appendChild(inputField);
            
            var lineBreak = document.createElement("br");
            inputContainer.appendChild(lineBreak);

            //Phone
            var label = document.createElement("label");
            label.textContent = "Phone:";
            label.setAttribute("for", "myInput");
            label.classList.add("popuplabel");
            inputContainer.appendChild(label);

            var inputField = document.createElement("input");
            inputField.setAttribute("type", "text");
            inputField.setAttribute("name", "Input_phone" + i);
            inputContainer.appendChild(inputField);

            //Email
            var label = document.createElement("label");
            label.textContent = "Email:";
            label.setAttribute("for", "myInput");
            label.classList.add("popuplabel");
            inputContainer.appendChild(label);

            var inputField = document.createElement("input");
            inputField.setAttribute("type", "text");
            inputField.setAttribute("placeholder","@example.com");
            inputField.setAttribute("name", "Input_mail" + i);
            inputContainer.appendChild(inputField);
            
            var lineBreak = document.createElement("br");
            inputContainer.appendChild(lineBreak);
            var lineBreak = document.createElement("br");
            inputContainer.appendChild(lineBreak);
            
            if(i==selectedNumber-1){
                document.getElementById("amountField").value = amount;
            }
        }
    }
    else{
        alert("Please select what type of tickets do you want to reserve");
    }
    
    
  }


  
  
  function add_ticket(){
    var ticket_type1 = document.getElementById("Normal");
    var ticket_type2 = document.getElementById("VIP");
    var ticket_type3 = document.getElementById("Special_Needs");

    var ticket_amount1 = document.getElementById("normal_tickets").value;
    var ticket_amount2 = document.getElementById("vip_tickets").value;
    var ticket_amount3 = document.getElementById("special_tickets").value;

    var lbl1 = document.getElementById("lbl1");
    var lbl2 = document.getElementById("lbl2");
    var lbl3 = document.getElementById("lbl3");

    var test = total;// failsafe

    // Απαλείψτε τα υπάρχοντα πεδία εισόδου

    inputContainer.innerHTML = "";
    inputContainer01.innerHTML = "";
    document.getElementById("myForm").style.display = "none";
    document.getElementById("paymentForm").style.display = "none";
   
    if(ticket_type1.checked){    
        total = total + parseInt(ticket_amount1);
        
        
    }
    else if(ticket_type2.checked){
        total = total + parseInt(ticket_amount2);
        
        
    }
    else if(ticket_type3.checked){
        total = total + parseInt(ticket_amount3);
        
        
    }
    
    var info = "";

    

    if(total <= 4){
        if(ticket_type1.checked){    
            t1 = t1 + parseInt(ticket_amount1);
            info ="N:" + t1.toString();
            lbl1.innerHTML = info;
            
        }
        else if(ticket_type2.checked){
            t2 = t2 + parseInt(ticket_amount2);
            info ="V:" + t2.toString();
            lbl2.innerHTML = info;
            
        }
        else if(ticket_type3.checked){
            t3 = t3 + parseInt(ticket_amount3);
            info ="S:" + t3.toString();
            lbl3.innerHTML = info;
            
        }
        document.getElementById("lblTotal").value = total;
        document.getElementById("lblTotal").innerText = total;
    }
    else{
        total = test;
        alert("reservation cap has been reached! Please select less or no more than 4 tickets");
    }
    
    
    
    
  }
  

  function clear_ticket(){
    // Απαλείψτε τα υπάρχοντα πεδία εισόδου
    inputContainer.innerHTML = "";
    inputContainer01.innerHTML = "";
    document.getElementById("myForm").style.display = "none";
    document.getElementById("paymentForm").style.display = "none";
    
    total = 0;
    t1 = 0;
    t2 = 0;
    t3 = 0;
    info ="N:" + t1.toString();
    lbl1.innerHTML = info;
    info ="V:" + t2.toString();
    lbl2.innerHTML = info;
    info ="S:" + t3.toString();
    lbl3.innerHTML = info;
    document.getElementById("lblTotal").value = "";
    document.getElementById("lblTotal").innerText = "";
  }


  