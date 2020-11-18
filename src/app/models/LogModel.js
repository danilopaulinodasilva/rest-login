const connection = require('../../config/mysql');

class Log {

    save(guid,page,download,ipaddress) {

        const table = "log";

        return new Promise((resolve, reject) => {
          
          connection.query(`INSERT INTO ${table} (id, guid, page, download, ipaddress) VALUES (NULL, '${guid}', '${page}', '${download}', '${ipaddress}');`, (err,res) => {
    
              if((err)) {
                console.log(err); 
                reject(err);
              
              } else {
                resolve(res); 
    
              }
    
          });
    
        });
    
    }


}

module.exports = new Log();
