import {mkdir,writeFile} from 'node:fs/promises';
import {renderPage} from '../src/render.mjs';
import {GUIDE_ROUTES} from '../src/guides.mjs';
const results={scope:'Initial rendered main; shared related section, breadcrumb and review dates removed. Expandable FAQ counted once. Metadata, attributes, header and footer excluded.',language:'English',tokenization:'Unicode letters/numbers with internal apostrophes, lowercase; punctuation separates words',phraseMatching:'Case-insensitive literal full phrase, non-overlapping; variants counted separately',densityFormula:'phrase occurrences / total body words * 100',pages:[]};
const stop=new Set('a an the and or of to in for on at is are be as with from by this that it its your you all can how no not before after does do'.split(' '));
for(const p of ['home','map','weapons','missions','extraction','start','videos','sources',...GUIDE_ROUTES]){
 const html=renderPage('en',p).split('<main id="main">')[1].split('</main>')[0];
 const main=html.replace(/<div class="breadcrumb">[\s\S]*?<\/div>/g,'').replace(/<p class="updated">[\s\S]*?<\/p>/g,'').replace(/<section class="related">[\s\S]*?<\/section>/g,'');
 const text=main.replace(/<[^>]+>/g,' ').replace(/&#\d+;|&[a-z]+;/g,' ').replace(/\s+/g,' ');
 const words=(text.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)||[]).map(w=>w.toLowerCase());
 const phrase=GUIDE_ROUTES.includes(p)?p.replaceAll('-',' '):'DMZ MW4';
 const count=(text.match(new RegExp(phrase,'gi'))||[]).length;
 const frequencies={};for(const n of [1,2,3]){const counts=new Map();for(let i=0;i<=words.length-n;i++){const chunk=words.slice(i,i+n);if(chunk.some(w=>stop.has(w))||chunk.every(w=>/^\d+$/.test(w)))continue;const key=chunk.join(' ');counts.set(key,(counts.get(key)||0)+1)}frequencies[n]=[...counts].sort((a,b)=>b[1]-a[1]).slice(0,15)}
 results.pages.push({page:p,words:words.length,phrase,occurrences:count,phraseDensity:Math.round(count/words.length*10000)/100,variantMW4DMZ:(text.match(/MW4 DMZ/gi)||[]).length,frequencies});
}
await mkdir('.local/diagnostics',{recursive:true});await writeFile('.local/diagnostics/keyword-counts.json',JSON.stringify(results,null,2));console.log('Wrote ignored .local/diagnostics/keyword-counts.json');
