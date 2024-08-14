import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="Nav w-full h-dvh flex justify-center items-center">
      <div className="links">
        <Link
          to="/dashboard/create_dish"
          className="heading block mt-8 p-4 bg-slate-400 outline-dashed outline-offset-2 rounded-md cursor-pointer"
        >
          <span className="block text-center text-2xl font-bold">
            اضافة صنف جديد
          </span>
        </Link>
        <Link
          to="/dashboard/display_dishes"
          className="heading block mt-8 p-4 bg-slate-400 outline-dashed outline-offset-2 rounded-md cursor-pointer"
        >
          <span className="block text-center text-2xl font-bold">
            عرض جميع الاصناف
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Nav;
