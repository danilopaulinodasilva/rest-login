const bcrypt = require('bcryptjs');

module.exports = {

    hash: (value) => {

        return new Promise((resolve,reject) => {
            bcrypt.hash(value, 8, (err, hash) => {
                if(err) reject(err);
                resolve(hash);

            });

        });

    },

    compare: (value, hash) => {

        return new Promise((resolve,reject) => {
            bcrypt.compare(value,hash, (err,success) => {
                if(err) reject(err);
                resolve(success);

            });
            
        });

    }

}