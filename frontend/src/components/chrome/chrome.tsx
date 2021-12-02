import React from 'react'
import { NetworkSwitcher } from './network-switcher'
import { Link } from 'react-router-dom'
import { useGlobal } from '../../contexts/global/global-context'
import { Colors } from '../../config/colors'
import { CopyWithTooltip } from '../copy-with-tooltip'
import { Copy } from '../icons/copy'
import { ButtonUnstyled } from '../button-unstyled'
import { Drawer, Position } from '@blueprintjs/core'
import { Links } from '../../config/links'
import { ExternalLink } from '../external-link'

const layoutStyles: React.CSSProperties = {
  display: 'grid',
  gridTemplateRows: 'min-content 1fr min-content'
}

export function Chrome({ children }: { children: React.ReactNode }) {
  const { state, dispatch } = useGlobal()
  return (
    <div
      style={{
        ...layoutStyles,
        height: '100%',
        background: '#101010',
        overflowY: 'auto'
      }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: 45,
          borderBottom: `1px solid ${Colors.DARK_GRAY_5}`,
          background: '#040404'
        }}>
        <ButtonUnstyled
          style={{
            padding: '10px 15px',
            fontFamily: 'AlphaLyrae',
            textTransform: 'uppercase',
            letterSpacing: '0.3em'
          }}
          onClick={() =>
            dispatch({ type: 'SET_DRAWER', open: !state.drawerOpen })
          }>
          Menu
        </ButtonUnstyled>
        <KeypairControls />
        <NetworkSwitcher />
      </div>
      <main style={{ padding: '0 15px', margin: '35px 0' }}>{children}</main>
      <footer
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 15px',
          fontSize: 14,
          background: 'url(./footer-background.png)',
          backgroundSize: 'cover'
        }}>
        <div>Version {state.version}</div>
        {state.serviceRunning ? (
          <div>Console running @ {state.servicdUrl}</div>
        ) : (
          <div>Service not running</div>
        )}
      </footer>
      <Drawer
        isOpen={state.drawerOpen}
        position={Position.LEFT}
        onClose={() => dispatch({ type: 'SET_DRAWER', open: false })}>
        <div
          style={{
            background: '#101010',
            height: '100vh'
          }}>
          <Menu />
        </div>
      </Drawer>
    </div>
  )
}

function KeypairControls() {
  const { state } = useGlobal()

  return (
    <div>
      {state.wallet?.keypair ? (
        <div>
          <CopyWithTooltip text={state.wallet.keypair.publicKey}>
            <ButtonUnstyled>
              {state.wallet.keypair.name}{' '}
              <span className='text-muted'>
                {state.wallet.keypair.publicKeyShort}{' '}
                <Copy style={{ width: 10, height: 10 }} />
              </span>
            </ButtonUnstyled>
          </CopyWithTooltip>
        </div>
      ) : null}
      {/* {state.wallet?.keypairs?.length ? (
        <div style={{ marginLeft: 'auto' }}>
          <KeypairSwitcher
            wallet={state.wallet}
            onSelect={kp => dispatch({ type: 'CHANGE_KEYPAIR', keypair: kp })}
          />
        </div>
      ) : null} */}
    </div>
  )
}

function Menu() {
  return (
    <div style={{ padding: 15 }}>
      <header>
        <h1
          style={{
            fontFamily: 'AlphaLyrae',
            fontSize: 20,
            letterSpacing: '0.3em',
            textTransform: 'uppercase'
          }}>
          Vega
        </h1>
      </header>
      <nav
        style={{
          borderBottom: `1px solid ${Colors.DARK_GRAY_5}`,
          paddingBottom: 15
        }}>
        <AppLink to='/'>Wallets</AppLink>
        <AppLink to='/import'>Add / Import Wallet</AppLink>
        <AppLink to='/console'>Console</AppLink>
      </nav>
      <nav style={{ marginTop: 15 }}>
        <NavExternalLink href={Links.DOCS}>Docs</NavExternalLink>
        <NavExternalLink href={Links.GITHUB}>Github</NavExternalLink>
      </nav>
    </div>
  )
}

interface NavLinkProps {
  children: React.ReactNode
  to: string
}

function AppLink({ children, to }: NavLinkProps) {
  const { dispatch } = useGlobal()
  return (
    <div>
      <Link
        to={to}
        style={{ display: 'block', padding: '10px 0' }}
        onClick={() => dispatch({ type: 'SET_DRAWER', open: false })}>
        {children}
      </Link>
    </div>
  )
}

interface ExternalLinkProps {
  children: React.ReactNode
  href: string
}

function NavExternalLink({ children, href }: ExternalLinkProps) {
  return (
    <div>
      <ExternalLink href={href} style={{ display: 'block', padding: '10px 0' }}>
        {children}
      </ExternalLink>
    </div>
  )
}
