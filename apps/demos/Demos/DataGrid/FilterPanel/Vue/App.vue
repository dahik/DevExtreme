<template>
  <div>
    <DxDataGrid
      id="gridContainer"
      :data-source="orders"
      key-expr="ID"
      :columns-auto-width="true"
      :show-borders="true"
      :filter-builder="filterBuilder"
      :filter-value="filterValue"
    >
      <DxFilterRow :visible="true"/>
      <DxFilterPanel :visible="true"/>
      <DxFilterBuilderPopup :position="filterBuilderPopupPosition"/>
      <DxHeaderFilter :visible="true"/>
      <DxScrolling mode="infinite"/>

      <DxColumn
        :header-filter="{ groupInterval: 10000 }"
        data-type="number"
        data-field="OrderNumber"
        caption="Invoice Number"
      />
      <DxColumn
        data-field="OrderDate"
        data-type="date"
      />
      <DxColumn
        :editor-options="saleAmountEditorOptions"
        :header-filter="{ dataSource: saleAmountHeaderFilters }"
        data-field="SaleAmount"
        data-type="number"
        format="currency"
      />
      <DxColumn
        data-field="Employee"
        data-type="string"
      />
      <DxColumn
        data-field="CustomerInfo.StoreCity"
        caption="City"
        data-type="string"
      />
      <DxColumn
        data-field="CustomerInfo.StoreState"
        caption="State"
        data-type="string"
      />
    </DxDataGrid>
  </div>
</template>
<script setup lang="ts">
import {
  DxDataGrid,
  DxColumn,
  DxHeaderFilter,
  DxFilterRow,
  DxFilterPanel,
  DxFilterBuilderPopup,
  DxScrolling,
} from 'devextreme-vue/data-grid';
import { PositionConfig } from 'devextreme/animation/position';
import { orders, Order } from './data.ts';

const saleAmountEditorOptions = { 
  format: 'currency', 
  showClearButton: true, 
  inputAttr: {
    'aria-label': 'Filter cell',
  }, 
};

const filterBuilderPopupPosition: PositionConfig = {
  of: window,
  at: 'top',
  my: 'top',
  offset: { y: 10 },
};

const filterBuilder: DxDataGrid['filterBuilder'] = {
  customOperations: [{
    name: 'weekends',
    caption: 'Weekends',
    dataTypes: ['date'],
    icon: 'check',
    hasValue: false,
    calculateFilterExpression: () => [[getOrderDay, '=', 0], 'or', [getOrderDay, '=', 6]],
  }],
  allowHierarchicalFields: true,
};

const filterValue = [['Employee', '=', 'Clark Morgan'], 'and', ['OrderDate', 'weekends']];

const saleAmountHeaderFilters = [
  {
    text: 'Less than $3000',
    value: ['SaleAmount', '<', 3000],
  }, {
    text: '$3000 - $5000',
    value: [['SaleAmount', '>=', 3000], ['SaleAmount', '<', 5000]],
  }, {
    text: '$5000 - $10000',
    value: [['SaleAmount', '>=', 5000], ['SaleAmount', '<', 10000]],
  }, {
    text: '$10000 - $20000',
    value: [['SaleAmount', '>=', 10000], ['SaleAmount', '<', 20000]],
  }, {
    text: 'Greater than $20000',
    value: ['SaleAmount', '>=', 20000],
  },
];

const getOrderDay = (rowData: Order) => (new Date(rowData.OrderDate)).getDay();
</script>
<style scoped>
.demo-container {
  height: 570px;
}

#gridContainer {
  height: 440px;
}

.dx-filterbuilder-overlay .dx-scrollable-container {
  max-height: 400px;
}
</style>
