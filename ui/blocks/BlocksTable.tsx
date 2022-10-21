import { Table, Thead, Tbody, Tr, Th, TableContainer } from '@chakra-ui/react';
import capitalize from 'lodash/capitalize';
import React from 'react';

import type { Block } from 'types/api/block';

import appConfig from 'configs/app/config';
import getNetworkValidatorTitle from 'lib/networks/getNetworkValidatorTitle';
import BlocksTableItem from 'ui/blocks/BlocksTableItem';

interface Props {
  data: Array<Block>;
}

const BlocksTable = ({ data }: Props) => {

  return (
    <TableContainer width="100%" mt={ 8 }>
      <Table variant="simple" minWidth="1040px" size="md" fontWeight={ 500 }>
        <Thead>
          <Tr>
            <Th width="125px">Block</Th>
            <Th width="120px">Size</Th>
            <Th width="21%" minW="144px">{ capitalize(getNetworkValidatorTitle()) }</Th>
            <Th width="64px" isNumeric>Txn</Th>
            <Th width="35%">Gas used</Th>
            <Th width="22%">Reward { appConfig.network.currency.symbol }</Th>
            <Th width="22%">Burnt fees { appConfig.network.currency.symbol }</Th>
          </Tr>
        </Thead>
        <Tbody>
          { data.map((item) => <BlocksTableItem key={ item.height } data={ item }/>) }
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default BlocksTable;
