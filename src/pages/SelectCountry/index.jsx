import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { countryActions } from '../../store/countrySlice'
import { Link, useNavigate } from 'react-router-dom'
import { countryDelete, countryIndex } from '../../services/countryService'
import Modal from '../../components/Modal'
import { toast } from 'react-toastify'
import { BoxArrowInRight, PersonCircle, TrashFill } from 'react-bootstrap-icons'
import { authActions } from '../../store/authSlice'

function SelectCountry() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const countries = useSelector(state => state.country.countries)
  const token = useSelector(state => state.auth.token)
  const user = useSelector(state => state.auth.user)
  const [isModalVisible, setModalVisibility] = useState(false)
  const [countryToDelete, setCountryToDelete] = useState(null)

  const fetchCountries = async () => {
    const response = await countryIndex(token)
    dispatch(countryActions.setCountries(response))
    dispatch(countryActions.setBuildings(response.buildings))
  }

  useEffect(() => {
    fetchCountries()
  }, [token])

  const deleteCountry = async id => {
    await countryDelete(id, token)

    const deletedCountry = countries.find(item => item.country.id === id)

    dispatch(countryActions.deleteCountry(id))

    toast.info(`Country "${deletedCountry.country.name}" has been deleted`)
  }

  const handleDeleteCountryButtonClick = item => {
    setCountryToDelete(item)
    setModalVisibility(true)
  }

  const handleLogoutButtonClick = () => {
    dispatch(authActions.logout())
    navigate('/login')
  }

  const selectCountry = countryId => {
    const selectedCountry = countries.find(
      item => item.country.id === countryId
    )
    dispatch(countryActions.setCurrentCountry(selectedCountry.country))
    dispatch(countryActions.setBuildings(selectedCountry.buildings))
    navigate('/')
  }

  const formattedCountryName = () => {
    const limit = 10
    let name = countryToDelete.name

    return name.length > limit ? name.slice(0, 10) + '...' : name
  }

  return (
    <div className={styles.container}>
      <div className={styles.holder}>
        <div className={styles.mainContainer}>
          <div className={styles.title}>Select country</div>
          <ul className={styles.list}>
            {countries.length > 0 &&
              countries.map((item, index) => (
                <li key={index} className={styles.item}>
                  <div
                    onClick={() => selectCountry(item.country.id)}
                    className={`${styles.selectCountryButton} ${styles.menuButton}`}
                  >
                    <span className={styles.name}>{item.country.name}</span>
                  </div>
                  <div
                    onClick={() => handleDeleteCountryButtonClick(item.country)}
                    className={`${styles.deleteCountryButton} ${styles.menuButton}`}
                  >
                    <TrashFill className={styles.deleteCountryButton__icon} />
                  </div>
                </li>
              ))}
          </ul>
        </div>
        <div className={styles.sideContainer}>
          <div className={styles.userContainer}>
            <PersonCircle className={styles.userContainer__icon} />
            <div className={styles.userContainer__name}>
              {user && user.name}
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <div className={styles.buttonHolder}>
              <Link to={'/create-country'} className={styles.button}>
                +
              </Link>
            </div>
            <div className={styles.buttonHolder}>
              <button
                onClick={() => handleLogoutButtonClick()}
                className={styles.button}
              >
                <BoxArrowInRight className={styles.logoutButtonIcon} />
              </button>
            </div>
          </div>
        </div>
      </div>
      {isModalVisible && (
        <Modal
          onApply={() => {
            deleteCountry(countryToDelete.id)
            setModalVisibility(false)
          }}
          message={`Delete country "${formattedCountryName()}" ?`}
          applyButtonText="Delete"
          onCancel={() => setModalVisibility(false)}
        />
      )}
    </div>
  )
}

export default SelectCountry
