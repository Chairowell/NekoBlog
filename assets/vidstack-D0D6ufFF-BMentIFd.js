import{aG as d,b6 as m,m as i,aI as l}from"./app-DPw7Sjoh.js";const p=l('<svg viewBox="0 0 32 32" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"></svg>');function v(a,s){const o=d(p);o.innerHTML=m,a.append(o);const e=document.createElement("span");e.classList.add("vds-google-cast-info"),a.append(e);const n=document.createElement("span");n.classList.add("vds-google-cast-device-name"),i(()=>{const{remotePlaybackInfo:c}=s,t=c();return t!=null&&t.deviceName&&(n.textContent=t.deviceName,e.append("Google Cast on ",n)),()=>{e.textContent=""}})}export{v as insertContent};