const connection = require('../../config/mysql');

class Login {

  check(username,password) {
    
    const table = process.env.MYSQL_TABLE; // pega a tabela nas variaveis de ambiente
    
    return new Promise((resolve, reject) => {
      
      connection.query(`SELECT guid, email, password, role FROM ${table} WHERE email = '${username}' AND password = '${password}'`, (err, res) => {

          if((err)) {
            console.log(err); 
            reject(err);
          
          } else {

            if(res.length >= 1) { 
              resolve(res); 

            } else {
              reject("Usuário e/ou senha inválidos");
            
            }

          }
      });

    });
    
  }
  
}

module.exports = new Login();
