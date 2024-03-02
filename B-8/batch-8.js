const btnContainer = document.getElementById ('btnContainer');
const cardContainer = document.getElementById ('cardContainer');
let slectedCategory = 1000;
const fetchCatagorys = () => {
    const url = ' https://openapi.programming-hero.com/api/videos/categories';
    fetch(url)
    .then (response => response.json())
    .then(({data}) => {data.forEach((card) => {
        const newBtn = document.createElement ('button')
        newBtn.classList = 'btn btn-wide'
        newBtn.addEventListener('click', () => fetchCatagoryById(card.category_id
            ))
        newBtn.innerText =card.category
        btnContainer.appendChild(newBtn);
        console.log(card.category_id
            )
    })
})
}

const fetchCatagoryById = (categoryId) => {
    slectedCategory = categoryId;
    const url = `https://openapi.programming-hero.com/api/videos/category/${categoryId}`;
    fetch(url)
    .then (response => response.json())
    .then(({data}) => {
        cardContainer.innerHTML = ''
        data.forEach((videos) => {
            const updatedCard = document.createElement ('div')
            updatedCard.classList = 'card card-compact w-96 bg-base-100 shadow-xl '
            updatedCard.innerHTML = `
            <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                <div class=" flex justify-around my-3">
                 <div>
                    <div class="avatar">
                        <div class="w-24 rounded">
                          <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                      </div>
                 </div>
                 <div> 
                    <h2 class="card-title">Contant name</h2>
                    <p>Name</p>
                    <p>views</p>
                </div>
                </div>`
                cardContainer.appendChild(updatedCard);

            
        })
    })
}


fetchCatagorys()
fetchCatagoryById(slectedCategory)