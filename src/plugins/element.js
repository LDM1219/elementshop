import Vue from 'vue'
import {
    Button,
    Form,
    FormItem,
    Input,
    Message,
    Container,
    Main,
    Header,
    Aside,
    Menu,
    Submenu,
    MenuItem,
    Breadcrumb,
    BreadcrumbItem,
    Card,
    Row,
    Col,
    Table,
    TableColumn,
    Switch,
    Tooltip,
    Pagination,
    Dialog,
    MessageBox,
    Tag,
    Tree,
    Option,
    Select,
    Cascader,
    Alert,
    TabPane,
    Tabs,
    Step,
    Steps,
    Checkbox,
    CheckboxGroup,
    Upload,
    Timeline,
    TimelineItem
} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Aside)
Vue.use(Container)
Vue.use(Main)
Vue.use(Header).use(Menu).use(Submenu).use(MenuItem)
Vue.use(Breadcrumb).use(BreadcrumbItem)
Vue.use(Card).use(Row).use(Col)
Vue.use(Table).use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Tag).use(Tree).use(Option).use(Select).use(Cascader)
Vue.use(Alert).use(TabPane).use(Tabs).use(Upload)
Vue.use(Step).use(Steps).use(CheckboxGroup).use(Checkbox)
Vue.use(Timeline).use(TimelineItem)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm