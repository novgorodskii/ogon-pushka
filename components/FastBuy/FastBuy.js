import React, {useContext, useState, useEffect} from 'react';
import {ProductsContext} from '../../context/context.js';
import { useFormik } from 'formik';
import ButtonForm from '../ButtonForm';
import style from '../FormContent/FormContent.module.css';
import MaskedInput from "react-text-mask";
import { useRouter } from 'next/router'

import apiOrder from '../../helpers/apiOrder';
const api = new apiOrder();

const validate = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "Це обов'язкове поле.";
  } else if (values.firstName.length > 15) {
    errors.firstName = 'Має бути не більше 15 символів';
  }

  const num = values.phone.replace(/[^0-9]/g, '');
  const arr = num.split('');

  if (!values.phone) {
    errors.phone = "Це обов'язкове поле.";
  } else if (arr.length != 10) {
    errors.phone = 'Перевірте формат номера мобільного телефону';
  }

  return errors;
};

const phoneNumberMask = [
  "(",
  /[0-9]/,
  /\d/,
  /\d/,
  ")",
  " ",
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
  /\d/,
  /\d/
];

const Succes = ({text}) => {
  const classes = text === "Замовлення підтверджено" ? style.succesActive : style.succes;
  return (
    <div className={classes}>
      {text}
    </div>
  )
};

const FastBuy = () => {
  const router = useRouter();
  const store = useContext(ProductsContext);
  const [ status, setStatus ] = useState('Підтвердити замовлення');
  const formik = useFormik({
    initialValues: {
      firstName: '',
      phone: '',
    },
    "validateOnChange": false,
    validate,
    
    onSubmit: values => {
      const {firstName,phone,} = values;
      const data = {
        user_firstname: firstName,
        user_phone: phone,
        products: store.products
      }
      api.sendFastBuy(data).then(data => {
        setStatus("Замовлення підтверджено")
      });
    },
  });


  useEffect(() => {
    if (status === "Замовлення підтверджено") {
      const timer = setTimeout(() => {
        setStatus('Підтвердити замовлення');
        router.push('/');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <div className={style.form}>
      <Succes  text={status} />
      <h2>Оформлення замовлення</h2>
      <h3>Інформація про одержувача:</h3>
      <form onSubmit={formik.handleSubmit}>
        <input
          placeholder="Ім’я"
          id="firstName"
          name="firstName"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.firstName}
        />
        {formik.errors.firstName ? <div className={style.errors}>{formik.errors.firstName}</div> : null}

        <h3>Телефон:</h3>
        <div className={style.phone}>
          <input disabled value="+38" />
          <MaskedInput
            mask={phoneNumberMask}
            id="phone"
            name="phone"
            type="phone"
            autoComplete="off"
            onChange={formik.handleChange}
            value={formik.values.phone}
          />
          
        </div>
        {formik.errors.phone ? <div className={style.errors}>{formik.errors.phone}</div> : null}

        <div className={style.sum}>
          <div>До оплати</div>
          <div>{store.sum} грн</div>
        </div>

        <div className={style.btn}>
          <ButtonForm text={status} />
        </div>
      </form>
    </div>
  );
};

export default FastBuy;