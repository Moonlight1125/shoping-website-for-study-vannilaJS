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

const main = document.querySelector(".main");
const note = document.querySelector(".note");
const fragment = document.createDocumentFragment();
//fragmentにlineupをあらかじめappenchildさせてサイト読み込み時
//にappenchildをさせないようにする

let i = 0;//counter
window.addEventListener("DOMContentLoaded",function(){
    // localStorage.clear();
    const getItems = getLocalStorage();

    getItems.map(x=>{
        datas.push(x);
        let parsedX = parseInt(x.value)
        i+=parsedX;
        note.innerHTML = i;
    })

    if(getItems.length<itemsData.length){
        let c = 0;
        let diff = itemsData.length-getItems.length;
        for(c;c<diff;c++){
            getItems.push({value:0});
        }
    }

    itemsData.map((data,index)=>{
        //find id from testArray that equal itemData[0~3];
        let serach = getItems.find((x,y)=>{
                return x.id===data.id;
        })
        console.log(serach)
        const layer = document.createElement("div");
        layer.classList.add("clothesContainer");
        layer.innerHTML = `
        <div lass="clothesContainer">
        <img  src="${data.img}" alt="#">
        <article class="clothesInfo">
            <dl>
                <dt>${data.name}</dt>
                <dd>${data.desc}</dd>
            </dl>
             <aside>
                <h2 class="price">$${data.price}</h2>
                <div class="icons">
                    <span class="plus" id="plus"></span>
                    <span data-id="${data.id}" class="counter" id="counter">${serach === undefined ? 0:serach.value}</span>
                    <span class="minus" id="minus"></span>
                </div>
            </aside>
        </article>
        </div>
        `
     fragment.appendChild(layer);
    })
    main.appendChild(fragment);
    // asidePart();
    testiing();
})

function getLocalStorage(){
    return localStorage.getItem("storageList")
    ? JSON.parse(localStorage.getItem("storageList"))
    : [];
}

let datas = [
]

function testiing(){
    const plusBtn = document.querySelectorAll(".plus");
    const minusBtn = document.querySelectorAll(".minus");
    const note = document.querySelector(".note");

    plusBtn.forEach(btn=>{
    btn.addEventListener("click",(e)=>{
        const plusEl = e.target;
        const counter = plusEl.nextElementSibling;
        const counterId = counter.dataset.id;
       let result = datas.find(x=>x.id===counterId);
       if(result===undefined){
        datas.push({
            value:1,
            id:counterId
        })
       }else{
        result.value+=1
       }
       const aa = counter.innerHTML;
       let num = parseInt(aa);
       num++;
       counter.innerHTML=num;
       calculate()
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
        const aa = counter.innerHTML;
        let num = parseInt(aa);
        num--;
        counter.innerHTML=num;
       }
       calculate()
       datas = datas.filter(itm=>itm.value!==0)
       localStorage.setItem("storageList",JSON.stringify(datas));
    })
})

function calculate(){
    let numbers = datas.map(x=>x.value)
    note.innerHTML = numbers.reduce((x,y)=>x+y,0)
}
}
