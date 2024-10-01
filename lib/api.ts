// lib/api.ts
import axios from "axios";

const API_URL = "https://5b41-43-231-238-206.ngrok-free.app";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export const login = async (username: string, password: string) => {
  const formData = new FormData();
  formData.append("uname", username);
  formData.append("password", password);

  const response = await api.post("/authentication/login_user", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.access;
};

export const register = async (userData: any) => {
  const response = await api.post("/authentication/register_user", userData);
  return response.data.access_token;
};

// @/lib/api.ts

export const getProducts = async (activity?: string[]) => {
  try {
    const response = await api.post("/store/show_products", { activity });
    // Check if the response has a data property, if not, return the whole response
    return response.data.hasOwnProperty("data")
      ? response.data
      : { data: response.data };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProduct = async (productId: number) => {
  const formData = new FormData();
  formData.append("product_id", productId.toString());
  // const response = await api.post("/store/show_product", {
  //   product_id: productId,
  // });
  const response = await api.post("/store/show_product", { product_id: JSON.stringify(productId) });
  return response.data;
};

export const addToCart = async (productId: number) => {
  // const formData = new FormData();
  // formData.append("product_id", productId.toString());
  // const response = await api.post("/store/add_to_cart", formData);
  const response = await api.post('/store/add_to_cart', { product_id: JSON.stringify(productId) });
  return response.data;
};

export const getCart = async () => {
  const response = await api.post("/store/show_cart");
  return response.data;
};

export const placeOrder = async () => {
  const response = await api.post("/store/place_order");
  return response.data;
};

export const getCheckoutRecommendations = async (activity: string) => {
  const response = await api.post("/store/checkout_recommendation", {
    activity,
  });
  return response.data.data;
};
