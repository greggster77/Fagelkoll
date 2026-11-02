export function validatePayload(s:any):boolean{
 const list=(x:any)=>Array.isArray(x)&&x.length<=20000;
 const id=(x:any)=>Number.isInteger(x)&&x>=0&&x<10000;
 const text=(x:any,n=10000)=>typeof x==='string'&&x.length<=n;
 return (s?.profile===undefined||(s.profile&&typeof s.profile==='object'&&text(s.profile.name,80)&&text(s.profile.home,120)))&&!!s&&typeof s==='object'&&list(s.seen)&&s.seen.every(id)&&list(s.watch)&&s.watch.every(id)&&list(s.records)&&s.records.every((r:any)=>r&&Number.isInteger(r.id)&&r.id>=-1&&r.id<10000&&text(r.place,2000)&&text(r.when,100)&&text(r.note)&&Number.isInteger(r.number)&&r.number>=1&&r.number<=100000&&(r.coordinates===null||(Array.isArray(r.coordinates)&&r.coordinates.length===2&&r.coordinates.every(Number.isFinite)&&Math.abs(r.coordinates[0])<=90&&Math.abs(r.coordinates[1])<=180))&&(r.species===undefined||text(r.species,500)))&&(s.extraBirds===undefined||(list(s.extraBirds)&&s.extraBirds.every((b:any)=>Array.isArray(b)&&b.length===2&&b.every((v:any)=>text(v,500)))))&&(s.watchSettings===undefined||(s.watchSettings&&[30,60,150].includes(s.watchSettings.radius)&&[24,72].includes(s.watchSettings.age)&&typeof s.watchSettings.missing==='boolean'));
}
