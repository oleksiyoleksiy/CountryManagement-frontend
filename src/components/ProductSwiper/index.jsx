import { Swiper, SwiperSlide } from 'swiper/react'
import styles from './index.module.scss'
import 'swiper/css'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function ProductSwiper() {
  const products = useSelector(state => state.product.products)

  return (
    <Swiper spaceBetween={50} slidesPerView={5} loop>
      {products.length > 0 &&
        products.map((product, index) => (
          <SwiperSlide key={index}>
            <div className={styles.card}>
              <div className={styles.card__name}>{product.name}</div>
              <div className={styles.card__count}>x{product.count}</div>
              <div className={styles.card__imageHolder}>
                <img
                  className={styles.card__image}
                  src={product.image}
                  alt="fossil-img"
                />
              </div>

              <div className={styles.seller}>
                sold by{' '}
                <span className={styles.seller__value}>{product.seller}</span>
              </div>
              <Link
                className={styles.card__button}
                to={`/marketplace/purchase/${product.id}`}
              >
                <div className={styles.price}>
                  <div className={styles.price__content}>
                    <img
                      className={styles.price__icon}
                      src="/money.webp"
                      alt="money-icon"
                    />
                    <div className={styles.price__value}>{product.price}</div>
                  </div>
                  <div className={styles.price__label}>per unit</div>
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  )
}

export default ProductSwiper
