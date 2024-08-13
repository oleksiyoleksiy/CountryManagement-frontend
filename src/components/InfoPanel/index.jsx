import React from 'react'
import { useSelector } from 'react-redux'
import styles from './index.module.scss'
import { CheckCircleFill, GlobeEuropeAfrica } from 'react-bootstrap-icons'
import { NavLink } from 'react-router-dom'

function InfoPanel() {
  const country = useSelector(state => state.country.currentCountry)

  const shortenNumber = number => {
    if (number >= 1000000000) {
      return formatNumber(number, 1000000000, 'B')
    }
    if (number >= 1000000) {
      return formatNumber(number, 1000000, 'M')
    }
    if (number >= 1000) {
      return formatNumber(number, 1000, 'K')
    }
    return number.toString()
  }

  const formatNumber = (number, divisor, suffix) => {
    const shortNumber = number / divisor
    const formattedNumber = Math.floor(shortNumber * 100) / 100
    return `${formattedNumber}${suffix}`
  }

  const renderResource = (type, value) => {
    return (
      <div key={type} className={styles.resource}>
        <img
          src={`/${type}.webp`}
          title={type}
          className={styles.resource__icon}
        />
        <div className={styles.resource__value}>{shortenNumber(value)}</div>
      </div>
    )
  }

  const renderAllowedResources = resources => {
    return resources.map((item, index) => (
      <div key={index} className={styles.resource}>
        <img
          src={`/${item}.webp`}
          title={item}
          className={styles.resource__icon}
        />
      </div>
    ))
  }

  const renderResources = resources => {
    if (resources) {
      return Object.entries(resources).map(([key, value]) =>
        renderResource(key, value)
      )
    }
  }

  return (
    country && (
      <div className={styles.container}>
        <div className={styles.countryNameWrapper}>
          <div className={styles.countryName} title={country.name}>
            {country.name}
          </div>
          <NavLink
            className={styles.countryNameWrapper__link}
            to="/select-country"
          >
            <GlobeEuropeAfrica className={styles.countryNameWrapper__icon} />
          </NavLink>
          <div
            className={`${styles.availableResources} ${styles.availableResources_sm}`}
          >
            <div className={styles.availableResources__iconWrapper}>
              <CheckCircleFill
                title="available resources"
                className={styles.availableResources__icon}
              />
            </div>
            {country.available_resources &&
              renderAllowedResources(country.available_resources)}
          </div>
        </div>
        <div className={styles.resources}>
          {country.resources && renderResources(country.resources)}
        </div>
        <div
          className={`${styles.availableResources} ${styles.availableResources_lg}`}
        >
          <div className={styles.availableResources__iconWrapper}>
            <CheckCircleFill
              title="available resources"
              className={styles.availableResources__icon}
            />
          </div>
          {country.available_resources &&
            renderAllowedResources(country.available_resources)}
        </div>
      </div>
    )
  )
}

export default InfoPanel
