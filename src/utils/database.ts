// Simple database operations for saving and retrieving ideas
export interface SavedIdea {
  id: string;
  idea: any;
  deepPlan?: any;
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
export async function saveIdea(idea: any, deepPlan?: any): Promise<string> {
  const db = await initDB();
  const id = crypto.randomUUID();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    const savedIdea: SavedIdea = {
      id,
      idea,
      deepPlan,
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