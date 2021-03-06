import { CardContainer, ContainerClikeable } from 'common/styles'
import Card from 'components/CardConstructor'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchAllActivities, reset } from 'store/slices/activities'

import { Container} from './styles'

export default function ActivitiesList ({ qty = 'all', title = '' }) {
  const { activities } = useSelector(state => state.activities)
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllActivities())
    if (!user) {
      dispatch(reset())
    }
  }, [dispatch, user])

  const navigate = useNavigate()

  const handleShowActivity = (element) => {
    navigate(`/activities/${element.id}`)
  }

  const totalShowActivities = qty === 'all' ? activities.length : qty

  return (
    <CardContainer>
      <h1>{title}</h1>
      {activities?.length > 0
        ? activities.slice(0, totalShowActivities).map((n, i) =>
          <ContainerClikeable key={i} onClick={() => handleShowActivity(n)}>
            <Card
              key={i}
              data={n}
              detail={false}
            />
          </ContainerClikeable>)
        : <p>No hay actividades</p>}
    </CardContainer>
  )
}
