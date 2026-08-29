(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=4,t=t=>{let[n,r,i]=t,a=i*255|0,o=e+Math.min(255,Math.ceil(i)),s=n*a/o|0,c=r*a/o|0,l=a/o|0;return(o<<24|s<<16|c<<8|l<<0)>>>0},n=vasel.getContext(`webgl2`),r=vasel.width=innerWidth,i=vasel.height=innerHeight,a=[],o=()=>{let e=n.createFramebuffer(),t=n.createTexture();return n.bindTexture(n.TEXTURE_2D,t),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texImage2D(n.TEXTURE_2D,0,n.RGBA,r,i,0,n.RGBA,n.UNSIGNED_BYTE,null),n.bindTexture(n.TEXTURE_2D,null),n.bindFramebuffer(n.FRAMEBUFFER,e),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,t,0),n.bindFramebuffer(n.FRAMEBUFFER,null),a.push(()=>{n.deleteFramebuffer(e),n.deleteTexture(t)}),{fb:e,tex:t}},s=o(),c=o();n.bindFramebuffer(n.FRAMEBUFFER,c.fb),n.clearColor(0,0,0,0),n.clear(n.COLOR_BUFFER_BIT),n.bindFramebuffer(n.FRAMEBUFFER,null);var l=o(),u=(e,t,n)=>{if(e.length<16)return[new Float32Array,new Uint16Array];let r=new Float32Array(e.length),i=2*e[1]-e[9],a=2*e[2]-e[10];for(let o=0;o<e.length>>3;o++){let s=o<<3,c=e[s|1],l=e[s|2];e[s|3];let u=e[s|4];e[s|5],e[s|6],e[s|7],e[(s|1)+8],e[(s|2)+8];let d=c-i,f=l-a,p=Math.atan2(f,d),m=t*u*-Math.sin(p),h=n*u*Math.cos(p);r[o<<3|0]=c+m,r[o<<3|1]=l+h,r[o<<3|2]=0,r[o<<3|3]=0,r[o<<3|4]=c-m,r[o<<3|5]=l-h,r[o<<3|6]=1,r[o<<3|7]=0,i=c,a=l}let o=new Uint16Array(((e.length>>>3)-1)*6);for(let t=0;t<(e.length>>3)-1;t++)o[t*6+0]=t<<1|0,o[t*6+1]=t<<1|1,o[t*6+2]=(t<<1)+2,o[t*6+3]=(t<<1)+2,o[t*6+4]=t<<1|1,o[t*6+5]=(t<<1)+3;return[r,o]},d=(e,t)=>{let r=n.createBuffer();n.bindBuffer(n.ARRAY_BUFFER,r),n.bufferData(n.ARRAY_BUFFER,e,n.STATIC_DRAW),n.bindBuffer(n.ARRAY_BUFFER,null);let i=n.createBuffer();return n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,i),n.bufferData(n.ELEMENT_ARRAY_BUFFER,t,n.STATIC_DRAW),n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,null),[r,i]},{vsh:f,fsh:p,prog:m,setColor:h}=(()=>{let t=n.createShader(n.VERTEX_SHADER);n.shaderSource(t,`#version 300 es

layout(location=0)in vec4 aPos;
out vec4 vPos;

void main(){
  vPos=aPos;
  vPos.xy = vPos.xy * 2. - 1.;
  gl_Position=vec4(vPos.xy,0.,1.);
}
`),n.compileShader(t),console.log(n.getShaderInfoLog(t)||`novsherr`);let r=n.createShader(n.FRAGMENT_SHADER);n.shaderSource(r,`#version 300 es

precision highp float;

vec3 unpackSpect(vec4 packed){
    float r = float(packed.r);
    float g = float(packed.g);
    float b = float(packed.b);
    float a = float(packed.a);
    float m = max(1.,b);
    float w = r / m;
    float s = g / m;
    float i = (a * b) / 255.;
    return vec3(w,s,i);
}

ivec4 packSpect(vec3 unpacked){
    float m = ${e}.+min(255.,ceil((unpacked.z)));
    float fm = floor(unpacked.z*255.);
    return ivec4(
        int(unpacked.x * fm / m),
        int(unpacked.y * fm / m),
        int(fm / m),
        m);
}

in vec4 vPos;

uniform uint uColor;

layout(location=0)out vec4 outColor;

void main(){
    float r = float((uColor>>16) &0xffu);
    float g = float((uColor>>8)  &0xffu);
    float b = float((uColor>>0)  &0xffu);
    float a = float((uColor>>24) &0xffu);

    vec3 unpacked = unpackSpect(vec4(r,g,b,a));

    float mulF = pow(1.-abs(vPos.z-.5)*2.,.25);
    unpacked.z *= mulF;

    gl_FragDepth = 1.-mulF;

    outColor=vec4(packSpect(unpacked))/255.;
    // outColor=vec4(r,g,b,a);
    // outColor=vec4(vec3(vPos.z),1.);
    // outColor = vec4(.5,0.,,1.);
}`),n.compileShader(r),console.log(n.getShaderInfoLog(r)||`nofsherr`);let i=n.createProgram();n.attachShader(i,t),n.attachShader(i,r),n.linkProgram(i),console.log(n.getProgramInfoLog(i)||`nolinkerr`);let a=n.getUniformLocation(i,`uColor`);return{vsh:t,fsh:r,prog:i,setColor(e){n.uniform1ui(a,e)}}})(),g=null,_=null,v=20,y=[],b=n.createRenderbuffer();n.bindRenderbuffer(n.RENDERBUFFER,b),n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_STENCIL,vasel.width,vasel.height),n.bindRenderbuffer(n.RENDERBUFFER,null);var x=()=>{g&&n.deleteBuffer(g),_&&n.deleteBuffer(_);let[r,i]=d(...u(y,v/vasel.width,v/vasel.height));g=r,_=i,!(y.length<16)&&(n.enable(n.STENCIL_TEST),n.bindFramebuffer(n.FRAMEBUFFER,s.fb),n.viewport(0,0,vasel.width,vasel.height),n.clearColor(0,0,0,0),n.clear(n.COLOR_BUFFER_BIT),n.useProgram(m),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,b),n.enable(n.STENCIL_TEST),n.clearStencil(0),n.clear(n.STENCIL_BUFFER_BIT),n.enable(n.DEPTH_TEST),n.clearDepth(1),n.clear(n.DEPTH_BUFFER_BIT),n.stencilFunc(n.ALWAYS,1,-2),n.stencilOp(n.ZERO,n.REPLACE,n.REPLACE),n.enableVertexAttribArray(0),n.bindBuffer(n.ARRAY_BUFFER,r),n.vertexAttribPointer(0,4,n.FLOAT,!1,16,0),n.bindBuffer(n.ARRAY_BUFFER,null),n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,i),n.drawElements(n.TRIANGLES,((y.length>>>3)-1)*6,n.UNSIGNED_SHORT,0),n.disable(n.STENCIL_TEST),n.disable(n.DEPTH_TEST),n.bindFramebuffer(n.FRAMEBUFFER,l.fb),S(c.tex),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.STENCIL_ATTACHMENT,n.RENDERBUFFER,b),n.enable(n.STENCIL_TEST),n.stencilFunc(n.EQUAL,1,1),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.useProgram(m),h(t([A[0],A[1],A[2]*e])),n.enableVertexAttribArray(0),n.bindBuffer(n.ARRAY_BUFFER,r),n.vertexAttribPointer(0,4,n.FLOAT,!1,16,0),n.bindBuffer(n.ARRAY_BUFFER,null),n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,i),n.enable(n.BLEND),n.blendFuncSeparate(n.CONSTANT_ALPHA,n.CONSTANT_ALPHA,n.ONE,n.ONE),n.blendEquation(n.FUNC_ADD),n.blendColor(0,0,0,.5),S(s.tex),n.disable(n.BLEND),n.disable(n.STENCIL_TEST),n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,null),n.bindFramebuffer(n.FRAMEBUFFER,null),C(l.tex))},S=(()=>{let t=n.createBuffer();n.bindBuffer(n.ARRAY_BUFFER,t),n.bufferData(n.ARRAY_BUFFER,new Float32Array([0,0,1,0,1,1,0,0,1,1,0,1]),n.STATIC_DRAW),n.bindBuffer(n.ARRAY_BUFFER,null);let r=n.createShader(n.VERTEX_SHADER);n.shaderSource(r,`#version 300 es

layout(location=0)in vec2 aPos;

out vec2 vPos;

void main(){
    gl_Position=vec4(aPos*2.-1.,0.,1.);
    vPos=aPos;
}`),n.compileShader(r),console.log(n.getShaderInfoLog(r)||`novsherr`);let i=n.createShader(n.FRAGMENT_SHADER);n.shaderSource(i,`#version 300 es
precision highp float;
in vec2 vPos;

uniform sampler2D uSampler;

layout(location=0)out vec4 outColor;


vec3 unpackSpect(vec4 packed){
    float r = float(packed.r);
    float g = float(packed.g);
    float b = float(packed.b);
    float a = float(packed.a);
    float m = max(1.,b);
    float w = r / m;
    float s = g / m;
    float i = (a * b) / 255.;
    return vec3(w,s,i);
}

ivec4 packSpect(vec3 unpacked){
    float m = ${e}.+min(255.,ceil((unpacked.z)));
    float fm = floor(unpacked.z*255.);
    return ivec4(
        int(unpacked.x * fm / m),
        int(unpacked.y * fm / m),
        int(fm / m),
        m);
}

    

void main(){
    vec4 color = texture(uSampler,vPos);

    // float r = float(color.r*255.);
    // float g = float(color.g*255.);
    // float b = float(color.b*255.);
    // float a = float(color.a*255.);

    // vec3 unpacked = unpackSpect(vec4(r,g,b,a));

    // outColor=vec4(packSpect(unpacked))/255.;

    outColor=color;
}
`),n.compileShader(i),console.log(n.getShaderInfoLog(i)||`nofsherr`);let a=n.createProgram();n.attachShader(a,r),n.attachShader(a,i),n.linkProgram(a),console.log(n.getProgramInfoLog(a)||`nolinkerr`);let o=n.getUniformLocation(a,`uSampler`);return n.useProgram(a),n.uniform1i(o,0),n.useProgram(null),e=>{n.useProgram(a),n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,e),n.enableVertexAttribArray(0),n.bindBuffer(n.ARRAY_BUFFER,t),n.vertexAttribPointer(0,2,n.FLOAT,!1,8,0),n.bindBuffer(n.ARRAY_BUFFER,null),n.drawArrays(n.TRIANGLES,0,6)}})(),C=(()=>{let t=n.createBuffer();n.bindBuffer(n.ARRAY_BUFFER,t),n.bufferData(n.ARRAY_BUFFER,new Float32Array([0,0,1,0,1,1,0,0,1,1,0,1]),n.STATIC_DRAW),n.bindBuffer(n.ARRAY_BUFFER,null);let r=n.createShader(n.VERTEX_SHADER);n.shaderSource(r,`#version 300 es

layout(location=0)in vec2 aPos;

out vec2 vPos;

void main(){
    gl_Position=vec4(aPos*2.-1.,0.,1.);
    vPos=aPos;
}`),n.compileShader(r),console.log(n.getShaderInfoLog(r)||`novsherr`);let i=n.createShader(n.FRAGMENT_SHADER);n.shaderSource(i,`#version 300 es
precision highp float;
in vec2 vPos;

uniform sampler2D uSampler;

layout(location=0)out vec4 outColor;

const float spreadFac = 2.;
const float spreadExpFac = .5;

void addColorFac(inout vec3 val, in float waveLengthCr, in vec3 col, in float width,in float strength, in float position, in float widthMul){
    val += col * strength * exp(-pow((waveLengthCr-position)/(widthMul * width + 1e-10),2.)) / sqrt(widthMul);
}

vec3 unpackSpect(vec4 packed){
    float r = float(packed.r);
    float g = float(packed.g);
    float b = float(packed.b);
    float a = float(packed.a);
    float m = max(1.,b);
    float w = r / m;
    float s = g / m;
    float i = (a * b) / 255.;
    return vec3(w,s,i);
}

ivec4 packSpect(vec3 unpacked){
    float m = ${e}.+min(255.,ceil((unpacked.z)));
    float fm = floor(unpacked.z*255.);
    return ivec4(
        int(unpacked.x * fm / m),
        int(unpacked.y * fm / m),
        int(fm / m),
        m);
}

// float ACESFilm(float x)
// {
// float a = 2.51;
// float b = 0.03;
// float c = 2.43;
// float d = 0.59;
// float e = 0.14;
// // return min(1.,(x*(a*x+b))/(x*(c*x+d)+e));
// return (x*(a*x+b))/(x*(c*x+d)+e);
// }

float tone(float x){
    return (1.+x/32.)*x/(1.+x);
}
vec3 tone(vec3 x){
    // return x/(1.+x);
    // return x/(5.+x);
    return x;
}

void main(){
    vec4 color = texture(uSampler,vPos);

    vec3 up = unpackSpect(color*255.);

    float waveLengthCr = up.r;
    float spreadCr = up.g;
    // float waveLengthCr = vPos.x;
    // float spreadCr = vPos.y;
    
    float widthMul = pow(spreadFac * (spreadCr), pow(2., spreadExpFac))+1.;

    vec3 s = vec3(0.);
    addColorFac(s,waveLengthCr,vec3(1.,0.,0.),.2,.85,.35,widthMul);
    addColorFac(s,waveLengthCr,vec3(1.,0.,0.),.15,.3,.75,widthMul);
    addColorFac(s,waveLengthCr,vec3(0.,1.,0.),.2,.85,.5,widthMul);
    addColorFac(s,waveLengthCr,vec3(0.,0.,1.),.2,.8,.65,widthMul);

    // vec3 cColor =s*up.b;
    // vec3 cColor =s*log2(up.b+1.)/8.;
    // vec3 cColor =s*log2(up.b+1.)/8.;
    // vec3 cColor =s*ACESFilm(up.b/10.);
    // vec3 cColor =s*tone(up.b);
    // vec3 cColor =s*up.b;
    vec3 cColor = s*tone(up.b/${e}.);


    // cColor = log2(cColor+1.)/8.;

    // outColor=vec4(cColor,1.);
    outColor=vec4(pow(tone(cColor),vec3(2.2)),1.);
    // outColor=vec4(vec3(up),1.);
    // outColor=color;
}
`),n.compileShader(i),console.log(n.getShaderInfoLog(i)||`nofsherr`);let a=n.createProgram();n.attachShader(a,r),n.attachShader(a,i),n.linkProgram(a),console.log(n.getProgramInfoLog(a)||`nolinkerr`);let o=n.getUniformLocation(a,`uSampler`);return n.useProgram(a),n.uniform1i(o,0),n.useProgram(null),e=>{n.useProgram(a),n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,e),n.enableVertexAttribArray(0),n.bindBuffer(n.ARRAY_BUFFER,t),n.vertexAttribPointer(0,2,n.FLOAT,!1,8,0),n.bindBuffer(n.ARRAY_BUFFER,null),n.drawArrays(n.TRIANGLES,0,6)}})(),w=()=>{n.bindFramebuffer(n.FRAMEBUFFER,c.fb),n.viewport(0,0,vasel.width,vasel.height),S(l.tex),n.bindFramebuffer(n.FRAMEBUFFER,null),n.viewport(0,0,vasel.width,vasel.height),C(l.tex)},T=``;addEventListener(`keydown`,e=>{T=e.key}),addEventListener(`keyup`,e=>{T===e.key&&(T=``)});var E=!1,D=0,O=0,k=0,A=[.3,.2,6];addEventListener(`pointerdown`,e=>{e.preventDefault(),y.length=0,document.body.setPointerCapture(e.pointerId);let t=e.getCoalescedEvents()||[e];for(let e of t)y.push(0,e.x/vasel.clientWidth,1-e.y/vasel.clientHeight,0,e.pressure,0,0,0);x()}),addEventListener(`pointermove`,t=>{if(t.preventDefault(),!t.buttons)return;if(T&&T!==`Alt`){let n=E?(t.x-D)/1e3:0,r=E?-(t.y-O)/1e3:0,i=E?k:k=A[2];D=t.x,O=t.y,T===`f`?(E=!0,A[0]=Math.min(1,Math.max(0,A[0]+n)),A[1]=Math.min(1,Math.max(0,A[1]+r))):T===`s`&&(E=!0,A[2]=Math.min(255/e,Math.max(1/255,A[2]+i*r))),E===!0&&(y.length=0,y.push(0,0,0,0,1,0,0,0,0,1,1,0,1,0,0,0,0),hudel.innerText=A.map(e=>(e*100|0)/100).join(`,`),x());return}if(E)return;let n=t.getCoalescedEvents()||[t];for(let e of n)y.push(0,e.x/vasel.clientWidth,1-e.y/vasel.clientHeight,0,e.pressure,0,0,0);x()}),addEventListener(`pointerup`,e=>{if(e.preventDefault(),E){E=!1;return}let t=e.getCoalescedEvents()||[e];for(let e of t)y.push(0,e.x/vasel.clientWidth,1-e.y/vasel.clientHeight,0,e.pressure,0,0,0);x(),w()}),y.length=0,y.push(0,0,0,0,1,0,0,0,0,1,1,0,1,0,0,0,0),x();