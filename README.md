# Vue-dg (vue data grid)
Data grid for Vue.js with sorting, filtering, paging, templating and remote data loading.
Depends only on Vue.js.

## Installation
`npm install vue-dg`

## Features
* Can bind to local data (array) or remote data (WebApi or Kendo DataSourceRequest)
* Server side filtering, sorting paging
* Columns definitions as sub-compoents
* Built in filter panels for date, date-time, number, text, boolean and enumarable types
* Localization support (language and data formatting settings)
* Custom column templates with slots, functions and rendering functions
* Row details

## Example usage
```html
<data-grid 
   details-template="details-tpl"
   selection-mode="single"
   :keep-selection="false" 
   source="odata/sample-data" 
   source-options="odata"
   :row-class="rowClass"
   :page-size="pageSize" 
   :sortable="canSort">
   <data-column field="status" name="Status" :template="customStatusTemplate"></data-column>
   <data-column field="date" name="Date" type="dateTime" head-template="headTemplate" :filter="true" format-options="YYYY-MM-DD!"></data-column>
   <data-column field="canBeSold" name="bool" type="bool" :filter="true"></data-column>
   <!-- columns can be defined with v-for and can be changed anytime -->
   <data-column width="20%" :field="column.field" :name="column.name" v-for="column in columns" :key="column.id" template="field-tpl"></data-column>
   <data-column name="Commands" template="commands-tpl" width="150px" icon="fa fa-address-book"></data-column>
   <!-- header can be defined with slot -->
   <div slot="headTemplate" slot-scope="column">
      <b>header-tpl: {{column.name}}</b>
   </div>
   <!-- custom template for column value -->
   <div slot="field-tpl" slot-scope="{value}">
      <i>{{value}}</i>
   </div>
   <div slot="commands-tpl" slot-scope="{row}">
      <button v-on:click="itemAction(row)">Action</button>
   </div>
   <!-- custom template for column value -->
   <div slot="details-tpl" slot-scope="{item}">
      <div>F1: {{item.f1}}</div>
      <div>F2: {{item.f2}}</div>
   </div>
   <!-- you can add some filters that will be combined with filters selected by user -->
   <filter-group>
      <filter-field v-for="(item, index) in filters" :key="'k'+index" :field="item.field" :value="item.value"></filter-field>
   </filter-group>-->
</data-grid>
```
## License
MIT License