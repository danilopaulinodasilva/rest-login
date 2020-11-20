const { stringify } = require("uuid");
const Log = require("../models/LogModel");

class LogController {

    login(req,res) {

        const guid = req.body.guid;
        const ip = req.body.ip;

        if (typeof(guid) == 'undefined') return res.status(400).json({"guid":"required field"})
        if (typeof(ip) == 'undefined') return res.status(400).json({"ip":"required field"})

        Log.save(guid, "", "", ip)

            .then((response) => {
                res.status(204).json({"ok":true});
            }) 
            
            .catch((err) => {
                res.status(400).json({"ok":false});
            });

    }

    page(req,res) {

        const guid = req.body.guid;
        const page = req.body.page;
        const ip = req.body.ip;

        if (typeof(guid) == 'undefined') return res.status(400).json({"guid":"required field"});
        if (typeof(page) == 'undefined') return res.status(400).json({"page":"required field"});
        if (typeof(ip) == 'undefined') return res.status(401).json({"ipaddress":"required field"});

        Log.save(guid,page,"",ip)

            .then((response) => {
                res.sendStatus(204);
            })

            .catch((err) => {
                res.sendStatus(400);
            })

    }

    download(req,res) {
        
        const guid = req.body.guid;
        const file = req.body.file;
        const ip = req.body.ip;
        
        if (typeof(guid) == 'undefined') return res.status(400).json({"guid":"required field"})
        if (typeof(file) == 'undefined') return res.status(400).json({"file":"required field"})
        if (typeof(ip) == 'undefined') return res.status(400).json({"ip":"required field"})

        Log.save(guid,"",file,ip)

            .then((response) => {
                res.sendStatus(204);
            }) 
            
            .catch((err) => {
                res.sendStatus(400);
            });

    }

}

module.exports = new LogController();
