export const uploadImage = async (formData: FormData) => {
  const response = await fetch('/api/image', {
    method: 'POST',
    body: formData,
  });
  const data = await response.json();
  if (data) return data;
};
export const fetchImages = async (productId: string) => {
  const response = await fetch(`/api/image?productId=${productId}`);
  const data = await response.json();
  if (data) return data;
};

export const deleteImage = async (imageId: string) => {
  const response = await fetch(`/api/image?imageId=${imageId}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  if (data) return data;
};
