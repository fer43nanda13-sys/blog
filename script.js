const menuBtn=document.getElementById('menuBtn');
const mainNav=document.getElementById('mainNav');
menuBtn?.addEventListener('click',()=>mainNav.classList.toggle('open'));
document.querySelectorAll('#mainNav a').forEach(a=>a.addEventListener('click',()=>mainNav.classList.remove('open')));

document.querySelectorAll('.category-tabs button').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.category-tabs button').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const filter=btn.dataset.filter;
    document.querySelectorAll('.news-grid .card').forEach(card=>{
      card.style.display=(filter==='all'||card.dataset.category===filter)?'block':'none';
    });
  });
});

const form=document.getElementById('contactForm');
form?.addEventListener('submit',e=>{
  e.preventDefault();
  document.getElementById('formMsg').textContent='¡Mensaje preparado! Conecta este formulario a tu correo o backend para recibirlo realmente.';
  form.reset();
});

const searchModal=document.getElementById('searchModal');
const searchInput=document.getElementById('searchInput');
const results=document.getElementById('searchResults');
document.getElementById('searchBtn')?.addEventListener('click',()=>{
  searchModal.classList.add('open'); searchModal.setAttribute('aria-hidden','false'); searchInput.focus();
});
document.getElementById('closeSearch')?.addEventListener('click',()=>searchModal.classList.remove('open'));
searchModal?.addEventListener('click',e=>{if(e.target===searchModal)searchModal.classList.remove('open')});

const searchable=[...document.querySelectorAll('main h1,main h2,main h3')];
searchInput?.addEventListener('input',()=>{
  const q=searchInput.value.trim().toLowerCase();
  if(!q){results.innerHTML='';return;}
  const found=searchable.filter(el=>el.textContent.toLowerCase().includes(q)).slice(0,8);
  results.innerHTML=found.length
    ? found.map(el=>`<div class="result"><a href="#${el.closest('section')?.id||''}" onclick="document.getElementById('searchModal').classList.remove('open')">${el.textContent}</a></div>`).join('')
    : '<p class="result">No encontramos resultados.</p>';
});

document.addEventListener('keydown',e=>{
  if(e.key==='Escape') searchModal?.classList.remove('open');
});
