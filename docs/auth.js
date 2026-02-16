import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://hhsfjlxkxvhjmcunkswo.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhoc2ZqbHhreHZoam1jdW5rc3dvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyNTE1NTYsImV4cCI6MjA4NjgyNzU1Nn0.ErjljC0NYlK8wPPYSji1D_EENfC9WuPzOnb4WDzCm7U'

const supabase = createClient(supabaseUrl, supabaseKey)

// SIGN UP
window.signUp = async () => {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    const { error } = await supabase.auth.signUp({
        email,
        password
    })

    if (error) alert(error.message)
    else alert("Signup successful! You can login now.")
}

// LOGIN
window.login = async () => {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if (error) {
        alert(error.message)
    } else {
        window.location.href = "home.html"
    }
}

// If already logged in, skip auth page
const { data: { session } } = await supabase.auth.getSession()

if (session) {
    window.location.href = "home.html"
}
