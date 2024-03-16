// // A function to call and query about the certain ideas that is needed for the call
// function searchMovie(searchQuery){
//     document.addEventListener('DOMContentLoaded', async () => {
//         const response = await fetch(`/search?query=${searchQuery}`, {
//             method: 'POST'
//         })

// const { response } = require("express")

        
//         /**
//          * @typedef Movie 
//          * @prop {import("mongoose").ObjectId} _id
//          * @prop {string} name
//          * @prop {number} year
//          * @prop {number} runtime
//          * @prop {string[]} categories
//          * @prop {string} releaseDate
//          * @prop {string} director
//          * @prop {string[]} writer
//          * @prop {string[]} actors
//          * @prop {string} storyline
//          */

//         /** @type {Array<Movie>} */
//         const movies = await response.json();
//         const list = document.querySelector('.row.trending-box');

//         list.innerHTML = "";

//     movies.forEach(movie => {
//         list.innerHTML += `
//             <div class="col-lg-3 col-md-6 align-self-center mb-30 trending-items col-md-6 adv">
//                 <div class="item">
//                     <div class="thumb">
//                         <a href="product-details.html"><img src="${movie.Brand}" alt=""></a>
//                         <span class="price"><em>$${movie.Price}</em>$${movie.Price}</span>
//                     </div>
//                     <div class="down-content">
//                         <span class="category">${movie.Hand}</span>
//                         <h4>${movie.Model}</h4>
//                         <a href="product-details.html"><i class="fa fa-shopping-bag"></i></a>
//                     </div>
//                 </div>
//             </div>
//         `;
//     }); 
//     })
// }
window.onload = function(){
    document.getElementById('searchButton').addEventListener('click', searchbar)
    document.getElementById('showAllButton').addEventListener('click', showAllEntries)
    // document.getElementById()
    rotatePrimary();
}

let index = 0;
let intervalId;

function rotatePrimary() {
    const primary_pic = document.getElementById('primary_pic');

    fetch(`/search`, {
        method: 'POST', 
        body: JSON.stringify()
    })
    .then(response => response.json())
    .then(data => {
        // Function to update the image
        function updateImage() {
            const movie = data[index];    
            let profit = movie.rate * movie.purchased;
            let background = 'red'; // replace with the actual background color you want
            let indicator = 'down'; // replace with the actual indicator you want

            if(profit <= movie.cost){
                indicator = 'down'
            }
            else {
                indicator = 'up'
                background = 'green'
            }
            primary_pic.innerHTML = `
            <img src="assets/img/${movie.title}.jpg" alt="">
            <span class="price">PHP ${profit}.00</span>
            <span class="offer" style="background-color: ${background}"> <i class = 'fa fa-arrow-${indicator}'> </i></span>`;
            index++;
            if (index === data.length) {
                index = 0; // reset index to loop back to the first image
                // clearInterval(intervalId); // clear interval after displaying all images
            }
        }

        // Update the image once before starting the interval
        updateImage();

        // Start the interval
        intervalId = setInterval(updateImage, 5000); // change image every 10 seconds
    });
}

function showAllEntries() {
    const buttonState = document.getElementById('showAllButton')
    buttonState.style.display = 'none'
    const headers = {
        'Content-Type': 'application/json',
    };
    fetch(`/search`, {
    method: 'POST',
    headers: headers, 
    body: JSON.stringify()
})
    .then(response => response.json())
    .then(data => {
        console.log(data)
        displayVal(data);
    })
    .catch(error => console.error('Error:', error));
}

function searchbar() { // Query still doesn't get activated.
    const searchInput = document.querySelector('#search_bar').value;
    console.log(searchInput);
    const intSearchInput = parseInt(searchInput);
    console.log(intSearchInput);

    const headers = {
        'Content-Type': 'application/json',
    };
    
    if (isNaN(intSearchInput)) {
        fetch(`/search?query=${searchInput}`, {
            method: 'POST',
            headers: headers, 
            body: JSON.stringify({query: searchInput})
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                displayVal(data);
            })
            .catch(error => console.error('Error:', error));
    } else {
        fetch(`/price?query=${intSearchInput}`)
            .then(response => response.json())
            .then(data => {
                displayVal(data);
            })
            .catch(error => console.error('Error:', error));
    }
}

function displayVal(data){
    const list = document.querySelector('#entriesContainer');
        list.innerHTML = '';
    //     data.forEach(movie => {
    //         // console.log(movie);
    //         let profit = movie.rate * movie.purchased;
    //         let indicator = 'down';
    //         let background;
    //         if(profit <= movie.cost){
    //             indicator = 'down'
    //         }
    //         else {
    //             indicator = 'up'
    //             background = 'green'
    //         }
    //         list.innerHTML += `
    //             <div class="col-lg-3 col-md-6 align-self-center mb-30 trending-items col-md-6 adv ${movie.genre}"> 
    //                 <div class="item">
    //                     <div class="thumb">
    //                         <a href="product-details.html"><img src="../img/${movie.title}.jpg" alt=""></a>
    //                         <span class="price">Sold: ${movie.purchased}</span>
    //                     </div>
    //                     <div class="down-content">
    //                         <span class="category">${movie.cost}</span>
    //                         <h4>${movie.title}</h4>
    //                         <h4 class="mt-2 ml-2"> PHP ${profit}.00 <h4>
    //                         <a href="product-details.html" style="background-color : ${background}"><i class="fa fa-arrow-${indicator}"></i></a>
    //                     </div>
    //                 </div>
    //             </div>
    //         `;
    // })
    data.forEach(movie => {
        let profit = movie.rate * movie.purchased;
        let background = 'red'; // replace with the actual background color you want
        let indicator = 'down'; // replace with the actual indicator you want

        if(profit <= movie.cost){
            indicator = 'down'
        }
        else {
            indicator = 'up'
            background = 'green'
        }

        // Create new elements
        let newElement = document.createElement('div');
        newElement.className = `col-lg-3 col-md-6 align-self-center mb-30 trending-items col-md-6 adv ${movie.genre}`;

        let item = document.createElement('div');
        item.className = 'item';

        let thumb = document.createElement('div');
        thumb.className = 'thumb';

        let imgLink = document.createElement('a');
        imgLink.href = 'product-details.html';

        let img = document.createElement('img');
        img.src = `../img/${movie.title}.jpg`;
        img.alt = '';

        let price = document.createElement('span');
        price.className = 'price';
        price.textContent = `Sold: ${movie.purchased}`;

        let downContent = document.createElement('div');
        downContent.className = 'down-content';

        let category = document.createElement('span');
        category.className = 'category';
        category.textContent = `${movie.cost}`;

        let title = document.createElement('h3');
        title.textContent = `${movie.title}`;

        let profitElement = document.createElement('h4');
        profitElement.style.color = background;
        profitElement.className = 'mt-2 ml-2';
        profitElement.textContent = `PHP ${profit}.00`;

        let arrowLink = document.createElement('a');
        arrowLink.href = 'product-details.html';
        arrowLink.style.backgroundColor = background;

        let icon = document.createElement('i');
        icon.className = `fa fa-arrow-${indicator}`;

        // Append elements
        imgLink.appendChild(img);
        thumb.appendChild(imgLink);
        thumb.appendChild(price);
        downContent.appendChild(category);
        downContent.appendChild(title);
        downContent.appendChild(profitElement);
        arrowLink.appendChild(icon);
        downContent.appendChild(arrowLink);
        item.appendChild(thumb);
        item.appendChild(downContent);
        newElement.appendChild(item);

        list.appendChild(newElement);
    });
    const footer = document.getElementById('entriesContainer')
    footer.innerHTML += `
        <div class="d-flex justify-content-end">
          <ul class="pagination">
          <li><a href="#"> &lt; </a></li>
            <li><a href="#">1</a></li>
            <li><a class="is_active" href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li><a href="#"> &gt; </a></li>
          </ul>
        </div>
        `;
}