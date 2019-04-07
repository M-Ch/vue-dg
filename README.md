# Vue-dg (vue data grid)
Data grid for Vue.js with sorting, filtering, paging, templating and remote data loading.
Depends only on Vue.js.

## Installation
1. Run: `npm install vue-dg`
2. Import module:
```js
import DataGrid from "vue-dg";
//optional locale:
DataGrid.setLocale(DataGrid.locales.plPL);
Vue.use(DataGrid);
```
3. Import css from: `dist\DataGrid.css`

## Features
* Can bind to local data (array) or remote data (WebApi or Kendo DataSourceRequest)
* Server side filtering, sorting paging
* Column definitions as sub-components
* Built in filter panels for a date, date-time, number, text, boolean and enumerable types
* Localization support (language and data formatting settings)
* Custom column templates with slots, functions and rendering functions
* Row details

## Example
![Example grid](https://user-images.githubusercontent.com/11445153/55687695-3ca27600-5970-11e9-8a91-7ad65104d8d6.png)
```html
<data-grid source="api/products" type="odata">
   <data-column field="status" title="Status" :values="statuses"></data-column>
   <data-column field="created" title="Create date" type="date" :sort-order="1" sort-dir="desc"></data-column>
   <data-column field="important" title="Important" type="bool" icon="fa fa-exclamation"></data-column>
   <data-column title="Commands" template="commands-tpl" width="150px"></data-column>
   <div slot="commands-tpl" slot-scope="{row}">
      <a :href="'details/'+row.id">Details</a>
   </div>
</data-grid>
```
## Usage 
### Grid columns
Use DataColumn component to data columns. DataColumn is a full functional Vue component. You can bind it's attributes to your Vue instance, use v-if for conditional rendering or v-for for dynamic column insertion.
#### `DataColumn` properties
|Property|Type|Info|
|--------|----|----|
|title|string|Column title.|
|field|string|Data field bound to column. Can be null if column will be manually rendered.|
|template|string, function|Slot name used as template or function returning slot name or function returning `VNode`. Function will be called with arguments: field value, row item, CreateElement.| 
|render|function|Function used for custom field rendering. Function should return string or `VNode`. Function will be called with arguments: field value, row item, CreateElement.|
headTemplate|string|Slot name used for custom header rendering.|
sortable|bool|True by default. Column can be sorted when this value is set to true, `field` attribute is set|
width|string|Width of column used in css. Can be pixels (ex. 100px) or percent (ex. 20%)|
type|string|Type of data presented in column. Required for auto-formatting and filters. See section below|
formatOptions|string|Additional options that can passed to data formatter when `type` property is in used.|
values|array|Array of values for automatic key value replacement. See section below.|
icon|string|CSS class name for header icon.|
filter|string, bool|When set to false disables filtering. When set to string overrides default filter component assigned to column `type`.|
sortOrder|int|Indicates default ordering when grid is loaded.
sortDir|asc or desc|Sorting direction.
##### `type` property
Data grid supports few commonly used data types. Each data type has it's formatting rules and filtering component specified. If you don't specify the column type attribute you won't be able to filter data.
###### Default data types
|Type name|Description|
|-|-|
|bool|Logical value displayed as *Yes* or *No*.|
|date|Date without time using the format from the configuration. Use `formatOptions` to specify custom format. Default format can be specified in plugin configuration.|
|dateTime|Date with time using the format from the configuration. Use `formatOptions` to specify custom format. Default format can be specified in plugin configuration. |
|double|Value formatted as a number with decimal and thousand separator. Ex. 1234.3 -> *1 234,40*. Custom format can be specified with `formatOptions` property. Ex. `:format-options="{precision: 2, thousand: ' ', separator: ','}"`. Default format can be specified in plugin configuration.|
|decimal|Same as *double* used when the column is bound to a *decimal* field in *OData* source.
|int|Shows only whole number part.|
##### `values` property
This property can be used for two things. Displaying key value mapped data and/ or creating drop down filter with defined values.
###### Key value mapping
Suppose you have enum field with status represented as int value. You can use `type` property to specify how this value should be mapped to a user friendly value. Column filter will be changed to drop down filter containing all available values.
```html
<data-column field="status" :values="[{key:1, value:'Pending'}, {key:2, value:'Accepted'}]"></data-column>
```
###### Drop down filter
`values` property can be also used when you want to narrow down the list of available values that can be used in the column's filter.
```html
<data-column field="userLogin" :values="['admin','root','john.doe']"></data-column>
```
##### Column template
You can use slots for defining column and header template.
```html
<data-column template="custom-template"></data-column>
<div slot="custom-template" slot-scope="{row}">
    {row.price} {row.currency}
</div>
```
Slots can be selected dynamically if you bind a function returning slot name to `template` property.
### `DataGrid` properties
|Property|Type|Info|
|--------|----|----|
|page|int|Current page number. Can be sync. Starts from zero.|
|pageSize|int|Number of rows on one page. Default: *10*.|
|reloadEvent|string|Event name for triggering data reload. See section below. Default: *grid-reload*.|
|source|string or array|Data bound to the grid. See section below.|
|type|string|Type of source bound to the grid. See section below.|
|sourceArgs|object|Additional arguments for the data source. See section below.|
isLoading|bool|Indicates if the grid is currently loading data from a server.|
idField|string|Identity field name. Required for selecting and displaying row details. Can also be configured globally.|
sorting|array|Currently applied sorting. Can be sync.|
selectedIds|array|Currently selected rows ids. Can be sync.|
selected|array|Currently selected row items. Emit only.|
selectionMode|none, single, multi|Default: *none*.|
checkboxes|bool|Should checkboxes be displayed in *multi* selection mode. Default: *true*.|
keepSelection|bool|Should selected row ids be remembered when grid page is changed. Default: *false*.|
sortable|bool|Default: *true*.|
pageable|bool|Default: *true*.|
filterable|bool|Default: *true*.|
canReload|bool|Should reload button be displayed. Default: *true*.|
uri|string|Emits current source url (with applied sorting and filtering) constructed by data source.|
pageUri|string|Emits current page url (with applied sorting, paging and filtering) constructed by data source.|
rowClass|string, function|Additional CSS class for rows. The function will be called for each row with row as its argument. The function can return a string or an array of strings with class names.|
filters|array|Additional filters applied to the data source. See section below.|
columnFilters|array|Filters selected by the user through popups. Can be sync.|
detailsTemplate|string, function|Slot name used for displaying row details. When a function is specified, it should return slot name or `VNode` with row details. See section below.
theme|string|Grid theme. Currently only the light theme exists. Default: *dg-light*.|

#### Manual data reloading
If you need to reload currently displayed grid page emit event from your Vue model:
```js
this.$emit("grid-reload");
```

#### Local data source
You can bind directly to array of objects by simply using `source` attribute.
```html
<data-grid :source="someArray">...</data-grid>
```
#### Remote data source
Use `source` attribute for specifying the data url. Use `type` attribute for specifying remote source type.

|Name|Description|
|----|-----------|
|odata3|OData v3.|
|odata4|OData v4.|
|odata|The latest version of the protocol, works in the same way as *odata4*.|
|kendo-mvc|Telerik's DataSourceRequest.|

##### Additional OData url variables
If you need to pass additional variables to OData source you can use `sourceArgs` property:
```html
<data-grid source="odata/items" type="odata" :source-args="[{name: 'customVar', value: 'value'}]">...</data-grid>
```
#### Data filtering
There are three sources of data filters in use.
* User filters. Filters selected by user from filter popups. Use `columnFilters` property to view them.
* Bound filters. Additional filters read from `filters` property.
* Filter components. Filters defined with components placed inside DataGrid.

##### Filter components
You can specify filters that will be always applied to the data source by using sub components placed inside *DataGrid*.
```html
<data-grid>
   <filter-group>
      <filter-field :field="status" :value="2"></filter-field>
      <filter-field :field="status" :value="1"></filter-field>
   </filter-group>
   <filter-group>
      <filter-field :field="price" :value="200" operator="gt"></filter-field>
   </filter-group>
   <filter-field :field="active" :value="true"></filter-field>
</data-grid>
```
Filter produced by this definition:
`(status=2 OR status=1) AND (price > 200) AND active=true`

You can use *v-if* directive for conditionally enabling or disabling filters.

##### Bound filters
If you want to define filters in code you can bind them to `filter` property:
```html
<data-grid :filters="[{filters: [{field: 'status', value:2}, {field: 'status', value:1}]}, {field: 'active', value: true}]"</data-grid>
```
#### User selected filters
Filters selected by the user are stored in `columnFilters` property. Always use `sync` modifier when binding to this property.
#### Filter operators
|Name|Description|
|-|-|
|eq|Equals. Used by default.|
|gt|Greater than.|
|gte|Greater than or equal.|
|lt|Lower than.|
|lte|Lower than or equal.|
|neq|Not equal.|
|in|The value must be in the specified set. Provide an array of values as filter value.|
|substr|Column contains specified text.|
#### Row details
You can use slot or provide function returning `VNode` with row details.
```html
<data-grid details-template="details-tpl">
   ...
   <div slot="details-tpl" slot-scope="{item}">
      <div>Id: {{item.id}}</div>
      <div>Status: {{item.status}}</div>
   </div>
</data-grid>
```
Details function can be defined like this:
```js
methods: {
    details(row, h) {
        return h("div", {}, row.id);
    }
}
```
## License
MIT License