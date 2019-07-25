
var i;
var Loan_data;
document.addEventListener('DOMContentLoaded', function(event){
        console.log("hello");
        
        document.getElementById('nameSet').innerHTML="Amar Jyoti";
        axios.get('http://localhost:5000/lender')
        .then(function (response) {
        console.log(response.data); 
        Loan_data = response.data;       
        for(i=0; i<response.data.length; i++){
                //console.log(response.data[i])
                const {loanAmount, loanDuration, loanInterest} = response.data[i];
                //if(!loanStatus){
                document.getElementById("borrowerList").insertAdjacentHTML('afterend', `<li class="list-group-item d-flex justify-content-between align-items-center">
                <a href="0#"  data-toggle="modal" data-target=".bd-example-modal-lg">Name ${i}</a>  
                <span > Rs.${loanAmount}</span>
                <span >${loanInterest}</span>
                <a href="./payment.html"  class="btn btn-success" >Lend</a> </li>` 
                )}
                
         
        })
        .catch(function (error) {
        // handle error
        console.log(error);
        })
        .then(function () {
        // always executed
        });
})
 

// function call(){
//         // alert(this.id)
//         // window.location.href = "./payment.html"
//         var buttons = document.getElementsByTagName("button");
//         var buttonsCount = buttons.length;
//         for ( i = 0; i <= buttonsCount; i += 1) {
//         buttons[i].onclick = function(e) {
//         alert(this.id)
//         }
//         }​
// }
// $(document).on('click', 'button', function()
// {
//         alert(this.id);
// // your codealert
// });



    
    



