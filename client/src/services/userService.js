import axios from 'axios';

const baseUrlTalent = 'http://localhost:5000/api/talents';
const baseurlCompany = 'http://localhost:5000/api/companies';

//talents services

export const registerTalent = async (userInfo) => {
  return await axios.post(`${baseUrlTalent}/register`, userInfo);
};

export const editTalent = async (data, id) => {
  return await axios.put(`${baseUrlTalent}/${id}`, data);
};

export const getOneTalent = (id) => {
  return axios.get(`${baseUrlTalent}/${id}`);
};

export const updateTalent = (id, updates) => {
  return axios.put(`${baseUrlTalent}/${id}`, updates);
};

//companies services
export const registerCompany = async (userInfo) => {
  return await axios.post(`${baseurlCompany}/register`, userInfo);
};

export const editCompany = async (data, id) => {
  return await axios.put(`${baseurlCompany}/${id}`, data);
};

export const getOneCompany = (id) => {
  return axios.get(`${baseurlCompany}/${id}`);
};

export const updateCompany = (id, updates) => {
  return axios.put(`${baseurlCompany}/${id}`, updates);
};
