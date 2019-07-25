
var id;

function validate() 
{
  console.log(id)
    if(id == 'lender'){
      window.location.href="./lender.html"
    } else {
      window.location.href = "./borrower.html"
    }
      var psw2=document.getElementById("psw1").value;
      var em2=document.getElementById("email1").value;
      console.log(psw2)
      console.log(em2)
      console.log("hello")
      axios.get('http://localhost:5001/fetch')//took data from the api
      .then(function(response){
        console.log(response.data)
        var k=response.data;
        var l=k.length;
        console.log("length is "+l)
        var f=0;
        while(l--)
        {
          console.log("hello11")
          console.log(k[l].email);
          console.log(k[l].psw);
          if(k[l].email==em2 && k[l].psw==psw2)
          {
            f=1;
            break;
          }
        }
        if(f==0)
          alert("Invalid22");//now redirect to same page
        else
          console.log("Welcome22");// now redirect to the required page
      })
      .catch(function(err)
      {
          console.log("bhak bhsodi")
      })
  }

// Get the modal
var modal = document.getElementById('id01');
var modal2 = document.getElementById('id02');

// When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   console.log("yo yo");
//   if (event.target == modal || event.target == modal2) {
//     modal.style.display = "none";
//     modal2.style.display = "none";
//   }
// }

console.log("signup")

function postData(){
  console.log("post Called");
  axios.post('http://localhost:5000/user/data', {

  fname: document.getElementById('fname').value,
  lname: document.getElementById('lname').value,
  dob: document.getElementById('dob').value,
  // gender: document.getElementById('male').value,
  // gender: document.getElementById('female').value,
  // gender: document.getElementById('other').value,
  father: document.getElementById('father').value,
  state: document.getElementById('state').value,
  city: document.getElementById('city').value,
  pin: document.getElementById('pin').value,
  aadhar: document.getElementById('aadhar').value,
  contact: document.getElementById('contact').value,
  email: document.getElementById('mail').value,
  psw: document.getElementById('psw').value,
  pan: document.getElementById('pan').value,
  bank: document.getElementById('bank').value,
  account: document.getElementById('account').value,
  ifsc: document.getElementById('ifsc').value,
  paytm: document.getElementById('paytm').value,
  certificates: document.getElementById('certificates').value

  })
  .then(function (response) {
      console.log(response);
  //alert("Thank You ! You will get an E-Mail once your loan will be approved")
  document.getElementById('registerForm').reset();
  
  })
  .catch(function (error) {
      console.log(error);
  });
}




function displayManager(clicked_id){
      //console.log(id)

    if(clicked_id == 'signin')
    {
      document.getElementById('id02').style.display = 'block';
      document.getElementById('id01').style.display = 'none';
    } 
}

function displayManager2(clicked_id)
{
  id = clicked_id;
   if(clicked_id == 'lender'){
    document.getElementById('id01').style.display = 'block';
  } else {
    document.getElementById('id01').style.display = 'block';
  }
}