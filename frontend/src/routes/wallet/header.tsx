import { Link } from 'react-router-dom'

import { ButtonUnstyled } from '../../components/button-unstyled'
import { DropdownItem, DropdownMenu } from '../../components/dropdown-menu'
import { Header } from '../../components/header'
import { Colors } from '../../config/colors'
import type { KeyPair, Wallet } from '../../contexts/global/global-context'
import { useGlobal } from '../../contexts/global/global-context'
import { useWindowSize } from '../../hooks/use-window-size'

interface WalletHeaderProps {
  wallet: Wallet | null
  keypair: KeyPair | undefined
}

export function WalletHeader({ wallet, keypair }: WalletHeaderProps) {
  const { dispatch } = useGlobal()
  const { width } = useWindowSize()
  const isWide = width > 900

  return (
    <Header
      style={{ display: 'flex', alignItems: 'start', margin: 0, padding: 20 }}
    >
      <span style={{ flex: 1 }}>
        {!isWide && (
          <ButtonUnstyled
            style={{ marginRight: 10 }}
            onClick={() => dispatch({ type: 'SET_SIDEBAR', open: true })}
          >
            Wallet
          </ButtonUnstyled>
        )}
      </span>
      <span style={{ flex: 1, textAlign: 'center' }}>
        {keypair && (
          <>
            <div
              style={{
                color: Colors.WHITE,
                fontSize: 20
              }}
            >
              {keypair.name}
            </div>
            <div style={{ textTransform: 'initial' }}>
              {keypair.publicKeyShort}
            </div>
          </>
        )}
      </span>
      <span style={{ flex: 1, textAlign: 'right' }}>
        {wallet && (
          <DropdownMenu
            trigger={
              <ButtonUnstyled style={{ marginRight: 10 }}>Menu</ButtonUnstyled>
            }
            content={
              <div>
                {['sign', 'taint', 'metadata'].map(page => (
                  <DropdownItem key={page}>
                    <Link style={{ textTransform: 'capitalize' }} to={page}>
                      {page}
                    </Link>
                  </DropdownItem>
                ))}
              </div>
            }
          />
        )}
      </span>
    </Header>
  )
}
