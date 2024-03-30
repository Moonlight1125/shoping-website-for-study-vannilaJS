let itemsData = [
    {
         "id": "jfhgbvnscs",
         "name": "jordan",
         "price": 45,
         "desc": "Lorem ipsum dolor sit amet consectetur adipisicing.",
         "img": "./img/jorder1.jpg"
     },
    {
         "id": "ioytrhndcv",
         "name": "jordan2",
         "price": 100,
         "desc": "Lorem ipsum dolor sit amet consectetur adipisicing.",
         "img":"./img/jorder1Black.jpg"
     },
     {
         "id": "wuefbncxbsn",
         "name": "jordan3",
         "price": 25,
         "desc": "Lorem ipsum dolor sit amet consectetur adipisicing.",
         "img":"./img/jorderSilver.jpg"
     },
     {
         "id": "thyfhcbcv",
         "name": "jordan4",
         "price": 300,
         "desc": "Lorem ipsum dolor sit amet consectetur adipisicing.",    
         "img":"./img/jorderYellow.jpg"
     }   
 ]

const noteBuy = document.querySelector(".note-buy")
const currentPrice = document.getElementById("currentPrice");

let i = 0;
// localStorage.clear();
let getItems = getLocalStorage();
getItems = getItems.filter(itm=>itm.value!==0);
window.addEventListener("load",()=>{
    console.log(getItems)
    reset();
    
    getItems.map(x=>{
        datas = [...datas,x];
    })

    //shopIcon
    let originNum = getItems.reduce((x,y)=>x+y.value,0);
    noteBuy.innerHTML = originNum;

    const mainBuy = document.querySelector(".main-buy");
    const fragmentBuy = document.createDocumentFragment();
    getItems.map((elm)=>{
        const sortIems = itemsData.find(x=>{return x.id===elm.id});
        const layerBuy = document.createElement("div");
        layerBuy.classList.add("clothesContainer-buy");
        const createAtt = document.createAttribute("data-id");
        createAtt.value=`${sortIems.id}`;
        layerBuy.setAttributeNode(createAtt);
        layerBuy.innerHTML = `
        <img  src="${sortIems.img}" alt="">
        <article class="clothesInfo-buy">
            <div class="newStyle">
                <h2>${sortIems.name}</h2>
                <h2 class="price-buy">${sortIems.price}</h2>
                <span data-stid ="${sortIems.id}" class="material-symbols-outlined closeIcon">
                    close
                </span>
            </div>
             <aside>
                <div class="icons-buy">
                    <span class="plus-buy" id="plus-buy"></span>
                    <span data-id="${sortIems.id}" class="counter-buy" id="counter-buy">${elm.value}</span>
                    <span class="minus-buy" id="minus-buy"></span>
                </div>
            </aside>
            <div class="pricePerUnit">
                <h2 class="nowPrice" data-origin="${sortIems.price}">${sortIems.price*elm.value}</h2>
            </div>
        </article>
        `
        fragmentBuy.appendChild(layerBuy);
    })
    mainBuy.appendChild(fragmentBuy);
    setItemsToStorage();
    calBills();
    deleteAct()
    clearCart();
})

function getLocalStorage(){
    return localStorage.getItem("storageList")
    ? JSON.parse(localStorage.getItem("storageList"))
    : [];
}


let datas = [
]
function setItemsToStorage(){
    const plusBtn = document.querySelectorAll(".plus-buy");
    const minusBtn = document.querySelectorAll(".minus-buy");

    plusBtn.forEach(btn=>{
    btn.addEventListener("click",(e)=>{
        const plusEl = e.target;
        const counter = plusEl.nextElementSibling;
        const counterId = counter.dataset.id;
       let result = datas.find(x=>x.id===counterId);
       if(result===undefined){
        datas = [...datas,{
            value:1,
            id:counterId
        }]
       }else{
        result.value+=1
       }
       const beforeParse = counter.innerHTML;
       let parsed = parseInt(beforeParse);
       parsed++;
       counter.innerHTML=+parsed;
       //price
       const currentPriceParent = counter.parentNode.parentNode.nextElementSibling.firstElementChild;
       const currentPrice = currentPriceParent.dataset.origin;
       currentPriceParent.textContent = result.value*currentPrice;
       calculate()
       calBills();
       localStorage.setItem("storageList",JSON.stringify(datas));
    })
});
    
minusBtn.forEach(btn=>{
    btn.addEventListener("click",(e)=>{
       const minusEl = e.target;
       const counter = minusEl.previousElementSibling;
       const counterId = counter.dataset.id;
       let result = datas.find(x=>x.id===counterId);
       if(result.value===0){
        return;
       }else{
        result.value -=1;
        const beforeParse = counter.innerHTML;
        let parsed = parseInt(beforeParse);
        parsed--;
        counter.innerHTML=parsed;
       }
        //price
        const currentPriceParent = counter.parentNode.parentNode.nextElementSibling.firstElementChild;
        const currentPrice = currentPriceParent.dataset.origin;
        currentPriceParent.textContent = result.value*currentPrice;
       calculate()
       calBills();
       const resultValue = result.value;
      if(resultValue===0){
        const test = minusEl.parentNode.parentNode.parentNode.parentNode;
        test.remove();
        reset__minusBtn();
    }
    localStorage.setItem("storageList",JSON.stringify(datas));
    })
})
}

function calculate(){
    let numbers = datas.map(x=>x.value)
    noteBuy.innerHTML = numbers.reduce((x,y)=>x+y,0)
}

const prices = [];

function calBills(){
    const getPrice = document.querySelectorAll(".nowPrice");
    let total = 0;
    getPrice.forEach(x=>{
        let v = parseInt(x.textContent);
        prices.push(v);
        total += v;
    })
    currentPrice.innerHTML ="$"+total;
}

function deleteAct(){    
    const closeIcons = document.querySelectorAll(".closeIcon");
    //クリックした要素のstorageIDが欲しい
   closeIcons.forEach(elm=>{
    elm.addEventListener("click",(e)=>{
        const divs = e.target.parentNode.parentNode.parentNode;
        divs.remove();
        const storageID = e.target.dataset.stid;
        const test = datas.filter(x=>{
            return x.id!==storageID
        })
        //update datas
        datas= [...test]
        console.log(datas)
        calBills();
        calculate();
        localStorage.setItem("storageList",JSON.stringify(test));
        reset__Close();
    })
   })
}

function clearCart(){
    const checkBtn = document.getElementById("checkOut");
    const clearBtn = document.getElementById("clearCart");
    const backToHome = document.getElementById("backToHome");

    clearBtn.addEventListener("click",()=>{
        datas = [];
        calculate();
        const targetText = document.getElementById("callState");
        localStorage.clear()
        checkBtn.style.display = "none"
        clearBtn.style.display = "none"
        backToHome.style.display= "block"
        //delete Elements
        const containers = document.querySelectorAll(".clothesContainer-buy");
        containers.forEach((x)=>{
            x.remove();
        })
        return (targetText.innerHTML = `
        Cart is Empty
    `)
    })
}

function empOriginally(){
    const checkBtn = document.getElementById("checkOut");
    const clearBtn = document.getElementById("clearCart");
    const backToHome = document.getElementById("backToHome");

    const targetText = document.getElementById("callState");
    checkBtn.style.display = "none"
    clearBtn.style.display = "none"
    backToHome.style.display= "block"
    return (targetText.innerHTML = `
        Cart is Empty
    `)
}

function reset(){
   if(getItems.length===0){
        empOriginally();
    }
}

function reset__Close(){
    const getItems = getLocalStorage();
    if(getItems.length===0){
        empOriginally();
    }
}

function reset__minusBtn(){
    const getContainers = document.querySelectorAll(".counter-buy");
    if(getContainers.length===0){
        empOriginally();
    }
}

// function delEl(){
//     const elments = document.querySelectorAll(".counter-buy");
//     elments.forEach(elm=>{
//         const counter = elm.
//     })
// }