const bcrypt = require('bcrypt')

//Hash Password
exports.hashPassword = async(password)=>{
    const hashedPassword = await new Promise((resolve, reject)=>{
        bcrypt.hash(password, 10, (err, hash)=>{
            if(err) {
                console.log(err); 
                reject(hash)
            }
            
                resolve(hash)
        })
    }) 
    return hashedPassword
}

//Verify Password
exports.verifyPassword = async(password, hash)=>{
    const result = await bcrypt.compare(password, hash)
    return result
}