// Simple database operations for saving and retrieving ideas
export interface SavedIdea {
  id: string;
  idea: any;
<<<<<<< HEAD
  deepPlan?: any;
=======
>>>>>>> 3e628a2168b56fec3281130d34c634e61e91a332
  savedAt: number;
}

const DB_NAME = 'ideaforge';
const STORE_NAME = 'saved_ideas';

// Initialize the database
async function initDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
  });
}

// Save an idea to the database
<<<<<<< HEAD
export async function saveIdea(idea: any, deepPlan?: any): Promise<string> {
=======
export async function saveIdea(idea: any): Promise<string> {
>>>>>>> 3e628a2168b56fec3281130d34c634e61e91a332
  const db = await initDB();
  const id = crypto.randomUUID();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    const savedIdea: SavedIdea = {
      id,
      idea,
<<<<<<< HEAD
      deepPlan,
=======
>>>>>>> 3e628a2168b56fec3281130d34c634e61e91a332
      savedAt: Date.now()
    };

    const request = store.add(savedIdea);
    
    request.onsuccess = () => resolve(id);
    request.onerror = () => reject(request.error);
  });
}

// Get all saved ideas
export async function getSavedIdeas(): Promise<SavedIdea[]> {
  const db = await initDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();
    
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Delete a saved idea
export async function deleteIdea(id: string): Promise<void> {
  const db = await initDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(id);
    
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}