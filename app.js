let leftImageElement = document.getElementById('left-image');
let middleImageElement = document.getElementById('middle-image');
let rightImageElement = document.getElementById('right-image');


let maxAttempts = 25;
let userAttemptsCounter=0;
let leftImageIndex ;
let middleImageIndex;
let rightImageIndex;
let mallname=[];
let mallVotes = [];
let mallShown = [];
let displayimage=[];

function MallImage(name, source) {
  this.name = name;
  this.source = source;
  this.votes = 0;
  this.shown = 0;
  MallImage.allImages.push(this);
  mallname.push(name);

}


MallImage.allImages = [];

 new MallImage('bag', 'images/bag.jpg'); 
 new MallImage('banana', 'images/banana.jpg'); 
 new MallImage('bathroom', 'images/bathroom.jpg'); 
 new MallImage('boots', 'images/boots.jpg');
 new MallImage('breakfast', 'images/breakfast.jpg');
 new MallImage('bubblegum', 'images/bubblegum.jpg');
 new MallImage('chair', 'images/chair.jpg');
 new MallImage('cthulhu', 'images/cthulhu.jpg');
 new MallImage('dog-duck', 'images/dog-duck.jpg');
 new MallImage('dragon', 'images/dragon.jpg');
 new MallImage('pen', 'images/pen.jpg');
 new MallImage('pet-sweep', 'images/pet-sweep.jpg');
 new MallImage('scissors', 'images/scissors.jpg');
 new MallImage('shark', 'images/shark.jpg');
 new MallImage('sweep', 'images/sweep.png');
 new MallImage('tauntaun', 'images/tauntaun.jpg');
 new MallImage('unicorn', 'images/unicorn.jpg');
 new MallImage('usb', 'images/usb.gif');
 new MallImage('water-can', 'images/water-can.jpg');
 new MallImage('wine-glass', 'images/wine-glass.jpg');
 
//  console.log(MallImage.allImages);
 
 

 function settingItems() {
  
  
  let data = JSON.stringify(MallImage.allImages);
   console.log(data);
  
  localStorage.setItem('MallImage',data);

}  

function gettingItems() {
 

 let stringObject= localStorage.getItem('MallImage');

  console.log(stringObject);
  let normalObject=JSON.parse(stringObject);
  //  console.log(noramlObject);

   if ( normalObject!== null) {
    MallImage.allImages=normalObject;
    for (let i = 0; i < MallImage.allImages.length; i++) {
    
      mallVotes.push(MallImage.allImages[i].votes);
  
      mallShown.push(MallImage.allImages[i].shown);
      
    }

  viewChart();

    
   }

  
}


 function generateRandomIndex() {
    return Math.floor( Math.random() * MallImage.allImages.length);
   }


 function renderthreeImages() {
 
    leftImageIndex = generateRandomIndex();
    rightImageIndex=generateRandomIndex();
    middleImageIndex=generateRandomIndex();
    displayimage.push(leftImageIndex);
    displayimage.push(rightImageIndex);
    displayimage.push(middleImageIndex);


    
  
    do{
    leftImageIndex = generateRandomIndex();
    rightImageIndex=generateRandomIndex();
    middleImageIndex=generateRandomIndex();
     
    }while (leftImageIndex === rightImageIndex||leftImageIndex===middleImageIndex||middleImageIndex===rightImageElement||displayimage.includes(rightImageIndex)||displayimage.includes(middleImageIndex)||displayimage.includes(leftImageIndex))
     displayimage=[];
     displayimage.push(leftImageIndex);
     displayimage.push(middleImageIndex);
     displayimage.push(rightImageIndex);
  
    
   console.log(displayimage);
   MallImage.allImages
   console.log(MallImage.allImages[leftImageIndex]);
 
   leftImageElement.src = MallImage.allImages[leftImageIndex].source;
   MallImage.allImages[leftImageIndex].shown++;
 
   rightImageElement.src =MallImage.allImages[rightImageIndex].source;
   MallImage.allImages[rightImageIndex].shown++;

   middleImageElement.src =MallImage.allImages[middleImageIndex].source;
   MallImage.allImages[middleImageIndex].shown++;



    
  }
  
  renderthreeImages();

// leftImageElement.addEventListener('click',handleUserClick);
// rightImageElement.addEventListener('click',handleUserClick);
// middleImageElement.addEventListener('click',);

let dev=document.getElementById("images-div") ;
dev.addEventListener('click',handleUserClick)
function handleUserClick(event) {
    // give the user 25 tries to click after that show result
    userAttemptsCounter++;
  
    console.log(event.target.id);
  
    if(userAttemptsCounter<=maxAttempts){
      // make sure to add to votes for the correct element and render again
      if(event.target.id ==='left-image'){
        MallImage.allImages[leftImageIndex].votes++
  
      }else{
        MallImage.allImages[rightImageIndex].votes++
      }
      renderthreeImages();
  
    }
    else{
      // render the list of results
      let list=document.getElementById('results-list');
      let mallresult;
      for(let i=0;i<MallImage.allImages.length;i++){
        mallresult=document.createElement('li');
        list.appendChild(mallresult);
        mallresult.textContent = MallImage.allImages[i].name +  ' has ' +  MallImage.allImages[i].votes + ' votes'+'   '+'and'+ ' '+MallImage.allImages[i].name +'  '+'has'+  MallImage.allImages[i].shown+'shown';
      }
      // rightImageElement.removeEventListener('click',handleUserClick);
      // leftImageElement.removeEventListener('click',handleUserClick);
      dev.removeEventListener('click',handleUserClick);
  
  
    
  
  
  for (let i = 0; i < MallImage.allImages.length; i++) {
    
    mallVotes.push(MallImage.allImages[i].votes);

    mallShown.push(MallImage.allImages[i].shown);
    
  }
  viewChart();
  settingItems();
}
}





  function viewChart() {

    let ctx = document.getElementById('myChart').getContext('2d');
  
    let chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'bar',
  
      // The data for our dataset
      data: {
        labels: mallname,
  
        datasets: [
  
  
          {
            label: 'Mall votes',
            backgroundColor: '#ffc0cb',
            borderColor: '#0000FF',
            data: mallVotes
          },
          
          {
            label: 'Mall shown',
            backgroundColor: '#0000FF',
            borderColor: '#0000FFF',
            data: mallShown
          },
     
  
        ]
      },
       
  
      // Configuration options go here
      options: {}
    
    }); 
  }
  gettingItems();
  


