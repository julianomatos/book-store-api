import pg from "pg";

async function connect() {
    if (global.connection) {
        return global.connection.connect();
    }

    const pool = new pg.Pool({
        connectionString: "postgres://urimusni:Q4qVsUBkhGhZZ-MZLsU0Ke7vp0RitPeA@kesavan.db.elephantsql.com/urimusni"
    });
    global.connection = pool;
    
    return pool.connect();
}

export {
    connect
}