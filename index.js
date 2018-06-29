var crypto = require('crypto');
var fs = require('fs');
var path = require('path');
var content = '123123123';
function encrypt(content) {
    var publicPem = fs.readFileSync(path.join(__dirname, "./pub.pem"));
    var privatePem = fs.readFileSync(path.join(__dirname, "./pri.pem"));
    const prikey = privatePem.toString();
    const pubKey = publicPem.toString();
    var iv = crypto.randomBytes(128/8);
    var key = crypto.randomBytes(256/8);
    var clearEncoding = 'utf8';
    var cipherEncoding = 'base64'; /*加密*/
    var algorithm = 'aes-256-cbc';
    // console.log('原始数据：' + content)
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    var cipherChunks = [];
    cipherChunks.push(cipher.update(content, clearEncoding, cipherEncoding));
    cipherChunks.push(cipher.final(cipherEncoding));
    // console.log('AES加密后数据:     ' + cipherChunks.join(''));
    var crypted = crypto.publicEncrypt(pubKey, key); // 加密
    // console.log('RSA加密后密码： ' + crypted);
    // console.log("加密完成");
    
    const decrypted = crypto.privateDecrypt(prikey, crypted); // 解密
    // console.log('RSA解密后密码： ' + decrypted);
    const decipher = crypto.createDecipheriv(algorithm, key,iv);
    var plainChunks = [];
    for (var i = 0; i < cipherChunks.length; i++) {
        plainChunks.push(decipher.update(cipherChunks[i], cipherEncoding, clearEncoding));
    
    }
    plainChunks.push(decipher.final(clearEncoding));
    // console.log("AES解密后数据: " + plainChunks.join(''));
    // console.log('解密完成');

}

for (let index = 0; index < 10000; index++) {
    encrypt(content);
    
}