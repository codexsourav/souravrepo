import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

interface CustomError {
    status: number;
    message: string;
    data: any,
}

export const axiosRequest = async ({
    baseURL = import.meta.env.VITE_API_URL || '',
    data = {},
    method = 'GET',
    path = '/',
    headers,
}: {
    path?: string;
    method?: string;
    baseURL?: string;
    data?: any;
    headers?: any;
}): Promise<AxiosResponse<any>> => {
    const config: AxiosRequestConfig<any> = {
        baseURL,
        data,
        method,
        url: path,
        headers: headers || {
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await axios.request(config);
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Handle specific Axios errors
            const axiosError = error as AxiosError;
            if (axiosError.response) {
                // that falls out of the range of 2xx
                const customError: CustomError = {
                    status: axiosError.response.status,
                    message: axiosError.response.statusText,
                    data: axiosError.response.data,
                };
                return Promise.reject(customError);
            } else if (axiosError.request) {
                // The request was made, but no response was received
                const customError: CustomError = {
                    status: axiosError.status || 500,
                    message: 'Internal Server Error',
                    data: null,
                };
                return Promise.reject(customError);
            } else {
                // Something happened in setting up the request that triggered an Error
                const customError: CustomError = {
                    status: axiosError.status || 500,
                    message: 'Internal Server Error',
                    data: null,
                };
                return Promise.reject(customError);
            }
        } else {
            // Handle non-Axios errors
            const customError: CustomError = {
                status: 500,
                message: 'Internal Server Error',
                data: null,
            };
            return Promise.reject(customError);
        }
    }
};

interface UploadOptions {
    baseURL?: string;
    file: File;
    method?: string;
    path?: string;
    headers?: Record<string, string>;
}

export const axiosHandleUpload = async ({
    baseURL = import.meta.env.VITE_API_URL || '',
    file,
    path = '/upload',
    headers,
}: UploadOptions): Promise<AxiosResponse<any>> => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post(`${baseURL}${path}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                ...headers,
            },
        });

        console.log('File uploaded successfully:', response.data);
        return response;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            if (axiosError.response) {
                // The request was made, but the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Error uploading file:', axiosError.response.data);
                return Promise.reject(axiosError.response);
            } else if (axiosError.request) {
                // The request was made, but no response was received
                console.error('No response received:', axiosError.request);
                return Promise.reject({ status: axiosError.status || 500, message: 'Internal Server Error', data: null });
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Request setup error:', axiosError.message);
                return Promise.reject({ status: axiosError.status || 500, message: 'Internal Server Error', data: null });
            }
        } else {
            // Handle non-Axios errors
            console.error('Non-Axios error:', error.message);
            return Promise.reject({ status: 500, message: 'Internal Server Error', data: null });
        }
    }
};