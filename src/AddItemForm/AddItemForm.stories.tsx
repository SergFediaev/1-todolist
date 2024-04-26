import {AddItemForm} from './AddItemForm'
import {action} from '@storybook/addon-actions'

export default {
    title: 'AddItemForm Component',
    component: AddItemForm,
}

export const AddItemFormBaseExample = (props: any) => {
    return <AddItemForm addItem={callback}/>
}

const callback = action('Button "add" was pressed inside the form')