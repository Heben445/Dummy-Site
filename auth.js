// Initialize Supabase
const SUPABASE_URL = "https://kwycqjxjgnyfiqhkenit.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3eWNxanhqZ255ZmlxaGtlbml0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2Mzk3NzksImV4cCI6MjA3NzIxNTc3OX0.wZB-JJh1w_EtBqhFv22Lwy1UnwHjQ_SWIuu39OG8kwY";

// ✅ Use the global `window.supabase` from the script include
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Signup
document.getElementById("signup")?.addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const { error } = await supabaseClient.auth.signUp({ email, password });
  if (error) alert(error.message);
  else alert("Check your email for confirmation link!");
});

// Login
document.getElementById("login")?.addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
  if (error) alert(error.message);
  else {
    alert("Logged in!");
    window.location.href = "home.html";
  }
});

// Logout
document.getElementById("logout")?.addEventListener("click", async () => {
  await supabaseClient.auth.signOut();
  window.location.href = "index.html";
});

// Check if user is logged in
async function checkUser() {
  const { data } = await supabaseClient.auth.getSession();
  if (!data.session) {
    window.location.href = "index.html";
  } else {
    document.getElementById("welcome").innerText = `Welcome, ${data.session.user.email}`;
  }
}
