import { Size } from "@prisma/client"

const category = [
    {
        id: '356',
        name: 'all'
    },
    {
        id: '123',
        name: 'men\'s clothing'
    },
    {
        id: '2234',
        name: 'women\'s clothing'
    }
]
// an array of object hex values with ids
const colors = [
    {
        id: '1',
        color: '#800080', // Purple
        label: 'purple'
    },
    {
        id: '2',
        color: '#FF0000', // Red
        label: 'red'
    },
    {
        id: '3',
        color: '#0000FF', // Blue
        label: 'blue'
    },
    {
        id: '4',
        color: '#008000', // Green
        label: 'green'
    },
    {
        id: '5',
        color: '#FFFF00', // Yellow
        label: 'yellow'
    },
    {
        id: '6',
        color: '#FFA500', // Orange
        label: 'orange'
    },
    {
        id: '7',
        color: '#FFC0CB', // Pink
        label: 'pink'
    }, {
        id: '8',
        color: 'transparent',
        label: 'none'
    }
];

const sizes: {
    id: string,
    size: Size | 'none'
}[] = [
        {
            id: '15',
            size: 'XS'
        },
        {
            id: '6',
            size: 'SM'
        },
        {
            id: '1',
            size: 'MD'
        },
        {
            id: '2',
            size: 'LG'
        },
        {
            id: '3',
            size: 'XL'
        },
        {
            id: '4',
            size: 'XXL'
        },
        {
            id: '5',
            size: 'none'
        }

    ]
const type = [
    {
        id: '33121',
        label: 'none',
        value: 'none'
    },
    {
        id: '1234',
        label: 'new arrivals',
        value: 'new'
    },
    {
        id: '23423',
        label: 'best sellers',
        value: 'best'
    },
    {
        id: '3345',
        label: 'discounted',
        value: 'discount'
    }
]
export {
    category,
    colors,
    sizes,
    type
}