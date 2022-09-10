// selecting dom
  const groupBtns = document.querySelectorAll('.btn-group .btn');
  const loading = document.querySelector('.loading');
  const cardContainer = document.querySelector("[data-cardContainer = 'cardContainer']");
  loading.style.display = 'block';
  // fetching data
  async function getData(callback){
    try{
      const data = await fetch('https://fakestoreapi.com/products').then((res)=>res.json());
      callback(data , false);
    }catch(err){
      callback(false , err)
    }
  }

  // rendering products with api
  getData((data , err)=>{
  if(data){
    const dataArray = [...data];
  for(i=0; i < dataArray.length ; i++){
      cardContainer.innerHTML += ` <div class="card col" style="width: 18rem; height:auto;" id = "${dataArray[i].id}" data-catagory="${dataArray[i].category}" >
      <img  src="${dataArray[i].image}" style="height:350px; width:100%;" />
          <div class="card-body">
            <h5 class="card-title">${dataArray[i].title}</h5>
            <p class="card-text">${dataArray[i].description.substring(0 ,30)}...</p>
            <h6 class="card-subtitle mb-2 text-muted">$ ${dataArray[i].price}</h6>
            <a href="#" class="card-link">Shop Now</a>
          </div>
        </div>`;
   ;
  }
  tabButtonFilter()
  // search filter function invocation
  searchFilter()
    loading.style.display = 'none';
  }else {
    console.log(err);
    loading.style.display = "none";
  cardContainer.innerHTML = "no found any Product "
  }

})



function tabButtonFilter(){
groupBtns.forEach((btn) => {
btn.addEventListener('click' , function(e){
      const cards = document.querySelectorAll('.card');
      const btnName = e.target.innerText;
      const regex = new RegExp(btnName , 'i');

      // set button active style
     const active = document.querySelector('.active');

     if(active && !e.target.classList.contains('active')){
       active.classList.remove('active')
     }
     e.target.classList.add('active');

cardShow(cards , regex , btnName , btn);

})

});
}

function cardShow(cards , regex , btnName , btn){

  if (cards && regex && btnName && btn) {

 const active = document.querySelector('.active');

cards.forEach((cardEle) => {
    const check = cardEle.dataset.catagory.search(regex)
    cardEle.style.display = "block";

    if(check == 0){
     cardEle.style.display = "blcok";
     // active button styling condintion
  if(!btn.classList.contains('active') && btn.innerText.search(regex) == 0){
    if(active &&  !btn.classList.contains('active')){
      active.classList.remove('active')
    }
      btn.classList.add('active')
  }
   }else{
      cardEle.style.display = "none";
   }

  if(btnName.search(/all/i) == 0 ){
      cardEle.style.display = "block";
      // active button styling condintion
      if(!btn.classList.contains('active') && btn.innerText.search(regex) == 0){
        if(active &&  !btn.classList.contains('active')){
          active.classList.remove('active')
      }
          btn.classList.add('active')
  }
  }

});

  }
}

// search filter
function searchFilter(cardELe){
const searchBar = document.querySelector('.search-form [name="search"]');
const cards = document.querySelectorAll('.card');
searchBar.addEventListener('keyup', function(e){
const value = this.value.trim();
const regex = new RegExp(value , 'i');

groupBtns.forEach((btn) => {
  cardShow(cards , regex , value , btn);
});

})

}
