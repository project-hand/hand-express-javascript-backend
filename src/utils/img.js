export const getPostImageList = (files) => {
  const fileArray = files;
  const postImages = [];
  fileArray.map((data) => postImages.push(data.location));
  return postImages;
};
