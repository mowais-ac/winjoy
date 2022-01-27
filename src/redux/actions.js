import EncryptedStorage from "react-native-encrypted-storage";
import Config from "react-native-config";

import types from './types';
const API_URL = 'https://mocki.io/v1/48419bdb-1d76-45a1-89cb-3ac3fcc7f6ca';



export const UpdateBell = (params) => {
    return (dispatch) => {
        dispatch(UpdateCount(params));
    };

    function UpdateCount(count) {
        return { type: types.UPDATE_BELL, count };
    }
};


export const getWalletData = () => {

    try {
        return async dispatch => {
            const Token = await EncryptedStorage.getItem("Token");
            const result = await fetch(`${Config.API_URL}/wallet`, {
                method: 'GET',
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                    Authorization: `Bearer ${Token}`,
                },
            });
            const json = await result.json();
            if (json && json.status === "success") {
                dispatch({
                    type: types.GET_WALLET_DATA,
                    payload: json
                });
            } else {
                console.log('Unable to fetch!');
            }
        }
    } catch (error) {
        console.log(error);
    }
}

export const getLandingScreen = () => {

    try {
        return async dispatch => {
            const Token = await EncryptedStorage.getItem("Token");
            console.log("tokenR", Token);
            const result = await fetch(`${Config.API_URL}/home`, {
                method: 'GET',
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                    Authorization: `Bearer ${Token}`,
                },
            });
            const json = await result.json();
            console.log("json", json);
            if (json && json.status === "success") {
                dispatch({
                    type: types.GET_LANDING_DATA,
                    payload: json
                });
            } else {
                console.log('Unable to fetch!');
            }
        }
    } catch (error) {
        console.log("error", error);
    }
}
export const getProducts = (isClosing) => {
    let check = ""
    if (isClosing) {
        check = "?is_closing_soon=" + isClosing
    } else {
        check = "";
    }
    try {
        return async dispatch => {
            const Token = await EncryptedStorage.getItem("Token");
            const result = await fetch(`${Config.API_URL}/products/list/${check}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                    Authorization: `Bearer ${Token}`,
                },
            });
            const json = await result.json();
            if (json && json.status === "success") {
                dispatch({
                    type: types.GET_PRODUCTS_LIST,
                    payload: json
                });
            } else {
                console.log('Unable to fetch!');
            }
        }
    } catch (error) {
        console.log(error);
    }
}
export const getLiveShowPlans = () => {

    try {
        return async dispatch => {
            const Token = await EncryptedStorage.getItem("Token");
            const result = await fetch(`${Config.API_URL}/gameshow_live_plans`, {
                method: 'GET',
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                    Authorization: `Bearer ${Token}`,
                },
            });
            const json = await result.json();
            if (json && json.status === "success") {
                dispatch({
                    type: types.GET_LIVE_PLANS,
                    payload: json
                });
            } else {
                console.log('Unable to fetch!');
            }
        }
    } catch (error) {
        console.log(error);
    }
}
export const getAllCreator = () => {

    try {
        return async dispatch => {
            const Token = await EncryptedStorage.getItem("Token");
            const result = await fetch(`${Config.API_URL}/fanjoy/index`, {
                method: 'GET',
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                    Authorization: `Bearer ${Token}`,
                },
            });
            const json = await result.json();

            if (json && json.status === "success") {
                dispatch({
                    type: types.GET_FANJOY_DATA,
                    payload: json
                });
            } else {
                console.log('Unable to fetch fanjoyAPI!');
            }
        }
    } catch (error) {
        console.log(error);
    }
}
export const GetGalleryData = (id) => {
    try {
        return async dispatch => {
            const Token = await EncryptedStorage.getItem("Token");
            const result = await fetch(`${Config.API_URL}/gallery/index?user_id=${id}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                    Authorization: `Bearer ${Token}`,
                },
            });
            const json = await result.json();
            if (json && json.status === "success") {
                dispatch({
                    type: types.GALLERY_DATA,
                    payload: json
                });
            } else {
                console.log('Unable to fetch!');
            }
        }
    } catch (error) {
        console.log(error);
    }
}
export const GetCreatorPageData = (id) => {
    try {
        return async dispatch => {
            const Token = await EncryptedStorage.getItem("Token");
            const result = await fetch(`${Config.API_URL}/celebrity/detail/${id}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                    Authorization: `Bearer ${Token}`,
                },
            });
            const json = await result.json();
            if (json && json.status === "success") {
                dispatch({
                    type: types.CREATOR_PAGE_DATA,
                    payload: json
                });
            } else {
                console.log('Unable to fetch!',json);
            }
        }
    } catch (error) {
        console.log(error);
    }
}
export const ExperienceProductData = (id) => {
    try {
        return async dispatch => {
            const Token = await EncryptedStorage.getItem("Token");
            const result = await fetch(`${Config.API_URL}/experience/product_list?experience_id=${id}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                    Authorization: `Bearer ${Token}`,
                },
            });
            const json = await result.json();
            if (json && json.status === "success") {
                dispatch({
                    type: types.WIN_EXPERIENCE_PRODUCT_DATA,
                    payload: json
                });
            } else {
                console.log('Unable to fetch!');
            }
        }
    } catch (error) {
        console.log(error);
    }
}
export const ExperienceProductDetal = (expId, productId) => {
    try {
        return async dispatch => {
            const Token = await EncryptedStorage.getItem("Token");
            const result = await fetch(`${Config.API_URL}/experience/${expId}/product/detail/${productId}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                    Authorization: `Bearer ${Token}`,
                },
            });
            const json = await result.json();
            if (json && json.status === "success") {
                dispatch({
                    type: types.EXPERIENCE_PRODUCT_DETAILS,
                    payload: json
                });
            } else {
                console.log('Unable to fetch!');
            }
        }
    } catch (error) {
        console.log(error);
    }
}
export const ExperienceDetals = (experience_id,celebrity_id) => {
    console.log(experience_id,celebrity_id);
    try {
        return async dispatch => {
            const Token = await EncryptedStorage.getItem("Token");
            const result = await fetch(`${Config.API_URL}/experience/detail?experience_id=${experience_id}&celebrity_id=${celebrity_id}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                    Authorization: `Bearer ${Token}`,
                },
            });
            const json = await result.json();
            console.log("jsonS",json);
            if (json && json.status === "success") {
                dispatch({
                    type: types.EXPERIENCE_DETAILS,
                    payload: json
                });
            } else {
                console.log('Unable to fetch!');
            }
        }
    } catch (error) {
        console.log(error);
    }
}



