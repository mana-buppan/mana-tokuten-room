const search=document.querySelector('#reply-search');
const cards=[...document.querySelectorAll('.reply-card')];
let active='all',noticeTimer;
const norm=s=>s.normalize('NFKC').toLowerCase().replace(/[ァ-ヶ]/g,c=>String.fromCharCode(c.charCodeAt(0)-0x60));
function filterReplies(){const query=norm(search.value).trim().split(/\s+/).filter(Boolean);let count=0;cards.forEach(card=>{const show=(active==='all'||card.dataset.category===active)&&query.every(q=>norm(card.textContent).includes(q));card.hidden=!show;if(show)count++});document.querySelector('#reply-status').textContent=count+'件の例文を表示しています';document.querySelector('#reply-empty').hidden=count>0;}
search.addEventListener('input',filterReplies);
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{active=button.dataset.filter;document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));filterReplies()}));
document.querySelectorAll('.copy-reply').forEach(button=>button.addEventListener('click',async()=>{const card=button.closest('article'),text=card.querySelector('.reply-example p').textContent,notice=document.querySelector('#copy-status');clearTimeout(noticeTimer);try{await navigator.clipboard.writeText(text);notice.textContent='コピーしました。［ ］を書き換えてから送ってください。';}catch{notice.textContent='コピーできない場合は、下の欄を長押ししてコピーしてください。';let field=card.querySelector('textarea');if(!field){field=document.createElement('textarea');field.className='reply-copy-fallback';field.readOnly=true;field.setAttribute('aria-label','コピー用の例文');field.value=text;button.after(field)}field.focus();field.select();}noticeTimer=setTimeout(()=>notice.textContent='',6000)}));
filterReplies();
