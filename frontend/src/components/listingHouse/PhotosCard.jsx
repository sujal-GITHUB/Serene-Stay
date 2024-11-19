/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { LiaPhotoVideoSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { PropagateLoader } from "react-spinners";
import { createNewHouse } from "../../redux/actions/houseActions";

const PhotosCard = () => {
  const newHouseData = useSelector((state) => state.house.newHouse);
  const [images, setImages] = useState([]);
  const [inputImage, setInputImage] = useState(null);
  const [isImgUploading, setIsImgUploading] = useState(false);
  const dispatch = useDispatch();

  const handleImageSelect = (event) => {
    if (images.length >= 3) {
      toast.error("Maximum images uploaded");
      return;
    } else {
      setInputImage(event.target.files[0]);
    }
  };

  // Saving photos state globally
  useEffect(() => {
    dispatch(
      createNewHouse(
        newHouseData?.houseType,
        newHouseData?.privacyType,
        newHouseData?.location,
        newHouseData?.floorPlan,
        newHouseData?.amenities,
        images
      )
    );
  }, [images, dispatch]);

  useEffect(() => {
    async function uploadImagetoCloudinary() {
      if (inputImage !== null && inputImage?.size / 500000 < 5) {
        const imageFormData = new FormData();
        const cloudName = "dpabeqemk";
        const uploadPreset = "hfvn9w3i";

        imageFormData.append("file", inputImage);
        imageFormData.append("upload_preset", uploadPreset);
        imageFormData.append("cloud_name", cloudName);

        setIsImgUploading(true);
        try {
          await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: "POST",
            body: imageFormData,
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.error) {
                toast.error(data.error.message);
                setIsImgUploading(false);
              } else {
                setImages([...images, data.url]);
                setIsImgUploading(false);
              }
            })
            .catch((err) => {
              toast.error(err.message + " - try again");
              setIsImgUploading(false);
            });
        } catch (error) {
          toast.error(error.message);
          setIsImgUploading(false);
        } finally {
          setInputImage(null);
        }
      } else if (inputImage?.size / 500000 > 5) {
        toast.error("Image size can't exceed 5MB");
        setIsImgUploading(false);
      }
    }

    uploadImagetoCloudinary();
  }, [inputImage]);

  return (
    <label
      htmlFor="houseImage"
      className="py-20 bg-white dark:bg-[#172252] rounded-3xl border-dashed border-[#b0b0b0] border flex justify-center items-center min-h-[340px]"
    >
      {isImgUploading ? (
        <PropagateLoader loading color="#717171" />
      ) : (
        <div className="flex flex-col justify-center items-center gap-3">
          <div>
            <LiaPhotoVideoSolid size={72} />
          </div>
          <div className="text-center h-[100px]">
            <h6 className="text-2xl text-black dark:text-gray-300 font-medium py-2">
              Select your photos here
            </h6>
            <p className="text-[#717171] mt-5 text-lg">
              {images.length !== 0 ? (
                <>
                  {images.length === 3
                    ? `${images.length} images uploaded`
                    : `Choose ${3 - images.length} more photos`}
                </>
              ) : (
                "Choose at least 3 photos"
              )}
            </p>
            <p className="text-black text-sm mt-1 dark:text-gray-300 underline underline-offset-2 font-medium cursor-pointer">
              Upload from your device
            </p>
          </div>
        </div>
      )}
      <input
        type="file"
        name="photos"
        className="hidden"
        onChange={handleImageSelect}
        id="houseImage"
        multiple
        accept=".jpg,.jpeg,.png,image/jpeg,image/jpg,image/png"
      />
    </label>
  );
};

export default PhotosCard;
