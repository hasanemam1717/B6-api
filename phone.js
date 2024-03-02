const loadPhone = async (searchText ='a',isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data
    // console.log(phones)
    displayPhones(phones ,isShowAll)
}
const displayPhones = (phones ,isShowAll) =>{
    const phoneContainer =document.getElementById('phone-container')
    // clear phone container before adding new cards
    phoneContainer.innerHTML = ' ';
    // show all button remove hidden class
    const showAllbuttonContainer =document.getElementById('showAllbuttonContainer');
    if(phones.length > 12 && !isShowAll){
      showAllbuttonContainer.classList.remove('hidden')
    }
    else{
      showAllbuttonContainer.classList.add('hidden')
    }
    // console.log('is show all ',isShowAll)
    //  fast 12 phones display if show all
    if(!isShowAll){
      phones = phones.slice(0,12)
    }
     
    // console.log(phones.length)
    phones.forEach(phone =>{
        // console.log(phone)
        // craeat div
        const phoneCard =document.createElement('div');
        // create a classlist 
        phoneCard.classList = 'card p-4 bg-base-100 shadow-xl';
        // set the inner text
        phoneCard.innerHTML =`
        <figure><img src="${phone.image} " alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name
          } </h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-center">
            <button onclick="handleShowDetails('${phone.slug}')"  class="btn btn-primary">Show details</button>
          </div>
        </div>`
        // append child 
        phoneContainer.appendChild(phoneCard)
    });
    // hide loading speaner
    toggleLoading(false)
}


// handle search button 
const handleSearchButton = (isShowAll) =>{
  toggleLoading(true)
    const searchField = document.getElementById('searchFild');
    const searchText =searchField.value;
    // console.log(searchText);
    // console.log('handle Search button clicked')
    loadPhone(searchText ,isShowAll)
}

// another search button and handle search recap
// const handleSearchButton2 = () =>{
//   toggleLoading(true)
//   const searchField2 = document.getElementById('searchFild2');
//   const searchText2 = searchField2.value;
//   loadPhone(searchText2)
// }

// loading speaner
const toggleLoading = (isLoading) =>{
 const loadingSpener = document.getElementById('loading')
 if(isLoading){
  loadingSpener.classList.remove('hidden')
 }
 else{
  loadingSpener.classList.add('hidden')
 }
}

// handle show all
 const handleShowAll =( ) =>{
  handleSearchButton(true)
 }

//  handle show detail
const handleShowDetails =async (id) => {
  // console.log('clicked',id)
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const phone =data.data
  showModalDetails(phone);
  
}
// show phone details with modal
const showModalDetails = async (phone) =>{
  console.log(phone)
  const phoneName =document.getElementById('show-detail-phone-name');
  phoneName.innerText = phone.name
  const showDetailContainer =document.getElementById('show-detail-container');
  showDetailContainer.innerHTML =`<img src="${phone.image}" alt="">
  <p><span class="font-bold">Storage:${phone?.mainFeatures?.storage
  }</span></p><br>
  <p><span class="font-bold">Display size:${phone?.mainFeatures?.displaySize
  }</span></p><br>
   <p><span class="font-bold">Chipset:${phone?.mainFeatures?.chipSet
  }</span></p>
  `
  // display the modal
  show_modal.showModal()
}

loadPhone()