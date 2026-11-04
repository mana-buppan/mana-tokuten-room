const search=document.querySelector('#item-search');
const cards=[...document.querySelectorAll('.item-card')];
const groups=[...document.querySelectorAll('.item-group')];
let active='all';
const norm=s=>s.normalize('NFKC').toLowerCase().replace(/[ァ-ヶ]/g,c=>String.fromCharCode(c.charCodeAt(0)-0x60));
function filterItems(){
 const query=norm(search.value).trim().split(/\s+/).filter(Boolean);let count=0;
 cards.forEach(card=>{const show=(active==='all'||card.dataset.category===active)&&query.every(q=>norm(card.textContent).includes(q));card.hidden=!show;if(show)count++});
 groups.forEach(group=>{group.hidden=![...group.querySelectorAll('.item-card')].some(card=>!card.hidden)});
 document.querySelector('#item-status').textContent=count+'件の候補を表示しています';
 document.querySelector('#item-empty').hidden=count>0;
}
search.addEventListener('input',filterItems);
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{active=button.dataset.filter;document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));filterItems()}));
filterItems();
