import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './index.module.scss'
import {
  countryBuildingCollectIncome,
  countryIndex,
} from '../../services/countryService'
import { countryActions } from '../../store/countrySlice'
import { useDebouncedCallback } from 'use-debounce'
import { Coin } from 'react-bootstrap-icons'
import moment from 'moment'

function Building() {
  const country = useSelector(state => state.country.currentCountry)
  const buildings = useSelector(state => state.country.buildings)
  const token = useSelector(state => state.auth.token)
  const timers = useSelector(state => state.country.timers)
  const dispatch = useDispatch()

  useEffect(() => {
    if (country) {
      fetchCountry()
    }
  }, [])

  const fetchCountry = async () => {
    const response = await countryIndex(token)
    const countryInfo = response.filter(item => {
      return item.country.id === country.id
    })[0]
    dispatch(countryActions.setCurrentCountry(countryInfo.country))
    dispatch(countryActions.setBuildings(countryInfo.buildings))
  }

  useEffect(() => {
    if (buildings) {
      setCountdowns()
    }
  }, [buildings])

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updateTimers())
    }, 1000)

    return () => clearInterval(interval)
  }, [dispatch])

  const setCountdowns = () => {
    const initialTimers = {}
    buildings.forEach(building => {
      initialTimers[building.id] = building.income_at
    })
    dispatch(countryActions.setTimers(initialTimers))
  }

  const updateTimers = () => {
    return (dispatch, getState) => {
      const currentTimers = getState().country.timers
      const newTimers = { ...currentTimers }
      Object.keys(newTimers).forEach(id => {
        if (newTimers[id] > 0) {
          newTimers[id] -= 1
        }
      })
      dispatch(countryActions.setTimers(newTimers))
    }
  }

  const debouncedIncomeCollect = useDebouncedCallback(buildingId => {
    collectIncome(buildingId)
  }, 500)

  const collectIncome = async buildingId => {
    const response = await countryBuildingCollectIncome(
      token,
      country.id,
      buildingId
    )
    dispatch(countryActions.setCurrentCountry(response.country))
    dispatch(countryActions.setBuildings(response.buildings))
  }

  const renderResourcesIncome = product => {
    const count = product.count
    const fossils = ['oil', 'coal', 'iron', 'copper']
    return Object.entries(product.resources_income).map(([key, value]) => {
      if (!fossils.includes(key) || (fossils.includes(key) && country.available_resources.includes(key))) {
        return renderIncome(key, value * count)
      }
    })
  }

  const renderIncome = (type, value) => {
    return (
      <div key={type} className={styles.income}>
        <img className={styles.income__icon} src={`/${type}.webp`} alt="icon" />
        <div className={styles.income__value}>{value}</div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {buildings ? (
        <ul className={styles.list}>
          {buildings.map((item, index) => (
            <li key={index} className={styles.item}>
              <div className={styles.item__name}>{item.name}</div>
              <div className={styles.item__count}>x {item.count}</div>
              <img
                className={styles.item__image}
                src={item.image}
                alt="building-image"
              />
              {item.resources_income.energy ? (
                <div className={styles.item__energyInfo}>
                  {renderResourcesIncome(item)}
                </div>
              ) : item.resources_income && timers[item.id] > 0 ? (
                <div className={styles.item__collectButton}>
                  {moment.utc(timers[item.id] * 1000).format('HH:mm:ss')}
                </div>
              ) : (
                <button
                  onClick={() => debouncedIncomeCollect(item.id)}
                  className={styles.item__collectButton}
                >
                  {renderResourcesIncome(item)}
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.message}>Тут відображатимуться ваші будівлі</div>
      )}
    </div>
  )
}

export default Building
