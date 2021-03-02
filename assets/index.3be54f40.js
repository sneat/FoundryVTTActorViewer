import{d as e,c as t,a as l,b as r,t as s,o as a,w as o,v as i,F as n,r as d,e as c,f as u,g as h,h as m,i as p,j as v}from"./vendor.e017732e.js";!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(l){const r=new URL(e,location),s=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((l,a)=>{const o=new URL(e,r);if(self[t].moduleMap[o])return l(self[t].moduleMap[o]);const i=new Blob([`import * as m from '${o}';`,`${t}.moduleMap['${o}']=m;`],{type:"text/javascript"}),n=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(i),onerror(){a(new Error(`Failed to import: ${e}`)),s(n)},onload(){l(self[t].moduleMap[o]),s(n)}});document.head.appendChild(n)})),self[t].moduleMap={}}}("assets/");var f=e({name:"Actor",props:{actor:{type:Object,required:!0},siteURL:{type:String,required:!0},worldName:{type:String,required:!0}},methods:{hasAvatarURL:e=>!!(null==e?void 0:e.img),getAvatarURL(e){let t=e.img;try{new URL(e.img)}catch(l){t=`${this.siteURL}${e.img}`}return t},getActorSheetURL(e){return`https://ardittristan.github.io/VTTExternalActorSite/?${this.siteURL}actorAPI/${this.worldName}-actors.json${e._id}`},getName:e=>(null==e?void 0:e.name)||"Unknown",getRace(e){var t,l,r,s;return"npc"===e.type?(null==(l=null==(t=null==e?void 0:e.data)?void 0:t.details)?void 0:l.type)||"Unknown":(null==(s=null==(r=null==e?void 0:e.data)?void 0:r.details)?void 0:s.race)||"Unknown"},getLevel(e){var t,l,r,s;return"npc"===e.type?(null==(l=null==(t=null==e?void 0:e.data)?void 0:t.details)?void 0:l.cr)||"Unknown":(null==(s=null==(r=null==e?void 0:e.data)?void 0:r.details)?void 0:s.level)||"Unknown"},getClass(e){var t,l;if("npc"===e.type)return(null==(l=null==(t=null==e?void 0:e.data)?void 0:t.details)?void 0:l.alignment)||"-";let r=[];return e.items.filter((e=>"class"===e.type)).forEach((t=>{var l,s,a,o;(null==(l=null==t?void 0:t.data)?void 0:l.levels)===(null==(a=null==(s=null==e?void 0:e.data)?void 0:s.details)?void 0:a.level)?r.push(t.name):r.push(`${t.name} (${null==(o=null==t?void 0:t.data)?void 0:o.levels})`)})),r.length?r.join(" / "):"Unknown"}}});const w={class:"avatar"};f.render=function(e,o,i,n,d,c){return a(),t("tr",null,[l("td",w,[e.hasAvatarURL(e.actor)?(a(),t("img",{key:0,src:e.getAvatarURL(e.actor),class:"avatar"},null,8,["src"])):r("",!0)]),l("td",null,[l("a",{href:e.getActorSheetURL(e.actor),target:"_blank"},s(e.getName(e.actor)),9,["href"])]),l("td",null,s(e.getRace(e.actor)),1),l("td",null,s(e.getClass(e.actor)),1),l("td",null,s(e.getLevel(e.actor)),1)])};var y=e({name:"List",components:{Actor:f},props:{actors:{type:Array,required:!0},showPC:{type:Boolean,required:!0},showNPC:{type:Boolean,required:!0},siteURL:{type:String,required:!0},worldName:{type:String,required:!0}},data:()=>({filterClass:null,filterLevel:null,filterName:null,filterRace:null}),computed:{filteredActors(){return this.actors.filter(this.filterType).filter(this.filterByLevel).filter(this.filterByClass).filter(this.filterByName).filter(this.filterByRace).sort(this.orderByLevel)}},methods:{filterType(e){return!(!this.showPC||"character"!==e.type)||!(!this.showNPC||"npc"!==e.type)},filterByClass(e){if(!this.filterClass)return!0;let t="";return f.methods&&(t=f.methods.getClass(e)),t.toLowerCase().includes(this.filterClass.toLowerCase())},filterByLevel(e){var t,l;return!this.filterLevel||(null==(l=null==(t=null==e?void 0:e.data)?void 0:t.details)?void 0:l.level)==this.filterLevel},filterByName(e){if(!this.filterName)return!0;let t="";return f.methods&&(t=f.methods.getName(e)),t.toLowerCase().includes(this.filterName.toLowerCase())},filterByRace(e){if(!this.filterRace)return!0;let t="";return f.methods&&(t=f.methods.getRace(e)),t.toLowerCase().includes(this.filterRace.toLowerCase())},orderByLevel:(e,t)=>"character"===e.type&&"character"===t.type?(e.data.details.level||0)-(t.data.details.level||0):"npc"===e.type&&"npc"===t.type?(e.data.details.cr||0)-(t.data.details.cr||0):"npc"===e.type&&"character"===t.type?1:"character"===e.type&&"npc"===t.type?-1:0}});const L={class:"row"},g={class:"column"},U={class:"actors"},R=l("th",{width:"4em"},[l("label",{for:"filterName"},"Name")],-1),C={width:"25%"},b=c("Race "),N={width:"23%"},k=c("Class "),P={width:"12%"},A=c("Level ");y.render=function(e,r,s,c,h,m){const p=u("Actor");return a(),t("div",L,[l("div",g,[l("table",U,[l("thead",null,[l("tr",null,[R,l("th",null,[o(l("input",{"onUpdate:modelValue":r[1]||(r[1]=t=>e.filterName=t),id:"filterName",type:"search",class:"x-large"},null,512),[[i,e.filterName,void 0,{trim:!0}]])]),l("th",C,[l("label",null,[b,o(l("input",{"onUpdate:modelValue":r[2]||(r[2]=t=>e.filterRace=t),type:"search",class:"medium"},null,512),[[i,e.filterRace,void 0,{trim:!0}]])])]),l("th",N,[l("label",null,[k,o(l("input",{"onUpdate:modelValue":r[3]||(r[3]=t=>e.filterClass=t),type:"search",class:"medium"},null,512),[[i,e.filterClass,void 0,{trim:!0}]])])]),l("th",P,[l("label",null,[A,o(l("input",{"onUpdate:modelValue":r[4]||(r[4]=t=>e.filterLevel=t),type:"number",class:"small"},null,512),[[i,e.filterLevel,void 0,{number:!0}]])])])])]),l("tbody",null,[(a(!0),t(n,null,d(e.filteredActors,(l=>(a(),t(p,{actor:l,key:l.data.id,siteURL:e.siteURL,worldName:e.worldName},null,8,["actor","siteURL","worldName"])))),128))])])])])};var $=e({name:"App",components:{List:y},data:()=>({siteURL:null,error:null,selectedWorld:null,worlds:[],actors:[],showPC:!0,showNPC:!1,loading:!1}),computed:{hasWorlds(){return this.worlds.length>0},hasActors(){return this.actors.length>0}},methods:{getWorlds(){if(!this.siteURL)return;this.error="";let e=null;try{e=new window.URL(this.siteURL),this.siteURL=e.toString()}catch(l){return void(this.error=`Error: invalid URL. ${l}`)}this.loading=!0;const t=`https://cors-anywhere.ardittristan.workers.dev/corsproxy/?apiurl=${this.siteURL}actorAPI/worlds.json`;fetch(t).then((e=>e.json())).then((e=>{this.worlds=e,this.loading=!1})).catch((e=>{this.error=`Error: ${e}. Could not access ${t}.`,this.loading=!1}))},getActors(){if(!this.selectedWorld)return;this.error="",this.loading=!0;const e=`https://cors-anywhere.ardittristan.workers.dev/corsproxy/?apiurl=${this.siteURL}actorAPI/${this.selectedWorld}-actors.json`;fetch(e).then((e=>e.json())).then((e=>{this.actors=Object.values(e),this.loading=!1})).catch((t=>{this.error=`Error: ${t}. Could not access ${e}.`,this.loading=!1}))}}});const S={class:"container"},V=l("h1",{class:"title"},"VTT External Actor Viewer",-1),j={class:"row"},B=l("label",{for:"siteURL"},"FoundryVTT instance URL:",-1),T=l("input",{class:"button-primary",type:"submit",value:"Load worlds"},null,-1),W={key:0},x=l("label",{for:"world"},"Select world:",-1),E=l("input",{class:"button-primary",type:"submit",value:"Get actors"},null,-1),q=l("label",{for:"showPC"},"Show PCs",-1),_=l("label",{for:"showNPC"},"Show NPCs",-1),F={class:"row"},M={class:"column"},O={key:0,class:"error"},I={key:1,class:"loading"},G=l("div",{class:"lds-dual-ring"},null,-1),z=l("div",{class:"row"},[l("div",{class:"column footer"},[l("p",null,[c(" Built to make it easier to view actors in your "),l("a",{href:"https://foundryvtt.com/",target:"_blank"},"FoundryVTT"),c(" instance. Uses the "),l("a",{href:"https://foundryvtt.com/packages/externalactor/",target:"_blank"},"VTT External Actor Viewer"),c(" module. ")])])],-1);$.render=function(e,c,v,f,w,y){const L=u("List");return a(),t("div",S,[V,l("div",j,[l("form",{onSubmit:c[2]||(c[2]=h(((...t)=>e.getWorlds&&e.getWorlds(...t)),["prevent"]))},[l("fieldset",null,[B,o(l("input",{id:"siteURL",type:"url",placeholder:"https://example.com:3000/","onUpdate:modelValue":c[1]||(c[1]=t=>e.siteURL=t)},null,512),[[i,e.siteURL,void 0,{trim:!0}]]),T,e.hasWorlds?r("",!0):(a(),t("p",W," Start by entering the URL of your FoundryVTT instance. "))])],32),e.hasWorlds?(a(),t("form",{key:0,onSubmit:c[4]||(c[4]=h(((...t)=>e.getActors&&e.getActors(...t)),["prevent"]))},[l("fieldset",null,[x,o(l("select",{id:"world","onUpdate:modelValue":c[3]||(c[3]=t=>e.selectedWorld=t)},[(a(!0),t(n,null,d(e.worlds,(e=>(a(),t("option",{key:e.name,value:e.name},s(e.title),9,["value"])))),128))],512),[[m,e.selectedWorld,void 0,{trim:!0}]]),E])],32)):r("",!0),e.hasWorlds?(a(),t("form",{key:1,onSubmit:c[6]||(c[6]=h((()=>{}),["prevent"]))},[l("fieldset",null,[q,o(l("input",{type:"checkbox",id:"showPC","onUpdate:modelValue":c[5]||(c[5]=t=>e.showPC=t)},null,512),[[p,e.showPC]])])],32)):r("",!0),e.hasWorlds?(a(),t("form",{key:2,onSubmit:c[8]||(c[8]=h((()=>{}),["prevent"]))},[l("fieldset",null,[_,o(l("input",{type:"checkbox",id:"showNPC","onUpdate:modelValue":c[7]||(c[7]=t=>e.showNPC=t)},null,512),[[p,e.showNPC]])])],32)):r("",!0)]),l("div",F,[l("div",M,[e.error?(a(),t("div",O,[l("span",null,s(e.error),1)])):r("",!0),e.loading?(a(),t("div",I,[G])):r("",!0)])]),e.hasActors?(a(),t(L,{key:0,actors:e.actors,siteURL:e.siteURL,worldName:e.selectedWorld,showPC:e.showPC,showNPC:e.showNPC},null,8,["actors","siteURL","worldName","showPC","showNPC"])):r("",!0),z])},v($).mount("#app");
