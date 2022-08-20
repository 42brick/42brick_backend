import { EvmChain, EvmChainish } from '@moralisweb3/evm-utils';
import { BadRequestException } from '@nestjs/common';

export type allowedSymbol = 'eth' | 'bsc' | 'matic' | 'ftm';

export type filterType =
  | 'name'
  | 'description'
  | 'attributes'
  | 'global'
  | 'name,description'
  | 'name,attributes'
  | 'description,attributes'
  | 'name,description,attributes';

export const is_valid_symbol = (symbol: string) => {
  if (
    symbol === 'eth' ||
    symbol === 'bsc' ||
    symbol === 'matic' ||
    symbol === 'ftm'
  )
    return;
  throw new BadRequestException(
    `A symbol that cannot be processed. Please check again. Current symbol: ${symbol}`,
  );
};

export const is_valid_filter = (filter: string) => {
  if (
    filter === 'name' ||
    filter === 'description' ||
    filter === 'attributes' ||
    filter === 'global' ||
    filter === 'name,description' ||
    filter === 'name,attributes' ||
    filter === 'description,attributes' ||
    filter === 'name,description,attributes'
  )
    return;
  throw new BadRequestException(
    `You cannot use this filter. Please check again. Current filter: ${filter}`,
  );
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