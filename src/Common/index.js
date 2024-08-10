const backendDomain = "http://localhost:3000";

const SummaryApi = {
    signUP: {
        url: `${backendDomain}/api/signup`,
        method: "POST"
    },
    signIn: {
        url: `${backendDomain}/api/signin`,
        method: "POST"
    },
    current_user:{
        url:`${backendDomain}/api/user-details`,
        method:"GET"
    },
    logout_user:{
        url:`${backendDomain}/api/logout`,
        method:"POST"
    },
    // contact:{
    //     url:`${backendDomain}/api/contact`,
    //     method:"POST"

    // }

    
};

export default SummaryApi;
