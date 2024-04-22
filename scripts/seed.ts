import 'dotenv/config'
import * as schema from '../src/server/db/schema'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http';

const client = neon(process.env.DATABASE_URL!)
const db = drizzle(client, { schema });   

const main = async () => {
    try {
        console.log('Seeding database')

        await db.delete(schema.courses)
        await db.delete(schema.userProgress)

        
    await db.insert(schema.courses).values([
        {
          id: 1,
          title: "Spanish",
          imageSrc: "/img/flags/es.svg",
        },
        {
          id: 2,
          title: "Italian",
          imageSrc: "/img/flags/it.svg",
        },
        {
          id: 3,
          title: "French",
          imageSrc: "/img/flags/fr.svg",
        },
        {
          id: 4,
          title: "Croatian",
          imageSrc: "/img/flags/hr.svg",
        },
      ]);

        console.log('Seeding finished')
    } catch (error) {
        console.error(error)
        throw new Error('Failed to seed the database')
    }
}

main()