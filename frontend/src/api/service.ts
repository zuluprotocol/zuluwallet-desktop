import type { ListNetworksResponse, Network } from '../models/network'
import type { GetServiceStateResponse } from '../models/console-state'
import type {
  CreateWalletRequest,
  CreateWalletResponse
} from '../models/create-wallet'
import type { ImportWalletRequest } from '../models/import-wallet'
import { ImportWalletResponse } from '../models/import-wallet'
import type {
  GenerateKeyRequest,
  ListKeysRequest,
  ListKeysResponse
} from '../models/keys'
import type { ListWalletsResponse } from '../models/list-wallets'
import type { LoadWalletsRequest } from '../models/load-wallets'
import { LoadWalletsResponse } from '../models/load-wallets'
import {
  DescribeKeyResponse,
  GenerateKeyResponse,
  IsolateKeyResponse
} from '../models/keys'
import { StartServiceRequest } from '../models/start-console'
import { GetVersionResponse } from '../models/version'

// TODO: @Valentin
export function GetVersion(): Promise<GetVersionResponse> {
  return Promise.resolve({ version: '0.10.0' })
}

/**
 * Generate a new key on a given wallet. If the wallet doesn't exist, it's
 * created.
 */
export function GenerateKey(
  request: GenerateKeyRequest
): Promise<GenerateKeyResponse> {
  return window.backend.Handler.GenerateKey(JSON.stringify(request))
}

/**
 * Get all information of given key (no private key)
 */
export function DescribeKey(request: string): Promise<DescribeKeyResponse> {
  return window.backend.Handler.DescribeKey(JSON.stringify(request))
}

/**
 * Add metadata to a key pair.
 */
export function AnnotateKey(request: string): Promise<void> {
  return window.backend.Handler.AnnotateKey(JSON.stringify(request))
}

/**
 * Mark a key pair as unsafe to use.
 */
export function TaintKey(request: string): Promise<void> {
  return window.backend.Handler.TaintKey(JSON.stringify(request))
}

/**
 * Remove the taint of a key pair.
 */
export function UntaintKey(request: string): Promise<void> {
  return window.backend.Handler.UntaintKey(JSON.stringify(request))
}

/**
 * Isolate the given key pair in a wallet stripped form its generation mechanism
 * and siblings.
 */
export function IsolateKey(request: string): Promise<IsolateKeyResponse> {
  return window.backend.Handler.IsolateKey(JSON.stringify(request))
}

/**
 * Lists all key pairs for a given wallet. Requires your wallet name and passphrase
 */
export function ListKeys(request: ListKeysRequest): Promise<ListKeysResponse> {
  return window.backend.Handler.ListKeys(JSON.stringify(request))
}

/**
 *  Creates a new wallet
 */
export function CreateWallet(
  request: CreateWalletRequest
): Promise<CreateWalletResponse> {
  return window.backend.Handler.CreateWallet(JSON.stringify(request))
}

/**
 * Imports a wallet using a mnemonic phrase
 */
export function ImportWallet(
  request: ImportWalletRequest
): Promise<ImportWalletResponse> {
  return window.backend.Handler.ImportWallet(JSON.stringify(request))
}

/**
 * Loads a wallet by specifying a path to an existing wallet on your machine
 */
export function LoadWallets(
  request: LoadWalletsRequest
): Promise<LoadWalletsResponse> {
  return window.backend.Handler.LoadWallets(JSON.stringify(request))
}

/**
 * Verify the application has a configuration file initialised with a defined
 * Vega home.
 */
export function IsAppInitialised(): Promise<boolean> {
  return window.backend.Handler.IsAppInitialised()
}

/**
 * Lists all wallets
 */
export function ListWallets(): Promise<ListWalletsResponse> {
  return window.backend.Handler.ListWallets()
}

/**
 * Gets the config of a given network
 */
export function GetNetworkConfig(name: string): Promise<Network> {
  return window.backend.Handler.GetNetworkConfig(name)
}

/**
 * List all registered networks
 */
export function ListNetworks(): Promise<ListNetworksResponse> {
  return window.backend.Handler.ListNetworks()
}

/**
 * Saves config changes
 */
export function SaveNetworkConfig(config: string): Promise<boolean> {
  return window.backend.Handler.SaveNetworkConfig(config)
}

/**
 * Starts the service
 */
export function StartService(request: StartServiceRequest): Promise<boolean> {
  return window.backend.Handler.StartService(JSON.stringify(request))
}

/**
 * Returns the current service state, the console URL and whether or not its
 * running via the desktop wallet
 */
export function GetServiceState(): Promise<GetServiceStateResponse> {
  return window.backend.Handler.GetServiceState()
}

/**
 * Stops the service
 */
export function StopService(): Promise<boolean> {
  return window.backend.Handler.StopService()
}
