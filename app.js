// بيانات الاتصال بقاعدة البيانات الخاصة بمنصة د. شريف
const SUPABASE_URL = 'https://eknnzobkfiwcodlqrwhn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrbm56b2JrZml3Y29kbHFyd2huIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgwNTU3ODIsImV4cCI6MjEwMzYzMTc4Mn0.bT_AzaWrTeDgltPO3a4O9h6i9oc-J5JrOGmXv5kYiys';

// تهيئة الاتصال بمكتبة Supabase
const { createClient } = window.supabase;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// وظيفة تسجيل الدخول للمنصة
async function loginUser(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        alert("خطأ في تسجيل الدخول: تأكد من البريد وكلمة المرور.");
    } else {
        alert("تم تسجيل الدخول بنجاح!");
        checkUserRole();
    }
}

// وظيفة توجيه المستخدم (العميل لصفحته والأدمن للوحة التحكم)
async function checkUserRole() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();
            
        if (profile && profile.role === 'admin') {
            window.location.href = 'admin.html';
        } else {
            // العميل بيفضل في نفس الصفحة لعرض المهام لاحقاً
            alert("مرحباً بك في بوابة المتابعة الخاصة بك");
        }
    }
}