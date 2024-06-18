import axios from "axios";

const fetchEvidenceImageData = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    return { message: err?.response?.data?.message || err.message };
  }
};

export const evidenceImageService = { fetchEvidenceImageData };
