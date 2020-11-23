const { models } = require('../../sequelize');

async function getHits(req, res) {
    const hits = await models.hit.findAll({
        where: {
            employeename: req.query.employeename,
            onekeyid: req.query.onekeyid
        },
        attributes: {
            exclude: ['id']
        }
    });
    if (hits) {
        res.status(200).json(hits);
    } else {
        res.status(404).send('404 - Not found');
    }
};

async function create(req, res) {
    if (req.body.id) {
        res.status(400).send(`Bad request: ID should not be provided, since it is determined automatically by the database.`)
    } else {
        await models.hit.create(req.body);
        res.status(201).end();
    }
};


module.exports = {
    getHits,
    create
};
