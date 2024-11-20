import http from 'k6/http';
import { check } from "k6";

export const options = {
    // vus: 200, // Number of virtual users
    // duration: '10s', // Test duration
    stages: [
        { duration: '30s', target: 5 },
        { duration: '30s', target: 5 }, 
        { duration: '30s', target: 0 }, 
      ],
    // thresholds: {
    //     http_req_failed: ['rate<0.001'], // Error rate must be less than 0.1%
    //     http_req_duration: ['p(90)<2000'], // 90% of requests should be below 2000ms
    //     http_req_receiving: ['max<17000'], // Max response receiving time below 17s
    // },
};

// The main function to execute for each VU
export default function () {
    const res = http.get('https://frontend-ipk-485701353107.us-central1.run.app/');

    // Validate the response
    const checkOutput = check(res, {
        'status is 200': (r) => r.status === 200,
        'body is not empty': (r) => r.body.length > 0,
    });

    // Optional: Add logging for debugging
    if (!checkOutput) {
        console.error(`Request failed. Status: ${res.status}`);
    }
}