const data = document.getElementById("data");

async function api() {
  try {
    const res = await fetch("https://edu-me01.github.io/Traval-task/api/data.json");
    const final = await res.json();
    display(final.destinations);
  } catch (error) {
    console.error("API error:", error);
  }
}

function display(arr) {
  let cartoona = "";
  for (let i = 0; i < 6; i++) {
    cartoona += `
      <div class="col-md-3 rounded-3 shadow-lg p-4">
        <img src="${arr[i].image}" class="w-100 rounded-3" alt="">               
        <h5>${arr[i].name}</h5>
        <p>${arr[i].description.slice(0, 100)}...</p>
        <div class="box_btn d-flex justify-content-between">
          <h6 class="p-1 bg-info rounded-4">${arr[i].region}</h6>
          <button class="btn btn-outline-info">View Details</button>
          <button class="btn btn-outline-info" onclick="addToFavorites(${arr[i].id})">Favorites</button>
        </div>
      </div>
    `;
  }
  data.innerHTML = cartoona;
}

function addToFavorites(id) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (!favorites.includes(id)) {
    favorites.push(id);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("Added to favorites!");
  } else {
    alert("Already in favorites!");
  }
}

api();
