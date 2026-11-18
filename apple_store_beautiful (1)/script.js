const products=[
{id:1,name:"iPhone 16 Pro",cat:"iPhone",price:14999000,type:"phone",bg:"#dce5f5"},
{id:2,name:"iPhone 16",cat:"iPhone",price:10999000,type:"phone",bg:"#e9e2f2"},
{id:3,name:"MacBook Air",cat:"Mac",price:15999000,type:"mac",bg:"#e3e8ed"},
{id:4,name:"MacBook Pro",cat:"Mac",price:24999000,type:"mac",bg:"#dce3ec"},
{id:5,name:"iPad Air",cat:"iPad",price:8999000,type:"pad",bg:"#e9e5f4"},
{id:6,name:"iPad Pro",cat:"iPad",price:13999000,type:"pad",bg:"#e0e8ee"},
{id:7,name:"AirPods Pro",cat:"Aksessuar",price:3299000,type:"buds",bg:"#f0e9e2"},
{id:8,name:"Apple Watch",cat:"Aksessuar",price:4599000,type:"watch",bg:"#e2e9e4"}
];
let active="Barchasi",basket=[];
const el=id=>document.getElementById(id);
const money=n=>new Intl.NumberFormat("uz-UZ").format(n)+" so‘m";
function renderProducts(){
 const query=el("search").value.trim().toLocaleLowerCase("uz");
 const list=products.filter(p=>(active==="Barchasi"||p.cat===active)&&p.name.toLocaleLowerCase("uz").includes(query));
 el("products").innerHTML=list.map(p=>`<article class="product"><div class="product-art" style="background:${p.bg}"><div class="device ${p.type}"></div></div><div class="product-info"><span class="category">${p.cat}</span><h3>${p.name}</h3><span class="price">${money(p.price)}</span><button class="add" data-add="${p.id}" aria-label="Savatchaga qo‘shish">+</button></div></article>`).join("");
 el("empty").hidden=list.length>0;
}
function renderCart(){
 el("count").textContent=basket.reduce((s,p)=>s+p.qty,0);
 el("total").textContent=money(basket.reduce((s,p)=>s+p.price*p.qty,0));
 el("cartItems").innerHTML=basket.length?basket.map(p=>`<div class="cart-row"><div class="cart-symbol">✦</div><div><h4>${p.name} × ${p.qty}</h4><p>${money(p.price*p.qty)}</p></div><button class="remove" data-remove="${p.id}">O‘chirish</button></div>`).join(""):'<p style="color:#858d98;font-size:13px">Savatcha hozircha bo‘sh.</p>';
}
function toast(message){el("toast").textContent=message;el("toast").classList.add("show");clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>el("toast").classList.remove("show"),2100)}
function openCart(){el("cartPanel").classList.add("open");el("overlay").classList.add("open");el("cartPanel").setAttribute("aria-hidden","false")}
function closeCart(){el("cartPanel").classList.remove("open");el("overlay").classList.remove("open");el("cartPanel").setAttribute("aria-hidden","true")}
el("filters").addEventListener("click",event=>{const button=event.target.closest("[data-cat]");if(!button)return;active=button.dataset.cat;document.querySelectorAll("[data-cat]").forEach(b=>b.classList.toggle("active",b===button));renderProducts()});
el("search").addEventListener("input",renderProducts);
el("products").addEventListener("click",event=>{const button=event.target.closest("[data-add]");if(!button)return;const product=products.find(p=>p.id===Number(button.dataset.add));const existing=basket.find(p=>p.id===product.id);existing?existing.qty++:basket.push({...product,qty:1});renderCart();toast("Mahsulot savatchaga qo‘shildi")});
el("cartItems").addEventListener("click",event=>{const button=event.target.closest("[data-remove]");if(!button)return;basket=basket.filter(p=>p.id!==Number(button.dataset.remove));renderCart()});
el("openCart").addEventListener("click",openCart);el("closeCart").addEventListener("click",closeCart);el("overlay").addEventListener("click",closeCart);
el("checkout").addEventListener("click",()=>toast(basket.length?"Bu demo: buyurtma yuborilmadi":"Avval mahsulot tanlang"));
document.addEventListener("keydown",event=>{if(event.key==="Escape")closeCart()});
el("year").textContent=new Date().getFullYear();renderProducts();renderCart();