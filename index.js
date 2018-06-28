
const keys = require('./key');
var crypto = require('crypto');
var content = 'hello';
var iv = crypto.randomBytes(128/8);
var key = crypto.randomBytes(192/8);
var algorithm = 'aes192';
console.log('原始数据：' + content)
var cipher = crypto.createCipheriv(algorithm, key,iv);
cipher.update(content);
var cryptedContent = cipher.final('hex');
console.log('AES加密后数据：'+ cryptedContent);

var crypted = crypto.publicEncrypt(keys.pubKey,key); // 加密
console.log('RSA加密后密码： ' + crypted);



const decrypted = crypto.privateDecrypt( keys.privKey,crypted); // 解密
console.log('RSA解密后密码： ' + decrypted);


var decipher = crypto.createDecipheriv(algorithm, decrypted,iv);
decipher.update(cryptedContent, 'hex');
var decryptedContent = decipher.final('utf8');
console.log('AES解密后数据：' + decryptedContent);
