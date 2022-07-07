const slider = document.getElementById("slider");
const goodsList = document.getElementById("goodsList");
const btnList = document.getElementById("btnList");

let sliderShow = document.createElement("div");
let main = document.createElement("div");
let extra = document.createElement("div");

let foo = document.createElement("div");
foo.setAttribute("data-index", "0");
main.append(foo);

sliderShow.classList.add("col-12", "d-flex", "flex-nowrap", "overflow-hiddens");
main.classList.add("main", "full-width");
extra.classList.add("extra", "full-width");

sliderShow.append(main);
sliderShow.append(extra);
slider.append(sliderShow);

// 受け取った画像を含めたdivとボタンを作成する関数
function sliderDate(goodsObject) {
  for (let i = 0; i < goodsObject.length; i++) {
    //divパート
    let box = document.createElement("div");
    box.classList.add("box", "bg-light", "d-flex", "justify-content-center", "sliderItems");

    let name = goodsObject[i].name;
    let price = goodsObject[i].price;
    let imgUrl = goodsObject[i].imgUrl;
    let stringI = i+1;
    stringI = stringI + "";
    box.setAttribute("data-name", name);
    box.setAttribute("data-price", price);
    box.setAttribute("data-imgUrl", imgUrl);
    box.setAttribute("data-index", stringI);

    let img = document.createElement("img");
    img.src = imgUrl;
    img.classList.add("col-10", "imgFit");

    box.append(img);
    goodsList.append(box);

    //buttonパート
    let btn = document.createElement("button");
    let number = "" + (i+1);
    btn.innerHTML = number;
    btn.classList.add("btn", "btn-light", "col-3");
    btn.addEventListener("click", function(){
      clickEvent(number);
    });
    btnList.append(btn);
  }
}

class GoodsObject {
  constructor(name, imgUrl, price) {
    this.name = name;
    this.imgUrl = imgUrl;
    this.price = price;
  }
}

const goods = [
  new GoodsObject("aquarius", "https://item-shopping.c.yimg.jp/i/n/soukai_4902102069366", "¥160"),
  new GoodsObject("お～いお茶", "https://www.itoen.jp/oiocha/products/img/product-list_01.png", "¥150"),
  new GoodsObject("Coca-Cola", "https://m.media-amazon.com/images/I/41Aaex1tJML._SL500_.jpg", "¥150"),
  new GoodsObject("伊右衛門", "https://www.suntory.co.jp/softdrink/iyemon/img/webp/img_mv_sp.webp", "¥150"),
  new GoodsObject("三ツ矢サイダー", "https://m.media-amazon.com/images/I/618XpUYT3EL._AC_SL1500_.jpg", "¥150"),
  new GoodsObject("WILKINSON", "https://images-fe.ssl-images-amazon.com/images/I/71ruN8P3IgL.__AC_SX300_SY300_QL70_ML2_.jpg", "¥150")
];






//右左どちらに動くか判断する関数
function determineLeftOrRight(quantity, nextLocation, currLocation) {
  let halfOfQuantity = quantity / 2;
  return Math.abs(currLocation - nextLocation) <= halfOfQuantity ? "right" : "left";
}

//animation関数
function animateMain(currentElement, nextElement, animationType) {
    main.innerHTML = "";
    main.append(nextElement);
  console.log(nextElement);

    extra.innerHTML = "";
    extra.append(currentElement);

    main.classList.add("expand-animation");
    extra.classList.add("deplete-animation");

    if (animationType === "right"){
        sliderShow.innerHTML = "";
        sliderShow.append(extra);
        sliderShow.append(main);
    } else if (animationType === "left") {
        sliderShow.innerHTML = "";
        sliderShow.append(main);
        sliderShow.append(extra);
    }
}

//画像を表示させ、右上のboxに情報を表示する関数
const sliderItems = document.querySelectorAll("#goodsList .box");

function clickEvent(i) {
  //左の画像の動的変化
  let index = parseInt(i) - 1;
  let currLocation = toString(main.getAttribute("data-index"));
  let animationType = determineLeftOrRight(sliderItems.length, i, currLocation);

  let currentElement = sliderItems[currLocation];
  let nextElement = sliderItems[index];
  console.log(nextElement);

  animateMain(currentElement, nextElement, animationType)

  //右上のレンダリング
  let goodsIndex = document.getElementById("goodsIndex");
  let goodsName = document.getElementById("goodsName");
  let goodsPrice = document.getElementById("goodsPrice");

  goodsIndex.innerHTML = nextElement.getAttribute("data-index");
  goodsName.innerHTML = nextElement.getAttribute("data-name");
  goodsPrice.innerHTML = nextElement.getAttribute("data-price");
}







sliderDate(goods);
