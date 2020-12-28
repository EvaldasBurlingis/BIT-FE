const SEARCH_INPUT = document.querySelector('#search_input');
const FILTER_INPUT = document.querySelector('#filter');
const GRID = document.querySelector('#grid');

let search_input_value = '';
let filter_input_value = 'all';
let cards = [];
let data_copy = data;

// Create card for each dog
function create_dog_cards(dog_data) {
    dog_data.map(item => {
        const card_div = document.createElement('div');
        card_div.classList.add('w-full', 'h-full', 'border', 'border-gray-400');
        card_div.dataset.breed = item.breeds[0].name;
        card_div.dataset.breed_group = item.breeds[0].breed_group;

        card_div.innerHTML = `
            <div
                class="bg-cover h-64 bg-center bg-no-repeat"
                style="background-image: url('${item.url}')"></div>
            <div class="py-4 px-2">
                <h2 class="font-semibold text-gray-900 text-lg tracking-tight font-semibold mb-4">${item.breeds[0].name}</h2>
                <ul class="text-sm">
                    <li class="text-gray-700 mb-2">
                        Life span: ${item.breeds[0].life_span}
                    </li>
                    <li class="text-gray-700 mb-2">
                        Weight: ${item.breeds[0].weight.metric} kg / ${item.breeds[0].weight.imperial} lb
                    </li>
                    <li class="text-gray-700 mb-2 border-b border-gray-300 pb-2">
                        Height: ${item.breeds[0].height.metric} cm / ${item.breeds[0].weight.imperial} in
                    </li>      
                    <li class="text-gray-700 mb-2">
                        Bred for: ${item.breeds[0].bred_for ?  item.breeds[0].bred_for : 'Data not found'}
                    </li>
                    <li class="text-gray-700 mb-2">
                        Breed group: ${item.breeds[0].breed_group}
                    </li>
                    <li class="text-gray-700 mb-2">
                        Breed temperament: ${item.breeds[0].temperament}
                    </li>
                <ul>
            </div>
        `;

        GRID.appendChild(card_div);
    })
};

// EVENT LISTENERS
SEARCH_INPUT.addEventListener('keyup', (e) => {
    search_input_value = e.target.value.toLowerCase();
    filter_dogs();
});

FILTER_INPUT.addEventListener('change', (e) => {
    filter_input_value = e.target.value.toLowerCase();
    filter_dogs();
});

function filter_dogs() {

    for(let i = 0; i < cards.length; i++)
    {
        let breed = cards[i].dataset.breed.toLowerCase();
        let breed_group = cards[i].dataset.breed_group.toLowerCase();
        
        if (filter_input_value === 'all'){
            cards[i].classList.remove('hidden')
        }else if(breed_group !== filter_input_value) {
            cards[i].classList.add('hidden')
        } else {
            cards[i].classList.remove('hidden')
        };  

        if (!cards[i].classList.contains('hidden')) {  
            if(!breed.includes(search_input_value)) {
                cards[i].classList.add('hidden')
            }; 
        }

    }

    // Remove search error on each keyup if visible
    document.querySelector('.search-error') && document.querySelector('.search-error').remove();

    // If search doesn't match any records show error message
    if(document.querySelectorAll('.hidden').length === data.length) {
        const div = document.createElement('div');
        div.classList.add('text-red-500', 'col-span-2', 'text-center', 'search-error');
        div.textContent = 'No breeds found...';
        GRID.appendChild(div);
    };
}

// Wait for dom to be loaded
document.addEventListener("DOMContentLoaded", () => {
    create_dog_cards(data_copy);
    cards = [...document.querySelectorAll('[data-breed]')];
})