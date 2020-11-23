const { models } = require('../../sequelize');

async function getCustomer(req, res) {
    const customer = await models.customer.findOne({
        where: {
            onekeyid: req.query.onekeyid
        },
        attributes: {
            exclude: ['id']
        }
    });
    if (customer) {
        res.status(200).json(customer);
    } else {
        res.status(404).send('404 - Not found');
    }
};

async function createOrUpdate(req, res) {
    if (req.body.id) {
        res.status(400).send(`Bad request: ID should not be provided, since it is determined automatically by the database.`)
    } else {
        const customer = await models.customer.findOne({
            where: {
                onekeyid: req.body.onekeyid
            }
        });
        if (!customer) {
            await models.customer.create(req.body);
            res.status(201).end();
        } else {
            await customer.update(req.body);
            res.status(200).end();
        }
    }
};

module.exports = {
    getCustomer,
    createOrUpdate
};
