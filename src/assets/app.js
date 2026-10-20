document.querySelectorAll('.dropdown>button').forEach(button=>{const parent=button.parentElement;const set=(open,suppress=false)=>{parent.classList.toggle('open',open);parent.classList.toggle('suppressed',suppress);button.setAttribute('aria-expanded',String(open))};button.addEventListener('click',()=>{const open=!parent.classList.contains('open');set(open,!open)});parent.addEventListener('mouseenter',()=>{if(!parent.classList.contains('suppressed'))button.setAttribute('aria-expanded','true')});parent.addEventListener('mouseleave',()=>set(false));parent.addEventListener('focusin',()=>{if(!parent.classList.contains('suppressed'))button.setAttribute('aria-expanded','true')});parent.addEventListener('focusout',event=>{if(!parent.contains(event.relatedTarget))set(false)});parent.addEventListener('keydown',event=>{if(event.key==='Escape'){set(false,true);button.focus()}})});
document.addEventListener('click',event=>{document.querySelectorAll('.dropdown.open').forEach(d=>{if(!d.contains(event.target)){d.classList.remove('open');d.querySelector('button').setAttribute('aria-expanded','false')}})});
document.querySelectorAll('[data-poi]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-poi]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));document.querySelectorAll('.poi-note').forEach((note,i)=>note.classList.toggle('active',String(i)===button.dataset.poi))}));
const input=document.querySelector('[data-search]'),filter=document.querySelector('[data-filter]');if(input&&filter){const count=document.querySelector('[data-count]'),suffix=count.textContent.replace(/^7\s*/,'');const update=()=>{let n=0;document.querySelectorAll('[data-weapon]').forEach(card=>{const show=card.dataset.name.toLocaleLowerCase().includes(input.value.trim().toLocaleLowerCase())&&(filter.value==='all'||card.dataset.category===filter.value);card.hidden=!show;if(show)n++});count.textContent=n+' '+suffix;document.querySelector('[data-empty]').hidden=n>0};input.addEventListener('input',update);filter.addEventListener('change',update)}
document.querySelectorAll('[data-play]').forEach(button=>button.addEventListener('click',()=>{const wrapper=button.closest('[data-video]'),frame=document.createElement('iframe');frame.src='https://www.youtube-nocookie.com/embed/'+wrapper.dataset.video+'?autoplay=1';frame.title=button.getAttribute('aria-label');frame.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';frame.allowFullscreen=true;frame.referrerPolicy='strict-origin-when-cross-origin';frame.addEventListener('error',()=>{frame.remove();wrapper.classList.remove('loaded');wrapper.nextElementSibling.querySelector('[data-video-reset]').hidden=true});wrapper.append(frame);wrapper.classList.add('loaded');wrapper.nextElementSibling.querySelector('[data-video-reset]').hidden=false}));

const locationSearch=document.querySelector('[data-map-search]');if(locationSearch){const rows=[...document.querySelectorAll('[data-location]')],prev=document.querySelector('[data-map-prev]'),next=document.querySelector('[data-map-next]'),count=document.querySelector('[data-map-count]');let page=0;const update=()=>{const matching=rows.filter(r=>r.dataset.name.toLocaleLowerCase().includes(locationSearch.value.trim().toLocaleLowerCase()));const pages=Math.max(1,Math.ceil(matching.length/6));page=Math.min(page,pages-1);rows.forEach(r=>r.hidden=true);matching.slice(page*6,page*6+6).forEach(r=>r.hidden=false);prev.disabled=page===0;next.disabled=page===pages-1;count.textContent=`${page+1} / ${pages} · ${matching.length}`;document.querySelector('[data-map-empty]').hidden=matching.length>0};locationSearch.addEventListener('input',()=>{page=0;update()});prev.addEventListener('click',()=>{page--;update()});next.addEventListener('click',()=>{page++;update()});update()}

document.querySelectorAll('.video-poster').forEach(img=>img.addEventListener('error',()=>img.closest('.video').classList.add('poster-failed')));


document.querySelectorAll('[data-video-reset]').forEach(button=>button.addEventListener('click',()=>{const wrapper=button.parentElement.previousElementSibling;wrapper.querySelector('iframe')?.remove();wrapper.classList.remove('loaded');button.hidden=true;wrapper.querySelector('[data-play]').focus()}));

document.querySelectorAll('[data-countdown]').forEach(timer=>{
 const target=Date.parse(timer.dataset.countdown);
 if(!Number.isFinite(target))return;
 const clock=timer.querySelector('.countdown-clock'),parts=[...timer.querySelectorAll('[data-countdown-part]')],status=timer.querySelector('[data-countdown-status]');
 const local=timer.querySelector('[data-countdown-local]');
 local.textContent=new Intl.DateTimeFormat(document.documentElement.lang,{dateStyle:'full',timeStyle:'long'}).format(target);
 local.parentElement.hidden=false;
 const update=()=>{
  const remaining=Math.max(0,Math.ceil((target-Date.now())/1000));
  const values=[Math.floor(remaining/86400),Math.floor(remaining/3600)%24,Math.floor(remaining/60)%60,remaining%60];
  parts.forEach((part,n)=>part.textContent=String(values[n]).padStart(2,'0'));
  clock.hidden=false;
  if(remaining===0){status.textContent=timer.dataset.reached;timer.classList.add('elapsed');}
  return remaining>0;
 };
 if(update()){const interval=setInterval(()=>{if(!update())clearInterval(interval)},1000);}
});
