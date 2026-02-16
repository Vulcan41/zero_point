import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://hhsfjlxkxvhjmcunkswo.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhoc2ZqbHhreHZoam1jdW5rc3dvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyNTE1NTYsImV4cCI6MjA4NjgyNzU1Nn0.ErjljC0NYlK8wPPYSji1D_EENfC9WuPzOnb4WDzCm7U'

const supabase = createClient(supabaseUrl, supabaseKey)

// SIGN UP
window.signUp = async () => {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const role = document.getElementById('role').value

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                role: role
            }
        }
    })

    if (error) alert(error.message)
    else alert('Signup successful! Now login.')
}


// LOGIN
window.login = async () => {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if (error) alert(error.message)
    else showUser(data.user)
}

// LOGOUT
window.logout = async () => {
    await supabase.auth.signOut()
    location.reload()
}

// SHOW USER
function showUser(user) {
    document.getElementById('auth').style.display = 'none'
    document.getElementById('user').style.display = 'block'

    const role = user.user_metadata.role

    if (role === "admin") {
        document.getElementById('welcome').innerText =
        "You are an admin 👑"
    } else {
        document.getElementById('welcome').innerText =
        "You are a common user 🙂"
    }
}


// CHECK SESSION ON LOAD
const { data: { session } } =
await supabase.auth.getSession()

if (session) showUser(session.user)

