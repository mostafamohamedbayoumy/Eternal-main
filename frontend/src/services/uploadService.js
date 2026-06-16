import api from './api';

// Upload one or more image files, returns the resulting Cloudinary URLs
export const uploadImages = async (files) => {
  const formData = new FormData();
  files.forEach((file) => formData.append('images', file));

  // Let the browser set its own multipart boundary — overriding the api
  // instance's default 'application/json' header without a literal value.
  const response = await api.post('/upload', formData, {
    headers: { 'Content-Type': undefined },
  });
  return response.data.urls;
};
