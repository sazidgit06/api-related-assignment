const loadCategory = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
    const data = await res.json();
    setButton(data);
}

const setButton = (data) => {
    console.log(data)
    const categoryContainer = document.getElementById('categorySection');
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="flex justify-between">
            
            <button class="btn px-10 py-7 font-bold">
            <img class="w-1/3" src="${data.categories[0].category_icon}" />
            ${data.categories[0].category}s</button>

            <button class="btn px-10 py-7 font-bold">
            <img class="w-1/3" src="${data.categories[1].category_icon}" />
            ${data.categories[1].category}s</button>

            <button class="btn px-10 py-7 font-bold">
            <img class="w-1/3" src="${data.categories[2].category_icon}" />
            ${data.categories[2].category}s</button>

            <button class="btn px-10 py-7 font-bold">
            <img class="w-1/3" src="${data.categories[3].category_icon}" />
            ${data.categories[3].category}s</button>

        </div>
    `;
    categoryContainer.appendChild(div);
}

const loadAllpets = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets')
    const data = await res.json();
    displayAllpets(data.pets);
    console.log(data)
}

// display all pets

const displayAllpets = (data) => {
    // console.log(data)
    const petcontainer = document.getElementById('allpetscontainer');
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
                <img width="20" height="20" src="https://img.icons8.com/sf-ultralight/25/list.png" alt="list"/>
                <p>Breed: ${pet.breed}</p>
            </div>
            <div class="flex gap-1 text-gray-500">
            <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/calendar--v1.png" alt="calendar--v1"/>
                <p>Birth: ${pet.date_of_birth
                }</p>
            </div>
            <div class="flex gap-1 text-gray-500">
                <img width="20" height="20" src="https://img.icons8.com/sf-ultralight/25/list.png" alt="list"/>
                <p>Breed: ${pet.breed}</p>
            </div>
            <div class="flex gap-1 text-gray-500 pb-3">
                <img width="20" height="20" src="https://img.icons8.com/sf-ultralight/25/list.png" alt="list"/>
                <p>Breed: ${pet.breed}</p>
            </div>
            <hr>
          <div class="card-actions justify-end pt-3">
            <button class="btn text-blue-800"></button>
            <button class="btn text-blue-800">Adopt</button>
            <button class="btn text-blue-800">Details</button>
          </div>
        </div>
      </div>
        `
        petcontainer.appendChild(div)
    }
}


loadCategory();
loadAllpets();