import {createHash} from 'node:crypto';
import {readFile} from 'node:fs/promises';
export function assetRevisionFor(...assets){const hash=createHash('sha256');for(const asset of assets)hash.update(asset);return hash.digest('hex').slice(0,12)}
export async function currentAssetRevision(){return assetRevisionFor(...await Promise.all(['style.css','app.js','analytics.js'].map(file=>readFile(new URL('../src/assets/'+file,import.meta.url)))))}
