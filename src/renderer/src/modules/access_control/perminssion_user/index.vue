<template>
    <div class="content">
        <div class="d-flex justify-content-between">
            <Breadcrumb :items="breadcrumbItems" class="font-bold" />
            <!-- <pageheader title="ผู้ใช้ที่ได้รับอนุญาต" title1="จัดการผู้ใช้ที่ได้รับอนุญาต" /> -->
        </div>
        <div class="card">
            <div class="card-body">
                <!-- top table -->
                <div class="table-top">
                    <div class="search-set">
                        <div class="search-path ">
                            <a class="btn btn-filter " id="filter_search" @click="clearFilter()"
                                :class="{ setclose: filter }">
                                <img src="@/assets/img/icons/filter.svg" alt="img" />
                                <!-- @/assets/img/icons/filter.svg -->
                                <span><img src="@/assets/img/icons/closes.svg" alt="img" /></span>
                            </a>
                        </div>
                        <div class="search-input">
                            <a class="btn btn-searchset"><img src="@/assets/img/icons/search-white.svg" alt="img" /></a>
                            <div id="DataTables_Table_0_filter" class="dataTables_filter">
                                <label>
                                    <span class="p-input-icon-left">
                                        <i class="pi pi-search" />
                                        <InputText class="form-control" v-model="filters['global'].value"
                                            placeholder="ค้นหา..." />
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="wordset">
                        <ul>
                            <li>
                                <a data-bs-toggle="tooltip" data-bs-placement="top" title="excel"
                                    @click="exportCSV($event)"><img src="@/assets/img/icons/excel.svg" alt="img" /></a>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- end top table -->

                <h4 class="card-title">จัดการการเข้าถึงบุคลากร</h4>
                <div class="table-responsive">
                    <DataTable v-model:filters="filters" class="p-datatable-sm" :value="resPermisstionUser"
                        :paginator="true" :rows="10" dataKey="id" filterDisplay="menu" ref="dt"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        :rowsPerPageOptions="[5, 10, 25,50,75,100,500,1000]"
                        currentPageReportTemplate="แสดง {first} - {last} จาก {totalRecords} รายการ" :globalFilterFields="['_employee.fullname', '_employee.title_name', '_employee.first_name', '_employee.last_name', 'email', '_employee.phone_no',
                            '_user_position._position.position_name', '_employee.sexname']" :exportFilename="`ผู้ใช้ที่ได้รับอนุญาต${format(
        new Date(),
        'ddMMyyyyHHmmss'
    )}`" :pt="{
    paginator: {
        paginatorWrapper: { class: ' flex justify-content-end' },
        firstPageButton: { class: 'border-round-lg mr-1' },
        previousPageButton: { class: 'border-round-lg mr-1 ' },
        nextPageButton: { class: 'border-round-lg mr-1 ' },
        lastPageButton: { class: 'border-round-lg mr-1 ' },
        current: { class: 'border-round-lg text-orange-400' },
        pageButton: ({ props, state, context }) => ({
            class: context.active ? 'bg-orage-600 border-none border-round-lg mr-1' : 'bg-gray-600 border-none border-round-lg text-white mr-1'
        }),
    },
}">
                        <template #empty> No permission user found. </template>
                        <!-- <Column selectionMode="multiple" headerStyle="width: 3rem"></Column> -->
                        <Column sortable field="indexkey" header="ลำดับ" style="min-width: 3rem" class="px-2 text-center">
                            <template #sorticon="slotProps">
                                <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                                    <i class="pi pi-angle-down" style="font-size: 12px"></i>
                                </div>
                                <div v-else>
                                    <i class="pi pi-angle-up" style="font-size: 12px"></i>
                                </div>
                            </template>
                            <template #body="slotProps">
                                {{ slotProps.data.indexkey }}
                            </template>
                        </Column>
                        <Column sortable header="เพศ" field="_employee.sexname" class="px-2" style="min-width: 1rem;">
                            <template #sorticon="slotProps">
                                <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                                    <i class="pi pi-angle-down" style="font-size: 12px"></i>
                                </div>
                                <div v-else>
                                    <i class="pi pi-angle-up" style="font-size: 12px"></i>
                                </div>
                            </template>
                        </Column>
                        <Column style="min-width: 5rem;" class="">
                            <template #header>
                                <div class="flex-1 text-center">รูป</div>
                            </template>
                            <template #body="slotProps">
                                <div v-if="slotProps.data._employee != null" class="flex justify-content-center">
                                    <Image class="" preview
                                        :src="slotProps.data._employee.avatar_image !== null && slotProps.data._employee.avatar_image !== '' ? slotProps.data._employee.avatar_image : '../../../assets/img/image404.jpg'"
                                        alt="Image" width="40" />

                                </div>

                            </template>
                        </Column>
                        <Column header="ชื่อ" field="_employee.fullname" sortable="_employee.fullname"
                            style="min-width: 17rem;" class="">
                            <template #sorticon="slotProps">
                                <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                                    <i class="pi pi-angle-down" style="font-size: 12px"></i>
                                </div>
                                <div v-else>
                                    <i class="pi pi-angle-up" style="font-size: 12px"></i>
                                </div>
                            </template>
                            <template #filtericon><i class="pi pi-search" style="font-size: 12px"></i></template>

                            <template #filter="{ filterModel }">
                                <InputText v-model="filterModel.value" type="text" class="p-column-filter"
                                    placeholder="Search..." />
                            </template>
                            <template #body="slotProps">
                                <div v-if="slotProps.data._employee != null" class="flex align-items-end gap-2">
                                    <span>
                                        {{ slotProps.data._employee.fullname }}
                                    </span>
                                </div>

                            </template>
                        </Column>
                        <Column field="_employee.phone_no" header="เบอร์โทร" sortable style="min-width: 8rem">
                            <template #sorticon="slotProps">
                                <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                                    <i class="pi pi-angle-down" style="font-size: 12px"></i>
                                </div>
                                <div v-else>
                                    <i class="pi pi-angle-up" style="font-size: 12px"></i>
                                </div>
                            </template>
                            <template #filtericon><i class="pi pi-search" style="font-size: 12px"></i></template>
                            <template #filter="{ filterModel }">
                                <InputText v-model="filterModel.value" type="text" class="p-column-filter"
                                    placeholder="Search..." />
                            </template>
                            <template #body="{ data }">
                                {{ (data._employee.phone_no) }}
                            </template>

                        </Column>
                        <Column field="email" header="อีเมล์" sortable style="min-width: 10rem">
                            <template #sorticon="slotProps">
                                <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                                    <i class="pi pi-angle-down" style="font-size: 12px"></i>
                                </div>
                                <div v-else>
                                    <i class="pi pi-angle-up" style="font-size: 12px"></i>
                                </div>
                            </template>
                            <template #filtericon><i class="pi pi-search" style="font-size: 12px"></i></template>
                            <template #filter="{ filterModel }">
                                <InputText v-model="filterModel.value" type="text" class="p-column-filter"
                                    placeholder="Search..." />
                            </template>
                        </Column>



                        <Column field="_user_position._position.position_name" sortable style="min-width: 13rem"
                            class="px-2">
                            <template #sorticon="slotProps">
                                <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                                    <i class="pi pi-angle-down" style="font-size: 12px"></i>
                                </div>
                                <div v-else>
                                    <i class="pi pi-angle-up" style="font-size: 12px"></i>
                                </div>
                            </template>
                            <template #filtericon><i class="pi pi-search" style="font-size: 12px"></i></template>

                            <template #filter="{ filterModel }">
                                <Dropdown v-model="filterModel.value" :options="resPosition" optionValue="position_name"
                                    optionLabel="position_name" placeholder="Select One" class="p-column-filter" showClear>
                                </Dropdown>
                            </template>
                            <template #header>
                                <div class="flex-1 text-center">
                                    ตำแหน่ง
                                </div>
                            </template>
                            <template #body="slotProps">
                                <div class="" v-if="slotProps.data._user_position">
                                    <div class="text-center">
                                        <Tag :value="slotProps.data._user_position._position.position_code"
                                            severity="primary" />
                                    </div>
                                    <div class="text-center ">{{ slotProps.data._user_position._position.position_name }}
                                    </div>

                                </div>
                            </template>
                        </Column>

                        <Column style="min-width: 15rem" class="px-2">
                            <template #header>
                                <div class="flex-1 text-center">
                                    การเข้าถึง Route Permission
                                </div>
                            </template>
                            <template #body="slotProps">
                                <div class="text-center">
                                    <Button v-if="slotProps.data._permission_user.length > 0" size="small" label="Permission" icon="pi pi-eye" severity="danger" @click="showModalPermission(slotProps.data._permission_user)" outlined />
                                    </div>
                               <!--  <Accordion v-if="slotProps.data._permission_user.length > 0">
                                    <AccordionTab header="การเข้าถึงRoute.." :pt="{
                                        headerAction: { class: 'bg-red-600 text-white' }
                                    }">
                                        <p class="" v-for="(item, index) in slotProps.data._permission_user" :key="index"
                                            style="line-height: 1.2;">
                                            {{ index + 1 }}#{{ item.name }} ({{ item.description }})
                                        </p>
                                    </AccordionTab>
                                </Accordion>
                            -->
                            </template>
                        </Column>

                        <Dialog v-model:visible="showPermission" maximizable modal header="รายการ Permissions" 
                            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
                            <DataTable :value="dataPermission" tableStyle="min-width: 50rem">
                                <Column  header="#">
                                    <template #body="{index, data}">
                                        {{ index+1 }}
                                        </template>
                                    </Column>
                                <Column field="name" header="ชื่อ"></Column>
                                <Column field="description" header="คำอธิบาย"></Column>
                            </DataTable>
                        </Dialog>

                        <Column field="_employee.status" sortable :filterMenuStyle="{ width: '7rem' }"
                            style="min-width: 10rem">
                            <template #header>
                                <div class="flex-1 text-center">
                                    สถานะ
                                </div>
                            </template>
                            <template #sorticon="slotProps">
                                <div v-if="slotProps.sortOrder === 0 || slotProps.sortOrder === 1">
                                    <i class="pi pi-angle-down" style="font-size: 12px"></i>
                                </div>
                                <div v-else>
                                    <i class="pi pi-angle-up" style="font-size: 12px"></i>
                                </div>
                            </template>
                            <template #body="slotProps">
                                <div v-if="slotProps.data._employee != null" class="flex justify-content-center">
                                    <i class="pi"
                                        :class="{ 'pi-check-circle text-green-500': slotProps.data._employee.status == 1, 'pi-times-circle text-red-400': slotProps.data._employee.status != 1 }"
                                        style="font-size: 26px;"></i>

                                </div>
                            </template>
                        </Column>






                        <Column headerStyle="width: 5rem; text-align: center"
                            bodyStyle="text-align: center; overflow: visible" style="min-width: 7rem;">
                            <template #filtericon><i class="pi pi-search" style="font-size: 12px"></i></template>
                            <template #body="slotProps">
                                <router-link :to="`/access-control/perminssion-user/manage/${slotProps.data.id}`">
                                    <Button type="button" icon="pi pi-pencil"
                                        style="color: black; background: transparent; border: none;" />
                                </router-link>
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </div>
        </div>

        <Dialog v-model:visible="permissionDialog" maximizable :style="{ width: '450px' }" header="รายละเอียดสิทธิ์"
            :modal="true" class="p-fluid">
            <hr class="mb-3" />
            <form @submit="onSubmit">
                <div class="grid">
                    <div class="col-12">
                        <div class="grid formgrid p-fluid bg">
                            <div class="field mb-4 col-12 pt-2">
                                <div>
                                    <label for="name" class="pb-3 font-semibold text-gray-600 col-12">ชื่อสิทธิ์</label>
                                    <div class="w-full mt-2">
                                        <InputText id="name" v-model="name" placeholder="ชื่อสิทธิ์" class="p-inputtext" />
                                    </div>
                                </div>
                                <div class="text-right mt-1">
                                    <small class="text-red-600">{{ errors.name }}</small>
                                </div>
                            </div>

                            <div class="field mb-4 col-12 pt-2">
                                <div>
                                    <label for="description"
                                        class="pb-3 font-semibold text-gray-600 col-12">คำอธิบาย</label>
                                    <div class="w-full mt-2">
                                        <Textarea id="description" v-model="description" placeholder="คำอธิบาย" rows="2"
                                            class="p-inputtext" />
                                    </div>
                                </div>
                                <div class="text-right mt-1">
                                    <small class="text-red-600">{{ errors.description }}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr class="my-3" />
                <div class="flex flex-wrap gap-3 justify-content-end w-full">
                    <Button label="ยกเลิก" @click="hideDialog" type="button" severity="secondary" size="small"
                        class="w-auto" />
                    <Button label="บันทึก" type="submit" size="small" class="w-auto" />
                </div>
            </form>
        </Dialog>


    </div>
    <ConfirmDelete ref="conFirmation" />
    <Alert :data="alertToast"  />
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as dataApi from "./api/data.js";
import { FilterMatchMode, FilterOperator } from 'primevue/api';

// Primevue API

import { format } from "date-fns";

import Alert from '@/components/gobal/Alert.vue' // [[ IMPORT COMPONENT Alert]]
import ConfirmDelete from '@/components/gobal/ConfirmDelete.vue'
import Breadcrumb from '@/components/gobal/Breadcrumb.vue' // [[ IMPORT COMPONENT Alert]]


const showPermission = ref(false);
const dataPermission = ref();
const showModalPermission = async (obj) =>{
    console.log(obj);
    dataPermission.value = obj;
    showPermission.value=true
};


onMounted(() => {
    loadData();
    loadPosiion();
});
const resPosition = ref()
const loadPosiion = async () => {
    const res = await dataApi.getPosition();
    resPosition.value = res.data.data;
};

const breadcrumbItems = ref([
    { label: "จัดการการเข้าถึงบุคลากร", to: "/access-control/perminssion-user" },
]);

const formatPhoneNumber = (phoneNumber) => {
    return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
}

const filters = ref();
const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        email: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        '_employee.sexname': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        '_employee.phone_no': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        '_employee.fullname': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        '_user_position._position.position_name': { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    };
};
initFilters();


//! /////// [validation] /////////
import { useField, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";
const requireValue = "กรุณาระบุข้อมูล";
const validationSchema = toTypedSchema(
    zod.object({
        branch_name: zod.string().nonempty(requireValue).default(""),
        address: zod.string().nonempty(requireValue).default(""),
        phone_number: zod.string().nonempty(requireValue).default(""),
        email: zod
            .string()
            .nonempty(requireValue)
            .email({ message: "ต้องเป็นรูปแบบอีเมล์เท่านั้น" })
            .default(""),
        branch_type_id: zod.number({
            required_error: requireValue,
            invalid_type_error: "จำนวนต้องเป็นตัวเลขเท่านั้น",
        }),
    })
);

const { handleReset, handleSubmit, errors } = useForm({
    validationSchema,
});

const { value: branch_name } = useField("branch_name");
const { value: address } = useField("address");
const { value: phone_number } = useField("phone_number");
const { value: email } = useField("email");
const { value: branch_type_id } = useField("branch_type_id");

const onSubmit = handleSubmit((values) => {
    savebranches(values);
});

//! /////// #END[validation] /////////
const overlayArray = ref([]);
const resPermisstionUser = ref();
// ************  GET[Data]    ************
const loadData = async () => {
    stateLoadding.value = true;
    const res = await dataApi.permissionUserGet();
    console.log(res.data.data);
    stateLoadding.value = false;
    resPermisstionUser.value = res.data.data;

    resPermisstionUser.value.forEach((e, i) => {
        e.indexkey = i+1
        if (e._employee) {
            e._employee.fullname = `${e._employee.title_name} ${e._employee.first_name} ${e._employee.last_name}`
            if (e._employee.sex == 1) {
                e._employee.sexname = "ชาย"
            } else {
                e._employee.sexname = "หญิง"
            }
        }
        overlayArray.value[i] = i
        e.index = i + 1
        e.imgzoom = null
    });
};

const clearFilter = () => {
    initFilters();
};

const errorAlert = ref(false);
const alertToast = ref({});

const stateLoadding = ref(false);

// ************  #END [INSERT & Update]  ************

// !!!!!!!!!!!!!!!!!! Delete !!!!!!!!!!!!!!!!!!!!!
// ช่วงลบข้อมูล
const conFirmation = ref(null); //ตัวพร็อพค่าลงไปในคอมโพเนนซ์
const confirmDelete = (obj) => {
    console.log(obj);
    const proCessConfirm = {
        // ส่งชื่อที่จะไปแสดง
        message: obj.branch_name,
        accept: () => {
            // เรียกฟังชั่นลบ แล้วส่งID ไป
            deletebranches(obj.id);
        },
    };
    if (conFirmation.value) {
        conFirmation.value.openDialog(proCessConfirm);
    }
};



// !!!!!!!!!!!!!!!!!! #END [Delete] !!!!!!!!!!!!!!!!!!!!!

////////////////////////////////////////////////////////////////





const printPage = () => {
    window.print(); // เรียกใช้ window.print() เพื่อแสดงหน้าปริ้น
};

const dt = ref();
const exportCSV = () => {
    dt.value.exportCSV();
};

</script>
