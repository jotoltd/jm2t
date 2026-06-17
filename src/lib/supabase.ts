import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://muansxlzbuglbggzawek.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11YW5zeGx6YnVnbGJnZ3phd2VrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2NDI4OTIsImV4cCI6MjA5NzIxODg5Mn0.hfIO-mtq6gwgi6XVN3dwmzl9G4o6Iy7sgJ7GIMDluRs'
const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11YW5zeGx6YnVnbGJnZ3phd2VrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTY0Mjg5MiwiZXhwIjoyMDk3MjE4ODkyfQ.MA-xKZnQi2Grv5y-qit2-GXT1f6CxJANX3YA-ZXw3ok'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)
