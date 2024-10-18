 export const Config = {
   baseUrl : String(import.meta.env.VITE_BASE_URL),
    SignUPUrl : String(import.meta.env.VITE_SIGNUP_URL),
    LOGINUrl: String(import.meta.env.VITE_LOGIN_URL),
    GoogleClientId : String(import.meta.env.VITE_GOOGLE_CLIENT_ID),
    GoogleSignUpUrl : String(import.meta.env.VITE_GOOGLELOGIN_URL),
    LogoutUrl : String(import.meta.env.VITE_LOGOUT_URL),
    ContactUrl: String(import.meta.env.VITE_ADDCONTACT_URL),
    GETDATAUrl : String(import.meta.env.VITE_GETDATA_URL),
    CHECKAuthUrl : String(import.meta.env.VITE_CHECKAUTH_URL),
    DELETECONTACTUrl : String(import.meta.env.VITE_DELETECONTACT_URL)
 }