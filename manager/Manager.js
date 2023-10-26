import sqlite from 'sqlite3'
import { createClient } from '@supabase/supabase-js';

sqlite.verbose()
const supabaseUrl = 'https://vuavdtyffnscsvwiknpa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1YXZkdHlmZm5zY3N2d2lrbnBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY1NTM4MjQsImV4cCI6MjAxMjEyOTgyNH0.iKf5aytgMh7-pISOgaU7e-1u0cxkge2mNSzDOYyA8r0';
let supabase
class Manager {
      

    constructor() {
        this.supabase = createClient(supabaseUrl, supabaseKey);

    }
    
    runTask(task) {
        throw new Error(`Method 'runTask()' must be implemented.`)
    }
}

export default Manager