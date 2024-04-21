import "dotenv/config"
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'
import { neon } from "@neondatabase/serverless"

const connectionString = process.env.DATABASE_URL

const client = neon(connectionString!)
export const db = drizzle(client, { schema });           