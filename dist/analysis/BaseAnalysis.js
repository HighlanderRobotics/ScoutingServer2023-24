// Assuming you're using ES6 style imports
// import Manager from '../manager/Manager.js';
import { createClient } from '@supabase/supabase-js';

class BaseAnalysis {
    supabaseUrl = 'https://vuavdtyffnscsvwiknpa.supabase.co';
    supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1YXZkdHlmZm5zY3N2d2lrbnBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY1NTM4MjQsImV4cCI6MjAxMjEyOTgyNH0.iKf5aytgMh7-pISOgaU7e-1u0cxkge2mNSzDOYyA8r0';
    supabase;
    constructor() {
        this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
    }
}
export default BaseAnalysis;
//# sourceMappingURL=BaseAnalysis.js.map