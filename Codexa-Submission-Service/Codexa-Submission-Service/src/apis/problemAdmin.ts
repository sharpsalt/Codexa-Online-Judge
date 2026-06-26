const axiosInstance = require('../config/axiosInstance');//http client hai jo ki get/post bhejta hai, mtlb hum iske 
//madad se API requests bhej sakte hai 
const { PROBLEM_ADMIN_SERVICE_URL } = require('../config/serverConfig');

const PROBLEM_ADMIN_API_URL = `${PROBLEM_ADMIN_SERVICE_URL}/api/v1`;

async function fetchProblemDetails(problemId) {
    try {
        const uri = PROBLEM_ADMIN_API_URL + `/problems/${problemId}`;
        const response = await axiosInstance.get(uri);
        console.log("Api response: ", response.data);
        return response.data;

    } catch(error) {
        console.log("Something went wrong while fetching problem details");
        console.log(error);
    }
}

module.exports = {
    fetchProblemDetails
}
/**
 * Basically ye ek service function banaye hai jo kisi dusre microservice(Problem Admin Service) ko API call rkke problem details fetch krrha hai
 */