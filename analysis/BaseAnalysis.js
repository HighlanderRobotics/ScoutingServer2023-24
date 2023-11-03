"use strict";
// Object.defineProperty(exports, "__esModule", { value: true });

import sqlite from "sqlite3";
import supabase_js_1 from "@supabase/supabase-js";
sqlite.verbose();
var BaseAnalysis = /** @class */ (function () {
    function BaseAnalysis() {
        this.supabaseUrl = 'https://vuavdtyffnscsvwiknpa.supabase.co';
        this.supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1YXZkdHlmZm5zY3N2d2lrbnBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY1NTM4MjQsImV4cCI6MjAxMjEyOTgyNH0.iKf5aytgMh7-pISOgaU7e-1u0cxkge2mNSzDOYyA8r0';
        this.supabase = (0, supabase_js_1.createClient)(this.supabaseUrl, this.supabaseKey);
    }
    return BaseAnalysis;
}());
export default BaseAnalysis;
