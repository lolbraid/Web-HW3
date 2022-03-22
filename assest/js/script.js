// DUMMY PRODUCTS (PRODUCT ID : DATA)
var products = {
  123: {
    id: 123,
    name: "اسم المنتج",
    desc: "الوصف مال المنتج بلا بلا بلا بلا بلا بلا بلا بلا بلا ",
    img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.09w5fa0K9APjYaxTOmjuaAHaHa%26pid%3DApi&f=1",
    price: 5,
  },
  124: {
    id: 124,
    name: "اسم المنتج",
    desc: "الوصف مال المنتج بلا بلا بلا بلا بلا بلا بلا بلا بلا ",
    img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.09w5fa0K9APjYaxTOmjuaAHaHa%26pid%3DApi&f=1",
    price: 5,
  },
  125: {
    id: 125,
    name: "اسم المنتج",
    desc: "الوصف مال المنتج بلا بلا بلا بلا بلا بلا بلا بلا بلا ",
    img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.09w5fa0K9APjYaxTOmjuaAHaHa%26pid%3DApi&f=1",
    price: 5,
  },
  126: {
    id: 126,
    name: "اسم المنتج",
    desc: "الوصف مال المنتج بلا بلا بلا بلا بلا بلا بلا بلا بلا ",
    img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.09w5fa0K9APjYaxTOmjuaAHaHa%26pid%3DApi&f=1",
    price: 5,
  },
  127: {
    id: 127,
    name: "اسم المنتج",
    desc: "الوصف مال المنتج بلا بلا بلا بلا بلا بلا بلا بلا بلا ",
    img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.09w5fa0K9APjYaxTOmjuaAHaHa%26pid%3DApi&f=1",
    price: 5,
  },
  128: {
    id: 128,
    name: "اسم المنتج",
    desc: "الوصف مال المنتج بلا بلا بلا بلا بلا بلا بلا بلا بلا ",
    img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.09w5fa0K9APjYaxTOmjuaAHaHa%26pid%3DApi&f=1",
    price: 5,
  },
};

/*


CART


*/

var cart = {
  // (A) PROPERTIES
  hPdt: null, // HTML products list
  hItems: null, // HTML current cart
  items: {}, // Current items in cart

  // (B) LOCALSTORAGE CART
  // (B1) SAVE CURRENT CART INTO LOCALSTORAGE
  save: function () {
    localStorage.setItem("cart", JSON.stringify(cart.items));
  },

  // (B2) LOAD CART FROM LOCALSTORAGE
  load: function () {
    cart.items = localStorage.getItem("cart");
    if (cart.items == null) {
      cart.items = {};
    } else {
      cart.items = JSON.parse(cart.items);
    }
  },

  // (B3) EMPTY ENTIRE CART
  nuke: function () {
    if (confirm("Empty cart?")) {
      cart.items = {};
      localStorage.removeItem("cart");
      cart.list();
    }
  },

  // (C) INITIALIZE
  init: function () {
    // (C1) GET HTML ELEMENTS
    cart.hPdt = document.getElementById("cart-products");
    cart.hItems = document.getElementById("cart-items");

    // (C2) DRAW PRODUCTS LIST
    cart.hPdt.innerHTML = "";
    console.log(cart.hPdt);
    let p, item, part;
    for (let id in products) {
      // WRAPPER
      p = products[id];
      item = document.createElement("card");
      item.className = "card m-2";
      item.style = "width: 17rem;";
      cart.hPdt.appendChild(item);

      // PRODUCT IMAGE
      part = document.createElement("img");
      part.src = p.img;
      part.className = "card-img-top";
      part.alt = p.name;
      item.appendChild(part);

      // PRODUCT NAME AND PRODUCT DESCRIPTION CONTAINE
      part = document.createElement("div");
      part.className = "card-body";

      // PRODUCT NAME
      let name_ = document.createElement("h5");
      name_.className = "card-title";
      name_.innerText = p.name;
      part.appendChild(name_);

      // PRODUCT DESCRIPTION
      desc = document.createElement("p");
      desc.innerText = p.desc;
      desc.className = "card-text";
      part.appendChild(desc);

      item.appendChild(part);

      // PRODUCT PRICE
      part = document.createElement("ul");
      part.innerHTML = `<li class="list-group-item">${p.price}د.ك</li>`;
      part.className = "list-group list-group-flush";
      item.appendChild(part);

      // ADD TO CART
      part = document.createElement("div");
      part.className = "card-body d-flex";

      let btn = document.createElement("button");
      btn.className = "btn btn-warning";
      btn.innerText = "اضافة الى سلة المشتريات";
      btn.onclick = cart.add;
      btn.dataset.id = id;
      part.appendChild(btn);

      item.appendChild(part);
    }

    // (C3) LOAD CART FROM PREVIOUS SESSION
    cart.load();

    // (C4) LIST CURRENT CART ITEMS
    cart.list();
  },

  // (D) LIST CURRENT CART ITEMS (IN HTML)
  list: function () {
    // (D1) RESET
    cart.hItems.innerHTML = "";
    let item, part, pdt;
    let empty = true;
    for (let key in cart.items) {
      if (cart.items.hasOwnProperty(key)) {
        empty = false;
        break;
      }
    }

    // (D2) CART IS EMPTY
    if (empty) {
      item = document.createElement("div");
      item.className = "text-center";
      item.innerHTML = "سلة المشتريات فارغة";
      cart.hItems.appendChild(item);
    }

    // (D3) CART IS NOT EMPTY - LIST ITEMS
    else {
      let p,
        total = 0,
        subtotal = 0,
        p_total = 0,
        p_subtotal = 0;
      for (let id in cart.items) {
        p = products[id];
        let html = `
        <div class="card rounded-3 mb-4 animate">
          <div class="card-body p-4">
          <div class="row d-flex justify-content-between align-items-center">
            <div class="col-md-2 col-lg-2 col-xl-2">
              <img src="${p.img}"
                class="img-fluid rounded-3" alt="Cotton T-shirt">
            </div>
            <div class="col-md-3 col-lg-3 col-xl-3">
              <p class="lead fw-normal mb-2">${p.name}</p>
              <p><span class="text-muted">الحجم: </span>M <span class="text-muted">اللون: </span>رمادي</p>
            </div>

            <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
              <button class="btn btn-link px-2"
                onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                <i class="bi bi-dash"></i>
              </button>

              <input id="form${p.id}" min="0" name="quantity" type="number"
              class="form-control form-control-sm" />

              <button class="btn btn-link px-2"
                onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                <i class="bi bi-plus"></i>
              </button>
            </div>
            <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
              <h5 class="mb-0">${p.price}د.ك</h5>
            </div>
            <div class="col-md-1 col-lg-1 col-xl-1 text-end">
              <a onclick="cart.remove(${p.id})" class="text-danger"><i class="bi bi-trash-fill"></i></a>
            </div>
          </div>
        </div>
      </div>
`;
        item = document.createElement("card");
        item.innerHTML = html;
        cart.hItems.appendChild(item);

        // QUANTITY
        // THE + AND - BUTTONS  ******NOT WORKING*******
        part = document.getElementById(`form${p.id}`);
        part.value = cart.items[id];
        part.dataset.id = id;
        part.addEventListener("change", cart.change);

        // SUBTOTAL
        subtotal = cart.items[id] * p.price;
        total += subtotal;

        p_subtotal =cart.items[id]
        p_total += p_subtotal
      }

      // CODES ******NOT WORKING*******
      item = document.createElement("div");
      item.className = "card mb-4";
      item.innerHTML = `<div class="card-body p-4 d-flex flex-row">
      <div class="form-outline flex-fill">
          <input type="text" id="form1" class="form-control form-control-lg" />
          <label class="form-label" for="form1">كوبون الخصم</label>
      </div>
      <button type="button" class="btn btn-warning btn-lg ms-3">تأكيد</button>
  </div>`;
      cart.hItems.appendChild(item);

      // EMPTY BUTTONS
      let _btnCont_1 = document.createElement("div");
      _btnCont_1.className = "card";
      let _btnCont_2 = document.createElement("div");
      _btnCont_2.className =
        "card-body d-flex justify-content-between flex-row-reverse";
      _btnCont_1.appendChild(_btnCont_2);

      item = document.createElement("button");
      item.type = "button";
      item.innerText = "افراغ السلة";
      item.addEventListener("click", cart.nuke);
      item.className = "btn btn-warning btn-block btn-lg";
      _btnCont_2.appendChild(item);
      
      // PRODUCTS TOTAL 
      item = document.createElement('span')
      item.innerHTML = `<b>يوجد ${p_total} عنصر في سلتك</b>`
      _btnCont_2.appendChild(item)

      // CHECKOUT BUTTONS
      item = document.createElement("botton");
      item.type = "button";
      item.innerText = "الذهاب الى الدفع - " + total + "د.ك";
      item.addEventListener("click", cart.checkout);
      item.className = "btn btn-warning btn-block btn-lg";
      _btnCont_2.appendChild(item);


      cart.hItems.appendChild(_btnCont_1);
    }
  },

  // (E) ADD ITEM INTO CART
  add: function () {
    if (cart.items[this.dataset.id] == undefined) {
      cart.items[this.dataset.id] = 1;
    } else {
      cart.items[this.dataset.id]++;
    }
    cart.save();
    cart.list();
  },

  // (F) CHANGE QUANTITY
  change: function () {
    if (this.value == 0) {
      delete cart.items[this.dataset.id];
    } else {
      cart.items[this.dataset.id] = this.value;
    }
    cart.save();
    cart.list();
  },

  // (G) REMOVE ITEM FROM CART
  remove: function (id) {
    delete cart.items[id];
    console.log(id);
    cart.save();
    cart.list();
  },

  // (H) CHECKOUT
  checkout: function () {
    // SEND DATA TO SERVER
    // CHECKS
    // SEND AN EMAIL
    // RECORD TO DATABASE
    // PAYMENT
    // WHATEVER IS REQUIRED
    alert("TO DO");

    /*
    var data = new FormData();
    data.append('cart', JSON.stringify(cart.items));
    data.append('products', JSON.stringify(products));
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "SERVER-SCRIPT");
    xhr.onload = function(){ ... };
    xhr.send(data);
    */
  },
};
window.addEventListener("DOMContentLoaded", cart.init);
