const RedisService = require("../services/RedisService");

module.exports = {

    includes: async (token) => {
        
        try {
            return await RedisService.getToken(token);
            
        } catch (err) {
            console.log("oi?",err);
            return false;

        }

    },

    delete: async (token) => {

        try {
            return await RedisService.delete(token);

        } catch (err) {
            return err;

        }
        
    }
    
}
