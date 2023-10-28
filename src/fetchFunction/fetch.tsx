import axios from "axios";

const fetchData = async (url: string) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
export default fetchData;

export const axiosData = async (url: string) => {
  const data = axios.get(url);
  return data;
};
