var crypto = require('crypto');
var fs = require('fs');
var path = require('path');
var content = '320705199402031519';
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
    console.log("加密完成");
    
    const decrypted = crypto.privateDecrypt(prikey, crypted); // 解密
    // console.log('RSA解密后密码： ' + decrypted);
    // const encrypted =
    // '9ca277d880d50e33fd80032ee670b8d8';
    const decipher = crypto.createDecipheriv(algorithm, key,iv);
    var plainChunks = [];
    for (var i = 0; i < cipherChunks.length; i++) {
        plainChunks.push(decipher.update(cipherChunks[i], cipherEncoding, clearEncoding));
    
    }
    plainChunks.push(decipher.final(clearEncoding));
    // console.log("AES解密后数据: " + plainChunks.join(''));
    console.log('解密完成');

}

fs.readFile('./test.txt','utf-8',function(err,content){
    if(err){
        console.error(err);
    }
    else{
        encrypt(content);
    }
})