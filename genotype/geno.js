var malePartner = document.getElementById('maleName');
var femalePartner = document.getElementById('female-name');
var compatibility ='';
likes = [];//store value of how many times users tried the app

//get value for partnerX and save as string
var partnerX =[];
var submit =document.querySelector('#btn');
malePartner.addEventListener('change', function(e){
    maleName= e.target.value.toUpperCase();
    partnerX.push(maleName);
});


//get value for partnerY and save as string
 const partnerY=[];
femalePartner.addEventListener('change', function(e){
    femaleName= e.target.value.toUpperCase();
    partnerY.push(femaleName);
});

//to get current year
let today = new Date();
let  year =today.getFullYear();
let display = document.createElement('h2');
display.innerText=`(c) ${year}`;
document.querySelector('#footer').appendChild(display);

//adding responsivness to button
submit.addEventListener('click',function(e){
    e.preventDefault();
    const maleSample=[];
    const femaleSample =[];
    console.log(maleSample);
    //get value of female  sample
  var fs =document.getElementsByName('female');
  for(var i =0;i<fs.length;i++){
      if(fs[i].checked){
          var y =fs[i].value;
          femaleSample.push(y);
        break;
        }
    }

  //get value of male sample from radio buttons
    var ms =document.getElementsByName('male');
    for(var i = 0;i<ms.length;i++){
        if(ms[i].checked){
          var x =ms[i].value;
          maleSample.push(x);
          break;
        }
    }

    // USE COMPARISION OPERATOR TO COMPARE SAMPLES
    if(maleSample.includes('AA') && femaleSample.includes('AA') || maleSample.includes('AA') && femaleSample.includes('AA')){
        compatibility ='Compatible';
        percentage= "100%";
        sideComment='AA marries an AA. That’s the best compatible. That way you save your future children the worry about genotype compatibility'
    }else if(maleSample.includes('AA') && femaleSample.includes('AS') || maleSample.includes('AS') && femaleSample.includes('AA')){
        compatibility ='Compatible';
        percentage='75%';
        sideComment='AA marries an AS. You’ll end up with kids with AA and AS which is good. But sometimes if you’re not lucky all the kids will be AS which limits their choice of partner.';
    }else if(maleSample.includes('AA') && femaleSample.includes('SS') || maleSample.includes('SS') && femaleSample.includes('AA')){
        compatibility ='Compatible';
        percentage='75%';
        sideComment='AA marries an AS. You’ll end up with kids with AA and AS which is good. But the kids wiith AS will have to limit their choice of partner.'
    }else if(maleSample.includes('AA') && femaleSample.includes('AC') || maleSample.includes('AC') && femaleSample.includes('AA')){
        compatibility ='Compatible';
        percentage='75%';
        sideComment='AA marries an AC. You’ll end up with kids with AA and AC which is good. But the kids wiith AC will have to limit their choice of partner.'
    }else if(maleSample.includes('AA') && femaleSample.includes('SC') || maleSample.includes('SC') && femaleSample.includes('AA')){
        compatibility ='Compatible';
        percentage='75%';
        sideComment='AA marries an SC. You’ll end up with kids with AA and SC which is good. But the kids wiith SC will have to limit their choice of partner.'
    }else {
        compatibility ='Not Compatible';
        percentage='';
        sideComment='Save your future children the worry about genotype compatibility.please seek medical advice';
    }
    //changing text color as regards how compatible couples are
    if(compatibility=='Compatible'){
        document.querySelector('#result').style='color:green';
    }else if( compatibility =='Not Compatible'){
        document.querySelector('#result').style='color:red';
    }
    //checking inputs for name
    if(partnerX==''||partnerY==''){
        document.querySelector('#info').innerHTML=`please provide values for partners`;
    }else{
        document.querySelector('#result').innerHTML=`${partnerX}  and ${partnerY} have both submited their samples and are ${percentage} ${compatibility}<br> ADVICE: ${sideComment}`;
        document.querySelector('#info').innerHTML='';
        likes++;//display amount of users that tried the app
        document.getElementById('sample').innerText=`You have tried ${likes} sample`;
    }
   
    // Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

});