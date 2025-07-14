var data =document.getElementById("data");
var Register=document.getElementById("Register");
async function api() {
  var res = await fetch("https://edu-me01.github.io/Traval-task/api/data.json");
  var final = await res.json();
  display(final.destinations);
}

function display(arr) {
  var cartoona = "";
  for (let i = 0; i < 3; i++) {
    cartoona += `
               <div class="box col-md-3 rounded-3 shadow-lg p-4">
            <img src="${arr[i].image}" class="w-100 rounded-3" alt="">               
             <h5>${arr[i].name}</h5>
             <p>${arr[i].description.slice(0,100)}...</p>
                    <div class="box_btn d-flex justify-content-between">
                        <h6 class="p-1 color_web rounded-4">${arr[i].region}</h6>
                        <button class="btn btn-outline-info">
                            View Details
                        </button>
                    </div>
                </div>
        `;
  }
  data.innerHTML=cartoona;
}
api();

Register.addEventListener("click",function()
{
  window.open("./index.html");
})