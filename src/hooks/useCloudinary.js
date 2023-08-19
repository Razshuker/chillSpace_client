import { API_URL, doApiMethod } from '../services/apiService';
import { imageToString } from '../services/cloudService';

export const useCloudinary = () => {

    const uploadImage = async (fileRef) => {
        return new Promise(async (resolve, reject) => {
            try {
                const myFile = fileRef.current.files[0];
                const imageData = await imageToString(myFile);
                const url = API_URL + "/upload/uploadCloud";
                const data = await doApiMethod(url, "POST", { image: imageData });
                const dataUrl = data.url
                resolve(dataUrl);
            } catch (error) {
                console.log(error);
            }
        })
    }

    return { uploadImage }
}
