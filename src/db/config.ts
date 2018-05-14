import Sequelize from 'sequelize';

const db = new Sequelize('lms', 'hardeek', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 15000
    }
});

export {db}
