import React from 'react'
import { Link } from 'react-router-dom'
import { BulletHeader } from '../../components/bullet-header'
import { changeWalletAction } from '../../contexts/global/global-actions'
import { useGlobal } from '../../contexts/global/global-context'

export const WalletList = () => {
  const {
    state: { wallets },
    dispatch
  } = useGlobal()

  return (
    <>
      <BulletHeader tag='h1'>Wallets</BulletHeader>
      {wallets.length ? (
        <ul className='wallet-list'>
          {wallets.map(wallet => (
            <li
              key={wallet.name}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 10
              }}>
              <span>{wallet.name}</span>
              <Link
                to='/wallet'
                onClick={() => dispatch(changeWalletAction(wallet.name))}>
                Select
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No wallets</p>
      )}
    </>
  )
}
