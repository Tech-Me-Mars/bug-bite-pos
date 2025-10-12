import jwt_decode from "jwt-decode";
import router from '@/router/index.js';
import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';
export default function auth(to, from, next) {
  console.log("auth middleware are running");
//   const currentRoute = router.currentRoute;
//   if (!currentRoute.name == 'login'){
//     return router.push({ name: 'login' });
//   }
    function getCurrentTimestampInBangkok() {
        const currentUtcTimestamp = Date.now();
        const bangkokTimezone = 'Asia/Bangkok';
        const currentBangkokTimestamp = utcToZonedTime(currentUtcTimestamp, bangkokTimezone);
        const currentTimestampInSeconds = Math.floor(currentBangkokTimestamp / 1000);
        return currentTimestampInSeconds;
    }
    function isTokenExpired(decodedToken) {
        if (!decodedToken || !decodedToken.exp) {
            return true;
        }
        const currentTimestamp = getCurrentTimestampInBangkok();
        const expirationTimestamp = decodedToken.exp;
        return currentTimestamp > expirationTimestamp;
    }
    const token = localStorage.getItem('token');
    // ********************หากไม่มีToken********************
    if (!token || token == undefined || token == null) {
        return router.push({ path: '/auth/login' });
    }
    const decoded = jwt_decode(token);

    const decodedHeader = jwt_decode(token, { header: true });

    if (isTokenExpired(decoded)) {
        // ****************หากTokenหมดอายุ*********************
        console.log('Token is expired');
        localStorage.removeItem("token");
        return router.push({ path: '/auth/login' });
      
        //  window.location = 'login';
      
        // return navigateTo({ path: '/auth/login' })
    }
    // เช็คRole
    // const userRole = decoded.role;
    // if (userRole === 'Member') {
    //     const currentPath = window.location.pathname;
    //     console.log(currentPath); // e.g., /manage/survey/80 or any other current route

    //     if (
    //         !currentPath.startsWith('/survey') &&
    //         !currentPath.startsWith('/survey/') &&
    //         !currentPath.startsWith('/managesurveys') &&
    //         !currentPath.startsWith('/auth/login') &&
    //         !currentPath.startsWith('/manage/survey/')&&
    //         !currentPath.startsWith('/manage/managesurveys')
            
    //     ) {
    //         // Redirect the user to the login page
    //         console.log('redirect');
    //         // return navigateTo({ path: '/auth/login' })
    //     }
    // }
    return next();


}


