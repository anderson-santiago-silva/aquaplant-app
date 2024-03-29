import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Axios from '../../node_modules/axios/index';
import { detailsProduct, updateProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

export default function ProductEditScreen(props) {
  const productId = props.match.params.id;
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');

  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      props.history.push('/productlist');
    }
    if (!product || product._id !== productId || successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch(detailsProduct(productId));
    } else {
      setName(product.name)
      setPrice(product.price)
      setImage(product.image)
      setCategory(product.category)
      setCountInStock(product.countInStock)
      setBrand(product.brand)
      setDescription(product.description)
    }
  }, [product, dispatch, productId, successUpdate, props.history]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        category,
        brand,
        countInStock,
        description,
      })
    );
  }

const [loadingUpload, setLoadingUpload] = useState(false);
const [errorUpload, setErrorUpload] = useState('');

const userSignin = useSelector((state) => state.userSignin);
const { userInfo } = userSignin;
const uploadFileHandler = async (e) => {
  const file = e.target.files[0];
  const bodyFormData = new FormData();
  bodyFormData.append('image', file);
  setLoadingUpload(true);
  try {
    const { data } = await Axios.post('/api/uploads', bodyFormData, {
      headers: { 
        'Content-Type' : 'multipart/form-data',
        Authorization: `Bearer ${userInfo.token}`,
    },
    });
    setImage(data);
    setLoadingUpload(false);
  } catch (error) {
    setErrorUpload(error.message);
    setLoadingUpload(false);
  }
};

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Editar produto {productId}</h1>
        </div>
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="name">Nome</label>
              <input 
                id="name"
                type="text"
                placeholder="Nome do produto"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="price">Preço unitário</label>
              <input 
                id="price"
                type="text"
                placeholder="Valor unitário"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="image">Foto</label>
              <input 
                id="image"
                type="text"
                placeholder="imagem"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />

            </div>
            <div>
              <label htmlFor="imageFile">Image File</label>
              <input 
                type="file" 
                id="imageFile"
                label="Choose Image"
                onChange={uploadFileHandler}  
              />
              {loadingUpload && <LoadingBox></LoadingBox>}
              {errorUpload && (
                <MessageBox variant="danger">{errorUpload}</MessageBox>
              )}
            </div>
            <div>
              <label htmlFor="category">Categoria</label>
              <input 
                id="category"
                type="text"
                placeholder="Categoria do produto"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="brand">Marca</label>
              <input 
                id="brand"
                type="text"
                placeholder="Marca do produto"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="countInStock">Estoque</label>
              <input 
                id="countInStock"
                type="text"
                placeholder="Quantidade"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="description">Descrição</label>
              <input 
                id="description"
                rows="3"
                type="text"
                placeholder="Nome do produto"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label />
              <button className="primary" type="submit">
                Atualizar
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  )
}
