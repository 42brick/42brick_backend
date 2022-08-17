import { EvmChain, EvmChainish } from '@moralisweb3/evm-utils';

export type filterType =
  | 'name'
  | 'description'
  | 'attributes'
  | 'global'
  | 'name,description'
  | 'name,attributes'
  | 'description,attributes'
  | 'name,description,attributes';

export const is_valid_symbol = (symbol: string): boolean => {
  if (
    symbol === 'eth' ||
    symbol === 'bsc' ||
    symbol === 'matic' ||
    symbol === 'ftm'
  )
    return true;
  return false;
};

export const symbol_to_symbol = (symbol: string): EvmChainish => {
  if (symbol === 'eth') return EvmChain.ETHEREUM;
  else if (symbol === 'bsc') return EvmChain.BSC;
  else if (symbol === 'matic') return EvmChain.POLYGON;
  else if (symbol === 'ftm') return EvmChain.FANTOM;
};

export const symbol_to_chain = (symbol: string): string => {
  if (symbol === 'eth') return 'Ethereum';
  else if (symbol === 'bsc') return 'Binance Smart Chain';
  else if (symbol === 'matic') return 'Polygon';
  else if (symbol === 'ftm') return 'Fantom';
};
