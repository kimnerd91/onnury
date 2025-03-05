import {
    createApp
} from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import vueCookies from 'vue-cookies';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import SpinnerVisible from './views/SpinnerVisible.vue'; // 스피너 컴포넌트 경로
axios.defaults.baseURL = 'https://onnurihomeapp.co.kr/api';
// axios.defaults.baseURL = 'http://localhost:8090';
// axios.defaults.headers['Access-Control-Allow-Origin'] = '*';

const app = createApp(App);
app.use(vueCookies);
app.use(router);
app.component('VueDatePicker', VueDatePicker);
app.component('SpinnerVisible', SpinnerVisible);

const spinner = createApp(SpinnerVisible).mount(document.createElement('div'));
document.body.appendChild(spinner.$el);

// Variable to hold the timeout ID
let spinnerTimeout;

// Show spinner with timeout
function showSpinner() {
    spinner.show();
    // spinnerTimeout = setTimeout(() => {
    //     spinner.hide();
    // }, 5000); // 10 seconds
}

// Hide spinner and clear timeout
function hideSpinner() {
    spinner.hide();
    clearTimeout(spinnerTimeout);
}

// Axios request interceptor
axios.interceptors.request.use(
    (config) => {
        showSpinner();
        return config;
    },
    (error) => {
        hideSpinner();
        return Promise.reject(error);
    }
);

// Axios response interceptor
axios.interceptors.response.use(
    (response) => {
        hideSpinner();
        return response;
    },
    (error) => {
        hideSpinner();
        return Promise.reject(error);
    }
);


app.mount('#app');
app.$cookies.config("7d");
