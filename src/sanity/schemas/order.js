import { RiFileList3Line } from 'react-icons/ri'

export const order = {
    name: 'order',
    title: 'Orders',
    type: 'document',
    icon: RiFileList3Line,
    readOnly: true, // Orders are usually created via API, not manually
    fields: [
        {
            name: 'customerEmail',
            title: 'Customer Email',
            type: 'string'
        },
        {
            name: 'products',
            title: 'Products',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'product' }] }]
        },
        {
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    { title: 'Pending', value: 'pending' },
                    { title: 'Paid', value: 'paid' },
                    { title: 'Failed', value: 'failed' }
                ]
            },
            initialValue: 'pending'
        },
        {
            name: 'amount',
            title: 'Total Amount',
            type: 'number'
        },
        {
            name: 'date',
            title: 'Date',
            type: 'datetime'
        }
    ]
}
