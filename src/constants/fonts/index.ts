import localFont from 'next/font/local'
export const coreSans = localFont({ src: './coresans-65.otf' })
export const causten = localFont({
    src: [
        {
            path: './Causten-Bold.otf',
            weight: '700',
        },
        {
            path: './Causten-Medium.otf',
            weight: '500',
        },
        {
            path: './Causten-Regular.otf',
            weight: '400',
        },
        {
            path: './Causten-Light.otf',
            weight: '300',
        }
    ]
})
