import { useEffect, useState } from 'react'

import { Intent } from '../../config/intent'
import {
  DrawerPanel,
  ServiceState,
  useGlobal
} from '../../contexts/global/global-context'
import { useCheckForUpdate } from '../../hooks/use-check-for-update'
import { EVENTS } from '../../lib/events'
import {
  EventsOff,
  EventsOn,
  WindowReload
} from '../../wailsjs/runtime/runtime'
import { Button } from '../button'
import { Chrome } from '../chrome'
import { SplashError } from '../splash-error'
import { AppToaster } from '../toaster'

/**
 * Initialiases the app
 */
export function ServiceLoader({ children }: { children: React.ReactNode }) {
  const [serviceError, setServiceError] = useState<string | null>(null)
  useCheckForUpdate()

  const {
    state: { serviceStatus, network, networkConfig },
    service,
    dispatch
  } = useGlobal()

  useEffect(() => {
    if (serviceStatus === ServiceState.Started && serviceError) {
      setServiceError(null)
    }
  }, [serviceStatus, serviceError])

  useEffect(() => {
    EventsOn(EVENTS.SERVICE_HEALTHY, () => {
      setServiceError(null)
      dispatch({
        type: 'SET_SERVICE_STATUS',
        status: ServiceState.Started
      })
    })

    EventsOn(EVENTS.SERVICE_UNREACHABLE, () => {
      dispatch({
        type: 'SET_SERVICE_STATUS',
        status: ServiceState.Unreachable
      })
    })

    EventsOn(EVENTS.SERVICE_UNHEALTHY, () => {
      dispatch({
        type: 'SET_SERVICE_STATUS',
        status: ServiceState.Unhealthy
      })
    })

    EventsOn(EVENTS.SERVICE_STOPPED_WITH_ERROR, (err: Error) => {
      dispatch({
        type: 'SET_SERVICE_STATUS',
        status: ServiceState.Error
      })

      AppToaster.show({
        intent: Intent.DANGER,
        message: `${err}`
      })
    })

    EventsOn(EVENTS.SERVICE_STOPPED, () => {
      dispatch({
        type: 'SET_SERVICE_STATUS',
        status: ServiceState.Stopped
      })
    })

    return () => {
      EventsOff(
        EVENTS.SERVICE_HEALTHY,
        EVENTS.SERVICE_UNREACHABLE,
        EVENTS.SERVICE_UNHEALTHY,
        EVENTS.SERVICE_STOPPED_WITH_ERROR,
        EVENTS.SERVICE_STOPPED
      )
    }
  }, [dispatch])

  useEffect(() => {
    async function start() {
      if (network && networkConfig && serviceStatus === ServiceState.Stopped) {
        try {
          const { running } = await service.GetCurrentServiceInfo()
          if (!running) {
            dispatch({
              type: 'SET_SERVICE_STATUS',
              status: ServiceState.Loading
            })
            await service.StartService({ network })
          } else {
            dispatch({
              type: 'SET_SERVICE_STATUS',
              status: ServiceState.Started
            })
          }
        } catch (err) {
          dispatch({
            type: 'SET_SERVICE_STATUS',
            status: ServiceState.Error
          })
          setServiceError(`${err}`)
        }
      }
    }

    start()
  }, [service, dispatch, network, networkConfig, serviceStatus])

  if (serviceError && networkConfig) {
    return (
      <Chrome>
        <SplashError
          title='Wallet service cannot load'
          message={
            <span>
              Make sure you don't already have an application running on machine
              on port{' '}
              <pre style={{ display: 'inline' }}>:{networkConfig.port}</pre>.
              Reload the application, or change your network port.
            </span>
          }
          actions={
            <>
              <Button onClick={() => WindowReload()}>Reload</Button>
              <Button
                onClick={() =>
                  dispatch({
                    type: 'SET_DRAWER',
                    state: {
                      isOpen: true,
                      panel: DrawerPanel.Edit,
                      editingNetwork: network
                    }
                  })
                }
              >
                Change port
              </Button>
            </>
          }
        />
      </Chrome>
    )
  }

  return <>{children}</>
}
