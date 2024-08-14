import { useState } from "react";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import useFetch from "../../Hooks/useFetch";
import DishDetails from "../DishDetails/DishDetails";
import axios from "axios";
import toast from "react-hot-toast";

const DisplayDishes = () => {
  const target = useRef();
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [dish, setDish] = useState({});
  const IMAGE_URL = import.meta.env.VITE_REACT_IMAGE_URL;
  const SERVER_URL = import.meta.env.VITE_REACT_SERVER_HOST_URL;
  const { data, isLoading, error } = useFetch(
    `${`${SERVER_URL}dishes/all`}`
  );
  if (isLoading) return <h3>Loading...</h3>;
  if (error) return <h3>Error</h3>;
  // Catch Target Dish
  const handleEvent = (val, id) => {
    setOpen(true);
    setShow(!val);
    // Get Dish Details
    const dish = data.dishes.find((dish) => dish._id == id);
    setDish(dish);
  };
  // Delete Target Dish
  const deleteDish = (id) => {
    axios
      .delete(`${SERVER_URL}dishes/delete_dish/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setOpen((prv) => !prv);
          target.current.style.display = "none";
          toast.success(res.data.msg);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <section className="DisplayDishes px-4">
      <div className="heading mt-4 p-4 bg-slate-400 outline-dashed outline-offset-2 rounded-md">
        <h1 className="text-center text-2xl font-bold">الاصناف</h1>
      </div>
      {/* Select Or Tabs */}
      <div className="dishesOrCategories"></div>
      {/* Select */}
      <div className="categories"></div>
      <div className="dishesList mt-4 grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4 *:shadow-md *:p-4 *:rounded">
        {data.dishes.map((dish) => (
          <div
            key={dish._id}
            ref={target}
            className="dish flex flex-col justify-center items-center text-center"
          >
            <div className="heading w-full flex lg:md:flex-row justify-between items-center flex-col-reverse">
              <div className="text">
                <h1 className="text-2xl">{dish.name.ar}</h1>
                <span>{dish.price}</span>
              </div>
              <div className="img">
                <img
                  className="w-16"
                  src={`${IMAGE_URL + dish.image}`}
                  alt="dish image"
                />
              </div>
            </div>
            <div className="btns mt-2 lg:md:w-fit w-full flex lg:md:flex-row flex-col items-center lg:md:*:mx-2 mx-0">
              <button
                onClick={() => handleEvent(true, dish._id)}
                className="bg-blue-500 w-full text-slate-100 lg:md:mb-0 mb-2 px-4 py-0.5 rounded"
              >
                تعديل
              </button>
              <button
                onClick={() => handleEvent(false, dish._id)}
                className="bg-red-500 w-full text-slate-100 px-4 py-0.5 rounded"
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Modal */}
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  {show && (
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon
                        aria-hidden="true"
                        className="h-6 w-6 text-red-600"
                      />
                    </div>
                  )}
                  <div className="mt-3 sm:ml-4 sm:mt-0">
                    <DialogTitle
                      as="h3"
                      className="text-base text-center font-semibold leading-6 text-gray-900"
                    >
                      {show ? "حذف الصنف" : "تفاصيل الصنف"}
                    </DialogTitle>
                    <div className="mt-2">
                      {show ? (
                        <p>هل انت متأكد من حذف {"الصنف"} </p>
                      ) : (
                        dish && (
                          <DishDetails
                            dish={dish}
                            categories={data.categories}
                            setOpen={setOpen}
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* Buttons */}
              {show && (
                <div className="bg-gray-50 px-4 py-3 justify-between items-center sm:flex sm:flex-row-reverse sm:px-6">
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
                    onClick={() => deleteDish(dish._id)}
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto transition-3"
                  >
                    حذف
                  </button>
                </div>
              )}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </section>
  );
};

export default DisplayDishes;
