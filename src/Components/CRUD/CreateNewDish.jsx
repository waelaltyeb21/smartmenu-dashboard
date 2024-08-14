import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useRef } from "react";
import { useState } from "react";
import useFetch from "../../Hooks/useFetch";
import axios from "axios";
import { toast } from "react-hot-toast";
const CreateNewDish = () => {
  const dishImage = useRef();
  const selectedImage = useRef();
  const [name, setName] = useState({
    ar: "",
    en: "",
  });
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [active, setActive] = useState(true);
  // Fetch Data From Server
  const SERVER_URL = import.meta.env.VITE_REACT_SERVER_HOST_URL;
  const { data, isLoading, error } = useFetch(`${SERVER_URL}dishes/all`);
  if (isLoading) return <h3>Loading...</h3>;
  if (error) return <h3>Error</h3>;
  const createNew = (event) => {
    event.preventDefault();
    if (name.ar == "" && name.en == "" && price == 0 && category == "") {
      console.log("Data Needed");
      return;
    }
    const dishImage = new FormData();
    dishImage.append("image", image);
    console.log(dishImage);
    const dish = {
      name: {
        ar: name.ar,
        en: name.en,
      },
      price: price,
      category,
      imageFile: image,
      image: image.name,
      active: active,
    };
    console.log(dish);
    console.log(`${SERVER_URL}dishes/create_new_dish`)
    axios
      .post(`${SERVER_URL}dishes/create_new_dish`, dish, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then((res) => {
        if (res.status === 201) {
          console.log(res);
          toast.success(res.data.msg);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <section className="px-4">
      <div className="heading mt-4 p-4 bg-slate-400 outline-dashed outline-offset-2 rounded-md">
        <h1 className="text-center text-2xl font-bold">اضافة صنف جديد</h1>
      </div>
      <form>
        <div className="mt-10 grid gap-x-6 gap-y-8 grid-cols-6 text-right">
          <div className="lg:md:col-span-3 col-span-6">
            <label
              htmlFor="ar-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              اسم الصنف بالعربي*
            </label>
            <div className="mt-2">
              <input
                id="ar-name"
                name="name_ar"
                type="text"
                value={name.ar}
                onChange={(event) =>
                  setName({ ...name, ar: event.target.value })
                }
                autoComplete="given-name"
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
              />
            </div>
          </div>
          <div className="lg:md:col-span-3 col-span-6">
            <label
              htmlFor="en-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              اسم الصنف بالانجليزي*
            </label>
            <div className="mt-2">
              <input
                id="en-name"
                name="name_en"
                type="text"
                autoComplete="given-name"
                value={name.en}
                onChange={(event) =>
                  setName({ ...name, en: event.target.value })
                }
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
              />
            </div>
          </div>
          <div className="lg:md:col-span-3 col-span-6">
            <label
              htmlFor="category"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              قسم الصنف*
            </label>
            <div className="mt-2">
              <select
                onChange={(event) => setCategory(event.target.value)}
                className="w-full p-1.5 border-2 border-slate-300 rounded"
              >
                <option disabled defaultValue={"اختر قسم الصنف"}>
                  اختر قسم الصنف
                </option>
                {data.categories.map((cate) => (
                  <option value={cate.name_en} key={cate._id}>
                    {cate.name_ar}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="lg:md:col-span-3 col-span-6">
            <label
              htmlFor="category"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              سعر الصنف*
            </label>
            <div className="mt-2">
              <input
                id="category"
                name="price"
                type="number"
                autoComplete="given-name"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
              />
            </div>
          </div>
          <div className="lg:md:col-span-3 col-span-6">
            <label
              htmlFor="image"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              صورة الصنف*
            </label>
            <div className="mt-2">
              <div className="col-span-3">
                <div
                  className="mt-2 flex items-center gap-x-3"
                  ref={dishImage}
                  onClick={() => selectedImage.current.click()}
                >
                  <UserCircleIcon className="h-12 w-12 text-gray-300" />
                  <input
                    className="hidden"
                    type="file"
                    name="image"
                    ref={selectedImage}
                    onChange={(event) => setImage(event.target.files[0])}
                  />
                  <button
                    type="button"
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    اختيار صورة
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-3">
            <label
              htmlFor="active"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              متوفر ؟*
            </label>
            <div className="mt-2">{active ? "نعم" : "لا"}</div>
          </div>
        </div>
        <div className="upload w-full my-8">
          <button
            onClick={createNew}
            className="block mx-auto lg:md:w-3/12 w-full py-1 bg-blue-500 text-slate-100 shadow-lg shadow-blue-300 rounded-md cursor-pointer"
          >
            انشاء صنف جديد
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreateNewDish;
