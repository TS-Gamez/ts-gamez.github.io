// ===== EDIT YOUR GAMES HERE =====
// link: store URL ("" shows "Coming Soon")   image: path inside img/
const GAMES=[
{title:"Skyline Assassin",tag:"Action · Stealth · Sniper",platform:"Meta Quest",genre:["VR","Stealth","Action"],
 desc:"Take to the rooftops of a vibrant city. Track your targets, line up the perfect shot and vanish before anyone knows you were there.",
 link:"https://www.meta.com/experiences/skyline-assassin/1175940798938908/",image:"img/hitman.jpg"},
{title:"Vesper Bay",tag:"Open World · Crime",platform:"Meta Quest",genre:["VR","Open World","Crime"],
 desc:"An open-world crime story in VR. Explore a neon-lit coastal city, take on jobs and build your reputation on the streets of Vesper Bay.",
 link:"https://www.meta.com/experiences/vesper-bay-open-world-crime-vr/1176457082220613/",image:"img/vesper.svg"},
{title:"Rift Breach Survival",tag:"Survival · Shooter",platform:"Meta Quest",genre:["VR","Survival","Shooter"],
 desc:"You wake on a stormy island beside a crashed helicopter. Scavenge, build and fight back as creatures pour through the rift.",
 link:"https://www.meta.com/experiences/rift-breach-survival/1176531478879840/",image:"img/rift.jpg"},
{title:"Crunch Time",tag:"Arcade · Time Attack",platform:"Meta Quest",genre:["VR","Arcade","Party"],
 desc:"The clock is ticking and every second counts. Think fast, move faster and pull off the impossible before time runs out.",
 link:"https://www.meta.com/experiences/crunch-time/1176599068873081/",image:"img/crunch.svg"},
{title:"Fix It Or Fry It",tag:"Party · Repair · Chaos",platform:"Meta Quest",genre:["VR","Party","Repair"],
 desc:"Gadgets are sparking and the crowd is panicking! Grab your tools and repair everything before it goes up in flames.",
 link:"",image:"img/fixit.jpg"}
];

const META='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.9 6C4.2 6 2 9.4 2 13.1 2 15.6 3.2 18 5.6 18c1.9 0 3.2-1.5 4.9-4.3l1.5-2.5 1.5 2.5c1.7 2.8 3 4.3 4.9 4.3 2.4 0 3.6-2.4 3.6-4.9C22 9.4 19.8 6 17.1 6c-1.9 0-3.3 1.4-5.1 4.2C10.2 7.4 8.8 6 6.9 6zm0 2.2c1.1 0 2 .9 3.7 3.6l-1.2 2c-1.4 2.3-2.4 3.4-3.6 3.4-1 0-1.6-1-1.6-2.9 0-2.9 1.3-6.1 2.7-6.1zm10.2 0c1.4 0 2.7 3.2 2.7 6.1 0 1.9-.6 2.9-1.6 2.9-1.2 0-2.2-1.1-3.6-3.4l-1.2-2c1.7-2.7 2.6-3.6 3.7-3.6z"/></svg>';

document.getElementById("gamelist").innerHTML=GAMES.map((g,i)=>`
<article class="game reveal">
  <div class="shot"><span class="plat">${g.platform}</span><img src="${g.image}" alt="${g.title} screenshot" loading="lazy"></div>
  <div class="info"><div class="num">0${i+1} — ${g.tag}</div><h3>${g.title}</h3><p>${g.desc}</p>
    <div class="tags">${g.genre.map(t=>`<span>${t}</span>`).join("")}</div>
    ${g.link?`<a class="btn" href="${g.link}" target="_blank" rel="noopener">${META} Get it on Meta Quest</a>`:`<span class="btn off">Coming Soon</span>`}
  </div>
</article>`).join("");

// hero slideshow from game screenshots
const sl=document.querySelector(".slides");
sl.innerHTML=GAMES.filter(g=>!g.image.endsWith(".svg")).map(g=>`<img src="${g.image}" alt="">`).join("");
const imgs=[...sl.children];let s=0;imgs[0].classList.add("on");
setInterval(()=>{imgs[s].classList.remove("on");s=(s+1)%imgs.length;imgs[s].classList.add("on")},5000);

// header on scroll + mobile menu
const hd=document.querySelector("header");addEventListener("scroll",()=>hd.classList.toggle("scrolled",scrollY>40));
document.querySelector(".burger").onclick=()=>document.querySelector(".menu").classList.toggle("open");
document.querySelectorAll(".menu a").forEach(a=>a.onclick=()=>document.querySelector(".menu").classList.remove("open"));

// scroll reveal
const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add("show");io.unobserve(x.target)}}),{threshold:.15});
document.querySelectorAll(".reveal").forEach(el=>io.observe(el));

// 3D tilt on screenshots
if(matchMedia("(hover:hover)").matches)document.querySelectorAll(".shot").forEach(c=>{
 c.addEventListener("mousemove",e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform=`perspective(900px) rotateY(${x*8}deg) rotateX(${-y*8}deg)`});
 c.addEventListener("mouseleave",()=>c.style.transform="")});

// count-up stats
const cio=new IntersectionObserver(e=>e.forEach(x=>{if(!x.isIntersecting)return;const el=x.target,n=+el.dataset.n;let i=0;const t=setInterval(()=>{el.textContent=++i+(el.dataset.s||"");if(i>=n)clearInterval(t)},Math.max(40,900/n));cio.unobserve(el)}));
document.querySelectorAll("[data-n]").forEach(el=>cio.observe(el));

// particle network background
const cv=document.getElementById("bg"),cx=cv.getContext("2d");let P=[],M={x:-999,y:-999};
addEventListener("mousemove",e=>{M.x=e.clientX;M.y=e.clientY});
function rs(){cv.width=innerWidth;cv.height=innerHeight;P=Array.from({length:Math.min(80,innerWidth/16)},()=>({x:Math.random()*cv.width,y:Math.random()*cv.height,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35,r:Math.random()*1.6+.6}))}
rs();addEventListener("resize",rs);
(function d(){cx.clearRect(0,0,cv.width,cv.height);
 P.forEach((p,i)=>{p.x=(p.x+p.vx+cv.width)%cv.width;p.y=(p.y+p.vy+cv.height)%cv.height;
  cx.fillStyle="rgba(150,130,255,.8)";cx.beginPath();cx.arc(p.x,p.y,p.r,0,7);cx.fill();
  for(let j=i+1;j<P.length;j++){const q=P[j],dd=Math.hypot(p.x-q.x,p.y-q.y);if(dd<120){cx.strokeStyle=`rgba(0,212,255,${.15*(1-dd/120)})`;cx.beginPath();cx.moveTo(p.x,p.y);cx.lineTo(q.x,q.y);cx.stroke()}}
  const dm=Math.hypot(p.x-M.x,p.y-M.y);if(dm<160){cx.strokeStyle=`rgba(124,92,255,${.4*(1-dm/160)})`;cx.beginPath();cx.moveTo(p.x,p.y);cx.lineTo(M.x,M.y);cx.stroke()}});
 requestAnimationFrame(d)})();
