// middleware/auth.ts\

export default defineNuxtRouteMiddleware((to, from) => {
    if (process.client) { // Cek apakah ini berjalan di sisi browser
      const authToken = localStorage.getItem('authToken');
      const router = useRouter();
      // Jika tidak ada token dan halaman yang diminta bukan halaman login
      if (!authToken && to.path !== '/auth/login') {
        // Redirect ke halaman login
        router.push({ path: '/auth/login' });
      }
  
      // Optional: Jika ada token dan mencoba mengakses halaman login, arahkan ke dashboard
      if (authToken && to.path === '/auth/login') {
        router.push({ path: '/main/dashboard' });
      }
    }
  });
  