let message;
 const inputMessage = document.querySelector('.input');
 const codeMessage = document.querySelector('.code');
 const decodeMessage = document.querySelector('.decode');
 const textin = document.querySelector('.textin');
const freqs     = text              => [...text].reduce((fs, c) => fs[c] ? (fs[c] = fs[c] + 1, fs) : (fs[c] = 1, fs), {});
const topairs   = freqs             => Object.keys(freqs).map(c => [c, freqs[c]]);
const sortps    = pairs             => pairs.sort((a, b) => a[1] - b[1]);
const tree      = ps                => ps.length < 2 ? ps[0] : tree(sortps([[ps.slice(0, 2), ps[0][1] + ps[1][1]]].concat(ps.slice(2))));
const codes     = (tree, pfx = "")  => tree[0] instanceof Array ? Object.assign(codes(tree[0][0], pfx + "0"), codes(tree[0][1], pfx + "1")) : {[tree[0]]: pfx};
const getcodes  = text              => codes(tree(sortps(topairs(freqs(text)))));
let code ='';
let decode ='';
let codeForDecode =[];
let key;
const codeBtn = document.querySelector('.codeBtn').addEventListener('click', ()=>{
    message = inputMessage.value;
    key = getcodes(message);
    for(let letters of message)
    {
        for(let lkey in key)
        if (letters==lkey) {
            code += key[lkey];
            codeForDecode.push(key[lkey])
        } 
        }
    console.log(codeForDecode);
    console.log('');
    console.log(key);
    codeMessage.value = code;

    let textinValue ='Алфавит:\n';

    for(let lkey in key)
    {
        textinValue+=`${lkey}: ${key[lkey]} | ` 
    }
    console.log(textinValue);
    let textfreq = '\nВстречаемость: \n ';
    // console.log(sortps(topairs(freqs(message))));
    for(let item of sortps(topairs(freqs(message))))
    {
     
           
            textfreq+=`${item[0]}: ${item[1]} раз | ` 
            console.log(textfreq);
       
    }
    textin.value = `${textinValue} \n${textfreq} `;
})
const decodeBtn = document.querySelector('.decodeBtn').addEventListener('click', ()=>{
    for(let i =0 ; i<codeForDecode.length; i++)
    {
        for(let lkey in key)
        if (codeForDecode[i]==key[lkey])
            decode += lkey;
    }
    decodeMessage.value = decode;
})
const clear = document.querySelector('.clear').addEventListener('click', ()=>{
    inputMessage.value='';
    codeMessage.value='';
    decodeMessage.value='';
    message='';
    code ='';
    decode ='';
    codeForDecode =[];
    key='';
    textin.value='';

})