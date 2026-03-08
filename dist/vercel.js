var Jo=Object.create;var Bn=Object.defineProperty;var Vo=Object.getOwnPropertyDescriptor;var Ho=Object.getOwnPropertyNames;var Wo=Object.getPrototypeOf,zo=Object.prototype.hasOwnProperty;var Xe=(s=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(s,{get:(e,t)=>(typeof require<"u"?require:e)[t]}):s)(function(s){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+s+'" is not supported')});var g=(s,e)=>()=>(e||s((e={exports:{}}).exports,e),e.exports);var Xo=(s,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of Ho(e))!zo.call(s,i)&&i!==t&&Bn(s,i,{get:()=>e[i],enumerable:!(n=Vo(e,i))||n.enumerable});return s};var Rn=(s,e,t)=>(t=s!=null?Jo(Wo(s)):{},Xo(e||!s||!s.__esModule?Bn(t,"default",{value:s,enumerable:!0}):t,s));var L=g(x=>{"use strict";var Zt=Symbol.for("yaml.alias"),jn=Symbol.for("yaml.document"),Ze=Symbol.for("yaml.map"),Un=Symbol.for("yaml.pair"),es=Symbol.for("yaml.scalar"),et=Symbol.for("yaml.seq"),j=Symbol.for("yaml.node.type"),aa=s=>!!s&&typeof s=="object"&&s[j]===Zt,la=s=>!!s&&typeof s=="object"&&s[j]===jn,ca=s=>!!s&&typeof s=="object"&&s[j]===Ze,ua=s=>!!s&&typeof s=="object"&&s[j]===Un,Yn=s=>!!s&&typeof s=="object"&&s[j]===es,fa=s=>!!s&&typeof s=="object"&&s[j]===et;function Gn(s){if(s&&typeof s=="object")switch(s[j]){case Ze:case et:return!0}return!1}function da(s){if(s&&typeof s=="object")switch(s[j]){case Zt:case Ze:case es:case et:return!0}return!1}var pa=s=>(Yn(s)||Gn(s))&&!!s.anchor;x.ALIAS=Zt;x.DOC=jn;x.MAP=Ze;x.NODE_TYPE=j;x.PAIR=Un;x.SCALAR=es;x.SEQ=et;x.hasAnchor=pa;x.isAlias=aa;x.isCollection=Gn;x.isDocument=la;x.isMap=ca;x.isNode=da;x.isPair=ua;x.isScalar=Yn;x.isSeq=fa});var ve=g(ts=>{"use strict";var _=L(),I=Symbol("break visit"),Jn=Symbol("skip children"),K=Symbol("remove node");function tt(s,e){let t=Vn(e);_.isDocument(s)?le(null,s.contents,t,Object.freeze([s]))===K&&(s.contents=null):le(null,s,t,Object.freeze([]))}tt.BREAK=I;tt.SKIP=Jn;tt.REMOVE=K;function le(s,e,t,n){let i=Hn(s,e,t,n);if(_.isNode(i)||_.isPair(i))return Wn(s,n,i),le(s,i,t,n);if(typeof i!="symbol"){if(_.isCollection(e)){n=Object.freeze(n.concat(e));for(let r=0;r<e.items.length;++r){let o=le(r,e.items[r],t,n);if(typeof o=="number")r=o-1;else{if(o===I)return I;o===K&&(e.items.splice(r,1),r-=1)}}}else if(_.isPair(e)){n=Object.freeze(n.concat(e));let r=le("key",e.key,t,n);if(r===I)return I;r===K&&(e.key=null);let o=le("value",e.value,t,n);if(o===I)return I;o===K&&(e.value=null)}}return i}async function st(s,e){let t=Vn(e);_.isDocument(s)?await ce(null,s.contents,t,Object.freeze([s]))===K&&(s.contents=null):await ce(null,s,t,Object.freeze([]))}st.BREAK=I;st.SKIP=Jn;st.REMOVE=K;async function ce(s,e,t,n){let i=await Hn(s,e,t,n);if(_.isNode(i)||_.isPair(i))return Wn(s,n,i),ce(s,i,t,n);if(typeof i!="symbol"){if(_.isCollection(e)){n=Object.freeze(n.concat(e));for(let r=0;r<e.items.length;++r){let o=await ce(r,e.items[r],t,n);if(typeof o=="number")r=o-1;else{if(o===I)return I;o===K&&(e.items.splice(r,1),r-=1)}}}else if(_.isPair(e)){n=Object.freeze(n.concat(e));let r=await ce("key",e.key,t,n);if(r===I)return I;r===K&&(e.key=null);let o=await ce("value",e.value,t,n);if(o===I)return I;o===K&&(e.value=null)}}return i}function Vn(s){return typeof s=="object"&&(s.Collection||s.Node||s.Value)?Object.assign({Alias:s.Node,Map:s.Node,Scalar:s.Node,Seq:s.Node},s.Value&&{Map:s.Value,Scalar:s.Value,Seq:s.Value},s.Collection&&{Map:s.Collection,Seq:s.Collection},s):s}function Hn(s,e,t,n){if(typeof t=="function")return t(s,e,n);if(_.isMap(e))return t.Map?.(s,e,n);if(_.isSeq(e))return t.Seq?.(s,e,n);if(_.isPair(e))return t.Pair?.(s,e,n);if(_.isScalar(e))return t.Scalar?.(s,e,n);if(_.isAlias(e))return t.Alias?.(s,e,n)}function Wn(s,e,t){let n=e[e.length-1];if(_.isCollection(n))n.items[s]=t;else if(_.isPair(n))s==="key"?n.key=t:n.value=t;else if(_.isDocument(n))n.contents=t;else{let i=_.isAlias(n)?"alias":"scalar";throw new Error(`Cannot replace node with ${i} parent`)}}ts.visit=tt;ts.visitAsync=st});var ss=g(Xn=>{"use strict";var zn=L(),ha=ve(),ma={"!":"%21",",":"%2C","[":"%5B","]":"%5D","{":"%7B","}":"%7D"},ga=s=>s.replace(/[!,[\]{}]/g,e=>ma[e]),Se=class s{constructor(e,t){this.docStart=null,this.docEnd=!1,this.yaml=Object.assign({},s.defaultYaml,e),this.tags=Object.assign({},s.defaultTags,t)}clone(){let e=new s(this.yaml,this.tags);return e.docStart=this.docStart,e}atDocument(){let e=new s(this.yaml,this.tags);switch(this.yaml.version){case"1.1":this.atNextDocument=!0;break;case"1.2":this.atNextDocument=!1,this.yaml={explicit:s.defaultYaml.explicit,version:"1.2"},this.tags=Object.assign({},s.defaultTags);break}return e}add(e,t){this.atNextDocument&&(this.yaml={explicit:s.defaultYaml.explicit,version:"1.1"},this.tags=Object.assign({},s.defaultTags),this.atNextDocument=!1);let n=e.trim().split(/[ \t]+/),i=n.shift();switch(i){case"%TAG":{if(n.length!==2&&(t(0,"%TAG directive should contain exactly two parts"),n.length<2))return!1;let[r,o]=n;return this.tags[r]=o,!0}case"%YAML":{if(this.yaml.explicit=!0,n.length!==1)return t(0,"%YAML directive should contain exactly one part"),!1;let[r]=n;if(r==="1.1"||r==="1.2")return this.yaml.version=r,!0;{let o=/^\d+\.\d+$/.test(r);return t(6,`Unsupported YAML version ${r}`,o),!1}}default:return t(0,`Unknown directive ${i}`,!0),!1}}tagName(e,t){if(e==="!")return"!";if(e[0]!=="!")return t(`Not a valid tag: ${e}`),null;if(e[1]==="<"){let o=e.slice(2,-1);return o==="!"||o==="!!"?(t(`Verbatim tags aren't resolved, so ${e} is invalid.`),null):(e[e.length-1]!==">"&&t("Verbatim tags must end with a >"),o)}let[,n,i]=e.match(/^(.*!)([^!]*)$/s);i||t(`The ${e} tag has no suffix`);let r=this.tags[n];if(r)try{return r+decodeURIComponent(i)}catch(o){return t(String(o)),null}return n==="!"?e:(t(`Could not resolve tag: ${e}`),null)}tagString(e){for(let[t,n]of Object.entries(this.tags))if(e.startsWith(n))return t+ga(e.substring(n.length));return e[0]==="!"?e:`!<${e}>`}toString(e){let t=this.yaml.explicit?[`%YAML ${this.yaml.version||"1.2"}`]:[],n=Object.entries(this.tags),i;if(e&&n.length>0&&zn.isNode(e.contents)){let r={};ha.visit(e.contents,(o,a)=>{zn.isNode(a)&&a.tag&&(r[a.tag]=!0)}),i=Object.keys(r)}else i=[];for(let[r,o]of n)r==="!!"&&o==="tag:yaml.org,2002:"||(!e||i.some(a=>a.startsWith(o)))&&t.push(`%TAG ${r} ${o}`);return t.join(`
`)}};Se.defaultYaml={explicit:!1,version:"1.2"};Se.defaultTags={"!!":"tag:yaml.org,2002:"};Xn.Directives=Se});var nt=g(ke=>{"use strict";var Qn=L(),ya=ve();function ba(s){if(/[\x00-\x19\s,[\]{}]/.test(s)){let t=`Anchor must not contain whitespace or control characters: ${JSON.stringify(s)}`;throw new Error(t)}return!0}function Zn(s){let e=new Set;return ya.visit(s,{Value(t,n){n.anchor&&e.add(n.anchor)}}),e}function ei(s,e){for(let t=1;;++t){let n=`${s}${t}`;if(!e.has(n))return n}}function wa(s,e){let t=[],n=new Map,i=null;return{onAnchor:r=>{t.push(r),i??(i=Zn(s));let o=ei(e,i);return i.add(o),o},setAnchors:()=>{for(let r of t){let o=n.get(r);if(typeof o=="object"&&o.anchor&&(Qn.isScalar(o.node)||Qn.isCollection(o.node)))o.node.anchor=o.anchor;else{let a=new Error("Failed to resolve repeated object (this should not happen)");throw a.source=r,a}}},sourceObjects:n}}ke.anchorIsValid=ba;ke.anchorNames=Zn;ke.createNodeAnchors=wa;ke.findNewAnchor=ei});var ns=g(ti=>{"use strict";function Ae(s,e,t,n){if(n&&typeof n=="object")if(Array.isArray(n))for(let i=0,r=n.length;i<r;++i){let o=n[i],a=Ae(s,n,String(i),o);a===void 0?delete n[i]:a!==o&&(n[i]=a)}else if(n instanceof Map)for(let i of Array.from(n.keys())){let r=n.get(i),o=Ae(s,n,i,r);o===void 0?n.delete(i):o!==r&&n.set(i,o)}else if(n instanceof Set)for(let i of Array.from(n)){let r=Ae(s,n,i,i);r===void 0?n.delete(i):r!==i&&(n.delete(i),n.add(r))}else for(let[i,r]of Object.entries(n)){let o=Ae(s,n,i,r);o===void 0?delete n[i]:o!==r&&(n[i]=o)}return s.call(e,t,n)}ti.applyReviver=Ae});var G=g(ni=>{"use strict";var va=L();function si(s,e,t){if(Array.isArray(s))return s.map((n,i)=>si(n,String(i),t));if(s&&typeof s.toJSON=="function"){if(!t||!va.hasAnchor(s))return s.toJSON(e,t);let n={aliasCount:0,count:1,res:void 0};t.anchors.set(s,n),t.onCreate=r=>{n.res=r,delete t.onCreate};let i=s.toJSON(e,t);return t.onCreate&&t.onCreate(i),i}return typeof s=="bigint"&&!t?.keep?Number(s):s}ni.toJS=si});var it=g(ri=>{"use strict";var Sa=ns(),ii=L(),ka=G(),is=class{constructor(e){Object.defineProperty(this,ii.NODE_TYPE,{value:e})}clone(){let e=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return this.range&&(e.range=this.range.slice()),e}toJS(e,{mapAsMap:t,maxAliasCount:n,onAnchor:i,reviver:r}={}){if(!ii.isDocument(e))throw new TypeError("A document argument is required");let o={anchors:new Map,doc:e,keep:!0,mapAsMap:t===!0,mapKeyWarned:!1,maxAliasCount:typeof n=="number"?n:100},a=ka.toJS(this,"",o);if(typeof i=="function")for(let{count:l,res:c}of o.anchors.values())i(c,l);return typeof r=="function"?Sa.applyReviver(r,{"":a},"",a):a}};ri.NodeBase=is});var Ne=g(oi=>{"use strict";var Aa=nt(),Na=ve(),ue=L(),La=it(),Ca=G(),rs=class extends La.NodeBase{constructor(e){super(ue.ALIAS),this.source=e,Object.defineProperty(this,"tag",{set(){throw new Error("Alias nodes cannot have tags")}})}resolve(e,t){let n;t?.aliasResolveCache?n=t.aliasResolveCache:(n=[],Na.visit(e,{Node:(r,o)=>{(ue.isAlias(o)||ue.hasAnchor(o))&&n.push(o)}}),t&&(t.aliasResolveCache=n));let i;for(let r of n){if(r===this)break;r.anchor===this.source&&(i=r)}return i}toJSON(e,t){if(!t)return{source:this.source};let{anchors:n,doc:i,maxAliasCount:r}=t,o=this.resolve(i,t);if(!o){let l=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new ReferenceError(l)}let a=n.get(o);if(a||(Ca.toJS(o,null,t),a=n.get(o)),!a||a.res===void 0){let l="This should not happen: Alias anchor was not resolved?";throw new ReferenceError(l)}if(r>=0&&(a.count+=1,a.aliasCount===0&&(a.aliasCount=rt(i,o,n)),a.count*a.aliasCount>r)){let l="Excessive alias count indicates a resource exhaustion attack";throw new ReferenceError(l)}return a.res}toString(e,t,n){let i=`*${this.source}`;if(e){if(Aa.anchorIsValid(this.source),e.options.verifyAliasOrder&&!e.anchors.has(this.source)){let r=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new Error(r)}if(e.implicitKey)return`${i} `}return i}};function rt(s,e,t){if(ue.isAlias(e)){let n=e.resolve(s),i=t&&n&&t.get(n);return i?i.count*i.aliasCount:0}else if(ue.isCollection(e)){let n=0;for(let i of e.items){let r=rt(s,i,t);r>n&&(n=r)}return n}else if(ue.isPair(e)){let n=rt(s,e.key,t),i=rt(s,e.value,t);return Math.max(n,i)}return 1}oi.Alias=rs});var O=g(os=>{"use strict";var Ea=L(),Oa=it(),qa=G(),Ta=s=>!s||typeof s!="function"&&typeof s!="object",J=class extends Oa.NodeBase{constructor(e){super(Ea.SCALAR),this.value=e}toJSON(e,t){return t?.keep?this.value:qa.toJS(this.value,e,t)}toString(){return String(this.value)}};J.BLOCK_FOLDED="BLOCK_FOLDED";J.BLOCK_LITERAL="BLOCK_LITERAL";J.PLAIN="PLAIN";J.QUOTE_DOUBLE="QUOTE_DOUBLE";J.QUOTE_SINGLE="QUOTE_SINGLE";os.Scalar=J;os.isScalarValue=Ta});var Le=g(li=>{"use strict";var _a=Ne(),te=L(),ai=O(),xa="tag:yaml.org,2002:";function Ia(s,e,t){if(e){let n=t.filter(r=>r.tag===e),i=n.find(r=>!r.format)??n[0];if(!i)throw new Error(`Tag ${e} not found`);return i}return t.find(n=>n.identify?.(s)&&!n.format)}function Ma(s,e,t){if(te.isDocument(s)&&(s=s.contents),te.isNode(s))return s;if(te.isPair(s)){let u=t.schema[te.MAP].createNode?.(t.schema,null,t);return u.items.push(s),u}(s instanceof String||s instanceof Number||s instanceof Boolean||typeof BigInt<"u"&&s instanceof BigInt)&&(s=s.valueOf());let{aliasDuplicateObjects:n,onAnchor:i,onTagObj:r,schema:o,sourceObjects:a}=t,l;if(n&&s&&typeof s=="object"){if(l=a.get(s),l)return l.anchor??(l.anchor=i(s)),new _a.Alias(l.anchor);l={anchor:null,node:null},a.set(s,l)}e?.startsWith("!!")&&(e=xa+e.slice(2));let c=Ia(s,e,o.tags);if(!c){if(s&&typeof s.toJSON=="function"&&(s=s.toJSON()),!s||typeof s!="object"){let u=new ai.Scalar(s);return l&&(l.node=u),u}c=s instanceof Map?o[te.MAP]:Symbol.iterator in Object(s)?o[te.SEQ]:o[te.MAP]}r&&(r(c),delete t.onTagObj);let p=c?.createNode?c.createNode(t.schema,s,t):typeof c?.nodeClass?.from=="function"?c.nodeClass.from(t.schema,s,t):new ai.Scalar(s);return e?p.tag=e:c.default||(p.tag=c.tag),l&&(l.node=p),p}li.createNode=Ma});var at=g(ot=>{"use strict";var Pa=Le(),F=L(),Da=it();function as(s,e,t){let n=t;for(let i=e.length-1;i>=0;--i){let r=e[i];if(typeof r=="number"&&Number.isInteger(r)&&r>=0){let o=[];o[r]=n,n=o}else n=new Map([[r,n]])}return Pa.createNode(n,void 0,{aliasDuplicateObjects:!1,keepUndefined:!1,onAnchor:()=>{throw new Error("This should not happen, please report a bug.")},schema:s,sourceObjects:new Map})}var ci=s=>s==null||typeof s=="object"&&!!s[Symbol.iterator]().next().done,ls=class extends Da.NodeBase{constructor(e,t){super(e),Object.defineProperty(this,"schema",{value:t,configurable:!0,enumerable:!1,writable:!0})}clone(e){let t=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return e&&(t.schema=e),t.items=t.items.map(n=>F.isNode(n)||F.isPair(n)?n.clone(e):n),this.range&&(t.range=this.range.slice()),t}addIn(e,t){if(ci(e))this.add(t);else{let[n,...i]=e,r=this.get(n,!0);if(F.isCollection(r))r.addIn(i,t);else if(r===void 0&&this.schema)this.set(n,as(this.schema,i,t));else throw new Error(`Expected YAML collection at ${n}. Remaining path: ${i}`)}}deleteIn(e){let[t,...n]=e;if(n.length===0)return this.delete(t);let i=this.get(t,!0);if(F.isCollection(i))return i.deleteIn(n);throw new Error(`Expected YAML collection at ${t}. Remaining path: ${n}`)}getIn(e,t){let[n,...i]=e,r=this.get(n,!0);return i.length===0?!t&&F.isScalar(r)?r.value:r:F.isCollection(r)?r.getIn(i,t):void 0}hasAllNullValues(e){return this.items.every(t=>{if(!F.isPair(t))return!1;let n=t.value;return n==null||e&&F.isScalar(n)&&n.value==null&&!n.commentBefore&&!n.comment&&!n.tag})}hasIn(e){let[t,...n]=e;if(n.length===0)return this.has(t);let i=this.get(t,!0);return F.isCollection(i)?i.hasIn(n):!1}setIn(e,t){let[n,...i]=e;if(i.length===0)this.set(n,t);else{let r=this.get(n,!0);if(F.isCollection(r))r.setIn(i,t);else if(r===void 0&&this.schema)this.set(n,as(this.schema,i,t));else throw new Error(`Expected YAML collection at ${n}. Remaining path: ${i}`)}}};ot.Collection=ls;ot.collectionFromPath=as;ot.isEmptyPath=ci});var Ce=g(lt=>{"use strict";var $a=s=>s.replace(/^(?!$)(?: $)?/gm,"#");function cs(s,e){return/^\n+$/.test(s)?s.substring(1):e?s.replace(/^(?! *$)/gm,e):s}var Ba=(s,e,t)=>s.endsWith(`
`)?cs(t,e):t.includes(`
`)?`
`+cs(t,e):(s.endsWith(" ")?"":" ")+t;lt.indentComment=cs;lt.lineComment=Ba;lt.stringifyComment=$a});var fi=g(Ee=>{"use strict";var Ra="flow",us="block",ct="quoted";function Ka(s,e,t="flow",{indentAtStart:n,lineWidth:i=80,minContentWidth:r=20,onFold:o,onOverflow:a}={}){if(!i||i<0)return s;i<r&&(r=0);let l=Math.max(1+r,1+i-e.length);if(s.length<=l)return s;let c=[],p={},u=i-e.length;typeof n=="number"&&(n>i-Math.max(2,r)?c.push(0):u=i-n);let f,m,y=!1,d=-1,h=-1,w=-1;t===us&&(d=ui(s,d,e.length),d!==-1&&(u=d+l));for(let S;S=s[d+=1];){if(t===ct&&S==="\\"){switch(h=d,s[d+1]){case"x":d+=3;break;case"u":d+=5;break;case"U":d+=9;break;default:d+=1}w=d}if(S===`
`)t===us&&(d=ui(s,d,e.length)),u=d+e.length+l,f=void 0;else{if(S===" "&&m&&m!==" "&&m!==`
`&&m!=="	"){let k=s[d+1];k&&k!==" "&&k!==`
`&&k!=="	"&&(f=d)}if(d>=u)if(f)c.push(f),u=f+l,f=void 0;else if(t===ct){for(;m===" "||m==="	";)m=S,S=s[d+=1],y=!0;let k=d>w+1?d-2:h-1;if(p[k])return s;c.push(k),p[k]=!0,u=k+l,f=void 0}else y=!0}m=S}if(y&&a&&a(),c.length===0)return s;o&&o();let v=s.slice(0,c[0]);for(let S=0;S<c.length;++S){let k=c[S],A=c[S+1]||s.length;k===0?v=`
${e}${s.slice(0,A)}`:(t===ct&&p[k]&&(v+=`${s[k]}\\`),v+=`
${e}${s.slice(k+1,A)}`)}return v}function ui(s,e,t){let n=e,i=e+1,r=s[i];for(;r===" "||r==="	";)if(e<i+t)r=s[++e];else{do r=s[++e];while(r&&r!==`
`);n=e,i=e+1,r=s[i]}return n}Ee.FOLD_BLOCK=us;Ee.FOLD_FLOW=Ra;Ee.FOLD_QUOTED=ct;Ee.foldFlowLines=Ka});var qe=g(di=>{"use strict";var D=O(),V=fi(),ft=(s,e)=>({indentAtStart:e?s.indent.length:s.indentAtStart,lineWidth:s.options.lineWidth,minContentWidth:s.options.minContentWidth}),dt=s=>/^(%|---|\.\.\.)/m.test(s);function Fa(s,e,t){if(!e||e<0)return!1;let n=e-t,i=s.length;if(i<=n)return!1;for(let r=0,o=0;r<i;++r)if(s[r]===`
`){if(r-o>n)return!0;if(o=r+1,i-o<=n)return!1}return!0}function Oe(s,e){let t=JSON.stringify(s);if(e.options.doubleQuotedAsJSON)return t;let{implicitKey:n}=e,i=e.options.doubleQuotedMinMultiLineLength,r=e.indent||(dt(s)?"  ":""),o="",a=0;for(let l=0,c=t[l];c;c=t[++l])if(c===" "&&t[l+1]==="\\"&&t[l+2]==="n"&&(o+=t.slice(a,l)+"\\ ",l+=1,a=l,c="\\"),c==="\\")switch(t[l+1]){case"u":{o+=t.slice(a,l);let p=t.substr(l+2,4);switch(p){case"0000":o+="\\0";break;case"0007":o+="\\a";break;case"000b":o+="\\v";break;case"001b":o+="\\e";break;case"0085":o+="\\N";break;case"00a0":o+="\\_";break;case"2028":o+="\\L";break;case"2029":o+="\\P";break;default:p.substr(0,2)==="00"?o+="\\x"+p.substr(2):o+=t.substr(l,6)}l+=5,a=l+1}break;case"n":if(n||t[l+2]==='"'||t.length<i)l+=1;else{for(o+=t.slice(a,l)+`

`;t[l+2]==="\\"&&t[l+3]==="n"&&t[l+4]!=='"';)o+=`
`,l+=2;o+=r,t[l+2]===" "&&(o+="\\"),l+=1,a=l+1}break;default:l+=1}return o=a?o+t.slice(a):t,n?o:V.foldFlowLines(o,r,V.FOLD_QUOTED,ft(e,!1))}function fs(s,e){if(e.options.singleQuote===!1||e.implicitKey&&s.includes(`
`)||/[ \t]\n|\n[ \t]/.test(s))return Oe(s,e);let t=e.indent||(dt(s)?"  ":""),n="'"+s.replace(/'/g,"''").replace(/\n+/g,`$&
${t}`)+"'";return e.implicitKey?n:V.foldFlowLines(n,t,V.FOLD_FLOW,ft(e,!1))}function fe(s,e){let{singleQuote:t}=e.options,n;if(t===!1)n=Oe;else{let i=s.includes('"'),r=s.includes("'");i&&!r?n=fs:r&&!i?n=Oe:n=t?fs:Oe}return n(s,e)}var ds;try{ds=new RegExp(`(^|(?<!
))
+(?!
|$)`,"g")}catch{ds=/\n+(?!\n|$)/g}function ut({comment:s,type:e,value:t},n,i,r){let{blockQuote:o,commentString:a,lineWidth:l}=n.options;if(!o||/\n[\t ]+$/.test(t))return fe(t,n);let c=n.indent||(n.forceBlockIndent||dt(t)?"  ":""),p=o==="literal"?!0:o==="folded"||e===D.Scalar.BLOCK_FOLDED?!1:e===D.Scalar.BLOCK_LITERAL?!0:!Fa(t,l,c.length);if(!t)return p?`|
`:`>
`;let u,f;for(f=t.length;f>0;--f){let A=t[f-1];if(A!==`
`&&A!=="	"&&A!==" ")break}let m=t.substring(f),y=m.indexOf(`
`);y===-1?u="-":t===m||y!==m.length-1?(u="+",r&&r()):u="",m&&(t=t.slice(0,-m.length),m[m.length-1]===`
`&&(m=m.slice(0,-1)),m=m.replace(ds,`$&${c}`));let d=!1,h,w=-1;for(h=0;h<t.length;++h){let A=t[h];if(A===" ")d=!0;else if(A===`
`)w=h;else break}let v=t.substring(0,w<h?w+1:h);v&&(t=t.substring(v.length),v=v.replace(/\n+/g,`$&${c}`));let k=(d?c?"2":"1":"")+u;if(s&&(k+=" "+a(s.replace(/ ?[\r\n]+/g," ")),i&&i()),!p){let A=t.replace(/\n+/g,`
$&`).replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g,"$1$2").replace(/\n+/g,`$&${c}`),N=!1,E=ft(n,!0);o!=="folded"&&e!==D.Scalar.BLOCK_FOLDED&&(E.onOverflow=()=>{N=!0});let b=V.foldFlowLines(`${v}${A}${m}`,c,V.FOLD_BLOCK,E);if(!N)return`>${k}
${c}${b}`}return t=t.replace(/\n+/g,`$&${c}`),`|${k}
${c}${v}${t}${m}`}function ja(s,e,t,n){let{type:i,value:r}=s,{actualString:o,implicitKey:a,indent:l,indentStep:c,inFlow:p}=e;if(a&&r.includes(`
`)||p&&/[[\]{},]/.test(r))return fe(r,e);if(/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(r))return a||p||!r.includes(`
`)?fe(r,e):ut(s,e,t,n);if(!a&&!p&&i!==D.Scalar.PLAIN&&r.includes(`
`))return ut(s,e,t,n);if(dt(r)){if(l==="")return e.forceBlockIndent=!0,ut(s,e,t,n);if(a&&l===c)return fe(r,e)}let u=r.replace(/\n+/g,`$&
${l}`);if(o){let f=d=>d.default&&d.tag!=="tag:yaml.org,2002:str"&&d.test?.test(u),{compat:m,tags:y}=e.doc.schema;if(y.some(f)||m?.some(f))return fe(r,e)}return a?u:V.foldFlowLines(u,l,V.FOLD_FLOW,ft(e,!1))}function Ua(s,e,t,n){let{implicitKey:i,inFlow:r}=e,o=typeof s.value=="string"?s:Object.assign({},s,{value:String(s.value)}),{type:a}=s;a!==D.Scalar.QUOTE_DOUBLE&&/[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(o.value)&&(a=D.Scalar.QUOTE_DOUBLE);let l=p=>{switch(p){case D.Scalar.BLOCK_FOLDED:case D.Scalar.BLOCK_LITERAL:return i||r?fe(o.value,e):ut(o,e,t,n);case D.Scalar.QUOTE_DOUBLE:return Oe(o.value,e);case D.Scalar.QUOTE_SINGLE:return fs(o.value,e);case D.Scalar.PLAIN:return ja(o,e,t,n);default:return null}},c=l(a);if(c===null){let{defaultKeyType:p,defaultStringType:u}=e.options,f=i&&p||u;if(c=l(f),c===null)throw new Error(`Unsupported default string type ${f}`)}return c}di.stringifyString=Ua});var Te=g(ps=>{"use strict";var Ya=nt(),H=L(),Ga=Ce(),Ja=qe();function Va(s,e){let t=Object.assign({blockQuote:!0,commentString:Ga.stringifyComment,defaultKeyType:null,defaultStringType:"PLAIN",directives:null,doubleQuotedAsJSON:!1,doubleQuotedMinMultiLineLength:40,falseStr:"false",flowCollectionPadding:!0,indentSeq:!0,lineWidth:80,minContentWidth:20,nullStr:"null",simpleKeys:!1,singleQuote:null,trueStr:"true",verifyAliasOrder:!0},s.schema.toStringOptions,e),n;switch(t.collectionStyle){case"block":n=!1;break;case"flow":n=!0;break;default:n=null}return{anchors:new Set,doc:s,flowCollectionPadding:t.flowCollectionPadding?" ":"",indent:"",indentStep:typeof t.indent=="number"?" ".repeat(t.indent):"  ",inFlow:n,options:t}}function Ha(s,e){if(e.tag){let i=s.filter(r=>r.tag===e.tag);if(i.length>0)return i.find(r=>r.format===e.format)??i[0]}let t,n;if(H.isScalar(e)){n=e.value;let i=s.filter(r=>r.identify?.(n));if(i.length>1){let r=i.filter(o=>o.test);r.length>0&&(i=r)}t=i.find(r=>r.format===e.format)??i.find(r=>!r.format)}else n=e,t=s.find(i=>i.nodeClass&&n instanceof i.nodeClass);if(!t){let i=n?.constructor?.name??(n===null?"null":typeof n);throw new Error(`Tag not resolved for ${i} value`)}return t}function Wa(s,e,{anchors:t,doc:n}){if(!n.directives)return"";let i=[],r=(H.isScalar(s)||H.isCollection(s))&&s.anchor;r&&Ya.anchorIsValid(r)&&(t.add(r),i.push(`&${r}`));let o=s.tag??(e.default?null:e.tag);return o&&i.push(n.directives.tagString(o)),i.join(" ")}function za(s,e,t,n){if(H.isPair(s))return s.toString(e,t,n);if(H.isAlias(s)){if(e.doc.directives)return s.toString(e);if(e.resolvedAliases?.has(s))throw new TypeError("Cannot stringify circular structure without alias nodes");e.resolvedAliases?e.resolvedAliases.add(s):e.resolvedAliases=new Set([s]),s=s.resolve(e.doc)}let i,r=H.isNode(s)?s:e.doc.createNode(s,{onTagObj:l=>i=l});i??(i=Ha(e.doc.schema.tags,r));let o=Wa(r,i,e);o.length>0&&(e.indentAtStart=(e.indentAtStart??0)+o.length+1);let a=typeof i.stringify=="function"?i.stringify(r,e,t,n):H.isScalar(r)?Ja.stringifyString(r,e,t,n):r.toString(e,t,n);return o?H.isScalar(r)||a[0]==="{"||a[0]==="["?`${o} ${a}`:`${o}
${e.indent}${a}`:a}ps.createStringifyContext=Va;ps.stringify=za});var gi=g(mi=>{"use strict";var U=L(),pi=O(),hi=Te(),_e=Ce();function Xa({key:s,value:e},t,n,i){let{allNullValues:r,doc:o,indent:a,indentStep:l,options:{commentString:c,indentSeq:p,simpleKeys:u}}=t,f=U.isNode(s)&&s.comment||null;if(u){if(f)throw new Error("With simple keys, key nodes cannot have comments");if(U.isCollection(s)||!U.isNode(s)&&typeof s=="object"){let E="With simple keys, collection cannot be used as a key value";throw new Error(E)}}let m=!u&&(!s||f&&e==null&&!t.inFlow||U.isCollection(s)||(U.isScalar(s)?s.type===pi.Scalar.BLOCK_FOLDED||s.type===pi.Scalar.BLOCK_LITERAL:typeof s=="object"));t=Object.assign({},t,{allNullValues:!1,implicitKey:!m&&(u||!r),indent:a+l});let y=!1,d=!1,h=hi.stringify(s,t,()=>y=!0,()=>d=!0);if(!m&&!t.inFlow&&h.length>1024){if(u)throw new Error("With simple keys, single line scalar must not span more than 1024 characters");m=!0}if(t.inFlow){if(r||e==null)return y&&n&&n(),h===""?"?":m?`? ${h}`:h}else if(r&&!u||e==null&&m)return h=`? ${h}`,f&&!y?h+=_e.lineComment(h,t.indent,c(f)):d&&i&&i(),h;y&&(f=null),m?(f&&(h+=_e.lineComment(h,t.indent,c(f))),h=`? ${h}
${a}:`):(h=`${h}:`,f&&(h+=_e.lineComment(h,t.indent,c(f))));let w,v,S;U.isNode(e)?(w=!!e.spaceBefore,v=e.commentBefore,S=e.comment):(w=!1,v=null,S=null,e&&typeof e=="object"&&(e=o.createNode(e))),t.implicitKey=!1,!m&&!f&&U.isScalar(e)&&(t.indentAtStart=h.length+1),d=!1,!p&&l.length>=2&&!t.inFlow&&!m&&U.isSeq(e)&&!e.flow&&!e.tag&&!e.anchor&&(t.indent=t.indent.substring(2));let k=!1,A=hi.stringify(e,t,()=>k=!0,()=>d=!0),N=" ";if(f||w||v){if(N=w?`
`:"",v){let E=c(v);N+=`
${_e.indentComment(E,t.indent)}`}A===""&&!t.inFlow?N===`
`&&(N=`

`):N+=`
${t.indent}`}else if(!m&&U.isCollection(e)){let E=A[0],b=A.indexOf(`
`),q=b!==-1,Y=t.inFlow??e.flow??e.items.length===0;if(q||!Y){let ae=!1;if(q&&(E==="&"||E==="!")){let T=A.indexOf(" ");E==="&"&&T!==-1&&T<b&&A[T+1]==="!"&&(T=A.indexOf(" ",T+1)),(T===-1||b<T)&&(ae=!0)}ae||(N=`
${t.indent}`)}}else(A===""||A[0]===`
`)&&(N="");return h+=N+A,t.inFlow?k&&n&&n():S&&!k?h+=_e.lineComment(h,t.indent,c(S)):d&&i&&i(),h}mi.stringifyPair=Xa});var ms=g(hs=>{"use strict";var yi=Xe("process");function Qa(s,...e){s==="debug"&&console.log(...e)}function Za(s,e){(s==="debug"||s==="warn")&&(typeof yi.emitWarning=="function"?yi.emitWarning(e):console.warn(e))}hs.debug=Qa;hs.warn=Za});var gt=g(mt=>{"use strict";var xe=L(),bi=O(),pt="<<",ht={identify:s=>s===pt||typeof s=="symbol"&&s.description===pt,default:"key",tag:"tag:yaml.org,2002:merge",test:/^<<$/,resolve:()=>Object.assign(new bi.Scalar(Symbol(pt)),{addToJSMap:wi}),stringify:()=>pt},el=(s,e)=>(ht.identify(e)||xe.isScalar(e)&&(!e.type||e.type===bi.Scalar.PLAIN)&&ht.identify(e.value))&&s?.doc.schema.tags.some(t=>t.tag===ht.tag&&t.default);function wi(s,e,t){if(t=s&&xe.isAlias(t)?t.resolve(s.doc):t,xe.isSeq(t))for(let n of t.items)gs(s,e,n);else if(Array.isArray(t))for(let n of t)gs(s,e,n);else gs(s,e,t)}function gs(s,e,t){let n=s&&xe.isAlias(t)?t.resolve(s.doc):t;if(!xe.isMap(n))throw new Error("Merge sources must be maps or map aliases");let i=n.toJSON(null,s,Map);for(let[r,o]of i)e instanceof Map?e.has(r)||e.set(r,o):e instanceof Set?e.add(r):Object.prototype.hasOwnProperty.call(e,r)||Object.defineProperty(e,r,{value:o,writable:!0,enumerable:!0,configurable:!0});return e}mt.addMergeToJSMap=wi;mt.isMergeKey=el;mt.merge=ht});var bs=g(ki=>{"use strict";var tl=ms(),vi=gt(),sl=Te(),Si=L(),ys=G();function nl(s,e,{key:t,value:n}){if(Si.isNode(t)&&t.addToJSMap)t.addToJSMap(s,e,n);else if(vi.isMergeKey(s,t))vi.addMergeToJSMap(s,e,n);else{let i=ys.toJS(t,"",s);if(e instanceof Map)e.set(i,ys.toJS(n,i,s));else if(e instanceof Set)e.add(i);else{let r=il(t,i,s),o=ys.toJS(n,r,s);r in e?Object.defineProperty(e,r,{value:o,writable:!0,enumerable:!0,configurable:!0}):e[r]=o}}return e}function il(s,e,t){if(e===null)return"";if(typeof e!="object")return String(e);if(Si.isNode(s)&&t?.doc){let n=sl.createStringifyContext(t.doc,{});n.anchors=new Set;for(let r of t.anchors.keys())n.anchors.add(r.anchor);n.inFlow=!0,n.inStringifyKey=!0;let i=s.toString(n);if(!t.mapKeyWarned){let r=JSON.stringify(i);r.length>40&&(r=r.substring(0,36)+'..."'),tl.warn(t.doc.options.logLevel,`Keys with collection values will be stringified due to JS Object restrictions: ${r}. Set mapAsMap: true to use object keys.`),t.mapKeyWarned=!0}return i}return JSON.stringify(e)}ki.addPairToJSMap=nl});var W=g(ws=>{"use strict";var Ai=Le(),rl=gi(),ol=bs(),yt=L();function al(s,e,t){let n=Ai.createNode(s,void 0,t),i=Ai.createNode(e,void 0,t);return new bt(n,i)}var bt=class s{constructor(e,t=null){Object.defineProperty(this,yt.NODE_TYPE,{value:yt.PAIR}),this.key=e,this.value=t}clone(e){let{key:t,value:n}=this;return yt.isNode(t)&&(t=t.clone(e)),yt.isNode(n)&&(n=n.clone(e)),new s(t,n)}toJSON(e,t){let n=t?.mapAsMap?new Map:{};return ol.addPairToJSMap(t,n,this)}toString(e,t,n){return e?.doc?rl.stringifyPair(this,e,t,n):JSON.stringify(this)}};ws.Pair=bt;ws.createPair=al});var vs=g(Li=>{"use strict";var se=L(),Ni=Te(),wt=Ce();function ll(s,e,t){return(e.inFlow??s.flow?ul:cl)(s,e,t)}function cl({comment:s,items:e},t,{blockItemPrefix:n,flowChars:i,itemIndent:r,onChompKeep:o,onComment:a}){let{indent:l,options:{commentString:c}}=t,p=Object.assign({},t,{indent:r,type:null}),u=!1,f=[];for(let y=0;y<e.length;++y){let d=e[y],h=null;if(se.isNode(d))!u&&d.spaceBefore&&f.push(""),vt(t,f,d.commentBefore,u),d.comment&&(h=d.comment);else if(se.isPair(d)){let v=se.isNode(d.key)?d.key:null;v&&(!u&&v.spaceBefore&&f.push(""),vt(t,f,v.commentBefore,u))}u=!1;let w=Ni.stringify(d,p,()=>h=null,()=>u=!0);h&&(w+=wt.lineComment(w,r,c(h))),u&&h&&(u=!1),f.push(n+w)}let m;if(f.length===0)m=i.start+i.end;else{m=f[0];for(let y=1;y<f.length;++y){let d=f[y];m+=d?`
${l}${d}`:`
`}}return s?(m+=`
`+wt.indentComment(c(s),l),a&&a()):u&&o&&o(),m}function ul({items:s},e,{flowChars:t,itemIndent:n}){let{indent:i,indentStep:r,flowCollectionPadding:o,options:{commentString:a}}=e;n+=r;let l=Object.assign({},e,{indent:n,inFlow:!0,type:null}),c=!1,p=0,u=[];for(let y=0;y<s.length;++y){let d=s[y],h=null;if(se.isNode(d))d.spaceBefore&&u.push(""),vt(e,u,d.commentBefore,!1),d.comment&&(h=d.comment);else if(se.isPair(d)){let v=se.isNode(d.key)?d.key:null;v&&(v.spaceBefore&&u.push(""),vt(e,u,v.commentBefore,!1),v.comment&&(c=!0));let S=se.isNode(d.value)?d.value:null;S?(S.comment&&(h=S.comment),S.commentBefore&&(c=!0)):d.value==null&&v?.comment&&(h=v.comment)}h&&(c=!0);let w=Ni.stringify(d,l,()=>h=null);y<s.length-1&&(w+=","),h&&(w+=wt.lineComment(w,n,a(h))),!c&&(u.length>p||w.includes(`
`))&&(c=!0),u.push(w),p=u.length}let{start:f,end:m}=t;if(u.length===0)return f+m;if(!c){let y=u.reduce((d,h)=>d+h.length+2,2);c=e.options.lineWidth>0&&y>e.options.lineWidth}if(c){let y=f;for(let d of u)y+=d?`
${r}${i}${d}`:`
`;return`${y}
${i}${m}`}else return`${f}${o}${u.join(" ")}${o}${m}`}function vt({indent:s,options:{commentString:e}},t,n,i){if(n&&i&&(n=n.replace(/^\n+/,"")),n){let r=wt.indentComment(e(n),s);t.push(r.trimStart())}}Li.stringifyCollection=ll});var X=g(ks=>{"use strict";var fl=vs(),dl=bs(),pl=at(),z=L(),St=W(),hl=O();function Ie(s,e){let t=z.isScalar(e)?e.value:e;for(let n of s)if(z.isPair(n)&&(n.key===e||n.key===t||z.isScalar(n.key)&&n.key.value===t))return n}var Ss=class extends pl.Collection{static get tagName(){return"tag:yaml.org,2002:map"}constructor(e){super(z.MAP,e),this.items=[]}static from(e,t,n){let{keepUndefined:i,replacer:r}=n,o=new this(e),a=(l,c)=>{if(typeof r=="function")c=r.call(t,l,c);else if(Array.isArray(r)&&!r.includes(l))return;(c!==void 0||i)&&o.items.push(St.createPair(l,c,n))};if(t instanceof Map)for(let[l,c]of t)a(l,c);else if(t&&typeof t=="object")for(let l of Object.keys(t))a(l,t[l]);return typeof e.sortMapEntries=="function"&&o.items.sort(e.sortMapEntries),o}add(e,t){let n;z.isPair(e)?n=e:!e||typeof e!="object"||!("key"in e)?n=new St.Pair(e,e?.value):n=new St.Pair(e.key,e.value);let i=Ie(this.items,n.key),r=this.schema?.sortMapEntries;if(i){if(!t)throw new Error(`Key ${n.key} already set`);z.isScalar(i.value)&&hl.isScalarValue(n.value)?i.value.value=n.value:i.value=n.value}else if(r){let o=this.items.findIndex(a=>r(n,a)<0);o===-1?this.items.push(n):this.items.splice(o,0,n)}else this.items.push(n)}delete(e){let t=Ie(this.items,e);return t?this.items.splice(this.items.indexOf(t),1).length>0:!1}get(e,t){let i=Ie(this.items,e)?.value;return(!t&&z.isScalar(i)?i.value:i)??void 0}has(e){return!!Ie(this.items,e)}set(e,t){this.add(new St.Pair(e,t),!0)}toJSON(e,t,n){let i=n?new n:t?.mapAsMap?new Map:{};t?.onCreate&&t.onCreate(i);for(let r of this.items)dl.addPairToJSMap(t,i,r);return i}toString(e,t,n){if(!e)return JSON.stringify(this);for(let i of this.items)if(!z.isPair(i))throw new Error(`Map items must all be pairs; found ${JSON.stringify(i)} instead`);return!e.allNullValues&&this.hasAllNullValues(!1)&&(e=Object.assign({},e,{allNullValues:!0})),fl.stringifyCollection(this,e,{blockItemPrefix:"",flowChars:{start:"{",end:"}"},itemIndent:e.indent||"",onChompKeep:n,onComment:t})}};ks.YAMLMap=Ss;ks.findPair=Ie});var de=g(Ei=>{"use strict";var ml=L(),Ci=X(),gl={collection:"map",default:!0,nodeClass:Ci.YAMLMap,tag:"tag:yaml.org,2002:map",resolve(s,e){return ml.isMap(s)||e("Expected a mapping for this tag"),s},createNode:(s,e,t)=>Ci.YAMLMap.from(s,e,t)};Ei.map=gl});var Q=g(Oi=>{"use strict";var yl=Le(),bl=vs(),wl=at(),At=L(),vl=O(),Sl=G(),As=class extends wl.Collection{static get tagName(){return"tag:yaml.org,2002:seq"}constructor(e){super(At.SEQ,e),this.items=[]}add(e){this.items.push(e)}delete(e){let t=kt(e);return typeof t!="number"?!1:this.items.splice(t,1).length>0}get(e,t){let n=kt(e);if(typeof n!="number")return;let i=this.items[n];return!t&&At.isScalar(i)?i.value:i}has(e){let t=kt(e);return typeof t=="number"&&t<this.items.length}set(e,t){let n=kt(e);if(typeof n!="number")throw new Error(`Expected a valid index, not ${e}.`);let i=this.items[n];At.isScalar(i)&&vl.isScalarValue(t)?i.value=t:this.items[n]=t}toJSON(e,t){let n=[];t?.onCreate&&t.onCreate(n);let i=0;for(let r of this.items)n.push(Sl.toJS(r,String(i++),t));return n}toString(e,t,n){return e?bl.stringifyCollection(this,e,{blockItemPrefix:"- ",flowChars:{start:"[",end:"]"},itemIndent:(e.indent||"")+"  ",onChompKeep:n,onComment:t}):JSON.stringify(this)}static from(e,t,n){let{replacer:i}=n,r=new this(e);if(t&&Symbol.iterator in Object(t)){let o=0;for(let a of t){if(typeof i=="function"){let l=t instanceof Set?a:String(o++);a=i.call(t,l,a)}r.items.push(yl.createNode(a,void 0,n))}}return r}};function kt(s){let e=At.isScalar(s)?s.value:s;return e&&typeof e=="string"&&(e=Number(e)),typeof e=="number"&&Number.isInteger(e)&&e>=0?e:null}Oi.YAMLSeq=As});var pe=g(Ti=>{"use strict";var kl=L(),qi=Q(),Al={collection:"seq",default:!0,nodeClass:qi.YAMLSeq,tag:"tag:yaml.org,2002:seq",resolve(s,e){return kl.isSeq(s)||e("Expected a sequence for this tag"),s},createNode:(s,e,t)=>qi.YAMLSeq.from(s,e,t)};Ti.seq=Al});var Me=g(_i=>{"use strict";var Nl=qe(),Ll={identify:s=>typeof s=="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:s=>s,stringify(s,e,t,n){return e=Object.assign({actualString:!0},e),Nl.stringifyString(s,e,t,n)}};_i.string=Ll});var Nt=g(Mi=>{"use strict";var xi=O(),Ii={identify:s=>s==null,createNode:()=>new xi.Scalar(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^(?:~|[Nn]ull|NULL)?$/,resolve:()=>new xi.Scalar(null),stringify:({source:s},e)=>typeof s=="string"&&Ii.test.test(s)?s:e.options.nullStr};Mi.nullTag=Ii});var Ns=g(Di=>{"use strict";var Cl=O(),Pi={identify:s=>typeof s=="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,resolve:s=>new Cl.Scalar(s[0]==="t"||s[0]==="T"),stringify({source:s,value:e},t){if(s&&Pi.test.test(s)){let n=s[0]==="t"||s[0]==="T";if(e===n)return s}return e?t.options.trueStr:t.options.falseStr}};Di.boolTag=Pi});var he=g($i=>{"use strict";function El({format:s,minFractionDigits:e,tag:t,value:n}){if(typeof n=="bigint")return String(n);let i=typeof n=="number"?n:Number(n);if(!isFinite(i))return isNaN(i)?".nan":i<0?"-.inf":".inf";let r=JSON.stringify(n);if(!s&&e&&(!t||t==="tag:yaml.org,2002:float")&&/^\d/.test(r)){let o=r.indexOf(".");o<0&&(o=r.length,r+=".");let a=e-(r.length-o-1);for(;a-- >0;)r+="0"}return r}$i.stringifyNumber=El});var Cs=g(Lt=>{"use strict";var Ol=O(),Ls=he(),ql={identify:s=>typeof s=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:s=>s.slice(-3).toLowerCase()==="nan"?NaN:s[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:Ls.stringifyNumber},Tl={identify:s=>typeof s=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,resolve:s=>parseFloat(s),stringify(s){let e=Number(s.value);return isFinite(e)?e.toExponential():Ls.stringifyNumber(s)}},_l={identify:s=>typeof s=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,resolve(s){let e=new Ol.Scalar(parseFloat(s)),t=s.indexOf(".");return t!==-1&&s[s.length-1]==="0"&&(e.minFractionDigits=s.length-t-1),e},stringify:Ls.stringifyNumber};Lt.float=_l;Lt.floatExp=Tl;Lt.floatNaN=ql});var Os=g(Et=>{"use strict";var Bi=he(),Ct=s=>typeof s=="bigint"||Number.isInteger(s),Es=(s,e,t,{intAsBigInt:n})=>n?BigInt(s):parseInt(s.substring(e),t);function Ri(s,e,t){let{value:n}=s;return Ct(n)&&n>=0?t+n.toString(e):Bi.stringifyNumber(s)}var xl={identify:s=>Ct(s)&&s>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^0o[0-7]+$/,resolve:(s,e,t)=>Es(s,2,8,t),stringify:s=>Ri(s,8,"0o")},Il={identify:Ct,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9]+$/,resolve:(s,e,t)=>Es(s,0,10,t),stringify:Bi.stringifyNumber},Ml={identify:s=>Ct(s)&&s>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^0x[0-9a-fA-F]+$/,resolve:(s,e,t)=>Es(s,2,16,t),stringify:s=>Ri(s,16,"0x")};Et.int=Il;Et.intHex=Ml;Et.intOct=xl});var Fi=g(Ki=>{"use strict";var Pl=de(),Dl=Nt(),$l=pe(),Bl=Me(),Rl=Ns(),qs=Cs(),Ts=Os(),Kl=[Pl.map,$l.seq,Bl.string,Dl.nullTag,Rl.boolTag,Ts.intOct,Ts.int,Ts.intHex,qs.floatNaN,qs.floatExp,qs.float];Ki.schema=Kl});var Yi=g(Ui=>{"use strict";var Fl=O(),jl=de(),Ul=pe();function ji(s){return typeof s=="bigint"||Number.isInteger(s)}var Ot=({value:s})=>JSON.stringify(s),Yl=[{identify:s=>typeof s=="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:s=>s,stringify:Ot},{identify:s=>s==null,createNode:()=>new Fl.Scalar(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^null$/,resolve:()=>null,stringify:Ot},{identify:s=>typeof s=="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^true$|^false$/,resolve:s=>s==="true",stringify:Ot},{identify:ji,default:!0,tag:"tag:yaml.org,2002:int",test:/^-?(?:0|[1-9][0-9]*)$/,resolve:(s,e,{intAsBigInt:t})=>t?BigInt(s):parseInt(s,10),stringify:({value:s})=>ji(s)?s.toString():JSON.stringify(s)},{identify:s=>typeof s=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,resolve:s=>parseFloat(s),stringify:Ot}],Gl={default:!0,tag:"",test:/^/,resolve(s,e){return e(`Unresolved plain scalar ${JSON.stringify(s)}`),s}},Jl=[jl.map,Ul.seq].concat(Yl,Gl);Ui.schema=Jl});var xs=g(Gi=>{"use strict";var Pe=Xe("buffer"),_s=O(),Vl=qe(),Hl={identify:s=>s instanceof Uint8Array,default:!1,tag:"tag:yaml.org,2002:binary",resolve(s,e){if(typeof Pe.Buffer=="function")return Pe.Buffer.from(s,"base64");if(typeof atob=="function"){let t=atob(s.replace(/[\n\r]/g,"")),n=new Uint8Array(t.length);for(let i=0;i<t.length;++i)n[i]=t.charCodeAt(i);return n}else return e("This environment does not support reading binary tags; either Buffer or atob is required"),s},stringify({comment:s,type:e,value:t},n,i,r){if(!t)return"";let o=t,a;if(typeof Pe.Buffer=="function")a=o instanceof Pe.Buffer?o.toString("base64"):Pe.Buffer.from(o.buffer).toString("base64");else if(typeof btoa=="function"){let l="";for(let c=0;c<o.length;++c)l+=String.fromCharCode(o[c]);a=btoa(l)}else throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");if(e??(e=_s.Scalar.BLOCK_LITERAL),e!==_s.Scalar.QUOTE_DOUBLE){let l=Math.max(n.options.lineWidth-n.indent.length,n.options.minContentWidth),c=Math.ceil(a.length/l),p=new Array(c);for(let u=0,f=0;u<c;++u,f+=l)p[u]=a.substr(f,l);a=p.join(e===_s.Scalar.BLOCK_LITERAL?`
`:" ")}return Vl.stringifyString({comment:s,type:e,value:a},n,i,r)}};Gi.binary=Hl});var _t=g(Tt=>{"use strict";var qt=L(),Is=W(),Wl=O(),zl=Q();function Ji(s,e){if(qt.isSeq(s))for(let t=0;t<s.items.length;++t){let n=s.items[t];if(!qt.isPair(n)){if(qt.isMap(n)){n.items.length>1&&e("Each pair must have its own sequence indicator");let i=n.items[0]||new Is.Pair(new Wl.Scalar(null));if(n.commentBefore&&(i.key.commentBefore=i.key.commentBefore?`${n.commentBefore}
${i.key.commentBefore}`:n.commentBefore),n.comment){let r=i.value??i.key;r.comment=r.comment?`${n.comment}
${r.comment}`:n.comment}n=i}s.items[t]=qt.isPair(n)?n:new Is.Pair(n)}}else e("Expected a sequence for this tag");return s}function Vi(s,e,t){let{replacer:n}=t,i=new zl.YAMLSeq(s);i.tag="tag:yaml.org,2002:pairs";let r=0;if(e&&Symbol.iterator in Object(e))for(let o of e){typeof n=="function"&&(o=n.call(e,String(r++),o));let a,l;if(Array.isArray(o))if(o.length===2)a=o[0],l=o[1];else throw new TypeError(`Expected [key, value] tuple: ${o}`);else if(o&&o instanceof Object){let c=Object.keys(o);if(c.length===1)a=c[0],l=o[a];else throw new TypeError(`Expected tuple with one key, not ${c.length} keys`)}else a=o;i.items.push(Is.createPair(a,l,t))}return i}var Xl={collection:"seq",default:!1,tag:"tag:yaml.org,2002:pairs",resolve:Ji,createNode:Vi};Tt.createPairs=Vi;Tt.pairs=Xl;Tt.resolvePairs=Ji});var Ds=g(Ps=>{"use strict";var Hi=L(),Ms=G(),De=X(),Ql=Q(),Wi=_t(),ne=class s extends Ql.YAMLSeq{constructor(){super(),this.add=De.YAMLMap.prototype.add.bind(this),this.delete=De.YAMLMap.prototype.delete.bind(this),this.get=De.YAMLMap.prototype.get.bind(this),this.has=De.YAMLMap.prototype.has.bind(this),this.set=De.YAMLMap.prototype.set.bind(this),this.tag=s.tag}toJSON(e,t){if(!t)return super.toJSON(e);let n=new Map;t?.onCreate&&t.onCreate(n);for(let i of this.items){let r,o;if(Hi.isPair(i)?(r=Ms.toJS(i.key,"",t),o=Ms.toJS(i.value,r,t)):r=Ms.toJS(i,"",t),n.has(r))throw new Error("Ordered maps must not include duplicate keys");n.set(r,o)}return n}static from(e,t,n){let i=Wi.createPairs(e,t,n),r=new this;return r.items=i.items,r}};ne.tag="tag:yaml.org,2002:omap";var Zl={collection:"seq",identify:s=>s instanceof Map,nodeClass:ne,default:!1,tag:"tag:yaml.org,2002:omap",resolve(s,e){let t=Wi.resolvePairs(s,e),n=[];for(let{key:i}of t.items)Hi.isScalar(i)&&(n.includes(i.value)?e(`Ordered maps must not include duplicate keys: ${i.value}`):n.push(i.value));return Object.assign(new ne,t)},createNode:(s,e,t)=>ne.from(s,e,t)};Ps.YAMLOMap=ne;Ps.omap=Zl});var er=g($s=>{"use strict";var zi=O();function Xi({value:s,source:e},t){return e&&(s?Qi:Zi).test.test(e)?e:s?t.options.trueStr:t.options.falseStr}var Qi={identify:s=>s===!0,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,resolve:()=>new zi.Scalar(!0),stringify:Xi},Zi={identify:s=>s===!1,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,resolve:()=>new zi.Scalar(!1),stringify:Xi};$s.falseTag=Zi;$s.trueTag=Qi});var tr=g(xt=>{"use strict";var ec=O(),Bs=he(),tc={identify:s=>typeof s=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:s=>s.slice(-3).toLowerCase()==="nan"?NaN:s[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:Bs.stringifyNumber},sc={identify:s=>typeof s=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,resolve:s=>parseFloat(s.replace(/_/g,"")),stringify(s){let e=Number(s.value);return isFinite(e)?e.toExponential():Bs.stringifyNumber(s)}},nc={identify:s=>typeof s=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,resolve(s){let e=new ec.Scalar(parseFloat(s.replace(/_/g,""))),t=s.indexOf(".");if(t!==-1){let n=s.substring(t+1).replace(/_/g,"");n[n.length-1]==="0"&&(e.minFractionDigits=n.length)}return e},stringify:Bs.stringifyNumber};xt.float=nc;xt.floatExp=sc;xt.floatNaN=tc});var nr=g(Be=>{"use strict";var sr=he(),$e=s=>typeof s=="bigint"||Number.isInteger(s);function It(s,e,t,{intAsBigInt:n}){let i=s[0];if((i==="-"||i==="+")&&(e+=1),s=s.substring(e).replace(/_/g,""),n){switch(t){case 2:s=`0b${s}`;break;case 8:s=`0o${s}`;break;case 16:s=`0x${s}`;break}let o=BigInt(s);return i==="-"?BigInt(-1)*o:o}let r=parseInt(s,t);return i==="-"?-1*r:r}function Rs(s,e,t){let{value:n}=s;if($e(n)){let i=n.toString(e);return n<0?"-"+t+i.substr(1):t+i}return sr.stringifyNumber(s)}var ic={identify:$e,default:!0,tag:"tag:yaml.org,2002:int",format:"BIN",test:/^[-+]?0b[0-1_]+$/,resolve:(s,e,t)=>It(s,2,2,t),stringify:s=>Rs(s,2,"0b")},rc={identify:$e,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^[-+]?0[0-7_]+$/,resolve:(s,e,t)=>It(s,1,8,t),stringify:s=>Rs(s,8,"0")},oc={identify:$e,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9][0-9_]*$/,resolve:(s,e,t)=>It(s,0,10,t),stringify:sr.stringifyNumber},ac={identify:$e,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^[-+]?0x[0-9a-fA-F_]+$/,resolve:(s,e,t)=>It(s,2,16,t),stringify:s=>Rs(s,16,"0x")};Be.int=oc;Be.intBin=ic;Be.intHex=ac;Be.intOct=rc});var Fs=g(Ks=>{"use strict";var Dt=L(),Mt=W(),Pt=X(),ie=class s extends Pt.YAMLMap{constructor(e){super(e),this.tag=s.tag}add(e){let t;Dt.isPair(e)?t=e:e&&typeof e=="object"&&"key"in e&&"value"in e&&e.value===null?t=new Mt.Pair(e.key,null):t=new Mt.Pair(e,null),Pt.findPair(this.items,t.key)||this.items.push(t)}get(e,t){let n=Pt.findPair(this.items,e);return!t&&Dt.isPair(n)?Dt.isScalar(n.key)?n.key.value:n.key:n}set(e,t){if(typeof t!="boolean")throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof t}`);let n=Pt.findPair(this.items,e);n&&!t?this.items.splice(this.items.indexOf(n),1):!n&&t&&this.items.push(new Mt.Pair(e))}toJSON(e,t){return super.toJSON(e,t,Set)}toString(e,t,n){if(!e)return JSON.stringify(this);if(this.hasAllNullValues(!0))return super.toString(Object.assign({},e,{allNullValues:!0}),t,n);throw new Error("Set items must all have null values")}static from(e,t,n){let{replacer:i}=n,r=new this(e);if(t&&Symbol.iterator in Object(t))for(let o of t)typeof i=="function"&&(o=i.call(t,o,o)),r.items.push(Mt.createPair(o,null,n));return r}};ie.tag="tag:yaml.org,2002:set";var lc={collection:"map",identify:s=>s instanceof Set,nodeClass:ie,default:!1,tag:"tag:yaml.org,2002:set",createNode:(s,e,t)=>ie.from(s,e,t),resolve(s,e){if(Dt.isMap(s)){if(s.hasAllNullValues(!0))return Object.assign(new ie,s);e("Set items must all have null values")}else e("Expected a mapping for this tag");return s}};Ks.YAMLSet=ie;Ks.set=lc});var Us=g($t=>{"use strict";var cc=he();function js(s,e){let t=s[0],n=t==="-"||t==="+"?s.substring(1):s,i=o=>e?BigInt(o):Number(o),r=n.replace(/_/g,"").split(":").reduce((o,a)=>o*i(60)+i(a),i(0));return t==="-"?i(-1)*r:r}function ir(s){let{value:e}=s,t=o=>o;if(typeof e=="bigint")t=o=>BigInt(o);else if(isNaN(e)||!isFinite(e))return cc.stringifyNumber(s);let n="";e<0&&(n="-",e*=t(-1));let i=t(60),r=[e%i];return e<60?r.unshift(0):(e=(e-r[0])/i,r.unshift(e%i),e>=60&&(e=(e-r[0])/i,r.unshift(e))),n+r.map(o=>String(o).padStart(2,"0")).join(":").replace(/000000\d*$/,"")}var uc={identify:s=>typeof s=="bigint"||Number.isInteger(s),default:!0,tag:"tag:yaml.org,2002:int",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,resolve:(s,e,{intAsBigInt:t})=>js(s,t),stringify:ir},fc={identify:s=>typeof s=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,resolve:s=>js(s,!1),stringify:ir},rr={identify:s=>s instanceof Date,default:!0,tag:"tag:yaml.org,2002:timestamp",test:RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),resolve(s){let e=s.match(rr.test);if(!e)throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");let[,t,n,i,r,o,a]=e.map(Number),l=e[7]?Number((e[7]+"00").substr(1,3)):0,c=Date.UTC(t,n-1,i,r||0,o||0,a||0,l),p=e[8];if(p&&p!=="Z"){let u=js(p,!1);Math.abs(u)<30&&(u*=60),c-=6e4*u}return new Date(c)},stringify:({value:s})=>s?.toISOString().replace(/(T00:00:00)?\.000Z$/,"")??""};$t.floatTime=fc;$t.intTime=uc;$t.timestamp=rr});var lr=g(ar=>{"use strict";var dc=de(),pc=Nt(),hc=pe(),mc=Me(),gc=xs(),or=er(),Ys=tr(),Bt=nr(),yc=gt(),bc=Ds(),wc=_t(),vc=Fs(),Gs=Us(),Sc=[dc.map,hc.seq,mc.string,pc.nullTag,or.trueTag,or.falseTag,Bt.intBin,Bt.intOct,Bt.int,Bt.intHex,Ys.floatNaN,Ys.floatExp,Ys.float,gc.binary,yc.merge,bc.omap,wc.pairs,vc.set,Gs.intTime,Gs.floatTime,Gs.timestamp];ar.schema=Sc});var br=g(Hs=>{"use strict";var dr=de(),kc=Nt(),pr=pe(),Ac=Me(),Nc=Ns(),Js=Cs(),Vs=Os(),Lc=Fi(),Cc=Yi(),hr=xs(),Re=gt(),mr=Ds(),gr=_t(),cr=lr(),yr=Fs(),Rt=Us(),ur=new Map([["core",Lc.schema],["failsafe",[dr.map,pr.seq,Ac.string]],["json",Cc.schema],["yaml11",cr.schema],["yaml-1.1",cr.schema]]),fr={binary:hr.binary,bool:Nc.boolTag,float:Js.float,floatExp:Js.floatExp,floatNaN:Js.floatNaN,floatTime:Rt.floatTime,int:Vs.int,intHex:Vs.intHex,intOct:Vs.intOct,intTime:Rt.intTime,map:dr.map,merge:Re.merge,null:kc.nullTag,omap:mr.omap,pairs:gr.pairs,seq:pr.seq,set:yr.set,timestamp:Rt.timestamp},Ec={"tag:yaml.org,2002:binary":hr.binary,"tag:yaml.org,2002:merge":Re.merge,"tag:yaml.org,2002:omap":mr.omap,"tag:yaml.org,2002:pairs":gr.pairs,"tag:yaml.org,2002:set":yr.set,"tag:yaml.org,2002:timestamp":Rt.timestamp};function Oc(s,e,t){let n=ur.get(e);if(n&&!s)return t&&!n.includes(Re.merge)?n.concat(Re.merge):n.slice();let i=n;if(!i)if(Array.isArray(s))i=[];else{let r=Array.from(ur.keys()).filter(o=>o!=="yaml11").map(o=>JSON.stringify(o)).join(", ");throw new Error(`Unknown schema "${e}"; use one of ${r} or define customTags array`)}if(Array.isArray(s))for(let r of s)i=i.concat(r);else typeof s=="function"&&(i=s(i.slice()));return t&&(i=i.concat(Re.merge)),i.reduce((r,o)=>{let a=typeof o=="string"?fr[o]:o;if(!a){let l=JSON.stringify(o),c=Object.keys(fr).map(p=>JSON.stringify(p)).join(", ");throw new Error(`Unknown custom tag ${l}; use one of ${c}`)}return r.includes(a)||r.push(a),r},[])}Hs.coreKnownTags=Ec;Hs.getTags=Oc});var Xs=g(wr=>{"use strict";var Ws=L(),qc=de(),Tc=pe(),_c=Me(),Kt=br(),xc=(s,e)=>s.key<e.key?-1:s.key>e.key?1:0,zs=class s{constructor({compat:e,customTags:t,merge:n,resolveKnownTags:i,schema:r,sortMapEntries:o,toStringDefaults:a}){this.compat=Array.isArray(e)?Kt.getTags(e,"compat"):e?Kt.getTags(null,e):null,this.name=typeof r=="string"&&r||"core",this.knownTags=i?Kt.coreKnownTags:{},this.tags=Kt.getTags(t,this.name,n),this.toStringOptions=a??null,Object.defineProperty(this,Ws.MAP,{value:qc.map}),Object.defineProperty(this,Ws.SCALAR,{value:_c.string}),Object.defineProperty(this,Ws.SEQ,{value:Tc.seq}),this.sortMapEntries=typeof o=="function"?o:o===!0?xc:null}clone(){let e=Object.create(s.prototype,Object.getOwnPropertyDescriptors(this));return e.tags=this.tags.slice(),e}};wr.Schema=zs});var Sr=g(vr=>{"use strict";var Ic=L(),Qs=Te(),Ke=Ce();function Mc(s,e){let t=[],n=e.directives===!0;if(e.directives!==!1&&s.directives){let l=s.directives.toString(s);l?(t.push(l),n=!0):s.directives.docStart&&(n=!0)}n&&t.push("---");let i=Qs.createStringifyContext(s,e),{commentString:r}=i.options;if(s.commentBefore){t.length!==1&&t.unshift("");let l=r(s.commentBefore);t.unshift(Ke.indentComment(l,""))}let o=!1,a=null;if(s.contents){if(Ic.isNode(s.contents)){if(s.contents.spaceBefore&&n&&t.push(""),s.contents.commentBefore){let p=r(s.contents.commentBefore);t.push(Ke.indentComment(p,""))}i.forceBlockIndent=!!s.comment,a=s.contents.comment}let l=a?void 0:()=>o=!0,c=Qs.stringify(s.contents,i,()=>a=null,l);a&&(c+=Ke.lineComment(c,"",r(a))),(c[0]==="|"||c[0]===">")&&t[t.length-1]==="---"?t[t.length-1]=`--- ${c}`:t.push(c)}else t.push(Qs.stringify(s.contents,i));if(s.directives?.docEnd)if(s.comment){let l=r(s.comment);l.includes(`
`)?(t.push("..."),t.push(Ke.indentComment(l,""))):t.push(`... ${l}`)}else t.push("...");else{let l=s.comment;l&&o&&(l=l.replace(/^\n+/,"")),l&&((!o||a)&&t[t.length-1]!==""&&t.push(""),t.push(Ke.indentComment(r(l),"")))}return t.join(`
`)+`
`}vr.stringifyDocument=Mc});var Fe=g(kr=>{"use strict";var Pc=Ne(),me=at(),P=L(),Dc=W(),$c=G(),Bc=Xs(),Rc=Sr(),Zs=nt(),Kc=ns(),Fc=Le(),en=ss(),tn=class s{constructor(e,t,n){this.commentBefore=null,this.comment=null,this.errors=[],this.warnings=[],Object.defineProperty(this,P.NODE_TYPE,{value:P.DOC});let i=null;typeof t=="function"||Array.isArray(t)?i=t:n===void 0&&t&&(n=t,t=void 0);let r=Object.assign({intAsBigInt:!1,keepSourceTokens:!1,logLevel:"warn",prettyErrors:!0,strict:!0,stringKeys:!1,uniqueKeys:!0,version:"1.2"},n);this.options=r;let{version:o}=r;n?._directives?(this.directives=n._directives.atDocument(),this.directives.yaml.explicit&&(o=this.directives.yaml.version)):this.directives=new en.Directives({version:o}),this.setSchema(o,n),this.contents=e===void 0?null:this.createNode(e,i,n)}clone(){let e=Object.create(s.prototype,{[P.NODE_TYPE]:{value:P.DOC}});return e.commentBefore=this.commentBefore,e.comment=this.comment,e.errors=this.errors.slice(),e.warnings=this.warnings.slice(),e.options=Object.assign({},this.options),this.directives&&(e.directives=this.directives.clone()),e.schema=this.schema.clone(),e.contents=P.isNode(this.contents)?this.contents.clone(e.schema):this.contents,this.range&&(e.range=this.range.slice()),e}add(e){ge(this.contents)&&this.contents.add(e)}addIn(e,t){ge(this.contents)&&this.contents.addIn(e,t)}createAlias(e,t){if(!e.anchor){let n=Zs.anchorNames(this);e.anchor=!t||n.has(t)?Zs.findNewAnchor(t||"a",n):t}return new Pc.Alias(e.anchor)}createNode(e,t,n){let i;if(typeof t=="function")e=t.call({"":e},"",e),i=t;else if(Array.isArray(t)){let h=v=>typeof v=="number"||v instanceof String||v instanceof Number,w=t.filter(h).map(String);w.length>0&&(t=t.concat(w)),i=t}else n===void 0&&t&&(n=t,t=void 0);let{aliasDuplicateObjects:r,anchorPrefix:o,flow:a,keepUndefined:l,onTagObj:c,tag:p}=n??{},{onAnchor:u,setAnchors:f,sourceObjects:m}=Zs.createNodeAnchors(this,o||"a"),y={aliasDuplicateObjects:r??!0,keepUndefined:l??!1,onAnchor:u,onTagObj:c,replacer:i,schema:this.schema,sourceObjects:m},d=Fc.createNode(e,p,y);return a&&P.isCollection(d)&&(d.flow=!0),f(),d}createPair(e,t,n={}){let i=this.createNode(e,null,n),r=this.createNode(t,null,n);return new Dc.Pair(i,r)}delete(e){return ge(this.contents)?this.contents.delete(e):!1}deleteIn(e){return me.isEmptyPath(e)?this.contents==null?!1:(this.contents=null,!0):ge(this.contents)?this.contents.deleteIn(e):!1}get(e,t){return P.isCollection(this.contents)?this.contents.get(e,t):void 0}getIn(e,t){return me.isEmptyPath(e)?!t&&P.isScalar(this.contents)?this.contents.value:this.contents:P.isCollection(this.contents)?this.contents.getIn(e,t):void 0}has(e){return P.isCollection(this.contents)?this.contents.has(e):!1}hasIn(e){return me.isEmptyPath(e)?this.contents!==void 0:P.isCollection(this.contents)?this.contents.hasIn(e):!1}set(e,t){this.contents==null?this.contents=me.collectionFromPath(this.schema,[e],t):ge(this.contents)&&this.contents.set(e,t)}setIn(e,t){me.isEmptyPath(e)?this.contents=t:this.contents==null?this.contents=me.collectionFromPath(this.schema,Array.from(e),t):ge(this.contents)&&this.contents.setIn(e,t)}setSchema(e,t={}){typeof e=="number"&&(e=String(e));let n;switch(e){case"1.1":this.directives?this.directives.yaml.version="1.1":this.directives=new en.Directives({version:"1.1"}),n={resolveKnownTags:!1,schema:"yaml-1.1"};break;case"1.2":case"next":this.directives?this.directives.yaml.version=e:this.directives=new en.Directives({version:e}),n={resolveKnownTags:!0,schema:"core"};break;case null:this.directives&&delete this.directives,n=null;break;default:{let i=JSON.stringify(e);throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${i}`)}}if(t.schema instanceof Object)this.schema=t.schema;else if(n)this.schema=new Bc.Schema(Object.assign(n,t));else throw new Error("With a null YAML version, the { schema: Schema } option is required")}toJS({json:e,jsonArg:t,mapAsMap:n,maxAliasCount:i,onAnchor:r,reviver:o}={}){let a={anchors:new Map,doc:this,keep:!e,mapAsMap:n===!0,mapKeyWarned:!1,maxAliasCount:typeof i=="number"?i:100},l=$c.toJS(this.contents,t??"",a);if(typeof r=="function")for(let{count:c,res:p}of a.anchors.values())r(p,c);return typeof o=="function"?Kc.applyReviver(o,{"":l},"",l):l}toJSON(e,t){return this.toJS({json:!0,jsonArg:e,mapAsMap:!1,onAnchor:t})}toString(e={}){if(this.errors.length>0)throw new Error("Document with errors cannot be stringified");if("indent"in e&&(!Number.isInteger(e.indent)||Number(e.indent)<=0)){let t=JSON.stringify(e.indent);throw new Error(`"indent" option must be a positive integer, not ${t}`)}return Rc.stringifyDocument(this,e)}};function ge(s){if(P.isCollection(s))return!0;throw new Error("Expected a YAML collection as document contents")}kr.Document=tn});var Ye=g(Ue=>{"use strict";var je=class extends Error{constructor(e,t,n,i){super(),this.name=e,this.code=n,this.message=i,this.pos=t}},sn=class extends je{constructor(e,t,n){super("YAMLParseError",e,t,n)}},nn=class extends je{constructor(e,t,n){super("YAMLWarning",e,t,n)}},jc=(s,e)=>t=>{if(t.pos[0]===-1)return;t.linePos=t.pos.map(a=>e.linePos(a));let{line:n,col:i}=t.linePos[0];t.message+=` at line ${n}, column ${i}`;let r=i-1,o=s.substring(e.lineStarts[n-1],e.lineStarts[n]).replace(/[\n\r]+$/,"");if(r>=60&&o.length>80){let a=Math.min(r-39,o.length-79);o="\u2026"+o.substring(a),r-=a-1}if(o.length>80&&(o=o.substring(0,79)+"\u2026"),n>1&&/^ *$/.test(o.substring(0,r))){let a=s.substring(e.lineStarts[n-2],e.lineStarts[n-1]);a.length>80&&(a=a.substring(0,79)+`\u2026
`),o=a+o}if(/[^ ]/.test(o)){let a=1,l=t.linePos[1];l&&l.line===n&&l.col>i&&(a=Math.max(1,Math.min(l.col-i,80-r)));let c=" ".repeat(r)+"^".repeat(a);t.message+=`:

${o}
${c}
`}};Ue.YAMLError=je;Ue.YAMLParseError=sn;Ue.YAMLWarning=nn;Ue.prettifyError=jc});var Ge=g(Ar=>{"use strict";function Uc(s,{flow:e,indicator:t,next:n,offset:i,onError:r,parentIndent:o,startOnNewline:a}){let l=!1,c=a,p=a,u="",f="",m=!1,y=!1,d=null,h=null,w=null,v=null,S=null,k=null,A=null;for(let b of s)switch(y&&(b.type!=="space"&&b.type!=="newline"&&b.type!=="comma"&&r(b.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space"),y=!1),d&&(c&&b.type!=="comment"&&b.type!=="newline"&&r(d,"TAB_AS_INDENT","Tabs are not allowed as indentation"),d=null),b.type){case"space":!e&&(t!=="doc-start"||n?.type!=="flow-collection")&&b.source.includes("	")&&(d=b),p=!0;break;case"comment":{p||r(b,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");let q=b.source.substring(1)||" ";u?u+=f+q:u=q,f="",c=!1;break}case"newline":c?u?u+=b.source:(!k||t!=="seq-item-ind")&&(l=!0):f+=b.source,c=!0,m=!0,(h||w)&&(v=b),p=!0;break;case"anchor":h&&r(b,"MULTIPLE_ANCHORS","A node can have at most one anchor"),b.source.endsWith(":")&&r(b.offset+b.source.length-1,"BAD_ALIAS","Anchor ending in : is ambiguous",!0),h=b,A??(A=b.offset),c=!1,p=!1,y=!0;break;case"tag":{w&&r(b,"MULTIPLE_TAGS","A node can have at most one tag"),w=b,A??(A=b.offset),c=!1,p=!1,y=!0;break}case t:(h||w)&&r(b,"BAD_PROP_ORDER",`Anchors and tags must be after the ${b.source} indicator`),k&&r(b,"UNEXPECTED_TOKEN",`Unexpected ${b.source} in ${e??"collection"}`),k=b,c=t==="seq-item-ind"||t==="explicit-key-ind",p=!1;break;case"comma":if(e){S&&r(b,"UNEXPECTED_TOKEN",`Unexpected , in ${e}`),S=b,c=!1,p=!1;break}default:r(b,"UNEXPECTED_TOKEN",`Unexpected ${b.type} token`),c=!1,p=!1}let N=s[s.length-1],E=N?N.offset+N.source.length:i;return y&&n&&n.type!=="space"&&n.type!=="newline"&&n.type!=="comma"&&(n.type!=="scalar"||n.source!=="")&&r(n.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space"),d&&(c&&d.indent<=o||n?.type==="block-map"||n?.type==="block-seq")&&r(d,"TAB_AS_INDENT","Tabs are not allowed as indentation"),{comma:S,found:k,spaceBefore:l,comment:u,hasNewline:m,anchor:h,tag:w,newlineAfterProp:v,end:E,start:A??E}}Ar.resolveProps=Uc});var Ft=g(Nr=>{"use strict";function rn(s){if(!s)return null;switch(s.type){case"alias":case"scalar":case"double-quoted-scalar":case"single-quoted-scalar":if(s.source.includes(`
`))return!0;if(s.end){for(let e of s.end)if(e.type==="newline")return!0}return!1;case"flow-collection":for(let e of s.items){for(let t of e.start)if(t.type==="newline")return!0;if(e.sep){for(let t of e.sep)if(t.type==="newline")return!0}if(rn(e.key)||rn(e.value))return!0}return!1;default:return!0}}Nr.containsNewline=rn});var on=g(Lr=>{"use strict";var Yc=Ft();function Gc(s,e,t){if(e?.type==="flow-collection"){let n=e.end[0];n.indent===s&&(n.source==="]"||n.source==="}")&&Yc.containsNewline(e)&&t(n,"BAD_INDENT","Flow end indicator should be more indented than parent",!0)}}Lr.flowIndentCheck=Gc});var an=g(Er=>{"use strict";var Cr=L();function Jc(s,e,t){let{uniqueKeys:n}=s.options;if(n===!1)return!1;let i=typeof n=="function"?n:(r,o)=>r===o||Cr.isScalar(r)&&Cr.isScalar(o)&&r.value===o.value;return e.some(r=>i(r.key,t))}Er.mapIncludes=Jc});var Ir=g(xr=>{"use strict";var Or=W(),Vc=X(),qr=Ge(),Hc=Ft(),Tr=on(),Wc=an(),_r="All mapping items must start at the same column";function zc({composeNode:s,composeEmptyNode:e},t,n,i,r){let o=r?.nodeClass??Vc.YAMLMap,a=new o(t.schema);t.atRoot&&(t.atRoot=!1);let l=n.offset,c=null;for(let p of n.items){let{start:u,key:f,sep:m,value:y}=p,d=qr.resolveProps(u,{indicator:"explicit-key-ind",next:f??m?.[0],offset:l,onError:i,parentIndent:n.indent,startOnNewline:!0}),h=!d.found;if(h){if(f&&(f.type==="block-seq"?i(l,"BLOCK_AS_IMPLICIT_KEY","A block sequence may not be used as an implicit map key"):"indent"in f&&f.indent!==n.indent&&i(l,"BAD_INDENT",_r)),!d.anchor&&!d.tag&&!m){c=d.end,d.comment&&(a.comment?a.comment+=`
`+d.comment:a.comment=d.comment);continue}(d.newlineAfterProp||Hc.containsNewline(f))&&i(f??u[u.length-1],"MULTILINE_IMPLICIT_KEY","Implicit keys need to be on a single line")}else d.found?.indent!==n.indent&&i(l,"BAD_INDENT",_r);t.atKey=!0;let w=d.end,v=f?s(t,f,d,i):e(t,w,u,null,d,i);t.schema.compat&&Tr.flowIndentCheck(n.indent,f,i),t.atKey=!1,Wc.mapIncludes(t,a.items,v)&&i(w,"DUPLICATE_KEY","Map keys must be unique");let S=qr.resolveProps(m??[],{indicator:"map-value-ind",next:y,offset:v.range[2],onError:i,parentIndent:n.indent,startOnNewline:!f||f.type==="block-scalar"});if(l=S.end,S.found){h&&(y?.type==="block-map"&&!S.hasNewline&&i(l,"BLOCK_AS_IMPLICIT_KEY","Nested mappings are not allowed in compact mappings"),t.options.strict&&d.start<S.found.offset-1024&&i(v.range,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit block mapping key"));let k=y?s(t,y,S,i):e(t,l,m,null,S,i);t.schema.compat&&Tr.flowIndentCheck(n.indent,y,i),l=k.range[2];let A=new Or.Pair(v,k);t.options.keepSourceTokens&&(A.srcToken=p),a.items.push(A)}else{h&&i(v.range,"MISSING_CHAR","Implicit map keys need to be followed by map values"),S.comment&&(v.comment?v.comment+=`
`+S.comment:v.comment=S.comment);let k=new Or.Pair(v);t.options.keepSourceTokens&&(k.srcToken=p),a.items.push(k)}}return c&&c<l&&i(c,"IMPOSSIBLE","Map comment with trailing content"),a.range=[n.offset,l,c??l],a}xr.resolveBlockMap=zc});var Pr=g(Mr=>{"use strict";var Xc=Q(),Qc=Ge(),Zc=on();function eu({composeNode:s,composeEmptyNode:e},t,n,i,r){let o=r?.nodeClass??Xc.YAMLSeq,a=new o(t.schema);t.atRoot&&(t.atRoot=!1),t.atKey&&(t.atKey=!1);let l=n.offset,c=null;for(let{start:p,value:u}of n.items){let f=Qc.resolveProps(p,{indicator:"seq-item-ind",next:u,offset:l,onError:i,parentIndent:n.indent,startOnNewline:!0});if(!f.found)if(f.anchor||f.tag||u)u&&u.type==="block-seq"?i(f.end,"BAD_INDENT","All sequence items must start at the same column"):i(l,"MISSING_CHAR","Sequence item without - indicator");else{c=f.end,f.comment&&(a.comment=f.comment);continue}let m=u?s(t,u,f,i):e(t,f.end,p,null,f,i);t.schema.compat&&Zc.flowIndentCheck(n.indent,u,i),l=m.range[2],a.items.push(m)}return a.range=[n.offset,l,c??l],a}Mr.resolveBlockSeq=eu});var ye=g(Dr=>{"use strict";function tu(s,e,t,n){let i="";if(s){let r=!1,o="";for(let a of s){let{source:l,type:c}=a;switch(c){case"space":r=!0;break;case"comment":{t&&!r&&n(a,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");let p=l.substring(1)||" ";i?i+=o+p:i=p,o="";break}case"newline":i&&(o+=l),r=!0;break;default:n(a,"UNEXPECTED_TOKEN",`Unexpected ${c} at node end`)}e+=l.length}}return{comment:i,offset:e}}Dr.resolveEnd=tu});var Kr=g(Rr=>{"use strict";var su=L(),nu=W(),$r=X(),iu=Q(),ru=ye(),Br=Ge(),ou=Ft(),au=an(),ln="Block collections are not allowed within flow collections",cn=s=>s&&(s.type==="block-map"||s.type==="block-seq");function lu({composeNode:s,composeEmptyNode:e},t,n,i,r){let o=n.start.source==="{",a=o?"flow map":"flow sequence",l=r?.nodeClass??(o?$r.YAMLMap:iu.YAMLSeq),c=new l(t.schema);c.flow=!0;let p=t.atRoot;p&&(t.atRoot=!1),t.atKey&&(t.atKey=!1);let u=n.offset+n.start.source.length;for(let h=0;h<n.items.length;++h){let w=n.items[h],{start:v,key:S,sep:k,value:A}=w,N=Br.resolveProps(v,{flow:a,indicator:"explicit-key-ind",next:S??k?.[0],offset:u,onError:i,parentIndent:n.indent,startOnNewline:!1});if(!N.found){if(!N.anchor&&!N.tag&&!k&&!A){h===0&&N.comma?i(N.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${a}`):h<n.items.length-1&&i(N.start,"UNEXPECTED_TOKEN",`Unexpected empty item in ${a}`),N.comment&&(c.comment?c.comment+=`
`+N.comment:c.comment=N.comment),u=N.end;continue}!o&&t.options.strict&&ou.containsNewline(S)&&i(S,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line")}if(h===0)N.comma&&i(N.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${a}`);else if(N.comma||i(N.start,"MISSING_CHAR",`Missing , between ${a} items`),N.comment){let E="";e:for(let b of v)switch(b.type){case"comma":case"space":break;case"comment":E=b.source.substring(1);break e;default:break e}if(E){let b=c.items[c.items.length-1];su.isPair(b)&&(b=b.value??b.key),b.comment?b.comment+=`
`+E:b.comment=E,N.comment=N.comment.substring(E.length+1)}}if(!o&&!k&&!N.found){let E=A?s(t,A,N,i):e(t,N.end,k,null,N,i);c.items.push(E),u=E.range[2],cn(A)&&i(E.range,"BLOCK_IN_FLOW",ln)}else{t.atKey=!0;let E=N.end,b=S?s(t,S,N,i):e(t,E,v,null,N,i);cn(S)&&i(b.range,"BLOCK_IN_FLOW",ln),t.atKey=!1;let q=Br.resolveProps(k??[],{flow:a,indicator:"map-value-ind",next:A,offset:b.range[2],onError:i,parentIndent:n.indent,startOnNewline:!1});if(q.found){if(!o&&!N.found&&t.options.strict){if(k)for(let T of k){if(T===q.found)break;if(T.type==="newline"){i(T,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line");break}}N.start<q.found.offset-1024&&i(q.found,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit flow sequence key")}}else A&&("source"in A&&A.source&&A.source[0]===":"?i(A,"MISSING_CHAR",`Missing space after : in ${a}`):i(q.start,"MISSING_CHAR",`Missing , or : between ${a} items`));let Y=A?s(t,A,q,i):q.found?e(t,q.end,k,null,q,i):null;Y?cn(A)&&i(Y.range,"BLOCK_IN_FLOW",ln):q.comment&&(b.comment?b.comment+=`
`+q.comment:b.comment=q.comment);let ae=new nu.Pair(b,Y);if(t.options.keepSourceTokens&&(ae.srcToken=w),o){let T=c;au.mapIncludes(t,T.items,b)&&i(E,"DUPLICATE_KEY","Map keys must be unique"),T.items.push(ae)}else{let T=new $r.YAMLMap(t.schema);T.flow=!0,T.items.push(ae);let $n=(Y??b).range;T.range=[b.range[0],$n[1],$n[2]],c.items.push(T)}u=Y?Y.range[2]:q.end}}let f=o?"}":"]",[m,...y]=n.end,d=u;if(m&&m.source===f)d=m.offset+m.source.length;else{let h=a[0].toUpperCase()+a.substring(1),w=p?`${h} must end with a ${f}`:`${h} in block collection must be sufficiently indented and end with a ${f}`;i(u,p?"MISSING_CHAR":"BAD_INDENT",w),m&&m.source.length!==1&&y.unshift(m)}if(y.length>0){let h=ru.resolveEnd(y,d,t.options.strict,i);h.comment&&(c.comment?c.comment+=`
`+h.comment:c.comment=h.comment),c.range=[n.offset,d,h.offset]}else c.range=[n.offset,d,d];return c}Rr.resolveFlowCollection=lu});var jr=g(Fr=>{"use strict";var cu=L(),uu=O(),fu=X(),du=Q(),pu=Ir(),hu=Pr(),mu=Kr();function un(s,e,t,n,i,r){let o=t.type==="block-map"?pu.resolveBlockMap(s,e,t,n,r):t.type==="block-seq"?hu.resolveBlockSeq(s,e,t,n,r):mu.resolveFlowCollection(s,e,t,n,r),a=o.constructor;return i==="!"||i===a.tagName?(o.tag=a.tagName,o):(i&&(o.tag=i),o)}function gu(s,e,t,n,i){let r=n.tag,o=r?e.directives.tagName(r.source,f=>i(r,"TAG_RESOLVE_FAILED",f)):null;if(t.type==="block-seq"){let{anchor:f,newlineAfterProp:m}=n,y=f&&r?f.offset>r.offset?f:r:f??r;y&&(!m||m.offset<y.offset)&&i(y,"MISSING_CHAR","Missing newline after block sequence props")}let a=t.type==="block-map"?"map":t.type==="block-seq"?"seq":t.start.source==="{"?"map":"seq";if(!r||!o||o==="!"||o===fu.YAMLMap.tagName&&a==="map"||o===du.YAMLSeq.tagName&&a==="seq")return un(s,e,t,i,o);let l=e.schema.tags.find(f=>f.tag===o&&f.collection===a);if(!l){let f=e.schema.knownTags[o];if(f&&f.collection===a)e.schema.tags.push(Object.assign({},f,{default:!1})),l=f;else return f?i(r,"BAD_COLLECTION_TYPE",`${f.tag} used for ${a} collection, but expects ${f.collection??"scalar"}`,!0):i(r,"TAG_RESOLVE_FAILED",`Unresolved tag: ${o}`,!0),un(s,e,t,i,o)}let c=un(s,e,t,i,o,l),p=l.resolve?.(c,f=>i(r,"TAG_RESOLVE_FAILED",f),e.options)??c,u=cu.isNode(p)?p:new uu.Scalar(p);return u.range=c.range,u.tag=o,l?.format&&(u.format=l.format),u}Fr.composeCollection=gu});var dn=g(Ur=>{"use strict";var fn=O();function yu(s,e,t){let n=e.offset,i=bu(e,s.options.strict,t);if(!i)return{value:"",type:null,comment:"",range:[n,n,n]};let r=i.mode===">"?fn.Scalar.BLOCK_FOLDED:fn.Scalar.BLOCK_LITERAL,o=e.source?wu(e.source):[],a=o.length;for(let d=o.length-1;d>=0;--d){let h=o[d][1];if(h===""||h==="\r")a=d;else break}if(a===0){let d=i.chomp==="+"&&o.length>0?`
`.repeat(Math.max(1,o.length-1)):"",h=n+i.length;return e.source&&(h+=e.source.length),{value:d,type:r,comment:i.comment,range:[n,h,h]}}let l=e.indent+i.indent,c=e.offset+i.length,p=0;for(let d=0;d<a;++d){let[h,w]=o[d];if(w===""||w==="\r")i.indent===0&&h.length>l&&(l=h.length);else{h.length<l&&t(c+h.length,"MISSING_CHAR","Block scalars with more-indented leading empty lines must use an explicit indentation indicator"),i.indent===0&&(l=h.length),p=d,l===0&&!s.atRoot&&t(c,"BAD_INDENT","Block scalar values in collections must be indented");break}c+=h.length+w.length+1}for(let d=o.length-1;d>=a;--d)o[d][0].length>l&&(a=d+1);let u="",f="",m=!1;for(let d=0;d<p;++d)u+=o[d][0].slice(l)+`
`;for(let d=p;d<a;++d){let[h,w]=o[d];c+=h.length+w.length+1;let v=w[w.length-1]==="\r";if(v&&(w=w.slice(0,-1)),w&&h.length<l){let k=`Block scalar lines must not be less indented than their ${i.indent?"explicit indentation indicator":"first line"}`;t(c-w.length-(v?2:1),"BAD_INDENT",k),h=""}r===fn.Scalar.BLOCK_LITERAL?(u+=f+h.slice(l)+w,f=`
`):h.length>l||w[0]==="	"?(f===" "?f=`
`:!m&&f===`
`&&(f=`

`),u+=f+h.slice(l)+w,f=`
`,m=!0):w===""?f===`
`?u+=`
`:f=`
`:(u+=f+w,f=" ",m=!1)}switch(i.chomp){case"-":break;case"+":for(let d=a;d<o.length;++d)u+=`
`+o[d][0].slice(l);u[u.length-1]!==`
`&&(u+=`
`);break;default:u+=`
`}let y=n+i.length+e.source.length;return{value:u,type:r,comment:i.comment,range:[n,y,y]}}function bu({offset:s,props:e},t,n){if(e[0].type!=="block-scalar-header")return n(e[0],"IMPOSSIBLE","Block scalar header not found"),null;let{source:i}=e[0],r=i[0],o=0,a="",l=-1;for(let f=1;f<i.length;++f){let m=i[f];if(!a&&(m==="-"||m==="+"))a=m;else{let y=Number(m);!o&&y?o=y:l===-1&&(l=s+f)}}l!==-1&&n(l,"UNEXPECTED_TOKEN",`Block scalar header includes extra characters: ${i}`);let c=!1,p="",u=i.length;for(let f=1;f<e.length;++f){let m=e[f];switch(m.type){case"space":c=!0;case"newline":u+=m.source.length;break;case"comment":t&&!c&&n(m,"MISSING_CHAR","Comments must be separated from other tokens by white space characters"),u+=m.source.length,p=m.source.substring(1);break;case"error":n(m,"UNEXPECTED_TOKEN",m.message),u+=m.source.length;break;default:{let y=`Unexpected token in block scalar header: ${m.type}`;n(m,"UNEXPECTED_TOKEN",y);let d=m.source;d&&typeof d=="string"&&(u+=d.length)}}}return{mode:r,indent:o,chomp:a,comment:p,length:u}}function wu(s){let e=s.split(/\n( *)/),t=e[0],n=t.match(/^( *)/),r=[n?.[1]?[n[1],t.slice(n[1].length)]:["",t]];for(let o=1;o<e.length;o+=2)r.push([e[o],e[o+1]]);return r}Ur.resolveBlockScalar=yu});var hn=g(Gr=>{"use strict";var pn=O(),vu=ye();function Su(s,e,t){let{offset:n,type:i,source:r,end:o}=s,a,l,c=(f,m,y)=>t(n+f,m,y);switch(i){case"scalar":a=pn.Scalar.PLAIN,l=ku(r,c);break;case"single-quoted-scalar":a=pn.Scalar.QUOTE_SINGLE,l=Au(r,c);break;case"double-quoted-scalar":a=pn.Scalar.QUOTE_DOUBLE,l=Nu(r,c);break;default:return t(s,"UNEXPECTED_TOKEN",`Expected a flow scalar value, but found: ${i}`),{value:"",type:null,comment:"",range:[n,n+r.length,n+r.length]}}let p=n+r.length,u=vu.resolveEnd(o,p,e,t);return{value:l,type:a,comment:u.comment,range:[n,p,u.offset]}}function ku(s,e){let t="";switch(s[0]){case"	":t="a tab character";break;case",":t="flow indicator character ,";break;case"%":t="directive indicator character %";break;case"|":case">":{t=`block scalar indicator ${s[0]}`;break}case"@":case"`":{t=`reserved character ${s[0]}`;break}}return t&&e(0,"BAD_SCALAR_START",`Plain value cannot start with ${t}`),Yr(s)}function Au(s,e){return(s[s.length-1]!=="'"||s.length===1)&&e(s.length,"MISSING_CHAR","Missing closing 'quote"),Yr(s.slice(1,-1)).replace(/''/g,"'")}function Yr(s){let e,t;try{e=new RegExp(`(.*?)(?<![ 	])[ 	]*\r?
`,"sy"),t=new RegExp(`[ 	]*(.*?)(?:(?<![ 	])[ 	]*)?\r?
`,"sy")}catch{e=/(.*?)[ \t]*\r?\n/sy,t=/[ \t]*(.*?)[ \t]*\r?\n/sy}let n=e.exec(s);if(!n)return s;let i=n[1],r=" ",o=e.lastIndex;for(t.lastIndex=o;n=t.exec(s);)n[1]===""?r===`
`?i+=r:r=`
`:(i+=r+n[1],r=" "),o=t.lastIndex;let a=/[ \t]*(.*)/sy;return a.lastIndex=o,n=a.exec(s),i+r+(n?.[1]??"")}function Nu(s,e){let t="";for(let n=1;n<s.length-1;++n){let i=s[n];if(!(i==="\r"&&s[n+1]===`
`))if(i===`
`){let{fold:r,offset:o}=Lu(s,n);t+=r,n=o}else if(i==="\\"){let r=s[++n],o=Cu[r];if(o)t+=o;else if(r===`
`)for(r=s[n+1];r===" "||r==="	";)r=s[++n+1];else if(r==="\r"&&s[n+1]===`
`)for(r=s[++n+1];r===" "||r==="	";)r=s[++n+1];else if(r==="x"||r==="u"||r==="U"){let a={x:2,u:4,U:8}[r];t+=Eu(s,n+1,a,e),n+=a}else{let a=s.substr(n-1,2);e(n-1,"BAD_DQ_ESCAPE",`Invalid escape sequence ${a}`),t+=a}}else if(i===" "||i==="	"){let r=n,o=s[n+1];for(;o===" "||o==="	";)o=s[++n+1];o!==`
`&&!(o==="\r"&&s[n+2]===`
`)&&(t+=n>r?s.slice(r,n+1):i)}else t+=i}return(s[s.length-1]!=='"'||s.length===1)&&e(s.length,"MISSING_CHAR",'Missing closing "quote'),t}function Lu(s,e){let t="",n=s[e+1];for(;(n===" "||n==="	"||n===`
`||n==="\r")&&!(n==="\r"&&s[e+2]!==`
`);)n===`
`&&(t+=`
`),e+=1,n=s[e+1];return t||(t=" "),{fold:t,offset:e}}var Cu={0:"\0",a:"\x07",b:"\b",e:"\x1B",f:"\f",n:`
`,r:"\r",t:"	",v:"\v",N:"\x85",_:"\xA0",L:"\u2028",P:"\u2029"," ":" ",'"':'"',"/":"/","\\":"\\","	":"	"};function Eu(s,e,t,n){let i=s.substr(e,t),o=i.length===t&&/^[0-9a-fA-F]+$/.test(i)?parseInt(i,16):NaN;if(isNaN(o)){let a=s.substr(e-2,t+2);return n(e-2,"BAD_DQ_ESCAPE",`Invalid escape sequence ${a}`),a}return String.fromCodePoint(o)}Gr.resolveFlowScalar=Su});var Hr=g(Vr=>{"use strict";var re=L(),Jr=O(),Ou=dn(),qu=hn();function Tu(s,e,t,n){let{value:i,type:r,comment:o,range:a}=e.type==="block-scalar"?Ou.resolveBlockScalar(s,e,n):qu.resolveFlowScalar(e,s.options.strict,n),l=t?s.directives.tagName(t.source,u=>n(t,"TAG_RESOLVE_FAILED",u)):null,c;s.options.stringKeys&&s.atKey?c=s.schema[re.SCALAR]:l?c=_u(s.schema,i,l,t,n):e.type==="scalar"?c=xu(s,i,e,n):c=s.schema[re.SCALAR];let p;try{let u=c.resolve(i,f=>n(t??e,"TAG_RESOLVE_FAILED",f),s.options);p=re.isScalar(u)?u:new Jr.Scalar(u)}catch(u){let f=u instanceof Error?u.message:String(u);n(t??e,"TAG_RESOLVE_FAILED",f),p=new Jr.Scalar(i)}return p.range=a,p.source=i,r&&(p.type=r),l&&(p.tag=l),c.format&&(p.format=c.format),o&&(p.comment=o),p}function _u(s,e,t,n,i){if(t==="!")return s[re.SCALAR];let r=[];for(let a of s.tags)if(!a.collection&&a.tag===t)if(a.default&&a.test)r.push(a);else return a;for(let a of r)if(a.test?.test(e))return a;let o=s.knownTags[t];return o&&!o.collection?(s.tags.push(Object.assign({},o,{default:!1,test:void 0})),o):(i(n,"TAG_RESOLVE_FAILED",`Unresolved tag: ${t}`,t!=="tag:yaml.org,2002:str"),s[re.SCALAR])}function xu({atKey:s,directives:e,schema:t},n,i,r){let o=t.tags.find(a=>(a.default===!0||s&&a.default==="key")&&a.test?.test(n))||t[re.SCALAR];if(t.compat){let a=t.compat.find(l=>l.default&&l.test?.test(n))??t[re.SCALAR];if(o.tag!==a.tag){let l=e.tagString(o.tag),c=e.tagString(a.tag),p=`Value may be parsed as either ${l} or ${c}`;r(i,"TAG_RESOLVE_FAILED",p,!0)}}return o}Vr.composeScalar=Tu});var zr=g(Wr=>{"use strict";function Iu(s,e,t){if(e){t??(t=e.length);for(let n=t-1;n>=0;--n){let i=e[n];switch(i.type){case"space":case"comment":case"newline":s-=i.source.length;continue}for(i=e[++n];i?.type==="space";)s+=i.source.length,i=e[++n];break}}return s}Wr.emptyScalarPosition=Iu});var Zr=g(gn=>{"use strict";var Mu=Ne(),Pu=L(),Du=jr(),Xr=Hr(),$u=ye(),Bu=zr(),Ru={composeNode:Qr,composeEmptyNode:mn};function Qr(s,e,t,n){let i=s.atKey,{spaceBefore:r,comment:o,anchor:a,tag:l}=t,c,p=!0;switch(e.type){case"alias":c=Ku(s,e,n),(a||l)&&n(e,"ALIAS_PROPS","An alias node must not specify any properties");break;case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"block-scalar":c=Xr.composeScalar(s,e,l,n),a&&(c.anchor=a.source.substring(1));break;case"block-map":case"block-seq":case"flow-collection":c=Du.composeCollection(Ru,s,e,t,n),a&&(c.anchor=a.source.substring(1));break;default:{let u=e.type==="error"?e.message:`Unsupported token (type: ${e.type})`;n(e,"UNEXPECTED_TOKEN",u),c=mn(s,e.offset,void 0,null,t,n),p=!1}}return a&&c.anchor===""&&n(a,"BAD_ALIAS","Anchor cannot be an empty string"),i&&s.options.stringKeys&&(!Pu.isScalar(c)||typeof c.value!="string"||c.tag&&c.tag!=="tag:yaml.org,2002:str")&&n(l??e,"NON_STRING_KEY","With stringKeys, all keys must be strings"),r&&(c.spaceBefore=!0),o&&(e.type==="scalar"&&e.source===""?c.comment=o:c.commentBefore=o),s.options.keepSourceTokens&&p&&(c.srcToken=e),c}function mn(s,e,t,n,{spaceBefore:i,comment:r,anchor:o,tag:a,end:l},c){let p={type:"scalar",offset:Bu.emptyScalarPosition(e,t,n),indent:-1,source:""},u=Xr.composeScalar(s,p,a,c);return o&&(u.anchor=o.source.substring(1),u.anchor===""&&c(o,"BAD_ALIAS","Anchor cannot be an empty string")),i&&(u.spaceBefore=!0),r&&(u.comment=r,u.range[2]=l),u}function Ku({options:s},{offset:e,source:t,end:n},i){let r=new Mu.Alias(t.substring(1));r.source===""&&i(e,"BAD_ALIAS","Alias cannot be an empty string"),r.source.endsWith(":")&&i(e+t.length-1,"BAD_ALIAS","Alias ending in : is ambiguous",!0);let o=e+t.length,a=$u.resolveEnd(n,o,s.strict,i);return r.range=[e,o,a.offset],a.comment&&(r.comment=a.comment),r}gn.composeEmptyNode=mn;gn.composeNode=Qr});var so=g(to=>{"use strict";var Fu=Fe(),eo=Zr(),ju=ye(),Uu=Ge();function Yu(s,e,{offset:t,start:n,value:i,end:r},o){let a=Object.assign({_directives:e},s),l=new Fu.Document(void 0,a),c={atKey:!1,atRoot:!0,directives:l.directives,options:l.options,schema:l.schema},p=Uu.resolveProps(n,{indicator:"doc-start",next:i??r?.[0],offset:t,onError:o,parentIndent:0,startOnNewline:!0});p.found&&(l.directives.docStart=!0,i&&(i.type==="block-map"||i.type==="block-seq")&&!p.hasNewline&&o(p.end,"MISSING_CHAR","Block collection cannot start on same line with directives-end marker")),l.contents=i?eo.composeNode(c,i,p,o):eo.composeEmptyNode(c,p.end,n,null,p,o);let u=l.contents.range[2],f=ju.resolveEnd(r,u,!1,o);return f.comment&&(l.comment=f.comment),l.range=[t,u,f.offset],l}to.composeDoc=Yu});var bn=g(ro=>{"use strict";var Gu=Xe("process"),Ju=ss(),Vu=Fe(),Je=Ye(),no=L(),Hu=so(),Wu=ye();function Ve(s){if(typeof s=="number")return[s,s+1];if(Array.isArray(s))return s.length===2?s:[s[0],s[1]];let{offset:e,source:t}=s;return[e,e+(typeof t=="string"?t.length:1)]}function io(s){let e="",t=!1,n=!1;for(let i=0;i<s.length;++i){let r=s[i];switch(r[0]){case"#":e+=(e===""?"":n?`

`:`
`)+(r.substring(1)||" "),t=!0,n=!1;break;case"%":s[i+1]?.[0]!=="#"&&(i+=1),t=!1;break;default:t||(n=!0),t=!1}}return{comment:e,afterEmptyLine:n}}var yn=class{constructor(e={}){this.doc=null,this.atDirectives=!1,this.prelude=[],this.errors=[],this.warnings=[],this.onError=(t,n,i,r)=>{let o=Ve(t);r?this.warnings.push(new Je.YAMLWarning(o,n,i)):this.errors.push(new Je.YAMLParseError(o,n,i))},this.directives=new Ju.Directives({version:e.version||"1.2"}),this.options=e}decorate(e,t){let{comment:n,afterEmptyLine:i}=io(this.prelude);if(n){let r=e.contents;if(t)e.comment=e.comment?`${e.comment}
${n}`:n;else if(i||e.directives.docStart||!r)e.commentBefore=n;else if(no.isCollection(r)&&!r.flow&&r.items.length>0){let o=r.items[0];no.isPair(o)&&(o=o.key);let a=o.commentBefore;o.commentBefore=a?`${n}
${a}`:n}else{let o=r.commentBefore;r.commentBefore=o?`${n}
${o}`:n}}t?(Array.prototype.push.apply(e.errors,this.errors),Array.prototype.push.apply(e.warnings,this.warnings)):(e.errors=this.errors,e.warnings=this.warnings),this.prelude=[],this.errors=[],this.warnings=[]}streamInfo(){return{comment:io(this.prelude).comment,directives:this.directives,errors:this.errors,warnings:this.warnings}}*compose(e,t=!1,n=-1){for(let i of e)yield*this.next(i);yield*this.end(t,n)}*next(e){switch(Gu.env.LOG_STREAM&&console.dir(e,{depth:null}),e.type){case"directive":this.directives.add(e.source,(t,n,i)=>{let r=Ve(e);r[0]+=t,this.onError(r,"BAD_DIRECTIVE",n,i)}),this.prelude.push(e.source),this.atDirectives=!0;break;case"document":{let t=Hu.composeDoc(this.options,this.directives,e,this.onError);this.atDirectives&&!t.directives.docStart&&this.onError(e,"MISSING_CHAR","Missing directives-end/doc-start indicator line"),this.decorate(t,!1),this.doc&&(yield this.doc),this.doc=t,this.atDirectives=!1;break}case"byte-order-mark":case"space":break;case"comment":case"newline":this.prelude.push(e.source);break;case"error":{let t=e.source?`${e.message}: ${JSON.stringify(e.source)}`:e.message,n=new Je.YAMLParseError(Ve(e),"UNEXPECTED_TOKEN",t);this.atDirectives||!this.doc?this.errors.push(n):this.doc.errors.push(n);break}case"doc-end":{if(!this.doc){let n="Unexpected doc-end without preceding document";this.errors.push(new Je.YAMLParseError(Ve(e),"UNEXPECTED_TOKEN",n));break}this.doc.directives.docEnd=!0;let t=Wu.resolveEnd(e.end,e.offset+e.source.length,this.doc.options.strict,this.onError);if(this.decorate(this.doc,!0),t.comment){let n=this.doc.comment;this.doc.comment=n?`${n}
${t.comment}`:t.comment}this.doc.range[2]=t.offset;break}default:this.errors.push(new Je.YAMLParseError(Ve(e),"UNEXPECTED_TOKEN",`Unsupported token ${e.type}`))}}*end(e=!1,t=-1){if(this.doc)this.decorate(this.doc,!0),yield this.doc,this.doc=null;else if(e){let n=Object.assign({_directives:this.directives},this.options),i=new Vu.Document(void 0,n);this.atDirectives&&this.onError(t,"MISSING_CHAR","Missing directives-end indicator line"),i.range=[0,t,t],this.decorate(i,!1),yield i}}};ro.Composer=yn});var lo=g(jt=>{"use strict";var zu=dn(),Xu=hn(),Qu=Ye(),oo=qe();function Zu(s,e=!0,t){if(s){let n=(i,r,o)=>{let a=typeof i=="number"?i:Array.isArray(i)?i[0]:i.offset;if(t)t(a,r,o);else throw new Qu.YAMLParseError([a,a+1],r,o)};switch(s.type){case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return Xu.resolveFlowScalar(s,e,n);case"block-scalar":return zu.resolveBlockScalar({options:{strict:e}},s,n)}}return null}function ef(s,e){let{implicitKey:t=!1,indent:n,inFlow:i=!1,offset:r=-1,type:o="PLAIN"}=e,a=oo.stringifyString({type:o,value:s},{implicitKey:t,indent:n>0?" ".repeat(n):"",inFlow:i,options:{blockQuote:!0,lineWidth:-1}}),l=e.end??[{type:"newline",offset:-1,indent:n,source:`
`}];switch(a[0]){case"|":case">":{let c=a.indexOf(`
`),p=a.substring(0,c),u=a.substring(c+1)+`
`,f=[{type:"block-scalar-header",offset:r,indent:n,source:p}];return ao(f,l)||f.push({type:"newline",offset:-1,indent:n,source:`
`}),{type:"block-scalar",offset:r,indent:n,props:f,source:u}}case'"':return{type:"double-quoted-scalar",offset:r,indent:n,source:a,end:l};case"'":return{type:"single-quoted-scalar",offset:r,indent:n,source:a,end:l};default:return{type:"scalar",offset:r,indent:n,source:a,end:l}}}function tf(s,e,t={}){let{afterKey:n=!1,implicitKey:i=!1,inFlow:r=!1,type:o}=t,a="indent"in s?s.indent:null;if(n&&typeof a=="number"&&(a+=2),!o)switch(s.type){case"single-quoted-scalar":o="QUOTE_SINGLE";break;case"double-quoted-scalar":o="QUOTE_DOUBLE";break;case"block-scalar":{let c=s.props[0];if(c.type!=="block-scalar-header")throw new Error("Invalid block scalar header");o=c.source[0]===">"?"BLOCK_FOLDED":"BLOCK_LITERAL";break}default:o="PLAIN"}let l=oo.stringifyString({type:o,value:e},{implicitKey:i||a===null,indent:a!==null&&a>0?" ".repeat(a):"",inFlow:r,options:{blockQuote:!0,lineWidth:-1}});switch(l[0]){case"|":case">":sf(s,l);break;case'"':wn(s,l,"double-quoted-scalar");break;case"'":wn(s,l,"single-quoted-scalar");break;default:wn(s,l,"scalar")}}function sf(s,e){let t=e.indexOf(`
`),n=e.substring(0,t),i=e.substring(t+1)+`
`;if(s.type==="block-scalar"){let r=s.props[0];if(r.type!=="block-scalar-header")throw new Error("Invalid block scalar header");r.source=n,s.source=i}else{let{offset:r}=s,o="indent"in s?s.indent:-1,a=[{type:"block-scalar-header",offset:r,indent:o,source:n}];ao(a,"end"in s?s.end:void 0)||a.push({type:"newline",offset:-1,indent:o,source:`
`});for(let l of Object.keys(s))l!=="type"&&l!=="offset"&&delete s[l];Object.assign(s,{type:"block-scalar",indent:o,props:a,source:i})}}function ao(s,e){if(e)for(let t of e)switch(t.type){case"space":case"comment":s.push(t);break;case"newline":return s.push(t),!0}return!1}function wn(s,e,t){switch(s.type){case"scalar":case"double-quoted-scalar":case"single-quoted-scalar":s.type=t,s.source=e;break;case"block-scalar":{let n=s.props.slice(1),i=e.length;s.props[0].type==="block-scalar-header"&&(i-=s.props[0].source.length);for(let r of n)r.offset+=i;delete s.props,Object.assign(s,{type:t,source:e,end:n});break}case"block-map":case"block-seq":{let i={type:"newline",offset:s.offset+e.length,indent:s.indent,source:`
`};delete s.items,Object.assign(s,{type:t,source:e,end:[i]});break}default:{let n="indent"in s?s.indent:-1,i="end"in s&&Array.isArray(s.end)?s.end.filter(r=>r.type==="space"||r.type==="comment"||r.type==="newline"):[];for(let r of Object.keys(s))r!=="type"&&r!=="offset"&&delete s[r];Object.assign(s,{type:t,indent:n,source:e,end:i})}}}jt.createScalarToken=ef;jt.resolveAsScalar=Zu;jt.setScalarValue=tf});var uo=g(co=>{"use strict";var nf=s=>"type"in s?Yt(s):Ut(s);function Yt(s){switch(s.type){case"block-scalar":{let e="";for(let t of s.props)e+=Yt(t);return e+s.source}case"block-map":case"block-seq":{let e="";for(let t of s.items)e+=Ut(t);return e}case"flow-collection":{let e=s.start.source;for(let t of s.items)e+=Ut(t);for(let t of s.end)e+=t.source;return e}case"document":{let e=Ut(s);if(s.end)for(let t of s.end)e+=t.source;return e}default:{let e=s.source;if("end"in s&&s.end)for(let t of s.end)e+=t.source;return e}}}function Ut({start:s,key:e,sep:t,value:n}){let i="";for(let r of s)i+=r.source;if(e&&(i+=Yt(e)),t)for(let r of t)i+=r.source;return n&&(i+=Yt(n)),i}co.stringify=nf});var mo=g(ho=>{"use strict";var vn=Symbol("break visit"),rf=Symbol("skip children"),fo=Symbol("remove item");function oe(s,e){"type"in s&&s.type==="document"&&(s={start:s.start,value:s.value}),po(Object.freeze([]),s,e)}oe.BREAK=vn;oe.SKIP=rf;oe.REMOVE=fo;oe.itemAtPath=(s,e)=>{let t=s;for(let[n,i]of e){let r=t?.[n];if(r&&"items"in r)t=r.items[i];else return}return t};oe.parentCollection=(s,e)=>{let t=oe.itemAtPath(s,e.slice(0,-1)),n=e[e.length-1][0],i=t?.[n];if(i&&"items"in i)return i;throw new Error("Parent collection not found")};function po(s,e,t){let n=t(e,s);if(typeof n=="symbol")return n;for(let i of["key","value"]){let r=e[i];if(r&&"items"in r){for(let o=0;o<r.items.length;++o){let a=po(Object.freeze(s.concat([[i,o]])),r.items[o],t);if(typeof a=="number")o=a-1;else{if(a===vn)return vn;a===fo&&(r.items.splice(o,1),o-=1)}}typeof n=="function"&&i==="key"&&(n=n(e,s))}}return typeof n=="function"?n(e,s):n}ho.visit=oe});var Gt=g(M=>{"use strict";var Sn=lo(),of=uo(),af=mo(),kn="\uFEFF",An="",Nn="",Ln="",lf=s=>!!s&&"items"in s,cf=s=>!!s&&(s.type==="scalar"||s.type==="single-quoted-scalar"||s.type==="double-quoted-scalar"||s.type==="block-scalar");function uf(s){switch(s){case kn:return"<BOM>";case An:return"<DOC>";case Nn:return"<FLOW_END>";case Ln:return"<SCALAR>";default:return JSON.stringify(s)}}function ff(s){switch(s){case kn:return"byte-order-mark";case An:return"doc-mode";case Nn:return"flow-error-end";case Ln:return"scalar";case"---":return"doc-start";case"...":return"doc-end";case"":case`
`:case`\r
`:return"newline";case"-":return"seq-item-ind";case"?":return"explicit-key-ind";case":":return"map-value-ind";case"{":return"flow-map-start";case"}":return"flow-map-end";case"[":return"flow-seq-start";case"]":return"flow-seq-end";case",":return"comma"}switch(s[0]){case" ":case"	":return"space";case"#":return"comment";case"%":return"directive-line";case"*":return"alias";case"&":return"anchor";case"!":return"tag";case"'":return"single-quoted-scalar";case'"':return"double-quoted-scalar";case"|":case">":return"block-scalar-header"}return null}M.createScalarToken=Sn.createScalarToken;M.resolveAsScalar=Sn.resolveAsScalar;M.setScalarValue=Sn.setScalarValue;M.stringify=of.stringify;M.visit=af.visit;M.BOM=kn;M.DOCUMENT=An;M.FLOW_END=Nn;M.SCALAR=Ln;M.isCollection=lf;M.isScalar=cf;M.prettyToken=uf;M.tokenType=ff});var On=g(yo=>{"use strict";var He=Gt();function $(s){switch(s){case void 0:case" ":case`
`:case"\r":case"	":return!0;default:return!1}}var go=new Set("0123456789ABCDEFabcdef"),df=new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()"),Jt=new Set(",[]{}"),pf=new Set(` ,[]{}
\r	`),Cn=s=>!s||pf.has(s),En=class{constructor(){this.atEnd=!1,this.blockScalarIndent=-1,this.blockScalarKeep=!1,this.buffer="",this.flowKey=!1,this.flowLevel=0,this.indentNext=0,this.indentValue=0,this.lineEndPos=null,this.next=null,this.pos=0}*lex(e,t=!1){if(e){if(typeof e!="string")throw TypeError("source is not a string");this.buffer=this.buffer?this.buffer+e:e,this.lineEndPos=null}this.atEnd=!t;let n=this.next??"stream";for(;n&&(t||this.hasChars(1));)n=yield*this.parseNext(n)}atLineEnd(){let e=this.pos,t=this.buffer[e];for(;t===" "||t==="	";)t=this.buffer[++e];return!t||t==="#"||t===`
`?!0:t==="\r"?this.buffer[e+1]===`
`:!1}charAt(e){return this.buffer[this.pos+e]}continueScalar(e){let t=this.buffer[e];if(this.indentNext>0){let n=0;for(;t===" ";)t=this.buffer[++n+e];if(t==="\r"){let i=this.buffer[n+e+1];if(i===`
`||!i&&!this.atEnd)return e+n+1}return t===`
`||n>=this.indentNext||!t&&!this.atEnd?e+n:-1}if(t==="-"||t==="."){let n=this.buffer.substr(e,3);if((n==="---"||n==="...")&&$(this.buffer[e+3]))return-1}return e}getLine(){let e=this.lineEndPos;return(typeof e!="number"||e!==-1&&e<this.pos)&&(e=this.buffer.indexOf(`
`,this.pos),this.lineEndPos=e),e===-1?this.atEnd?this.buffer.substring(this.pos):null:(this.buffer[e-1]==="\r"&&(e-=1),this.buffer.substring(this.pos,e))}hasChars(e){return this.pos+e<=this.buffer.length}setNext(e){return this.buffer=this.buffer.substring(this.pos),this.pos=0,this.lineEndPos=null,this.next=e,null}peek(e){return this.buffer.substr(this.pos,e)}*parseNext(e){switch(e){case"stream":return yield*this.parseStream();case"line-start":return yield*this.parseLineStart();case"block-start":return yield*this.parseBlockStart();case"doc":return yield*this.parseDocument();case"flow":return yield*this.parseFlowCollection();case"quoted-scalar":return yield*this.parseQuotedScalar();case"block-scalar":return yield*this.parseBlockScalar();case"plain-scalar":return yield*this.parsePlainScalar()}}*parseStream(){let e=this.getLine();if(e===null)return this.setNext("stream");if(e[0]===He.BOM&&(yield*this.pushCount(1),e=e.substring(1)),e[0]==="%"){let t=e.length,n=e.indexOf("#");for(;n!==-1;){let r=e[n-1];if(r===" "||r==="	"){t=n-1;break}else n=e.indexOf("#",n+1)}for(;;){let r=e[t-1];if(r===" "||r==="	")t-=1;else break}let i=(yield*this.pushCount(t))+(yield*this.pushSpaces(!0));return yield*this.pushCount(e.length-i),this.pushNewline(),"stream"}if(this.atLineEnd()){let t=yield*this.pushSpaces(!0);return yield*this.pushCount(e.length-t),yield*this.pushNewline(),"stream"}return yield He.DOCUMENT,yield*this.parseLineStart()}*parseLineStart(){let e=this.charAt(0);if(!e&&!this.atEnd)return this.setNext("line-start");if(e==="-"||e==="."){if(!this.atEnd&&!this.hasChars(4))return this.setNext("line-start");let t=this.peek(3);if((t==="---"||t==="...")&&$(this.charAt(3)))return yield*this.pushCount(3),this.indentValue=0,this.indentNext=0,t==="---"?"doc":"stream"}return this.indentValue=yield*this.pushSpaces(!1),this.indentNext>this.indentValue&&!$(this.charAt(1))&&(this.indentNext=this.indentValue),yield*this.parseBlockStart()}*parseBlockStart(){let[e,t]=this.peek(2);if(!t&&!this.atEnd)return this.setNext("block-start");if((e==="-"||e==="?"||e===":")&&$(t)){let n=(yield*this.pushCount(1))+(yield*this.pushSpaces(!0));return this.indentNext=this.indentValue+1,this.indentValue+=n,yield*this.parseBlockStart()}return"doc"}*parseDocument(){yield*this.pushSpaces(!0);let e=this.getLine();if(e===null)return this.setNext("doc");let t=yield*this.pushIndicators();switch(e[t]){case"#":yield*this.pushCount(e.length-t);case void 0:return yield*this.pushNewline(),yield*this.parseLineStart();case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel=1,"flow";case"}":case"]":return yield*this.pushCount(1),"doc";case"*":return yield*this.pushUntil(Cn),"doc";case'"':case"'":return yield*this.parseQuotedScalar();case"|":case">":return t+=yield*this.parseBlockScalarHeader(),t+=yield*this.pushSpaces(!0),yield*this.pushCount(e.length-t),yield*this.pushNewline(),yield*this.parseBlockScalar();default:return yield*this.parsePlainScalar()}}*parseFlowCollection(){let e,t,n=-1;do e=yield*this.pushNewline(),e>0?(t=yield*this.pushSpaces(!1),this.indentValue=n=t):t=0,t+=yield*this.pushSpaces(!0);while(e+t>0);let i=this.getLine();if(i===null)return this.setNext("flow");if((n!==-1&&n<this.indentNext&&i[0]!=="#"||n===0&&(i.startsWith("---")||i.startsWith("..."))&&$(i[3]))&&!(n===this.indentNext-1&&this.flowLevel===1&&(i[0]==="]"||i[0]==="}")))return this.flowLevel=0,yield He.FLOW_END,yield*this.parseLineStart();let r=0;for(;i[r]===",";)r+=yield*this.pushCount(1),r+=yield*this.pushSpaces(!0),this.flowKey=!1;switch(r+=yield*this.pushIndicators(),i[r]){case void 0:return"flow";case"#":return yield*this.pushCount(i.length-r),"flow";case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel+=1,"flow";case"}":case"]":return yield*this.pushCount(1),this.flowKey=!0,this.flowLevel-=1,this.flowLevel?"flow":"doc";case"*":return yield*this.pushUntil(Cn),"flow";case'"':case"'":return this.flowKey=!0,yield*this.parseQuotedScalar();case":":{let o=this.charAt(1);if(this.flowKey||$(o)||o===",")return this.flowKey=!1,yield*this.pushCount(1),yield*this.pushSpaces(!0),"flow"}default:return this.flowKey=!1,yield*this.parsePlainScalar()}}*parseQuotedScalar(){let e=this.charAt(0),t=this.buffer.indexOf(e,this.pos+1);if(e==="'")for(;t!==-1&&this.buffer[t+1]==="'";)t=this.buffer.indexOf("'",t+2);else for(;t!==-1;){let r=0;for(;this.buffer[t-1-r]==="\\";)r+=1;if(r%2===0)break;t=this.buffer.indexOf('"',t+1)}let n=this.buffer.substring(0,t),i=n.indexOf(`
`,this.pos);if(i!==-1){for(;i!==-1;){let r=this.continueScalar(i+1);if(r===-1)break;i=n.indexOf(`
`,r)}i!==-1&&(t=i-(n[i-1]==="\r"?2:1))}if(t===-1){if(!this.atEnd)return this.setNext("quoted-scalar");t=this.buffer.length}return yield*this.pushToIndex(t+1,!1),this.flowLevel?"flow":"doc"}*parseBlockScalarHeader(){this.blockScalarIndent=-1,this.blockScalarKeep=!1;let e=this.pos;for(;;){let t=this.buffer[++e];if(t==="+")this.blockScalarKeep=!0;else if(t>"0"&&t<="9")this.blockScalarIndent=Number(t)-1;else if(t!=="-")break}return yield*this.pushUntil(t=>$(t)||t==="#")}*parseBlockScalar(){let e=this.pos-1,t=0,n;e:for(let r=this.pos;n=this.buffer[r];++r)switch(n){case" ":t+=1;break;case`
`:e=r,t=0;break;case"\r":{let o=this.buffer[r+1];if(!o&&!this.atEnd)return this.setNext("block-scalar");if(o===`
`)break}default:break e}if(!n&&!this.atEnd)return this.setNext("block-scalar");if(t>=this.indentNext){this.blockScalarIndent===-1?this.indentNext=t:this.indentNext=this.blockScalarIndent+(this.indentNext===0?1:this.indentNext);do{let r=this.continueScalar(e+1);if(r===-1)break;e=this.buffer.indexOf(`
`,r)}while(e!==-1);if(e===-1){if(!this.atEnd)return this.setNext("block-scalar");e=this.buffer.length}}let i=e+1;for(n=this.buffer[i];n===" ";)n=this.buffer[++i];if(n==="	"){for(;n==="	"||n===" "||n==="\r"||n===`
`;)n=this.buffer[++i];e=i-1}else if(!this.blockScalarKeep)do{let r=e-1,o=this.buffer[r];o==="\r"&&(o=this.buffer[--r]);let a=r;for(;o===" ";)o=this.buffer[--r];if(o===`
`&&r>=this.pos&&r+1+t>a)e=r;else break}while(!0);return yield He.SCALAR,yield*this.pushToIndex(e+1,!0),yield*this.parseLineStart()}*parsePlainScalar(){let e=this.flowLevel>0,t=this.pos-1,n=this.pos-1,i;for(;i=this.buffer[++n];)if(i===":"){let r=this.buffer[n+1];if($(r)||e&&Jt.has(r))break;t=n}else if($(i)){let r=this.buffer[n+1];if(i==="\r"&&(r===`
`?(n+=1,i=`
`,r=this.buffer[n+1]):t=n),r==="#"||e&&Jt.has(r))break;if(i===`
`){let o=this.continueScalar(n+1);if(o===-1)break;n=Math.max(n,o-2)}}else{if(e&&Jt.has(i))break;t=n}return!i&&!this.atEnd?this.setNext("plain-scalar"):(yield He.SCALAR,yield*this.pushToIndex(t+1,!0),e?"flow":"doc")}*pushCount(e){return e>0?(yield this.buffer.substr(this.pos,e),this.pos+=e,e):0}*pushToIndex(e,t){let n=this.buffer.slice(this.pos,e);return n?(yield n,this.pos+=n.length,n.length):(t&&(yield""),0)}*pushIndicators(){switch(this.charAt(0)){case"!":return(yield*this.pushTag())+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators());case"&":return(yield*this.pushUntil(Cn))+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators());case"-":case"?":case":":{let e=this.flowLevel>0,t=this.charAt(1);if($(t)||e&&Jt.has(t))return e?this.flowKey&&(this.flowKey=!1):this.indentNext=this.indentValue+1,(yield*this.pushCount(1))+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators())}}return 0}*pushTag(){if(this.charAt(1)==="<"){let e=this.pos+2,t=this.buffer[e];for(;!$(t)&&t!==">";)t=this.buffer[++e];return yield*this.pushToIndex(t===">"?e+1:e,!1)}else{let e=this.pos+1,t=this.buffer[e];for(;t;)if(df.has(t))t=this.buffer[++e];else if(t==="%"&&go.has(this.buffer[e+1])&&go.has(this.buffer[e+2]))t=this.buffer[e+=3];else break;return yield*this.pushToIndex(e,!1)}}*pushNewline(){let e=this.buffer[this.pos];return e===`
`?yield*this.pushCount(1):e==="\r"&&this.charAt(1)===`
`?yield*this.pushCount(2):0}*pushSpaces(e){let t=this.pos-1,n;do n=this.buffer[++t];while(n===" "||e&&n==="	");let i=t-this.pos;return i>0&&(yield this.buffer.substr(this.pos,i),this.pos=t),i}*pushUntil(e){let t=this.pos,n=this.buffer[t];for(;!e(n);)n=this.buffer[++t];return yield*this.pushToIndex(t,!1)}};yo.Lexer=En});var Tn=g(bo=>{"use strict";var qn=class{constructor(){this.lineStarts=[],this.addNewLine=e=>this.lineStarts.push(e),this.linePos=e=>{let t=0,n=this.lineStarts.length;for(;t<n;){let r=t+n>>1;this.lineStarts[r]<e?t=r+1:n=r}if(this.lineStarts[t]===e)return{line:t+1,col:1};if(t===0)return{line:0,col:e};let i=this.lineStarts[t-1];return{line:t,col:e-i+1}}}};bo.LineCounter=qn});var xn=g(Ao=>{"use strict";var hf=Xe("process"),wo=Gt(),mf=On();function Z(s,e){for(let t=0;t<s.length;++t)if(s[t].type===e)return!0;return!1}function vo(s){for(let e=0;e<s.length;++e)switch(s[e].type){case"space":case"comment":case"newline":break;default:return e}return-1}function ko(s){switch(s?.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"flow-collection":return!0;default:return!1}}function Vt(s){switch(s.type){case"document":return s.start;case"block-map":{let e=s.items[s.items.length-1];return e.sep??e.start}case"block-seq":return s.items[s.items.length-1].start;default:return[]}}function be(s){if(s.length===0)return[];let e=s.length;e:for(;--e>=0;)switch(s[e].type){case"doc-start":case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":case"newline":break e}for(;s[++e]?.type==="space";);return s.splice(e,s.length)}function So(s){if(s.start.type==="flow-seq-start")for(let e of s.items)e.sep&&!e.value&&!Z(e.start,"explicit-key-ind")&&!Z(e.sep,"map-value-ind")&&(e.key&&(e.value=e.key),delete e.key,ko(e.value)?e.value.end?Array.prototype.push.apply(e.value.end,e.sep):e.value.end=e.sep:Array.prototype.push.apply(e.start,e.sep),delete e.sep)}var _n=class{constructor(e){this.atNewLine=!0,this.atScalar=!1,this.indent=0,this.offset=0,this.onKeyLine=!1,this.stack=[],this.source="",this.type="",this.lexer=new mf.Lexer,this.onNewLine=e}*parse(e,t=!1){this.onNewLine&&this.offset===0&&this.onNewLine(0);for(let n of this.lexer.lex(e,t))yield*this.next(n);t||(yield*this.end())}*next(e){if(this.source=e,hf.env.LOG_TOKENS&&console.log("|",wo.prettyToken(e)),this.atScalar){this.atScalar=!1,yield*this.step(),this.offset+=e.length;return}let t=wo.tokenType(e);if(t)if(t==="scalar")this.atNewLine=!1,this.atScalar=!0,this.type="scalar";else{switch(this.type=t,yield*this.step(),t){case"newline":this.atNewLine=!0,this.indent=0,this.onNewLine&&this.onNewLine(this.offset+e.length);break;case"space":this.atNewLine&&e[0]===" "&&(this.indent+=e.length);break;case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":this.atNewLine&&(this.indent+=e.length);break;case"doc-mode":case"flow-error-end":return;default:this.atNewLine=!1}this.offset+=e.length}else{let n=`Not a YAML token: ${e}`;yield*this.pop({type:"error",offset:this.offset,message:n,source:e}),this.offset+=e.length}}*end(){for(;this.stack.length>0;)yield*this.pop()}get sourceToken(){return{type:this.type,offset:this.offset,indent:this.indent,source:this.source}}*step(){let e=this.peek(1);if(this.type==="doc-end"&&(!e||e.type!=="doc-end")){for(;this.stack.length>0;)yield*this.pop();this.stack.push({type:"doc-end",offset:this.offset,source:this.source});return}if(!e)return yield*this.stream();switch(e.type){case"document":return yield*this.document(e);case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return yield*this.scalar(e);case"block-scalar":return yield*this.blockScalar(e);case"block-map":return yield*this.blockMap(e);case"block-seq":return yield*this.blockSequence(e);case"flow-collection":return yield*this.flowCollection(e);case"doc-end":return yield*this.documentEnd(e)}yield*this.pop()}peek(e){return this.stack[this.stack.length-e]}*pop(e){let t=e??this.stack.pop();if(!t)yield{type:"error",offset:this.offset,source:"",message:"Tried to pop an empty stack"};else if(this.stack.length===0)yield t;else{let n=this.peek(1);switch(t.type==="block-scalar"?t.indent="indent"in n?n.indent:0:t.type==="flow-collection"&&n.type==="document"&&(t.indent=0),t.type==="flow-collection"&&So(t),n.type){case"document":n.value=t;break;case"block-scalar":n.props.push(t);break;case"block-map":{let i=n.items[n.items.length-1];if(i.value){n.items.push({start:[],key:t,sep:[]}),this.onKeyLine=!0;return}else if(i.sep)i.value=t;else{Object.assign(i,{key:t,sep:[]}),this.onKeyLine=!i.explicitKey;return}break}case"block-seq":{let i=n.items[n.items.length-1];i.value?n.items.push({start:[],value:t}):i.value=t;break}case"flow-collection":{let i=n.items[n.items.length-1];!i||i.value?n.items.push({start:[],key:t,sep:[]}):i.sep?i.value=t:Object.assign(i,{key:t,sep:[]});return}default:yield*this.pop(),yield*this.pop(t)}if((n.type==="document"||n.type==="block-map"||n.type==="block-seq")&&(t.type==="block-map"||t.type==="block-seq")){let i=t.items[t.items.length-1];i&&!i.sep&&!i.value&&i.start.length>0&&vo(i.start)===-1&&(t.indent===0||i.start.every(r=>r.type!=="comment"||r.indent<t.indent))&&(n.type==="document"?n.end=i.start:n.items.push({start:i.start}),t.items.splice(-1,1))}}}*stream(){switch(this.type){case"directive-line":yield{type:"directive",offset:this.offset,source:this.source};return;case"byte-order-mark":case"space":case"comment":case"newline":yield this.sourceToken;return;case"doc-mode":case"doc-start":{let e={type:"document",offset:this.offset,start:[]};this.type==="doc-start"&&e.start.push(this.sourceToken),this.stack.push(e);return}}yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML stream`,source:this.source}}*document(e){if(e.value)return yield*this.lineEnd(e);switch(this.type){case"doc-start":{vo(e.start)!==-1?(yield*this.pop(),yield*this.step()):e.start.push(this.sourceToken);return}case"anchor":case"tag":case"space":case"comment":case"newline":e.start.push(this.sourceToken);return}let t=this.startBlockValue(e);t?this.stack.push(t):yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML document`,source:this.source}}*scalar(e){if(this.type==="map-value-ind"){let t=Vt(this.peek(2)),n=be(t),i;e.end?(i=e.end,i.push(this.sourceToken),delete e.end):i=[this.sourceToken];let r={type:"block-map",offset:e.offset,indent:e.indent,items:[{start:n,key:e,sep:i}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=r}else yield*this.lineEnd(e)}*blockScalar(e){switch(this.type){case"space":case"comment":case"newline":e.props.push(this.sourceToken);return;case"scalar":if(e.source=this.source,this.atNewLine=!0,this.indent=0,this.onNewLine){let t=this.source.indexOf(`
`)+1;for(;t!==0;)this.onNewLine(this.offset+t),t=this.source.indexOf(`
`,t)+1}yield*this.pop();break;default:yield*this.pop(),yield*this.step()}}*blockMap(e){let t=e.items[e.items.length-1];switch(this.type){case"newline":if(this.onKeyLine=!1,t.value){let n="end"in t.value?t.value.end:void 0;(Array.isArray(n)?n[n.length-1]:void 0)?.type==="comment"?n?.push(this.sourceToken):e.items.push({start:[this.sourceToken]})}else t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"space":case"comment":if(t.value)e.items.push({start:[this.sourceToken]});else if(t.sep)t.sep.push(this.sourceToken);else{if(this.atIndentedComment(t.start,e.indent)){let i=e.items[e.items.length-2]?.value?.end;if(Array.isArray(i)){Array.prototype.push.apply(i,t.start),i.push(this.sourceToken),e.items.pop();return}}t.start.push(this.sourceToken)}return}if(this.indent>=e.indent){let n=!this.onKeyLine&&this.indent===e.indent,i=n&&(t.sep||t.explicitKey)&&this.type!=="seq-item-ind",r=[];if(i&&t.sep&&!t.value){let o=[];for(let a=0;a<t.sep.length;++a){let l=t.sep[a];switch(l.type){case"newline":o.push(a);break;case"space":break;case"comment":l.indent>e.indent&&(o.length=0);break;default:o.length=0}}o.length>=2&&(r=t.sep.splice(o[1]))}switch(this.type){case"anchor":case"tag":i||t.value?(r.push(this.sourceToken),e.items.push({start:r}),this.onKeyLine=!0):t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"explicit-key-ind":!t.sep&&!t.explicitKey?(t.start.push(this.sourceToken),t.explicitKey=!0):i||t.value?(r.push(this.sourceToken),e.items.push({start:r,explicitKey:!0})):this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken],explicitKey:!0}]}),this.onKeyLine=!0;return;case"map-value-ind":if(t.explicitKey)if(t.sep)if(t.value)e.items.push({start:[],key:null,sep:[this.sourceToken]});else if(Z(t.sep,"map-value-ind"))this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:r,key:null,sep:[this.sourceToken]}]});else if(ko(t.key)&&!Z(t.sep,"newline")){let o=be(t.start),a=t.key,l=t.sep;l.push(this.sourceToken),delete t.key,delete t.sep,this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:o,key:a,sep:l}]})}else r.length>0?t.sep=t.sep.concat(r,this.sourceToken):t.sep.push(this.sourceToken);else if(Z(t.start,"newline"))Object.assign(t,{key:null,sep:[this.sourceToken]});else{let o=be(t.start);this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:o,key:null,sep:[this.sourceToken]}]})}else t.sep?t.value||i?e.items.push({start:r,key:null,sep:[this.sourceToken]}):Z(t.sep,"map-value-ind")?this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[],key:null,sep:[this.sourceToken]}]}):t.sep.push(this.sourceToken):Object.assign(t,{key:null,sep:[this.sourceToken]});this.onKeyLine=!0;return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{let o=this.flowScalar(this.type);i||t.value?(e.items.push({start:r,key:o,sep:[]}),this.onKeyLine=!0):t.sep?this.stack.push(o):(Object.assign(t,{key:o,sep:[]}),this.onKeyLine=!0);return}default:{let o=this.startBlockValue(e);if(o){if(o.type==="block-seq"){if(!t.explicitKey&&t.sep&&!Z(t.sep,"newline")){yield*this.pop({type:"error",offset:this.offset,message:"Unexpected block-seq-ind on same line with key",source:this.source});return}}else n&&e.items.push({start:r});this.stack.push(o);return}}}}yield*this.pop(),yield*this.step()}*blockSequence(e){let t=e.items[e.items.length-1];switch(this.type){case"newline":if(t.value){let n="end"in t.value?t.value.end:void 0;(Array.isArray(n)?n[n.length-1]:void 0)?.type==="comment"?n?.push(this.sourceToken):e.items.push({start:[this.sourceToken]})}else t.start.push(this.sourceToken);return;case"space":case"comment":if(t.value)e.items.push({start:[this.sourceToken]});else{if(this.atIndentedComment(t.start,e.indent)){let i=e.items[e.items.length-2]?.value?.end;if(Array.isArray(i)){Array.prototype.push.apply(i,t.start),i.push(this.sourceToken),e.items.pop();return}}t.start.push(this.sourceToken)}return;case"anchor":case"tag":if(t.value||this.indent<=e.indent)break;t.start.push(this.sourceToken);return;case"seq-item-ind":if(this.indent!==e.indent)break;t.value||Z(t.start,"seq-item-ind")?e.items.push({start:[this.sourceToken]}):t.start.push(this.sourceToken);return}if(this.indent>e.indent){let n=this.startBlockValue(e);if(n){this.stack.push(n);return}}yield*this.pop(),yield*this.step()}*flowCollection(e){let t=e.items[e.items.length-1];if(this.type==="flow-error-end"){let n;do yield*this.pop(),n=this.peek(1);while(n&&n.type==="flow-collection")}else if(e.end.length===0){switch(this.type){case"comma":case"explicit-key-ind":!t||t.sep?e.items.push({start:[this.sourceToken]}):t.start.push(this.sourceToken);return;case"map-value-ind":!t||t.value?e.items.push({start:[],key:null,sep:[this.sourceToken]}):t.sep?t.sep.push(this.sourceToken):Object.assign(t,{key:null,sep:[this.sourceToken]});return;case"space":case"comment":case"newline":case"anchor":case"tag":!t||t.value?e.items.push({start:[this.sourceToken]}):t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{let i=this.flowScalar(this.type);!t||t.value?e.items.push({start:[],key:i,sep:[]}):t.sep?this.stack.push(i):Object.assign(t,{key:i,sep:[]});return}case"flow-map-end":case"flow-seq-end":e.end.push(this.sourceToken);return}let n=this.startBlockValue(e);n?this.stack.push(n):(yield*this.pop(),yield*this.step())}else{let n=this.peek(2);if(n.type==="block-map"&&(this.type==="map-value-ind"&&n.indent===e.indent||this.type==="newline"&&!n.items[n.items.length-1].sep))yield*this.pop(),yield*this.step();else if(this.type==="map-value-ind"&&n.type!=="flow-collection"){let i=Vt(n),r=be(i);So(e);let o=e.end.splice(1,e.end.length);o.push(this.sourceToken);let a={type:"block-map",offset:e.offset,indent:e.indent,items:[{start:r,key:e,sep:o}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=a}else yield*this.lineEnd(e)}}flowScalar(e){if(this.onNewLine){let t=this.source.indexOf(`
`)+1;for(;t!==0;)this.onNewLine(this.offset+t),t=this.source.indexOf(`
`,t)+1}return{type:e,offset:this.offset,indent:this.indent,source:this.source}}startBlockValue(e){switch(this.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return this.flowScalar(this.type);case"block-scalar-header":return{type:"block-scalar",offset:this.offset,indent:this.indent,props:[this.sourceToken],source:""};case"flow-map-start":case"flow-seq-start":return{type:"flow-collection",offset:this.offset,indent:this.indent,start:this.sourceToken,items:[],end:[]};case"seq-item-ind":return{type:"block-seq",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken]}]};case"explicit-key-ind":{this.onKeyLine=!0;let t=Vt(e),n=be(t);return n.push(this.sourceToken),{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:n,explicitKey:!0}]}}case"map-value-ind":{this.onKeyLine=!0;let t=Vt(e),n=be(t);return{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:n,key:null,sep:[this.sourceToken]}]}}}return null}atIndentedComment(e,t){return this.type!=="comment"||this.indent<=t?!1:e.every(n=>n.type==="newline"||n.type==="space")}*documentEnd(e){this.type!=="doc-mode"&&(e.end?e.end.push(this.sourceToken):e.end=[this.sourceToken],this.type==="newline"&&(yield*this.pop()))}*lineEnd(e){switch(this.type){case"comma":case"doc-start":case"doc-end":case"flow-seq-end":case"flow-map-end":case"map-value-ind":yield*this.pop(),yield*this.step();break;case"newline":this.onKeyLine=!1;case"space":case"comment":default:e.end?e.end.push(this.sourceToken):e.end=[this.sourceToken],this.type==="newline"&&(yield*this.pop())}}};Ao.Parser=_n});var Oo=g(ze=>{"use strict";var No=bn(),gf=Fe(),We=Ye(),yf=ms(),bf=L(),wf=Tn(),Lo=xn();function Co(s){let e=s.prettyErrors!==!1;return{lineCounter:s.lineCounter||e&&new wf.LineCounter||null,prettyErrors:e}}function vf(s,e={}){let{lineCounter:t,prettyErrors:n}=Co(e),i=new Lo.Parser(t?.addNewLine),r=new No.Composer(e),o=Array.from(r.compose(i.parse(s)));if(n&&t)for(let a of o)a.errors.forEach(We.prettifyError(s,t)),a.warnings.forEach(We.prettifyError(s,t));return o.length>0?o:Object.assign([],{empty:!0},r.streamInfo())}function Eo(s,e={}){let{lineCounter:t,prettyErrors:n}=Co(e),i=new Lo.Parser(t?.addNewLine),r=new No.Composer(e),o=null;for(let a of r.compose(i.parse(s),!0,s.length))if(!o)o=a;else if(o.options.logLevel!=="silent"){o.errors.push(new We.YAMLParseError(a.range.slice(0,2),"MULTIPLE_DOCS","Source contains multiple documents; please use YAML.parseAllDocuments()"));break}return n&&t&&(o.errors.forEach(We.prettifyError(s,t)),o.warnings.forEach(We.prettifyError(s,t))),o}function Sf(s,e,t){let n;typeof e=="function"?n=e:t===void 0&&e&&typeof e=="object"&&(t=e);let i=Eo(s,t);if(!i)return null;if(i.warnings.forEach(r=>yf.warn(i.options.logLevel,r)),i.errors.length>0){if(i.options.logLevel!=="silent")throw i.errors[0];i.errors=[]}return i.toJS(Object.assign({reviver:n},t))}function kf(s,e,t){let n=null;if(typeof e=="function"||Array.isArray(e)?n=e:t===void 0&&e&&(t=e),typeof t=="string"&&(t=t.length),typeof t=="number"){let i=Math.round(t);t=i<1?void 0:i>8?{indent:8}:{indent:i}}if(s===void 0){let{keepUndefined:i}=t??e??{};if(!i)return}return bf.isDocument(s)&&!n?s.toString(t):new gf.Document(s,n,t).toString(t)}ze.parse=Sf;ze.parseAllDocuments=vf;ze.parseDocument=Eo;ze.stringify=kf});var Mn=g(C=>{"use strict";var Af=bn(),Nf=Fe(),Lf=Xs(),In=Ye(),Cf=Ne(),ee=L(),Ef=W(),Of=O(),qf=X(),Tf=Q(),_f=Gt(),xf=On(),If=Tn(),Mf=xn(),Ht=Oo(),qo=ve();C.Composer=Af.Composer;C.Document=Nf.Document;C.Schema=Lf.Schema;C.YAMLError=In.YAMLError;C.YAMLParseError=In.YAMLParseError;C.YAMLWarning=In.YAMLWarning;C.Alias=Cf.Alias;C.isAlias=ee.isAlias;C.isCollection=ee.isCollection;C.isDocument=ee.isDocument;C.isMap=ee.isMap;C.isNode=ee.isNode;C.isPair=ee.isPair;C.isScalar=ee.isScalar;C.isSeq=ee.isSeq;C.Pair=Ef.Pair;C.Scalar=Of.Scalar;C.YAMLMap=qf.YAMLMap;C.YAMLSeq=Tf.YAMLSeq;C.CST=_f;C.Lexer=xf.Lexer;C.LineCounter=If.LineCounter;C.Parser=Mf.Parser;C.parse=Ht.parse;C.parseAllDocuments=Ht.parseAllDocuments;C.parseDocument=Ht.parseDocument;C.stringify=Ht.stringify;C.visit=qo.visit;C.visitAsync=qo.visitAsync});function R(s){let e=atob(s),t=Uint8Array.from(e,n=>n.charCodeAt(0));return new TextDecoder("utf-8").decode(t)}var Qo=R("aHR0cHM6Ly90LmFsY3kuY2MveWN5"),Zo=R("aHR0cHM6Ly9zdWItc3RvcnQtbm9kZWpzLnBhZ2VzLmRldg=="),ea=R("aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL0t3aXNtYS9jZi13b3JrZXItbWlob21vL21haW4vQ29uZmlnL01paG9tb19saXRlLnlhbWw="),ta=R("aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL0t3aXNtYS9jZi13b3JrZXItbWlob21vL3JlZnMvaGVhZHMvbWFpbi9Db25maWcvc2luZ2JveF8xLjExLlguanNvbg=="),sa=R("aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL0t3aXNtYS9jZi13b3JrZXItbWlob21vL3JlZnMvaGVhZHMvbWFpbi9Db25maWcvc2luZ2JveC0xLjEyLlguanNvbg=="),na=R("aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL0t3aXNtYS9jZi13b3JrZXItbWlob21vL3JlZnMvaGVhZHMvbWFpbi9Db25maWcvc2luZ2JveC0xLjEyLlguYWxwaGEuanNvbg=="),ia=R("aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL0t3aXNtYS9jZi13b3JrZXItbWlob21vL3JlZnMvaGVhZHMvbWFpbi9Db25maWcvc2luZ2JveC0xLjEzLlguanNvbg=="),ra=R("6JCMSUNQ5aSHMjAyNTAwMDHlj7c="),oa=R("aHR0cHM6Ly90Lm1lL01hcmlzYV9rcmlzdGk=");function Kn(s={}){return{backgroundImage:s.IMG||Qo,subApi:s.SUB||Zo,mihomoTop:s.MIHOMOTOP||ea,singbox_1_11:s.SINGBOX_1_11||ta,singbox_1_12:s.SINGBOX_1_12||sa,singbox_1_12_alpha:s.SINGBOX_1_12_ALPHA||na,singbox_1_13:s.SINGBOX_1_13||ia,beianText:s.BEIAN||ra,beianUrl:s.BEIANURL||oa,customMihomoTemplate:s.MIHOMO||"",customSingboxTemplate:s.SINGBOX||""}}function Qe(s){let e=[],t=[];for(let n of s)n.startsWith("http://")||n.startsWith("https://")?e.push(n):t.push(n);return t.length>0&&e.push(t.join("|")),e}function Fn(s){let e=s.searchParams,t=e.getAll("url");return t.length===1&&t[0].includes(",")&&(t=t[0].split(",").map(n=>n.trim()).filter(Boolean)),{urls:t,template:e.get("template"),isSingbox:e.get("singbox")==="true",isMihomo:e.get("mihomo")==="true",isV2ray:e.get("v2ray")==="true",enableUdp:e.get("udp")==="true",enableUdpFrag:e.get("udp_frag")==="true",enableTlsFrag:e.get("tls_frag")==="true",excludePackage:e.get("ep")==="true",excludeAddress:e.get("ea")==="true",enableTailscale:e.get("tailscale")==="true",enableTun:e.get("tun")==="true",enableAdgDns:e.get("adgdns")==="true"}}var _o=Rn(Mn(),1);var To=Rn(Mn(),1),Pf="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3";async function B(s,e=Pf){let t;try{t=await fetch(s,{method:"GET",headers:{"User-Agent":e}})}catch(a){throw new Error(`\u7F51\u7EDC\u8BF7\u6C42\u5931\u8D25 [${s}]: ${a.message}`)}let n=Object.fromEntries(t.headers.entries()),i=$f(t.headers);i&&(n["content-disposition"]=i);let r=await t.text(),o=Df(r);return{status:t.status,headers:n,data:o}}function we(s,e,t){let n=new URLSearchParams({target:t,url:s,emoji:"true",list:"true",new_name:"true"});return`${e}/sub?${n}`}function Df(s){try{return To.default.parse(s,{maxAliasCount:-1,merge:!0})}catch{}try{return JSON.parse(s)}catch{}return s}function $f(s){let e=s.get("Content-Disposition")||s.get("content-disposition");if(!e)return null;let t=e.match(/filename="?([^"]+)"?/);if(!t)return null;let n=t[1];return/[^\x00-\x7F]/.test(n)?`attachment; filename="download.json"; filename*=UTF-8''${encodeURIComponent(n)}`:e}async function Wt(s){return B(s)}async function zt(s){if(!s)throw new Error("\u7F3A\u5C11\u89C4\u5219\u6A21\u677F\uFF0C\u8BF7\u901A\u8FC7 template \u53C2\u6570\u6307\u5B9A\u914D\u7F6E\u6587\u4EF6\u5730\u5740");return B(s)}async function Xt(){let s=["https://github.com/mnixry/direct-android-ruleset/raw/refs/heads/rules/@Merged/GAME.mutated.yaml","https://github.com/mnixry/direct-android-ruleset/raw/refs/heads/rules/@Merged/APP.mutated.yaml"],e=["\u6D4F\u89C8\u5668"],t=new Set(["com.android.chrome"]),n=new Set,i="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3";for(let r of s){let o;try{o=await fetch(r,{headers:{"user-agent":i}})}catch{console.error(`[fetchAndroidPackageList] \u8BF7\u6C42\u5931\u8D25: ${r}`);continue}if(!o.ok){console.error(`[fetchAndroidPackageList] \u975E 2xx \u54CD\u5E94: ${r} - ${o.status}`);continue}let a=await o.text();for(let l of a.split(`
`)){let c=l.match(/PROCESS-NAME\s*,\s*([^\s,]+)/);if(!c)continue;let p=c[1];!e.some(f=>l.includes(f))&&!t.has(p)&&n.add(p)}}return[...n]}async function Qt(){let s=["https://raw.githubusercontent.com/Kwisma/clash-rules/release/cncidr.yaml"],e=[],t="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3";for(let n of s){let i;try{i=await fetch(n,{headers:{"user-agent":t}})}catch{console.error(`[fetchCnIpCidrList] \u8BF7\u6C42\u5931\u8D25: ${n}`);continue}if(!i.ok){console.error(`[fetchCnIpCidrList] \u975E 2xx \u54CD\u5E94: ${n} - ${i.status}`);continue}let r=await i.text(),o=_o.default.parse(r,{maxAliasCount:-1,merge:!0});Array.isArray(o?.payload)&&e.push(...o.payload)}return e}async function xo(s){return s.urls.length===1?Bf(s.urls[0],s):Rf(s)}async function Bf(s,e){let t=await Io(s,e);return Pn(t)?(Mo(t.data.proxies,e.enableUdp,null),{status:t.status,headers:t.headers,data:{...t.data,providers:{}}}):null}async function Rf(s){let e=[],t=[];for(let i=0;i<s.urls.length;i++){let r=await Io(s.urls[i],s);Pn(r)&&(Mo(r.data.proxies,s.enableUdp,i+1),e.push(...r.data.proxies),t.push({status:r.status,headers:r.headers}))}if(t.length===0)return null;let n=t[Math.floor(Math.random()*t.length)];return{status:n.status,headers:n.headers,data:{proxies:e,providers:{}}}}async function Io(s,e){let t=await B(s,e.userAgent);if(Pn(t))return t;let n=we(s,e.subApi,"clash.meta");return B(n,e.userAgent)}function Pn(s){return Array.isArray(s?.data?.proxies)&&s.data.proxies.length>0}function Mo(s,e,t){for(let n of s)t!==null&&(n.name=`${n.name} [${t}]`),e&&(n.udp=!0)}var Kf=/meta|clash\.meta|clash|clashverge|mihomo/i;async function Po(s){if(!Kf.test(s.userAgent))throw new Error("\u4E0D\u652F\u6301\u7684\u5BA2\u6237\u7AEF\uFF0C\u8BF7\u4F7F\u7528 Mihomo / Clash Meta \u5BA2\u6237\u7AEF\u8BBF\u95EE");s.urls=Qe(s.urls);let[e,t,n,i,r]=await Promise.all([Wt(s.mihomoTop),zt(s.template),xo(s),s.excludePackage?Xt():null,s.excludeAddress?Qt():null]);if(s.resolvedExcludePackages=i,s.resolvedExcludeAddresses=r,!n?.data?.proxies?.length)throw new Error("\u8282\u70B9\u4E3A\u7A7A\uFF0C\u8BF7\u68C0\u67E5\u8BA2\u9605\u94FE\u63A5\u662F\u5426\u6709\u6548");return t.data.proxies=[...t.data.proxies||[],...n.data.proxies],t.data["proxy-groups"]=jf(n.data,t.data),t.data["proxy-providers"]=n.data.providers,Ff(e.data,t.data,s),{status:n.status,headers:n.headers,data:JSON.stringify(e.data,null,4)}}function Ff(s,e,t){s["proxy-providers"]=e["proxy-providers"]||{},s.proxies=e.proxies||[],s["proxy-groups"]=e["proxy-groups"]||[],s.rules=e.rules||{},s["sub-rules"]=e["sub-rules"]||{},s["rule-providers"]={...s["rule-providers"]||{},...e["rule-providers"]||{}},s.tun&&(t.enableTun?s.tun.enable=!1:(t.excludeAddress&&t.resolvedExcludeAddresses&&(s.tun["route-address"]=["0.0.0.0/1","128.0.0.0/1","::/1","8000::/1"],s.tun["route-exclude-address"]=t.resolvedExcludeAddresses),t.excludePackage&&t.resolvedExcludePackages&&(s.tun["include-package"]=[],s.tun["exclude-package"]=t.resolvedExcludePackages))),t.enableAdgDns&&s.dns&&(s.dns.nameserver=["https://dns.adguard-dns.com/dns-query"],s.dns["nameserver-policy"]["RULE-SET:private_domain,cn_domain"]=["quic://dns.18bit.cn"])}function jf(s,e){let t=[],n=e["proxy-groups"].filter(i=>{if(typeof i.filter!="string")return!0;let r=/\(\?i\)/i.test(i.filter),o=i.filter.replace(/\(\?i\)/gi,""),a;try{a=new RegExp(o,r?"i":"")}catch{return console.warn(`[buildProxyGroups] \u65E0\u6548\u7684\u6B63\u5219\u8868\u8FBE\u5F0F: ${i.filter}`),!0}return!s.proxies.some(c=>a.test(c.name))&&(!i.proxies||i.proxies.length===0)?(t.push(i.name),!1):!0});for(let i of n)Array.isArray(i.proxies)&&(i.proxies=i.proxies.filter(r=>!t.some(o=>o.includes(r))));return n}async function Do(s){return s.urls.length===1?Uf(s.urls[0],s):Yf(s)}async function Uf(s,e){let t=await $o(s,e);return Dn(t)?(Bo(t.data.outbounds,e.enableUdpFrag,0),{status:t.status,headers:t.headers,data:t.data}):null}async function Yf(s){let e=[],t=[];for(let i=0;i<s.urls.length;i++){let r=await $o(s.urls[i],s);Dn(r)&&(Bo(r.data.outbounds,s.enableUdpFrag,i+1),e.push(...r.data.outbounds),t.push(r))}if(t.length===0)throw new Error("\u6240\u6709\u8BA2\u9605\u94FE\u63A5\u5747\u672A\u8FD4\u56DE\u6709\u6548\u7684 outbounds \u8282\u70B9");let n=t[Math.floor(Math.random()*t.length)];return{status:n.status,headers:n.headers,data:{outbounds:e}}}async function $o(s,e){let t=await B(s,e.userAgent);if(Dn(t))return t;let n=we(s,e.subApi,"singbox");return B(n,e.userAgent)}function Dn(s){return Array.isArray(s?.data?.outbounds)&&s.data.outbounds.length>0}function Bo(s,e,t){for(let n of s)t>0&&(n.tag=`${n.tag} [${t}]`),e&&(n.udp_fragment=!0)}var Gf=/singbox|sing-box|sfa/i,Jf=new Set(["direct","block","dns","selector","urltest"]);async function Ro(s){let e=Vf(s);s.urls=Qe(s.urls);let[t,n,i,r,o]=await Promise.all([Wt(e),zt(s.template),Do(s),s.excludePackage?Xt():null,s.excludeAddress?Qt():null]);if(s.resolvedExcludePackages=r,s.resolvedExcludeAddresses=o,!i?.data?.outbounds?.length)throw new Error("\u8282\u70B9\u4E3A\u7A7A\uFF0C\u8BF7\u4F7F\u7528\u6709\u6548\u7684\u8BA2\u9605\u94FE\u63A5");let a=Hf(i.data),l=a.map(c=>c.tag);return n.data.outbounds=Wf(n.data.outbounds,l),n.data.outbounds.push(...a),ed(t.data,n.data,s),{status:i.status,headers:i.headers,data:JSON.stringify(t.data,null,4)}}function Vf(s){if(!Gf.test(s.userAgent))throw new Error("\u4E0D\u652F\u6301\u7684\u5BA2\u6237\u7AEF\uFF0C\u8BF7\u4F7F\u7528 Singbox / Sing-Box \u5BA2\u6237\u7AEF\u8BBF\u95EE");let e=s.userAgent,t=e.match(/1\.12\.0-alpha\.(\d{1,2})\b/),n=e.match(/1\.12\.0-beta\.(\d{1,2})\b/),i=e.match(/1\.11\.(\d+)/),r=e.match(/1\.12\.(\d+)/),o=e.match(/1\.13\.(\d+)/);if(t){let a=parseInt(t[1],10);if(a>=0&&a<=23)return s.singbox_1_12_alpha}if(n){let a=parseInt(n[1],10);if(a>=0&&a<=9)return s.enableTailscale=!1,s.enableTlsFrag=!1,s.singbox_1_11}if(i)return s.enableTailscale=!1,s.enableTlsFrag=!1,s.singbox_1_11;if(r)return s.singbox_1_12;if(o)return s.singbox_1_13;throw new Error(`\u4E0D\u652F\u6301\u7684 Singbox \u7248\u672C\uFF1A${e}`)}function Hf(s){return Array.isArray(s.outbounds)?s.outbounds.filter(e=>!(Jf.has(e.type)||e?.server===""||e?.server_port<1||e?.password==="")):[]}function Wf(s,e){let t=s.map(n=>{let{matchedTags:i,hasFilter:r}=zf(n,e);return Qf(n,i,r)});return Zf(t)}function zf(s,e){if(!Array.isArray(s.filter))return{matchedTags:[],hasFilter:!1};let t=[],n=!1;for(let i of s.filter){if(i.action==="all"){t=[...t,...e],n=!0;continue}if(!i.keywords||typeof i.keywords!="string")continue;let r=/\(\?i\)/i.test(i.keywords),o=i.keywords.replace(/\(\?i\)/gi,""),a=new RegExp(o,r?"i":""),l=Xf(e,a,i.action);t=[...t,...l],n=!0}return{matchedTags:[...new Set(t)],hasFilter:n}}function Xf(s,e,t){switch(t){case"include":return s.filter(n=>e.test(n));case"exclude":return s.filter(n=>!e.test(n));default:return[]}}function Qf(s,e,t){return e.length>0&&(s.outbounds=s.outbounds?[...new Set([...s.outbounds,...e])]:e),delete s.filter,s}function Zf(s){let e=s.filter(n=>!n.outbounds||Array.isArray(n.outbounds)&&n.outbounds.length===0).map(n=>n.tag).filter(Boolean);return s.map(n=>(Array.isArray(n.outbounds)&&(n.outbounds=n.outbounds.filter(i=>!e.includes(i))),n)).filter(n=>Array.isArray(n.outbounds)&&n.outbounds.length>0)}function ed(s,e,t){let n=new Map;for(let i of Array.isArray(s.route?.rule_set)?s.route.rule_set:[])i?.tag&&n.set(i.tag,i);for(let i of Array.isArray(e.route?.rule_set)?e.route.rule_set:[])i?.tag&&n.set(i.tag,i);if(s.inbounds=e?.inbounds||s.inbounds,s.outbounds=[...Array.isArray(s.outbounds)?s.outbounds:[],...Array.isArray(e?.outbounds)?e.outbounds:[]],s.route.final=e?.route?.final||s.route.final,s.route.rules=[...Array.isArray(s.route.rules)?s.route.rules:[],...Array.isArray(e?.route?.rules)?e.route.rules:[]],s.route.rule_set=Array.from(n.values()),t.enableTun?s.inbounds=s.inbounds.filter(i=>i.type!=="tun"):(t.excludePackage&&t.resolvedExcludePackages&&td(s,t.resolvedExcludePackages),t.excludeAddress&&t.resolvedExcludeAddresses&&sd(s,t.resolvedExcludeAddresses)),t.enableTailscale&&(s.dns.servers.push({type:"tailscale",endpoint:"ts-ep",accept_default_resolvers:!0}),s.endpoints=s.endpoints||[],s.endpoints.push({type:"tailscale",tag:"ts-ep",auth_key:"",hostname:"singbox-tailscale",udp_timeout:"5m"})),/ref1nd/i.test(t.userAgent))for(let i of s.route.rules)i.action==="resolve"&&(i.match_only=!0);s.route.rules=s.route.rules.flatMap(i=>i.action!=="route-options"?i:!t.enableUdp&&!t.enableTlsFrag?[]:(t.enableUdp&&(i.udp_disable_domain_unmapping=!0,i.udp_connect=!0,i.udp_timeout="5m"),t.enableTlsFrag&&(i.tls_fragment=!0,i.tls_fragment_fallback_delay="5m"),i)),t.enableAdgDns&&(s.dns.servers=s.dns.servers.map(i=>i.tag==="DIRECT-DNS"?{type:"quic",tag:"DIRECT-DNS",detour:"\u{1F3AF} \u5168\u7403\u76F4\u8FDE",server_port:853,server:"dns.18bit.cn",domain_resolver:"local"}:i.tag==="PROXY-DNS"?{type:"https",tag:"PROXY-DNS",detour:"\u{1F680} \u8282\u70B9\u9009\u62E9",server_port:443,server:"dns.adguard-dns.com",domain_resolver:"local"}:i))}function td(s,e){for(let t of s.inbounds)t.type==="tun"&&(Array.isArray(t.exclude_package)||(t.exclude_package=[]),t.exclude_package=[...new Set([...t.exclude_package,...e])])}function sd(s,e){for(let t of s.inbounds)t.type==="tun"&&(t.route_address=["0.0.0.0/1","128.0.0.0/1","::/1","8000::/1"],Array.isArray(t.route_exclude_address)||(t.route_exclude_address=[]),t.route_exclude_address=[...new Set([...t.route_exclude_address,...e])])}async function Ko(s){let e=we(s.urls.join(","),s.subApi,"v2ray"),t=await B(e,s.userAgent);if(t.data===void 0||t.data===null||t.data==="")throw new Error("\u83B7\u53D6\u8BA2\u9605\u6570\u636E\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u8BA2\u9605\u94FE\u63A5\u662F\u5426\u6709\u6548");return{status:t.status,headers:t.headers,data:t.data}}function Fo(s){return`
        :root {
            --primary-color: #4361ee;
            --primary-light: #4895ef;
            --primary-dark: #3f37c9;
            --secondary-color: #4cc9f0;
            --bg-color: #f8f9fa;
            --card-bg: #ffffff;
            --text-primary: #2b2d42;
            --text-secondary: #6c757d;
            --border-color: #e9ecef;
            --success-color: #4cc9f0;
            --error-color: #f72585;
            --warning-color: #f9c74f;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            background-image: url(${s.backgroundImage});
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            background-color: var(--bg-color);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: var(--text-primary);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            padding: 20px;
            align-items: center;
            position: relative;
        }

        .container {
            position: relative;
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            max-width: 600px;
            width: 100%;
            padding: 1.5rem;
            border-radius: 24px;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08),
                inset 0 0 0 1px rgba(255, 255, 255, 0.5);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            z-index: 1;
            margin-top: 40px;
        }

        .container:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12),
                inset 0 0 0 1px rgba(255, 255, 255, 0.8);
        }

        h1 {
            text-align: center;
            margin-bottom: 0.5rem;
            font-size: 2rem;
            font-weight: 700;
            letter-spacing: -0.5px;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
        }

        .input-group {
            margin-bottom: 0.5rem;
        }

        .link-input {
            flex: 1;
            min-width: 0;
            margin-top: 0;
            padding: 12px 16px;
            border: 2px solid var(--border-color);
            border-radius: 12px;
            font-size: 1rem;
            transition: all 0.3s ease;
            box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.03);
            background-color: white;
        }

        .link-row {
            display: flex;
            align-items: center;
            position: relative;
            margin-bottom: 12px;
            gap: 12px;
        }

        .add-btn {
            flex-shrink: 0;
            width: 42px;
            height: 42px;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            color: white;
            box-shadow: 0 4px 12px rgba(67, 97, 238, 0.3);
            border: none;
            font-size: 1.2rem;
        }

        .add-btn:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 16px rgba(67, 97, 238, 0.4);
        }

        label {
            display: block;
            margin-bottom: 0.5rem;
            color: var(--text-secondary);
            font-weight: 500;
            font-size: 0.95rem;
        }

        input {
            width: 100%;
            padding: 12px 16px;
            border: 2px solid var(--border-color);
            border-radius: 12px;
            font-size: 1rem;
            transition: all 0.3s ease;
            box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.03);
            background-color: white;
        }

        input:focus {
            outline: none;
            border-color: var(--primary-color);
            box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.15),
                inset 0 2px 4px rgba(0, 0, 0, 0.03);
        }

        button {
            width: 100%;
            padding: 14px 24px;
            background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
            color: white;
            border: none;
            border-radius: 12px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-bottom: 0.5rem;
            position: relative;
            overflow: hidden;
            box-shadow: 0 6px 16px rgba(67, 97, 238, 0.3);
        }

        button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: all 0.6s ease;
        }

        button:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(67, 97, 238, 0.4);
        }

        button:hover::before {
            left: 100%;
        }

        button:active {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(67, 97, 238, 0.3);
        }

        #result {
            background-color: #f8f9fa;
            font-family: monospace;
            word-break: break-all;
            padding: 14px 16px !important;
            border: 2px solid var(--border-color);
            border-radius: 12px;
            position: relative;
            transition: all 0.3s ease;
        }

        #result:hover {
            border-color: var(--primary-color);
            box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.1);
        }

        .github-corner {
            position: absolute;
            top: 0;
            right: 0;
            z-index: 1000;
        }

        .github-corner svg {
            fill: var(--primary-color);
            color: var(--card-bg);
            position: absolute;
            top: 0;
            right: 0;
            border: 0;
            width: 80px;
            height: 80px;
            transition: transform 0.3s ease;
        }

        .github-corner:hover svg {
            transform: scale(1.1);
        }

        .github-corner:hover .octo-arm {
            animation: octocat-wave 560ms ease-in-out;
        }

        @keyframes octocat-wave {
            0%, 100% { transform: rotate(0); }
            20%, 60%  { transform: rotate(-25deg); }
            40%, 80%  { transform: rotate(10deg); }
        }

        .logo-title {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 0.5rem;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid var(--border-color);
        }

        .beian-info {
            text-align: center;
            font-size: 13px;
            color: var(--text-secondary);
            margin-top: 0.5rem;
            padding-top: 0.5rem;
            border-top: 1px solid var(--border-color);
        }

        .beian-info a {
            color: var(--primary-color);
            text-decoration: none;
            border-bottom: 1px dashed var(--primary-color);
            padding-bottom: 2px;
            transition: all 0.3s ease;
        }

        .beian-info a:hover {
            border-bottom-style: solid;
            color: var(--primary-dark);
        }

        #qrcode {
            display: none;
            justify-content: center;
            align-items: center;
            margin-top: 20px;
            padding: 15px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        #qrcode.show {
            display: flex;
        }

        .template-selector {
            position: relative;
            margin-bottom: 0.5rem;
        }

        .template-toggle {
            padding: 14px 16px;
            background-color: rgba(67, 97, 238, 0.08);
            font-weight: 600;
            cursor: pointer;
            border-radius: 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: all 0.3s ease;
            border: 2px solid transparent;
        }

        .template-toggle:hover {
            background-color: rgba(67, 97, 238, 0.15);
            border-color: rgba(67, 97, 238, 0.2);
        }

        .template-toggle:after {
            content: "\u25B6";
            font-size: 12px;
            transition: transform 0.3s ease;
            margin-left: 8px;
        }

        .template-toggle.collapsed:after {
            transform: rotate(90deg);
        }

        .template-options {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            z-index: 1000;
            background-color: white;
            border-radius: 0 0 12px 12px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
            display: none;
            max-height: 250px;
            overflow-y: auto;
            border: 2px solid var(--border-color);
            border-top: none;
            transition: all 0.3s ease;
        }

        .template-options.show {
            display: block;
            animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
            from { opacity: 0; transform: translateY(-10px); }
            to   { opacity: 1; transform: translateY(0); }
        }

        .template-option {
            padding: 12px 20px;
            cursor: pointer;
            transition: all 0.2s ease;
            border-bottom: 1px solid var(--border-color);
            font-size: 0.95rem;
        }

        .template-option:last-child {
            border-bottom: none;
        }

        .template-option:hover {
            background-color: rgba(67, 97, 238, 0.1);
            padding-left: 24px;
        }

        .template-option.selected {
            background-color: rgba(67, 97, 238, 0.15);
            font-weight: 600;
            color: var(--primary-dark);
        }

        .config-toggle {
            display: flex;
            justify-content: center;
            margin-bottom: 0.5rem;
            background: rgba(67, 97, 238, 0.08);
            border-radius: 12px;
            padding: 6px;
            border: 2px solid transparent;
        }

        .toggle-option {
            padding: 10px 20px;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 600;
            text-align: center;
            flex: 1;
            position: relative;
            overflow: hidden;
            font-size: 0.95rem;
        }

        .toggle-option.active {
            background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
            color: white;
            box-shadow: 0 4px 12px rgba(67, 97, 238, 0.3);
        }

        .toggle-option:not(.active):hover {
            background-color: rgba(67, 97, 238, 0.15);
            transform: translateY(-1px);
        }

        .mode-options {
            display: none;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .mode-options.active {
            display: block;
            opacity: 1;
            animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to   { opacity: 1; transform: translateY(0); }
        }

        .tip-icon {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
            font-weight: bold;
            font-size: 12px;
            cursor: pointer;
            user-select: none;
            transition: all 0.3s ease;
            box-shadow: 0 2px 6px rgba(67, 97, 238, 0.3);
        }

        .tip-icon:hover {
            transform: scale(1.1);
            box-shadow: 0 3px 8px rgba(67, 97, 238, 0.4);
        }

        .tip-wrapper {
            position: relative;
            display: inline-block;
        }

        .tip-panel {
            opacity: 0;
            visibility: hidden;
            position: absolute;
            top: 28px;
            left: 0;
            min-width: 280px;
            max-width: 340px;
            max-height: 50vh;
            background: white;
            color: var(--text-primary);
            font-size: 14px;
            border-radius: 12px;
            padding: 16px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            white-space: normal;
            line-height: 1.6;
            overflow-y: auto;
            overflow-x: hidden;
            word-break: break-word;
            transition: all 0.3s ease;
            border: 2px solid var(--border-color);
        }

        .tip-panel::before {
            content: '';
            position: absolute;
            top: -10px;
            left: 10px;
            width: 20px;
            height: 20px;
            background: white;
            transform: rotate(45deg);
            border-top: 2px solid var(--border-color);
            border-left: 2px solid var(--border-color);
        }

        .tip-panel ul {
            margin: 8px 0;
            padding-left: 20px;
            list-style-type: disc;
        }

        .tip-panel li {
            margin-bottom: 6px;
        }

        .tip-panel strong,
        .tip-panel b {
            font-weight: bold;
            color: var(--primary-color);
            display: block;
            margin-top: 10px;
        }

        .tip-wrapper.active .tip-panel {
            opacity: 1;
            visibility: visible;
        }

        .protocol-options {
            display: flex;
            gap: 1px;
            margin-top: 12px;
            flex-wrap: wrap;
        }

        .protocol-checkbox {
            display: flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
            user-select: none;
            transition: all 0.3s ease;
            padding: 8px 12px;
            border-radius: 8px;
        }

        .protocol-checkbox:hover {
            background-color: rgba(67, 97, 238, 0.08);
        }

        .protocol-checkbox input {
            width: auto;
            margin: 0;
            cursor: pointer;
        }

        /* \u54CD\u5E94\u5F0F\u8BBE\u8BA1 */
        @media (max-width: 768px) {
            .container {
                padding: 1.5rem;
                margin: 10px;
                border-radius: 20px;
            }
            h1 { font-size: 1.8rem; }
            .toggle-option { padding: 8px 12px; font-size: 0.9rem; }
            .protocol-options { gap: 1px; }
        }

        @media (max-width: 480px) {
            body { padding: 10px; }
            .container { padding: 1.5rem; border-radius: 16px; }
            h1 { font-size: 1.6rem; }
            .link-input { padding: 10px 12px; font-size: 0.9rem; }
            .add-btn { width: 38px; height: 38px; font-size: 1rem; }
            button { padding: 12px 20px; font-size: 0.95rem; }
        }
    `}function jo(s="",e=""){let t={mihomo:[{label:"\u901A\u7528",options:[{label:"\u9ED8\u8BA4(\u7CBE\u7B80\u7248) (\u4EC5\u56FD\u5185\u5916\u5206\u6D41) (\u4E0EGithub\u540C\u6B65)",value:"https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/template/Mihomo_default.yaml"},{label:"\u9ED8\u8BA4(\u7CBE\u7B80\u7248) (\u4EC5\u56FD\u5185\u5916\u5206\u6D41) (\u65E0\u53BB\u5E7F\u544A) (\u4E0EGithub\u540C\u6B65)",value:"https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/template/Mihomo_default_NoAds.yaml"},{label:"\u9ED8\u8BA4(mihomo\u5B98\u65B9\u7248) (\u4E0EGithub\u540C\u6B65)",value:"https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/template/Mihomo_official.yaml"},{label:"\u9ED8\u8BA4(mihomo\u5B98\u65B9\u7248) (\u65E0\u53BB\u5E7F\u544A) (\u4E0EGithub\u540C\u6B65)",value:"https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/template/Mihomo_official_NoAds.yaml"},{label:"\u9ED8\u8BA4(ACL4SSR_Online_Full) (\u4E0EGithub\u540C\u6B65)",value:"https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/template/Mihomo_ACL4SSR_Online_Full.yaml"},{label:"\u9ED8\u8BA4(ACL4SSR_Online_Full) (\u65E0\u53BB\u5E7F\u544A) (\u4E0EGithub\u540C\u6B65)",value:"https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/template/Mihomo_ACL4SSR_Online_Full_NoAds.yaml"},{label:"\u9ED8\u8BA4(\u5168\u5206\u7EC4) (\u4E0EGithub\u540C\u6B65)",value:"https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/template/Mihomo_default_full.yaml"},{label:"\u9ED8\u8BA4(\u5168\u5206\u7EC4) (\u65E0\u53BB\u5E7F\u544A) (\u4E0EGithub\u540C\u6B65)",value:"https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/template/Mihomo_default_full_NoAds.yaml"}]},{label:"Lanlan13-14",options:[{label:"configfull \u5168\u5206\u7EC4\u7248 (\u79CB\u98CE\u53BB\u5E7F\u544A) (\u4E0EGithub\u540C\u6B65)",value:"https://raw.githubusercontent.com/Lanlan13-14/Rules/main/configfull.yaml"},{label:"configfull_NoAd \u5168\u5206\u7EC4\u7248 (\u65E0\u53BB\u5E7F\u544A) (\u4E0EGithub\u540C\u6B65)",value:"https://raw.githubusercontent.com/Lanlan13-14/Rules/main/configfull_NoAd.yaml"},{label:"configfull_NoAd_lite \u5168\u5206\u7EC4\u7248 (\u65E0\u53BB\u5E7F\u544A) (\u7CBE\u7B80\u7248) (\u4E0EGithub\u540C\u6B65)",value:"https://raw.githubusercontent.com/Lanlan13-14/Rules/main/configfull_NoAd_lite.yaml"},{label:"configfull_lite \u5168\u5206\u7EC4\u7248 (\u7CBE\u7B80\u7248) (\u4E0EGithub\u540C\u6B65)",value:"https://raw.githubusercontent.com/Lanlan13-14/Rules/main/configfull_lite.yaml"}]},{label:"zhuqq2020",options:[{label:"ACL4SSR_Online_Full \u5168\u5305\u91CD\u5EA6\u7528\u6237\u4F7F\u7528 (\u4E0EGithub\u540C\u6B65)",value:"https://raw.githubusercontent.com/zhuqq2020/Mihomo-Party-ACL4SSR/main/ACL4SSR_Online_Full.yaml"},{label:"ACL4SSR_Online_Full_AdblockPlus \u66F4\u591A\u53BB\u5E7F\u544A (\u4E0EGithub\u540C\u6B65)",value:"https://raw.githubusercontent.com/zhuqq2020/Mihomo-Party-ACL4SSR/main/ACL4SSR_Online_Full_AdblockPlus.yaml"},{label:"ACL4SSR_Online_Full_Tiktok \u6296\u97F3\u5168\u91CF (\u4E0EGithub\u540C\u6B65)",value:"https://raw.githubusercontent.com/zhuqq2020/Mihomo-Party-ACL4SSR/main/ACL4SSR_Online_Full_Tiktok.yaml"},{label:"ACL4SSR_Online_Full_WithIcon (\u65E0\u56FE\u6807) (\u4E0EGithub\u540C\u6B65)",value:"https://raw.githubusercontent.com/zhuqq2020/Mihomo-Party-ACL4SSR/main/ACL4SSR_Online_Full_WithIcon.yaml"},{label:"ACL4SSR_Online_Mini_MultiMode \u81EA\u52A8\u6D4B\u901F/\u6545\u969C\u8F6C\u79FB/\u8D1F\u8F7D\u5747\u8861 (\u4E0EGithub\u540C\u6B65)",value:"https://raw.githubusercontent.com/zhuqq2020/Mihomo-Party-ACL4SSR/main/ACL4SSR_Online_Mini_MultiMode.yaml"},{label:"\u6781\u7B80\u5206\u6D41\u89C4\u5219",value:"https://raw.githubusercontent.com/zhuqq2020/Mihomo-Party-ACL4SSR/main/\u6781\u7B80\u5206\u6D41\u89C4\u5219.yaml"}]},{label:"mihomo-party-org",options:[{label:"\u5E03\u4E01\u72D7\u7684\u8BA2\u9605\u8F6C\u6362 (\u4E0EGithub\u540C\u6B65)",value:"https://raw.githubusercontent.com/mihomo-party-org/override-hub/main/yaml/%E5%B8%83%E4%B8%81%E7%8B%97%E7%9A%84%E8%AE%A2%E9%98%85%E8%BD%AC%E6%8D%A2.yaml"},{label:"ACL4SSR_Online_Full (\u4E0EGithub\u540C\u6B65)",value:"https://raw.githubusercontent.com/mihomo-party-org/override-hub/main/yaml/ACL4SSR_Online_Full.yaml"},{label:"ACL4SSR_Online_Full_WithIcon (\u4E0EGithub\u540C\u6B65)",value:"https://raw.githubusercontent.com/mihomo-party-org/override-hub/main/yaml/ACL4SSR_Online_Full_WithIcon.yaml"}]}],singbox:[{label:"\u901A\u7528",options:[{label:"\u9ED8\u8BA4(\u7CBE\u7B80\u7248) (\u4E0EGithub\u540C\u6B65)",value:"https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/template/singbox_default.yaml"},{label:"\u9ED8\u8BA4(\u7CBE\u7B80\u7248) (\u65E0\u53BB\u5E7F\u544A) (\u4E0EGithub\u540C\u6B65)",value:"https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/template/singbox_default_NoAds.yaml"},{label:"\u9ED8\u8BA4(mini\u7248) (\u4E0EGithub\u540C\u6B65)",value:"https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/template/singbox_default_mini.yaml"},{label:"\u9ED8\u8BA4(mini\u7248) (\u65E0\u53BB\u5E7F\u544A) (\u4E0EGithub\u540C\u6B65)",value:"https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/template/singbox_default_mini_NoAds.yaml"},{label:"\u9ED8\u8BA4(\u5168\u5206\u7EC4) (\u4E0EGithub\u540C\u6B65)",value:"https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/template/singbox_default_full.yaml"},{label:"\u9ED8\u8BA4(\u5168\u5206\u7EC4) (\u65E0\u53BB\u5E7F\u544A) (\u4E0EGithub\u540C\u6B65)",value:"https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/template/singbox_default_full_NoAds.yaml"},{label:"DustinWin \u5168\u5206\u7EC4\u7248 (\u4E0EGithub\u540C\u6B65)",value:"https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/template/singbox_DustinWin_full.yaml"},{label:"DustinWin \u5168\u5206\u7EC4\u7248 (\u65E0\u53BB\u5E7F\u544A) (\u4E0EGithub\u540C\u6B65)",value:"https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/template/singbox_DustinWin_full_NoAds.yaml"}]}]};return s&&t.mihomo[0].options.unshift({label:"\u81EA\u5B9A\u4E49\u89C4\u5219",value:s}),e&&t.singbox[0].options.unshift({label:"\u81EA\u5B9A\u4E49\u89C4\u5219",value:e}),JSON.stringify(t)}function Uo(s,e){let t={mihomo:{name:"Clash (mihomo)",placeholder:"\u8BF7\u8F93\u5165 Clash \u8BA2\u9605\u5730\u5740\uFF0C\u652F\u6301\u5404\u79CD\u8BA2\u9605\u6216\u5355\u8282\u70B9\u94FE\u63A5",tipText:`
## Mihomo \u4F7F\u7528\u63D0\u793A

- \u652F\u6301\u5404\u79CD\u8BA2\u9605\u6216\u5355\u8282\u70B9\u94FE\u63A5\uFF0C\u81EA\u52A8\u5408\u5E76\u751F\u6210\u914D\u7F6E
- \u9762\u677F\u5730\u5740: http://127.0.0.1:9090/ui/xd
- mixed(http/socks) \u7AEF\u53E3: 7890
- \u4F7F\u7528 sub-store \u540E\u7AEF\u8F6C\u6362
- \u9002\u7528\u4E8E mihomo \u5BA2\u6237\u7AEF
- \u53BB\u5E7F\u544A\u4F7F\u7528 [\u79CB\u98CE\u5E7F\u544A\u89C4\u5219](https://github.com/TG-Twilight/AWAvenue-Ads-Rule.git)
- \u9632\u6B62 DNS \u6CC4\u6F0F\uFF08\u5B89\u5168 DNS/DoH\uFF09
- \u5C4F\u853D WebRTC \u6CC4\u6F0F\uFF08\u9632\u6B62\u771F\u5B9E IP \u66B4\u9732\uFF09
- \u5173\u95ED\u6240\u6709\u8986\u5199\u529F\u80FD\u4EE5\u786E\u4FDD\u914D\u7F6E\u6B63\u5E38\u751F\u6548

## \u9644\u52A0\u53C2\u6570\u8BF4\u660E

- **UDP**: \u542F\u7528 UDP \u4EE3\u7406\u6D41\u91CF [\u67E5\u770B\u8BE6\u60C5](https://wiki.metacubex.one/config/proxies/#udp)
- **\u5206\u5E94\u7528\u4EE3\u7406**: \u6392\u9664 CN \u5E94\u7528\uFF08\u4EC5 Android\uFF09\u4E0D\u5165\u4EE3\u7406 [\u67E5\u770B\u8BE6\u60C5](https://wiki.metacubex.one/config/inbound/tun/#exclude-package)
- **\u5206IPCIDR\u4EE3\u7406**: \u6392\u9664 CN IP \u4E0D\u5165\u4EE3\u7406 [\u67E5\u770B\u8BE6\u60C5](https://wiki.metacubex.one/config/inbound/tun/#route-exclude-address)
- **\u53BB\u5E7F\u544ADNS**: \u76F4\u8FDE\u4F7F\u7528 [dns.18bit.cn](https://www.18bit.cn)\uFF0C\u4EE3\u7406\u4F7F\u7528 [dns.adguard-dns.com](https://adguard-dns.io/)
- **\u4EC5\u4EE3\u7406**: \u5173\u95ED VPN \u4EE3\u7406\uFF0C\u4F7F\u7528 mixed(http/socks) \u7AEF\u53E3\uFF08\u5173\u95ED tun \u5165\u7AD9\uFF09

## \u914D\u7F6E\u4FE1\u606F

**User-Agent** ${e}

**\u8F6C\u6362\u540E\u7AEF** ${s}
            `,protocolOptions:[{value:"udp",label:"\u542F\u7528 UDP",checked:!0},{value:"ep",label:"\u542F\u7528 \u5206\u5E94\u7528\u4EE3\u7406\uFF08\u4EC5 Android\uFF09"},{value:"ea",label:"\u542F\u7528 \u5206IPCIDR\u4EE3\u7406\uFF08iOS/macOS/Windows/Linux \u63A8\u8350\uFF09"},{value:"adgdns",label:"\u542F\u7528 \u53BB\u5E7F\u544ADNS"},{value:"tun",label:"\u542F\u7528 \u4EC5\u4EE3\u7406"}]},singbox:{name:"Singbox",placeholder:"\u8BF7\u8F93\u5165 Singbox \u8BA2\u9605\u5730\u5740\uFF0C\u652F\u6301\u5404\u79CD\u8BA2\u9605\u6216\u5355\u8282\u70B9\u94FE\u63A5",tipText:`
## Singbox \u4F7F\u7528\u63D0\u793A

- \u652F\u6301\u5404\u79CD\u8BA2\u9605\u6216\u5355\u8282\u70B9\u94FE\u63A5\uFF0C\u81EA\u52A8\u5408\u5E76\u751F\u6210\u914D\u7F6E
- \u9762\u677F\u5730\u5740: http://127.0.0.1:20123
- mixed(http/socks) \u7AEF\u53E3: 20120
- \u4F7F\u7528 sub-store \u540E\u7AEF\u8F6C\u6362
- \u9002\u7528\u4E8E sing-box \u5BA2\u6237\u7AEF\uFF08\u652F\u6301 1.11.x / 1.12.x / 1.13.x\uFF09
- \u53BB\u5E7F\u544A\u4F7F\u7528 [\u79CB\u98CE\u5E7F\u544A\u89C4\u5219](https://github.com/TG-Twilight/AWAvenue-Ads-Rule.git)
- \u9632\u6B62 DNS \u6CC4\u6F0F\uFF08\u5B89\u5168 DNS/DoH\uFF09
- \u5C4F\u853D WebRTC \u6CC4\u6F0F\uFF08\u9632\u6B62\u771F\u5B9E IP \u66B4\u9732\uFF09
- \u5173\u95ED\u6240\u6709\u8986\u5199\u529F\u80FD\u4EE5\u786E\u4FDD\u914D\u7F6E\u6B63\u5E38\u751F\u6548

## \u9644\u52A0\u53C2\u6570\u8BF4\u660E

- **UDP**: \u542F\u7528 UDP \u4EE3\u7406\u6D41\u91CF [\u67E5\u770B\u8BE6\u60C5](https://sing-box.sagernet.org/zh/configuration/route/rule_action/#udp_disable_domain_unmapping)
- **UDP \u5206\u6BB5**: [\u67E5\u770B\u8BE6\u60C5](https://sing-box.sagernet.org/zh/configuration/shared/dial/#udp_fragment)
- **TLS \u5206\u6BB5**: \u7ED5\u8FC7\u88AB\u9632\u706B\u5899\u62E6\u622A\u7684\u57DF\u540D [\u67E5\u770B\u8BE6\u60C5](https://sing-box.sagernet.org/zh/configuration/route/rule_action/#tls_fragment)
- **\u5206\u5E94\u7528\u4EE3\u7406**: \u6392\u9664 CN \u5E94\u7528\uFF08\u4EC5 Android\uFF09[\u67E5\u770B\u8BE6\u60C5](https://sing-box.sagernet.org/zh/configuration/inbound/tun/#exclude_package)
- **\u5206IPCIDR\u4EE3\u7406**: \u6392\u9664 CN IP [\u67E5\u770B\u8BE6\u60C5](https://sing-box.sagernet.org/zh/configuration/inbound/tun/#route_exclude_address)
- **Tailscale**: [\u67E5\u770B\u8BE6\u60C5](https://sing-box.sagernet.org/zh/configuration/endpoint/tailscale)
- **\u53BB\u5E7F\u544ADNS**: \u76F4\u8FDE\u4F7F\u7528 [dns.18bit.cn](https://www.18bit.cn)\uFF0C\u4EE3\u7406\u4F7F\u7528 [dns.adguard-dns.com](https://adguard-dns.io/)
- **\u4EC5\u4EE3\u7406**: \u5173\u95ED VPN \u4EE3\u7406\uFF0C\u4F7F\u7528 mixed(http/socks) \u7AEF\u53E3\uFF08\u5173\u95ED tun \u5165\u7AD9\uFF09

## \u914D\u7F6E\u4FE1\u606F

**User-Agent** ${e}

**\u8F6C\u6362\u540E\u7AEF** ${s}
            `,protocolOptions:[{value:"udp",label:"\u542F\u7528 UDP",checked:!0},{value:"udp_frag",label:"\u542F\u7528 UDP \u5206\u6BB5"},{value:"tls_frag",label:"\u542F\u7528 TLS \u5206\u6BB5"},{value:"ep",label:"\u542F\u7528 \u5206\u5E94\u7528\u4EE3\u7406\uFF08\u4EC5 Android\uFF09"},{value:"ea",label:"\u542F\u7528 \u5206IPCIDR\u4EE3\u7406\uFF08iOS/macOS/Windows/Linux \u63A8\u8350\uFF09"},{value:"tailscale",label:"\u542F\u7528 Tailscale"},{value:"adgdns",label:"\u542F\u7528 \u53BB\u5E7F\u544ADNS"},{value:"tun",label:"\u542F\u7528 \u4EC5\u4EE3\u7406"}]},v2ray:{name:"V2Ray",placeholder:"\u8BF7\u8F93\u5165 V2Ray \u8BA2\u9605\u5730\u5740\uFF0C\u652F\u6301\u5404\u79CD\u8BA2\u9605\u6216\u5355\u8282\u70B9\u94FE\u63A5",tipText:`
## V2Ray \u4F7F\u7528\u63D0\u793A

**\u8F6C\u6362\u540E\u7AEF** ${s}
            `,protocolOptions:[],noTemplate:!0}};return JSON.stringify(t)}var nd=atob("aHR0cHM6Ly9naXRodWIuY29tL0t3aXNtYS9jZi13b3JrZXItbWlob21v");function Yo(s){let e=Fo(s),t=Uo(s.subApi,s.userAgent),n=jo(s.customMihomoTemplate,s.customSingboxTemplate);return`<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" href="https://cdn.jsdelivr.net/gh/Kwisma/cf-worker-mihomo@main/favicon.png">
    <title>\u914D\u7F6E\u8F6C\u6362\u5DE5\u5177</title>
    <style>${e}</style>
    <script src="https://cdn.jsdelivr.net/npm/@keeex/qrcodejs-kx@1.0.2/qrcode.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/dompurify@3.0.5/dist/purify.min.js"></script>
</head>
<body>
    <a href="${nd}" target="_blank" class="github-corner" aria-label="View source on Github">
        <svg viewBox="0 0 250 250" aria-hidden="true">
            <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
            <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
                fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path>
            <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
                fill="currentColor" class="octo-body"></path>
        </svg>
    </a>

    <div class="container">
        <div class="logo-title">
            <h1>\u914D\u7F6E\u8F6C\u6362\u5DE5\u5177</h1>
        </div>

        <!-- \u6A21\u5F0F\u5207\u6362\u6309\u94AE\uFF08\u7531 JS \u52A8\u6001\u751F\u6210\uFF09 -->
        <div class="config-toggle" id="mode-toggle"></div>

        <!-- \u5404\u6A21\u5F0F\u5185\u5BB9\u5BB9\u5668\uFF08\u7531 JS \u52A8\u6001\u751F\u6210\uFF09 -->
        <div id="mode-containers"></div>

        <div class="input-group">
            <div style="display: flex; flex-direction: column; align-items: flex-start;">
                <label for="result">\u8BA2\u9605\u5730\u5740\uFF1A</label>
            </div>
            <input type="text" id="result" readonly onclick="copyToClipboard()">
            <label id="qrcode" style="margin: 15px 10px -15px 10px;"></label>
        </div>

        <div class="beian-info">
            <a href="${s.beianUrl}" target="_blank">${s.beianText}</a>
        </div>
    </div>

    <script>
        // \u2500\u2500\u2500 \u6570\u636E\u6CE8\u5165 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
        const MODES   = ${t};
        const CONFIGS = ${n};

        // \u2500\u2500\u2500 \u72B6\u6001 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
        let activeMode = 'mihomo';

        // \u2500\u2500\u2500 \u521D\u59CB\u5316 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
        document.addEventListener('DOMContentLoaded', function () {
            initModeToggle();
            initModeContainers();
            setActiveMode(activeMode);
            initTipSystem();
            initAllTemplateSelectors();
            document.getElementById('qrcode').classList.remove('show');
        });

        /** \u6E32\u67D3\u6A21\u5F0F\u5207\u6362\u6309\u94AE */
        function initModeToggle() {
            const container = document.getElementById('mode-toggle');
            for (const [modeId, modeConfig] of Object.entries(MODES)) {
                const btn = document.createElement('div');
                btn.className = 'toggle-option';
                btn.dataset.mode = modeId;
                btn.textContent = modeConfig.name;
                btn.addEventListener('click', () => setActiveMode(modeId));
                container.appendChild(btn);
            }
        }

        /** \u6E32\u67D3\u5404\u6A21\u5F0F\u5185\u5BB9\u5BB9\u5668 */
        function initModeContainers() {
            const wrapper = document.getElementById('mode-containers');

            for (const [modeId, modeConfig] of Object.entries(MODES)) {
                const container = document.createElement('div');
                container.id = modeId + '-container';
                container.className = 'mode-options';

                // \u6A21\u677F\u9009\u62E9\u5668
                if (!modeConfig.noTemplate) {
                    const selector = document.createElement('div');
                    selector.className = 'template-selector';
                    selector.innerHTML = \`
                        <div class="template-toggle collapsed">\u9009\u62E9\u914D\u7F6E\u6A21\u677F\uFF08\u672A\u9009\u62E9\uFF09</div>
                        <div class="template-options"></div>
                    \`;
                    container.appendChild(selector);
                }

                // \u8BA2\u9605\u94FE\u63A5\u8F93\u5165\u7EC4
                const inputGroup = document.createElement('div');
                inputGroup.className = 'input-group';

                const linkLabel = document.createElement('div');
                linkLabel.style.cssText = 'display: flex; align-items: center; gap: 6px; margin-bottom: 6px;';
                linkLabel.innerHTML = \`
                    <label for="link" style="margin: 0;">\u8BA2\u9605\u94FE\u63A5</label>
                    <div class="tip-wrapper">
                        <span class="tip-icon" data-mode="\${modeId}">!</span>
                        <div class="tip-panel"></div>
                    </div>
                \`;
                inputGroup.appendChild(linkLabel);

                const linkContainer = document.createElement('div');
                linkContainer.id = 'link-container-' + modeId;
                linkContainer.innerHTML = \`
                    <div class="link-row">
                        <input type="text" class="link-input" placeholder="\${modeConfig.placeholder}" />
                        <div class="add-btn" onclick="addLinkInput(this, '\${modeId}')">\u2795</div>
                    </div>
                \`;
                inputGroup.appendChild(linkContainer);

                // \u9644\u52A0\u53C2\u6570\u9009\u9879
                if (!modeConfig.noTemplate) {
                    const paramLabel = document.createElement('label');
                    paramLabel.textContent = '\u9644\u52A0\u53C2\u6570\u9009\u9879';
                    inputGroup.appendChild(paramLabel);

                    const paramOptions = document.createElement('div');
                    paramOptions.className = 'protocol-options';

                    modeConfig.protocolOptions.forEach(option => {
                        const label = document.createElement('label');
                        label.className = 'protocol-checkbox';
                        label.innerHTML = \`
                            <input type="checkbox" name="protocol" value="\${option.value}" \${option.checked ? 'checked' : ''}>
                            \${option.label}
                        \`;
                        paramOptions.appendChild(label);
                    });

                    inputGroup.appendChild(paramOptions);
                }

                container.appendChild(inputGroup);

                // \u751F\u6210\u6309\u94AE
                const genBtn = document.createElement('button');
                genBtn.textContent = '\u751F\u6210 ' + modeConfig.name + ' \u914D\u7F6E';
                genBtn.onclick = function () { generateConfig(modeId); copyToClipboard(); };
                container.appendChild(genBtn);

                wrapper.appendChild(container);
            }
        }

        /** \u5207\u6362\u6D3B\u52A8\u6A21\u5F0F */
        function setActiveMode(modeId) {
            document.querySelectorAll('.toggle-option').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.mode === modeId);
            });
            document.querySelectorAll('.mode-options').forEach(c => {
                c.classList.toggle('active', c.id === modeId + '-container');
            });

            const modeName = MODES[modeId]?.name || '';
            document.title = modeName ? modeName + '\u914D\u7F6E\u8F6C\u6362\u5DE5\u5177' : '\u914D\u7F6E\u8F6C\u6362\u5DE5\u5177';
            const h1 = document.querySelector('h1');
            if (h1) h1.textContent = modeName ? modeName + '\u914D\u7F6E\u8F6C\u6362\u5DE5\u5177' : '\u914D\u7F6E\u8F6C\u6362\u5DE5\u5177';

            updateResult('');
            activeMode = modeId;
        }

        /** \u521D\u59CB\u5316\u4F7F\u7528\u63D0\u793A\u5F39\u7A97 */
        function initTipSystem() {
            document.querySelectorAll('.tip-icon').forEach(icon => {
                icon.addEventListener('click', (e) => {
                    e.stopPropagation();
                    document.querySelectorAll('.tip-wrapper').forEach(w => w.classList.remove('active'));
                    const wrapper = icon.closest('.tip-wrapper');
                    wrapper.classList.toggle('active');
                    const panel = wrapper.querySelector('.tip-panel');
                    const rawMd = MODES[icon.dataset.mode]?.tipText || '\u6682\u65E0\u63D0\u793A\u5185\u5BB9';
                    panel.innerHTML = DOMPurify.sanitize(marked.parse(rawMd));
                });
            });
            document.addEventListener('click', () => {
                document.querySelectorAll('.tip-wrapper').forEach(w => w.classList.remove('active'));
            });
        }

        /** \u521D\u59CB\u5316\u6240\u6709\u6A21\u677F\u9009\u62E9\u5668 */
        function initAllTemplateSelectors() {
            for (const modeId of Object.keys(MODES)) {
                if (!MODES[modeId].noTemplate && CONFIGS[modeId]) {
                    initTemplateSelector(modeId, CONFIGS[modeId]);
                }
            }
        }

        /** \u521D\u59CB\u5316\u5355\u4E2A\u6A21\u677F\u9009\u62E9\u5668 */
        function initTemplateSelector(modeId, configGroups) {
            const selector       = document.querySelector('#' + modeId + '-container .template-selector');
            const toggle         = selector.querySelector('.template-toggle');
            const optionsWrapper = selector.querySelector('.template-options');

            configGroups.forEach(group => {
                const groupHeader = document.createElement('div');
                groupHeader.style.cssText = 'padding: 10px 20px; font-weight: bold; color: #555; background-color: #f5f5f5;';
                groupHeader.textContent = group.label;
                optionsWrapper.appendChild(groupHeader);

                group.options.forEach(option => {
                    const item = document.createElement('div');
                    item.className = 'template-option';
                    item.textContent = option.label;
                    item.dataset.value = option.value;
                    item.dataset.group = group.label;

                    item.addEventListener('click', function () {
                        selector.querySelectorAll('.template-option.selected').forEach(el => el.classList.remove('selected'));
                        toggle.textContent = group.label + ' - ' + option.label;
                        this.classList.add('selected');
                        toggle.classList.add('collapsed');
                        optionsWrapper.classList.remove('show');
                    });

                    optionsWrapper.appendChild(item);
                });
            });

            // \u9ED8\u8BA4\u9009\u4E2D\u7B2C\u4E00\u9879
            const firstItem = selector.querySelector('.template-option');
            if (firstItem) {
                firstItem.classList.add('selected');
                toggle.textContent = '\u8BF7\u9009\u62E9\u914D\u7F6E\u6A21\u677F\uFF08\u9ED8\u8BA4 - ' + firstItem.dataset.group + '\uFF09';
            }

            toggle.addEventListener('click', function () {
                this.classList.toggle('collapsed');
                optionsWrapper.classList.toggle('show');
            });

            document.addEventListener('click', function (e) {
                if (!toggle.contains(e.target) && !optionsWrapper.contains(e.target)) {
                    toggle.classList.add('collapsed');
                    optionsWrapper.classList.remove('show');
                }
            });
        }

        /** \u6DFB\u52A0\u8BA2\u9605\u94FE\u63A5\u8F93\u5165\u6846 */
        function addLinkInput(btn, modeId) {
            const container = document.getElementById('link-container-' + modeId);
            const row = document.createElement('div');
            row.className = 'link-row';

            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'link-input';
            input.placeholder = MODES[modeId].placeholder;

            btn.style.display = 'none';
            row.appendChild(input);
            container.appendChild(row);

            const newBtn = document.createElement('div');
            newBtn.className = 'add-btn';
            newBtn.textContent = '\u2795';
            newBtn.onclick = function () { addLinkInput(newBtn, modeId); };
            row.appendChild(newBtn);
        }

        /** \u751F\u6210\u914D\u7F6E\u8BA2\u9605\u94FE\u63A5 */
        function generateConfig(modeId) {
            const inputs = document.querySelectorAll('#' + modeId + '-container .link-input');

            let templateLink = '';
            if (!MODES[modeId].noTemplate) {
                const selected = document.querySelector('#' + modeId + '-container .template-option.selected');
                templateLink = selected ? selected.dataset.value : '';
            }

            const params = {};
            document.querySelectorAll('#' + modeId + '-container .protocol-options input[type="checkbox"]').forEach(cb => {
                params[cb.value] = cb.checked;
            });

            const links = Array.from(inputs).map(i => i.value.trim()).filter(Boolean);

            if (links.length === 0) {
                alert('\u8BF7\u8F93\u5165\u81F3\u5C11\u4E00\u4E2A\u8BA2\u9605\u94FE\u63A5');
                return;
            }

            const queryParts = [];
            if (templateLink) queryParts.push('template=' + encodeURIComponent(templateLink));
            if (links.length > 0) queryParts.push('url=' + links.map(encodeURIComponent).join(','));
            queryParts.push(modeId + '=true');

            for (const [key, enabled] of Object.entries(params)) {
                if (enabled) queryParts.push(key + '=true');
            }

            updateResult(window.location.origin + '/?' + queryParts.join('&'));
        }

        /** \u590D\u5236\u7ED3\u679C\u5230\u526A\u8D34\u677F */
        function copyToClipboard() {
            const input = document.getElementById('result');
            if (!input.value) return;

            input.select();
            navigator.clipboard.writeText(input.value).then(() => {
                const toast = document.createElement('div');
                toast.style.cssText = 'position:fixed;left:50%;top:20px;transform:translateX(-50%);padding:8px 16px;background:#4361ee;color:white;border-radius:4px;z-index:1000;';
                toast.textContent = '\u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F';
                document.body.appendChild(toast);
                setTimeout(() => document.body.removeChild(toast), 2000);
            }).catch(() => alert('\u590D\u5236\u5931\u8D25\uFF0C\u8BF7\u624B\u52A8\u590D\u5236'));
        }

        /** \u66F4\u65B0\u7ED3\u679C\u8F93\u5165\u6846\u548C\u4E8C\u7EF4\u7801 */
        function updateResult(url) {
            document.getElementById('result').value = url;
            const qrDiv = document.getElementById('qrcode');

            if (url) {
                qrDiv.classList.add('show');
                qrDiv.innerHTML = '';
                new QRCode(qrDiv, {
                    text: url,
                    width: 220,
                    height: 220,
                    colorDark: '#4a60ea',
                    colorLight: '#ffffff',
                    correctLevel: QRCode.CorrectLevel.L,
                    scale: 1,
                });
            } else {
                qrDiv.classList.remove('show');
                qrDiv.innerHTML = '';
            }
        }
    </script>
</body>
</html>`}var id=new Set(["transfer-encoding","content-length","content-encoding","connection"]);async function Go(s,e,t={}){let n=Kn(t),i=Fn(s),r={...n,...i,userAgent:e,template:i.template};if(r.urls.length===0||r.urls[0]===""){let l=await Yo(r);return{status:200,headers:{},body:l,isHtml:!0}}let o=await rd(r),a={};for(let[l,c]of Object.entries(o.headers))id.has(l.toLowerCase())||(a[l]=c);return a["Content-Type"]="application/json; charset=utf-8",a["Profile-web-page-url"]=s.origin,{status:o.status||200,headers:a,body:o.data,isHtml:!1}}async function rd(s){if(s.isSingbox)return Ro(s);if(s.isMihomo)return Po(s);if(s.isV2ray)return Ko(s);throw new Error("\u672A\u6307\u5B9A\u914D\u7F6E\u7C7B\u578B\uFF0C\u8BF7\u6DFB\u52A0 singbox=true\u3001mihomo=true \u6216 v2ray=true \u53C2\u6570")}async function od(s,e){let t=new URL(s.url,`http://${s.headers.host}`),n=s.headers["user-agent"]||"",i=process.env;try{let r=await Go(t,n,i);for(let[o,a]of Object.entries(r.headers))e.setHeader(o,a);r.isHtml&&e.setHeader("Content-Type","text/html; charset=utf-8"),e.statusCode=r.status,e.end(r.body)}catch(r){e.statusCode=400,e.setHeader("Content-Type","application/json; charset=utf-8"),e.end(JSON.stringify({error:r.message}))}}export{od as default};
