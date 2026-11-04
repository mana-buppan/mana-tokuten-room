const search=document.querySelector('#word-search');
const cards=[...document.querySelectorAll('.word-card')];
let active='all',noticeTimer;
const norm=s=>s.normalize('NFKC').toLowerCase().replace(/[ァ-ヶ]/g,c=>String.fromCharCode(c.charCodeAt(0)-0x60));
function filterWords(){const query=norm(search.value).trim().split(/\s+/).filter(Boolean);let count=0;cards.forEach(card=>{const show=(active==='all'||card.dataset.category===active)&&query.every(q=>norm(card.textContent).includes(q));card.hidden=!show;if(show)count++});document.querySelector('#word-status').textContent=count+'件の言葉を表示しています';document.querySelector('#word-empty').hidden=count>0;}
search.addEventListener('input',filterWords);
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{active=button.dataset.filter;document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));filterWords()}));
document.querySelectorAll('.copy-example').forEach(button=>button.addEventListener('click',async()=>{const text=button.closest('article').querySelector('.word-example p').textContent;const notice=document.querySelector('#copy-status');clearTimeout(noticeTimer);try{await navigator.clipboard.writeText(text);notice.textContent='コピーしました。自分の商品に合わせて書き換えてください。';}catch{notice.textContent='コピーできませんでした。例文を長押しして選択・コピーしてください。';}noticeTimer=setTimeout(()=>notice.textContent='',5000)}));
filterWords();
