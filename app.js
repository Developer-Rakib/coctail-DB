
// select element 
let inputFeild = document.querySelector("#input-feild");
let seacrhBtn = document.querySelector("#search-btn");
let coctails = document.querySelector("#coctails");
let coctail = document.querySelector("#coctail");
let load = document.querySelector("#loading");


// Enter button 
inputFeild.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.key == "Enter") {
        seacrhBtn.click();
    }
});



fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
    .then(res => res.json())
    .then(data => displayData(data.drinks))

seacrhBtn.addEventListener("click", () => {

    if (isNaN(inputFeild.value) == false || inputFeild.value == "") {
        alert("please enter valid input")
    } else {

        coctails.textContent = "";
        load.style.display = "block";
        console.log(inputFeild.value);
        let url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputFeild.value}`
        fetch(url)
            .then(res => res.json())
            .then(data => {


                setTimeout(() => {
                    displayData(data.drinks);

                }, 500);
                setTimeout(() => {

                    load.style.display = "none";

                }, 500);



            })


        inputFeild.value = "";
    }

})

function displayData(datas) {
    if (datas == null) {
        alert("Data Not Avaiable")

    } else {

        datas.forEach(data => {
            console.log(data.strDrink);
            let div = document.createElement("div");
            div.innerHTML = `

                            <img src="${data.strDrinkThumb}" alt="">
                            <h5>Drink Name : ${data.strDrink}</h5>
                            <p>Catagory  : ${data.strCategory}</p>
                
                `;
            coctails.appendChild(div);

            div.addEventListener("click", () => {
                coctail.textContent = "";
                location.hash = "#coctail";
                let Div1 = document.createElement("div");

                console.log(data.strDrink);

                Div1.innerHTML = `
                                
                                <img src="${data.strDrinkThumb}" alt="">
                                <h3>Drink Name : ${data.strDrink}</h3>
                                <p>Date Of Modified: ${data.dateModified}</p>
                                <p>Alcoholic : ${data.strAlcoholic}</p>
                                <p>Catagory  : ${data.strCategory}</p>
                                <p>Glass : ${data.strGlass}</p>
                                <p>Instructions : ${data.strInstructions.slice(0, 150)}</p>

                    `;
                coctail.appendChild(Div1);
                location.hash = "#";

            })
        });
    }

}
