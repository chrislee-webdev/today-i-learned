import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qtytnkmradfpmhkhgsae.supabase.co';

const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0eXRua21yYWRmcG1oa2hnc2FlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzczNTU0NzYsImV4cCI6MTk5MjkzMTQ3Nn0.DknKmOymMsWOch4eZhlzgffyzvMmQ2rEYHWVAdJ_CR4';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;