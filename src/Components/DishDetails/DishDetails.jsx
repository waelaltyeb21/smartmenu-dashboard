import { UserCircleIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const DishDetails = ({ dish, categories, setOpen }) => {
  const SERVER_URL = import.meta.env.VITE_REACT_SERVER_HOST_URL;
  const [name, setName] = useState({
    ar: dish.name.ar,
    en: dish.name.en,
  });
  const dishCategory = categories.find(
    (category) => category.name_en == dish.category
  );
  const [price, setPrice] = useState(dish.price);
  const [category, setCategory] = useState({
    name_ar: dishCategory.name_ar,
    name_en: dishCategory.name_en,
  });
  const updateDish = async () => {
    const data = {
      id: dish._id,
      name,
      category,
      price,
    };
    await axios
      .post(`${SERVER_URL}dishes/update_dish`, data)
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          toast.success(res.data.msg);
          setOpen((prv) => !prv);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <form>
        <div className="mt-10 grid gap-x-6 gap-y-8 grid-cols-6 text-right">
          <div className="col-span-3">
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
          <div className="col-span-3">
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
          <div className="col-span-3">
            <label
              htmlFor="category"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              قسم الصنف*
            </label>
            <div className="mt-2">
              <select
                defaultValue={dishCategory.name_ar}
                onChange={(event) => setCategory(event.target.value)}
                className="w-full p-1.5 border-2 border-slate-300 rounded"
              >
                <option value={dishCategory.name_ar}>
                  {dishCategory.name_ar}
                </option>
                {categories.map((cate) => (
                  <option value={cate._id} key={cate._id}>
                    {cate.name_ar}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-span-3">
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
          <div className="col-span-3">
            <label
              htmlFor="image"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              صورة الصنف*
            </label>
            <div className="mt-2">
              <div className="col-span-full">
                <div className="mt-2 flex items-center gap-x-3">
                  <UserCircleIcon
                    className="h-12 w-12 text-gray-300"
                  />
                  {/* <input className="hidden" type="file" name="image" /> */}
                  <button
                    type="button"
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Change
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
            <div className="mt-2">{dish.active ? "نعم" : "لا"}</div>
          </div>
        </div>
      </form>
      <div className="bg-gray-50 sm:*:mb-0 *:mb-2  px-4 py-3 justify-between items-center sm:flex sm:flex-row-reverse sm:px-6">
        <button
          type="button"
          data-autofocus
          onClick={() => setOpen(false)}
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto transition-3"
        >
          الغاء
        </button>
        <button
          type="button"
          // onClick={() => setOpen(false)}
          onClick={updateDish}
          className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto transition-3"
        >
          تحديث
        </button>
      </div>
    </div>
  );
};

export default DishDetails;
