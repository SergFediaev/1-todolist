import {AddItemForm} from './AddItemForm'
import {action} from '@storybook/addon-actions'

export default {
    title: 'AddItemForm Component',
    component: AddItemForm,
}

export const AddItemFormBaseExample = (props: any) => {
    return <AddItemForm addItem={callback}/>
}

export const AddItemFormDisabledExample = (props: any) => {
    return <AddItemForm addItem={callback} disabled={true}/>
}

const callback = action('Button "add" was pressed inside the form')