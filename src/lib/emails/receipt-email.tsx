import { Html } from '@react-email/html';
import { Head } from '@react-email/head';
import { Body } from '@react-email/body';
import { Button } from '@react-email/button';
import { Text } from '@react-email/text';
import { Tailwind } from '@react-email/tailwind';
import { Img } from '@react-email/img';
import { Container } from '@react-email/container';
import { Section } from '@react-email/section';
import { Row } from '@react-email/row';
import { Column } from '@react-email/column';
import { Link } from '@react-email/link';

type Props = {
    name: string;
    totalPrice: string;
    items: {
        image: string;
        name: string;
        quantity: number;
        price: number;
    }[];
    date: string;
    transactionId: string;
}
const baseURL = process.env.SITE_URL ? process.env.SITE_URL : "";

function ReceiptEmail({
    date,
    items,
    name,
    totalPrice,
    transactionId
}: Props) {
    return (
        <Html>
            <Head>
                <style>
                    {`
                        @media (max-width: 576px) {
                            .container-box {
                                padding: 1rem;
                                width: 100% !important;
                            }
                            .title-text {
                                font-size: 1.5rem !important;
                            }
                            .item-img {
                                height: auto;
                                width: 100% !important;
                            }
                            .btn {
                                width: 100% !important;
                                padding: 0.75rem !important;
                            }
                            .row-block {
                                flex-direction: column !important;
                                display: flex !important;
                            }
                        }
                    `}
                </style>
            </Head>
            <Tailwind
                config={{
                    theme: {
                        extend: {
                            colors: {
                                primary: 'hsl(266 98% 60%)',
                                secondary: '#3C4242',
                                background: '#F9FAFB',
                                text: '#374151'
                            }
                        }
                    }
                }}
            >
                <Body className="bg-background p-6">
                    <Container className="container-box border border-neutral-300 rounded-lg p-6 max-w-[576px] bg-white shadow-md">
                        <Link href={'http://localhost:3000'}>
                            <Img src={`${baseURL}/static/Logo.png`} alt="euphoria logo" className="brightness-0 h-20 w-20 object-contain mx-auto block" />
                        </Link>
                        <Section className="relative overflow-hidden h-[350px] w-full">
                            <Img src={`${baseURL}/static/receipt.png`} className="h-[350px] w-full object-cover object-top rounded-md mx-auto" />
                            <Section style={{
                                background: 'linear-gradient(60deg, #7747ff, 7%, rgba(0, 0, 0, 0.5) 100%)'
                                ,
                            }} className="absolute h-full w-full  inset-0 grid place-items-center">
                                <Text className="title-text text-4xl max-w-[400px] !mx-auto w-full block font-bold uppercase text-center text-white mb-2">
                                    Thank You For Your Order
                                </Text>
                            </Section>
                        </Section>
                        <Text className="text-left text-text text-lg mb-6">Hi {name}, thank you for your purchase. Here is your receipt:</Text>
                        <Row className="justify-between border-t border-b py-4 my-4 text-sm text-secondary">
                            <Column>
                                <Text className="text-text">
                                    <span className="text-primary text-lg font-semibold">
                                        Date:</span> {date}
                                </Text>
                            </Column>
                            <Column>
                                <Text>Transaction ID: {transactionId}</Text>
                            </Column>
                        </Row>

                        {items.map(item => (
                            <Row key={item.name} className="my-4 flex flex-row row-block">
                                <Column>
                                    <Img
                                        src={item.image}
                                        alt={item.name}
                                        className="h-32 object-cover rounded-md border border-neutral-200 shadow-sm 'h-[200px] mr-4 w-[285px]"
                                    />
                                </Column>
                                <Column className="w-3/4 pl-4">
                                    <Text className="text-lg font-semibold text-text mb-1">{item.name}</Text>
                                    <Text className="text-sm text-secondary">Quantity: {item.quantity}</Text>
                                    <Text className="text-sm text-secondary mb-2">Price: ${item.price}</Text>
                                    <Button className="btn bg-secondary rounded-md px-4 py-2 font-medium text-sm text-white mt-2">
                                        View Product
                                    </Button>
                                </Column>
                            </Row>
                        ))}

                        <Row className="text-right mt-8">
                            <Text className="text-lg font-semibold text-primary">Total Price: {totalPrice}</Text>
                        </Row>

                        <Button className="bg-primary rounded-md block max-w-full mt-8 px-4 py-3 font-medium text-white text-center">
                            View Order
                        </Button>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}

ReceiptEmail.PreviewProps = {
    date: new Date().toLocaleDateString(),
    items: [
        {
            name: "Slim Fit Jeans",
            image: '',
            quantity: 4,
            price: 900
        },
        {
            name: "Classic Polo Shirt",
            image: '',
            quantity: 3,
            price: 1000.99
        }
    ],
    name: 'Jane Doe',
    totalPrice: '$1,900.99',
    transactionId: '123456'
}

export default ReceiptEmail;
