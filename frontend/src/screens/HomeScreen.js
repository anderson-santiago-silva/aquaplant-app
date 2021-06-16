import React, { useEffect, useState } from 'react';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';

import { Swiper, SwiperSlide } from "swiper/react";

import SwiperCore, { Navigation, Pagination } from 'swiper';


import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
import "swiper/components/navigation/navigation.min.css"

SwiperCore.use([Pagination,Navigation]);


export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts({}));
  }, [dispatch]);
  return (
    <div>
      <h1>P R O D U T O S</h1>
      <div className="row center">
      {loading ? (
        <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <div className="row center">
              <Swiper  
                slidesPerView={4.5} 
                spaceBetween={1} 
                slidesPerGroup={2} 
                loop={true} 
                loopFillGroupWithBlank={true} 
                pagination={{"clickable": true}} 
                navigation={true} 
                className="mySwiper">

                  {products.map((product) => (
                    <SwiperSlide>
                      <Product key={product._id} product={product}></Product>
                    </SwiperSlide>
                    ))}
              </Swiper>
            </div>
      )}
      </div>
    </div>
  );
}
