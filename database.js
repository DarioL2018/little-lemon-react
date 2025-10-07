import * as SQLite from 'expo-sqlite';

// Abre la base de datos de forma síncrona.
const db = SQLite.openDatabaseSync('little_lemon');

/**
 * Crea la tabla 'menuitems' si no existe.
 * La nueva API usa async/await, eliminando la necesidad de Promises manuales.
 */
export async function createTable() {
  try {
    // db.execAsync es ideal para ejecutar sentencias SQL que no devuelven filas.
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      CREATE TABLE IF NOT EXISTS menuitems (
        id TEXT PRIMARY KEY NOT NULL,
        title TEXT,
        price TEXT,
        description TEXT,
        image TEXT,
        category TEXT
      );
    `);
    //console.log('Table created successfully');
  } catch (error) {
    console.error('Error creating table:', error);
    throw error; // Lanza el error para que el llamador pueda manejarlo.
  }
}

/**
 * Obtiene todos los ítems del menú de la base de datos.
 * @returns {Promise<Array>} Un array con los objetos del menú.
 */
export async function getMenuItems() {
  try {
    // db.getAllAsync obtiene todas las filas que coinciden con la consulta.
    const allRows = await db.getAllAsync('SELECT * FROM menuitems');
    //console.log('Fetched rows from DB:', allRows.length);
    return allRows;
  } catch (error) {
    console.error('Error fetching menu items:', error);
    throw error;
  }
}

/**
 * Guarda un array de ítems en la base de datos dentro de una sola transacción.
 * @param {Array} menuItems - El array de objetos a guardar.
 */
export async function saveMenuItems(menuItems) {
  try {
    // db.withTransactionAsync asegura que todas las inserciones se completen
    // o ninguna lo haga, manteniendo la integridad de los datos.
    await db.withTransactionAsync(async () => {
      for (const item of menuItems) {
        // db.runAsync es para sentencias INSERT, UPDATE, DELETE.
        await db.runAsync(
          'INSERT OR REPLACE INTO menuitems (id, title, price, description, image, category) VALUES (?, ?, ?, ?, ?, ?)',
          [
            item.id,
            item.title,
            item.price,
            item.description,
            item.image,
            item.category,
          ]
        );
      }
    });
    //console.log(`Inserted ${menuItems.length} items into DB`);
  } catch (error) {
    console.error('Transaction error in saveMenuItems:', error);
    throw error;
  }
}

/**
 * Filtra los ítems del menú por un texto de búsqueda y/o categorías activas.
 * @param {string} query - El texto para buscar en el título.
 * @param {Array<string>} activeCategories - Un array de categorías para filtrar.
 * @returns {Promise<Array>} Un array con los ítems filtrados.
 */
export async function filterByQueryAndCategories(query, activeCategories = []) {
  try {
    let sql = 'SELECT * FROM menuitems WHERE 1=1'; // Cláusula base
    const params = [];

    if (query) {
      sql += ' AND title LIKE ?';
      params.push(`%${query}%`);
    }

    if (activeCategories.length > 0) {
      const placeholders = activeCategories.map(() => '?').join(', ');
      sql += ` AND category IN (${placeholders})`;
      params.push(...activeCategories);
    }

    // getAllAsync también acepta parámetros para consultas preparadas.
    const result = await db.getAllAsync(sql, params);
    return result;
  } catch (error) {
    console.error('Error filtering menu items:', error);
    throw error;
  }
}