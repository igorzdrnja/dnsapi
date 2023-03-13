import knex from '../knex/knex.js';
import { Knex } from 'knex';
import { Query } from './models'

const TABLE_NAME = 'queries';

/**
 * Save the given query to the database.
 * @param query - The query object to save.
 */
export async function saveQuery(query: { addresses: string; domain: string; created_at: number; client_ip: string }): Promise<void> {
    const trx = await knex.transaction();
    try {
        await trx(TABLE_NAME).insert({
            domain: query.domain,
            addresses: JSON.stringify(query.addresses),
            client_ip: query.client_ip,
            created_at: query.created_at
        });
        await trx.commit();
    } catch (error) {
        await trx.rollback();
        throw error;
    }
}

/**
 * Get the last n queries from the database.
 * @param count - The number of queries to retrieve.
 * @returns {Query[]} An array of query objects.
 */

export async function getQueries(count: number): Promise<Query[]> {
    try {
        const selectQuery: Knex.QueryBuilder = knex(TABLE_NAME)
            .select('id', 'domain', 'client_ip', 'addresses', 'created_at')
            .orderBy('created_at', 'desc')
            .limit(count);
        const rows: Query[] = await selectQuery;
        return rows.map((row) => {
            return {
                domain: row.domain,
                addresses: row.addresses,
                created_at: row.created_at,
                client_ip: row.client_ip
            };
        });
    } catch (error) {
        throw new Error('Error retrieving history');
    }
}


