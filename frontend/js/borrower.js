function Rate_cal(){

    if(document.getElementById('LoanDuration').value == "")
        document.getElementById('InterestRate').value = 0
    if(document.getElementById('LoanDuration').value <= 3)
        document.getElementById('InterestRate').value = 20 + '%'
    else if(document.getElementById('LoanDuration').value > 3 && document.getElementById('LoanDuration').value<=6)
        document.getElementById('InterestRate').value = 18 + '%'
    else if(document.getElementById('LoanDuration').value >6 && document.getElementById('LoanDuration').value <=9)
        document.getElementById('InterestRate').value = 15 + '%'
    else if(document.getElementById('LoanDuration').value >=9)
        document.getElementById('InterestRate').value = 10 + '%'
    
}


 function postData(){
    console.log("post Called");
    axios.post('http://localhost:5000/borrower', {
    loanAmount: document.getElementById('LoanAmount').value,
    loanPurpose: document.getElementById('LoanPurpose').value,
    loanDuration: document.getElementById('LoanDuration').value,
    loanInterest: document.getElementById('InterestRate').value
    })
    .then(function (response) {
        console.log(response);
    alert("Thank You ! You will get an E-Mail once your loan will be approved")
    //document.getElementById('loanForm').reset();
    })
    .catch(function (error) {
        console.log(error);
    });
}












 function call_alert(){
        
         alert('You will be notified once you Loan is verified')
     }

     