const loadCategory = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
    const data = await res.json();
    setButton(data.categories);
}

const setButton = (data) => {
    // console.log(data)
    const categoryContainer = document.getElementById('categorySection');
    for (const cat of data) {
        const div = document.createElement('div');
        console.log(cat);
        div.innerHTML = `             
            <button id="btn-${cat.category}" onclick="loadPetsByCategory('${cat.category}')" class="btn py-6 px-7">
            <img class="w-1/3" src="${cat.category_icon}"/>
            ${cat.category}</button>     
        `;
        categoryContainer.appendChild(div);
    } 
}

const loadAllpets = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets')
    const data = await res.json();
    displayAllpets(data.pets);
    // console.log(data)
}

// display all pets

const displayAllpets = (data = "") => {
    // console.log(data)
    const petcontainer = document.getElementById('allpetscontainer');
    petcontainer.innerHTML = "";
    if(data.length == 0){
        petcontainer.classList.remove("grid");
        petcontainer.innerHTML = `
            <div class="min-h-screen bg-gray-100 w-full flex flex-col gap-4 justify-center items-center">
                <img class="w-[160px]" src="images/error.webp"/>
                <p class="text-2xl font-bold">No Information Available</p>
                <p class="text-xs text-gray-500 px-10">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
                its layout. The point of using Lorem Ipsum is that it has a.</p>
            </div>
        `;
        return;
    }else{
        petcontainer.classList.add("grid");
    }
    for (const pet of data) {
        // console.log(pet)
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="card shadow-sm p-5">
        <figure>
          <img class="w-full h-full object-cover"
            src="${pet.image}"
            alt="Shoes" />
        </figure>
        <div class="">
          <h2 class="card-title font-bold">${pet.pet_name}</h2>
            <div class="flex gap-1 text-gray-500">
            <img class="w-[20px]" src="https://img.icons8.com/fluency-systems-regular/48/medium-icons.png" alt="medium-icons"/>
                <p>Breed: ${pet.breed}</p>
            </div>
            <div class="flex gap-1 text-gray-500">
            <img class="w-[20px]" src="https://img.icons8.com/material-outlined/24/calendar--v1.png" alt="calendar--v1"/>
                <p>Birth: ${pet.date_of_birth
            }</p>
            </div>
            <div class="flex gap-1 text-gray-500">
            <img class="w-[20px]" src="https://img.icons8.com/fluency-systems-regular/48/gender.png" alt="gender"/>
                <p>Breed: ${pet.gender}</p>
            </div>
            <div class="flex gap-1 text-gray-500 pb-3">
            <img class="w-[20px]" src="https://img.icons8.com/material-outlined/24/us-dollar--v1.png" alt="us-dollar--v1"/>
                <p>Breed: ${pet.price}$</p>
            </div>
            <hr>
          <div class="card-actions justify-between pt-3">
            <button class="btn">
                <img width="20" height="20" src="https://img.icons8.com/material-outlined/24/facebook-like--v1.png" alt="facebook-like--v1"/>
            </button>
            <button class="btn text-[#0E7A81]">Adopt</button>
            <button onclick="clickDetailsBtn('${pet.petId}')" class="btn text-[#0E7A81]">Details</button>
          </div>
        </div>
      </div>
        `
        petcontainer.appendChild(div)
    }
}

// fetch pets by category

const loadPetsByCategory = (categoryName) => {
    try {
        console.log(categoryName)
        fetch(`https://openapi.programming-hero.com/api/peddy/category/${categoryName}`)
        .then((res) => res.json())
        .then((data) => {
            const activebtn = document.getElementById(`btn-${categoryName}`);
            activebtn.classList.add('active')
            displayAllpets(data.data);
        })
    }
    catch (error) {
        console.error(error)
    }
}

// clicking view more button

const clickViewMore = () => {
    document.getElementById('main-section').scrollIntoView({behavior:'smooth'});
}

// clicking details button

const clickDetailsBtn = async (petId) => {
    // console.log(petId)
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`);
    const data = await res.json()
    displayDetailsByModal(data.petData)
}

// display details by modal

const displayDetailsByModal = (data) => {
    console.log(data)
    const modalcontainer = document.getElementById('modalContainer');
    document.getElementById('myModal').showModal();
    modalcontainer.innerHTML = `
        
        <img class="h-full w-full object-cover pb-5" src="${data.image}"/>
        <div class="flex gap-1 text-gray-500">
            <img class="w-[20px]" src="https://img.icons8.com/fluency-systems-regular/48/medium-icons.png" alt="medium-icons"/>
                <p>Breed: ${data.breed}</p>
            </div>
            <div class="flex gap-1 text-gray-500">
            <img class="w-[20px]" src="https://img.icons8.com/material-outlined/24/calendar--v1.png" alt="calendar--v1"/>
                <p>Birth: ${data.date_of_birth
            }</p>
            </div>
            <div class="flex gap-1 text-gray-500">
            <img class="w-[20px]" src="https://img.icons8.com/fluency-systems-regular/48/gender.png" alt="gender"/>
                <p>Breed: ${data.gender}</p>
            </div>
            <div class="flex gap-1 text-gray-500 pb-3">
            <img class="w-[20px]" src="https://img.icons8.com/material-outlined/24/us-dollar--v1.png" alt="us-dollar--v1"/>
                <p>Breed: ${data.price}$</p>
            </div>
            <h2 class="font-bold">Details Information</h2>
            <p class="text-gray-500 pb-5">${data.pet_details}</p>
    `;
}

loadCategory();
loadAllpets();