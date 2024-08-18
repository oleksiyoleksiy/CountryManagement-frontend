import { Swiper, SwiperSlide } from 'swiper/react'
import styles from './index.module.scss'
import 'swiper/css'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useLanguage from '../../hooks/useLanguage'

function ProductSwiper() {
  const products = useSelector(state => state.product.products)
  const [slidesCount, setSlidesCount] = useState(5)
  const lang = useLanguage()

  useEffect(() => {
    calculateSlidesPerView()
  }, [])

  const calculateSlidesPerView = () => {
    const slidesPerView = Math.round(window.innerWidth / 300)
    setSlidesCount(slidesPerView)
  }

  return (
    <Swiper spaceBetween={30} slidesPerView={slidesCount} loop>
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
                {lang.general.soldBy}{' '}
                <span className={styles.seller__value}>
                  {product.country.name}
                </span>
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
                  <div className={styles.price__label}>
                    {lang.general.perUnit}
                  </div>
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  )
}

export default ProductSwiper
