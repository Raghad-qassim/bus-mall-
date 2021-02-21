let leftImageElement = document.getElementById('left-image');
let middleImageElement = document.getElementById('middle-image');
let rightImageElement = document.getElementById('right-image');


let maxAttempts = 25;
let userAttemptsCounter=0;
let leftImageIndex ;
let middleImageIndex;
let rightImageIndex;

function MallImage(name, source) {
    this.name = name;
    this.source = source;
    this.votes = 0;
    MallImage.allImages.push(this);
  }
  console.log(this);
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
 
 console.log(MallImage.allImages);

 function generateRandomIndex() {
    return Math.floor( Math.random() * MallImage.allImages.length);
   }


 function renderthreeImages() {
 
    leftImageIndex = generateRandomIndex();
    rightImageIndex=generateRandomIndex();
    middleImageIndex=generateRandomIndex();
    
  
    do{
     rightImageIndex=generateRandomIndex();
    }while (leftImageIndex === rightImageIndex)
  
  
    MallImage.allImages
   // console.log(MallImage.allImages[leftImageIndex]);
  
    leftImageElement.src = MallImage.allImages[leftImageIndex].source;
    rightImageElement.src = MallImage.allImages[rightImageIndex].source;
   middleImageElement.src= MallImage.allImages[middleImageIndex].source;

    
  }
  
  renderthreeImages();

leftImageElement.addEventListener('click',handleUserClick);
rightImageElement.addEventListener('click',handleUserClick);
middleImageElement.addEventListener('click',handleUserClick);

 
function handleUserClick(event) {
    // give the user 25 tries to click after that show result
    userAttemptsCounter++;
  
    console.log(event.target.id);
  
    if(userAttemptsCounter<maxAttempts){
      // make sure to add to votes for the correct element and render again
      if(event.target.id ==='left-image'){
        mallresult.allImages[leftImageIndex].votes++
  
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
        mallresult.textContent = MallImage.allImages[i].name +  ' has ' +  MallImage.allImages[i].votes + ' votes';
      }
      rightImageElement.removeEventListener('click',handleUserClick);
      leftImageElement.removeEventListener('click',handleUserClick);
      middleImageElement.removeEventListener('click',handleUserClick);
  
  
    }
  }