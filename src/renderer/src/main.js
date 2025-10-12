// import { createApp } from 'vue'
// import App from './App.vue'

// createApp(App).mount('#app')

import { createApp } from 'vue'

import mitt from 'mitt';


import router from './router'
import App from './App.vue'
import { BootstrapVue3, BToastPlugin } from 'bootstrap-vue-3'
import Antd from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.css'; ***
import FlagIcon from 'vue-flag-icon'
import 'typicons.font/src/font/typicons.css';
import '@mdi/font/css/materialdesignicons.min.css'; // [ MID ICON ]
import '@/assets/css/iconglobal.css'
// import pinia
import { createPinia } from "pinia";
const pinia = createPinia();

// css
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

// import "@/assets/fontgobal.css";

// themplate
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@fortawesome/fontawesome-free/css/fontawesome.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
// import '@/assets/css/vue-form-wizard.css'
import '@/assets/css/style.css'
import '@/assets/css/customeprimevue.css'
import "@/assets/theme/theme-pos-pimary-orange.css";
// window.$ = window.jQuery = require('jquery');

// import VueSelect from 'vue3-select2-component'
import DatePicker from 'vue3-datepicker'
import Vue3Autocounter from 'vue3-autocounter';
import Toaster from '@meforma/vue-toaster'
// import SummernoteEditor from 'vue3-summernote-editor';
import VueSweetalert2 from 'vue-sweetalert2'
// import 'sweetalert2/dist/sweetalert2.min.css'; ***
import StarRating from 'vue-star-rating'
import VueFeather from 'vue-feather'
import VueApexCharts from 'vue3-apexcharts'
import VueEasyLightbox from 'vue-easy-lightbox'
import CoolLightBox from 'vue-cool-lightbox'
// import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'
import VueFormWizard from 'vue3-form-wizard'
// import 'vue-form-wizard/dist/vue-form-wizard.min.css' **

/*********Header component**********/
// component import use
// import Header from './views/layouts/header.vue'
// import Sidebar from './views/layouts/sidebar.vue'
// import DashboardPage from './views/pages/dashboard/indexpage.vue'
// import Searchpart from './views/pages/charts/searchpart.vue'
// [[end]]

// import Headertwo from './views/layouts/header-two.vue'
// import HeaderPos from './views/layouts/headerpos.vue'
// import Loader from './views/layouts/loader.vue'
import Headermenu from './components/headermenu.vue'
// import Headertwomenu from './components/headertwomenu.vue'
import Mobilemenu from './components/mobilemenu.vue'
import Headerlogo from './components/headerlogo.vue'
import Headerlogo1 from './components/headerlogo1.vue'
/*********Sidebar component**********/

// import SidebarOne from './views/layouts/sidebarone.vue'
// import Sidebarfour from './views/layouts/sidebarfour.vue'
// import Indextwomenu from './components/indextwomenu.vue'
/*********Pageheader component**********/
import PageHeader from './components/pageheader/pageheader.vue'
import PageaddHeader from './components/pageheader/pageaddheader.vue'
import breadcrumb from './components/pageheader/breadcrumb.vue'
/*********Dashboard**********/

// import Addressform from './views/pages/forms/horizontal/addressform'
// import Basicform from './views/pages/forms/horizontal/basicform'
// import Personaldetail from './views/pages/forms/horizontal/personaldetail'
// import Personalinformation from './views/pages/forms/horizontal/personalinformation'
// import SupplierPaymentreport from './views/pages/report/supplierreport/payment'
// import Supplierreturnreport from './views/pages/report/supplierreport/return'
// import Contexttable from './views/pages/table/contexttable'

/*********Modal component**********/
// import SalesListModal from './views/pages/sales/saleslistmodal.vue'
// import SupplierListmodal from './views/pages/people/supplierlistmodal.vue'
// import Userlistmodal from './views/pages/people/userlistmodal.vue'
// import StateListmodal from './views/pages/places/statelistmodal.vue'
// import StoreListmodal from './views/pages/places/storelistmodal.vue'
// import CountrylistModal from './views/pages/places/countrylist/countrylistmodal.vue'
// import CalendarModal from './views/pages/application/calendar/calendarmodal.vue'
// import CurrencysettingsModal from './views/pages/settings/currencysetting/currencysettingsmodal'
// import paymentsetmodal from './views/pages/settings/paymentsetmodal'
// import TaxrateSmodal from './views/pages/settings/taxratesmodal'



// import './assets/plugins/summernote/dist/summernote-lite.min.css'
// import './assets/plugins/summernote/dist/summernote-lite.min.js'
// import 'ionicons-npm/css/ionicons.css'
// import 'material-icons/css/material-icons.min.css'
// import 'material-icons/css/material-icons.css'
// import 'pe7-icon/dist/dist/pe-icon-7-stroke.css'
// import 'typicons.font/src/font/typicons.css'
// import 'weathericons/css/weather-icons.css' **

import swal from 'sweetalert2'
window.Swal = swal
const app = createApp(App)

const eventBus = mitt();
app.provide('eventBus',eventBus);

/*********Header component**********/
// componment use 
// app.component('Layouts', Header)
// app.component('sidebar', Sidebar)
// app.component('indexpage', DashboardPage);
// app.component('searchpart', Searchpart)
// [[END]]
// app.component('Layoutstwo', Headertwo)
// app.component('Headerpos', HeaderPos)
// app.component('Loader', Loader)
app.component('Headermenu', Headermenu)
// app.component('Headertwomenu', Headertwomenu)
app.component('Mobilemenu', Mobilemenu)
app.component('Headerlogo', Headerlogo)
app.component('Headerlogo1', Headerlogo1)
/*********Sidebar component**********/

// app.component('sidebarone', SidebarOne)
// app.component('sidebarfour', Sidebarfour)
// app.component('indextwosidebar', Indextwomenu)

/*********Pageheader component**********/
app.component('pageheader', PageHeader)
app.component('pageaddheader', PageaddHeader)
app.component('breadcrumb', breadcrumb)

/*********Modal component**********/
// app.component('saleslistmodal', SalesListModal);
// app.component('supplierlistmodal', SupplierListmodal);
// app.component('userlistmodal', Userlistmodal);
// app.component('statelistmodal', StateListmodal);
// app.component('storelistmodal', StoreListmodal);
// app.component('countrylistmodal', CountrylistModal);
// app.component('calendarmodal', CalendarModal);
// app.component('currencysettingsmodal', CurrencysettingsModal);
// app.component('paymentsetmodal', paymentsetmodal);
// app.component('taxratesmodal', TaxrateSmodal);

/*********Dashboard**********/

// app.component('personaldetail', Personaldetail);
// app.component('personalinformation', Personalinformation);
// app.component('payment', SupplierPaymentreport);
// app.component('return', Supplierreturnreport);
// app.component('addressform', Addressform);
// app.component('basicform', Basicform);
// app.component('contexttable', Contexttable);

// app.component('vue-select', VueSelect)
app.component('datepicker', DatePicker)
app.component('vue3-autocounter', Vue3Autocounter)
app.component(VueFeather.name, VueFeather)
app.component('star-rating', StarRating)
// app.component('SummernoteEditor', SummernoteEditor);
app.use(Toaster, {
  position: 'top-right'
})
app.use(CoolLightBox)
app.use(VueSweetalert2)
app.use(VueEasyLightbox)
  app
  .use(VueApexCharts)
  app.use(FlagIcon)
  .use(VueFormWizard)
  .use(Antd)
  .use(BootstrapVue3)
  .use(BToastPlugin)


// ****************** [[ PRIMEVUE REFISTER ]] *********************


import PrimeVue from "primevue/config";
import AutoComplete from 'primevue/autocomplete';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Avatar from 'primevue/avatar';
import AvatarGroup from 'primevue/avatargroup';
import Badge from 'primevue/badge';
import BadgeDirective from "primevue/badgedirective";
import BlockUI from 'primevue/blockui';
import Button from 'primevue/button';
import Breadcrumb from 'primevue/breadcrumb';
import Calendar from 'primevue/calendar';
import Card from 'primevue/card';
import CascadeSelect from 'primevue/cascadeselect';
import Carousel from 'primevue/carousel';
import Checkbox from 'primevue/checkbox';
import Chip from 'primevue/chip';
import Chips from 'primevue/chips';
import ColorPicker from 'primevue/colorpicker';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmPopup from 'primevue/confirmpopup';
import ConfirmationService from 'primevue/confirmationservice';
import ContextMenu from 'primevue/contextmenu';
import DataTable from 'primevue/datatable';
import DataView from 'primevue/dataview';
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions';
import DeferredContent from 'primevue/deferredcontent';
import Dialog from 'primevue/dialog';
import DialogService from 'primevue/dialogservice'
import Divider from 'primevue/divider';
import Dock from 'primevue/dock';
import Dropdown from 'primevue/dropdown';
import DynamicDialog from 'primevue/dynamicdialog';
import Fieldset from 'primevue/fieldset';
import FileUpload from 'primevue/fileupload';
import FocusTrap from 'primevue/focustrap';
import Galleria from 'primevue/galleria';
import Image from 'primevue/image';
import InlineMessage from 'primevue/inlinemessage';
import Inplace from 'primevue/inplace';
import InputSwitch from 'primevue/inputswitch';
import InputText from 'primevue/inputtext';
import InputMask from 'primevue/inputmask';
import InputNumber from 'primevue/inputnumber';
import Knob from 'primevue/knob';
import Listbox from 'primevue/listbox';
import MegaMenu from 'primevue/megamenu';
import Menu from 'primevue/menu';
import Menubar from 'primevue/menubar';
import Message from 'primevue/message';
import MultiSelect from 'primevue/multiselect';
import OrderList from 'primevue/orderlist';
import OrganizationChart from 'primevue/organizationchart';
import OverlayPanel from 'primevue/overlaypanel';
import Paginator from 'primevue/paginator';
import Panel from 'primevue/panel';
import PanelMenu from 'primevue/panelmenu';
import Password from 'primevue/password';
import PickList from 'primevue/picklist';
import ProgressBar from 'primevue/progressbar';
import ProgressSpinner from 'primevue/progressspinner';
import Rating from 'primevue/rating';
import RadioButton from 'primevue/radiobutton';
import Ripple from 'primevue/ripple';
import Row from 'primevue/row';
import SelectButton from 'primevue/selectbutton';
import ScrollPanel from 'primevue/scrollpanel';
import ScrollTop from 'primevue/scrolltop';
import Skeleton from 'primevue/skeleton';
import Slider from 'primevue/slider';
import Sidebar from 'primevue/sidebar';
import SpeedDial from 'primevue/speeddial';
import SplitButton from 'primevue/splitbutton';
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import Steps from 'primevue/steps';
import StyleClass from 'primevue/styleclass';
import TabMenu from 'primevue/tabmenu';
import TieredMenu from 'primevue/tieredmenu';
import Textarea from 'primevue/textarea';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import Toolbar from 'primevue/toolbar';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Tag from 'primevue/tag';
import Terminal from 'primevue/terminal';
import Timeline from 'primevue/timeline';
import ToggleButton from 'primevue/togglebutton';
import Tooltip from 'primevue/tooltip';
import Tree from 'primevue/tree';
import TreeSelect from 'primevue/treeselect';
import TreeTable from 'primevue/treetable';
import TriStateCheckbox from 'primevue/tristatecheckbox';
import VirtualScroller from 'primevue/virtualscroller';

app.use(PrimeVue, { 
  ripple: true,
//   locale: {
//     dayNames : ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'],
//     dayNamesShort:['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'],
//     dayNamesMin	:['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'],
    
    
//     monthNames: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'],
//     monthNamesShort:['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.']
// }
});
app.use(ConfirmationService);
app.use(ToastService);
app.use(DialogService);
app.use(router);
app.use(pinia);

app.directive('tooltip', Tooltip);
app.directive('badge', BadgeDirective);
app.directive('ripple', Ripple);
app.directive('styleclass', StyleClass);
app.directive('focustrap', FocusTrap);

app.component('Accordion', Accordion);
app.component('AccordionTab', AccordionTab);
app.component('AutoComplete', AutoComplete);
app.component('Avatar', Avatar);
app.component('AvatarGroup', AvatarGroup);
app.component('Badge', Badge);
app.component('BlockUI', BlockUI);
app.component('Breadcrumb', Breadcrumb);
app.component('Button', Button);
app.component('Calendar', Calendar);
app.component('Card', Card);
app.component('Carousel', Carousel);
app.component('CascadeSelect', CascadeSelect);
app.component('Checkbox', Checkbox);
app.component('Chip', Chip);
app.component('Chips', Chips);
app.component('ColorPicker', ColorPicker);
app.component('Column', Column);
app.component('ColumnGroup', ColumnGroup);
app.component('ConfirmDialog', ConfirmDialog);
app.component('ConfirmPopup', ConfirmPopup);
app.component('ContextMenu', ContextMenu);
app.component('DataTable', DataTable);
app.component('DataView', DataView);
app.component('DataViewLayoutOptions', DataViewLayoutOptions);
app.component('DeferredContent', DeferredContent);
app.component('Dialog', Dialog);
app.component('Divider', Divider);
app.component('Dock', Dock);
app.component('Dropdown', Dropdown);
app.component('DynamicDialog', DynamicDialog);
app.component('Fieldset', Fieldset);
app.component('FileUpload', FileUpload);
app.component('Galleria', Galleria);
app.component('Image', Image);
app.component('InlineMessage', InlineMessage);
app.component('Inplace', Inplace);
app.component('InputMask', InputMask);
app.component('InputNumber', InputNumber);
app.component('InputSwitch', InputSwitch);
app.component('InputText', InputText);
app.component('Knob', Knob);
app.component('Listbox', Listbox);
app.component('MegaMenu', MegaMenu);
app.component('Menu', Menu);
app.component('Menubar', Menubar);
app.component('Message', Message);
app.component('MultiSelect', MultiSelect);
app.component('OrderList', OrderList);
app.component('OrganizationChart', OrganizationChart);
app.component('OverlayPanel', OverlayPanel);
app.component('Paginator', Paginator);
app.component('Panel', Panel);
app.component('PanelMenu', PanelMenu);
app.component('Password', Password);
app.component('PickList', PickList);
app.component('ProgressBar', ProgressBar);
app.component('ProgressSpinner', ProgressSpinner);
app.component('RadioButton', RadioButton);
app.component('Rating', Rating);
app.component('Row', Row);
app.component('SelectButton', SelectButton);
app.component('ScrollPanel', ScrollPanel);
app.component('ScrollTop', ScrollTop);
app.component('Slider', Slider);
app.component('Sidebar', Sidebar);
app.component('Skeleton', Skeleton);
app.component('SpeedDial', SpeedDial);
app.component('SplitButton', SplitButton);
app.component('Splitter', Splitter);
app.component('SplitterPanel', SplitterPanel);
app.component('Steps', Steps);
app.component('TabMenu', TabMenu);
app.component('TabView', TabView);
app.component('TabPanel', TabPanel);
app.component('Tag', Tag);
app.component('Textarea', Textarea);
app.component('Terminal', Terminal);
app.component('TieredMenu', TieredMenu);
app.component('Timeline', Timeline);
app.component('Toast', Toast);
app.component('Toolbar', Toolbar);
app.component('ToggleButton', ToggleButton);
app.component('Tree', Tree);
app.component('TreeSelect', TreeSelect);
app.component('TreeTable', TreeTable);
app.component('TriStateCheckbox', TriStateCheckbox);
app.component('VirtualScroller', VirtualScroller);




// font gobal
import "@/assets/fontgobal.css";
app.use(router).mount('#app')
