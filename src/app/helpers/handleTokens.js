const RedisService = require("../services/RedisService");

module.exports = {

    includes: async (token) => {

        try {
            const tokens = await RedisService.getToken(token);
            const values = Object.values(tokens);
            const check = values.includes(token);
            return check;
            
        } catch (err) {
            return err;

        }

    },

    delete: async (token,) => {

        try {
            return await RedisService.delete("refreshTokens",token);

        } catch (err) {
            return err;

        }
        
    }
    
}
