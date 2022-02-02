import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Header } from '../../components/header'
import { Button } from '../../components/button'
import { ButtonUnstyled } from '../../components/button-unstyled'
import {
  chnageWalletAction,
  deactivateWalletAction,
  getKeysAction
} from '../../contexts/global/global-actions'
import { useGlobal, Wallet } from '../../contexts/global/global-context'
import { Paths } from '../router-config'
import { BulletList, BulletListItem } from '../../components/bulle-list'
import { CopyWithTooltip } from '../../components/copy-with-tooltip'
import { WalletPaths } from '.'
import { Colors } from '../../config/colors'
import { Fonts } from '../../config/fonts'
import { Copy } from '../../components/icons/copy'
import { ButtonGroup } from '../../components/button-group'

export const WalletList = () => {
  const {
    state: { wallets },
    dispatch
  } = useGlobal()

  function toggleKeys(wallet: Wallet) {
    if (wallet.auth) {
      dispatch(deactivateWalletAction(wallet.name))
    } else {
      dispatch(getKeysAction(wallet.name))
    }
  }

  return (
    <>
      <Header style={{ marginTop: 0 }}>Wallets</Header>
      {wallets.length ? (
        <BulletList>
          {wallets.map(wallet => (
            <BulletListItem
              key={wallet.name}
              style={{
                marginBottom: 10
              }}
            >
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <span>{wallet.name}</span>
                <ButtonUnstyled
                  className='link'
                  onClick={() => toggleKeys(wallet)}
                  style={{ color: 'inherit' }}
                >
                  {wallet.auth ? 'Hide keys' : 'Show keys'}
                </ButtonUnstyled>
              </div>
              {wallet.auth && <WalletDetail wallet={wallet} />}
            </BulletListItem>
          ))}
        </BulletList>
      ) : (
        <p>No wallets</p>
      )}
      <AddButton />
    </>
  )
}

function AddButton() {
  const history = useHistory()
  return (
    <div style={{ marginTop: 20 }}>
      <ButtonGroup orientation='vertical'>
        {[
          {
            path: Paths.WalletCreate,
            text: 'Create new',
            testId: 'create-new-wallet'
          },
          {
            path: Paths.WalletImport,
            text: 'Import by recovery phrase',
            testId: 'import-wallet'
          }
        ].map(route => {
          return (
            <Button
              data-testid={route.testId}
              key={route.path}
              onClick={() => history.push(route.path)}
            >
              {route.text}
            </Button>
          )
        })}
      </ButtonGroup>
    </div>
  )
}

interface WalletDetailProps {
  wallet: Wallet
}

function WalletDetail({ wallet }: WalletDetailProps) {
  const { dispatch } = useGlobal()

  return (
    <div style={{ marginTop: 20 }}>
      {wallet.keypairs?.length ? (
        <table style={{ marginBottom: 15 }}>
          <thead>
            <tr>
              <th style={{ padding: 0 }}>Keypair name</th>
              <th style={{ textAlign: 'right', padding: 0 }}>Public key</th>
            </tr>
          </thead>
          <tbody>
            {wallet.keypairs.map(kp => {
              return (
                <tr key={kp.publicKey}>
                  <td style={{ textAlign: 'left', padding: 0 }}>
                    <Link
                      onClick={() => {
                        dispatch(chnageWalletAction(wallet.name))
                      }}
                      to={`${WalletPaths.Keypair}/${kp.publicKey}`}
                    >
                      {kp.name}
                    </Link>
                  </td>
                  <td style={{ padding: 0 }}>
                    <CopyWithTooltip text={kp.publicKey}>
                      <ButtonUnstyled
                        style={{
                          color: Colors.TEXT_COLOR_DEEMPHASISE,
                          fontFamily: Fonts.MONO
                        }}
                      >
                        {kp.publicKeyShort}{' '}
                        <Copy
                          style={{
                            position: 'relative',
                            top: -2,
                            width: 12,
                            height: 12
                          }}
                        />
                      </ButtonUnstyled>
                    </CopyWithTooltip>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      ) : (
        <p>No keypairs</p>
      )}
    </div>
  )
}
