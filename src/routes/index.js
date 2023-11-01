import HomePage from '@/pages/user/HomePage';
import LoginPage from '@/pages/user/Login';
import SignUpPage from '@/pages/user/SignUp';
const publicRoutes = [
  { path: '/', component: HomePage },
  { path: '/login',component: LoginPage},
  { path: '/sign-up', component: SignUpPage },
];
export { publicRoutes};
