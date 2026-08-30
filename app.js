// بيانات الاتصال بقاعدة البيانات الخاصة بمنصة د. شريف
var SUPABASE_URL = 'https://eknnzobkfiwcodlqrwhn.supabase.co';
var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrbm56b2JrZml3Y29kbHFyd2huIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgwNTU3ODIsImV4cCI6MjEwMzYzMTc4Mn0.bT_AzaWrTeDgltPO3a4O9h6i9oc-J5JrOGmXv5kYiys';

// تهيئة الاتصال بمكتبة Supabase
var createClient = window.supabase.createClient;
var supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// وظيفة تسجيل الدخول للمنصة
async function loginUser(email, password) {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        alert("خطأ في تسجيل الدخول: تأكد من البريد وكلمة المرور.");
    } else {
        checkUserRole();
    }
}

// وظيفة توجيه المستخدم 
async function checkUserRole() {
    const { data: { user } } = await supabaseClient.auth.getUser();
    if (user) {
        const { data: profile } = await supabaseClient
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();
            
        if (profile && profile.role === 'admin') {
            window.location.href = 'admin.html';
        } else {
            window.location.href = 'client.html';
        }
    }
}
