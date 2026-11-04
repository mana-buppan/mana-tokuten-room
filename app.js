const root = document.querySelector('#benefit-cards');
const categories = [{id:'basics',title:'在宅物販について'}, {id:'sourcing',title:'実売データ'}, {id:'mercari',title:'メルカリお役立ち'}, {id:'other',title:'その他'}];
const icons={sourcing:'0',mercari:'↗',expenses:'¥',items:'⌂',photos:'◎',data:'▥'};
function makeCard(item){
 const card=document.createElement(item.ready?'a':'article');
 card.className='benefit '+(item.ready?'featured':'upcoming');
 if(item.ready)card.href=item.href;
 const cover=document.createElement('div');cover.className='cover '+item.kind;
 if(item.href==='apparel.html'||item.href==='allgenre.html'){
 card.classList.add('apparel-benefit');
 cover.classList.add('apparel-card-photos');
 cover.innerHTML='<div class="apparel-mosaic" aria-hidden="true"><div class="apparel-tile"><img src="assets/apparel/003.jpg" alt="" style="top:0;transform:translateY(-11.11111111111111%)"></div><div class="apparel-tile"><img src="assets/apparel/033.jpg" alt="" style="top:0;transform:translateY(-0.0%)"></div><div class="apparel-tile"><img src="assets/apparel/006.jpg" alt="" style="top:0;transform:translateY(-0.0%)"></div><div class="apparel-tile"><img src="assets/apparel/007.jpg" alt="" style="top:0;transform:translateY(-0.0%)"></div><div class="apparel-tile"><img src="assets/apparel/008.jpg" alt="" style="top:0;transform:translateY(-5.100956429330499%)"></div><div class="apparel-tile"><img src="assets/apparel/041.jpg" alt="" style="top:0;transform:translateY(-11.11111111111111%)"></div></div>';
  if(item.coverMarkup)cover.innerHTML=item.coverMarkup;
 }else if(item.kind==='reply'){
 cover.classList.add('license');const photo=document.createElement('img');photo.className='license-card-photo';photo.src=item.coverImage;photo.alt=item.coverAlt;photo.loading='lazy';cover.append(photo);
 }else if(item.kind==='items'){
 cover.classList.add('license','unused-cover');cover.innerHTML='<img class="license-card-photo" src="assets/unused-cover.png" alt="服や本を整理する手元と、リモコン・ケーブル・イヤホン" loading="lazy">';
 }else if(item.kind==='words'){
 cover.classList.add('license');cover.innerHTML='<img class="license-card-photo" src="assets/words-cover.png" alt="洋服のそばで商品説明を考える手元" loading="lazy">';
 }else if(item.kind==='shipping'){
 cover.classList.add('license');cover.innerHTML='<img class="license-card-photo" src="assets/shipping-post-approved.png" alt="白い宅配ビニール袋をポストへ投函するイメージ" loading="lazy">';
 }else if(item.kind==='license'){
 cover.innerHTML='<img class="license-card-photo" src="assets/license-desk.avif" alt="書類とノートに記入する手元" loading="lazy">';
 }else if(item.coverImage){
 cover.classList.add('photo-cover');
 const photo=document.createElement('img');photo.className='cover-photo';photo.src=item.coverImage;photo.alt='';
 const heading=document.createElement('strong');heading.textContent=item.title;
 cover.append(photo,heading);
 }else if(item.kind==='recruit'){
 cover.innerHTML='<span class="cover-caption">一緒に働く人と出会う</span><strong>SNSでの<br>外注さん<br>募集戦略</strong><img src="assets/mana-recruit.png" alt="" width="1122" height="1402">';
 }else if(item.kind==='roadmap'){
  cover.innerHTML='<span class="cover-caption">基本から実践まで</span><strong>月<span class="ten">10</span>万<br>ロードマップ</strong><img src="assets/mana.png" alt="" width="1122" height="1402">';
 }else{
  cover.innerHTML='<span class="cover-icon" aria-hidden="true"></span><strong></strong><span class="soon">ただいま準備中</span>';
  cover.querySelector('.cover-icon').textContent=icons[item.kind]||'✧';cover.querySelector('strong').textContent=item.title;
 }
 const info=document.createElement('div');info.className='card-info';
 const tag=document.createElement('span');tag.className='tag';tag.textContent=item.tag;
 const title=document.createElement('h4');title.textContent=item.title;
 if(item.kind==='words'&&item.title.includes('！')){const split=item.title.indexOf('！')+1;title.replaceChildren(document.createTextNode(item.title.slice(0,split)),document.createElement('br'),document.createTextNode(item.title.slice(split)));}
 const desc=document.createElement('p');desc.textContent=item.description;
 const action=document.createElement('span');action.className='card-action';action.textContent=item.ready?'特典を読む　↗':'準備中';
 if(item.href==='apparel.html'||item.href==='allgenre.html'){
 tag.innerHTML='仕入れ値 <b>0</b> 円';
 title.innerHTML='<span class="sales-card-title'+(item.href==='allgenre.html'?' sales-card-title-long':'')+'">'+(item.salesTitle||'アパレル実売データ')+'</span><b>'+(item.salesCount||300)+'</b> 選';
 info.append(tag,title,action);
 }else{info.append(tag,title,desc,action);}
 card.append(cover,info);return card;
}
const input=document.querySelector('#benefit-search');
const purposes=[{id:'all',label:'すべて'},{id:'choose',label:'商品選び・仕入れ'},{id:'listing',label:'出品'},{id:'review',label:'見直し'},{id:'trade',label:'取引対応'},{id:'basics',label:'在宅物販の基礎'}];
const purposeIds={choose:['04','09','10','20'],listing:['17','13','05','18'],review:['17','13','05','18','01'],trade:['12','14','15','16'],basics:['01','03','11','19','21']};
let activePurpose='all';
const purposeBar=document.createElement('div');purposeBar.className='purpose-filters';purposeBar.setAttribute('role','group');purposeBar.setAttribute('aria-label','目的から特典を選ぶ');
purposes.forEach(p=>{const button=document.createElement('button');button.type='button';button.textContent=p.label;button.dataset.purpose=p.id;button.setAttribute('aria-pressed',String(p.id===activePurpose));button.addEventListener('click',()=>{activePurpose=p.id;purposeBar.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.purpose===activePurpose)));render();});purposeBar.append(button);});
document.querySelector('.benefit-search').after(purposeBar);
const normalize=text=>text.normalize('NFKC').toLowerCase().replace(/[ァ-ヶ]/g,c=>String.fromCharCode(c.charCodeAt(0)-0x60));
function render(){
 const words=normalize(input.value).trim().split(/\s+/).filter(Boolean);let count=0;root.replaceChildren();
 categories.forEach((category,index)=>{
  const items=window.BENEFITS.filter(item=>item.category===category.id&&(activePurpose==='all'||purposeIds[activePurpose].includes(item.id))&&words.every(word=>normalize([item.title,item.description,item.tag,category.title].join(' ')).includes(word)));
  if(!items.length)return;count+=items.length;
  const section=document.createElement('section');section.className='category-section';section.setAttribute('aria-labelledby','category-'+category.id);
  const header=document.createElement('div');header.className='category-heading';
  const title=document.createElement('h3');title.id='category-'+category.id;title.innerHTML='<span>0'+(index+1)+'</span> '+category.title;
  const countLabel=document.createElement('span');countLabel.className='category-count';countLabel.textContent=items.length+'件';header.append(title,countLabel);
  const rail=document.createElement('div');rail.className='card-rail';rail.setAttribute('aria-label',category.title+'の特典');rail.tabIndex=0;items.forEach(item=>rail.append(makeCard(item)));
  section.append(header,rail);
  if(items.length>1){const hint=document.createElement('p');hint.className='swipe-hint';hint.textContent='横にスライドして見る →';section.append(hint);}
  root.append(section);
 });
 document.querySelector('#search-status').textContent=(activePurpose==='all'?'すべて':purposes.find(p=>p.id===activePurpose).label)+'：'+count+'件'+(words.length?'（検索結果）':'');
 document.querySelector('#search-empty').hidden=count!==0;
}
input.addEventListener('input',render);
document.querySelector('.benefit-search').addEventListener('submit',event=>event.preventDefault());
document.querySelector('.benefit-search').addEventListener('reset',event=>{event.preventDefault();input.value='';render();input.focus();});
render();
