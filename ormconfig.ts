module.exports = [
    {
        name: 'dev',
        type: process.env.BDD_type,
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        synchronize: true,
        logging: false,
        cache: true,
        entities: ['src/entities/**/*.ts'],
        migrations: ['src/migrations/**/*.ts'],
        subscribers: ['src/subscribers/**/*.ts'],
        cli: {
            entitiesDir: 'src/entities',
            migrationsDir: 'src/migrations',
            subscribersDir: 'src/subscribers',
        },
    },
    {
        name: 'prod',
        type: process.env.BDD_type,
        url: process.env.DATABASE_URL,
        synchronize: true,
        logging: false,
        cache: true,
        ssl: true,
        extra: {
            ssl: {
                rejectUnauthorized: false,
            },
        },
        entities: ['src/entities/**/*.ts'],
        migrations: ['src/migrations/**/*.ts'],
        subscribers: ['src/subscribers/**/*.ts'],
        cli: {
            entitiesDir: 'src/entities',
            migrationsDir: 'src/migrations',
            subscribersDir: 'src/subscribers',
        },
    },
    {
        name: 'Test',
        type: process.env.BDD_type,
        host: process.env.POSTGRES_TEST_HOST,
        port: process.env.POSTGRES_TEST_PORT,
        username: process.env.POSTGRES_TEST_USER,
        password: process.env.POSTGRES_TEST_PASSWORD,
        database: process.env.POSTGRES_TEST_DB,
        synchronize: true,
        logging: false,
        cache: true,
        entities: ['src/entities/**/*.ts'],
        migrations: ['src/migrations/**/*.ts'],
        subscribers: ['src/subscribers/**/*.ts'],
        cli: {
            entitiesDir: 'src/entities',
            migrationsDir: 'src/migrations',
            subscribersDir: 'src/subscribers',
        },
    },
];
