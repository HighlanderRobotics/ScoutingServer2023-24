// Assuming you're using ES6 style imports
// import Manager from '../manager/Manager.js';
import * as sqlite from 'sqlite3';
import { createClient } from '@supabase/supabase-js';

sqlite.verbose()

abstract class BaseAnalysis {
    private supabaseUrl = 'https://vuavdtyffnscsvwiknpa.supabase.co';
    private supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1YXZkdHlmZm5zY3N2d2lrbnBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY1NTM4MjQsImV4cCI6MjAxMjEyOTgyNH0.iKf5aytgMh7-pISOgaU7e-1u0cxkge2mNSzDOYyA8r0';
    public supabase
    constructor() {
        this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
    }


    abstract runAnalysis(): any;

    abstract finalizeResults(result: any): any;
}

export default BaseAnalysis
