import React, { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';

function ProductImage(props) {
  const [Images, setImages] = useState([]);

  useEffect(() => {
    if (props.detail.images && props.detail.images.length > 0) {
      const images = [];

      props.detail.images.map(item => {
        images.push({
          original: `http://localhost:5000/${item}`,
          thumbnail: `http://localhost:5000/${item}`,
        });
        return item;
      });

      setImages(images);
    }
    // props.detail이 변할때마다 이 라이프사이클을 한번 더 실행한다.
  }, [props.detail]);

  return (
    <div className="product-detail-image">
      <ImageGallery items={Images} />
    </div>
  );
}

export default ProductImage;
