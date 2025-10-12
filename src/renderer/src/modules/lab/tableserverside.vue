
<template>
    <h6>{{ JSON.stringify(lazyParams) }}</h6>
    ------
    <h6>loading:{{ loading }}</h6>
    <h6>totol record:{{ totalRecords }}</h6>
    <h6>selectedCustomers:{{ selectedCustomers }}</h6>
    <h6>selectAll:{{ selectAll }}</h6>
	<div class="card p-fluid">
        <DataTable :value="customers" lazy paginator :first="0" :rows="10" v-model:filters="filters" ref="dt" dataKey="id"  :rowsPerPageOptions="[5, 10, 25,50,75,100,500,1000]"
            :totalRecords="totalRecords" :loading="loading" @page="onPage($event)" @sort="onSort($event)" @filter="onFilter($event)" filterDisplay="row"
            :globalFilterFields="['name','country.name', 'company', 'representative.name']"
            v-model:selection="selectedCustomers" :selectAll="selectAll" @select-all-change="onSelectAllChange" @row-select="onRowSelect" @row-unselect="onRowUnselect" tableStyle="min-width: 75rem">

            <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
            <Column field="id" header="id" filterMatchMode="startsWith" sortable>
            </Column>
            <Column field="name" header="Name" filterMatchMode="startsWith" sortable>
                <template #filter="{filterModel,filterCallback}">
                    <InputText type="text" v-model="filterModel.value" @keydown.enter="filterCallback()" class="p-column-filter" placeholder="Search"/>
                </template>
            </Column>
            <Column field="country.name" header="Country" filterField="country.name" filterMatchMode="contains" sortable>
                <template #filter="{filterModel,filterCallback}">
                    <InputText type="text" v-model="filterModel.value" @keydown.enter="filterCallback()" class="p-column-filter" placeholder="Search"/>
                </template>
            </Column>
            <Column field="company" header="Company" filterMatchMode="contains" sortable>
                <template #filter="{filterModel,filterCallback}">
                    <InputText type="text" v-model="filterModel.value" @keydown.enter="filterCallback()" class="p-column-filter" placeholder="Search"/>
                </template>
            </Column>
            <Column field="representative.name" header="Representative" filterField="representative.name" sortable>
                <template #filter="{filterModel,filterCallback}">
                    <InputText type="text" v-model="filterModel.value" @keydown.enter="filterCallback()" class="p-column-filter" placeholder="Search"/>
                </template>
            </Column>
        </DataTable>
	</div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { CustomerService } from './Service/CustomerService.js';

onMounted(() => {
    loading.value = true;

    lazyParams.value = {
        first: dt.value.first,
        rows: dt.value.rows,
        sortField: null,
        sortOrder: null,
        filters: filters.value
    };

    loadLazyData();
    console.log(customers)
});

const dt = ref();
const loading = ref(false);
const totalRecords = ref(30);
const customers = ref();
const selectedCustomers = ref();
const selectAll = ref(false);
const filters = ref({
    'name': {value: '', matchMode: 'contains'},
    'country.name': {value: '', matchMode: 'contains'},
    'company': {value: '', matchMode: 'contains'},
    'representative.name': {value: '', matchMode: 'contains'},
});
const lazyParams = ref({});


watch(lazyParams, (newVal, oldVal) => {
  // This function will be called when 'someValue' changes
  console.log(`someValue: ${JSON.stringify(newVal)}`);
  // You can perform actions based on the changes here
});

const columns = ref([
    {field: 'name', header: 'Name'},
    {field: 'country.name', header: 'Country'},
    {field: 'company', header: 'Company'},
    {field: 'representative.name', header: 'Representative'}
]);

const loadLazyData = () => {
    loading.value = true;

    setTimeout(() => {
        CustomerService.getCustomers({ lazyEvent: JSON.stringify(lazyParams.value) }).then((data) => {
            customers.value = data.customers;
            // totalRecords.value = data.totalRecords;
            loading.value = false;
        });
        
        
    }, Math.random() * 1000 + 250);
    
};
const onPage = (event) => {
    console.log('customers',customers.value);
    lazyParams.value = event;
    loadLazyData();
};
const onSort = (event) => {
    lazyParams.value = event;
    loadLazyData();
};
const onFilter = () => {
    lazyParams.value.filters = filters.value ;
    loadLazyData();
};
const onSelectAllChange = (event) => {
    selectAll.value = event.checked;

    if (selectAll) {
        CustomerService.getCustomers().then(data => {
            selectAll.value = true;
            selectedCustomers.value = data.customers;
        });
    }
    else {
        selectAll.value = false;
        selectedCustomers.value = [];
    }
};
const onRowSelect = () => {
    selectAll.value = selectedCustomers.value.length === 30;
};
const onRowUnselect = () => {
    selectAll.value = false;
};

</script>
