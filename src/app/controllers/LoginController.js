const Login = require("../models/LoginModel");
const handleJwt = require("../helpers/handleJwt");
const handleTokens = require("../helpers/handleTokens");
const RedisService = require("../services/RedisService");

// const refreshTokens = [];

class LoginController {

    async login (req,res) {

        // console.log(await RedisService.keys());
        // console.log(await RedisService.flushall());
        // console.log(await handleTokens.includes());
        // console.log(await RedisService.retrieve("refreshTokens"));
        // RedisService.store();
        // RedisService.delete();
        // console.log(await RedisService.getToken('$2a$08$qnaDTlTP1UTDMbU183LVD.h8QIx/X/OhPZm5r4XKipbZxYSIb8/6.'));

        // CREATE A NEW TOKEN BASED IN USERNAME AND PASSWORD

        const username = req.body.username; // request the username
        const password = req.body.password; // request the password

        // CHECK IN DATABASE IF USERNAME AND PASSWORD EXISTS

        Login.check(username,password)

        .then((data) => {

            const username = data[0].email;
            const password = data[0].password;
            const role = data[0].role;

            const user = { username: username, password: password, role: role };

            const accessToken = handleJwt.access(user); // create access token with user object
            const refreshToken = handleJwt.refresh(user);  // create refresh token
            
            // RedisService.store("refreshTokens",username,refreshToken);
            RedisService.storeToken(username,refreshToken);

            return res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken }); // throw back the data

        })

        .catch((err) => {
            return res.status(401).json({"message":err}); 
            
        });

    }

    async token (req,res) {

        // CREATE A NEW REFRESH TOKEN, BASED ON ACCESS TOKEN

        const refreshToken = req.body.token;
        const includeToken = await handleTokens.includes(refreshToken);
        
        if (refreshToken == null) return res.sendStatus(401); // come nothing? 401 unauthorized
        if(!includeToken) return res.sendStatus(403) // not found the access token in white list? 403 forbidden

        handleJwt.auth(refreshToken,process.env.REFRESH_TOKEN_SECRET)

            .then((data) =>{
                const accessToken = handleJwt.access({ username: data.email, password: data.password, role: data.role }) // valid, generate a new access token????
                res.json({ accessToken: accessToken });

            })

            .catch((err) => {
                console.log("token err",err);
                return res.status(403).json(err);

            });

    }

    auth (req,res) {

        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) return res.sendStatus(401);

        handleJwt.auth(token,process.env.ACCESS_TOKEN_SECRET)

        .then((data) =>{
            return res.status(201).send({ authorized: true, role: data.role });

        })

        .catch((err) => {
            // console.log("auth err",err)
            return res.status(403).json(err);

        });

    }

    logout (req, res) {

        // DESTROY THE TOKEN FROM REDIS OR ARRAY
        
        handleTokens.delete(req.body.token);
        return res.status(204)

    }

}

module.exports = new LoginController();
