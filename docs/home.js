import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://hhsfjlxkxvhjmcunkswo.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhoc2ZqbHhreHZoam1jdW5rc3dvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyNTE1NTYsImV4cCI6MjA4NjgyNzU1Nn0.ErjljC0NYlK8wPPYSji1D_EENfC9WuPzOnb4WDzCm7U'


const supabase = createClient(supabaseUrl, supabaseKey)

// Check session
const { data: { session } } = await supabase.auth.getSession()

if (!session) {
    window.location.href = "index.html"
} else {
    document.getElementById("welcome").innerText =
    `Welcome ${session.user.email}`
}

// Logout
window.logout = async () => {
    await supabase.auth.signOut()
    window.location.href = "index.html"
}
