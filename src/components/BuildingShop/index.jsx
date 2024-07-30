import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { buildingActions } from '../../store/buildingSlice'
import { countryActions } from '../../store/countrySlice'
import { indexBuildings } from '../../services/buildingService'
import styles from './index.module.scss'
import { CartFill } from 'react-bootstrap-icons'
import { countryBuildingStore } from '../../services/countryService'
import { useDebouncedCallback } from 'use-debounce'

const BuildingShop = () => {
  const dispatch = useDispatch()
  const buildings = useSelector(state => state.building.buildings)
  const token = useSelector(state => state.auth.token)
  const country = useSelector(state => state.country.currentCountry)

  const fetchBuildings = useCallback(async () => {
    if (token) {
      const response = await indexBuildings(token)
      dispatch(buildingActions.setBuildings(response))
    }
  }, [dispatch, token])

  const buy = useCallback(
    async buildingId => {
      try {
        const response = await countryBuildingStore(
          token,
          country.id,
          buildingId
        )
        dispatch(countryActions.setCurrentCountry(response.country))
        dispatch(countryActions.setBuildings(response.buildings))
      } catch (error) {
        console.error('Failed to buy building', error)
      }
    },
    [dispatch, token]
  )

  const debouncedBuy = useDebouncedCallback(buildingId => {
    buy(buildingId)
  }, 500)

  useEffect(() => {
    fetchBuildings()
  }, [fetchBuildings])

  const renderIncome = (type, value) => (
    <div key={type} className={styles.card__income}>
      <div className={styles.card__incomeWrapper}>
        <img
          className={styles.card__incomeIcon}
          title={type}
          src={`/${type}.webp`}
          alt="income-icon"
        />
        <div className={styles.card__incomeValue}>{value}</div>
      </div>
    </div>
  )

  const renderAllIncome = product => {
    const incomeEntries = Object.entries(product.resources_income).map(
      ([key, value]) => renderIncome(key, value)
    )

    return (
      <>
        {incomeEntries}
        {product.cooldown && (
          <>
            <span className={styles.card__incomeSeparator}>/</span>
            <div className={styles.card__incomeWrapper}>
              <img
                className={styles.card__incomeIcon}
                src="/time.webp"
                alt="time-icon"
              />
              <div className={styles.card__cooldown}>{product.cooldown}m</div>
            </div>
          </>
        )}
      </>
    )
  }

  const renderPrice = (resource, value) => (
    <div key={resource} className={styles.price__item}>
      <img
        src={`./${resource}.webp`}
        title={resource}
        className={styles.price__icon}
        alt={resource}
      />
      <div className={styles.price__value}>{value}</div>
    </div>
  )

  const renderResourcePrice = price =>
    Object.entries(price).map(
      ([key, value]) => key !== 'energy' && renderPrice(key, value)
    )

  return (
    <div className={styles.container}>
      {buildings && buildings.length > 0 ? (
        buildings.map((item, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.card__name}>{item.name}</div>
            <div className={styles.card__energyPrice}>
              {item.resources_price.energy &&
                renderPrice('energy', item.resources_price.energy)}
            </div>
            <img className={styles.card__image} src={item.image} alt="icon" />
            <div className={styles.card__income}>{renderAllIncome(item)}</div>
            <button
              className={styles.card__button}
              onClick={() => debouncedBuy(item.id)}
            >
              {renderResourcePrice(item.resources_price)}
            </button>
          </div>
        ))
      ) : (
        <p>No buildings available</p>
      )}
    </div>
  )
}

export default BuildingShop
