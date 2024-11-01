export type filterKeys = 'category' | 'size' | 'price' | 'type' | 'colors'
export type FilterValues = {
    [keyof in filterKeys]: string
}