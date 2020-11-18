const Log = require("../models/LogModel");

class LogController {

    login(req,res) {

        const guid = req.body.guid;
        const ip = req.body.ip;

        if (typeof(guid) == 'undefined') return res.status(400).json({"guid":"required field"})
        if (typeof(ip) == 'undefined') return res.status(400).json({"ip":"required field"})

        Log.save(guid, "", "", ip)

            .then((response) => {
                res.sendStatus(204);
            }) 
            
            .catch((err) => {
                res.sendStatus(400);
            });

    }

    page(req,res) {

        Log.save(req.body.guid,req.body.page,null,req.body.ip)

            .then((response) => {
                res.sendStatus(403);
            })

            .catch((err) => {
                res.sendStatus(400);
            })

    }

    download(req,res) {
        
     // Log.save(guid,page,download,ipaddress)
        Log.save(req.body.guid,null, req.body.file, req.body.ip)

            .then((response) => {
                res.sendStatus(403);
            }) 
            
            .catch((err) => {
                res.sendStatus(400);
            });

    }

}

module.exports = new LogController();
