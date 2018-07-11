import { Encrypt, Decrypt } from './testes6.js'
var content = '123123123';
let {crypted,cipherChunks,iv} = Encrypt(content);
let plainChunks = Decrypt(crypted,cipherChunks,iv);
console.log(plainChunks.join(''));