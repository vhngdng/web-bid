import React, { useState } from 'react';
import { DOMAIN_URL } from '~/CONST/const';

function ImageSlideShow({ images }) {
    // const [imageSlide, setImageSlide] = useState([]);
    const [indexImage, setIndexImage] = useState(0);
    // useEffect(() => {
    //     images.length > 1 && setImageSlide(images.slice(1, images.length));
    // }, [images]);
    console.log(images);
    return (
        <div className="w-full my-5">
            <div className="flex justify-center items-center">
                <div className="w-30vw h-50vh p-3 bg-white/30 p-3">
                    <img
                        className="w-full h-full object-cover rounded-lg shadow-[0_50px_25px_-24px_rgb(0,0,0,0.3)]"
                        src={
                            images[indexImage].includes('static/media')
                                ? images[indexImage]
                                : `${DOMAIN_URL}api/v1/images/read/${images[indexImage].id}`
                        }
                    />
                </div>
            </div>
            <div className="flex flex-wrap mt-7">
                {images.length > 1 &&
                    images.map((image, index) => (
                        <div
                            className={`w-48 bg-white/30 h-48 rounded-lg m-3 p-3
                                                                ${
                                                                    images.indexOf(
                                                                        image,
                                                                    ) ===
                                                                    indexImage
                                                                        ? 'ring-offset-2 ring-blue-300 ring-2 shadow-[0_50px_25px_-24px_rgb(0,0,0,0.3)] rounded-lg'
                                                                        : 'contrast-50'
                                                                }`}
                            onClick={() => setIndexImage(images.indexOf(image))}
                            key={index}
                        >
                            <img
                                className="w-full h-full object-cover rounded-lg"
                                src={image}
                            />
                        </div>
                    ))}
            </div>
            {/* {imageSlide.length > 1 &&
                imageSlide.map((image, index) => (
                    <div
                        key={index}
                        className="w-full h-30vh p-3 bg-white/30 rounded-lg"
                    >
                        <img
                            className="w-full h-full object-cover rounded-lg shadow-[0_50px_25px_-24px_rgb(0,0,0,0.3)]"
                            src={
                                image.includes('static/media')
                                    ? image
                                    : `${DOMAIN_URL}api/v1/images/read/${image.id}`
                            }
                        />
                    </div>
                ))} */}
        </div>
    );
}

export default ImageSlideShow;
