import React from "react";
import { Link } from "react-router-dom";

function HelloPage() {
  return (
    <div className="d-flex">
      <div className="container">
        <div className="row mt-5">
          <h2 className="text-center">
            Тестове завдання для "Зернова Столиця" вiд Панченко Нiкiти
          </h2>
          <p className="text-center">
            У цьому додатку я реалізував додавання, редагування та видалення
            користувачів Стек: React, redux-toolkit, rtk query, typescript,
            bootstrap, fontawesome, formik, yup. На дизайн часу багато не витрачав, упор на логiку.
          </p>
          <div className="d-flex justify-content-center">
            <button style={{border:"none", padding:"10px 15px", borderRadius:"10px"}}>
              <Link to={"/users/"} style={{color:"black"}}>Go to users page</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HelloPage;
