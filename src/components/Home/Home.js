import { useEffect, useState } from "react";
import axios from "axios";
import { Transition } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import Nav from "../Navigation/Nav";

const Home = () => {
  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    // Call function to get all images on component mount
    getImages().then(() => {});
    // eslint-disable-next-line
  }, []);

  const getImages = async () => {
    try {
      const response = await axios.get(
        `http://54.185.56.193:4000/images/${userId}`
      );
      const images = response.data.map((image) => {
        return { url: image.url, name: image.name };
      });
      setImages(images);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const fileType = file.type.split("/")[0];
    if (fileType === "image" || fileType === "gif") {
      setSelectedFile(file);
      setUploadProgress(0);
      setError(false);
    } else {
      setSelectedFile(null);
      setUploadProgress(0);
      setError(true);
    }
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("from", userId);
    formData.append("file", selectedFile);
    formData.append("name", selectedFile.name);
    formData.append("type", selectedFile.type);

    axios
      .post("http://54.185.56.193:4000/api/upload", formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      })
      .then(() => {
        setSuccess(true);
        getImages().then(() => {});
      })
      .catch(() => {
        setError(true);
      });
  };

  const deleteImage = async (imageName) => {
    try {
      await axios.delete(`http://54.185.56.193:4000/images/${imageName}`);
      setImages(images.filter((image) => image.name !== imageName));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex relative flex-col h-screen w-screen max-h-screen bg-slate-300 '>
      <Nav />
      <div className='min-w-full bg-transparent basis-12'>
        <div className='px-6 py-4'>
          <label className='block text-gray-700 font-bold mb-2'>
            Select a file:
          </label>
          <input type='file' accept='image/*,gif' onChange={handleFileChange} />
          {selectedFile && (
            <>
              <div className='mt-4'>
                <span className='text-gray-700 font-bold'>File name:</span>{" "}
                {selectedFile.name}
              </div>
              <div className='mt-2'>
                <span className='text-gray-700 font-bold'>File type:</span>{" "}
                {selectedFile.type}
              </div>
              <div className='mt-2'>
                <span className='text-gray-700 font-bold'>File size:</span>{" "}
                {selectedFile.size} bytes
              </div>
            </>
          )}
          {error && (
            <div className='mt-4'>
              <span className='text-red-500'>
                Only image and gif files are allowed.
              </span>
            </div>
          )}
          <div className='mt-4'>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              onClick={handleUpload}
              disabled={!selectedFile || uploadProgress > 0}
            >
              Upload
            </button>
            <Transition
              show={uploadProgress > 0 && uploadProgress < 100}
              enter='transition-opacity duration-500'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity duration-500'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div className='mt-2'>
                <div className='bg-gray-200 rounded-lg overflow-hidden'>
                  <div
                    className='bg-blue-500 h-2'
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <div className='text-gray-700 text-xs mt-2'>
                  {uploadProgress}%
                </div>
              </div>
            </Transition>
            <Transition
              show={success}
              enter='transition-opacity duration-500'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity duration-500'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div className='mt-4 flex items-center'>
                <CheckCircleIcon className='h-5 w-5 text-green-500 mr-2' />
                <span className='text-gray-700 font-bold'>
                  File uploaded successfully!
                </span>
              </div>
            </Transition>
          </div>
        </div>
      </div>

      <div className='flex w-screen absolute bottom-0 justify-center bg-black xl:basis-[50%]'>
        <div className='grid  auto-cols-max grid-flow-col overflow-y-auto gap-x-16 mx-8 px-12 py-12 h-full w-full place-items-center  '>
          {images.reverse().map((image, index) => (
            <div
              key={index}
              className='bg-white border border-white relative group laptop:w-[300px] laptop:h-[300px]  phone:w-[200px] phone:h-[200px] rounded-lg h-80'
            >
              <img
                src={image.url}
                className='rounded-lg flex relative top-[0px]  object-cover w-full h-full'
                alt={image.name}
              />
              <div className='rounded-lg h-full w-full absolute top-0 right-0 pt-4 bg-gray-900 bg-opacity-50 transition-opacity duration-300 opacity-0 group-hover:opacity-100 '>
                <div className='flex justify-end bg-transparent z-10 w-full h-full '>
                  <div className='flex min-w-full justify-between '>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a
                      href={image.url}
                      target='_blank'
                      rel='noreferrer'
                      className='flex text-white justify-start group w-6 pl-6 h-6 focus:outline-none text-2xl '
                    >
                      <span className='sr-only'>download</span>
                      <i className='fa-solid hover:animate-pulse fa-expand'></i>
                    </a>
                    <button
                      className='flex text-white justify-end group w-6 pr-6 h-6 focus:outline-none text-2xl '
                      onClick={() => deleteImage(image.name)}
                    >
                      <span className='sr-only'>options</span>
                      <i className='fa-solid hover:animate-pulse fa-trash'></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
